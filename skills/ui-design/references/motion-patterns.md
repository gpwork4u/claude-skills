# Motion & Micro-interaction Patterns

動效語彙庫。資料來源：[60fps.design](https://60fps.design/) — 收錄真實 App 的動效錄影，
可依 gesture / pattern / effect / element 交叉篩選。

用途：在 StyleGenome 的 `motion` 與 `interaction` 維度上，把「restrained」「playful」這類抽象詞
落地成可實作的具體動效規格；也用來在實作前找參考錄影。

查詢方式：`https://60fps.design/` 以下列標籤交叉過濾。

---

## 1. Gestures（觸發手勢）

決定「使用者做什麼動作」觸發動效。

| Gesture | 說明 / 典型用途 |
|---------|----------------|
| Tap | 最基本的點擊回饋（scale down + spring back） |
| Long Press | 進入編輯/選取模式、顯示 context menu |
| Hold | 持續按住累積進度（錄音、確認刪除） |
| Drag | 拖曳排序、拖曳關閉 sheet |
| Pan | 平移畫布、地圖 |
| Swipe | 列表項目滑動操作、換頁 |
| Flick | 快速甩動，帶慣性（inertia）收尾 |
| Flip | 卡片翻面、正反面切換 |
| Pinch | 縮放圖片 / 地圖 |
| Pull | 下拉刷新、下拉關閉 |
| Scroll | scroll-driven 動畫（parallax、progress、sticky header 收合） |
| Scrub | 拖曳時間軸擦洗（影片、音訊） |
| Slide | 滑桿調整數值 |
| Gyroscope | 裝置傾斜驅動的視差 / 光澤 |
| Typing | 輸入時的即時回饋（字數、驗證、AI 串流） |

---

## 2. Patterns（情境模式）

決定「在哪個產品情境中用動效」。找參考時先從這裡切入。

**首次體驗**：Splash、Intro、Onboarding、Get Started、Setup、Permissions、Invite

**內容呈現**：Featured、Showcase、Gallery、Carousel、Card Stack、Shared Element、3D

**狀態**：Loading、Empty State、Success State、Delete、New

**驅動行為**：Gamification、Streak、Reward、Goal、Stats、Recap、Timer、Progress

**品牌人格**：Logo、Mascot、Idle Animation、Theme、Easter Egg

**AI / 對話**：AI、Assistant、Chat、Voice

**其他**：Quick Actions、Reaction、Pricing、Weather、Workout

---

## 3. Effects（動效技法）

決定「動起來長什麼樣」。這層要與 StyleGenome 的視覺語言對齊——
Swiss/technical 只用 Fade / Reveal / Sequence；playful 才用 Bounce / Wiggle / Confetti。

| 類別 | Effects |
|------|---------|
| 出現 / 消失 | Fade、Reveal、Show/Hide、Grow、Shrink、Zoom |
| 形變 | Morph、Draw、Spin、Orbit |
| 物理 | Bounce、Spring Physics、Wiggle、Pulse |
| 質感 | Blur、Glow、Shimmer、Color、Skeuomorphic、Parallax |
| 群組節奏 | Stagger、Sequence |
| 慶祝 | Confetti、Particles |
| 數值 | Ticker（數字滾動） |
| 多感官 | Sound |

### 與視覺語言的搭配對照

| 藝術方向 | 建議 effects | 應避免 |
|---------|-------------|--------|
| Swiss / technical / editorial | Fade、Reveal、Sequence、Ticker、Draw | Bounce、Confetti、Wiggle |
| Quiet luxury | 慢速 Fade、低振幅 Grow、Glow | Spring Physics、Particles |
| Playful / consumer | Bounce、Spring Physics、Wiggle、Confetti、Stagger | 過度克制的線性動畫 |
| Retro terminal | 離散 Show/Hide、Ticker、Draw | Blur、Glow、Morph |
| Neo-brutalist | 瞬間 Show/Hide、硬切 Color | Shimmer、Parallax |

---

## 4. Elements（動效載體）

決定「哪個 UI 元件在動」。與 `component-patterns.md` 的元件清單搭配使用。

Badge、Bottom Sheet、Button、Calendar、Card、Counter、Easter Egg、Graph、Icon、
Illustration、Input、Liquid Glass、Map、Menu、Permissions、Picker、Player、Progress、
Search、Slider、Story、Tabs、Text、Toast、Tooltip、Video、Widget

---

## 5. App 類別（找同類參考）

Books、Business、Developer Tools、Education、Entertainment、Finance、Food & Drink、
Games、Graphics & Design、Health & Fitness、Lifestyle、Magazines & Newspapers、Music、
Navigation、News、Photo & Video、Productivity、Reference、Shopping、Social Networking、
Sports、Travel、Utilities、Weather

站上常被引用的範例：Claude、ChatGPT、Duolingo、WhatsApp、X、Microsoft Teams、Opal、
Monogram、District、Yazio、Pool、Okuri、Everyday、Brilliant、ZEE5、Swiggy、Mobbin

---

## 6. 使用流程

1. 從 **Pattern** 選情境（例：Onboarding、Empty State）。
2. 從 **Element** 選載體（例：Bottom Sheet、Counter）。
3. 對照 StyleGenome 的 `motion.intensity` 挑 **Effect**，避開對照表的禁用項。
4. 決定 **Gesture** 觸發方式（桌面 web 通常只剩 Tap / Scroll / Typing）。
5. 到 60fps.design 用同組標籤找實際錄影驗證手感。

輸出到 StyleGenome 時寫成具體規格，不要只寫 "subtle animations"：

```yaml
motion:
  intensity: restrained
  entrance: { effect: reveal, stagger: 60ms, duration: 400ms, easing: cubic-bezier(0.2,0,0,1) }
  hover: { effect: color, duration: 120ms }
  number_change: { effect: ticker, duration: 600ms }
  reduced_motion: required   # prefers-reduced-motion 時只保留 opacity
```

## 無障礙硬性規則

- 所有動效都必須有 `@media (prefers-reduced-motion: reduce)` 的降級版本。
- 不可用動效作為唯一的狀態指示（必須同時有文字/圖示/顏色以外的訊號）。
- 自動播放的循環動畫（Idle Animation、Shimmer）需能被停止，且不得高於 3 Hz 閃爍。
