import sharp from 'sharp';
const SRC = '.impeccable/originals/broom-blc-field-app.redacted.png';
const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const ch = info.channels, W = info.width, H = info.height;
const at = (x, y) => { const i = (y * W + x) * ch; return [data[i], data[i+1], data[i+2]]; };
const dark = (p) => p[0] < 60 && p[1] < 60 && p[2] < 60;
const leftEdge  = (y) => { let x = 0; while (x < W && dark(at(x, y))) x++; return x; };
const rightEdge = (y) => { let x = W - 1; while (x > 0 && dark(at(x, y))) x--; return x; };

let sL = 0, sR = W - 1;
for (let y = 400; y <= 1150; y++) { sL = Math.max(sL, leftEdge(y)); sR = Math.min(sR, rightEdge(y)); }

// Trading a little width for height: a slightly deeper side inset clears the corner curve
// further down, which is what buys back the bottom navigation.
const INSET = 9;
const LEFT = sL + INSET, RIGHT = sR - INSET;
let bottom = H - 1;
while (bottom > 1000 && (leftEdge(bottom) > LEFT || rightEdge(bottom) < RIGHT)) bottom--;

const TOP = 118, BOTTOM = bottom - 2;
const w = RIGHT - LEFT + 1, h = BOTTOM - TOP + 1;
console.log(`  inset ${INSET}px each side -> clean down to y ${bottom} (was 1374 at inset 2)`);
await sharp(SRC).extract({ left: LEFT, top: TOP, width: w, height: h })
  .png({ compressionLevel: 9 }).toFile('src/assets/work/broom-blc-field-app.redacted.png');
console.log(`  cropped ${w}x${h}  aspect ${(w / h).toFixed(3)}:1`);
