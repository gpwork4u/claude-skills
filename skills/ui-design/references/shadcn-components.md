# shadcn/ui 元件速查表

## 安裝與初始化

```bash
# 初始化（Next.js 專案）
npx shadcn@latest init

# 安裝單一元件
npx shadcn@latest add [component-name]

# 安裝多個元件
npx shadcn@latest add button card dialog input
```

## 元件分類

### 表單元件（Form）

| 元件 | 安裝指令 | 用途 |
|------|---------|------|
| Button | `npx shadcn@latest add button` | 按鈕，支援多種 variant |
| Input | `npx shadcn@latest add input` | 文字輸入框 |
| Textarea | `npx shadcn@latest add textarea` | 多行文字輸入 |
| Select | `npx shadcn@latest add select` | 下拉選擇 |
| Checkbox | `npx shadcn@latest add checkbox` | 核取方塊 |
| Radio Group | `npx shadcn@latest add radio-group` | 單選按鈕組 |
| Switch | `npx shadcn@latest add switch` | 開關切換 |
| Slider | `npx shadcn@latest add slider` | 滑桿 |
| Form | `npx shadcn@latest add form` | 表單驗證（react-hook-form + zod） |
| Label | `npx shadcn@latest add label` | 表單標籤 |
| Calendar | `npx shadcn@latest add calendar` | 日曆選擇器 |
| Date Picker | `npx shadcn@latest add date-picker` | 日期選擇器 |
| Combobox | `npx shadcn@latest add combobox` | 可搜尋下拉 |
| Toggle | `npx shadcn@latest add toggle` | 開關按鈕 |
| Toggle Group | `npx shadcn@latest add toggle-group` | 開關按鈕組 |

### 展示元件（Display）

| 元件 | 安裝指令 | 用途 |
|------|---------|------|
| Card | `npx shadcn@latest add card` | 卡片容器 |
| Table | `npx shadcn@latest add table` | 表格 |
| Badge | `npx shadcn@latest add badge` | 標記 |
| Avatar | `npx shadcn@latest add avatar` | 頭像 |
| Separator | `npx shadcn@latest add separator` | 分隔線 |
| Skeleton | `npx shadcn@latest add skeleton` | 載入骨架 |
| Progress | `npx shadcn@latest add progress` | 進度條 |
| Aspect Ratio | `npx shadcn@latest add aspect-ratio` | 固定比例容器 |
| Carousel | `npx shadcn@latest add carousel` | 輪播 |
| Chart | `npx shadcn@latest add chart` | 圖表（Recharts） |
| Collapsible | `npx shadcn@latest add collapsible` | 折疊區塊 |
| Resizable | `npx shadcn@latest add resizable` | 可調整大小面板 |

### 導覽元件（Navigation）

| 元件 | 安裝指令 | 用途 |
|------|---------|------|
| Navigation Menu | `npx shadcn@latest add navigation-menu` | 頂部導覽列 |
| Menubar | `npx shadcn@latest add menubar` | 選單列 |
| Tabs | `npx shadcn@latest add tabs` | 標籤頁 |
| Breadcrumb | `npx shadcn@latest add breadcrumb` | 麵包屑導覽 |
| Pagination | `npx shadcn@latest add pagination` | 分頁 |
| Sidebar | `npx shadcn@latest add sidebar` | 側邊欄 |

### 覆蓋元件（Overlay）

| 元件 | 安裝指令 | 用途 |
|------|---------|------|
| Dialog | `npx shadcn@latest add dialog` | 對話框 |
| Alert Dialog | `npx shadcn@latest add alert-dialog` | 警告對話框 |
| Sheet | `npx shadcn@latest add sheet` | 側邊彈出面板 |
| Drawer | `npx shadcn@latest add drawer` | 底部抽屜 |
| Popover | `npx shadcn@latest add popover` | 彈出框 |
| Tooltip | `npx shadcn@latest add tooltip` | 工具提示 |
| Hover Card | `npx shadcn@latest add hover-card` | 懸停卡片 |
| Context Menu | `npx shadcn@latest add context-menu` | 右鍵選單 |
| Dropdown Menu | `npx shadcn@latest add dropdown-menu` | 下拉選單 |
| Command | `npx shadcn@latest add command` | 命令面板（⌘K） |

### 回饋元件（Feedback）

| 元件 | 安裝指令 | 用途 |
|------|---------|------|
| Alert | `npx shadcn@latest add alert` | 提示訊息 |
| Toast / Sonner | `npx shadcn@latest add sonner` | 通知彈出 |

### 佈局元件（Layout）

| 元件 | 安裝指令 | 用途 |
|------|---------|------|
| Scroll Area | `npx shadcn@latest add scroll-area` | 自訂捲軸區域 |
| Accordion | `npx shadcn@latest add accordion` | 手風琴展開 |

## Button Variants 速查

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

## 主題 CSS 變數

```css
/* 亮色主題 */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
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

/* 暗色主題 */
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}
```

## cn() 工具函式

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
