# 在 Git 中建立與切換分支

Branch 是 Git 的超能力。它讓你可以建立隔離的開發線，進行實驗、修 bug、開發功能而不破壞主程式碼的穩定性。熟練建立與切換分支是有效 Git 工作流的基礎。

---
## 1. 為什麼存在分支（心智模型）
把 `main`（或 `master`）想成已發佈的專案歷史。分支只是指向一個 commit 的可移動指標。建立新分支時，你是在說：「從這個歷史點開始，我要開一條新的工作線。」沒有複製內容；Git 只是建立一個輕量參考。

關鍵概念：
- 分支指向一個 commit。
- `HEAD` 告訴你目前「在」哪個分支（或 commit）。
- 在分支上 commit，分支指標前進。

因為分支成本低，你應該大量使用：每個功能、每個修復、每次實驗都獨立分支。

---
## 2. 列出並理解現有分支
查看本地分支：
```
$ git branch
```
當前分支會有星號。查看本地 + 遠端：
```
$ git branch -a
```
查看每個分支指向與最後提交：
```
$ git branch -v
```
清理失效的遠端追蹤分支（遠端已刪除的）：
```
$ git fetch --prune
```

---
## 3. 建立新分支
通常從最新的另一分支（常為 `main`）建立。先更新：
```
$ git checkout main
$ git pull origin main
```
建立分支：
```
$ git branch feature/login-form
```
這只建立不切換。建立並立即切換（推薦）：
```
$ git switch -c feature/login-form
```
舊語法（仍可）：
```
$ git checkout -b feature/login-form
```
命名慣例：
- `feature/<name>` 新功能
- `bugfix/<ticket-id>` 修 bug
- `hotfix/<critical>` 緊急線上修補
- 亦可 `chore/…`, `refactor/…` 等

避免空白、大寫、模糊名稱如 `new`、`temp`。

---
## 4. 切換分支
切到既有分支：
```
$ git switch feature/login-form
```
或舊寫法：
```
$ git checkout feature/login-form
```
若未提交的變更會被覆蓋，Git 會拒絕。選項：
- 先 commit。
- stash (`git stash push -m "WIP"`)。
- 丟棄 (`git restore .`)。

快速回到上一分支：
```
$ git switch -
```

### Detached HEAD 狀態
檢出特定 commit（非分支）：
```
$ git checkout 4f2a9c1
```
進入「detached HEAD」。你可瀏覽、建置、測試；但若不建分支就 commit，之後可能難尋。保留工作：
```
$ git switch -c experiment/performance-tuning
```

---
## 5. 保持分支更新
功能分支開發期間，`main` 可能有新提交。整合：
```
$ git switch feature/login-form
$ git fetch origin
$ git merge origin/main
```
這會產生 merge commit（若需要）。若想線性歷史且分支僅你使用：
```
$ git fetch origin
$ git rebase origin/main
```
Rebase 會把你的提交重放在最新 `main` 之上。不要 rebase 他人也在用的共享分支，它會改變提交雜湊。

---
## 6. 推送分支到遠端
分支本地存在，直到推送：
```
$ git push -u origin feature/login-form
```
`-u` 設定 upstream，之後 `git push` / `git pull` 可直接用。

列出追蹤關係：
```
$ git branch -vv
```

---
## 7. 重新命名分支
若名稱不清晰或需求改變：
### 當前就在該本地分支：
```
$ git branch -m feature/login-form feature/auth-ui
```
若已推送，需要刪除遠端舊名稱並推新：
```
$ git push origin :feature/login-form
$ git push -u origin feature/auth-ui
```
部分平台有「rename」功能並自動轉向，若可用就使用。

---
## 8. 刪除分支
合併後（且確認不再需要）：
本地刪除：
```
$ git branch -d feature/login-form
```
`-d` 安全；未合併會拒絕。強制（危險）：
```
$ git branch -D feature/login-form
```
遠端刪除：
```
$ git push origin :feature/login-form
```
或較新語法：
```
$ git push origin --delete feature/login-form
```
清理可降低認知負擔。

---
## 9. 常見工作流（功能分支）
1. 更新 main：`git switch main && git pull`。
2. 建立分支：`git switch -c feature/report-export`。
3. 開發 + 有意義訊息頻繁 commit。
4. 定期 rebase 或 merge `origin/main` 保持同步。
5. 推送：`git push -u origin feature/report-export`。
6. 開 PR / MR。
7. 合併後刪除本地 + 遠端分支。

此循環讓歷史按目的分段，提升評審聚焦。

---
## 10. 疑難排解場景
| 情況 | 原因 | 解決 |
|------|------|------|
| 無法切換 | 未提交衝突變更 | Commit、stash 或 restore |
| Detached HEAD 警告 | 檢出了 commit 而非分支 | 用 `git switch -c new-branch` 建分支 |
| Clone 後少分支 | 只取預設分支 | `git fetch --all` 然後 `git switch branch-name` |
| Push 被拒（non-fast-forward） | 遠端已前進 | `git pull --rebase` 後再推 |
| 誤刪分支 | 無引用 | 用 `git reflog` -> `git branch recovered <commit>` |

---
## 11. 策略性使用分支
分支不只功能：
- 原型試驗
- 從 release tag 衍生 hotfix
- 長期整合分支（謹慎：可考慮 trunk + feature flags）
- 文件或基礎設施變更

盡量讓功能分支短命。存活越久，合併越難。

---
## 12. 練習
1. Clone 或 init 一個 repo。
2. 建立 `feature/colors` 分支並新增檔案。
3. 兩次有意義 commit。
4. 在 main 增不相關提交後將其 rebase。
5. 重命名為 `feature/theme-colors`。
6. 推送並開 PR。
7. 合併並刪除分支（本地與遠端）。

反思：哪些步驟慢？用 alias 或 script 自動化（例如 `gco`, `gpl`, `gpsup`）。

---
## 13. 重點
- 建立分支即時——廣泛、細分使用。
- `switch` 是現代更清晰的切換命令。
- 主動更新分支降低合併摩擦。
- 合併後清理維持整潔。
- 探索性工作前先建分支。

掌握分支為進階工作流（rebase、互動式歷史編輯、多分支發布策略）奠基。
