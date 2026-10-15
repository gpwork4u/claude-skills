import { spawn } from 'node:child_process';
import fs from 'node:fs';
const [,, url, out, w, h, script] = process.argv;
const CH = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const p = spawn(CH, ['--headless=new','--disable-gpu','--hide-scrollbars','--remote-debugging-port=9336','--user-data-dir=' + (process.env.TMPDIR || '/tmp') + '/cdp-prof-dyn','about:blank'], {stdio:'ignore'});
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws;
for (let i = 0; i < 40; i++) { try { const r = await fetch('http://127.0.0.1:9336/json'); const t = (await r.json()).find(x => x.type === 'page'); ws = new WebSocket(t.webSocketDebuggerUrl); break; } catch { await sleep(250); } }
await new Promise(r => ws.onopen = r);
let id = 0; const pend = {}; const errs = [];
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m.result); delete pend[m.id]; } if (m.method === 'Runtime.exceptionThrown') errs.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text); if (m.method === 'Runtime.consoleAPICalled' && m.params.type==='error') errs.push(m.params.args.map(a=>a.value||a.description).join(' ')); };
const send = (method, params = {}) => new Promise(r => { pend[++id] = r; ws.send(JSON.stringify({ id, method, params })); });
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 600 });
await send('Page.navigate', { url });
await sleep(2000);
const ev = async expr => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.value;
global.ev = ev; global.sleep = sleep;
global.shot = async (name, clip) => { const s = await send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip: { ...clip, scale: 1 } } : {}) }); fs.writeFileSync(`${out}/${name}.png`, Buffer.from(s.data, 'base64')); };
if (script) { const mod = await import(script); await mod.default(); }
else await shot('full');
console.log('errors:', errs.length ? errs.join('\n') : 'none');
ws.close(); p.kill();
