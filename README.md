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

The public source lives in [dalkedev/snurpo-site](https://github.com/dalkedev/snurpo-site). Production is hosted by the [snurpo-site project on Vercel](https://vercel.com/sculpttechprojects-projects/snurpo-site), with automatic deployments from `main`. The domain is registered at OVH, which also manages DNS. The previous Sites deployment is retained temporarily during DNS propagation.

Vercel uses the **Other** framework preset and repository root as the project directory. `vercel.json` sets `npm run build`, the `dist` output directory and trailing-slash URLs, preserving `/pl/`. No environment variables or runtime services are required. Browser caching is limited to one day for assets and one week for fonts; filenames are not treated as immutable. The current Vercel build uses Node.js 26; the repository does not pin a Node version.

The former Sites project metadata has been removed from the current source tree. Local Vercel project metadata and `.env` files are also ignored. Generated HTML and `dist/` remain tracked for now; rebuild before committing source edits.

The canonical origin is `https://snurpo.dev`: English at `/`, Polish at `/pl/`. The build generates absolute canonical, language-alternate and social-image URLs, permits crawling in `robots.txt`, and lists both language routes in `/sitemap.xml`. The domain is verified in Google Search Console, with `https://snurpo.dev/sitemap.xml` submitted for both language routes. Both hostnames use apex canonical URLs; redirect and TLS configuration are hosting concerns.

Downloads currently target verified release 1.5.0. Update `content.json` when releasing a newer app. Screenshot captions must retain the version actually pictured.

## Documentation

The public developer guide is served at [snurpo.dev/docs](https://snurpo.dev/docs/). Its 14 English guides cover installation, first capture, HTTPS, search, rules and breakpoints, replay and cURL, sessions, analysis, MCP, experimental Android, the separate HAR comparison CLI, troubleshooting and release compatibility. Both language versions of the landing page link to the guide.

Canonical Markdown lives in the [application repository's `docs/website` directory](https://github.com/dalkedev/snurpo/tree/main/docs/website). Change the Markdown there, then rebuild this site with that checkout:

```sh
npm run build -- --docs-source ../snurpo/docs/website
npm run check
npm run test:docs
```

`scripts/build-docs.mjs` renders a small escaped Markdown dialect and validates page links and fragments before writing. `docs-ui/template.mjs`, `docs-ui/docs.css` and `docs-ui/docs.js` own the Snurpo layout, local search and clipboard interactions. The build generates all page metadata, the search index, a source/hash manifest and sitemap entries. Documentation has no external search service or runtime Markdown dependency.

Commit the generated `dist/docs` pages alongside the renderer changes. A standalone Vercel build verifies the checked-in page hashes without fetching another repository. Do not edit generated page HTML directly; rebuild it from canonical Markdown. The guide keeps stable deep links and explicit version captions on native screenshots. Remaining `scope-*` runtime names are compatibility identifiers, not outdated brand copy to rename blindly.

## License

The website source and Snurpo artwork are available under **AGPL-3.0-or-later**; see [LICENSE](LICENSE) and [asset provenance](assets/provenance.json). The bundled Fredoka and Manrope fonts retain their separate SIL Open Font License notices in [fonts/fredoka-LICENSE.txt](fonts/fredoka-LICENSE.txt) and [fonts/manrope-LICENSE.txt](fonts/manrope-LICENSE.txt).

## Verification

Run `npm run check` and `npm run build` before deployment. JavaScript syntax and static route/asset/anchor checks passed during migration preparation. Browser interactions were exercised through CUA at desktop and mobile sizes, in both languages. Local browser evidence and its limits are retained in the ignored `.impeccable/review/` directory; the public repository retains `DESIGN.md` and `.impeccable/design.json`.
