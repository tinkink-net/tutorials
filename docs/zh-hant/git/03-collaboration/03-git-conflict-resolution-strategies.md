# Git 衝突解決策略

## 簡介
衝突在協作開發中無可避免。本指南超越基礎——提供模式、決策框架與工具技巧，幫助你高效且安全地解決衝突。

## 衝突類型
| 類型 | 範例 | 成因 |
|------|------|------|
| Content | 同行被編輯 | 平行修改 |
| Add/Delete | 一端刪除、一端修改 | 分叉重構 |
| Rename/Edit | 檔案被改名也被編輯 | 大變動不同步 |
| Binary | 圖片雙方皆改 | 非逐行可合併格式 |
| Directory/File | 目錄變檔案或反之 | 結構調整 |

## 通用解決流程
```
偵測 → 分類 → 明確意圖 → 編輯/擇優 → 測試 → 提交
```

## 快速檢視衝突
```bash
git status
git diff --name-only --diff-filter=U
git diff --merge
```

## 選擇 Ours / Theirs
```bash
# 保留本分支版本
git checkout --ours path/file.txt
# 保留合入分支版本
git checkout --theirs path/file.txt
git add path/file.txt
```
謹慎使用以確保語意正確。

## 結構化手動合併步驟
1. 完整閱讀雙方意圖
2. 判斷目的（業務邏輯 / 格式 / 熱修）
3. 重建期望組合行為
4. 移除衝突標記並跑測試
5. `git add` 繼續

## 事前使用 `git add -p` 降低衝突
```bash
git add -p
```
細顆粒提交降低後續衝突面。

## 長生命分支的戰略 rebase
```bash
git fetch origin
git rebase origin/main
```

## 工具
| 工具 | 指令 | 備註 |
|------|------|------|
| VS Code | 內建 merge editor | 並排清晰 |
| Meld | `git mergetool` | 視覺 diff/merge |
| Beyond Compare | `git mergetool` 設定 | 商業軟體 |
| IntelliJ | 自動分組衝突 | IDE 整合 |

## 衝突標記示例
```
<<<<<<< HEAD (current: main)
applyDiscount(cart, 0.10)
=======
applyDiscount(cart, discountRate())
>>>>>>> feature/dynamic-discount
```
決策：保留動態並備援預設。
結果：
```js
applyDiscount(cart, discountRate() ?? 0.10)
```

## 二進制衝突
```bash
git checkout --theirs assets/logo.png
git add assets/logo.png
```
或重建資產。

## 中止 / 繼續
```bash
git merge --abort
git rebase --abort
git rebase --continue
```

## Rerere（重用已記錄解決）
```bash
git config --global rerere.enabled true
```
重複衝突時自動套用。

## 預防技巧
| 技術 | 好處 |
|------|------|
| 統一格式工具 | 排除風格噪音 |
| 小型 PR | 降低重疊 |
| 早同步分支 | 減少分叉距離 |
| 架構溝通 | 避免重工 |
| Feature flags | 未完成功能可早合併 |

## 回歸安全網
```bash
./run-tests.sh
git diff --check
```

## 錯誤解決的復原
```bash
git reflog
git reset --hard <hash>
```

## 總結
衝突代表平行創新而非失敗。系統化處理 + 主動衛生 + 適當工具，讓它僅是小阻力。

## 下一步
- 撤銷操作（`git-reset-revert-and-checkout-explained.md`）
- 暫存改動（`git-stash-and-temporary-changes.md`）

---
**關鍵指令**
```bash
git diff --name-only --diff-filter=U
git checkout --ours <file>
git checkout --theirs <file>
git merge --abort
git rebase --continue
```
