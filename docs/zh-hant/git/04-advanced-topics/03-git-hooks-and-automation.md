# Git Hooks 與自動化

## 簡介
Git hooks 是在特定生命週期觸發的腳本，用於品質、安全與合規自動化。本文涵蓋本地 hooks、伺服端 hooks（概念）與現代工具封裝。

## 類型
| 類型 | 觸發時機 | 範例用途 |
|------|----------|----------|
| 客戶端 | 開發者操作 | 提交前 lint |
| 伺服端 | push / receive | 強制提交政策 |

## 位置
`.git/hooks/` 內附 `.sample` 範例。移除後綴並賦予執行權即可。

## 常見客戶端 Hooks
| Hook | 觸發 | 範例 |
|------|------|------|
| pre-commit | Commit 暫存快照前 | Lint / format / 快速測試 |
| commit-msg | 編輯訊息後 | 檢查 conventional commit |
| pre-push | Push 前 | 跑快速測試子集 |
| post-merge | 合併後 | 安裝依賴 |
| prepare-commit-msg | 編輯器開啟前 | 注入模板 |

## pre-commit 範例
```bash
#!/usr/bin/env bash
echo "Running lint..."
eslint . || exit 1
```
```bash
chmod +x .git/hooks/pre-commit
```

## Commit 訊息檢驗
```bash
#!/usr/bin/env bash
MSG_FILE=$1
PATTERN='^(feat|fix|docs|refactor|test|chore|perf)(\(.+\))?: .+'
if ! grep -Eq "$PATTERN" "$MSG_FILE"; then
  echo "Commit message must follow conventional format" >&2
  exit 1
fi
```

## 共享 Hooks 的問題與解法
本地 hooks 不版本控制。方案：
1. 工具（Husky, Lefthook, pre-commit）
2. 自訂：放 `./hooks` 再 symlink/copy

### Husky 範例
```bash
npx husky add .husky/pre-commit "npm test"
```

### Python pre-commit 框架
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 24.3.0
    hooks:
      - id: black
```
```bash
pre-commit install
```

## 伺服端 Hooks（概念）
位於裸倉：`pre-receive`, `update`, `post-receive`。用於政策（簽名、尺寸限制）。多由平台管理（GitHub Actions / GitLab push rules）。

## 適合自動化
- Lint & format
- 型別檢查
- Secret 掃描
- 單元測試（快速子集）
- Commit 訊息品質
- License header 插入

## 不適合放 Hooks
- 長時間整合測試（交給 CI）
- 重量級建置
- 外部部署（CI/CD 觸發）

## 快速失敗哲學
本地抓低層次問題；保持 CI 綠燈，評審聚焦邏輯。

## 安全注意
僅執行可信 hook。審核第三方工具與版本鎖定。

## 暫時停用
```bash
git commit --no-verify
```
謹慎使用。

## 效能稽核
記錄耗時；pre-commit >2–3s 易被繞過。可只 lint 變更檔。

## 只 Lint 變更檔示例
```bash
#!/usr/bin/env bash
CHANGED=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|ts|jsx|tsx)$') || true
if [ -z "$CHANGED" ]; then
  echo "No JS/TS changes."; exit 0
fi
eslint $CHANGED || exit 1
```

## 總結
Hooks 提升基線品質、左移回饋並體現文化。保持快速、可版本化、透明。

## 下一步
- 團隊實務（`git-best-practices-for-team-collaboration.md`）
- 子模組（`git-submodules-and-large-repositories.md`）

---
**關鍵指令**
```bash
git config core.hooksPath hooks
chmod +x .git/hooks/<hook>
```
