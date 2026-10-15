# 實作流程（shadcn/ui）

藝術方向（見 `style-genome.md`）確定後，依以下三階段實作。

拆元件清單時對照 `component-patterns.md` 的 60 項元件檢查表；
動效規格對照 `motion-patterns.md`；logo/品牌標記對照 `logo-symbols.md`。

---

## 核心原則

- **Components First**：先建立獨立元件，再組合成頁面
- **Preview Before Layout**：元件完成後先整理成 HTML 預覽檔，確認視覺正確性
- **shadcn/ui 優先**：所有 UI 元件優先使用 shadcn/ui 開源元件庫

---

## 第一階段：Component 元件建立

### 1.1 需求分析

在開始撰寫任何程式碼之前，必須先：

1. **拆解頁面結構**：將設計需求拆分為獨立的 UI 元件
2. **識別 shadcn/ui 元件**：確認哪些需求可直接使用 shadcn/ui 元件
3. **識別自訂元件**：確認哪些需求需要自訂元件
4. **列出元件清單**：產出完整的元件依賴樹

```
範例元件清單：
├── Header（自訂）
│   ├── Logo（自訂）
│   ├── NavigationMenu（shadcn/ui）
│   └── Button（shadcn/ui）
├── HeroSection（自訂）
│   ├── Badge（shadcn/ui）
│   └── Card（shadcn/ui）
├── Sidebar（自訂）
│   ├── ScrollArea（shadcn/ui）
│   └── Accordion（shadcn/ui）
└── Footer（自訂）
```

### 1.2 shadcn/ui 元件使用規範

#### 安裝方式

```bash
# 初始化 shadcn/ui（如尚未初始化）
npx shadcn@latest init

# 安裝所需元件
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
# ...依需求安裝
```

#### 常用元件對照表

| 需求場景 | shadcn/ui 元件 | 說明 |
|---------|---------------|------|
| 按鈕操作 | `Button` | 支援 variant: default, destructive, outline, secondary, ghost, link |
| 卡片容器 | `Card`, `CardHeader`, `CardContent`, `CardFooter` | 內容區塊容器 |
| 對話框 | `Dialog`, `AlertDialog` | 彈出式互動 |
| 表單輸入 | `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup` | 表單元素 |
| 導覽列 | `NavigationMenu`, `Menubar` | 頁面導覽 |
| 資料表格 | `Table`, `DataTable` | 結構化資料展示 |
| 標籤頁 | `Tabs` | 內容分頁 |
| 側邊欄 | `Sheet`, `Sidebar` | 側邊面板 |
| 通知提示 | `Toast`, `Sonner` | 操作回饋 |
| 下拉選單 | `DropdownMenu`, `Command` | 選項操作 |
| 骨架屏 | `Skeleton` | 載入狀態 |
| 頭像 | `Avatar` | 使用者頭像 |
| 標記 | `Badge` | 狀態標記 |
| 分隔線 | `Separator` | 內容分隔 |
| 工具提示 | `Tooltip` | hover 提示 |
| 日曆 | `Calendar`, `DatePicker` | 日期選擇 |
| 圖表 | `Chart` (基於 Recharts) | 資料視覺化 |

#### 元件撰寫規範

```tsx
// ✅ 正確：從 shadcn/ui 匯入元件
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// ✅ 正確：使用 cn() 合併 className
import { cn } from '@/lib/utils'

// ✅ 正確：自訂元件包裝 shadcn/ui
export function FeatureCard({ title, description, icon, className }) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// ❌ 錯誤：不要重新造輪子
// 不要自己寫 Button、Dialog 等 shadcn/ui 已提供的元件
```

### 1.3 自訂元件規範

- 檔案位置：`components/` 目錄下，依功能分類
- 命名規則：PascalCase，語義化命名
- 樣式方案：Tailwind CSS + shadcn/ui 的 CSS 變數
- 每個元件必須是獨立、可複用的單元

```
components/
├── ui/              # shadcn/ui 元件（自動生成）
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── layout/          # 布局元件
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
├── features/        # 功能元件
│   ├── FeatureCard.tsx
│   ├── PricingTable.tsx
│   └── TestimonialSlider.tsx
└── shared/          # 共用元件
    ├── Logo.tsx
    ├── ThemeToggle.tsx
    └── SearchBar.tsx
```

---

## 第二階段：HTML 預覽檔整理

### 2.1 建立預覽檔

在所有元件建立完成後，**必須**先產出一個獨立的 HTML 預覽檔，用於檢視所有元件的視覺呈現。

預覽檔命名規則：`preview-[功能名稱].html`

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>UI Component Preview - [功能名稱]</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- 自訂 shadcn/ui 主題變數 -->
  <style>
    :root {
      --background: 0 0% 100%;
      --foreground: 240 10% 3.9%;
      --card: 0 0% 100%;
      --card-foreground: 240 10% 3.9%;
      --primary: 240 5.9% 10%;
      --primary-foreground: 0 0% 98%;
      --secondary: 240 4.8% 95.9%;
      --secondary-foreground: 240 5.9% 10%;
      --muted: 240 4.8% 95.9%;
      --muted-foreground: 240 3.8% 46.1%;
      --accent: 240 4.8% 95.9%;
      --accent-foreground: 240 5.9% 10%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 0 0% 98%;
      --border: 240 5.9% 90%;
      --input: 240 5.9% 90%;
      --ring: 240 5.9% 10%;
      --radius: 0.5rem;
    }
  </style>
</head>
<body class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-8">

  <h1 class="text-3xl font-bold mb-8 border-b pb-4">Component Preview</h1>

  <!-- 每個元件一個區塊 -->
  <section class="mb-12">
    <h2 class="text-xl font-semibold mb-4 text-[hsl(var(--muted-foreground))]">
      元件名稱
    </h2>
    <div class="border rounded-lg p-6">
      <!-- 元件 HTML 預覽 -->
    </div>
  </section>

  <!-- 依序排列所有元件... -->

</body>
</html>
```

### 2.2 預覽檔檢查清單

在進入第三階段前，確認：

- [ ] 所有元件都已在預覽檔中展示
- [ ] 元件在不同狀態下的外觀（default, hover, active, disabled）
- [ ] 顏色、字體、間距符合設計規範
- [ ] 響應式斷點表現正確（mobile / tablet / desktop）
- [ ] 元件之間的視覺一致性

---

## 第三階段：頁面 Layout 設計

### 3.1 Layout 組合規範

確認元件預覽無誤後，才開始進行頁面 layout 組裝：

```tsx
// 頁面 layout 範例
export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 頂部導覽 */}
      <Header />

      <div className="flex flex-1">
        {/* 側邊欄 */}
        <Sidebar />

        {/* 主內容區 */}
        <main className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
          </div>
        </main>
      </div>

      {/* 底部 */}
      <Footer />
    </div>
  )
}
```

### 3.2 Layout 設計原則

#### 響應式斷點（Tailwind CSS）

| 斷點 | 寬度 | 用途 |
|------|------|------|
| `sm` | 640px | 手機橫向 |
| `md` | 768px | 平板 |
| `lg` | 1024px | 小螢幕桌面 |
| `xl` | 1280px | 標準桌面 |
| `2xl` | 1536px | 大螢幕 |

#### 常用 Layout 模式

```tsx
// 聖杯布局（Header + Sidebar + Content + Footer）
<div className="min-h-screen flex flex-col">
  <Header />
  <div className="flex flex-1">
    <aside className="hidden md:block w-64 border-r" />
    <main className="flex-1" />
  </div>
  <Footer />
</div>

// Dashboard 布局（使用 shadcn/ui Sidebar）
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

<SidebarProvider>
  <AppSidebar />
  <main>
    <SidebarTrigger />
    {children}
  </main>
</SidebarProvider>

// 內容居中布局
<div className="container mx-auto max-w-4xl px-4 py-8">
  {children}
</div>
```

#### 間距系統

使用 Tailwind CSS 的 spacing scale 保持一致性：

- 元件內部間距：`p-4` 至 `p-6`
- 元件之間間距：`gap-4` 至 `gap-8`
- 區段之間間距：`space-y-8` 至 `space-y-16`
- 頁面邊距：`px-4 md:px-6 lg:px-8`

---

## 工作流程摘要

```
需求分析
  │
  ▼
┌─────────────────────────────┐
│  第一階段：建立 Components   │
│  1. 拆解元件清單             │
│  2. 安裝 shadcn/ui 元件      │
│  3. 撰寫自訂元件             │
│  4. 每個元件獨立可運作        │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  第二階段：HTML 預覽檔       │
│  1. 整理所有元件到 HTML 檔   │
│  2. 檢視視覺呈現             │
│  3. 確認一致性與正確性        │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  第三階段：Layout 組裝       │
│  1. 建立頁面結構             │
│  2. 組合元件到 layout        │
│  3. 加入響應式設計            │
│  4. 微調間距與視覺層次        │
└─────────────────────────────┘
```

**重要**：嚴禁跳過任何階段。每個階段完成後，必須向使用者確認再進入下一階段。

---

## 技術棧偏好

| 類別 | 技術 |
|------|------|
| UI 元件庫 | shadcn/ui |
| CSS 框架 | Tailwind CSS |
| 圖示 | Lucide React |
| 動畫 | Tailwind CSS animations / Framer Motion（規格見 `motion-patterns.md`） |
| 主題 | shadcn/ui CSS 變數系統（支援 dark mode） |
| 工具函式 | `cn()` from `@/lib/utils`（clsx + tailwind-merge） |
