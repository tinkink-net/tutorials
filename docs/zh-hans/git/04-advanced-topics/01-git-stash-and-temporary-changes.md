# Git Stash 与临时更改

## 介绍
`git stash` 让你“搁置”未提交的工作，从而可以切换任务、拉取更新或紧急修复，而无需提交未完成代码。

## Stash 保存的内容
默认：已修改的已跟踪文件 + 已暂存更改。可选包含未跟踪 / 忽略文件。

## 基本用法
```bash
git stash push -m "WIP: form validation"
git stash list
```
示例条目：
```
stash@{0}: On feature/form: WIP: form validation
```

## 恢复工作
```bash
git stash apply stash@{0}   # 保留副本
git stash pop               # 应用并删除最新 stash
```

## 包含未跟踪文件
```bash
git stash push -u -m "WIP: add config prototype"
```
包含忽略文件：
```bash
git stash push -a -m "WIP: full env"
```

## 部分（交互式）Stash
```bash
git stash push -p -m "WIP: selected changes"
```

## 查看 Stash 差异
```bash
git stash show stash@{1}
git stash show -p stash@{1}   # 完整补丁
```

## 丢弃 / 清空
```bash
git stash drop stash@{2}
git stash clear   # 危险：移除全部
```

## 应用到其他分支
```bash
git checkout feature/new-ui
git stash apply stash@{0}
```

## 从 Stash 创建分支
```bash
git stash branch feature/resume stash@{0}
```

## 常见模式
| 场景 | 命令 |
|------|------|
| 拉取更改但保留 WIP | `git stash push -m "WIP" && git pull && git stash pop` |
| 在 main 上做热修复 | Stash → switch → fix → return → pop |
| 清理工作区做构建 | Stash 未提交噪声 |

## 何时不要用 Stash
- 长期保存（做 WIP 提交更好）
- 共享给其他人（用分支）
- 大量二进制工作（对象膨胀）

## 替代方案
| 需求 | 替代 |
|------|------|
| 安全检查点 | 提交到临时分支 |
| 实验性 spike | `feature/spike-*` 分支 |
| 快速丢弃 | `git restore` |

## 故障排除
| 问题 | 解决 |
|------|------|
| 应用时冲突 | 解决后 `git add`（stash 已应用） |
| pop 后丢失 | 可能用 `git fsck --lost-found` 尝试找回 |
| 误 stash 未跟踪重要文件 | 下次用分支方式 |

## 总结
Stash 是为*短暂中断*设计的战术工具。刻意使用；对持久进展首选明确提交。

## 下一步
- 撤销操作（`git-reset-revert-and-checkout-explained.md`）
- 深度冲突流程（`git-conflict-resolution-strategies.md`）

---
**关键命令**
```bash
git stash push -m "msg"
git stash list
git stash show -p stash@{n}
git stash pop
git stash branch <name> stash@{n}
```
