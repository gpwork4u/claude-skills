# claude-skills

通用的 [Claude Code](https://code.claude.com) skills。每個 skill 都可以單獨安裝。

General-purpose Claude Code skills. Each skill installs on its own.

| Skill | 內容 |
|---|---|
| [`ui-design`](skills/ui-design/SKILL.md) | UI 設計工作流程：style genome 藝術方向、版面組合法（版面語法 × 材料 × 表現力預算 × 種子）、風格化表現（母題 × L0–L4）、動態語法，到 shadcn/ui 元件實作 |

---

## 安裝

### 方法 A：Plugin（建議）

在 Claude Code 裡：

```text
/plugin marketplace add gpwork4u/claude-skills
/plugin install ui-design@gpwork4u-skills
```

或在 shell：

```bash
claude plugin marketplace add gpwork4u/claude-skills
claude plugin install ui-design@gpwork4u-skills --scope user
```

用 plugin 安裝時，skill 會以 `/ui-design:ui-design` 呼叫；平常描述 UI 設計需求時也會自動觸發。要更新就重新執行 `/plugin` 裡的更新。

### 方法 B：直接放進 skills 目錄

不想用 plugin 的話，把資料夾放進全域或專案的 skills 目錄即可，呼叫名稱是 `/ui-design`：

```bash
git clone https://github.com/gpwork4u/claude-skills.git
# 全域（所有專案都能用）
ln -s "$PWD/claude-skills/skills/ui-design" ~/.claude/skills/ui-design
# 或只裝到某個專案
mkdir -p .claude/skills && cp -R claude-skills/skills/ui-design .claude/skills/
```

用 `ln -s` 的話，之後 `git pull` 就會更新。

---

## ui-design 裡有什麼

```text
skills/ui-design/
├── SKILL.md                    工作流程：藝術方向 → 元件 → HTML 預覽 → 版面
├── references/
│   ├── style-genome.md         archetype、設計維度、相容性評分、cliché 偵測、StyleGenome 契約
│   ├── composition-grammar.md  五個正交軸、10 種版面語法、相容性矩陣、種子變異
│   ├── expressive-ui.md        母題語法、表現力等級 L0–L4、可讀核心、無障礙規則
│   ├── motif-library.md        15 個母題契約，以及如何從產品世界萃取新母題
│   ├── expressive-recipes.md   母題的 CSS / SVG 片段與踩坑清單
│   ├── motion-dynamics.md      動態七軸、能量三檔、彈簧轉 linear()、18 個互動模式
│   ├── motion-patterns.md      動效語彙與視覺語言對照
│   ├── logo-symbols.md         Logo / 符號語彙
│   ├── component-patterns.md   元件正規命名與 design system 索引
│   ├── shadcn-components.md    shadcn/ui 元件清單
│   └── implementation-shadcn.md 三階段實作細則
├── examples/                   三個可互動的實驗室（單一 HTML 檔）
│   ├── composition-lab.html    版面組合實驗室
│   ├── expressive-ui-lab.html  表現力 UI 實驗室
│   └── dynamic-ui-lab.html     動態 UI 實驗室
└── tools/                      headless Chrome 驗證工具（Node 22+）
```

### 在瀏覽器打開實驗室

`examples/` 裡的 HTML 沒有 `<html>`／`<head>` 外殼，先用 `tools/wrap.sh` 包成完整頁面再打開：

```bash
cd skills/ui-design
./tools/wrap.sh examples/composition-lab.html /tmp/composition-lab.html
open /tmp/composition-lab.html
```

---

## License

MIT
