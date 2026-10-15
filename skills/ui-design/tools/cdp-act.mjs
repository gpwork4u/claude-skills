import { spawn } from 'node:child_process';
import fs from 'node:fs';
const [,, base, outdir, w, h, ...jobs] = process.argv;   // job = state|selector|delayMs|name
const CH = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const p = spawn(CH, ['--headless=new','--disable-gpu','--hide-scrollbars','--remote-debugging-port=9335','--user-data-dir=' + (process.env.TMPDIR || '/tmp') + '/cdp-prof-xui3','about:blank'], {stdio:'ignore'});
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws;
for (let i = 0; i < 40; i++) { try { const r = await fetch('http://127.0.0.1:9335/json'); const t = (await r.json()).find(x => x.type === 'page'); ws = new WebSocket(t.webSocketDebuggerUrl); break; } catch { await sleep(250); } }
await new Promise(r => ws.onopen = r);
let id = 0; const pend = {}; const errs = [];
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m.result); delete pend[m.id]; } if (m.method === 'Runtime.exceptionThrown') errs.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text); };
const send = (method, params = {}) => new Promise(r => { pend[++id] = r; ws.send(JSON.stringify({ id, method, params })); });
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 600 });
let n = 0;
for (const job of jobs) {
  const [st, sel, delay, name] = job.split('|');
  await send('Page.navigate', { url: `${base}?a=${n++}#${st}` });
  await sleep(1800);
  if (sel) await send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(sel)}).click()` });
  await sleep(+delay || 0);
  const s = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: +w, height: +h, scale: 1 } });
  fs.writeFileSync(`${outdir}/${name || st}.png`, Buffer.from(s.data, 'base64'));
}
console.log('errors:', errs.length ? errs.join('\n') : 'none');
ws.close(); p.kill();
