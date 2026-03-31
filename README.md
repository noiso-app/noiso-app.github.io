# Noiso Landing Site

Static marketing site for the Noiso iPhone app.

Production URL: [https://noiso.app/](https://noiso.app/)

The site is intentionally simple:

- one landing page
- one support page
- one privacy page
- static assets only
- no framework runtime
- GitHub Pages deployment with a custom domain

## Stack

- HTML
- CSS
- vanilla JavaScript
- Vite for local development and production builds
- GitHub Pages for hosting

## What Lives Here

- `index.html` - main landing page
- `support/index.html` - public support page and FAQ
- `privacy/index.html` - public privacy policy
- `app.js` - thin browser entry point for the landing page
- `site-demo.js` - landing page interaction logic, audio handling, timer behavior, and gesture handling
- `site-config.js` - preset catalog, timer options, environment detection, and shared constants
- `styles.css` - shared site styles
- `assets/audio/` - bundled demo audio presets (`.wav`, matched to the app assets for seamless looping)
- `assets/backgrounds/` - atmospheric background images
- `assets/screenshots/` - iPhone screenshots used on the landing page
- `assets/icon/` - app icon asset for the site
- `robots.txt` - crawler directives
- `sitemap.xml` - sitemap for `noiso.app`
- `llms.txt` - short machine-readable summary for AI systems that look for it
- `CNAME` - GitHub Pages custom domain mapping
- `.nojekyll` - disables Jekyll processing on GitHub Pages

## Local Development

Requirements:

- Node.js
- Yarn 4

Install dependencies:

```bash
yarn install
```

Start a local dev server:

```bash
yarn dev
```

Preview the current site build:

```bash
yarn build
yarn preview
```

Notes:

- The site is static and does not depend on a backend.
- Vite builds all three HTML entry points: `/`, `/support/`, and `/privacy/`.
- Static deployment files such as `CNAME`, `robots.txt`, `sitemap.xml`, `llms.txt`, `.nojekyll`, and the original `assets/` tree are copied into `dist/` during build.

## Deployment

The live site is served from GitHub Pages for this repository:

- repo: `noiso-app/noiso-app.github.io`
- source: GitHub Actions artifact from `dist/`
- custom domain: `noiso.app`

Build and deploy flow:

1. Push changes to `main`.
2. GitHub Actions runs `yarn build`.
3. The workflow uploads `dist/` as the Pages artifact.
4. GitHub Pages deploys the built site.

Workflow file:

- `.github/workflows/deploy.yml`

One-time repository setting:

- In `Settings -> Pages`, set the publishing source to `GitHub Actions`.
- After that, Vite-generated hashed asset filenames handle cache busting automatically, so manual `?v=...` suffixes are not needed.

## SEO And Machine-Readable Metadata

The site includes:

- page titles and descriptions
- canonical URLs
- Open Graph and Twitter metadata
- structured data via JSON-LD
- `robots.txt`
- `sitemap.xml`
- `llms.txt`

If you change URLs, page purpose, or domain behavior, update those files in the same change.

## Analytics

The site uses Yandex Metrika.

Current counter ID:

- `108310966`

The tag is embedded directly in:

- `index.html`
- `support/index.html`
- `privacy/index.html`

If analytics behavior changes, keep the privacy page aligned with the actual site behavior.

## Content Notes

This repo is for the website, not the iOS app source code.

The site should stay aligned with the current product constraints:

- offline sleep sounds
- seven ambient presets
- background playback
- sleep timer
- no ads
- no subscriptions
- no account system

Avoid adding marketing copy that implies features the app does not have.

## Related Repositories

- app source: `Noiso`
- site source: `noiso-app.github.io`
