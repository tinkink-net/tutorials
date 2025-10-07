# Git Reset、Revert 与 Checkout 详解

## 介绍
当你需要**撤销**某些东西时，选择正确的命令可以避免数据丢失并保留历史完整性。本指南对比 `reset`, `revert`, `checkout`（以及 `restore` / `switch`）。

## 快速对比
| 命令 | 作用范围 | 重写历史？ | 常见用途 |
|------|----------|-----------|----------|
| reset | 移动分支引用 / 暂存区 | 是（非公开） | 重做本地提交 |
| revert | 新提交抵消旧提交 | 否 | 公共撤销 |
| checkout (file) | 替换工作区文件 | 否 | 丢弃本地修改 |
| checkout (branch) | 切换 HEAD | 否 | 切换分支 |
| restore | 现代文件恢复 | 否 | 更安全的文件操作 |
| switch | 现代分支切换 | 否 | 分离语义更清晰 |

## Git Reset 模式
```bash
git reset --soft HEAD~1   # 保留变更并保持已暂存
git reset --mixed HEAD~1  # （默认）取消暂存，保留工作区
git reset --hard HEAD~1   # 全部丢弃（危险！）
```

### 使用场景
- Soft：合并最后两个提交（随后 amend）
- Mixed：重新组织提交内容 / 暂存
- Hard：抛弃本地探索性提交

## 移动分支指针
```bash
git reset --hard <commit>
```
若已 push——避免；改用 `revert`。

## 修补最后一次提交
```bash
git commit --amend -m "Refine API error handling"
```
若已 push：需协调或避免。

## Revert（安全公共撤销）
```bash
git revert <commit>
git revert <old>..<new>   # 撤销一个范围
```
创建逆向补丁提交，保持历史。

### 撤销合并提交
找到哈希：
```bash
git revert -m 1 <merge-hash>
```
`-m 1` 指定主线父提交。

## 丢弃本地文件更改
传统：
```bash
git checkout -- path/file.txt
```
现代：
```bash
git restore path/file.txt
git restore --staged path/file.txt   # 取消暂存
```

## 分支切换（现代）
```bash
git switch main
git switch -c feature/new-dashboard
```

## 找回丢失提交
```bash
git reflog
git checkout <lost-hash>
```
然后：
```bash
git switch -c recovery/<topic>
```

## 合并提交（交互式 Rebase）
```bash
git rebase -i HEAD~5
```
虽非撤销，但用于共享前重写历史。

## 决策指南
| 情景 | 使用 |
|------|------|
| 撤销最近 2 次本地提交（未 push） | `git reset --soft HEAD~2` + amend |
| 撤销公共提交 | `git revert <hash>` |
| 丢弃未暂存文件修改 | `git restore <file>` |
| 取消暂存误加文件 | `git restore --staged <file>` |
| 回到某已知良好状态（本地） | `git reset --hard <hash>` |
| 浏览旧提交 | `git checkout <hash>`（detached） |

## 安全提示
1. 未把握时避免 `--hard`（可先 stash）
2. 已共享内容使用 revert
3. 用分支作安全网
4. 学会 `reflog` —— 时间机器

## 总结
选择最不具破坏性的工具达成目标。Reset 重写；Revert 记录纠正意图；Checkout/Restore 操作工作区。

## 下一步
- 临时搁置（`git-stash-and-temporary-changes.md`）
- 自动化（`git-hooks-and-automation.md`）

---
**关键命令**
```bash
git reset --soft|--mixed|--hard <ref>
git revert <commit>
git restore [--staged] <file>
git reflog
```
