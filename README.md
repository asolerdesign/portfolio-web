# Alberto Soler — Portfolio

Graphic design & visual communication portfolio. Swiss/utilitarian, monochromatic,
typographic. Single-page React app with an interactive WebGL "liquid" wallpaper
background.

Built with [Vite](https://vitejs.dev/) + React. Deploys as a fully static site.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

## Production build

```bash
npm run build    # outputs static files to dist/
npm run preview  # serve the built dist/ locally to verify
```

## Project structure

```
index.html                  Vite entry (mounts #root, loads /src/main.jsx)
src/
  main.jsx                  Entry — imports CSS, <image-slot>, wallpaper, app
  app.jsx                   App shell, screen routing, Tweaks panel
  screens.jsx               Home, Work, Case study, About, Contact + WORKS data
  components.jsx            Nav, footer, icons, contact form, breadcrumbs
  tweaks-panel.jsx          Live design tweaks (margins, grid, hero aspect)
  image-slot.js             <image-slot> custom element (drag-and-drop images)
  wallpaper-bg.js           WebGL liquid shader background (hidden ≤1024px)
  colors_and_type.css       Halenoir font faces + design tokens
  styles.css                Layout & component styles
public/
  fonts/                    Halenoir OTF files  (served at /fonts/…)
  assets/                   Images & SVGs       (served at /assets/…)
  image-slots.state.json    Persisted dropped images (read-only at runtime)
  _redirects                SPA fallback for Cloudflare Pages
```

### A note on images

`<image-slot>` lets you drag images into placeholders, persisted via
`image-slots.state.json`. On the deployed static site this sidecar is **read-only**
(there is no write bridge), so it restores any images that were already dropped but
won't save new ones. Projects with a fixed `image:` field in `screens.jsx`
(e.g. Can Soler) always render their image.

## Deploy: GitHub → Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**,
   and select the repo.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Cloudflare runs the build and serves `dist/` at your `*.pages.dev` domain
   (and any custom domain you attach).

`base` is `/` and `public/_redirects` provides the SPA fallback, so no extra config
is needed.
