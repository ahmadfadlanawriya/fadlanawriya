// Minimal Chrome DevTools Protocol driver: real device emulation, full-page capture,
// and layout measurement. No dependencies.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9222;

const chrome = spawn(CHROME, [
  '--headless', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, '--user-data-dir=/tmp/cdp-profile',
  'about:blank',
], { stdio: 'ignore', detached: false });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 40; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error('chrome did not come up');
}

const ws = new WebSocket(await target());
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const n = ++id;
    pending.set(n, (m) => (m.error ? rej(new Error(method + ': ' + m.error.message)) : res(m.result)));
    ws.send(JSON.stringify({ id: n, method, params }));
  });

await send('Page.enable');
await send('Runtime.enable');

const jobs = JSON.parse(process.argv[2]);
mkdirSync('.impeccable/review', { recursive: true });
const report = [];

for (const job of jobs) {
  const { url, width, height, mobile, out, full, scrollTo, measure } = job;
  await send('Emulation.setDeviceMetricsOverride', {
    width, height, deviceScaleFactor: mobile ? 2 : 1, mobile: !!mobile,
  });
  await send('Page.navigate', { url });
  await sleep(1400);
  await send('Runtime.evaluate', { expression: `document.fonts.ready`, awaitPromise: true });
  await sleep(400);

  if (scrollTo) {
    await send('Runtime.evaluate', {
      // scroll-behavior: smooth is set globally; an animating scroll photographs as the
      // wrong region, so it is disabled for the capture.
      expression: `(() => { document.documentElement.style.scrollBehavior = 'auto';
        const el = document.querySelector(${JSON.stringify(scrollTo)});
        if (!el) return 'NOT FOUND';
        el.scrollIntoView({ block: 'center', behavior: 'instant' });
        return 'ok'; })()`,
      returnByValue: true,
    });
    await sleep(300);
  }

  if (measure) {
    const m = await send('Runtime.evaluate', {
      expression: `JSON.stringify(${JSON.stringify(measure)}.map(sel => {
        const els = [...document.querySelectorAll(sel)];
        return { sel, boxes: els.map(e => { const r = e.getBoundingClientRect();
          return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) }; }) };
      }))`,
      returnByValue: true,
    });
    console.error('MEASURE ' + out + ': ' + m.result.value);
  }

  const { result } = await send('Runtime.evaluate', {
    expression: `(() => {
      const de = document.documentElement;
      const vw = window.innerWidth;
      const offenders = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString().slice(0, 44),
            right: Math.round(r.right), left: Math.round(r.left), w: Math.round(r.width),
            text: (el.textContent || '').trim().slice(0, 34),
          });
        }
      }
      return JSON.stringify({
        vw, scrollW: de.scrollWidth, docH: de.scrollHeight,
        overflow: de.scrollWidth - vw,
        offenders: offenders.slice(0, 8),
      });
    })()`,
    returnByValue: true,
  });
  const m = JSON.parse(result.value);
  report.push({ out, ...m });

  if (full) await send('Emulation.setDeviceMetricsOverride', { width, height: Math.min(m.docH, 12000), deviceScaleFactor: mobile ? 2 : 1, mobile: !!mobile });
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!full });
  writeFileSync(out, Buffer.from(shot.data, 'base64'));
}

console.log(JSON.stringify(report, null, 1));
ws.close();
chrome.kill();
process.exit(0);
