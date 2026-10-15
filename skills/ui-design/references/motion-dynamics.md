# Motion Dynamics：讓 UI 不死板的動態語法

`motion-patterns.md` 管「用哪種動效」（gesture / pattern / effect 的詞彙）；這份管「怎麼動才有生命」：
起點從哪裡、走什麼路徑、節奏怎麼排、物理怎麼設、輸入怎麼映射、狀態怎麼連續、成功失敗怎麼回饋。

活範例：`examples/dynamic-ui-lab.html`（18 個模式，能量三檔可切換，含減少動態開關）。
本文的程式碼都從那份 demo 摘出來，改用時保持同樣的結構。

用法：

1. 在 StyleGenome 的 `motion` 維度選好 effect 之後，用「七軸」把每個重要互動寫成規格
2. 選一個能量檔位，整個產品共用同一組彈簧參數
3. 從「18 個模式」挑最接近的，照它的實作技巧與降級方式做

---

## 1. 動態語法七軸

一個互動只要在其中 2–4 軸上有明確選擇，就不會像預設的 `ease-out 300ms` 淡入。

| 軸 | 問的問題 | 可選值 | 反例 |
|---|---|---|---|
| **起點 Origin** | 東西從哪裡出現、回到哪裡 | 觸發點、游標位置、來源元素（shared element）、畫面邊緣、上一個狀態的位置 | 選單永遠從畫面中央淡入，跟按下的按鈕無關 |
| **路徑 Path** | 從 A 到 B 走什麼形狀 | 直線、弧線（扇形、手牌）、沿 SVG 路徑（地圖、技能樹連線）、橢圓環（轉盤）、斜切 | 所有東西都走直線，尤其是本來就有路線語意的地圖與流程 |
| **節奏 Rhythm** | 多個元素的先後順序 | stagger（依序）、倒序收回、低位先動（滾輪）、等前置到齊（技能樹）、停頓一拍（hit stop） | 一整排同時出現；或每一項都等上一項完全結束才開始，拖太久 |
| **物理 Physics** | 運動的質感 | 彈簧（k、c）、慣性、橡皮筋阻力、過衝、速度驅動的傾斜或晃動 | 跟手的元素用固定時長的 easing，放手時像被瞬移 |
| **輸入映射 Input** | 手的動作怎麼對應到畫面 | 角度選擇（輪盤）、距離吸引（磁吸）、速度預測落點（甩出）、按住時間（蓄力）、時機（判定）、傾斜（裝置／游標） | 只有 click；拖曳只看最後位置，不看速度 |
| **連續性 Continuity** | 狀態切換時，舊的東西去哪裡 | FLIP 換位、形變（按鈕長成面板）、鏡頭推進、幽靈預覽、分身飛行 | 舊內容消失、新內容淡入，使用者不知道兩者的關係 |
| **回饋 Feedback** | 成功、失敗、進行中各長什麼樣 | 按壓縮放、震動、粒子、浮字、倍率彈跳、斷鏈劃線、hit stop | 成功與失敗用同一種 toast；進度只用一條細線 |

規格寫法（放進 StyleGenome 的 `motion` 或元件文件）：

```yaml
interaction: add-to-cart
origin: 按鈕本身
path: 直線，按鈕長大成面板
rhythm: 面板內容延遲 120ms 才出現
physics: 能量檔 std（k320 c21）
input: click / Enter
continuity: morph（關閉時縮回同一顆按鈕）
feedback: 面板標題打勾；焦點移到「繼續逛」
reduced_motion: 直接切換，不播形變
```

---

## 2. 能量三檔

整個產品只選一檔，所有彈簧與連動參數都從這裡讀。檔位決定「這個品牌有多愛表現」，跟 `style-genome.md` 的 `motion.intensity` 對應：restrained → 克制、expressive → 標準、playful / 遊戲感 → 誇張。

```js
const ENERGY = {
  calm: { name: '克制', k: 260, c: 32, stagger: 16, press: .97, pull: .16, tilt: 6,  shake: 2,  sparks: 6 },
  std:  { name: '標準', k: 320, c: 21, stagger: 36, press: .94, pull: .3,  tilt: 11, shake: 5,  sparks: 12 },
  wild: { name: '誇張', k: 420, c: 11, stagger: 62, press: .86, pull: .46, tilt: 18, shake: 10, sparks: 22 }
};
```

| 參數 | 克制 | 標準 | 誇張 | 用在哪裡 |
|---|---|---|---|---|
| `k` 剛性 | 260 | 320 | 420 | 所有彈簧 |
| `c` 阻尼 | 32 | 21 | 11 | 所有彈簧；越小過衝越大 |
| `stagger`（ms） | 16 | 36 | 62 | 扇形展開、列表滑入、滾輪位數延遲（×1.4）、技能樹描線（×2.5） |
| `press` 按壓縮放 | .97 | .94 | .86 | 按下時 scale |
| `pull` 磁吸強度 | .16 | .3 | .46 | 磁吸按鈕位移 = 游標距離 × pull × 衰減 |
| `tilt`（deg） | 6 | 11 | 18 | 傾斜卡片、拖曳時依速度傾斜、水面晃動 |
| `shake`（px） | 2 | 5 | 10 | 失敗、命中、蓄力抖動 |
| `sparks` 粒子數 | 6 | 12 | 22 | 完成、達標 |

規則：

- 克制檔幾乎看不到過衝，適合 SaaS、金融、查證型產品；誇張檔只用在遊戲、活動頁、結算畫面
- 可以在單一區域臨時升一檔（例如完成畫面），但不要整頁混用三檔
- 減少動態時：`--spring-dur: 1ms`、`--stagger: 0ms`、`--press: 1`，彈簧直接跳到目標，震動與粒子不播

---

## 3. 彈簧轉 `linear()`

CSS `linear()` 可以吃任意多個取樣點，所以先用 JS 模擬一次彈簧，把曲線寫成 CSS 變數，之後所有 CSS transition 和 WAAPI 都共用同一條。

```js
function simulate(k, c) {
  let x = 0, v = 0, t = 0; const dt = 1 / 240, pts = [];
  for (let i = 0; i < 2400; i++) {
    const f = -k * (x - 1) - c * v; v += f * dt; x += v * dt; t += dt; pts.push(x);
    if (t > .12 && Math.abs(x - 1) < .0015 && Math.abs(v) < .02) break;
  }
  return { pts, dur: Math.round(t * 1000) };
}
const supportsLinear = CSS.supports('transition-timing-function', 'linear(0, 1)');
function applyEnergy(e, rm) {
  const { pts, dur } = simulate(e.k, e.c), N = 44;
  const samp = Array.from({ length: N + 1 }, (_, i) => pts[Math.min(pts.length - 1, Math.round(i / N * (pts.length - 1)))]);
  samp[N] = 1;
  const easing = supportsLinear ? `linear(${samp.map(n => +n.toFixed(4)).join(', ')})` : 'cubic-bezier(.2,.9,.3,1.15)';
  const root = document.documentElement.style;
  root.setProperty('--spring', easing);
  root.setProperty('--spring-dur', rm ? '1ms' : dur + 'ms');
  root.setProperty('--stagger', rm ? '0ms' : e.stagger + 'ms');
  root.setProperty('--press', rm ? '1' : e.press);
  return { easing, dur };
}
```

CSS 端：

```css
.morph{transition:left var(--spring-dur) var(--spring),top var(--spring-dur) var(--spring),
  width var(--spring-dur) var(--spring),height var(--spring-dur) var(--spring)}
.fan-item{transition:translate var(--spring-dur) var(--spring) calc(var(--i) * var(--stagger))}
```

WAAPI 包裝（同一條 easing，減少動態時一律 1ms）：

```js
const wa = (el, kf, o = {}) => {
  try { return el.animate(kf, { duration: S.rm ? 1 : S.dur, easing: S.easing, fill: 'both', ...o,
    ...(S.rm ? { duration: 1, delay: 0 } : {}) }).finished.catch(() => {}); }
  catch (e) { return Promise.resolve(); }
};
```

### 什麼時候用哪一種

| 情況 | 用 | 原因 |
|---|---|---|
| 狀態 A → 狀態 B，中途不會被打斷 | CSS `linear()` / `wa()` | 跑在合成層，零 JS 成本 |
| 跟手（拖曳、磁吸、傾斜、轉盤）、目標隨時在變 | `Spring` 類別 + `requestAnimationFrame` | 要保留速度，換目標時不能重新起跑 |
| 描線、進度條、時間窗 | 固定 easing（linear 或 cubic-bezier） | 彈簧過衝會讓線頭露出空隙、進度倒退 |

跟手彈簧：

```js
class Spring {
  constructor(x = 0, eps = .05) { this.x = x; this.v = 0; this.t = x; this.eps = eps; }
  step(dt, kMul = 1, cMul = 1) {
    if (S.rm) { this.x = this.t; this.v = 0; return false; }
    const k = E().k * kMul, c = E().c * cMul, n = 4, h = dt / n;
    for (let i = 0; i < n; i++) { const f = -k * (this.x - this.t) - c * this.v; this.v += f * h; this.x += this.v * h; }
    if (Math.abs(this.x - this.t) < this.eps && Math.abs(this.v) < this.eps * 4) { this.x = this.t; this.v = 0; return false; }
    return true;
  }
}
function loop(step) {
  let id = null, last = 0;
  const tick = now => { const dt = Math.min(.034, (now - last) / 1000); last = now; id = step(dt) ? requestAnimationFrame(tick) : null; };
  return () => { if (!id) { last = performance.now(); id = requestAnimationFrame(tick); } };
}
```

- `kMul` / `cMul` 讓同一檔能量在不同元件上有不同手感（例如轉盤 `.9, 1`、伸縮頁籤前緣 `1.5`、後緣 `.55`），但基準仍是能量檔
- `loop()` 在所有彈簧靜止時自動停，不會常駐 rAF
- `dt` 上限 34ms，分頁切回來時不會一步跳飛

---

## 4. 18 個模式

### 目錄

| # | 模式 | 非遊戲用途 | 七軸 | 鍵盤 | 減少動態 |
|---|---|---|---|---|---|
| 1 | 扇形展開 Fan menu | 快速新增、插入選單、地圖標記操作 | 起點 路徑 節奏 物理 | Enter 展開、←→ 移動、Esc 收合 | 直接出現在終點 |
| 2 | 武器輪盤 Radial wheel | 工具切換（pie menu）、表情回應、右鍵選單 | 輸入 起點 回饋 | Space 開啟、←→ 轉、Enter 確定、Esc 取消 | 不縮放，直接顯示 |
| 3 | 環形選單 Ring menu | 相機模式、播放清單、款式挑選 | 路徑 物理 輸入 | ←→ | 彈簧直接到位 |
| 4 | 手牌 Card hand | 方案選擇、附件挑選、測驗選項 | 路徑 節奏 物理 連續性 | Tab 逐張、Enter 出牌 | 直接到位 |
| 5 | 長按蓄力 Hold to confirm | 刪除、部署正式環境、付款確認（取代確認對話框） | 輸入 回饋 | 按住 Space／Enter | 進度照算，不抖、不爆粒子 |
| 6 | 時機判定 Timing ring | 活動小遊戲、互動教學、任何成功回饋 | 回饋 節奏 | Space | 不停頓、不震動，浮字直接出現 |
| 7 | 磁吸按鈕 Magnetic | 主要 CTA、導覽列、社群連結 | 輸入 物理 | 鍵盤聚焦不吸附 | 不吸附 |
| 8 | 形變按鈕 Morph | 加入購物車、搜尋展開、聊天泡泡、FAB 表單 | 連續性 物理 | Enter 開、Esc 收 | 直接切換 |
| 9 | 伸縮頁籤 Stretchy tabs | 分段控制、篩選器、設定分類 | 物理 連續性 | ←→ | 指示條直接到位 |
| 10 | 拖曳停靠 Drag & dock | 看板、檔案分類、排序、排程 | 輸入 物理 | ←→ 換欄 | 不傾斜，直接吸附 |
| 11 | 傾斜卡片 Tilt card | 會員卡、票券、商品卡、作品集封面 | 輸入 | 純裝飾，鍵盤時保持平面 | 保持平面 |
| 12 | 鏡頭推進 Zoom into | 作品集、儀表板下鑽、相簿、檔案總管 | 連續性 起點 | Enter 進、Esc 返回 | 直接切換 |
| 13 | 回合順序條 Turn order | 客服佇列、部署排程、CI 佇列、叫號 | 連續性 物理 輸入 節奏 | ←→ 選項目、Tab 到操作即預覽、Enter 執行 | 直接重排 |
| 14 | 連擊與連鎖 Chain combo | 收件匣清空、批次審核、連續打卡、連續答對 | 回饋 節奏 輸入 | Tab 到項目、Enter 完成，焦點自動到下一件 | 倍率不彈，時間窗照算 |
| 15 | 技能樹 Skill tree | Onboarding 清單、功能解鎖、學習路徑、權限流程 | 路徑 節奏 起點 回饋 | 方向鍵在節點間移動、Enter 完成 | 連線直接亮起 |
| 16 | 數字滾輪與實體化進度 Odometer & vessel | 存款目標、募資、配額、儲存空間 | 物理 節奏 連續性 | Tab 到按鈕、Enter | 數字直接換、水位直接到 |
| 17 | 世界地圖式導覽 World map nav | 產品路線圖、課程大綱、旅遊行程、里程碑 | 輸入 路徑 物理 連續性 | 方向鍵平移、Tab 到據點 Enter 前往 | 鏡頭直接跳到據點 |
| 18 | 對話式選項 Chat choices | 客服機器人、問卷、表單精靈、推薦問答 | 節奏 起點 連續性 路徑 | ←→ 移動、Enter 選擇 | 不飛行，直接出現在對話串 |

### 各模式的關鍵技巧

**1 扇形展開**
- 項目位置寫成 `--x` / `--y`，只用 `translate` 過渡；角度依弧度選擇：90° 角落、180° 底部、360° 中央
- 展開時 delay 用 `(n - 1 - i) * stagger`，收合時倒序，聽起來像「抽出來、收回去」
- 觸發鍵是 `aria-expanded` + `role="menu"`；收合時項目 `tabIndex = -1`，focusout 離開舞台就收合

**2 武器輪盤**
- 選擇只看角度不看距離：`Math.atan2(dy, dx)` 換成扇區索引；中心半徑內是取消區
- 輪盤在按下的位置開啟（`clamp` 到舞台內），放開就提交；要 `setPointerCapture` 才能在輪盤外放開
- 鍵盤版另開一顆「用鍵盤開啟」按鈕，開在中央，用方向鍵轉

**3 環形選單**
- 一個 `Spring` 管角度 `th`，每個項目用 `sin/cos` 算出橢圓位置，`depth` 同時驅動 scale、opacity、z-index
- 拖曳時直接改 `th.t`；放手時 `th.t = round(th.t + th.v * .12)`，讓甩的速度決定多轉幾格再吸附
- `role="listbox"` + `aria-activedescendant` 指向正前方那一格

**4 手牌**
- 位置公式：`x = d * spread`、`y = -40 + d² * 7`、`rotate = d * 7°`（d 是離中心的序號差），`transform-origin: 50% 140%`
- 滑過的那張抬起 46px、轉正、放大 1.14；左右鄰居各讓開 22px
- 出牌後它飛到放置區，其餘重新計算 `mid` 排好；全部用 CSS transform + `--spring`

**5 長按蓄力**
- 進度是註冊過的 `@property --p`，用 WAAPI 從目前值動畫到 1（`duration = (1 - p0) * HOLD`、linear）；放開時從目前值彈回 0
- 抖動幅度 `p² * shake * .35`，按越久越緊繃；用 `style.translate` 抖，不碰 `transform`
- 鍵盤：keydown 開始、keyup 結束，忽略 `e.repeat`；blur 與 `lostpointercapture` 都視為放開

**6 時機判定**
- 外圈用 linear WAAPI 縮放，判定用 `anim.currentTime - T`，誤差 ≤70ms PERFECT、≤150ms GOOD
- PERFECT 時 `anim.pause()` 90ms 再 `play()`，這就是 hit stop；加上 `shake()` 與浮字三件一組
- 舞台離開視窗（IntersectionObserver）就暫停回合

**7 磁吸按鈕**
- 每顆按鈕兩組 Spring：底板跟游標距離 × `pull`，文字層跟 0.55 倍，產生前後視差
- 吸引範圍 R = 110px，力道 `(1 - d / R) * .6 + .4`；`pointerleave` 全部回 0
- 計算中心時要扣掉目前位移（`r.left + r.width / 2 - b.x.x`），否則會自己追著自己跑

**8 形變按鈕**
- 外層 `.morph` 是絕對定位的同一個元素，用 `left/top/width/height/border-radius` 加 `--spring` 過渡；關閉時對齊按鈕的 anchor，開啟時對齊面板位置
- 兩個 face（按鈕、面板）疊在裡面，用 opacity + visibility 切換，面板 delay 120ms 才出現
- 開啟後焦點移到面板第一個動作，關閉時回到按鈕

**9 伸縮頁籤**
- 指示條的左緣、右緣各一個 Spring；往右時右緣用大 k（先走）、左緣用小 k（後跟），往左反過來，中途自然被拉長
- 列表項目從移動方向 `translateX(dir * 26px)` 滑入，依 stagger 排隊
- 字型載入後（`document.fonts.ready`）重新量一次頁籤寬度

**10 拖曳停靠**
- 拖曳中直接設 `X.x = X.t`，放手才交給彈簧；速度用指數平滑 `vx = vx * .7 + 瞬時 * .3`
- 落點 = 目前位置 + `vx * .16` 的預測，再找最近欄位；放手時把 `vx * .4` 交給彈簧當初速
- 出界用橡皮筋：`v < 0 ? v * .35 : v > max ? max + (v - max) * .35 : v`；傾斜角 = 速度 × 係數，上限是能量檔的 `tilt`

**11 傾斜卡片**
- `rotateX/rotateY` 兩個 Spring，反光點位置 `--gx/--gy` 另外兩個 Spring（比角度跟得快）
- 光澤強度 `--ho` 跟傾斜量連動，平放時只剩 0.15
- 純裝飾，鍵盤與減少動態時保持平面，不要用它承載資訊

**12 鏡頭推進**
- 面板用 `translate + scale` 從方塊的位置長成整個舞台（反向 FLIP），其他方塊沿離中心的方向退開 46px 並變淡
- 內容等面板到位才淡入；返回時先收內容，再縮回原方塊，最後 `getAnimations().forEach(a => a.cancel())` 清乾淨
- 進入後焦點到「返回」，返回後焦點回原方塊

**13 回合順序條**
- 滑過或聚焦操作按鈕時，下方幽靈列先排出「執行後」的順序，被移動的標 ↑2／↓2，新進的標「新」
- 執行時整排 `flip()`；離開的那位先改成 absolute 留在原位，往左上淡出，新的一位用 `enter` 關鍵影格從右邊進場
- 操作按鈕用 `aria-disabled` 而不是 `disabled`，正在聚焦的按鈕才不會丟焦點

**14 連擊與連鎖**
- 時間窗 2.2 秒是一條 linear WAAPI 的 scaleX 縮短條，`onfinish` 就斷鏈
- 倍率每次彈 `1 + AMP[檔位] * min(倍率, 5)`（AMP：克制 .05、標準 .12、誇張 .24），倍率越高彈越大；斷鏈時數字劃掉、變紅、震動，不是默默歸零
- 完成的那列高度收合（height + opacity + margin 一起動畫），新的一列補進來，焦點自動移到下一件

**15 技能樹**
- 連線用 `getTotalLength()` 設 `strokeDasharray`，`strokeDashoffset` 從 L 到 0，easing 用 `cubic-bezier(.6,0,.3,1)`，不用彈簧
- 線描完（`await`）才判斷下一個節點能不能解鎖；需要兩個前置的節點要等兩條線都到齊
- 鎖住的節點仍可聚焦，`aria-label` 直接說出還差哪些條件；方向鍵用共用的 `spatial()` 移動

**16 數字滾輪與實體化進度**
- 每一位數是 0–9 重複三段的長條，平常停在中段；存入往第三段滾、提領往第一段滾，`transitionend` 時關掉 transition 無縫跳回中段
- 只有會變的位數才排延遲，最低位先轉（`rank * stagger * 1.4`）
- 水位是 Spring；水面傾斜由水位的速度驅動，是第二個欠阻尼彈簧（`kMul 1.6, cMul .45`），漲得快就晃得大

**17 世界地圖式導覽**
- 標記沿路線移動：彈簧作用在「路徑長度」上，用 `getPointAtLength()` 取座標；每個據點預先找出它在路徑上最近的長度
- 鏡頭是另一組彈簧追標記，產生跟拍延遲；拖曳有橡皮筋阻力，放手帶慣性（`cx.v = vx * .5`）
- 舞台寬度小於 420px 預設顯示清單，地圖變選配；點清單項目切回地圖並移到該站

**18 對話式選項**
- 選項依序彈出，選了之後其他選項倒序收回
- 被選的那顆：先在對話串放一個看不見的目標泡泡，再用浮在舞台最上層的分身做 FLIP 飛過去，途中背景色與文字色漸變成「我說的話」
- 舊訊息被新泡泡推上去時也用 `flip()`；打字中的點點動畫在減少動態時關掉

---

## 5. 共用 helper

### FLIP

```js
/* 先量 First → 取消進行中的位移動畫 → 改 DOM → 量 Last → 從差值彈回 none。
   沒有 First 的元素是新進場的，用 o.enter；被 FLIP 的元素 CSS 要設 transform-origin:0 0 */
function flip(getEls, mutate, o = {}) {
  const first = new Map(getEls().map(el => [el, el.getBoundingClientRect()]));
  first.forEach((_, el) => el.getAnimations().forEach(a => a.cancel()));
  mutate();
  const runs = [];
  getEls().forEach((el, i) => {
    const f = first.get(el), delay = o.delay ? o.delay(el, i) : 0;
    if (!f) { if (o.enter) runs.push(wa(el, o.enter, { delay })); return; }
    const l = el.getBoundingClientRect();
    const dx = f.left - l.left, dy = f.top - l.top, sx = l.width ? f.width / l.width : 1, sy = l.height ? f.height / l.height : 1;
    if (Math.abs(dx) < .5 && Math.abs(dy) < .5 && Math.abs(sx - 1) < .01 && Math.abs(sy - 1) < .01) return;
    runs.push(wa(el, [{ transform: `translate(${dx}px,${dy}px) scale(${sx},${sy})` }, { transform: 'none' }], { delay }));
  });
  return Promise.all(runs);
}
```

### 空間導覽（方向鍵移到該方向上最近且最對齊的節點）

```js
function spatial(nodes, cur, key) {
  const dir = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] }[key];
  if (!dir) return null;
  const c = cur.getBoundingClientRect(), cx = c.left + c.width / 2, cy = c.top + c.height / 2;
  let best = null, bd = Infinity;
  nodes.forEach(n => {
    if (n === cur) return;
    const r = n.getBoundingClientRect(), dx = r.left + r.width / 2 - cx, dy = r.top + r.height / 2 - cy;
    const along = dx * dir[0] + dy * dir[1]; if (along <= 4) return;
    const d = along + Math.abs(dx * dir[1] - dy * dir[0]) * 2;   // 偏離軸線的距離加倍計分
    if (d < bd) { bd = d; best = n; }
  });
  return best;
}
```

### 震動與座標

```js
function shake(el, mul = 1) {
  if (S.rm) return;
  const a = E().shake * mul;
  el.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${-a}px,${a * .6}px)` },
    { transform: `translate(${a * .8}px,${-a * .5}px)` }, { transform: `translate(${-a * .4}px,${a * .3}px)` },
    { transform: 'translate(0,0)' }], { duration: 220, easing: 'steps(5)' });
}
const rectIn = (el, st) => { const s = st.getBoundingClientRect(), r = el.getBoundingClientRect();
  return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height }; };
```

震動用 `steps(5)`：離散的抖動比平滑的晃動更像「被打到」。

---

## 6. 跟視覺語言的搭配

`motion-patterns.md` 的對照表決定 effect 類別；這裡補上「能量檔」與「轉場動詞」兩個維度。
轉場動詞來自母題契約的 `transition_verb`（見 `motif-library.md`），是換頁、換狀態時的招牌動作。

| 視覺語言 | 能量檔 | 適合的模式 | 轉場動詞 |
|---|---|---|---|
| Swiss / technical / 製圖 | 克制 | 伸縮頁籤、形變按鈕、數字滾輪、技能樹 | draw（描線）、plot（沿路徑標點） |
| Editorial / 刊物 | 克制 | 鏡頭推進、數字滾輪 | cut（硬切）、register（套版） |
| Luxury / 典雅 | 克制，且把 `--spring-dur` 拉長 | 鏡頭推進、傾斜卡片（小角度） | bloom（暈開）、spotlight（光圈） |
| Consumer soft / 親和 | 標準 | 形變按鈕、磁吸、對話式選項、扇形展開 | bloom、assemble（組裝） |
| Playful / 遊戲感 | 誇張 | 手牌、輪盤、時機判定、連擊、回合順序條 | slash（斬）、flip（翻面）、stamp（蓋印） |
| Retro terminal / CRT | 克制，easing 改 `steps()` | 連擊（數字跳動）、回合順序條 | boot（開機掃描） |
| 像素 / 8-bit | 標準，位移量化到格子 | 技能樹、世界地圖 | mosaic（馬賽克） |
| 地圖 / 測繪 | 標準 | 世界地圖、技能樹、空間畫布 | plot、draw |

注意：

- 同一個產品的轉場動詞只選一個主動詞，最多再加一個用在完成畫面
- 誇張檔的粒子、震動只放在 L3–L4 的區域（見表現力等級）；表單、內文、數字欄位維持 L0

---

## 7. 踩坑清單

1. **headless Chrome 的 `--virtual-time-budget` 不會推進 WAAPI**（`currentTime` 一直是 0）。驗證動畫要用 CDP 以真實時間驅動
2. **FLIP 要先取消進行中的位移動畫**：量完 First、改 DOM 之前 `getAnimations().forEach(a => a.cancel())`，否則 Last 量到的是動畫中途的位置
3. **定位用 `translate` 屬性、震動用 `transform`**，兩者分開才不會互相覆蓋；同理按壓縮放用 `scale` 屬性
4. **`setPointerCapture` 的時機**：拖曳要超過門檻才 capture，太早會吃掉內部按鈕的 click；但輪盤、蓄力這種「按住」互動要在 pointerdown 立刻 capture，才能在元素外放開
5. **`overflow:hidden` 的容器在 Tab 聚焦到畫面外的元素時仍會被瀏覽器捲動**：監聽 `scroll` 把 `scrollLeft/scrollTop` 歸零，再用自己的鏡頭移過去
6. **不要搶焦點**：只有焦點本來就在舞台裡才搬焦點，否則頁面載入或自動重排時會把焦點從別處拉走
7. **描線不能用彈簧 easing**：過衝會讓 `strokeDashoffset` 變負值，線頭露出空隙；進度條、時間窗也一樣用 linear 或無過衝的 cubic-bezier
8. **用 `aria-disabled` 取代 `disabled`**：`disabled` 會讓正在聚焦的按鈕丟失焦點；點擊時自己判斷是否無效並給回饋（例如震動加說明）
9. **`aspect-ratio` 會把 `min-height` 換算成最小寬度**：340px 高 × 4/3 會撐成 453px 寬，在手機上撐破卡片。舞台改用固定高度或 `max-width:100%`
10. **`@property` 註冊成 `inherits:false` 時，偽元素讀不到父元素正在動畫的值**：蓄力外圈這類要給偽元素讀的進度，改成 `inherits:true`
11. **字型載入後重量一次**：頁籤指示條、形變按鈕的 anchor 都依賴文字寬度，`document.fonts.ready.then(place)`
12. **ResizeObserver 重排時直接跳到位**：視窗尺寸改變不是使用者動作，不要播彈簧（`target(true)` 直接設 `x = t`）
13. **進場關鍵影格不要停在 opacity 0**：`fill:'both'` 的動畫在 SSR 或截圖時要有可見的終態；起始狀態只在 JS 接手後才設定

---

## 8. 驗證

驗證工具在本 skill 的 `tools/`。需要 Node 22+（內建 WebSocket，不用裝套件）與 Google Chrome；Chrome 不在 macOS 預設路徑時，用環境變數 `CHROME=/path/to/chrome` 指定。

| 工具 | 用法 |
|---|---|
| `wrap.sh <src.html> <out.html>` | 把 artifact 格式（沒有 doctype/head/body）的 HTML 包成完整頁面 |
| `cdp-run.mjs <url> <outdir> <w> <h> [script.mjs]` | 通用 runner；script 裡可用 `ev(expr)`、`shot(name, clip)`、`sleep(ms)`，結束時印出 console error |
| `cdp-act.mjs <url> <outdir> <w> <h> "state|selector|delayMs|name" ...` | 開 `#state`、點 selector、等待後截圖 |
| `dyn-lab-test.mjs` | 動態實驗室前 12 個模式的互動回歸測試（配 `cdp-run.mjs`） |

檢查項目：

- 每個模式截「中途」與「結束」兩張：中途那張才看得出路徑、過衝、stagger 是否正確
- 三個能量檔各跑一次，加上減少動態一次
- 桌面 1280 與手機 390 都要看，確認沒有水平捲動、舞台沒有超出卡片
- 鍵盤路徑：Tab 能到、方向鍵能操作、Esc 能退出、焦點落點正確
- headless 要開 `Emulation.setFocusEmulationEnabled` 才會觸發 focus 事件；深淺色用 `Emulation.setEmulatedMedia` 指定 `prefers-color-scheme`，不然會跟著系統
- `Page.captureScreenshot` 的 clip 是以整份文件為座標，要加上 `scrollX/scrollY`
- 多個 runner 同時跑時換 `--remote-debugging-port`，避免互相搶 tab
