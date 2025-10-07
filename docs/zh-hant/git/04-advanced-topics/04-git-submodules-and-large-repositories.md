# Git 子模組與大型儲存庫

## 簡介
子模組讓你在一個 Git 儲存庫嵌入另一個。適度使用很強大——誤用則帶來摩擦。本文說明何時使用、如何管理，以及大型程式碼基底的替代方案。

## 何時使用子模組
| 適合 | 不適合 |
|------|--------|
| 需固定共享函式庫版本 | 高頻跨 repo 變更 |
| 外部 vendored 相依 | 需原子提交的緊耦合整合 |
| 法務/稽核隔離需求 | 開發者不熟子模組流程 |

## 新增子模組
```bash
git submodule add https://github.com/vendor/lib-a external/lib-a
git commit -m "Add lib-a submodule"
```
產生 `.gitmodules`。

### .gitmodules 範例
```
[submodule "external/lib-a"]
  path = external/lib-a
  url = https://github.com/vendor/lib-a
```

## 克隆含子模組
```bash
git clone https://github.com/org/app.git
cd app
git submodule update --init --recursive
```
或：
```bash
git clone --recurse-submodules <url>
```

## 更新子模組
```bash
cd external/lib-a
git fetch
git checkout v2.4.0
cd ../..
git add external/lib-a
git commit -m "Bump lib-a to v2.4.0"
```
`git diff --submodule` 可得摘要。

## 移除子模組
```bash
git submodule deinit -f external/lib-a
rm -rf .git/modules/external/lib-a
git rm -f external/lib-a
git commit -m "Remove lib-a submodule"
```

## 常見陷阱
| 問題 | 原因 | 緩解 |
|------|------|------|
| 子模組內 detached HEAD | 初始狀態 | 需修改先建分支 |
| 忘記更新指標 | 只在子模組 commit | Stage 父 repo 指標 |
| 依賴遞迴混亂 | 巢狀子模組 | 用 `--recursive` 或簡化 |
| `.gitmodules` 衝突 | 並行編輯 | 協調 / 提早 rebase |

## 大型 Monorepo 考量
子模組 ≠ monorepo。若真大型：
| 策略 | 描述 |
|------|------|
| Monorepo | 統一歷史與工具 |
| Subtree | 嵌入並可合併外部碼（低額外資訊） |
| 套件管理 | 發佈至 registry |
| Polyrepo orchestration | 分離 repo 由 pipeline 協作 |

### Git Subtree 簡介
```bash
git subtree add --prefix=vendor/lib-a https://github.com/vendor/lib-a main --squash
```
更新：
```bash
git subtree pull --prefix=vendor/lib-a https://github.com/vendor/lib-a main --squash
```

## 效能提示（大型倉）
- CI 浅克隆：`git clone --depth 20`
- 部分克隆（Git 2.19+）：
```bash
git clone --filter=blob:none --sparse <url>
```
- 稀疏檢出：
```bash
git sparse-checkout init --cone
git sparse-checkout set src/ docs/
```

## 稽核子模組狀態
```bash
git submodule status --recursive
```

## 安全考量
- 審視來源（會在建置執行）
- 固定 tag/commit（不要移動分支）
- 監控供應鏈通報

## 總結
子模組可強制跨 repo 版本釘選，但增加操作成本。需有意識使用；更廣整合需求可評估 subtree、套件發布或 monorepo。

## 下一步
- 自動化（`git-hooks-and-automation.md`）
- 協作實務（`git-best-practices-for-team-collaboration.md`）

---
**關鍵指令**
```bash
git submodule add <url> <path>
git submodule update --init --recursive
git diff --submodule
git submodule status --recursive
```
