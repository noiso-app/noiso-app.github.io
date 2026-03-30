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
- Vite for local development
- GitHub Pages for hosting

## What Lives Here

- `index.html` - main landing page
- `support/index.html` - public support page and FAQ
- `privacy/index.html` - public privacy policy
- `styles.css` - shared site styles
- `app.js` - landing page demo interactions, preset switching, timer UI, and audio playback
- `assets/audio/` - bundled demo audio presets
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
- GitHub Pages serves the checked-in files directly from the repository root.
- `vite build` is mainly useful for local validation, not as the deployment source of truth.

## Deployment

The live site is served from GitHub Pages for this repository:

- repo: `noiso-app/noiso-app.github.io`
- branch: `main`
- custom domain: `noiso.app`

Supporting files already in the repo:

- `CNAME`
- `.nojekyll`

Typical deploy flow:

1. Edit the site files in the repo root.
2. Commit changes to `main`.
3. Push to GitHub.
4. Wait for GitHub Pages to publish the new revision.

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
