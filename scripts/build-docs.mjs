import { pageHtml } from '../docs-ui/template.mjs';
import { readFile, writeFile, mkdir, rm, stat, copyFile } from 'node:fs/promises';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const projectDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash = value => createHash('sha256').update(value).digest('hex');
const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const inside = (base, path) => path === base || path.startsWith(base + sep);
const route = slug => `/docs/${slug ? slug + '/' : ''}`;

function resolveLink(href, source, sources) {
  if(href.startsWith('//'))throw new Error(`Unsafe documentation link: ${href}`);
  if (/^(https?:|mailto:)/.test(href) || href.startsWith('#')) return href;
  if (href.startsWith('/')) return href;
  const [path, fragment] = href.split('#');
  const resolved = resolve(dirname(source), path);
  const target = sources.get(resolved);
  if (!target) throw new Error(`Unknown documentation link in ${source}: ${href}`);
  return route(target.slug) + (fragment ? '#' + fragment : '');
}

function inline(value, source, sources) {
  const tokens = [];
  const token = html => `\u0000${tokens.push(html)-1}\u0000`;
  let text = value.replace(/`([^`\n]+)`/g, (_, code) => token(`<code>${escape(code)}</code>`));
  text = text.replace(/\[([^\]\n]+)\]\(([^\s)]+)\)/g, (_, label, href) => token(`<a href="${escape(resolveLink(href,source,sources))}">${escape(label)}</a>`));
  text = escape(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return text.replace(/\u0000(\d+)\u0000/g, (_, n) => tokens[Number(n)]);
}

// A deliberately small, escaped Markdown dialect for this checked-in guide.
// Raw HTML is escaped. An exact <br> in H1 is the only presentation exception.
// No attributes, embeds, scripts or runtime Markdown are accepted.
export function renderMarkdown(markdown, source, sources) {
  const lines = markdown.replace(/\r\n/g,'\n').split('\n');
  const output = [], toc = [], ids = new Set();
  let h1 = 0, paragraph = [];
  const flush = () => {if(paragraph.length) {output.push(`<p>${inline(paragraph.join(' '),source,sources)}</p>`); paragraph=[];}};
  const isTableRule = line => /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  const cells = line => line.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim());
  for(let i=0;i<lines.length;i++) {
    const line=lines[i];
    if(line.startsWith('```')) {
      flush(); const language=line.slice(3).trim(); const code=[];
      while(++i<lines.length && !lines[i].startsWith('```')) code.push(lines[i]);
      if(i===lines.length) throw new Error(`Unclosed code fence: ${source}`);
      output.push(`<div class="doc-code"><div class="code-caption"><span>${escape(language||'text')}</span><button type="button" class="copy-code" aria-label="Copy code example">Copy</button></div><pre tabindex="0"><code>${escape(code.join('\n'))}</code></pre></div>`);
      continue;
    }
    const picture = /^!\[([^\]]+)\]\((\/assets\/[a-zA-Z0-9._/-]+)\)$/.exec(line);
    if(picture) {
      flush();
      if(picture[2].includes('..'))throw new Error(`Unsafe documentation image: ${source}`);
      output.push(`<figure class="doc-figure"><a href="${escape(picture[2])}" target="_blank" rel="noopener" aria-label="Open full-size screenshot: ${escape(picture[1])}"><img src="${escape(picture[2])}" alt="${escape(picture[1])}" loading="lazy" width="1800" height="1130"><span>Open full size ↗</span></a><figcaption>${escape(picture[1])}</figcaption></figure>`);
      continue;
    }
    if(/^> ?/.test(line)) {
      flush();const note=[line.replace(/^> ?/,'')];while(i+1<lines.length&&/^> ?/.test(lines[i+1]))note.push(lines[++i].replace(/^> ?/,''));
      output.push(`<aside class="doc-note"><p>${inline(note.join(' '),source,sources)}</p></aside>`);continue;
    }
    const heading=/^(#{1,3})\s+(.+)$/.exec(line);
    if(heading) {
      flush(); const level=heading[1].length, label=heading[2];
      if(level===1) {h1++;output.push(`<h1>${label.split('<br>').map(part=>inline(part,source,sources)).join('<br>')}</h1>`);continue;}
      let id=slugify(label), base=id, n=2; while(ids.has(id)) id=`${base}-${n++}`;ids.add(id);
      toc.push({level,id,label}); output.push(`<h${level} id="${id}">${inline(label,source,sources)}<a class="heading-anchor" href="#${id}" aria-label="Link to ${escape(label)}">#</a></h${level}>`);continue;
    }
    if(line.includes('|') && i+1<lines.length && isTableRule(lines[i+1])) {
      flush(); const headers=cells(line);i++;const rows=[];
      while(i+1<lines.length && lines[i+1].includes('|') && lines[i+1].trim()) rows.push(cells(lines[++i]));
      if(rows.some(row=>row.length!==headers.length)) throw new Error(`Uneven table: ${source}`);
      output.push(`<div class="doc-table" role="region" aria-label="Comparison table" tabindex="0"><table><thead><tr>${headers.map(x=>`<th scope="col">${inline(x,source,sources)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${inline(x,source,sources)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);continue;
    }
    if(/^- /.test(line)) {
      flush();const items=[line.slice(2)];while(i+1<lines.length && /^- /.test(lines[i+1]))items.push(lines[++i].slice(2));
      output.push(`<ul>${items.map(x=>`<li>${inline(x,source,sources)}</li>`).join('')}</ul>`);continue;
    }
    if(/^\d+\. /.test(line)) {
      flush();const start=Number(line.match(/^\d+/)[0]),items=[line.replace(/^\d+\. /,'')];while(i+1<lines.length&&/^\d+\. /.test(lines[i+1]))items.push(lines[++i].replace(/^\d+\. /,''));
      output.push(`<ol start="${start}">${items.map(x=>`<li>${inline(x,source,sources)}</li>`).join('')}</ol>`);continue;
    }
    if(!line.trim()) {flush();continue;}
    paragraph.push(line.trim());
  }
  flush();if(h1!==1)throw new Error(`Expected one H1 in ${source}, found ${h1}`);
  return {html:output.join('\n'),toc};
}


export async function buildDocs({sourceDir,distDir=resolve(projectDir,'dist'),siteUrl='https://snurpo.dev'}={}) {
  if(!sourceDir)throw new Error('Supply --docs-source /path/to/snurpo/docs/website. Markdown is maintained in the application repository.');
  sourceDir=resolve(sourceDir);
  const origin=new URL(siteUrl).origin;
  const manifest=JSON.parse(await readFile(resolve(sourceDir,'navigation.json'),'utf8'));
  if(!Array.isArray(manifest.pages)||!manifest.pages.length)throw new Error('No documentation pages.');
  const sources=new Map();
  for(const page of manifest.pages) {
    if(!/^(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(page.slug)||!/^[a-z0-9/-]+\.md$/.test(page.source))throw new Error('Unsafe documentation route/source.');
    const source=resolve(sourceDir,page.source);if(!inside(sourceDir,source))throw new Error('Source escapes docs root.');
    sources.set(source,page);
  }
  if(new Set(manifest.pages.map(page=>page.slug)).size!==manifest.pages.length)throw new Error('Duplicate route.');
  const prepared=[];
  for(const page of manifest.pages) {
    const source=resolve(sourceDir,page.source), markdown=await readFile(source,'utf8');
    if(markdown.includes('\u2014'))throw new Error(`Em dash in ${page.source}`);
    const rendered=renderMarkdown(markdown,source,sources);
    prepared.push({page,markdown,rendered,html:pageHtml(page,manifest,rendered,origin)});
  }
  // Validate inter-page fragments against the rendered headings before writing.
  const routes=new Map(prepared.map(item=>[route(item.page.slug),new Set(['doc-main',...item.rendered.toc.map(h=>h.id)])]));
  for(const {page,html} of prepared)for(const match of html.matchAll(/<a\b[^>]*\bhref="([^\"]+)"/g)) {
    const url=new URL(match[1].replaceAll('&amp;','&'),origin+route(page.slug));
    if(url.origin!==origin||!url.pathname.startsWith('/docs/'))continue;
    const ids=routes.get(url.pathname);if(!ids)throw new Error(`Broken doc route: ${match[1]}`);
    if(url.hash&&!ids.has(decodeURIComponent(url.hash.slice(1))))throw new Error(`Broken fragment: ${match[1]} in ${page.source}`);
  }
  const docsDir=resolve(distDir,'docs');
  await mkdir(docsDir,{recursive:true});
  for(const asset of ['docs.css','docs.js'])await copyFile(resolve(projectDir,'docs-ui',asset),resolve(docsDir,asset));
  let previous;try{previous=JSON.parse(await readFile(resolve(docsDir,'manifest.json'),'utf8'));}catch{}
  for(const old of previous?.pages??[]) if(!manifest.pages.some(p=>p.slug===old.slug)&&/^[a-z0-9/-]+$/.test(old.slug))await rm(resolve(docsDir,old.slug,'index.html'),{force:true});
  const files=[];
  for(const {page,html,markdown}of prepared) {
    const file=resolve(docsDir,page.slug,'index.html');await mkdir(dirname(file),{recursive:true});await writeFile(file,html);
    files.push({slug:page.slug,source:page.source,sourceHash:hash(markdown),htmlHash:hash(html)});
  }
  await writeFile(resolve(docsDir,'search-index.json'),JSON.stringify(prepared.map(({page,markdown})=>({title:page.title,description:page.description,url:route(page.slug),text:markdown.replace(/```[\s\S]*?```/g,' ').replace(/[#|`*\[\]]/g,' ').slice(0,24000)}))));
  const result={version:manifest.version,updated:manifest.updated,origin,source:'dalkedev/snurpo/docs/website',pages:files};
  await writeFile(resolve(docsDir,'manifest.json'),JSON.stringify(result,null,2)+'\n');
  return result;
}

export async function verifyGeneratedDocs(distDir=resolve(projectDir,'dist'), expectedOrigin) {
  let manifest;try{manifest=JSON.parse(await readFile(resolve(distDir,'docs/manifest.json'),'utf8'));}catch(error){if(error.code==='ENOENT')return null;throw error;}
  if(expectedOrigin && manifest.origin!==expectedOrigin)throw new Error('Generated docs origin differs from SITE_URL. Rebuild with --docs-source.');
  for(const page of manifest.pages){const body=await readFile(resolve(distDir,'docs',page.slug,'index.html'),'utf8');if(hash(body)!==page.htmlHash)throw new Error(`Generated docs changed directly: ${page.slug}. Rebuild from application Markdown.`);}
  for(const asset of ['docs.css','docs.js','search-index.json'])await stat(resolve(distDir,'docs',asset));
  return manifest;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  const i=process.argv.indexOf('--docs-source');
  const result=await buildDocs({sourceDir:i>=0?process.argv[i+1]:process.env.SNURPO_DOCS_SOURCE,siteUrl:process.env.SITE_URL||'https://snurpo.dev'});
  console.log(`Built ${result.pages.length} documentation pages from canonical application Markdown.`);
}
