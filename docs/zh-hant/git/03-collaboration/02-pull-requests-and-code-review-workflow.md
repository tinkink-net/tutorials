# Pull Request 與程式碼評審工作流

## 簡介
Pull Request (PR) 形式化整合：打包變更、呈現 diff、觸發自動化並促進同儕回饋。本教學提供平台無關的端到端流程（GitHub/GitLab/Bitbucket 概念雷同）。

## 為何使用 PR？
- 品質閘（測試、lint、安全掃描）
- 知識共享
- 變更責任與稽核軌跡
- 鼓勵小而可評審單元

## 標準分支命名
| 類型 | 模式 | 範例 |
|------|------|------|
| Feature | `feature/<scope>` | `feature/payment-intents` |
| Bugfix | `fix/<issue-id>` | `fix/342-null-pointer` |
| Refactor | `refactor/<area>` | `refactor/auth-middleware` |
| Docs | `docs/<topic>` | `docs/api-pagination` |

## PR 生命週期
```
Plan → Branch → Commit → Sync → Open PR → Review → Update → Approve → Merge → Clean up
```

## 建立 PR（GitHub CLI 範例）
```bash
git checkout -b feature/user-deactivation
# ... commits ...
git push -u origin feature/user-deactivation
gh pr create --fill --base main --head feature/user-deactivation
```

## 高品質 PR 檢查清單
- 標題（祈使語）
- 描述：問題 → 解法 → 備註
- UI 變更附截圖 / GIF
- 關聯 issue (`Fixes #123`)
- 測試覆蓋說明
- 回滾考量

### 描述模板
```
## Summary
實作使用者軟刪除停用流程。

## Changes
- 新增 `status` 欄位
- 加入服務層方法 `deactivateUser()`
- 遷移既有 active 使用者

## Testing
- 新增單元測試
- 手動 API 測試 (POST /users/:id/deactivate)

## Rollback
Revert migration 202510071230_add_status_column.sql
```

## 評審最佳實務
評審者：
1. 先理解意圖再挑語法
2. 檢視正確性 / 安全 / 效能 / 可讀性
3. 以建議語氣（除非政策）
4. 確認可安全上線才批准

作者：
1. PR 保持小（理想 < ~400 新增行）
2. 回覆每則評論（resolve / 解釋）
3. 評審後避免 force-push（除最終 squash）
4. 維持 CI 綠燈

## 回應回饋
```bash
# 修改
git commit -m "Refactor: extract validation helper"
git push
```
PR diff 自動更新。

## Draft 與 Ready
邏輯未穩定用 draft；自檢 + 測試完成後轉 ready。

## 可考慮自動化
| 項目 | 目的 |
|------|------|
| CI pipeline | 測試 / lint / build |
| 靜態分析 | 安全 / 品質門檻 |
| Conventional commit 檢查 | 強制訊息風格 |
| Size 標籤 | 標記過大 PR |
| 自動指派審查 | 降低等待 |

## 合併策略
| 策略 | 描述 | 適用 |
|------|------|------|
| Squash | 壓成單一提交 | 小而雜的歷史 |
| Rebase & merge | 線性化 | 偏好線性史 |
| Merge commit | 保留分支語境 | 功能組 / release train |

## 合併前 Rebase（若政策）
```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

## 避免反模式
| 反模式 | 問題 |
|--------|------|
| 巨型 PR | 難審 → bug 混入 |
| 重構+功能混雜 | 意圖不清 |
| 評審後 force-push | 使舊審查失效 |
| 無描述 | 審查者猜意圖 |
| 忽略紅 CI | 浪費時間 |

## 合併後清理
```bash
git checkout main
git pull origin main
git branch -d feature/user-deactivation
git push origin --delete feature/user-deactivation
```

## 團隊指標
- 審查回應時間
- PR 大小分佈
- 重新開啟 / 回滾率
- squash 與 merge 比例

## 總結
結構良好的 PR 加速安全交付。追求清晰、小範圍、自動驗證與尊重、可行的回饋循環。

## 下一步
- 衝突策略（`git-conflict-resolution-strategies.md`）
- 協作實務（`git-best-practices-for-team-collaboration.md`）

---
**關鍵指令**
```bash
git push -u origin <branch>
git branch -d <branch>
git push origin --delete <branch>
```
