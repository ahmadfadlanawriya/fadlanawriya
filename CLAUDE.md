# CLAUDE.md

Personal portfolio for **Ahmad Fadlan Awriya**, Senior Growth Manager, written for
recruiters and hiring managers. Astro 7, static output, no adapter. Five case studies in
MDX, a CV page, and a homepage index. The visual system is "The Line Diagram" — transit
wayfinding — and it is documented in `DESIGN.md`, which is authoritative for anything
visual. `PRODUCT.md` (gitignored) holds the product reasoning.

## Commands

```
npm run dev       # localhost:4321
npm run build     # also the typecheck — see below
npm run preview   # serve dist/
```

**Do not run `npm run check`.** `astro check` prompts to install its own dependency and
blocks forever in a non-interactive shell. `npm run build` type-checks content collections
and is the check that matters.

## Build traps

These cost real time to find. None are obvious from reading the code.

- **`overrides.satteri: "0.10.5"` in `package.json` is load-bearing.** Astro 7's markdown
  processor pulls satteri 0.10.4, which pins an arm64 binding that was never published to
  npm; without the override `astro sync` dies on Apple Silicon with "Cannot find native
  binding". Do not remove it.
- **`sharp` is a direct dependency on purpose.** It is only an *optional* dependency of
  Astro, so a `--no-optional` install would silently break the image pipeline.
- **Astro scoped `<style>` is unlayered**, so it outranks everything in `src/styles/*.css`,
  which is layered. That is the legitimate way a component overrides the cascade.
- **`src/styles/prose.css:25` caps every list at `--measure`.** Any component that breaks
  the measure needs `max-width: none` in its own scoped styles. This silently confined
  every `Pipeline` on the site until it was caught — the figure was full width while its
  `<ol>` sat at 643px inside it, with no visible symptom.

## Design law

`DESIGN.md` is the authority — 21 named rules. The four below are the ones most easily
broken while editing code, blind:

- **`src/styles/tokens.css` is the only file containing a literal colour, size or
  duration.** Five colours, no invented sixth; new colours are `color-mix()` of those five.
- **Never type a character outside the loaded Overpass latin subset.** `→` (U+2192) and `①`
  (U+2460) both fall through to Helvetica, putting a second typeface on a site whose first
  typography rule forbids one. Use `<To />` for the flow mark and draw marks in CSS —
  `src/components/To.astro` records the full reasoning.
- **No bare markdown images.** `NoBareImage.astro` throws at build time by design; captures
  go through `Wallmap.astro`, which also throws on a missing file, an unannotated
  redaction, or an off-canvas callout.
- **Colour never enters the reading column.** Emphasis is weight, scale and ink rules; the
  coloured mark lives out in the route rail.

## Content authority

- **Fadlan writes the case-study prose elsewhere and pastes it in.** Claude owns
  frontmatter, structure, component placement and encoding repair — not the argument and
  not the numbers. Don't rewrite his copy uninvited.
- **`src/content/cv/cv.yaml` is the sole authority for job titles and employment dates.**
  A case study's `year` is the business-line span, not the employment span. Join work to CV
  on `cvKey`, never on company name (`src/content.config.ts:36`).
- **Confidentiality:** no commission rates, no margin structures, no exact Taktis GMV.
  Ratios and multiples are fine — "roughly double to triple the contribution" survives
  because it is a ratio, not a rate.
- **Never invent a contact detail, date or figure.** Missing values render as a visible red
  pending marker; `profile.md` omits `cv:` for exactly this reason.
- **Redaction is burned into the image file, never CSS.** A CSS overlay ships the original
  pixels to anyone who opens devtools.

## Repo and deploy

- **The repo is public.** `PRODUCT.md` is gitignored for that reason and must never be
  committed. `DESIGN.md` ships deliberately.
- **Git identity is set repo-locally** to the personal address, because the global config
  is an employer address. Don't commit under the global identity.
- **`http.version=HTTP/1.1` is set repo-locally.** Pushes fail with HTTP 400 under HTTP/2
  on this network. Pack size is not the cause, so raising `postBuffer` will not help.
- **Deploy:** push to `main` → `.github/workflows/deploy.yml` builds → force-pushes `dist/`
  to an orphan **`deploy`** branch → Hostinger clones `deploy`. Hostinger never runs a
  build. Each build rewrites the orphan history, so a Hostinger pull that fast-forwards
  will eventually refuse; recloning fixes it.
- **Analytics:** GTM container `GTM-5W9MJKST`, feeding GA4 property `G-BMBG4PG5ML`. The
  measurement ID appears **nowhere in this repo** — it lives only in the container's Google
  Tag — so a GA4 problem is almost always a GTM console problem, not a code problem.
  `PUBLIC_GTM_ID` is a repository *variable*, not a secret: it ships in the HTML of every
  page. `Analytics.astro` gates on `PROD && PUBLIC_GTM_ID`, so `npm run dev` ships nothing.
  Changing the variable does **not** trigger a build; use the `workflow_dispatch` button.
- **Consent defaults to denied** for all four storage types. The site pushes those defaults,
  but the GTM tag must be set to *require* `analytics_storage` in its Consent Settings or it
  fires regardless and the banner is decorative. That switch is invisible from this repo.
  Verify by request parameter, not GA4 Realtime: before consent the GA4 request should carry
  `gcs=G100`, after Allow `gcs=G111`. A tag that never fires and a tag correctly blocked by
  consent look identical in Realtime.
- **The `<noscript>` GTM iframe is omitted deliberately.** It would fire the container for
  visitors with no JavaScript, who have no way to consent. Don't add it back.

## Still open

- Taktis is the only case study without a capture.
- The CV PDF has never been supplied — the full one carries a phone number, so a
  phone-free variant is needed before `public/cv.pdf` and `profile.md`'s `cv:` field exist.
- `og:image` is omitted rather than pointed at a missing file. No `og.png` yet.
- `fadlanawriya.id` is unbought; `astro.config.mjs` already declares it as `site`, which
  affects only canonical and absolute OG URLs.
