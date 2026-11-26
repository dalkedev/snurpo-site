'use strict';
const data = JSON.parse(document.querySelector('#site-data').textContent);
const pl = data.lang === 'pl';
const text = (en,polish) => pl ? polish : en;
const $ = (selector) => document.querySelector(selector);
const all = (selector) => [...document.querySelectorAll(selector)];
const escape = (s) => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const samples = {
 products:{method:'GET',path:'/api/products',status:200,statusText:'OK',time:42,request:{},response:{products:[{id:'snurpo-sticker',name:'One very nosy sticker',price:4.00}],currency:'EUR'}},
 checkout:{method:'POST',path:'/api/checkout',status:503,statusText:'Service Unavailable',time:1240,request:{product_id:'snurpo-sticker',quantity:1},response:{error:'service_unavailable',message:'Payment provider is offline.',retry_after:120}},
 profile:{method:'GET',path:'/api/profile',status:200,statusText:'OK',time:38,request:{},response:{id:'dev_42',name:'Curious developer',theme:'snurpo'}}
};
let selected='products'; let tab='response';
function highlight(obj){return escape(JSON.stringify(obj,null,2)).replace(/(&quot;[^\n]*?&quot;)(?=:)/g,'<span class="key">$1</span>');}
function renderInspector(){
 const s=samples[selected];
 $('#inspector-method').textContent=s.method;
 $('#inspector-method').className='method '+(s.method==='GET'?'get':'post');
 $('#inspector-endpoint').textContent=s.path;
 const title=tab==='response'?`<span class="status ${s.status===200?'ok':'fail'}">${s.status}</span><strong>${s.statusText}</strong>`:tab==='request'?`<span class="method ${s.method==='GET'?'get':'post'}">${s.method}</span><strong>${s.path}</strong>`:tab==='headers'?`<strong>${text('Response headers','Nagłówki odpowiedzi')}</strong>`:`<strong>${text('Request timing','Czas requestu')}</strong>`;
 let code=tab==='response'?highlight(s.response):tab==='request'?(s.method==='GET'?'// '+text('No request body','Brak body requestu'):highlight(s.request)):tab==='headers'?'content-type: application/json\ncache-control: no-store\nx-request-id: demo-'+selected:highlight({dns_ms:4,connect_ms:12,waiting_ms:s.time-18,download_ms:2,total_ms:s.time});
 $('#inspector-content').innerHTML=`<div class="response-title">${title}</div><pre class="response-code" tabindex="0" aria-label="${escape(text('Selected request data','Dane wybranego requestu')+': '+s.method+' '+s.path)}"><code>${code}</code></pre>`;
 $('#inspector-content').setAttribute('aria-labelledby','tab-'+tab);
 all('[data-inspect]').forEach(b=>{let active=b.dataset.inspect===tab;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1;});
 positionInspector();
}
function selectRequest(name){
 selected=name;
 all('[data-request]').forEach(button=>{const active=button.dataset.request===name;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',active);});
 renderInspector();
}
function positionInspector(){
 const ticket=$('[data-request="'+selected+'"]');
 if(!ticket.offsetWidth){selectRequest('checkout');return;}
 const stage=$('.request-stage');
 if(window.matchMedia('(max-width:600px)').matches){stage.style.removeProperty('--inspector-x');return;}
 const panel=$('.inspector');
 const center=ticket.offsetLeft+ticket.offsetWidth/2;
 const left=Math.max(0,Math.min(center-panel.offsetWidth/2,stage.clientWidth-panel.offsetWidth));
 stage.style.setProperty('--inspector-x',left+'px');
}
all('[data-request]').forEach(button=>button.addEventListener('click',()=>selectRequest(button.dataset.request)));
const inspectorResizeObserver=new ResizeObserver(()=>positionInspector());
inspectorResizeObserver.observe($('.requests'));
inspectorResizeObserver.observe($('.inspector'));
all('[data-inspect]').forEach(b=>b.addEventListener('click',()=>{tab=b.dataset.inspect;renderInspector();}));
$('.inspector-tabs').addEventListener('keydown',e=>{const tabs=all('[data-inspect]');let i=tabs.indexOf(document.activeElement);if(i<0)return;if(e.key==='ArrowRight')i=(i+1)%tabs.length;else if(e.key==='ArrowLeft')i=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=tabs.length-1;else return;e.preventDefault();tabs[i].focus();tabs[i].click();});
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
function setPaused(paused){document.body.classList.toggle('motion-paused',paused);$('.motion-toggle').setAttribute('aria-pressed',paused);$('.motion-toggle span').textContent=paused?data.labels.resume:data.labels.pause;$('.motion-toggle path').setAttribute('d',paused?'m8 5 11 7-11 7Z':'M8 5v14M16 5v14');}
setPaused(motion.matches);motion.addEventListener('change',e=>setPaused(e.matches));
$('.motion-toggle').addEventListener('click',()=>setPaused(!document.body.classList.contains('motion-paused')));
$('.mascot-button').addEventListener('click',()=>{$('[data-request="checkout"]').click();$('#demo-hint').textContent=data.labels.sniff;$('.mascot-button').classList.remove('sniffing');requestAnimationFrame(()=>$('.mascot-button').classList.add('sniffing'));});
$('.mascot-button').addEventListener('animationend',()=>$('.mascot-button').classList.remove('sniffing'));
const featureDescriptions = [
 [text('Match an endpoint and return a local mock. Keep the original exchange, see what changed, and make the failure happen whenever you need it.','Dopasuj endpoint i zwróć lokalny mock. Zachowaj oryginalną wymianę, zobacz zmianę i wywołuj błąd wtedy, gdy go potrzebujesz.'),'https://github.com/dalkedev/snurpo/blob/main/docs/RULES.md',text('Explore traffic rules','Poznaj reguły ruchu')],
 [text('Follow the whole exchange: method, URL, headers, body and timing. Combine filters to find the failing calls without losing their context.','Prześledź całą wymianę: metodę, URL, nagłówki, body i czas. Łącz filtry i znajdź nieudane requesty wraz z kontekstem.'),'https://github.com/dalkedev/snurpo/blob/main/docs/SEARCH.md',text('Learn the filters','Poznaj filtry')],
 [text('Edit the method, URL, headers or body, then replay. Every replay creates a new exchange, so you can compare it with the original.','Zmień metodę, URL, nagłówki albo body i ponów request. Każde ponowienie tworzy nową wymianę, którą porównasz z oryginałem.'),'https://github.com/dalkedev/snurpo/blob/main/docs/GETTING_STARTED.md',text('Explore replay','Poznaj ponawianie')],
 [text('Review the full command before copying. Bring captured headers and bodies to sh, bash or zsh without sending another request from the preview.','Sprawdź całą komendę przed skopiowaniem. Przenieś nagłówki i body do sh, bash lub zsh. Podgląd nie wysyła kolejnego requestu.'),'https://github.com/dalkedev/snurpo/blob/main/docs/GETTING_STARTED.md#copy-a-request-to-your-terminal',text('Read the cURL guide','Poznaj Copy as cURL')]
];
const galleryButtons = all('[data-gallery]');
const demo = $('#capture-demo');
const screenshot = $('#capture-screenshot');
const description = $('#gallery-description');
galleryButtons.forEach(button => button.addEventListener('click', () => {
  const item = button.dataset.gallery;
  const showDemo = item === 'demo';
  for (const option of galleryButtons) {
    option.classList.toggle('active', option === button);
    option.setAttribute('aria-pressed', String(option === button));
  }
  demo.hidden = !showDemo;
  screenshot.hidden = showDemo;
  description.hidden = showDemo;
  if (showDemo) return;

  demo.querySelector('video').pause();
  const entry = data.gallery[item];
  const [copy, href, linkText] = featureDescriptions[item];
  const image = $('#app-screen');
  image.src = '/assets/' + entry.file + '.webp';
  image.alt = entry.label + ' · Snurpo ' + entry.version;
  image.closest('button').dataset.image = entry.file;
  $('#gallery-caption').textContent = entry.caption;
  $('#gallery-version').textContent = 'Snurpo ' + entry.version;
  description.querySelector('p').textContent = copy;
  const link = description.querySelector('a');
  link.href = href;
  link.firstChild.textContent = linkText;
}));
$('#mock-toggle').addEventListener('click',()=>{let enabled=$('#mock-toggle').getAttribute('aria-checked')!=='true';$('#mock-toggle').setAttribute('aria-checked',enabled);$('#mock-feedback').textContent=enabled?data.labels.mock:data.labels.reset;});
$('#copy-command').addEventListener('click',async()=>{const button=$('#copy-command');try{await navigator.clipboard.writeText(data.command);button.querySelector('span').textContent=data.copy.copiedLabel;$('#copy-feedback').textContent=data.copy.copiedLabel;setTimeout(()=>{button.querySelector('span').textContent=data.copy.copyLabel;$('#copy-feedback').textContent='';},2500);}catch{$('#copy-feedback').textContent=data.copy.copyFailedLabel;const selection=window.getSelection(),range=document.createRange();range.selectNodeContents($('#curl-command'));selection.removeAllRanges();selection.addRange(range);}});
const dialog=$('#image-dialog');let opener;
all('.screenshot-open').forEach(b=>b.addEventListener('click',()=>{opener=b;const file=b.dataset.image;$('#dialog-image').src='/assets/'+file+'.webp';$('#dialog-image').alt=b.querySelector('img').alt;$('#dialog-caption').textContent='Snurpo '+(file==='copy-as-curl'?'1.5.0':'1.4.2')+' · '+text('Native app','Natywna aplikacja');dialog.showModal();}));
$('#close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>opener?.focus());
renderInspector();

function startTicketCase() {
  const root = document.getElementById('case');
  const find = selector => root.querySelector(selector);
  const workbench = find('[data-case-workbench]');
  const filter = find('[data-case-filter]');
  const list = find('#case-requests');
  const quantity = find('#case-qty');
  const form = find('[data-case-form]');
  const validation = find('#case-validation');
  const feedback = find('[data-case-status]');
  const labels = data.caseLabels;
  const format = new Intl.NumberFormat(data.lang, { useGrouping: 'always' });
  const paths = ['/printer/status', '/events', '/catalog', '/session'];
  const fixtureSize = 1001;
  const archive = Array.from({ length: fixtureSize }, (_, index) => ({
    id: index + 1, method: 'GET', path: paths[index % paths.length], status: 200
  }));
  const original = { id: 17, method: 'POST', path: '/tickets/print', status: 422, qty: 0 };
  archive[original.id - 1] = original;
  let errorsOnly = false;
  let selectedId = null;

  function view(name) {
    for (const panel of root.querySelectorAll('[data-case-view]')) {
      panel.hidden = panel.dataset.caseView !== name;
    }
  }

  function renderList() {
    const matches = errorsOnly ? archive.filter(row => row.status >= 400) : archive;
    const newest = matches.slice(-4).reverse();
    const fragment = document.createDocumentFragment();
    for (const row of newest) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'case-row';
      button.dataset.rowId = row.id;
      button.setAttribute('aria-pressed', String(row.id === selectedId));
      const number = document.createElement('span');
      number.className = 'case-row-number';
      number.textContent = '#' + String(row.id).padStart(4, '0');
      const endpoint = document.createElement('code');
      endpoint.textContent = row.method + ' ' + row.path;
      const status = document.createElement('span');
      status.className = 'status ' + (row.status >= 400 ? 'fail' : 'ok');
      status.textContent = row.status;
      button.append(number, endpoint, status);
      fragment.append(button);
    }
    list.replaceChildren(fragment);
    filter.setAttribute('aria-pressed', String(errorsOnly));
    find('[data-case-scope]').textContent = errorsOnly ? labels.oneMatch : labels.lastFour;
    find('[data-case-count]').textContent = labels.requests + ' · ' + format.format(archive.length);
  }

  function clearValidation() {
    validation.hidden = true;
    quantity.removeAttribute('aria-invalid');
  }

  function showWaiting() {
    view('waiting');
    find('[data-case-recent-hint]').hidden = errorsOnly;
    find('[data-case-filtered-hint]').hidden = !errorsOnly;
  }

  function showPrint(row) {
    view('printed');
    find('[data-case-payload]').textContent = '{ "qty": ' + row.qty + ' }';
    feedback.textContent = labels.replaySuccess;
  }

  list.addEventListener('click', event => {
    const selectedButton = event.target.closest('button[data-row-id]');
    if (!selectedButton) return;
    selectedId = Number(selectedButton.dataset.rowId);
    const row = archive[selectedId - 1];
    for (const button of list.children) {
      button.setAttribute('aria-pressed', String(button === selectedButton));
    }
    if (row.status === 422) {
      view('edit');
      clearValidation();
      quantity.value = String(row.qty);
      feedback.textContent = labels.opened;
    } else if (row.status === 201) {
      showPrint(row);
    } else {
      view('healthy');
      find('[data-case-healthy-path]').textContent = row.method + ' ' + row.path;
      feedback.textContent = row.path + '. ' + labels.healthy;
    }
  });

  filter.addEventListener('click', () => {
    errorsOnly = !errorsOnly;
    selectedId = null;
    showWaiting();
    renderList();
    feedback.textContent = errorsOnly ? labels.oneError : labels.recent;
  });

  quantity.addEventListener('input', clearValidation);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const qty = quantity.valueAsNumber;
    if (!Number.isSafeInteger(qty) || qty < 1) {
      validation.hidden = false;
      quantity.setAttribute('aria-invalid', 'true');
      quantity.focus();
      return;
    }
    const replay = { ...original, id: archive.length + 1, qty, status: 201 };
    archive.push(replay);
    selectedId = replay.id;
    errorsOnly = false;
    renderList();
    showPrint(replay);
    find('[data-case-result-title]').focus();
  });

  find('[data-case-reset]').addEventListener('click', () => {
    archive.length = fixtureSize;
    selectedId = null;
    errorsOnly = false;
    form.reset();
    clearValidation();
    showWaiting();
    renderList();
    feedback.textContent = labels.reset;
    filter.focus();
  });
  renderList();
  workbench.hidden = false;
}

startTicketCase();
