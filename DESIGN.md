---
name: Fadlan Awriya
description: A career read as a route map — transit wayfinding for a growth manager who builds.
colors:
  ground: "#e8ebee"
  sheet: "#f7f9fa"
  ink: "#10141a"
  route: "#0b4fb0"
  interchange: "#c3341d"
  rule: "color-mix(in srgb, #10141a 18%, transparent)"
  rule-strong: "color-mix(in srgb, #10141a 38%, transparent)"
  ink-quiet: "color-mix(in srgb, #10141a 68%, #e8ebee)"
  route-quiet: "color-mix(in srgb, #0b4fb0 12%, #e8ebee)"
  selection: "color-mix(in srgb, #0b4fb0 22%, #e8ebee)"
typography:
  display:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 0.95rem + 4.1vw, 4rem)"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  station:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.3125rem, 1rem + 1.5vw, 2.125rem)"
    fontWeight: 700
    lineHeight: 1.28
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.28
    letterSpacing: "normal"
  body:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  meta:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1.28
    letterSpacing: "normal"
  small:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.28
    letterSpacing: "0.08em"
  label:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.28
    letterSpacing: "0.08em"
rounded:
  none: "0"
  tick: "50%"
spacing:
  "2xs": "0.25rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  "2xl": "4rem"
  "3xl": "6rem"
components:
  link-inline:
    textColor: "{colors.route}"
    rounded: "{rounded.none}"
  sign-label:
    textColor: "{colors.ink-quiet}"
    typography: "{typography.label}"
  station-tick:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.tick}"
    size: "0.875rem"
  station-tick-hover:
    backgroundColor: "{colors.route}"
    rounded: "{rounded.tick}"
    size: "0.875rem"
  station-tick-interchange:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.tick}"
    size: "1.1375rem"
  meta-plate:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  work-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem 0"
  work-card-hover:
    textColor: "{colors.route}"
  nav-link:
    textColor: "{colors.ink-quiet}"
    typography: "{typography.small}"
    rounded: "{rounded.none}"
    padding: "0 0 0.25rem 0"
  nav-link-active:
    textColor: "{colors.ink}"
  pending-marker:
    textColor: "{colors.interchange}"
    typography: "{typography.meta}"
    rounded: "{rounded.none}"
  site-footer:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    padding: "4rem 0 6rem"
  wallmap-plate:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  map-mark:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tick}"
    size: "1.75rem"
  redaction-bar:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.none}"
---

# Design System: Fadlan Awriya

## Overview

**Creative North Star: "The Line Diagram"**

This is a transit map drawn as a website. A career is a route; each case study is a station on it; each constraint the owner removed is the interchange where the line changes direction; contact is the terminus. The world is printed rather than lit — a cool enamel-grey sheet in daylight, near-black ink, and exactly two signal colours used the way a wayfinding system uses them: one blue for the route itself, one red for the junction. Nothing here glows, floats, or gradients. It reads like an enamel sign in a station, because the visitor is a recruiter on a phone, mid-evaluation, with a CV open in another tab.

The discipline is subtractive. There is one typeface (Overpass, descended from the FHWA Highway Gothic used on road signage) doing every job through weight and tracking alone. There is one literal-value file; every colour, size and duration in the project resolves back to it. There are no boxes: structure is made with rules, voids and alignment, and the one raised surface in the entire system is a pale sign plate. Colour is kept out of the reading column entirely — it lives in strokes, ticks, links and interactive states, so that when red appears it still means something.

The build is dense at the top of the page and generous underneath: the first viewport must hand a skimmer the whole mechanism (name, claim, four stations, terminus) before they scroll, and the long reads below hold a strict 68ch measure so the reader who does go further is never fighting the width. Every layout decision follows from one question — does this block have a field to fill, or is it prose that should stay in its column?

**Key Characteristics:**
- A single continuous route stroke runs the length of every long page, with a tick at every station
- Five literal colours, no invented sixth; every other value is a `color-mix` of those five
- Achromatic reading column — colour appears only on strokes, ticks, links and interactive state
- One typeface, four weights (400/600/700/900), differentiated by weight and tracking, never by family
- Zero corner radius anywhere except the 50% circle of a station tick
- Flat by construction: no elevation shadows; the only raised plane is a pale sign plate
- One authored motion moment, site-wide: approaching a stop fills it
- The site's only third-party JavaScript is Google Tag Manager, loaded with Consent Mode v2 defaulting every storage type to denied. It is gated on a production build and a configured container ID, so a development build and a clone without one ship no script at all. There is deliberately no `<noscript>` GTM iframe: without JavaScript there is no way to consent, so without JavaScript nothing is tracked.

## Colors

A printed two-signal palette on cool enamel grey: everything structural is ink, everything navigational is blue, and red is reserved for the junction.

### Primary
- **Signal Blue** (`{colors.route}`): The route stroke itself, station tick outlines, every inline link, the heavy 4px rules that open a section or close a header, and the hover fill of a tick. This is the colour of *the line*. If a mark is part of the diagram, it is this blue.

### Secondary
- **Interchange Red** (`{colors.interchange}`): Junctions and terminals only — an `.interchange` station tick, the terminus stop in the line index, the active nav underline, the focus-visible outline, the caret, the skip-link, and the dashed marker on a value that has not been supplied yet. It is the live element and it is deliberately scarce.

### Neutral
- **Enamel Grey** (`{colors.ground}`): The page ground; the sheet the diagram prints on. Also the fill inside an unlit station tick, so the tick reads as a hole in the stroke rather than a dot on top of it.
- **Station Fill** (`{colors.sheet}`): The single raised surface — the case-study metadata plate, the wall-map plate, and the footer. Nothing else takes it.
- **Near-Black Ink** (`{colors.ink}`): All body text, all headings, and the emphasis rule on a live table row.
- **Quiet Ink** (`{colors.ink-quiet}`): Sign lettering, deks, secondary meta, table column labels. 68% ink mixed toward the ground, never a separate grey.
- **Hairline Rule** / **Strong Rule** (`{colors.rule}`, `{colors.rule-strong}`): The 1px dividers between records, and the heavier divider that opens an employer zone. Also the scrollbar thumb.

### Named Rules

**The Five Values Rule.** `src/styles/tokens.css` is the only file in the project containing a literal colour, size or duration. It holds exactly five colours. Every other colour in the system is a `color-mix()` derived from those five. A new colour is not a new token — it is a new mix, or it does not exist.

**The Achromatic Column Rule.** Colour never enters the reading column. Emphasis inside prose or a table is carried by weight, scale and an ink rule — a pull-quote is bounded by 1px ink rules top and bottom, an emphasised table row by a 2px ink underline. The mark that says "this is a turn" lives out in the route rail, where colour belongs.

**The Scarce Red Rule.** Interchange red marks a change of direction, an ending, or an unmet state — nothing else. If red appears more than two or three times in a viewport it has stopped meaning "junction" and become decoration.

## Typography

**Display Font:** Overpass (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Overpass (same face)
**Label/Sign Font:** Overpass, tracked open at 0.08em, uppercase

**Character:** Overpass descends from Highway Gothic, the FHWA lettering on road signage — it is the native voice of this world, and one face carries the whole system the way a transit network uses a single face across every sign. Hierarchy comes from weight (400 body against 900 display) and from tracking (tight -0.02em on headings, open 0.08em on signage), never from a second family. `font-synthesis-weight: none` is set, so a weight must be a real loaded weight.

### Hierarchy
- **Display** (900, `clamp(1.875rem, 0.95rem + 4.1vw, 4rem)`, 1.08, -0.02em): The page's title — the line's name. One per page, capped at 24ch on the homepage and 18ch on a case study so it wraps into a block rather than a ribbon.
- **Headline** (700, 1.75rem, 1.08): Station names — `h2`, one per station, and the heading of a prose section inside a case study, where it also carries the route tick.
- **Title** (700, 1.375rem, 1.08): `h3` — employer names, CV record headings, work-card headlines.
- **Station** (700, `clamp(1.3125rem, 1rem + 1.5vw, 2.125rem)`, 1.28): `h4` and zone headings — the level that names a stop within a zone.
- **Lead** (600, 1.25rem, 1.28): The dek under a display title, the pull-quote, the footer ask. Held to 40–48ch.
- **Body** (400, 1.0625rem, 1.6): All prose, held to a 68ch measure.
- **Meta** (700, 0.9375rem, 1.28): Record values, tags, line-index stop names, table cells.
- **Label / Sign** (700, 0.75rem, 0.08em, uppercase): The `.sign` class — captions, field labels, dates, column headers, the terminus label. Quiet ink, never black.

### Named Rules

**The One Face Rule.** Overpass at 400/600/700/900 carries every role. No second family, no serif for contrast, no system display face. If a distinction is needed, it is made with weight, size or tracking.

**The Loaded Subset Rule.** A character the loaded font does not cover is a second typeface,
silently. Overpass ships here as the Google `latin` subset, whose `unicode-range` covers
`U+2191` and `U+2193` but **not** `U+2192`, and not the circled numerals or the north-east
arrow. `unicode-range` gates *usage*, not merely availability, so the browser never even
tries Overpass for an uncovered character — it falls straight to Helvetica. Before using any
character outside Basic Latin, check it against the emitted `unicode-range`. Where a mark is
wanted rather than a letter, **draw it** — the flow mark, the bullet, the separator and the
key mark are all drawn, and `craft-floor.md` refuses glyphs standing in for an icon system
regardless.

**The Sign Lettering Rule.** Tracked uppercase (0.08em) is signage: short labels only, never a sentence and never body text. It is set `hyphens: none` so a tracked compound cannot be broken across lines.

**The Space-Above Rule.** Headings take more space above than below, so a heading belongs to the block it introduces rather than floating between two.

## Layout

The page frame is a centred column with a maximum of 74rem and a fluid gutter (`clamp(1.25rem, 0.7rem + 2.6vw, 3.5rem)`). A long read narrows further: a case-study article caps at 58rem so the text column is not stranded against an empty right edge. Prose holds a 68ch measure everywhere.

Spacing is a strict 0.5rem-derived scale (0.25 / 0.5 / 0.75 / 1 / 1.5 / 2.5 / 4 / 6rem). Nothing sits off it.

**The route and its stations.** Any page that tells a sequence is wrapped in `.route`: a 4px blue stroke pinned 2.5rem from the left edge (0.75rem below 40rem), running from the first station to the bottom, with a 0.875rem circular tick at every `.station`. A station that marks a constraint takes `.interchange` — the same tick in red, at 1.3× size. A route that ends adds `.terminates`, which draws a perpendicular terminus bar. On a case study the narrative's own `h2`s take the ticks, so the diagram is drawn by the content rather than laid over it.

**Responsive.** Two breakpoints, both meaningful rather than device-shaped. At 64rem the zone layout engages (see below). At 40rem the rail pulls in, the stroke drops to 3px, ticks shrink, horizontal pipelines and the line index restack vertically, and data tables restack into labelled rows rather than scrolling.

### Named Rules

**The Zone Rule.** A block whose content is a *labelled record list* puts its label in a sticky left column (`minmax(14rem, 19rem)`) and its records in the field beside it — employer zones, CV sections, the footer. Continuous prose does not: it holds the measure and its rules stop at the text column, rather than declaring a field it never fills. Ask of any full-width rule: is there a field under it, or am I ruling a void?

**The Grid Rule.** Every measurement comes from the spacing scale or from a token. A one-off pixel value is a defect, not a decision.

**The No-Scroll-Table Rule.** A table narrower than 40rem restacks into rows, each cell carrying its own column label, so the header association survives without JavaScript and without a horizontal scroller.

## Elevation & Depth

**There are no elevation shadows.** Depth is expressed as plane discipline, not as light: the base sheet (the ground), the route layer (stroke and ticks, drawn in `::before` pseudo-elements and never announced to assistive tech), the label layer (headings and text), and the interactive layer (links and controls, which alone may take interchange red). The single raised surface in the whole system is the pale station fill used by the case-study metadata plate, the wall-map plate, and the footer, and it is raised by tone and a 4px blue top rule, not by a shadow.

### Shadow Vocabulary
- **Tick halo** (`box-shadow: 0 0 0 3px var(--color-route-quiet)`): The only `box-shadow` in the system. It is a state ring on a hovered or focused station tick, not elevation. On an interchange tick the ring is drawn in the ground colour instead, so the red stays clean.

### Named Rules

**The Single Plane Rule.** Surfaces do not lift. If a block needs to separate from the page, it takes the station fill and a rule — never a shadow, never a border box.

**The One Moment Rule.** The site has exactly one authored motion idea, orchestrated across every route tick: approaching a stop fills it. Background transitions at 120ms, the halo at 320ms, both on `cubic-bezier(0.22, 1, 0.36, 1)`. Nothing is hidden at rest and nothing animates on load, so the reduced-motion guard removes an enhancement rather than content.

## Shapes

The form language is a printed diagram: straight strokes, right angles, and one circle.

Corner radius is **zero everywhere**. The only curve in the system is the 50% circle of a station tick — a stop on a line, drawn as an open ring (ground fill, 4px blue stroke) so the route reads as passing *through* it.

There are no boxes. Structure is made from three stroke weights, each with a fixed meaning:
- **4px blue** (`--route-stroke`) — the route: the stroke itself, a section-opening rule, a table's header rule, the top edge of a raised plate, the focus outline (in red).
- **2px ink** — emphasis on a live record row.
- **1px hairline** — a divider between records, and nothing structural.

Small marks reuse the route stroke as their unit: a prose bullet is a 0.75rem × 4px blue dash (a track segment, not a disc), a tag separator is a 4px × 4px square, a terminus is a 4px bar laid across the line, and the **flow mark** — the "X to Y" connector inside prose — is a 0.8em dash closed by a drawn head. The flow mark is the one small mark drawn in `currentColor` rather than blue: it stands in for a text character and lives inside the reading column, where the Achromatic Column Rule admits no colour. The bullet is blue only because it sits out at the rail. A value that is missing rather than absent is drawn as a 2px dashed red underline — the line is drawn, the connection is not yet made.

## Imagery

The site draws diagrams and quotes captures. Those are different acts and the system
treats them differently. A diagram — a pipeline, a line index, a table — is made of the
system's own five values and obeys every rule in this document. A capture is a record of
something that exists elsewhere; its colours are evidence, not decisions, and no rule here
can or should govern them. What the system governs is how the quote is framed, how much of
it there is, and what the site is permitted to do to it.

The one form is the **wall map**: a capture mounted flush on the station plate under a 4px
blue rule, marked with numbered station marks, and keyed beneath by a numbered legend that
carries the argument. It sits in the route's field rather than the reading measure, which
is both what makes it legible and what keeps its colours out of the reading column.

### Named Rules

**The Quoted Material Rule.** A capture is quoted, not authored. The Five Values Rule and
the Achromatic Column Rule govern what the system *draws*, not what the page *depicts* — so
a capture may contain any colours at all, under four conditions: it is visibly quoted
(plate, blue rule, source line); the system never samples a colour out of it into the
palette or tints a mark to match it; quotation is rationed, one plate per case study and
never in the first viewport; and the only mark the site adds inside the quote is redaction,
in `{colors.ink}`. Break any of the four and it has stopped being a quotation and become a
sixth value.

**The Plate-or-Nothing Rule.** A raster enters this site only on the station plate, with a
source line naming what it is. No bare image in MDX, no image on the ground, no image
inside the 68ch measure. `img` is mapped to a component that throws, so a bare `![](…)` in
a content file fails the build rather than shipping an unplated raster.

**The Burned Redaction Rule.** Redaction is destructive and happens in the image file
before it reaches the repo: solid `{colors.ink}` rectangles on flattened pixels. Never
blur, never pixelate, never a DOM overlay — if the browser can undo it, it was never
redacted, and saying so on the page is a false statement to every reader. Any altered
capture states that it is altered, in real text on the plate. A file carrying bars is named
`*.redacted.*`, and the build fails if it arrives without a note.

**The Key Survives Rule.** The legend carries the argument, not the pixels. Below 40rem the
numbered marks are not drawn — at that scale they would collide and none could be read — so
every legend note must make its point with the capture gone. A note that says "this column"
fails; a note that says "only 3–5% reach a human" holds.

**The Evidence Rule.** A capture is evidence. Real records, real volumes, real dates, no
cosmetic retouching, no invented rows, no prettier number. If the truthful state cannot be
shown, it is not shown — the Pending-Not-Faked Rule, applied to pixels.

**The Map Coordinates Rule.** Callout percentages are content coordinates, not design
measurements: they say where a thing is inside quoted material. The Grid Rule governs the
system's own spacing and is not violated by them. The same applies to raster resolutions
and `sizes`, which are network values rather than design values.

## Components

### Navigation (Masthead)
- **Character:** A station name-plate strip, not a chrome bar.
- **Style:** Wordmark in 900 weight, tracked uppercase, at meta size — the short display name only. Nav links in tracked uppercase small, quiet ink, with a 4px transparent bottom border reserved so nothing shifts on hover.
- **States:** Hover/focus fills the reserved border in route blue and darkens the label to full ink. The current page fills it in interchange red via `aria-current="page"` — the state is announced, not just drawn.
- **Mobile:** Wraps to two rows on a baseline-aligned flex; no menu, no toggle.

### Line Index (signature component)
The strip map, and the site's thesis in one element. A real `<ol>` of stops rendered as a horizontal run of items, each with a 4px blue top rule and a tick at its left, labelled with the station name and its year in sign lettering. The final item is the terminus — red rule, red tick, "Write to me / Terminus" — so the first viewport shows a visitor the whole route *and* the primary action. Each `<li>` carries `.tick-target`, which subscribes it to the site's one motion moment. Below 40rem the run restacks vertically and the rule moves to the inline start, becoming a single continuous route down the left of the list.

### Pipeline (signature component)
A process or funnel drawn in the world's own grammar: a real `<ol>`, each stage a 4px blue top rule with a tick and a 700-weight short label, wrapping gracefully from 4 to 9 stages. The last stage takes a red perpendicular terminus mark, so a sequence *ends* rather than merely stopping. Restacks vertically below 40rem on the same continuous-stroke principle as the line index.

### Data Table
- **Character:** A timetable — no fills, no zebra, no cell borders.
- **Head:** Sign lettering in quiet ink over a 4px blue rule; the first column header is a `<td>`, the rest are scoped `<th>`s. Non-first headers right-align.
- **Body:** Row headers at 400 weight in full ink; cells separated by 1px hairlines only. Numeric tables right-align and lock digits with `tabular-nums`.
- **Emphasis row:** 700 weight and a 2px **ink** underline — never colour, per the Achromatic Column Rule.
- **Narrow:** Header row hides; each row becomes a block with the row header on top and each cell a label/value flex pair.

### Case Study Header
Display headline capped at 18ch, a 600-weight lead dek at 48ch, then the metadata *below* it — never a label above the headline — as a filled station-fill plate with a 4px blue top rule and an auto-fit grid of `dt`/`dd` pairs. The whole header closes with a 4px blue rule. The "Built with" list separates items with a 4px blue square that rides the *end* of the preceding item, so a separator can never lead a wrapped line; below 40rem the separators drop and the gap does the work.

### Work Card
A record in a list, not a tile. No background, no border box, no shadow: heading link in ink, a quiet-ink dek at 54ch, sign-lettered meta, and a 1px hairline below — dropped on the last child. Hover moves the heading to route blue and underlines it at the route stroke weight.

### Experience List
One component at two densities from one source: compact (company, title, dates, one-line summary) on the homepage, full (adds context and every bullet) on the CV. Role titles are the one place route blue is used on a text run rather than a mark, distinguishing the title from the company name. Bullets are 4px blue track-segment dashes.

### Contact Actions
The three confirmed routes — email, LinkedIn, CV download — as a wrapping flex of lead-size 700-weight links in ink with a blue underline, going full blue on hover. The email address is the longest unbreakable string on the site and steps down its own size fluidly with `overflow-wrap: anywhere`. Any value not supplied renders a visible red dashed **pending marker**, never a plausible placeholder.

### Wall Map
- **Character:** A station wall map — a capture mounted in a frame with a numbered key beneath it.

A sign-lettered source line, then the capture mounted flush between two hairlines with numbered marks positioned over it by percentage, then a numbered key: sign-lettered label plus a one-line note that carries the argument, then the redaction note when the file was altered. The mark is the station tick at twice its size — the smallest ring that can hold a digit — in ground fill with the 4px blue ring, and the digit is real text, never a circled-numeral glyph, which falls outside the loaded latin subset and would silently substitute a second typeface. It is not interactive, so it never takes the site's motion moment: a key on a wall does not respond to approach. The plate spans the route's field rather than the 68ch measure, because quoted colour belongs beside the reading column and not in it. Two captures may be paired, and a pair always refuses numbered callouts — a pairing is its own argument. Each takes a sign label and, where the pairing needs explaining, a one-line note beneath it. Two arrangements: **compare**, equal columns for a matched before/after; and **pocket**, a wall map beside the pocket map you carry — a wide surface and the handset version of it, for a system built for two situations. In `pocket` the columns are deliberately unequal, the handset taking `clamp(6.5rem, 19%, 10.5rem)`, which at the plate's field width brings both captures to within a few pixels of the same height on their own. Frames and labels are rows of one shared grid, not of two independent ones, so frames bottom-align on a common edge and every label starts at the same line whatever it wraps to. Each column is served its own derivative ladder: a handset rendering at ~160px is never sent a half-field image. Below 40rem a pair stacks, and the handset is capped at 14rem and centred rather than stretched — it is still a handset. Below 40rem the marks are dropped and the key restacks to one column.

### Employer Link
- **Character:** A bare domain, quiet, in the label block.

An employer's own site is linked as its bare domain — `broom.id` — at sign size and weight
and in route blue, sitting beneath the title and dates in the homepage zone label, in the
`/cv` record, and as a `Site` row on the case-study metadata plate. **No external-link
icon**: the domain is self-evidently off-site, and borrowing or inventing a glyph for one
would commit the error the Loaded Subset Rule exists to prevent. It is not uppercased even
though it sits among sign lettering — a URL reads as a URL. It is never the employer heading
itself: the zone label must not compete with the case-study headlines beside it, and the
most prominent element on a work index should not send a visitor off-site. Every such link
carries `rel="noopener"` and opens in a new tab. A business line with its own site (Taktis)
overrides the employer's on its own case study. **A URL is verified to resolve, and its
content matched to the record, before it ships; an unverified employer gets no link at all.**

### Consent Banner
- **Character:** The station plate, laid across the foot of the page.

Fixed to the bottom edge on `{colors.sheet}` under the 4px blue top rule — the same raised surface as the metadata plate, the wall map and the footer. Zero radius, no shadow, no box. **Allow** is a filled block in route blue with sheet-coloured text, the one filled control in the system; precedent is the skip link, already a filled block in interchange red. **Decline** is a plain underlined button in ink: the two choices carry different weight but are equally easy to reach. Rendered hidden and revealed by script, never the reverse, so a visitor who already answered never sees a flash and a visitor without JavaScript never sees it at all — they load no analytics, so they have nothing to consent to. No entrance animation: the One Moment Rule spends the site's single motion idea on the route ticks.

### Prose
Descends from `.prose` at zero specificity via `:where()`, so MDX components style themselves without fighting inheritance. Unordered list markers are route dashes; blockquotes are pull-quotes bounded by 1px ink rules at lead size and 700 weight, with a blue vertical mark placed *out in the route rail* — outside the reading column, never a coloured bar inside the measure.

### Named Rules

**The Continuous Route Exception (a named, conditional exception — not a general permission).** Below 40rem, the `<li>` elements in `Pipeline.astro` and `LineIndex.astro` take `border-inline-start: var(--route-stroke) solid var(--color-route)` — a coloured left border above 1px on list items, which the craft floor's Refuse list names. The finish review examined and **accepted** it on these grounds: it is the committed visual world's central device rather than a decorative accent; it runs *continuous* through the list (the stacked `<ol>` sets `gap: 0`) rather than repeating per item; it carries meaning by colour; and the craft floor's own preamble grants the committed visual world precedence. **The condition it was accepted under: it holds only while the stroke reads as one continuous route. Any future per-item gap re-opens the finding.** This exception is scoped to these two route components. It is not permission for coloured left borders on callouts, quotes, cards or asides — those remain refused, and the prose blockquote deliberately does not take one.

**The Pending-Not-Faked Rule.** A contact value, date or figure that has not been supplied renders as a visible red dashed marker stating what is missing. Never a placeholder, never a plausible fake, never silently omitted.

**The Semantics-First Rule.** Every diagram element is drawn on real semantics: pipelines and indexes are `<ol>`s, metadata is a `<dl>`, tables carry scoped headers. Route strokes and ticks are `::before`/`::after` decoration and are never announced. A visual device that would require faking structure is not built.

## Do's and Don'ts

### Do:
- **Do** put every literal colour, size and duration in `src/styles/tokens.css` and reference it everywhere else. If a new surface needs a value, add it there or derive it with `color-mix()` from the five.
- **Do** wrap any sequential page in `.route` with `.station` children, mark a constraint with `.interchange`, and close a finished sequence with `.terminates`. A line that just stops is unfinished.
- **Do** keep colour out of the reading column. Emphasise with weight, scale and ink rules; put the coloured mark in the route rail.
- **Do** apply the Zone Rule before choosing a full-width layout: label-left/records-right at 64rem for labelled record lists, measure-held for prose.
- **Do** use `.sign` (tracked uppercase 0.08em, quiet ink, 0.75rem) for short labels, captions, dates and column headers.
- **Do** give any new interactive tick the `.tick-target` class so it inherits the site's single motion moment rather than inventing a second one.
- **Do** state a missing value as missing, in the red dashed pending style.
- **Do** reach first for this world's own unused native devices when a new surface needs a device it doesn't have — the 45°/90° dogleg, station-type symbols that distinguish a stop from an interchange from a terminus, the line roundel, inter-station annotation. These are unspent headroom in the committed world, not rules; prefer them over importing a device from outside it.

### Don't:
- **Don't** introduce a sixth literal colour, or a colour that is not a `color-mix()` of the five.
- **Don't** add a corner radius. Zero is the system; the 50% tick circle is the only exception.
- **Don't** add an elevation shadow, a gradient, or a glow. The only `box-shadow` in the system is the tick's state halo.
- **Don't** add a second typeface, a system display face, or an unloaded weight (`font-synthesis-weight` is off, so a fake bold will not render).
- **Don't** put a coloured left border on a callout, quote, aside or card. The exception recorded above is scoped to the two route components and is conditional on the stroke reading as one continuous line.
- **Don't** build a box: no bordered card, no filled tile grid. Records are separated by hairlines and space; the station fill is reserved for the metadata plate, the wall-map plate, and the footer.
- **Don't** run tracked sign lettering as body text, or let it hyphenate.
- **Don't** spend interchange red on anything that is not a junction, a terminus, a focus state or an unmet value.
- **Don't** fake structure to get a visual effect — no `<div>` pipelines, no unlabelled table columns, no decorative element announced to a screen reader.
- **Don't** let a full-width rule declare a field that has no content under it.
