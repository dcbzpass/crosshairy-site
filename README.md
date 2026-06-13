# crosshairy.site

Marketing / landing site for **[CrosshairY](https://github.com/dcbzpass/CrosshairY)**, a free, open-source,
click-through crosshair overlay for Windows.

Live at **[crosshairy.site](https://crosshairy.site)**, served as a static site from this repo via GitHub Pages
(the `CNAME` file binds the custom domain).

## Project structure

```
.
├── index.html              Page markup only (no inline CSS/JS)
├── CNAME                   Custom domain for GitHub Pages
├── favicon.ico             Served from root (browser default path)
├── apple-touch-icon.png    Served from root (iOS default path)
└── assets/
    ├── img/
    │   └── logo.png        Nav / brand mark
    ├── css/
    │   └── styles.css      All styles
    └── js/                 ES modules (no build step)
        ├── main.js         Entry point, imports and boots each feature
        ├── env.js          Shared flags (reduced-motion, pointer type)
        ├── crosshair.js    Crosshair render engine + the 17 templates
        ├── loader.js       Boot loader animation
        ├── lab.js          "The Lab" interactive customizer
        ├── proof.js        Proof Mode demo toggle
        ├── ui.js           HUD coords, scroll-reveal, card tilt
        └── hero3d.js       three.js hero background
```

The JavaScript is plain ES modules loaded with `<script type="module">`, so there is no build step or
toolchain. What's in the repo is exactly what ships. [three.js](https://threejs.org/) is loaded from a CDN
as a classic script before `main.js`, exposing the `THREE` global the hero scene uses.

## Local development

It's static files, so any static server works. From the repo root:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. A server (rather than opening `index.html` directly) is required because
ES modules are blocked under the `file://` protocol.

## Deployment

Push to `main`. GitHub Pages serves the repo root; the `CNAME` file keeps the `crosshairy.site` domain bound.
