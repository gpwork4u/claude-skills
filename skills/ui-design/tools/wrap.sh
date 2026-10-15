#!/bin/zsh
# 把 artifact 格式（沒有 doctype/head/body）的 demo 包成可本地開啟的完整 HTML。
# 用法：./wrap.sh <來源.html> <輸出.html>
{ echo '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>'; cat "$1"; echo '</body></html>'; } > "$2"
