# Git Rebase 與 Merge：何時使用

## 簡介
`merge` 與 `rebase` 都是將一個分支的變更整合到另一個，但方式不同。理解差異可維持清晰、可導航的歷史，並降低整合痛點。

## 核心差異
| 操作 | 行為 | 歷史形狀 | 提交 ID | 典型用途 |
|------|------|----------|---------|----------|
| Merge | 建立合併提交連接兩條歷史 | 非線性（圖狀） | 保留 | 整合完成的功能分支 |
| Rebase | 在另一分支頂端重放提交 | 線性 | 重寫（新 ID） | 合併前更新功能分支 |

## 視覺模型
初始分叉：
```
     A---B  (feature)
    /
---o---C---D (main)
```
Merge 結果：
```
---o---C---D----M (main)
        \   /
         A-B
```
Rebase 結果：
```
---o---C---D---A'---B' (feature)
```

## 優缺點
### Merge
優點：
- 保留真實上下文
- 安全（不重寫已分享提交）
- 顯示整合節點

缺點：
- 圖形可能雜亂
- 頻繁合併膨脹歷史

### Rebase
優點：
- 線性乾淨
- `git bisect` 更容易
- 開發故事連貫

缺點：
- 重寫雜湊
- 對共享分支有風險
- 長鏈衝突需重複處理

## 安全 Rebase 規則
1. 不要 rebase 已分享的提交（除非協調）
2. 開 PR 前本地使用 rebase 同步 `main`
3. 評審開始後避免再 rebase（會迫使重新 diff）

## 更新功能分支（推薦）
```bash
git checkout feature/api-auth
git fetch origin
git rebase origin/main
# 逐步解決衝突
git push --force-with-lease
```
`--force-with-lease` 防止意外覆寫他人工作。

## 互動式 Rebase 清理
```bash
git rebase -i HEAD~6
```
動作：`pick` 保留、`squash` 合併、`fixup` 無訊息合併、`reword` 改訊息、`edit` 暫停修改。

### 範例
前：
```
Add API skeleton
Fix route bug
Add logging
Fix logging typo
```
後：
```
Add API skeleton with logging
```

## 何時選 Merge
- 整合完成功能分支
- 保留大型協作上下文
- 發佈 / release 分支合併
- 需審計整合順序

## 何時選 Rebase
- 用最新 `main` 刷新功能分支
- 分享前清理歷史
- 壓縮探索性雜亂提交
- 小型倉庫避免無謂 merge commit

## 混合工作流
1. 在 `feature/*` 開發
2. 定期 `git fetch && git rebase origin/main`
3. 開 PR
4. 用 `--no-ff` merge 記錄整合點

## Rebase 衝突處理
```bash
# 修正檔案
git add <file>
git rebase --continue
```
其它：
```bash
git rebase --skip
git rebase --abort
```

## 線性化含大量 merge 的歷史
```bash
git checkout feature
git rebase --rebase-merges origin/main
```
保留拓撲結構盡量線性化。

## 黃金法則
未經所有受影響協作者同意，不要 rebase 公開提交。不確定就用 merge。

## 決策表
| 目標 | 首選 | 理由 |
|------|------|------|
| 保留整合上下文 | Merge | 顯示分支落點 |
| 線性可讀歷史 | Rebase | 簡化導航 |
| 清理訊息 | 互動式 Rebase | 合理重組 |
| PR 前準備 | Rebase onto main | 避免 merge 噪音 |
| 緊急可回退 | Merge | 保留細節 |

## 總結
Rebase 與 merge 互補：開發中用 rebase 保持更新；整合時用 merge 記錄事件。刻意選擇。

## 下一步
- 衝突技巧（`git-conflict-resolution-strategies.md`）
- 撤銷操作（`git-reset-revert-and-checkout-explained.md`）

---
**關鍵指令**
```bash
git rebase origin/main
git rebase -i HEAD~N
git merge <branch>
git push --force-with-lease
```
