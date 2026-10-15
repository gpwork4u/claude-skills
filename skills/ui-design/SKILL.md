---
name: ui-design
description: 完整的 UI 設計工作流程——從藝術方向決策（style genome）、動效與品牌符號語彙，到 shadcn/ui 元件實作與版面組裝。當使用者要求設計 UI、重新設計介面、建立頁面/元件/layout、挑選視覺方向、規劃動效，或提及 "UI 設計", "介面", "頁面設計", "redesign", "art direction", "視覺方向", "shadcn", "component", "元件", "layout", "版面", "動效", "animation", "motion", "logo", "design system", "風格化", "遊戲 UI", "表現力", "版面組合", "不要那麼死板" 時使用此 skill。不適用於純後端任務，或使用者已鎖定不可更動的視覺系統時。
argument-hint: "[專案簡述、頁面或元件範圍]"
metadata:
  author: gpwork4u
  version: "2.1.0"
---

# UI 設計

把產品需求轉成「有意識選擇的視覺系統 + 可實作的元件」，而不是預設輸出通用的 AI/SaaS 樣板。

核心原則：

> 先決定藝術方向，再拆元件，再預覽，最後才組版面。不要從「開一個置中 hero + 三張卡片」開始。

---

## 參考檔案

| 檔案 | 內容 | 何時讀 |
|------|------|--------|
| `references/style-genome.md` | 藝術方向決策方法：archetype、24 個設計維度、相容性評分、cliché 偵測、StyleGenome 輸出契約 | 階段 0，任何視覺方向決策 |
| `references/motion-patterns.md` | 動效語彙（gesture / pattern / effect / element）與視覺語言的搭配對照。來源 [60fps.design](https://60fps.design/) | 決定 motion 維度、實作動畫前 |
| `references/logo-symbols.md` | Logo / 符號語彙與幾何語意對照。來源 [Logobook](https://logobook.com/) | 做品牌標記、決定 iconography |
| `references/component-patterns.md` | 60 個元件的正規命名、別名、選型誤判對照、80+ design system 索引。來源 [The Component Gallery](https://component.gallery/) | 階段 1 拆元件清單、命名仲裁 |
| `references/shadcn-components.md` | shadcn/ui 元件清單 | 階段 1 安裝元件 |
| `references/composition-grammar.md` | 五個正交軸（版面語法 × 材料 × 表現力預算 × 密度 × 種子）、10 種版面語法、相容性矩陣、種子變異、組合評分 | 階段 0 選版面語法與預算、頁面太死板時 |
| `references/expressive-ui.md` | 母題語法、表現力等級 L0–L4、可讀核心、風格化 UI 的無障礙規則與 cliché | 需要風格化表現（遊戲感、印刷感、品牌世界觀）時 |
| `references/motif-library.md` | 15 個母題契約（材料、筆觸、角度集、色票、選取隱喻、轉場動詞），以及如何從產品世界萃取新母題 | 選母題、做品牌記號 |
| `references/expressive-recipes.md` | 母題的 CSS / SVG 實作片段、等級 hook 寫法、踩坑清單 | 實作風格化元件前 |
| `references/motion-dynamics.md` | 動態語法七軸、能量三檔、彈簧轉 `linear()`、18 個互動模式與實作技巧 | 規劃跟手互動、轉場、系統型動態前 |
| `references/implementation-shadcn.md` | 三階段實作細則（元件 → HTML 預覽 → layout）、Tailwind 斷點與間距系統 | 階段 1–3 |
| `examples/composition-lab.html` | 版面組合實驗室：10 種版面語法 × 9 種材料 × 表現力預算（L0–L3）× 種子，附相容性矩陣、cliché 計分與 StyleGenome 輸出 | 階段 0 產生候選方向、想讓頁面不死板時 |
| `examples/expressive-ui-lab.html` | 表現力 UI 實驗室：12 個母題的契約（材料、角度集、選取隱喻、轉場動詞、可讀核心）× L0–L4 | 需要風格化表現（遊戲感、印刷感）時 |
| `examples/dynamic-ui-lab.html` | 動態 UI 實驗室：動態七軸、彈簧轉 `linear()`、能量三檔與互動模式 | 規劃跟手互動與轉場前 |

---

## 工作流程

```
需求分析
   │
   ▼
階段 0：藝術方向（style-genome.md）
   產出 StyleGenome 契約 + design tokens
   │
   ▼
階段 1：建立 Components（implementation-shadcn.md + component-patterns.md）
   拆元件清單 → 安裝 shadcn/ui → 撰寫自訂元件
   │
   ▼
階段 2：HTML 預覽檔
   所有元件集中預覽，確認視覺一致性
   │
   ▼
階段 3：Layout 組裝
   組合元件、響應式、微調層次
```

**嚴禁跳過階段。每個階段完成後向使用者確認再進入下一階段。**

---

## 階段 0：決定藝術方向

讀 `references/style-genome.md`，執行：

1. **正規化需求**（product_type、audience、brand_traits、content_density、trust_requirement、desired_distinctiveness、constraints、preferred/avoid）。缺的欄位自行推論，不要逐項盤問使用者。
2. **產生候選方向**：新專案預設 6 個（2 安全 / 2 獨特 / 2 實驗）；單一元件 3 個即可。候選之間不可只差在配色或圓角，至少要在版面語法或母題其中一軸不同。
3. **選定所有設計維度**——layout grammar、composition、density、typography（heading/body/metadata）、color、surface、shape、border、elevation、imagery、iconography、navigation、component language、texture、motion、interaction、signature。不要把任何一項留給「現代預設」。
   - motion 維度：對照 `references/motion-patterns.md` 的「視覺語言搭配對照」表挑 effect。
   - iconography / 品牌標記：對照 `references/logo-symbols.md`。
   - component language：對照 `references/component-patterns.md`。
   - layout grammar：先判斷內容形狀（序列／目錄／敘事／網絡），再從 `references/composition-grammar.md` 的 10 種語法挑。
   - expression：選母題（優先從產品自己的世界萃取，見 `references/motif-library.md`），並按區域給表現力預算（安靜區至少 3 個、L3 最多 2 個），寫下種子來源。
4. **相容性評分 + 受控對比**：最多 2 個主 archetype + 1 個次要影響。刻意的矛盾必須侷限在單一層次且有理由。
5. **跑 cliché 偵測**：分數 `>= 5` 要重抽方向，不是換個強調色。
6. **無障礙檢查**：內文對比、focus 可見性、觸控目標、reduced-motion、語意階層、響應式重排。
7. **輸出 StyleGenome YAML 契約**，並先建立 design tokens（語意命名，如 `--surface-page`、`--text-muted`，不要在元件裡用 `--gray-200`）。

決定後把 StyleGenome 當成契約，後續階段不得偏離。

### 已有既存 UI 的改版

1. 盤點現有資訊架構與功能限制 → 2. 辨識目前的視覺 genome → 3. 分離功能元件與偶然樣式 →
4. 提 3–6 個替代 genome → 5. 除非範圍包含 UX 變更，否則保留既有行為 →
6. 先重構 tokens 與 primitives → 7. 系統性轉換元件 → 8. 最後跑一次 cliché 與一致性驗證。

不要為了換框架而重寫一個能正常運作的 App。

---

## 階段 1–3：實作

細則見 `references/implementation-shadcn.md`。重點：

- **Components First**：先建立獨立元件，再組合成頁面。
- **Preview Before Layout**：元件完成後先產出 `preview-[功能].html`，確認視覺正確再組版面。用了風格化母題時，預覽還要包含每個用到的等級、轉場分鏡（含 reduced-motion 版本）和選取隱喻的互動，見 `references/expressive-ui.md`。
- **shadcn/ui 優先**：不要重造 Button、Dialog 這類已有的元件。
- **命名用正規名稱**：`references/component-patterns.md` 的正規名稱當專案內部基準（例如統一叫 Drawer，不要 Tray/Flyout/Sheet 混用）。
- **拆清單時跑檢查表**：Empty state、Skeleton/Spinner、Alert vs Toast、Skip link、Visually hidden、Label、三層錯誤狀態。

---

## 硬性規則

**Cards 不是預設容器。** 只有在「卡片本身代表有意義的分組或層級」時才用。否則優先考慮 ruled sections、lists、tables、rows、panels、sheets、full-bleed blocks、tabs、split panes。

**Icon 不是裝飾 token。** 不要把每個 outline icon 都塞進帶底色的圓角方塊。icon 處理方式由 genome 決定。

**框可以歪，字不歪。** 內文、表單、數字是可讀核心，任何表現力等級都不旋轉、不拼貼、不套印。旋轉只用母題的角度集，不准隨機。

**一頁要有安靜區。** 表現力預算至少 3 個區域在 L0–L1，L3 最多 2 個；全部開到最大本身就是 cliché。

**Motion 必須符合視覺語言。** Swiss/technical → 精準線性；playful → spring/elastic；editorial → mask reveal / 數字轉場；retro terminal → 離散 step；luxury → 慢速低振幅。所有動效都要有 `prefers-reduced-motion` 降級。

**Layout grammar 要響應式地保留，不是塌成置中堆疊。** 非對稱 grid 可以變成有序但仍偏左；editorial 欄位收成單欄但保留排版階層。

**風格不得凌駕功能。** 美感與無障礙衝突時，用更安全的實作保留設計意圖。

---

## 技術棧偏好

| 類別 | 技術 |
|------|------|
| UI 元件庫 | shadcn/ui |
| CSS 框架 | Tailwind CSS |
| 圖示 | Lucide React |
| 動畫 | Tailwind CSS animations / Framer Motion |
| 主題 | shadcn/ui CSS 變數系統（支援 dark mode） |
| 工具函式 | `cn()` from `@/lib/utils`（clsx + tailwind-merge） |

---

## 完成前檢查清單

- [ ] 需求已被解讀成 project brief
- [ ] 明確選定了 archetype，不是「現代簡約」這種標籤
- [ ] layout grammar 已指定，且符合內容形狀（序列／目錄／敘事／網絡）
- [ ] expression 已宣告：母題、按區域的表現力預算（安靜區 ≥ 3、L3 ≤ 2）、種子來源
- [ ] typography 指定到「不只是 sans-serif」的程度（heading / body / metadata 三種聲音）
- [ ] material / radius / border / elevation 彼此一致
- [ ] imagery 與 icon 有定義好的語言
- [ ] navigation 與 component pattern 已指定，命名採用正規名稱
- [ ] motion 已指定具體規格（effect + duration + easing + reduced-motion），或刻意留白
- [ ] 獨特型方向至少有一個 signature element
- [ ] cliché 分數低於門檻，或有意識地說明理由
- [ ] 無障礙限制被保留（對比、focus、觸控目標、語意）
- [ ] design tokens 與 genome 一致
- [ ] 重複出現的 UI 沒有悄悄退回成通用卡片/藥丸按鈕
- [ ] 元件清單檢查表跑過（empty state / loading / 錯誤狀態 / skip link / visually hidden）
- [ ] HTML 預覽檔已確認後才組 layout
