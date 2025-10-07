# 合併分支與解決衝突

## 簡介
分支讓你隔離工作；合併將這些工作重新匯合。此教學展示如何安全合併、理解不同合併策略，並在 Git 需要你協助時自信處理衝突。

## 前置需求
- 熟悉基本工作流（`add`, `commit`, `push`）
- 已建立與切換分支（參見 `creating-and-switching-branches.md`）
- 基本理解提交歷史與 `git log`

## 學習目標
結束時你將能：
1. 將功能分支合併進主線分支
2. 在 fast-forward 與非 fast-forward 合併間選擇
3. 偵測、檢視並解決合併衝突
4. 終止或重新開始問題合併
5. 採用最佳實務降低衝突頻率

## 合併的心智模型
一次合併會建立一個擁有**兩個父提交**的新提交（要結合的兩個分支 tip），除非 Git 可以做 **fast-forward**。Git 執行 **三方合併**，使用：
```
BASE (merge base)  ← 共同祖先
HEAD (當前分支)
OTHER (被合入的分支)
```
Git 比較差異 (BASE→HEAD) 與 (BASE→OTHER)，若不重疊同時套用；重疊部分成為衝突。

## Fast-Forward vs Merge Commit
| 情境 | 結果 | 何時 | 優點 | 缺點 |
|------|------|------|------|------|
| Fast-forward | 指標前移 | 目標分支純粹領先 | 線性歷史 | 遺失分支邊界語意 |
| Merge commit | 生成 2 父的提交 | 歷史分叉 | 保留整合點 | 額外提交；可能噪音 |

### 強制建立 Merge Commit
```bash
git merge --no-ff feature/login
```
即使可 fast-forward 仍記錄整合提交（方便分組相關更改）。

## 基本合併流程
```bash
# 1. 更新 main
git checkout main
git pull origin main

# 2. 合併功能分支
git merge feature/login

# 3. 推送結果
git push origin main
```

## 檢視將要合併的內容
```bash
# 顯示將被合併的提交
git log --oneline main..feature/login

# 合併預覽（不提交）
git merge --no-commit --no-ff feature/login
# 若不繼續
git merge --abort
```

## 典型衝突情境
兩個分支修改 `config/app.json` 同行。
```bash
git checkout main
git merge feature/rate-limit
# Auto-merging config/app.json
# CONFLICT (content): Merge conflict in config/app.json
# Automatic merge failed; fix conflicts and commit the result.
```

### 衝突標記
檔案中：
```
<<<<<<< HEAD
"rateLimit": 200,
=======
"rateLimit": 500,
>>>>>>> feature/rate-limit
```
選擇 / 合併想要的值並移除標記。

### 檢視衝突
```bash
git status                # 列出未合併路徑
git diff                  # 顯示衝突區塊
git diff --name-only --diff-filter=U  # 只列衝突檔
```

### 編輯後
```bash
git add config/app.json
git commit          # 使用合併模板訊息
```
或自訂訊息：
```bash
git commit -m "Merge feature/rate-limit into main: adjust limit to 300"
```

## 終止合併
尚未提交且覺得不對：
```bash
git merge --abort
```
回復到合併前狀態。

## 策略與選項
| 選項 | 用途 |
|------|------|
| `--no-ff` | 強制建立 merge commit |
| `--squash` | 僅套用更改，不建立 merge commit |
| `--commit` / `--no-commit` | 自動提交或暫停 |
| `--abort` | 衝突未提交時還原 |
| `-X ours` | 衝突偏向當前分支 |
| `-X theirs` | 衝突偏向合入分支 |

### Squash 合併
```bash
git checkout main
git merge --squash feature/search
git commit -m "Add search functionality"
```
Squash 保持 main 精簡但失去細粒度歷史。

## 視覺化合併
```bash
git log --graph --oneline --decorate
```

## 進階衝突工具
```bash
git mergetool
git config merge.tool code
git config mergetool.code.cmd 'code --wait --merge $REMOTE $LOCAL $BASE $MERGED'
```

## 預防衝突
1. 長生命分支需頻繁 pull / rebase
2. 保持功能分支小且聚焦
3. 不把格式化與邏輯混在同一批提交
4. 對共享檔案維持統一排序 / lint
5. 早期溝通大型重構

## 處理二進制衝突
```bash
git checkout --ours  path/to/asset.png
git checkout --theirs path/to/asset.png
git add path/to/asset.png
```
選擇其一。

## 常見陷阱
| 問題 | 原因 | 解法 |
|------|------|------|
| 重複衝突 | 分支長期分離 | 更早 rebase 或整合 |
| 大量衝突 | 格式 + 邏輯混雜 | 先分離格式提交 |
| 意外 merge commit | 策略禁 fast-forward | 用 `git pull --ff-only` 或檢查 hooks |
| 遺失更改 | 未暫存即 checkout 覆蓋 | 用 `git reflog` 回復 |

## 合併前檢查清單
- [ ] CI 綠燈
- [ ] 已完成 code review（若需要）
- [ ] 分支已更新（rebase 或 merge 最新 main）
- [ ] 無除錯/機密
- [ ] 提交訊息整潔

## 總結
合併整合分歧歷史。理解類型、審視將入提交、精準處理衝突、用清楚訊息提交。良好衛生降低摩擦。

## 下一步
- Rebase vs merge（`git-rebase-vs-merge-when-to-use-each.md`）
- 結構化衝突策略（`git-conflict-resolution-strategies.md`）

---
**關鍵指令速覽**
```bash
git merge <branch>
git merge --no-ff <branch>
git merge --squash <branch>
git merge --abort
git diff --name-only --diff-filter=U
git log --graph --oneline --decorate
```
