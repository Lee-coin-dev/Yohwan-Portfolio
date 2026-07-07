# John's Hub — Interactive Alchemy Journey

A prototype portfolio website built as an interactive, story-driven "alchemy experiment."
The visitor magnifies a lump of clay, adds reagents, heats the flask to 450°C, witnesses a
transformation, and discovers a piece of gold — a metaphor for John's intellectual journey
across humanities research and chemistry.

## Tech Stack

- **HTML / CSS / SVG** — structure, styling, and vector lab assets (flask, clay, gold, crystal)
- **GSAP.js** (via CDN) — all timeline animations, transitions, and particle motion
- No build step required.

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## The Six Sections

1. **The Laboratory** — Medieval/futuristic lab, the title, and a flask with a clay sphere. Click the red hotspot to magnify.
2. **Preparation Phase** — Zoomed flask. Open the materials panel (HAuCl₄, Liquid H₂, Philosopher's Stone) and pour them in.
3. **Alchemical Reaction Setup** — Reagents pour in sequence, then heat the brass control to 450°C.
4. **Transformation & Identity** — Green/purple vortex erupts and reveals *The Mirage of the Middle East* (Concord Review research).
5. **The Gold** — A glowing gold nugget amid broken-flask debris. Click it to learn more.
6. **The Meaning of the Gold** — John's passion for chemistry and Pioneer Academics blood-chemistry research. Restart the loop.

## Controls

- Click the glowing red hotspots and brass buttons to advance.
- The dots on the right jump between sections.
- `←` / `→` arrow keys navigate (prototype convenience).

## Color Palette

Gold `#D4AF37` · Walnut `#3B2A1A` · Charcoal `#1A1A1A` · Emerald `#00C853` ·
Cryo Blue `#AEEFFF` · Violet `#B14CFF` · Pink `#FF77D9`

> Prototype note: assets are hand-built SVG/CSS rather than 3D renders, so the "camera zoom"
> and lighting are simulated with transforms, gradients, and glows.
