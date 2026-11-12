# Snurpo deployment

Verified on 2026-11-12.

- Website: https://snurpo.dev
- Source: https://github.com/dalkedev/snurpo-site
- Hosting: https://vercel.com/sculpttechprojects-projects/snurpo-site
- Alternate production address: https://snurpo-site.vercel.app
- Production branch: `main`, deployed automatically by the Vercel GitHub integration.
- Framework: static HTML, CSS and JavaScript; `npm run build` generates `dist/` using Node.js 26 on Vercel.
- English: `/`; Polish: `/pl/`.
- DNS provider: OVH, nameservers unchanged.
- Apex A records: `216.198.79.1`, `64.29.17.1`.
- `www` CNAME: `4d591b4d0a123368.vercel-dns-017.com.`
- `www` redirects permanently to the matching apex path (HTTP 308).
- Vercel manages TLS certificates with automatic renewal.
- Google Search Console domain verification TXT and existing mail records are retained.

## Verification

53 HTTP checks passed across normal DNS and both apex addresses, with TLS verification enabled. Checks cover exact EN/PL HTML and key asset contents, canonical and language metadata, sitemap, robots, redirects and missing-page handling. The request inspector and motion control were also checked in a browser after deployment.

The earlier Sites deployment is kept temporarily as a fallback during DNS propagation. Some browser DNS caches may still return the old OVH parking address (`213.186.33.5`). This is distinct from the production deployment state.
