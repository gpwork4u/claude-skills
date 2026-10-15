# Expressive Recipes（表現力實作片段）

風格化 UI 的 CSS／SVG 片段與踩坑清單。片段都摘自 `examples/expressive-ui-lab.html` 與 `examples/composition-lab.html`，精簡成可直接套用的形式。

用途：選好母題（`motif-library.md`）與表現力預算（`composition-grammar.md`）之後，實作外殼與舞台時查這裡。動態、彈簧、FLIP 相關的片段與坑在 `motion-dynamics.md`。

原則：

- 片段只碰外殼與舞台，**不碰可讀核心**（內文、表單、數字）
- 顏色一律吃 token（`--p-ink`、`--p-acc`…），不在元件裡寫死
- 每個有動態的片段都要有 `prefers-reduced-motion` 降級

---

## 1. L0–L3 hook：用區域等級控制風格化範圍

每個區域帶一個 `data-x`（0–3），材料的 CSS 只透過這幾個選擇器介入。母題不需要知道版面，版面也不需要知道母題。

```html
<section class="r r-hero" data-r="hero" data-x="3">…</section>
<section class="r r-body" data-r="body" data-x="1">…</section>
```

```css
/* L1 以上：標題換成材料的 display 字 */
.r:not([data-x="0"]) :is(.h1,.h2){font-family:var(--f-d);font-weight:var(--fw-d);letter-spacing:var(--tr-d);text-transform:var(--tt-d)}
/* L2 以上：按鈕、選取底板換成材料的形狀 */
.m-riso .r:is([data-x="2"],[data-x="3"]) .btn{background:var(--p-acc2);color:#fff;box-shadow:4px 4px 0 var(--p-acc)}
/* L3：材質底紋、角度、裝飾件 */
.r::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none}
.r[data-x="3"]::before{background:var(--tex,none);-webkit-mask:var(--tex-mask,none);mask:var(--tex-mask,none)}
.r[data-x="3"] .tilt{rotate:var(--a,0deg);transform-origin:0 50%}
.r[data-x="3"] .h1.tilt{rotate:calc(var(--a,0deg) * .5);margin-block:.25em}   /* 多行標題只轉一半 */
.r:not([data-x="3"]) .orn{display:none!important}                              /* 裝飾件只在 L3 */
```

角度從材料的 `angle_set` 用種子挑，寫成 inline `--a`；只給 `.tilt`（display 標題、底板），內文永遠 0°。

```js
const ang = () => pick(motif.angles.filter(a => Math.abs(a) < 45));   // 90 是直排，不給 rotate
`<h1 class="h1 tilt" style="--a:${ang()}deg">…</h1>`
```

---

## 2. 鋸齒 clip-path 底板（預告信）

```css
/* 按鈕：四邊略斜的不規則四邊形 */
.m-card .btn{background:#0A0A0A;color:#fff;border:0;clip-path:polygon(0 8%,96% 0,100% 88%,4% 100%);padding-inline:1.4em}
/* 選取列：比按鈕更平的斜切 */
.m-card .row:hover{background:#0A0A0A;color:#fff;clip-path:polygon(0 4%,100% 0,99% 100%,1% 94%)}
/* 鋸齒分隔線 */
.m-card .divider{height:22px;background:#0A0A0A;clip-path:polygon(0 40%,5% 8%,9% 52%,15% 14%,21% 60%,27% 0,33% 46%,40% 18%,46% 64%,53% 10%,60% 50%,66% 4%,73% 58%,79% 20%,86% 66%,92% 12%,100% 48%,100% 100%,0 100%)}
/* 錯位色板：偽元素墊在後面，必須讓宿主 isolation:isolate */
.m-card .pull{position:relative;isolation:isolate}
.m-card .pull::before{content:"";position:absolute;inset:0;background:#0A0A0A;z-index:-1;rotate:-4deg;clip-path:polygon(0 6%,18% 0,100% 4%,97% 92%,74% 100%,3% 95%)}
```

`clip-path` 會裁掉 `outline`，焦點框改用 inset `box-shadow`（見踩坑 3）。

---

## 3. 套印錯位（孔版印刷）

```css
/* 輕量版：只用 text-shadow，L1 就能用 */
.m-riso .r:not([data-x="0"]) :is(.h1,.h2){text-shadow:.05em .035em 0 #FF48B099}
.m-riso .r[data-x="3"] .h1{text-shadow:.07em .05em 0 #FF48B0B3,-.03em .03em 0 #FFE800}

/* 真疊印：兩層文字都設 multiply，在元素本身設，不能只設在子元素 */
.mis{position:relative;display:inline-block;color:#0078BF;mix-blend-mode:multiply}
.mis-b{position:absolute;inset:.035em -.05em -.035em .05em;color:#FF48B0;mix-blend-mode:multiply;pointer-events:none}

/* 螢光筆式選取：只塗中間 76% 高度 */
.m-riso .row:hover{background:linear-gradient(transparent 12%,#FFE800CC 12% 88%,transparent 88%);mix-blend-mode:multiply}
```

```html
<span class="mis">標題<span class="mis-b" aria-hidden="true">標題</span></span>
```

---

## 4. 朱印（木刻朱印）

```css
/* 區段編號：朱底白字方章，內圈一道白線 */
.m-wood .r:not([data-x="0"]) .h2::before{
  content:counter(sec,cjk-decimal);display:inline-grid;place-items:center;width:1.5em;height:1.5em;margin-right:.45em;
  background:var(--p-acc);color:var(--p-on-acc);font-size:.62em;vertical-align:.25em;border-radius:2px;
  box-shadow:inset 0 0 0 2px var(--p-acc),inset 0 0 0 3px var(--p-on-acc)}
/* 選取記號：焦點列右上蓋一枚小印 */
.m-wood .row{position:relative}
.m-wood .row:hover::after{content:"印";position:absolute;right:6px;top:8px;width:22px;height:22px;display:grid;place-items:center;
  font:900 12px var(--f-d);color:var(--p-on-acc);background:var(--p-acc);border-radius:2px;rotate:-6deg}
/* 強調詞：朱色筆畫底線，不改字色 */
.m-wood .em{background:linear-gradient(transparent 82%,#B8321F66 82% 94%,transparent 94%);color:var(--p-ink)}
/* 落款：直排 + 一枚方章 */
.o-colo{writing-mode:vertical-rl;letter-spacing:.3em;display:flex;align-items:center;gap:10px}
.o-colo b{writing-mode:horizontal-tb;width:34px;height:34px;display:grid;place-items:center;background:var(--p-acc);color:var(--p-on-acc)}
```

---

## 5. 尺寸標註線與裁切標記（白底製圖／工程藍圖）

全部用 `linear-gradient` 畫，不用額外元素。

```css
/* kicker 兩側的尺寸線：|——| */
.m-draft .kick{display:inline-flex;align-items:center;gap:8px}
.m-draft .kick::before,.m-draft .kick::after{content:"";width:28px;height:7px;border-inline:1px solid currentColor;
  background:linear-gradient(currentColor,currentColor) center/100% 1px no-repeat}

/* 按鈕四角的裁切標記（左上、右下兩個 L 形） */
.m-draft .btn{position:relative;isolation:isolate}
.m-draft .btn::before{content:"";position:absolute;inset:-5px;z-index:-1;pointer-events:none;background-repeat:no-repeat;
  background:linear-gradient(var(--p-ink),var(--p-ink)) 0 0/8px 1px,linear-gradient(var(--p-ink),var(--p-ink)) 0 0/1px 8px,
             linear-gradient(var(--p-ink),var(--p-ink)) 100% 100%/8px 1px,linear-gradient(var(--p-ink),var(--p-ink)) 100% 100%/1px 8px}

/* 選取：45° hatch */
.m-draft .row:hover{background:repeating-linear-gradient(45deg,transparent 0 6px,#1C46F014 6px 7px)}

/* L3 底紋：方格紙 */
.m-draft{--tex:linear-gradient(#1C46F012 1px,transparent 1px) 0 0/24px 24px,linear-gradient(90deg,#1C46F012 1px,transparent 1px) 0 0/24px 24px}
```

SVG 的中心線用點劃線：

```css
.s-cl{fill:none;stroke:var(--p-acc);stroke-width:.9;stroke-dasharray:14 3 2 3}
```

圖框標題欄（圖名／比例／圖號）用兩欄 grid，種子決定圖號：

```html
<div class="o-title"><span>圖名</span><span>工作流程</span><span>比例</span><span>1:2</span><span>圖號</span><span>G-0427</span></div>
```

---

## 6. 門牌框（門牌）

雙 inset `box-shadow`：外圈同底色當邊距，內圈一道白線。

```css
.m-plate .h2{display:inline-block;background:var(--p-acc);color:#fff;padding:.12em .5em .16em;border-radius:6px;
  box-shadow:inset 0 0 0 3px var(--p-acc),inset 0 0 0 4.5px #fff}
/* 撕條紅紙：重複線性漸層切成一條條 */
.m-plate .row:hover::after{content:"";position:absolute;right:10px;bottom:-3px;width:44px;height:16px;
  background:repeating-linear-gradient(90deg,var(--p-acc2) 0 6px,transparent 6px 8px)}
/* L3 底紋：街廓網格（大格 112×88 + 中線） */
.m-plate{--tex:linear-gradient(#15223D0F 2px,transparent 2px) 0 0/112px 88px,linear-gradient(90deg,#15223D0F 2px,transparent 2px) 0 0/112px 88px}
```

---

## 7. 閃卡光澤（評級卡盒）

```css
.m-slab .row{position:relative;overflow:hidden}
.m-slab .row:hover{
  background:linear-gradient(115deg,#ffffff00 30%,#C9D6FF66 42%,#FFE7B366 50%,#D5F5E866 58%,#ffffff00 70%) var(--p-surf);
  background-size:250% 100%;animation:shine 1.1s ease-out both}
@keyframes shine{from{background-position:100% 0}to{background-position:0 0}}
@media (prefers-reduced-motion: reduce){ .m-slab .row:hover{animation:none;background-position:50% 0} }
```

評級標籤式區段標題：左側粗色條 + 右側編號。

```css
.m-slab .h2{display:inline-flex;align-items:baseline;gap:.5em;border:1px solid var(--p-ink);border-left:6px solid var(--p-acc);padding:.1em .5em}
.m-slab .h2::after{content:counter(sec,decimal-leading-zero);font:500 .45em var(--f-m);color:var(--p-acc2)}
```

---

## 8. 掃描線（CRT 終端機）

只放在 L3 區域，不要全站鋪。

```css
.m-term{--tex:repeating-linear-gradient(0deg,#00000066 0 1px,transparent 1px 3px)}
.m-term .h1::before{content:"> ";color:var(--p-acc)}
.m-term .r[data-x="3"] .h1::after{content:"";display:inline-block;width:.45em;height:.8em;background:var(--p-ink);
  margin-left:.12em;vertical-align:-.04em;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
/* 按鈕：方括號 + 反白 */
.m-term .btn::before{content:"["}  .m-term .btn::after{content:"]"}
.m-term .btn:is(:hover,:focus-visible){background:var(--p-ink);color:var(--p-bg)}
```

---

## 9. 網點（radial-gradient + mask）

```css
/* 網點只出現在一個角落，用 mask 讓它淡出 */
.m-card{--tex:radial-gradient(#E5141B 1.3px,transparent 1.8px) 0 0/10px 10px;--tex-mask:linear-gradient(200deg,#000 0 18%,transparent 46%)}
.m-riso{--tex:radial-gradient(#FF48B055 1.1px,transparent 1.6px) 0 0/9px 9px;--tex-mask:linear-gradient(115deg,#000 0 30%,transparent 62%)}
```

---

## 10. 拼貼字（預告信）

螢幕閱讀器讀 `.vh` 裡的完整文字；逐字的 span 全部 `aria-hidden`。每個字從 class 集與角度集用種子挑。

```css
.vh{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.ransom{display:inline-flex;flex-wrap:wrap;align-items:center;gap:.05em;line-height:1}
.ransom .r{display:inline-block;padding:.08em .1em .03em;rotate:var(--a,0deg);font-family:"Anton","Noto Sans TC",sans-serif;font-weight:900}
.r.r-a{background:#0A0A0A;color:#fff;clip-path:polygon(0 5%,100% 0,96% 100%,4% 94%)}
.r.r-c{background:#E5141B;color:#0A0A0A;clip-path:polygon(3% 0,100% 6%,97% 96%,0 100%)}
.r.r-e{background:#fff;color:#E5141B;clip-path:polygon(0 0,95% 4%,100% 100%,6% 92%)}
```

```js
function ransom(text, seed = 1) {
  const ang = [-12, -6, 4, 9];
  const letters = [...text].map((ch, i) => {
    const cls = RANSOM_CLS[Math.floor(rnd(i, seed) * RANSOM_CLS.length)];
    const a = ang[Math.floor(rnd(i + 11, seed) * ang.length)] / 2;   // 字只轉角度集的一半
    return `<span class="r ${cls}" style="--a:${a}deg">${esc(ch)}</span>`;
  }).join('');
  return `<span class="ransom"><span class="vh">${esc(text)}</span><span aria-hidden="true" style="display:contents">${letters}</span></span>`;
}
```

只用在 2–4 個字的強調詞。整句、整段都拼貼就是風格化 cliché。

---

## 11. 區段計數器（counter）

區段編號用 CSS counter，編號就是資訊（第幾區），不是裝飾。材料只換計數樣式：

```css
.page{counter-reset:sec}
.r-body,.r-proof,.r-list,.r-cta{counter-increment:sec}
.m-draft .h2::before{content:"DWG-" counter(sec,decimal-leading-zero)}     /* 圖號 DWG-01 */
.m-wood  .h2::before{content:counter(sec,cjk-decimal)}                     /* 一、二、三 */
.m-chart .h2::before{content:"§ " counter(sec,upper-roman) " · "}         /* § I · */
.m-slab  .h2::after {content:counter(sec,decimal-leading-zero)}            /* 標籤編號 01 */
```

---

## 12. 光圈轉場（劇場帷幕）

用 `@property` 註冊半徑，WAAPI 直接動畫自訂屬性。

```css
@property --spot-r{syntax:'<percentage>';inherits:false;initial-value:150%}
.th-iris{position:absolute;inset:0;--spot-r:150%;
  background:radial-gradient(circle at 50% 50%,transparent 0 var(--spot-r),rgba(12,4,4,.96) calc(var(--spot-r) + 1.5%))}
```

```js
await iris.animate([{ '--spot-r': '150%' }, { '--spot-r': '24%' }], { duration: 520, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }).finished;
// …在光圈裡顯示結果…
await iris.animate([{ '--spot-r': '24%' }, { '--spot-r': '0%' }], { duration: 220, easing: 'ease-in', fill: 'forwards' }).finished;
await iris.animate([{ '--spot-r': '0%', opacity: 1 }, { '--spot-r': '150%', opacity: 0 }], { duration: 420, easing: 'ease-out', fill: 'forwards' }).finished;
```

`inherits:false` 時只有元素本身讀得到動畫中的值；要讓偽元素讀，改成 `inherits:true`（見踩坑 2）。

---

## 13. 像素視窗（像素 RPG）

缺角用 clip-path，框線用多層 inset box-shadow，焦點也用 inset box-shadow（outline 會被裁掉）。

```css
.m-pixel{
  --px-frame:inset 0 0 0 3px #F8F8F8,inset 0 0 0 6px #6A70A8;
  --px-notch:polygon(0 4px,4px 4px,4px 0,calc(100% - 4px) 0,calc(100% - 4px) 4px,100% 4px,100% calc(100% - 4px),calc(100% - 4px) calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,4px calc(100% - 4px),0 calc(100% - 4px))}
.m-pixel .px-win{background:#2038A8;box-shadow:var(--px-frame);clip-path:var(--px-notch);color:#F8F8F8}
.m-pixel .btn:focus-visible{outline:none;box-shadow:inset 0 0 0 3px #F8D030}
```

---

## 14. 中文強調詞的色塊

緊行高的中文標題用 inline 背景色會蓋到上一行。只塗中間一段，並讓換行時每段都有完整色塊：

```css
.m-plate .em{background:linear-gradient(transparent 10%,var(--p-acc2) 10% 94%,transparent 94%);color:#fff;padding:0 .14em;
  -webkit-box-decoration-break:clone;box-decoration-break:clone}
```

---

## 踩坑清單

### 表現力實驗室

1. **`mix-blend-mode` 只跟同一個 stacking context 混合**。`z-index`、`transform`、`rotate` 都會建立新的 stacking context。要疊印的元素必須在它**本身**設 blend，不能只設在子元素上。
2. **`@property` 註冊成 `inherits:false` 時，偽元素讀不到父元素正在動畫的值**，改成 `inherits:true`。
3. **`clip-path` 會把 `:focus-visible` 的外框一起裁掉**（像素視窗、鋸齒按鈕）。改用 inset `box-shadow` 畫焦點框。
4. **grid 排版時，背景裝飾層要設 `position:absolute`**，否則會吃掉一個格位。
5. **舞台內的文字用 `@container` 加 `cqi` 單位**，跟著舞台寬度縮放；手機寬度另寫 container query。
6. **光圈轉場**靠 `@property --spot-r` 搭配 WAAPI 動畫自訂屬性（片段 12）。
7. **拼貼字要用 `.vh` 放完整文字給螢幕閱讀器**，逐字的部分設 `aria-hidden`（片段 10）。

### 組合實驗室

1. **元件類名不要跟版面語法類名撞**：swiss 網格的 `.sw` 把材料色票的 `.sw` 也變成 12 欄 grid。語法類名加前綴（`g-`），元件用自己的前綴（`pk-`）。
2. **`.page a{color:inherit}` 會蓋掉 `.btn` 的文字色**（特異度 0,1,1 > 0,1,0），按鈕變成同色塊。要寫 `.page a.btn`。
3. **裝飾件自己設 `display:grid/flex` 時，會蓋掉「只在 L3 顯示」的 `display:none`**（同特異度、後寫的贏）。改成 `.r:not([data-x="3"]) .orn{display:none!important}`。
4. **多行 display 標題旋轉時，右端位移約為「寬度 × sin(角度)」**，會壓到下一段。多行標題只轉一半角度，並加 `margin-block`（片段 1）。
5. **中文 inline 背景色塊在緊行高下會蓋到上一行**。改用 `linear-gradient` 只塗 10%–94%，並加 `box-decoration-break:clone`（片段 14）。
6. **ASCII 框線圖混入中文會對不齊**（全形寬度、display 字體缺框線字元）。改用 SVG `rect` 畫框與長條，文字另外放 `<text>`。
7. **疊紙偏移要封頂**：`--oc:min(var(--o),3)`，位移與旋轉都乘 `--oc`，不然第 6 張會掉出版面。
