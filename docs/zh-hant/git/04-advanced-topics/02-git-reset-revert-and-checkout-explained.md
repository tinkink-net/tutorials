# Git Reset、Revert 與 Checkout 解析

## 簡介
當你需要**撤銷**某些操作時，選對指令可避免資料遺失並維持歷史完整。本指南對比 `reset`, `revert`, `checkout`（以及 `restore` / `switch`）。

## 快速比較
| 指令 | 範圍 | 重寫歷史？ | 常見用途 |
|------|------|-----------|----------|
| reset | 移動分支參考 / 暫存區 | 是（非公開） | 重做本地提交 |
| revert | 新提交抵銷舊提交 | 否 | 公共撤銷 |
| checkout (file) | 還原工作區檔案 | 否 | 丟棄本地變更 |
| checkout (branch) | 切換 HEAD | 否 | 分支切換 |
| restore | 現代文件還原 | 否 | 更安全的檔操作 |
| switch | 現代分支切換 | 否 | 語意清楚 |

## Reset 模式
```bash
git reset --soft HEAD~1   # 保留變更並維持暫存
git reset --mixed HEAD~1  # 預設：取消暫存，保留工作區
git reset --hard HEAD~1   # 丟棄全部（危險）
```

### 用例
- Soft：合併最後兩次提交（隨後 amend）
- Mixed：重組提交內容與暫存
- Hard：拋棄本地實驗提交

## 移動分支指標
```bash
git reset --hard <commit>
```
若已 push 請避免；用 `revert`。

## 修補最後提交
```bash
git commit --amend -m "Refine API error handling"
```
若已 push 需協調。

## Revert（安全公開撤銷）
```bash
git revert <commit>
git revert <old>..<new>
```
建立反向補丁提交，保留歷史。

### 撤銷合併提交
```bash
git revert -m 1 <merge-hash>
```
`-m 1` 指定主線父。

## 丟棄本地檔案變更
舊式：
```bash
git checkout -- path/file.txt
```
現代：
```bash
git restore path/file.txt
git restore --staged path/file.txt
```

## 切換分支（現代）
```bash
git switch main
git switch -c feature/new-dashboard
```

## 找回遺失提交
```bash
git reflog
git checkout <lost-hash>
```
再建分支：
```bash
git switch -c recovery/<topic>
```

## 合併提交（互動 rebase）
```bash
git rebase -i HEAD~5
```
分享前重寫歷史。

## 決策指南
| 情境 | 使用 |
|------|------|
| 撤銷最近 2 次本地提交 | `git reset --soft HEAD~2` + amend |
| 公開提交撤銷 | `git revert <hash>` |
| 丟棄未暫存修改 | `git restore <file>` |
| 取消暫存 | `git restore --staged <file>` |
| 回到已知良好狀態（本地） | `git reset --hard <hash>` |
| 瀏覽舊提交 | `git checkout <hash>` (detached) |

## 安全提示
1. 不確定時避免 `--hard`（可先 stash）
2. 已分享內容選 revert
3. 用分支當安全網
4. 熟悉 `reflog`

## 總結
選擇最不破壞的工具達成目的。Reset 重寫；Revert 記錄校正意圖；Checkout/Restore 操作工作區。

## 下一步
- 暫存改動（`git-stash-and-temporary-changes.md`）
- 自動化（`git-hooks-and-automation.md`）

---
**關鍵指令**
```bash
git reset --soft|--mixed|--hard <ref>
git revert <commit>
git restore [--staged] <file>
git reflog
```
