# Motif Library（母題契約庫）

表現力 UI 的母題清單。每個母題是一份「世界材料 → 整套規則」的契約，讓風格化有固定的語法，不靠臨場發揮。

來源：

- `examples/expressive-ui-lab.html` 的 `MOTIFS`：12 個母題，以遊戲／App 場景驗證（導覽、對話框、標題畫面、結算），L0–L4
- `examples/composition-lab.html` 的 `MOTIFS` 與 `COMPAT`：網頁用的材料、版面語法相容性；新增白底製圖、門牌、評級卡盒

用途：在 `expressive-ui.md` 的流程裡選母題時查這裡；把母題套到版面時，對照 `composition-grammar.md` 的版面語法與預算。

> 母題決定「長什麼樣」，表現力等級決定「風格化到哪裡為止」。任何母題都不得動到可讀核心。

---

## 總表

| 母題 | 分組 | 筆觸 mark | 轉場動詞 | 最適合的版面語法 |
|------|------|-----------|----------|------------------|
| 預告信 Calling Card | 遊戲與流行文化 | cut | slash | 對角舞台、卷宗疊紙 |
| 油畫畫布 Painted Canvas | 遊戲與流行文化 | brush | bloom | 編輯刊物、標本陳列* |
| 漫畫分格 Manga Panel | 遊戲與流行文化 | ink | cut | 對角舞台、卷宗疊紙* |
| 像素 RPG Pixel RPG | 遊戲與流行文化 | pixel | mosaic | 帳簿索引、空間畫布* |
| 孔版印刷 Risograph | 印刷與工藝 | overprint | register | 編輯刊物 |
| 木刻朱印 Woodblock | 印刷與工藝 | carve-stamp | stamp | 編輯刊物、橫向長卷 |
| 塔羅秘儀 Arcana | 印刷與工藝 | engrave | flip | 軌道、卷宗疊紙* |
| 彩繪玻璃 Stained Glass | 印刷與工藝 | lead-came | assemble | 軌道、標本陳列* |
| 劇場帷幕 Theatre | 印刷與工藝 | light | spotlight | 對角舞台、橫向長卷* |
| 工程藍圖 Blueprint | 資訊與技術 | draw | draw | 非對稱網格、標本陳列、空間畫布（同白底製圖） |
| CRT 終端機 Terminal | 資訊與技術 | glyph | boot | 帳簿索引 |
| 航海圖 Sea Chart | 資訊與技術 | survey | plot | 空間畫布、軌道 |
| 白底製圖 Ink Drafting | 網頁材料 | draw | draw | 非對稱網格、標本陳列、空間畫布 |
| 門牌 Address Plate | 網頁材料（萃取自租屋查證產品） | enamel | register | 空間畫布、帳簿索引 |
| 評級卡盒 Graded Slab | 網頁材料（萃取自卡牌收藏產品） | encase | stamp | 標本陳列、卷宗疊紙 |

`*`：組合實驗室的 `COMPAT` 沒有評這個母題，表中是依材料推論，使用前要自己跑一次相容性評分。

版面相容性的分數一律引用 `composition-lab.html` 的 `COMPAT`（+2 強化、+1 相容、-1 要有理由、-2 不成立，除非是刻意的招牌）。

---

## 1. 遊戲與流行文化

### 預告信 Calling Card

靈感：女神異聞錄 5。最吵的母題，最需要預算控制。

| 欄位 | 內容 |
|------|------|
| world_material | 預告信、勒索信拼貼、龐克海報 |
| mark | cut（剪） |
| shapes | 鋸齒多邊形、爆炸星、斜切色帶、網點 |
| angle_set | [-12, -6, 4, 9] |
| palette_lock | `#E5141B` 訊號紅、`#0A0A0A` 墨黑、`#FFFFFF` 紙白 |
| selection_metaphor | 鋸齒底板「啪」地貼到焦點項目，後面墊一層錯位色板，文字反白並放大 |
| transition_verb | slash：三條斜切色帶掃過畫面 |
| typography | display：Anton＋思源黑體 Black；拼貼字逐字換字體（Anton／思源宋體 Black／Archivo Black）；body：思源黑體；meta：Oswald |
| motion | 硬切、overshoot 回彈、`steps()` 定格，不用緩慢淡入 |
| legibility_core | 內文、表單；拼貼字只用在 2–4 個字的強調詞 |
| 適合的版面 | 對角舞台 +2（斜切色帶是招牌）、卷宗疊紙 +2（拼貼是一疊剪下來的紙）、空間畫布 +1、編輯刊物 +1（龐克 zine） |
| 要避開 | 帳簿索引 -2（拼貼字會毀掉表格，除非只放在合計列）、非對稱網格 -1、樣板 -1 |
| 適用產品 | 活動頁、遊戲選單、年度回顧、結算畫面；不適合高信任產品的主流程 |

### 油畫畫布 Painted Canvas

靈感：33 號遠征隊。

| 欄位 | 內容 |
|------|------|
| world_material | 油畫、畫布、金箔畫框、美好年代海報 |
| mark | brush（刷） |
| shapes | 筆刷帶、金色細線與菱形、橢圓印記、花瓣 |
| angle_set | [-2, 0, 2] |
| palette_lock | `#17130F` 松煙墨、`#E8DFCC` 畫布、`#C9A04A` 金箔、`#8C1D2C` 茜紅 |
| selection_metaphor | 一道茜紅筆刷由左往右刷到焦點項目底下，前端點一顆金色菱形 |
| transition_verb | bloom：墨色暈開蓋住畫面，再化成花瓣散去 |
| typography | display：思源宋體 Black；副標：Cormorant 斜體法文；meta：小型大寫 |
| motion | 慢入快出、暈開、粒子飄散；環境動態可停止 |
| legibility_core | 內文、表單、數字 |
| 適合的版面* | 編輯刊物、標本陳列（畫框即標本框）、橫向長卷 |
| 要避開* | 帳簿索引（筆刷與表格格線互搶）、樣板 |
| 適用產品 | 藝文、出版、精品、作品集、敘事型遊戲 |

### 漫畫分格 Manga Panel

靈感：少年漫畫原稿。

| 欄位 | 內容 |
|------|------|
| world_material | 漫畫原稿、網點紙、對白框、狀聲字 |
| mark | ink（墨線） |
| shapes | 斜切分格框、集中線、對白泡泡、網點 |
| angle_set | [-8, -3, 0, 5] |
| palette_lock | `#111111` 墨線、`#FFFFFF` 原稿白、`#FFD60A` 特色黃 |
| selection_metaphor | 焦點項目墊上黃色粗框格子，四周爆出集中線 |
| transition_verb | cut（分格）：三格分鏡依序「碰」地貼上，狀聲字壓在中間，畫面震一下 |
| typography | display：思源黑體 Black；狀聲字：Bangers；對白放進對白框 |
| motion | 定格（steps）、衝擊縮放、畫面震動；沒有緩慢淡入 |
| legibility_core | 內文、表單；對白框內的文字一律 0° |
| 適合的版面* | 對角舞台（斜切分格）、卷宗疊紙、空間畫布（分鏡板） |
| 要避開* | 帳簿索引、編輯刊物的長文區 |
| 適用產品 | onboarding 教學、社群、漫畫／娛樂、活動頁 |

### 像素 RPG Pixel RPG

靈感：16-bit 日式角色扮演遊戲。

| 欄位 | 內容 |
|------|------|
| world_material | 點陣字、九宮格對話視窗、像素圖、存檔畫面 |
| mark | pixel（點） |
| shapes | 缺角像素視窗、▶ 游標、階梯狀星形、條紋海面 |
| angle_set | [0] |
| palette_lock | `#2038A8` 視窗藍、`#F8F8F8` 框線白、`#F8D030` 選取黃、`#101028` 夜 |
| selection_metaphor | ▶ 游標跳到焦點項目前方並閃爍，文字轉黃 |
| transition_verb | mosaic：畫面被一格格像素蓋滿，視窗彈出訊息後再一格格散掉 |
| typography | display：Press Start 2P（英文標示）、DotGothic16（中文點陣）；body：思源黑體 |
| motion | `steps()` 逐格、游標閃爍（可停）、無抗鋸齒 |
| legibility_core | 內文用思源黑體，不用點陣字；表單、數字 |
| 適合的版面* | 帳簿索引（存檔列表）、空間畫布（世界地圖）、卷宗疊紙（重疊視窗） |
| 要避開* | 對角舞台、軌道（斜線與圓在像素格裡會鋸齒） |
| 適用產品 | 遊戲、遊戲化任務、開發者工具的彩蛋、懷舊行銷 |

---

## 2. 印刷與工藝

### 孔版印刷 Risograph

靈感：孔版印刷 zine、獨立出版。

| 欄位 | 內容 |
|------|------|
| world_material | 孔版油墨、再生紙、雙色套印、釘裝 zine |
| mark | overprint（疊印） |
| shapes | 粗網點、純色塊、膠帶、錯位的雙色字 |
| angle_set | [-3, 0, 3]（網頁版 [-3, 2, 0]） |
| palette_lock | `#FF48B0` 螢光粉、`#0078BF` 孔版藍、`#FFE800` 黃、`#F5F0E6` 再生紙（網頁版紙色 `#FBFAF7`、文字 `#1B2A5E` 藍黑） |
| selection_metaphor | 粉紅色塊以 multiply 疊印在焦點項目下，旁邊錯開一層黃 |
| transition_verb | register：粉、藍兩層從左右滑入，先錯位再「喀」一聲對齊 |
| typography | display：Archivo Black＋思源黑體 Black；body：思源黑體；meta：DM Mono |
| motion | 錯位後對齊、`steps()` 抖動，像印刷機一張張出紙 |
| legibility_core | 內文、表單；錯版只錯在標題與按鈕 |
| 適合的版面 | 編輯刊物 +2（孔版本來就是 zine 的印法）、對角舞台 +1、卷宗疊紙 +1、非對稱網格 +1、空間畫布 +1、橫向長卷 +1 |
| 要避開 | 帳簿索引 -1（網點和錯版干擾表格閱讀） |
| 適用產品 | 獨立品牌、活動、文化刊物、創作者工具 |

### 木刻朱印 Woodblock

靈感：浮世繪版畫、印章、直排書籍。

| 欄位 | 內容 |
|------|------|
| world_material | 木刻版畫、和紙、朱印、直排書籍 |
| mark | carve-stamp（刻＋印） |
| shapes | 青海波、朱印方章、霞雲帶、直排欄 |
| angle_set | [0, 90]（90 = 直排）；網頁版 [0, -2] |
| palette_lock | `#1F3A5F` 藍染、`#B23026` 朱、`#1C1C1C` 墨、`#F1E9D8` 和紙（網頁版朱 `#B8321F`、紙 `#F3EEE3`） |
| selection_metaphor | 焦點項目旁蓋上一枚朱印，並拉出一條朱線 |
| transition_verb | stamp：兩扇紙門從左右拉上，中央蓋下一枚寫著結果的大印 |
| typography | display：思源宋體 Black（可直排）；body：思源宋體／思源黑體；編號：大寫數字壹貳參或 `cjk-decimal` |
| motion | 拉門平移、蓋印按壓；由右往左展開 |
| legibility_core | 內文、表單、數字；直排只用在 display 與落款 |
| 適合的版面 | 編輯刊物 +2（版畫與書籍裝幀同源）、橫向長卷 +2（手卷）、卷宗疊紙 +1、標本陳列 +1（拓本陳列） |
| 要避開 | 對角舞台 -1（木刻構圖重留白與垂直）、樣板 -1（朱印變成貼紙） |
| 適用產品 | 出版、茶與食品品牌、在地文化、工藝電商 |

### 塔羅秘儀 Arcana

靈感：塔羅牌、維多利亞時代銅版畫。

| 欄位 | 內容 |
|------|------|
| world_material | 塔羅牌面、銅版雕刻、燙金、星盤 |
| mark | engrave（刻） |
| shapes | 拱形牌框、四芒星、羅馬數字、同心星盤 |
| angle_set | [0] |
| palette_lock | `#101820` 夜空、`#EDE3CC` 羊皮紙、`#D4AF37` 燙金、`#2E5E5A` 孔雀綠 |
| selection_metaphor | 焦點項目被一圈金線拱框圍住，左右各亮起一顆四芒星 |
| transition_verb | flip（翻牌）：一張牌在畫面中央翻面，牌面寫著這次的結果 |
| typography | display：Cinzel 碑文大寫＋思源宋體；編號：羅馬數字 |
| motion | 左右對稱展開、緩慢旋轉的星盤、3D 翻牌 |
| legibility_core | 內文、表單、數字；燙金色不得用在小字 |
| 適合的版面* | 軌道（星盤）、卷宗疊紙（一副牌）、標本陳列 |
| 要避開* | 帳簿索引、橫向長卷 |
| 適用產品 | 抽卡／每日運勢、會員等級揭曉、精品、占卜與冥想 App |

### 彩繪玻璃 Stained Glass

靈感：哥德式教堂花窗。

| 欄位 | 內容 |
|------|------|
| world_material | 色玻璃、鉛條、石框、透光 |
| mark | lead-came（鉛條） |
| shapes | 鉛條分隔的不規則碎片、菱形、玫瑰窗、彩色條帶 |
| angle_set | [0] |
| palette_lock | `#1F4EA8` 鈷藍、`#A3162E` 寶石紅、`#1E7A4F` 祖母綠、`#E0A021` 琥珀、`#17161C` 鉛 |
| selection_metaphor | 每個項目都是一片暗的色玻璃，焦點那片被光透亮，邊緣泛出暖光 |
| transition_verb | assemble（拼合）：碎片從四面飛進來拼成花窗，光灑滿畫面，再碎落下去 |
| typography | display：Uncial Antiqua（拉丁字）＋思源宋體 Black（中文） |
| motion | 慢速亮度變化、碎片飛入飛出；選取靠「變亮」不靠位移 |
| legibility_core | 內文、表單、數字；文字不放在色玻璃上，放在石框區 |
| 適合的版面* | 軌道（玫瑰窗）、標本陳列、空間畫布（碎片即區塊） |
| 要避開* | 帳簿索引、橫向長卷 |
| 適用產品 | 成就／收藏牆、宗教與文化場館、奇幻遊戲 |

### 劇場帷幕 Theatre

靈感：劇場舞台、節目單、跑馬燈招牌。

| 欄位 | 內容 |
|------|------|
| world_material | 絲絨帷幕、聚光燈、木地板、節目單、燈泡招牌 |
| mark | light（打光） |
| shapes | 舞台口與垂幔、聚光燈錐、燈泡邊框、票根缺角 |
| angle_set | [0] |
| palette_lock | `#8E1B1E` 絲絨紅、`#1B1412` 後台黑、`#F1E3C2` 節目單、`#FFE9B0` 聚光燈 |
| selection_metaphor | 一盞聚光燈打在焦點項目上，文字在光裡轉成深色 |
| transition_verb | spotlight（光圈）：全場暗下，光圈收到中央打出結果，再整場亮起 |
| typography | display：Abril Fatface；meta：Oswald（節目單小字）；中文：思源宋體 |
| motion | 燈光亮暗、光圈收放；道具不動，靠打光說故事 |
| legibility_core | 內文、表單、數字；暗場時可讀文字仍要達對比標準 |
| 適合的版面* | 對角舞台（聚光燈錐）、橫向長卷（節目流程）、卷宗疊紙（票根） |
| 要避開* | 帳簿索引、空間畫布 |
| 適用產品 | 售票、活動、發表會、頒獎與結果揭曉 |

---

## 3. 資訊與技術

### 工程藍圖 Blueprint

靈感：技術製圖、建築立面圖。深底版本；白底版本見「白底製圖」。

| 欄位 | 內容 |
|------|------|
| world_material | 藍曬圖、製圖標題欄、尺寸標註 |
| mark | draw（繪） |
| shapes | 尺寸線、角括弧、中心線、標題欄表格 |
| angle_set | [0, 90] |
| palette_lock | `#0E2A4C` 普魯士藍、`#D6E6FF` 藍曬線、`#FF7A1A` 安全橘 |
| selection_metaphor | 四個角括弧由外往內收合到焦點項目，旁邊標出它的實際寬度 |
| transition_verb | draw：線條描出圖框與中心線，文字以打字機逐字出現 |
| typography | display：IBM Plex Sans Condensed；meta：IBM Plex Mono；body：思源黑體 |
| motion | 線性、等速描繪、無回彈；只有 0° 與 90° |
| legibility_core | 內文、表單、數字 |
| 適合的版面 | 同白底製圖：非對稱網格 +2、標本陳列 +2、空間畫布 +2、帳簿索引 +1、軌道 +1、橫向長卷 +1 |
| 要避開 | 對角舞台 -1、樣板 -1 |
| 適用產品 | 開發者工具、硬體、建築與工程、技術文件 |

### CRT 終端機 Terminal

靈感：CRT 螢幕、TUI 文字介面。

| 欄位 | 內容 |
|------|------|
| world_material | 磷光螢幕、掃描線、等寬字元格、框線字元 |
| mark | glyph（字元） |
| shapes | 字元方格、框線字元 ─│┌┐、反白方塊游標、ASCII 圖 |
| angle_set | [0] |
| palette_lock | `#0A120C` 暗螢幕、`#3BFF7A` 磷光綠、`#FFB000` 琥珀警示（網頁版文字 `#B5F2AE`、強調 `#F5C451`） |
| selection_metaphor | 焦點項目整列反白（綠底黑字），前面多一個 `>` 提示符 |
| transition_verb | boot：一條亮線撐開成整個畫面，文字逐字打出，結束時縮回一個點 |
| typography | display：VT323（中文退到 DotGothic16／思源黑體）；body：IBM Plex Mono；meta：VT323 |
| motion | 瞬間切換、逐字輸出、游標閃爍（可停）；沒有任何緩動 |
| legibility_core | 內文、表單、數字；掃描線只准在舞台區 |
| 適合的版面 | 帳簿索引 +2（輸出就是對齊的欄位）、非對稱網格 +1、卷宗疊紙 +1（重疊視窗）、橫向長卷 +1（捲動日誌） |
| 要避開 | 編輯刊物 -1、對角舞台 -1、軌道 -1（除非是雷達）、樣板 -1 |
| 適用產品 | 開發者工具、監控後台、資安、駭客松活動頁 |

### 航海圖 Sea Chart

靈感：航海圖、等深線、燈塔燈質標示。

| 欄位 | 內容 |
|------|------|
| world_material | 海圖紙、經緯線、等深線、水深數字、羅盤玫瑰 |
| mark | survey（測繪） |
| shapes | 虛線航線、港口圓點、紅色落針、羅盤玫瑰、比例尺 |
| angle_set | [0]（網頁版 [-8, 0, 8]：航線角度，只給 display 與裝飾） |
| palette_lock | `#EEE6D0` 海圖紙、`#1F2F3F` 測繪墨、`#9BBDB7` 淺海、`#C23B22` 航線紅、`#B0306A` 燈光洋紅 |
| selection_metaphor | 紅色落針掉到焦點港口上，圖例上的項目拉出一段虛線航線 |
| transition_verb | plot：一條紅色航線從左畫到右，終點落下一根針 |
| typography | display：IM Fell English 斜體（地名）、IM Fell SC／Cormorant SC（圖題）；中文：思源宋體；meta：IBM Plex Mono（座標、水深） |
| motion | 描線、落針；選單本身就是地圖上的位置 |
| legibility_core | 內文、表單；水深數字是裝飾，真實數據另外用 tabular-nums 呈現 |
| 適合的版面 | 空間畫布 +2、軌道 +2（羅經花）、橫向長卷 +1（航線）、標本陳列 +1、帳簿索引 +1（航海日誌）、編輯刊物 +1 |
| 要避開 | 樣板 -1（圖框說明被塞進卡片） |
| 適用產品 | 旅遊、物流、路線圖與課程、地理資料產品 |

---

## 4. 網頁材料（組合實驗室新增）

這三個是為一般網站設計的材料：預設 L0–L2 就能成立，不需要遊戲場景。

### 白底製圖 Ink Drafting

工程藍圖的白底版本。符合「白底黑字、只做進場動畫」這類嚴格品牌限制（例：只准白底黑字的工作室官網）。

| 欄位 | 內容 |
|------|------|
| world_material | 工程圖、尺寸線、圖框標題欄 |
| mark | draw（描線） |
| shapes | 尺寸標註線（兩端短豎線）、裁切標記、點劃中心線、標題欄表格、方格紙 |
| angle_set | [0, 0, 90] |
| palette_lock | `#FCFCFA` 圖紙白、`#0F0F0E` 墨線、`#1C46F0` 藍鉛筆（只做註記；品牌只准黑白時改成墨線色） |
| selection_metaphor | 45° 細斜線 hatch 填滿焦點列；按鈕四角有裁切標記 |
| transition_verb | draw：一條水平線與一條垂直線描過畫面 |
| typography | display：IBM Plex Sans Condensed 700 大寫＋思源黑體；body：思源黑體；meta：IBM Plex Mono（圖號 `DWG-01`、比例 1:2） |
| motion | 等速描線（stroke-dashoffset 畫一次就停），無回彈 |
| legibility_core | 內文、表單、數字 |
| 適合的版面 | 非對稱網格 +2、標本陳列 +2（引線標註）、空間畫布 +2（座標方格）、帳簿索引 +1（標題欄）、軌道 +1、橫向長卷 +1 |
| 要避開 | 對角舞台 -1（只用 0° 與 90°）、樣板 -1（尺寸線變裝飾） |
| 適用產品 | 軟體／研究工作室官網、開發者工具、技術部落格、B2B |

### 門牌 Address Plate（萃取自租屋查證產品）

台灣藍底白字琺瑯門牌＋出租紅紙。用在以「地址」為核心名詞的產品。

| 欄位 | 內容 |
|------|------|
| world_material | 台灣藍底白字門牌、出租紅紙（撕條電話）、街廓 |
| mark | enamel（琺瑯牌） |
| shapes | 圓角牌面＋內白框（雙 inset 框線）、撕條紅紙、街廓網格 |
| angle_set | [0, -2, 3]（門牌永遠是正的，角度只給紅紙） |
| palette_lock | `#F5F6F3` 水泥白、`#15223D` 夜藍墨、`#1D4FA3` 門牌藍、`#D2392A` 出租紅 |
| selection_metaphor | 焦點列底部出現紅色底線，右下角掛一段撕條紅紙 |
| transition_verb | register：門牌藍、墨色、出租紅三層對版 |
| typography | display：思源黑體 900（字距 .04em，像門牌）；body：思源黑體；meta：IBM Plex Mono（門牌號、價格） |
| motion | 對版、牌子掛上的輕微晃動；查證頁不放動態 |
| legibility_core | 內文、表單、價格數字 |
| 適合的版面 | 空間畫布 +2（街廓網格加門牌就是地圖）、帳簿索引 +2（路段列表即門牌索引）、橫向長卷 +1（沿著一條街走）、非對稱網格 +1 |
| 要避開 | 對角舞台 -1（門牌斜了就不可信）、樣板 -1（門牌被縮成 icon 方塊） |
| 適用產品 | 租屋、房地產、在地生活、物流與地址查詢 |

### 評級卡盒 Graded Slab（萃取自卡牌收藏產品）

壓克力評級盒、評級標籤、閃卡光澤、卡套格。

| 欄位 | 內容 |
|------|------|
| world_material | 壓克力評級盒、評級標籤、閃卡光澤、卡套格 |
| mark | encase（封裝） |
| shapes | 厚透明外框＋標籤條、63:88 卡片比例、卡套格網格、閃光斜帶 |
| angle_set | [0, -3] |
| palette_lock | `#EDEFF3` 壓克力、`#121B2F` 石墨墨、`#1B368F` 青金石、`#B4892B` 評級金 |
| selection_metaphor | 焦點列掃過一道閃卡光澤（hover 播放一次，reduced-motion 時靜態） |
| transition_verb | stamp：封裝蓋下 |
| typography | display：IBM Plex Sans Condensed 700＋思源黑體；body：思源黑體；meta：IBM Plex Mono（CERT 編號、等級、張數） |
| motion | 光澤掃過、封裝按壓；光澤只在 hover／傾斜時出現 |
| legibility_core | 內文、表單、張數與等級數字 |
| 適合的版面 | 標本陳列 +2（被封裝的標本）、卷宗疊紙 +2（一疊評級盒）、帳簿索引 +1、非對稱網格 +1、橫向長卷 +1（展示櫃） |
| 要避開 | 編輯刊物 -1、樣板 -1（評級標籤變成普通卡片） |
| 適用產品 | 收藏管理、二手交易、鑑定與保固、會員徽章 |

---

## 如何萃取新母題

最好的母題來自產品自己的世界，比從遊戲借材料更有理由，也不容易撞款。

### 步驟

1. **列出產品領域裡的實體物件**：使用者在真實世界會摸到、看到、填寫的東西。優先選「跟產品核心名詞直接對應」的那一個。
2. **填契約欄位**：world_material → mark → shapes → angle_set → palette_lock → selection_metaphor → transition_verb → typography → motion。每一項都要能回答「為什麼是這個」。
   - angle_set 決定自由感的上限。越需要信任的物件（門牌、證書），角度越少。
   - selection_metaphor 是招牌時刻，要是那個物件「被選中」時真的會發生的事（蓋章、撕下、打光）。
3. **檢查可讀核心與無障礙**：內文、表單、數字永遠不風格化；palette_lock 裡的強調色要有一個「文字用」的對比安全版本；選取不能只靠顏色；所有動態要有 reduced-motion 版本。
4. **用相容性矩陣找版面**：對 `composition-lab.html` 的 10 種版面語法各打一次 -2～+2 分並寫理由，挑 +2 的當主版面，-1 以下的只准當受控矛盾。

### 範例：門牌（社群租屋貼文查證服務）

| 步驟 | 判斷 |
|------|------|
| 實體物件 | 使用者從社群貼文進來查「某個地址」→ 路／段／巷／弄／號 → 門牌；租屋的另一個在地符號是出租紅紙 |
| 契約 | 門牌當標題與 kicker；紅紙當選取與行動；街廓網格當 L3 底紋；角度只給紅紙 |
| 可讀核心 | 查證是高信任場景：價格數字、P25–P75 區間、來源說明全部 L0–L1；門牌藍白字對比 > 7:1；紅紙是額外訊號，旁邊一定有文字 |
| 版面 | 空間畫布 +2（地圖頁）、帳簿索引 +2（區域與路段列表）；對角舞台 -1 排除 |

### 範例：評級卡盒（多遊戲 TCG 收藏管理）

| 步驟 | 判斷 |
|------|------|
| 實體物件 | 收藏者會用卡套、卡盒、評級盒；現有 UI 已有卡套格與 3D 卡盒，但沒用到評級盒與閃卡 |
| 契約 | 評級標籤當區段標題；卡況刻度做成標籤；Foil 卡在 hover 時掃過光澤；卡片比例固定 63:88 |
| 可讀核心 | 卡名、張數、卡況等級一律靜態可讀；光澤只是裝飾層，reduced-motion 時移除動畫 |
| 版面 | 標本陳列 +2（卡片詳情）、卷宗疊紙 +2（托盤中的一疊）；編輯刊物 -1 排除 |
