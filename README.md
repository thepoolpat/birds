# Irish Corvid Identifier

An interactive, single-page field guide to the eight members of the crow
family recorded in Ireland, with a focus on the Cork region. No build step or
dependencies — just open `index.html` in a browser.

## Features

- **Interactive identifier** — filter the eight Irish corvids by plumage
  colour, beak shape, and behaviour/habitat. Filters combine across categories
  (match *all*) and broaden within a category (match *any*). Each result opens a
  detailed card with key features, voice, behaviour, biometrics and
  "often confused with" cross-links.
- **Hooded Crow & hybridisation** — a dedicated section on the
  Hooded × Carrion Crow complex, including a five-step visual *hybrid spectrum*
  (pure Hooded → hybrid grades → pure Carrion), Irish range-overlap notes, and a
  table for telling a genuine hybrid from a merely stained Hooded Crow.
- **Troubleshooting gallery** — six side-by-side lookalike scenarios most often
  misreported around Cork (e.g. Rook vs Carrion Crow, Chough vs Jackdaw,
  Raven vs Crow), each with the features that settle the call.

Species covered: Hooded Crow, Carrion Crow, Rook, Western Jackdaw, Common Raven,
Red-billed Chough, Eurasian Magpie, Eurasian Jay.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and section markup |
| `css/styles.css` | Field-guide styling, responsive layout |
| `js/data.js` | Species, hybrid and scenario data + filter definitions |
| `js/birds-svg.js` | Parametric inline SVG illustration generator |
| `js/app.js` | Filtering, rendering, detail modal and section wiring |

The bird illustrations are stylised schematic SVGs generated in-browser for
side-by-side comparison — they are diagrams, not photographs. Always confirm
tricky birds against a photographic guide and local records.
