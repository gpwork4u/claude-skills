# Component Patterns & Naming

跨 design system 的元件對照表。資料來源：[The Component Gallery](https://component.gallery/) —
索引 80+ 個公開 design system，統一命名並列出各家的實作截圖與文件連結。

用途：
1. **命名仲裁**：同一個東西各家叫法不同（Drawer / Tray / Flyout / Sheet）。用這裡的正規名稱當專案內部命名基準。
2. **需求拆解**：第一階段拆元件清單時，用這份 60 個元件的清單逐項核對，避免漏掉 Empty State、Skip Link、Visually Hidden 這類容易忘記的元件。
3. **實作參考**：要做某個元件時，到 component.gallery 對應頁面看 10+ 個 design system 的實際做法與無障礙文件。

---

## 1. 元件清單（60 項）

### 表單與輸入

| 正規名稱 | 別名 | 說明 |
|---------|------|------|
| Text input | — | 單行文字輸入。 |
| Textarea | Textbox, Text box | 多行文字輸入。 |
| Search input | Search | 以關鍵字尋找內容的輸入框。 |
| Select | Dropdown, Select input | 收合時顯示目前選項，展開時顯示預設選項清單。 |
| Combobox | Autocomplete, Autosuggest | 類似 select，但多了自由輸入以過濾選項。 |
| Checkbox | — | 多選。 |
| Radio button | Radio, Radio group | 從預設選項中單選。 |
| Toggle | Switch, Lightswitch, Toggle button | 兩種狀態（開/關）之間切換。 |
| Segmented control | Toggle button group | button group / radio / tabs 的混合體，用於切換選項或檢視。 |
| Slider | Range input | 在預設範圍內選值。 |
| Stepper | Nudger, Quantity, Counter | 帶加減按鈕的數值輸入。 |
| Date input | — | 輸入日期，常拆成日/月/年多欄。 |
| Datepicker | Calendar, Datetime picker | 以日曆檢視選日期。 |
| Color picker | — | 選顏色。 |
| File upload | File input, File uploader, Dropzone | 從裝置上傳檔案。 |
| Rich text editor | RTE, WYSIWYG editor | 帶格式的內容編輯器。 |
| Label | Form label | 表單輸入的文字標籤。 |
| Fieldset | — | 相關表單欄位的群組容器。 |
| Form | — | 可提交資訊到伺服器的輸入控制群組。 |

### 動作

| 正規名稱 | 別名 | 說明 |
|---------|------|------|
| Button | — | 觸發動作，如送出表單或顯示/隱藏介面元件。 |
| Button group | Toolbar | 多個相關按鈕的包裝容器。 |
| Link | Anchor, Hyperlink | 指向資源的參照（外部頁面或文件內元素）。 |
| Dropdown menu | Select menu | 按鈕觸發的選單，內容是動作或導覽，非表單輸入。 |

### 導覽

| 正規名稱 | 別名 | 說明 |
|---------|------|------|
| Navigation | Nav, Menu | 導覽連結容器（站台主選單或頁內目錄）。 |
| Header | — | 橫跨所有頁面頂部，通常含站名與主導覽。 |
| Footer | — | 頁尾，版權、法律資訊或相關連結。 |
| Breadcrumbs | Breadcrumb trail | 顯示目前頁面在階層中的位置。 |
| Tabs | Tabbed interface | 在多個面板間切換，減少雜訊。 |
| Pagination | — | 將資訊分頁，以及分頁導覽元件本身。 |
| Skip link | — | 跳到頁面其他區段的連結，主要服務鍵盤使用者。 |
| Tree view | — | 巢狀階層資訊（目錄結構、目次）。 |
| Stepper (progress) | Progress tracker, Steps, Timeline, Meter | 使用者在一連串離散步驟中的進度（正規名稱為 Progress indicator）。 |

### 疊層與浮層

| 正規名稱 | 別名 | 說明 |
|---------|------|------|
| Modal | Dialog, Popup, Modal window | 蓋在其他內容之上，需互動後才能返回底層。 |
| Drawer | Tray, Flyout, Sheet | 從畫面邊緣滑出的面板。 |
| Popover | — | 由某元素彈出、蓋在內容上；與 tooltip 差別是通常用點擊觸發且可含互動元素。 |
| Tooltip | Toggletip | hover（或點擊/觸控）時顯示的補充說明。 |
| Toast | Snackbar | 浮在內容上層的通知型 alert，視覺近似推播。 |

### 回饋與狀態

| 正規名稱 | 別名 | 說明 |
|---------|------|------|
| Alert | Notification, Feedback, Message, Banner, Callout | 以顯眼方式告知重要變化。 |
| Empty state | — | 目前檢視沒有資料的提示，通常附替代動作。 |
| Skeleton | Skeleton loader | 內容載入前的佔位版型，通常是灰色方塊。 |
| Spinner | Loader, Loading | 背景處理中、介面尚未可互動的視覺指示。 |
| Progress bar | Progress | 長時間任務的完成度，連續更新。 |
| Progress indicator | Progress tracker, Stepper, Steps, Timeline, Meter | 離散步驟的進度表示。 |

### 內容容器

| 正規名稱 | 別名 | 說明 |
|---------|------|------|
| Card | Tile | 代表單一實體（聯絡人、文章、任務）的容器。 |
| Accordion | Collapse, Collapsible, Details, Disclosure, Expandable, Expander | 垂直堆疊的可互動標題，展開/收合顯示更多內容。 |
| Table | Data table | 以列與欄顯示大量資料；含排序/篩選時常稱 Data Table。 |
| List | — | 清單。 |
| Stack | — | 為元件間加上一致外距的包裝元件。 |
| Separator | Divider, Horizontal rule, Vertical rule | 兩元素間的分隔，通常是一條線。 |
| Hero | Jumbotron, Banner | 頁面前段的大型橫幅，常含滿版圖片。 |
| Carousel | Content slider | 一次顯示一或多張投影片，可滑動/捲動/按鈕切換。 |
| Quote | Pull quote, Block quote | 引言或文中摘句。 |

### 內容元素

| 正規名稱 | 別名 | 說明 |
|---------|------|------|
| Heading | — | 引入新區段的標題。 |
| Avatar | — | 使用者的圖像表示：照片、插畫或首字母。 |
| Badge | Tag, Label, Chip | 依附在較大元件旁的小標籤，表示狀態、屬性或中繼資料。 |
| Icon | — | 以圖形符號指示介面元素用途。 |
| Image | Picture | 嵌入圖片。 |
| Video | Video player | 影片播放，通常含播放控制。 |
| File | Attachment, Download | 檔案的呈現（上傳的附件、可下載的 PDF）。 |
| Rating | — | 顯示/設定星等評分。 |
| Visually hidden | Screenreader only | 不可見文字，為輔助科技使用者提供額外脈絡。 |

---

## 2. 拆元件清單時的檢查表

需求拆解階段用這張表逐項自問，這些是最常被漏掉的：

- [ ] **Empty state** — 每個清單/表格/搜尋結果為空時長什麼樣？
- [ ] **Skeleton / Spinner** — 載入中的樣子？（選一種並全站一致）
- [ ] **Alert vs Toast** — 持續性訊息用 Alert，暫時性回饋用 Toast，不要混用。
- [ ] **Skip link** — 有主導覽的頁面必備。
- [ ] **Visually hidden** — icon-only 按鈕、表格的排序狀態都需要。
- [ ] **Label** — 每個輸入都有對應 label（placeholder 不算 label）。
- [ ] **Separator vs Card** — 能用 ruled section 就不要用 card（見 style-genome.md 的 "Cards are not the default primitive"）。
- [ ] **錯誤狀態** — 表單欄位、整份表單、整頁請求失敗，三層都要有。

---

## 3. 元件選型的常見誤判

| 想做的事 | 正確元件 | 常見誤用 |
|---------|---------|---------|
| 顯示動作選單 | Dropdown menu | Select（select 是表單輸入，不放動作） |
| 滑鼠移上顯示說明 | Tooltip | Popover（popover 用點擊，且可含互動） |
| 說明裡有連結或按鈕 | Popover | Tooltip（tooltip 內容不可互動、不可 focus） |
| 切換兩種檢視 | Segmented control 或 Tabs | Toggle（toggle 是開/關，不是二選一） |
| 立即生效的開關 | Toggle | Checkbox（checkbox 通常配合 submit） |
| 需要使用者回應才能繼續 | Modal | Drawer（drawer 通常非阻斷式） |
| 步驟進度 | Progress indicator | Progress bar（bar 是連續百分比） |
| 從清單多選 | Checkbox group | Select multiple（可用性差） |

---

## 4. 已索引的 design system（查實作與無障礙文件）

**大廠 / 產品**：Material Design (Google)、Fluent UI (Microsoft)、Carbon (IBM)、
Spectrum (Adobe)、Polaris (Shopify)、Primer (GitHub)、Atlassian Design System、
Lightning (Salesforce)、Base Web (Uber)、Gestalt (Pinterest)、Paste (Twilio)、
Pajamas (GitLab)、Geist (Vercel)、Ant Design、Clarity (VMware)、Blueprint (Palantir)、
Workday Canvas、Momentum (Cisco)、Orbit (Kiwi.com)、Backpack (Skyscanner)、
Source (The Guardian)、NewsKit (News Corp)、Forma 36 (Contentful)、Helios (HashiCorp)、
Elastic UI、Evergreen (Segment)、Instructure-UI、Thumbprint (Thumbtack)、
Seeds (Sprout Social)、Auro (Alaska Airlines)、Cedar (REI)、Pharos (JSTOR)、
Stacks (Stack Overflow)、Mozilla Protocol、Nord (Nordhealth)、Wanda (Wonderflow)、
Coral (Talend)、Crayons (Freshworks)、Visa Product Design System、
Decathlon Design System、Porsche Design System、Morningstar Product System、
Wise Design、Bolt (Pegasystems)、SubZero (Axis Bank)、Nessie (NS)、
Elisa Design System、Jøkul (Fremtind)、eBay Playbook、eBay MIND Patterns

**開源元件庫**：shadcn/ui、Radix Primitives、Headless UI、Chakra UI、HeroUI、
Shoelace、Web Awesome、Ariakit、Reach UI、Flowbite、Quasar、PatternFly (Red Hat)、
Red Hat Design System、generic-components、98.css

**政府 / 公共服務**（無障礙文件最完整，值得優先參考）：
GOV.UK Design System、United States Web Design System、NHS Digital service manual、
Helsinki Design System、Ontario Design System、Aurora (Government of Canada)、
ONS Design System、W3C design system、West Midlands Network、GOLD Design System (AU)

**無障礙導向**：Cauldron (Deque)、A11Y Style Guide、Inclusive Components、
eBay MIND Patterns

> 要查某元件的無障礙做法時，優先看 GOV.UK、USWDS、NHS、Cauldron、eBay MIND Patterns。
