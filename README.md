# Snurpo website

An interactive English and Polish home for Snurpo, the local HTTP(S) debugger.

## Run

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:57171. English is `/`, Polish is `/pl/`.
The site has no runtime dependencies, external font service, analytics or account system.

## Edit

- `build.mjs`: page structure and short page-specific copy; generates both routes.
- `content.json`: product facts, EN/PL copy and verified release links.
- `styles.css`: visual system and responsive layouts.
- `app.js`: request inspector, gallery, motion toggle, mock example, screenshot dialog and clipboard action.
- `assets/provenance.json`: source, transformation and version of each image.
- `fonts/`: self-hosted Fredoka and Manrope, with their OFL licenses.

Rebuild after source changes. Only `dist/` is served. Example requests are local presentation data and never send network requests. Snurpo screenshots are actual native app captures; inspector/replay/analysis are 1.4.2, Copy as cURL is 1.5.0. They contain no pointer or macOS system sharing strip.

## Hosting

The source uses Sites hosting. `.openai/hosting.json` preserves its project identity. It can also be deployed as static output using `node build.mjs` and output directory `dist`.

The canonical origin is `https://snurpo.dev`: English at `/`, Polish at `/pl/`. The build generates absolute canonical, language-alternate and social-image URLs, permits crawling in `robots.txt`, and lists both language routes in `/sitemap.xml`. Submit `https://snurpo.dev/sitemap.xml` to Google Search Console after the domain is verified. Both hostnames use apex canonical URLs; redirect and TLS configuration are hosting concerns.

Downloads currently target verified release 1.5.0. Update `content.json` when releasing a newer app. Screenshot captions must retain the version actually pictured.

## Verification

JavaScript syntax and static route/asset/anchor checks passed. Browser interactions were exercised through CUA at desktop and mobile sizes, in both languages. See `.impeccable/review/verification.md` for the local evidence and limits. The final design review and design-system files are retained with the working source.
