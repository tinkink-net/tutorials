# 使用遠端儲存庫

## 簡介
遠端讓你協作、備份與部署。此教學涵蓋新增、檢視、同步、修剪 (prune) 與安全管理遠端分支。

## 關鍵概念
| 術語 | 含義 |
|------|------|
| Remote | 指向託管儲存庫的命名引用（如 `origin`） |
| Tracking branch | 與遠端分支關聯的本地分支（如 `main` 追蹤 `origin/main`） |
| Fetch | 下載物件 + 參考（不改工作目錄） |
| Pull | Fetch + 整合（merge 或 rebase） |
| Push | 上傳本地提交到遠端分支 |

## 列出遠端
```bash
git remote -v
```
輸出顯示 fetch/push URL。

## 新增遠端
```bash
git remote add origin https://github.com/example/app.git
git remote add upstream https://github.com/org/app.git
```

## 修改 URL
```bash
git remote set-url origin git@github.com:example/app.git
```

## 移除遠端
```bash
git remote remove upstream
```

## 擷取更新 (fetch)
```bash
git fetch
git fetch --all          # 全部遠端
git fetch origin main    # 指定分支
```

## 檢視遠端分支
```bash
git branch -r            # 僅遠端
git branch -a            # 本地 + 遠端
```

## 建立追蹤分支
```bash
git checkout -b feature/ui origin/feature/ui
# 或
git switch -c feature/ui --track origin/feature/ui
```

## 建立後設定上游
```bash
git branch --set-upstream-to=origin/main main
# 或首次推送
git push -u origin main
```

## Pull 策略
預設 pull 走 merge。許多團隊偏好 rebase：
```bash
git config --global pull.rebase true
```
或僅本倉：
```bash
git config pull.rebase true
```

## 安全更新模式
```bash
git fetch origin
git rebase origin/main   # 或依政策 merge
```

## 推送分支
```bash
git push origin feature/auth
```
刪除遠端分支：
```bash
git push origin --delete feature/auth
```

## 重新命名本地（與遠端）分支
```bash
git branch -m old-name new-name
git push origin :old-name new-name
git push origin -u new-name
```

## 修剪過時遠端引用
```bash
git remote prune origin
git fetch --prune
```

## 檢視遠端詳情
```bash
git remote show origin
```
顯示追蹤關係、過時分支、push/pull 設定。

## 多遠端工作流（Fork 模式）
```bash
git remote add upstream https://github.com/original/project.git
git fetch upstream
git rebase upstream/main
git push origin main
```

## 鏡像（管理）
```bash
git clone --mirror https://github.com/source/repo.git
cd repo.git
git push --mirror git@internal:backup/repo.git
```

## 驗證小技巧
- 優先 SSH 稳定
- 有 2FA 的 HTTPS 用 personal access token
- 快取憑證：`git config --global credential.helper cache`

## 常見問題
| 問題 | 原因 | 解法 |
|------|------|------|
| 推送被拒（non-fast-forward） | 遠端有新提交 | `git pull --rebase` 後再 push |
| 驗證失敗 | token / key 無效 | 重新產生憑證 |
| Detached HEAD 編輯 | 直接檢出遠端引用 | 建分支：`git switch -c fix upstream/main` |
| 追蹤分支殘留 | 遠端已刪除 | `git fetch --prune` |

## 最佳實務
1. 一致遠端命名 (`origin`, `upstream`)
2. 啟用 prune 減少雜訊
3. 避免 force-push 共享分支
4. 保護 `main`（平台規則）
5. 定期輪換 token / SSH key

## 總結
掌握遠端提升協作效率。有意識 fetch，根據策略 pull，定期修剪並保持上游整潔。

## 下一步
- 程式碼評審工作流（`pull-requests-and-code-review-workflow.md`）
- 衝突處理（`git-conflict-resolution-strategies.md`）

---
**關鍵指令**
```bash
git remote -v
git fetch --all --prune
git push origin <branch>
git remote show origin
git remote prune origin
```
