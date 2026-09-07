# Wall map captures

Screenshots and photographs quoted into case studies by `src/components/Wallmap.astro`.

**This directory holds wall-map captures and nothing else.** The component resolves files
through an eager `import.meta.glob`, which emits every image in here at build time —
including ones no page references, and those are never cleaned up.

## Before you add a file

- **Redact first.** Solid `#10141a` rectangles on flattened pixels, zero corner radius.
  Never blur or pixelate — both are reversible in principle and read as damage. Redaction
  happens in the image file, never in the browser: a DOM overlay ships the original pixels.
- **Name it** `<employer>-<view>.png`, kebab-case, with `.redacted` before the extension
  when bars are present — e.g. `beeja-lead-queue.redacted.png`. A file named `.redacted.`
  fails the build unless the component is given a `redaction` note.
- **Capture at** 1440×900 CSS px, DPR 2, page content only — no browser chrome, cursor,
  tooltips, hover states or focus rings.
- **Crop to** ≥1728px wide (2400–2880 ideal), aspect between 1.5:1 and 1.85:1, never taller
  than 1.25:1. Leave ~3% quiet margin; keep callouts between 6–94% on both axes.
- **Never retouch.** A screenshot is evidence; an edited one is a claim.

Full spec: `DESIGN.md` → Imagery.
