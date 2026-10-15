export default async function () {
  const rect = async id => ev(`(() => { const r = document.querySelector('.stage[data-id=${id}]').getBoundingClientRect(); return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}; })()`);
  const go = async id => { await ev(`document.querySelector('.stage[data-id=${id}]').scrollIntoView({block:'center'})`); await sleep(150); };
  const snap = async (id, name) => { const r = await ev(`(() => { const r = document.querySelector('.stage[data-id=${id}]').getBoundingClientRect(); return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}; })()`); await shot(name, r); };
  const log = [];
  // 1 fan
  await go('fan'); await ev(`document.querySelector('.fan-trigger').click()`); await sleep(110); await snap('fan', 't-fan-mid'); await sleep(700); await snap('fan', 't-fan-open');
  await ev(`document.querySelector('.fan-trigger').click(); document.querySelector('.fan-opts [data-arc="360"]').click(); document.querySelector('.fan-trigger').click()`); await sleep(800); await snap('fan', 't-fan-360');
  // 2 wheel
  await go('wheel'); await ev(`document.querySelector('.wheel-key').click()`); await sleep(80); await snap('wheel','t-wheel-mid');
  await ev(`(() => { const st=document.querySelector('.stage[data-id=wheel]'); ['ArrowRight','ArrowRight'].forEach(k=>st.dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true}))); })()`); await sleep(600); await snap('wheel','t-wheel-open');
  await ev(`document.querySelector('.stage[data-id=wheel]').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}))`); await sleep(400);
  log.push('wheel: ' + await ev(`document.querySelector('.cur-tool').textContent`));
  // 3 ring
  await go('ring'); await ev(`document.querySelector('.stage[data-id=ring]').dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}))`); await sleep(120); await snap('ring','t-ring-mid'); await sleep(900);
  log.push('ring: ' + await ev(`document.querySelector('.ring-label b').textContent`));
  // 4 hand
  await go('hand'); await ev(`document.querySelectorAll('.card')[3].dispatchEvent(new PointerEvent('pointerenter'))`); await sleep(700); await snap('hand','t-hand-hover');
  await ev(`document.querySelectorAll('.card')[2].click()`); await sleep(900); await snap('hand','t-hand-play');
  // 5 hold
  await go('hold'); await ev(`document.querySelector('.hold').dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true}))`); await sleep(620); await snap('hold','t-hold-half');
  await sleep(800); await snap('hold','t-hold-done');
  log.push('hold: ' + await ev(`document.querySelector('.stage[data-id=hold] .stage-out').textContent`));
  await ev(`document.querySelector('.hold').dispatchEvent(new KeyboardEvent('keyup',{key:' ',bubbles:true}))`);
  // 6 timing
  await go('timing'); await ev(`document.querySelector('.tm-start').click()`); await sleep(600 + 700); await snap('timing','t-tim-ring');
  await sleep(150); await ev(`document.querySelector('.tm-hit').click()`); await sleep(160); await snap('timing','t-tim-hit');
  log.push('timing: ' + await ev(`document.querySelector('.stage[data-id=timing] .stage-out').textContent`));
  // 7 magnetic
  await go('mag'); await ev(`(() => { const b=document.querySelector('.mag.pri').getBoundingClientRect(); document.querySelector('.stage[data-id=mag]').dispatchEvent(new PointerEvent('pointermove',{clientX:b.right+40,clientY:b.bottom+30,bubbles:true})); document.querySelector('.mag-key').click(); })()`); await sleep(700); await snap('mag','t-mag');
  // 8 morph
  await go('morph'); await ev(`document.querySelector('.mo-btn').click()`); await sleep(200); await snap('morph','t-morph-mid'); await sleep(800); await snap('morph','t-morph-open');
  // 9 tabs
  await go('tabs'); await ev(`document.querySelectorAll('.tab')[2].click()`); await sleep(90); await snap('tabs','t-tabs-mid'); await sleep(800); await snap('tabs','t-tabs-end');
  // 10 dock
  await go('dock'); await ev(`(() => { const c=document.querySelector('.chip'); c.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true})); })()`); await sleep(120); await snap('dock','t-dock-mid'); await sleep(900);
  log.push('dock: ' + await ev(`document.querySelector('.stage[data-id=dock] .stage-out').textContent`));
  // 11 tilt
  await go('tilt'); await ev(`(() => { const r=document.querySelector('.tcard').getBoundingClientRect(); document.querySelector('.stage[data-id=tilt]').dispatchEvent(new PointerEvent('pointermove',{clientX:r.right-10,clientY:r.top+10,bubbles:true})); })()`); await sleep(800); await snap('tilt','t-tilt');
  // 12 zoom
  await go('zoom'); await ev(`document.querySelectorAll('.zm-tile')[4].click()`); await sleep(160); await snap('zoom','t-zoom-mid'); await sleep(1100); await snap('zoom','t-zoom-open');
  log.push('zoom focus: ' + await ev(`document.activeElement.className`));
  console.log(log.join('\n'));
}
