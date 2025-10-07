# 團隊協作 Git 最佳實務

## 簡介
除了指令，效能良好的協作取決於*共享紀律*。本指南列出可在小隊到大型組織擴展的務實、可執行作法。

## 哲學
黃金原則：
1. **清晰勝過炫技**（歷史應講故事）
2. **小變更走得更快**
3. **自動化 > 人工稽核**
4. **可重現 = 可信賴**

## 分支策略模式
| 策略 | 描述 | 何時使用 |
|------|------|----------|
| Trunk-Based | 短生命分支快速回 `main` | 快速迭代、CI 成熟 |
| GitHub Flow | Feature 分支 → PR → merge → deploy | SaaS、持續交付 |
| Git Flow | `develop`、release、hotfix 分支 | 版本化產品、較慢節奏 |
| Release Train | 定期時間盒合併與釋出 | 多團隊協調列車 |

選最簡單且滿足治理需求的；避免過度設計。

## Commit 訊息慣例（範本）
```
<type>(<scope>): <short summary>

<body>

<footer>
```
類型：`feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`。
採用 conventional commits 以自動產生 changelog。

## 透過 Hooks / CI 強制
範例：
```bash
# .husky/commit-msg
#!/bin/sh
exec < /dev/tty
commitlint -E HUSKY_GIT_PARAMS
```

## Pull Request 衛生
| 實務 | 目標 |
|------|------|
| 最大變更行數 | ~400（軟性） |
| 審查回應時間 | < 24h |
| 全部檢查通過 | 必須 |
| 連結 issue | 100% |

## 避免長生命分支
緩解：
- Feature flags（漸進合併）
- API 相容層
- 暗發佈 / toggles
- 及早上游 rebase

## Hotfix 流程
```bash
git checkout main
git pull
git checkout -b hotfix/critical-timezone
# 修復、提交、測試
git push origin hotfix/critical-timezone
# PR → merge → tag → deploy
```

## 版本標籤
```bash
git tag -a v2.3.0 -m "Release v2.3.0"
git push origin v2.3.0
```

## 保護 Main 分支
平台設定：
- 必要狀態檢查
- 必要審查（≥1 或 ≥2）
- 禁止 force push
- 線性歷史（可選）
- 簽章提交（安全需求）

## 大檔 & Monorepo 指南
- 二進制用 Git LFS
- 特大倉使用 sparse checkout
- 重要路徑用 CODEOWNERS

## .gitignore 基線
保持精簡 + 專案特定；避免提交產生物。

## 合併前檢查（盡量自動化）
- [ ] 測試通過
- [ ] Lint/格式無問題
- [ ] 安全掃描通過
- [ ] 無遺留 TODO（或已建 issue）
- [ ] 行為更動的文件已更新

## 歷史重寫政策
| 動作 | 允許？ | 備註 |
|------|--------|------|
| 本地 feature rebase | 是 | 分享前 |
| force-push 共享分支 | 少見 | 用 `--force-with-lease` |
| rebase 受保護分支 | 否 | 破壞使用者基線 |
| merge 時 squash | 視情況 | 不需保留細粒度時 |

## 反模式
| 模式 | 問題 | 補救 |
|------|------|------|
| 隨意 force push | 破壞同伴 clone | 權限/政策限制 |
| 混合關注點 PR | 難審 | 拆分 |
| 靜默合併 | 低可見性 | 要求 PR 討論 |
| 直接在 main 上改 | 可能破壞生產 | 分支保護 |

## 文件支柱
維護：
- CONTRIBUTING.md
- CODEOWNERS
- ADR (Architecture Decision Records)
- 新手速查表

## 指標（健康）
- 平均合併時間 (MTTM)
- >1000 LOC PR 百分比（越低越好）
- Flaky 測試率
- 合併後 revert 次數

## 總結
高效 Git 協作結合社會契約、自動化與紀律化流程。讓正確道路成為*最容易*的道路。

## 下一步
- Hooks 與自動化（`git-hooks-and-automation.md`）
- 撤銷策略（`git-reset-revert-and-checkout-explained.md`）

---
**關鍵指令**
```bash
git tag -a <tag> -m "msg"
git push origin <tag>
git push origin --delete <branch>
```
