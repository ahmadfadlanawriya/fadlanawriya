/**
 * Strip a rendered device bezel, OS status bar and home indicator from a handset capture.
 *
 * A mockup frame is not part of the artifact — the app has no bezel — and DESIGN.md treats
 * imitation material as contradicted on sight. This removes chrome a mockup tool added and
 * alters nothing the app itself drew.
 *
 *   node .impeccable/tools/debezel.mjs <file> [topInset]
 *
 * The original is copied to .impeccable/originals/ first.
 */
import sharp from 'sharp';
import { copyFileSync, mkdirSync } from 'node:fs';
import { basename } from 'node:path';

const SRC = process.argv[2];
const TOP = Number(process.argv[3] ?? 118);   // cut below the OS status bar
if (!SRC) { console.error('usage: debezel.mjs <file> [topInset]'); process.exit(1); }

mkdirSync('.impeccable/originals', { recursive: true });
copyFileSync(SRC, `.impeccable/originals/${basename(SRC)}`);

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const ch = info.channels, W = info.width, H = info.height;
const at = (x, y) => { const i = (y * W + x) * ch; return [data[i], data[i + 1], data[i + 2]]; };
const dark = (p) => p[0] < 60 && p[1] < 60 && p[2] < 60;
// Walk IN from the frame edge: the bezel is contiguous from the border, so this measures
// the frame and never mistakes dark UI content inside the screen for it.
const leftEdge = (y) => { let x = 0; while (x < W && dark(at(x, y))) x++; return x; };
const rightEdge = (y) => { let x = W - 1; while (x > 0 && dark(at(x, y))) x--; return x; };

let sL = 0, sR = W - 1;
for (let y = Math.floor(H * 0.3); y <= Math.floor(H * 0.78); y++) {
  sL = Math.max(sL, leftEdge(y)); sR = Math.min(sR, rightEdge(y));
}
// A slightly deeper side inset clears the corner curve further down, which buys back the
// bottom navigation the curve would otherwise cost.
const INSET = 9;
const LEFT = sL + INSET, RIGHT = sR - INSET;
let bottom = H - 1;
while (bottom > H * 0.6 && (leftEdge(bottom) > LEFT || rightEdge(bottom) < RIGHT)) bottom--;

const w = RIGHT - LEFT + 1, h = bottom - 2 - TOP + 1;
await sharp(SRC).extract({ left: LEFT, top: TOP, width: w, height: h })
  .png({ compressionLevel: 9 }).toFile(SRC + '.tmp');
copyFileSync(SRC + '.tmp', SRC);
console.log(`${basename(SRC)}: ${W}x${H} -> ${w}x${h}  aspect ${(w / h).toFixed(3)}:1`);
