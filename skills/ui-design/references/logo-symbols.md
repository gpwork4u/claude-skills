# Logo & Symbol Vocabulary

標誌 / 符號語彙庫。資料來源：[Logobook](https://logobook.com/) —
收錄 1950s 起現代主義商標設計的檔案庫，可依字母、形狀、物件、自然、產業分類瀏覽。

用途：
1. 設計 logo / 品牌標記時，先決定**符號類型**再決定造型，避免直接跳到「畫個漸層圓」。
2. StyleGenome 的 `iconography` 與 `signature` 維度可從這裡取語彙。
3. 把抽象品牌特質（trustworthy、technical、premium）對應到具體的幾何語言。

查詢方式：`https://logobook.com/` 依下列分類瀏覽。

---

## 1. Letters & Numbers（字母標）

A–Z、Numbers。

最常見也最安全的路徑：以品牌首字母為骨架做幾何處理。
判斷是否適用：名稱長、產業抽象、需要高度可縮放性 → 字母標。

常見手法：
- 負空間切割（字母內部挖出第二個意象）
- 重複 / 鏡射（雙字母對稱）
- 筆畫簡化成純幾何（圓 + 直線 + 45° 斜角）
- 連字（ligature）把兩個字母咬合成一個形

---

## 2. Shape（純幾何抽象）

3D、Angled、Arrows、Circle、Crosses、Cube、Diamond、Dots、Hexagon、Lines、Loops、
Outline、Ovals、Rectangle、Reflection、Rings、Round、Semicircle、Spiral、Square、
Stars、Triangle、Waves、Woven

適用：需要跨文化、跨產業、長期不過時的標記。現代主義商標的主力路線。

幾何語意速查：

| 形 | 傳達 |
|----|------|
| Circle / Rings | 完整、循環、社群、包容 |
| Square / Rectangle | 穩定、秩序、系統、可靠 |
| Triangle / Angled | 方向、速度、進取、張力 |
| Hexagon / Cube | 結構、工程、模組化 |
| Spiral / Loops | 成長、遞迴、連續 |
| Waves | 流動、資料、聲音、水 |
| Arrows | 移動、交付、轉換 |
| Dots / Lines | 網路、節點、精密 |
| Woven / Reflection | 連結、對稱、雙向關係 |
| Stars / Crosses | 卓越、醫療/救助、正向標記 |

---

## 3. Object（人造物件）

Architecture、Books & Paper、Boxes、Crosses、Crowns、Everyday Objects、Hearts、
Heraldry Shields & Flags、Ribbons、Transport

適用：產業語意明確、想被一眼認出在做什麼的品牌。
風險：具象物件容易過時，也容易撞稿。用抽象化程度來調節。

---

## 4. Nature（自然意象）

Animal、Birds、Eyes、Faces、Fire、Fish、Flowers、Fruit、Hands、Insect、Landscape、
Lightning Bolt、Mountains、People、Planets Globes & Moons、Plants、Stars、Sun、Trees、Water

適用：需要溫度、人性、永續、能量等情緒訴求的品牌。

| 意象 | 常見對應 |
|------|---------|
| Birds | 自由、遞送、輕盈 |
| Mountains | 目標、耐久、戶外 |
| Water / Waves | 流動、純淨、適應 |
| Trees / Plants | 成長、永續、在地 |
| Sun | 能量、樂觀、每日 |
| Eyes | 洞察、監測、視覺產品 |
| Hands | 照護、協作、工藝 |
| Lightning Bolt | 速度、電力、即時 |
| Planets / Globes | 規模、全球、探索 |

---

## 5. Business（產業分類）

Advertising、Airlines、Architecture、Art、Bank、Broadcaster、Construction、Cosmetics、
Design、Education、Electronics、Energy、Engineering、Farming、Fashion & Textiles、
Finance、Foods and Beverages、Furniture、Hotel、Printing、Publishing、Real Estate、
Retail & Restaurants、Sports、Transport

用來反查：先找同產業的歷史標記，理解該產業的視覺慣例，再決定要順從還是刻意違反。

---

## 6. 選型流程

1. **決定路線**：字母標 / 純幾何 / 物件 / 自然。名稱短且有意象 → 具象；名稱抽象或多語系 → 字母或幾何。
2. **反查產業**：在 Business 分類看同產業的既有語彙，列出「該產業陳腔濫調」。
3. **挑 1 個主意象 + 最多 1 個次意象**。三個以上意象疊加 = 說不清楚。
4. **選幾何語言**，並與 StyleGenome 對齊：
   - `shape.geometry: rectangular` + `radius: minimal` → Square、Angled、Lines、Crosses
   - `shape.geometry: circular` + `radius: pill` → Circle、Rings、Ovals、Loops
   - 兩者不一致時，logo 會和 UI 看起來像兩個品牌。
5. **驗證可縮放性**：16px favicon、單色、反白、去掉顏色後是否仍可辨識。

---

## 7. 應避免

- 漸層藍紫圓角方塊 + 抽象緞帶（generic AI/SaaS 標配）。
- 用 3D 渲染或光澤取代造型本身的張力。
- 把意象疊到三層以上（字母 + 動物 + 箭頭 + 星星）。
- 只在彩色大尺寸下成立、縮小或單色就糊掉的細節。
- 直接沿用同產業前三名的形狀語言。

---

## 8. 輸出格式

決定後寫進 StyleGenome：

```yaml
brand_mark:
  route: geometric-abstract      # letterform | geometric-abstract | object | nature
  primary_motif: hexagon
  secondary_motif: lines
  rationale: "模組化工程感，對應 dashboard 的 grid 語言"
  construction: "6 條等寬直線構成六邊形負空間，線寬 = 1/8 邊長"
  color_modes: [full-color, single-color, reversed]
  min_size: 16px
  avoid: [gradient-blob, 3d-render, ribbon-swoosh]
```
