# Git Stash 與暫時變更

## 簡介
`git stash` 讓你暫存（擱置）未提交工作，以便切換任務、拉取更新或執行緊急修復，而不需提交未完成程式碼。

## Stash 儲存內容
預設：已修改的已追蹤檔 + 已暫存變更。可選擇包含未追蹤 / 被忽略檔案。

## 基本使用
```bash
git stash push -m "WIP: form validation"
git stash list
```
例：
```
stash@{0}: On feature/form: WIP: form validation
```

## 還原工作
```bash
git stash apply stash@{0}   # 保留副本
git stash pop               # 套用並刪除最新 stash
```

## 包含未追蹤檔
```bash
git stash push -u -m "WIP: add config prototype"
```
包含忽略檔：
```bash
git stash push -a -m "WIP: full env"
```

## 局部（互動式）Stash
```bash
git stash push -p -m "WIP: selected changes"
```

## 檢視 Stash 差異
```bash
git stash show stash@{1}
git stash show -p stash@{1}
```

## 刪除 / 清空
```bash
git stash drop stash@{2}
git stash clear   # 危險：全部移除
```

## 套用到不同分支
```bash
git checkout feature/new-ui
git stash apply stash@{0}
```

## 從 Stash 建立分支
```bash
git stash branch feature/resume stash@{0}
```

## 常見模式
| 情境 | 指令 |
|------|------|
| 想拉取但保留 WIP | `git stash push -m "WIP" && git pull && git stash pop` |
| main 緊急 hotfix | Stash → 切換 → 修復 → 回來 → pop |
| 為建置清工作區 | Stash 雜訊 |

## 不建議使用 Stash 的情況
- 長期保存（改 WIP branch commit）
- 與他人分享（用分支）
- 大量二進制（物件膨脹）

## 替代方案
| 需求 | 替代 |
|------|------|
| 安全 checkpoint | 臨時分支 commit |
| 實驗 spike | `feature/spike-*` 分支 |
| 快速丟棄 | `git restore` |

## 疑難排解
| 問題 | 解法 |
|------|------|
| 套用衝突 | 解決後 `git add`（已套用） |
| pop 後遺失 | 嘗試 `git fsck --lost-found` |
| 不小心 stash 未追蹤要緊檔 | 下次用分支而非 stash |

## 總結
Stash 是針對*短暫中斷*的戰術工具。刻意使用；持久進度應優先明確提交。

## 下一步
- 撤銷操作（`git-reset-revert-and-checkout-explained.md`）
- 衝突流程（`git-conflict-resolution-strategies.md`）

---
**關鍵指令**
```bash
git stash push -m "msg"
git stash list
git stash show -p stash@{n}
git stash pop
git stash branch <name> stash@{n}
```
