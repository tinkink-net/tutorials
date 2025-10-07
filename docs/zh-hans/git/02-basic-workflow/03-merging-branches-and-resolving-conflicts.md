# 合并分支与解决冲突

## 介绍
分支让你隔离工作；合并把这些工作重新汇总。本教程演示如何安全地执行合并、理解不同合并策略，并在 Git 需要你介入时自信地解决冲突。

## 前置条件
- 熟悉基础工作流（`add`, `commit`, `push`）
- 已经创建并切换过分支（参见 `creating-and-switching-branches.md`）
- 对提交历史与 `git log` 有基本理解

## 学习目标
完成后你将能够：
1. 将功能分支合并进主干分支
2. 在快进（fast-forward）与非快进（non–fast-forward）合并之间做出选择
3. 发现、查看并解决合并冲突
4. 终止或重新开始一个有问题的合并
5. 采用最佳实践降低冲突频率

## 合并的心智模型
一次合并会创建一个拥有**两个父提交**的新提交（要合并的两个分支的各自 tip），除非 Git 可以执行**快进合并**。Git 会执行一次**三方合并（three-way merge）**，使用：
```
BASE (merge base)  ← 公共祖先
HEAD (当前分支)
OTHER (被合并进来的分支)
```
Git 比较 (BASE→HEAD) 与 (BASE→OTHER) 的差异，若不重叠则同时应用。发生重叠的地方成为冲突。

## 快进 vs 合并提交
| 场景 | 结果 | 何时出现 | 优点 | 缺点 |
|------|------|----------|------|------|
| 快进 (fast-forward) | 指针直接前移 | 目标分支严格领先 | 线性历史 | 失去分支整合的语义边界 |
| 合并提交 | 产生 2 个父提交的新提交 | 历史已分叉 | 保留整合点 | 额外提交；可能噪声 |

### 强制产生合并提交
```bash
git merge --no-ff feature/login
```
即使可以快进，也记录一条合并提交（便于分组相关更改）。

## 基本合并工作流
```bash
# 1. 确保 main 最新
git checkout main
git pull origin main

# 2. 合并功能分支
git merge feature/login

# 3. 推送结果
git push origin main
```

## 查看将要合并的内容
```bash
# 显示将被合并的提交
git log --oneline main..feature/login

# 预览一次合并（不提交）
git merge --no-commit --no-ff feature/login
# 若决定不继续
git merge --abort
```

## 典型冲突场景
两个分支修改了 `config/app.json` 的同一行。
```bash
git checkout main
git merge feature/rate-limit
# Auto-merging config/app.json
# CONFLICT (content): Merge conflict in config/app.json
# Automatic merge failed; fix conflicts and commit the result.
```

### 冲突标记
文件中：
```
<<<<<<< HEAD
"rateLimit": 200,
=======
"rateLimit": 500,
>>>>>>> feature/rate-limit
```
通过选择 / 合并期望值解决，然后完全删除标记。

### 检查冲突
```bash
git status                # 列出未合并路径
git diff                  # 展示冲突区域
git diff --name-only --diff-filter=U  # 仅列出冲突文件
```

### 编辑后
```bash
git add config/app.json
git commit          # 使用合并模板消息
```
或自定义消息：
```bash
git commit -m "Merge feature/rate-limit into main: adjust limit to 300"
```

## 终止合并
如果觉得不对且尚未提交：
```bash
git merge --abort
```
恢复到合并前工作区状态。

## 策略与选项
| 选项 | 作用 |
|------|------|
| `--no-ff` | 强制创建合并提交 |
| `--squash` | 将更改合并到工作区（不生成合并提交） |
| `--commit` / `--no-commit` | 自动提交或暂停等待确认 |
| `--abort` | 冲突未提交时重置状态 |
| `-X ours` | 冲突时偏向当前分支版本 |
| `-X theirs` | 冲突时偏向被合并分支版本 |

### Squash 合并（合并更改但不保留单独历史）
```bash
git checkout main
git merge --squash feature/search
git commit -m "Add search functionality"
```
Squash 让 main 更干净，但丢失功能分支内的独立提交。

## 可视化合并
```bash
git log --graph --oneline --decorate
```

## 高级冲突工具
```bash
git mergetool     # 启动配置的可视化合并工具
git config merge.tool code
git config mergetool.code.cmd 'code --wait --merge $REMOTE $LOCAL $BASE $MERGED'
```

## 预防冲突
1. 长期分支需频繁 pull / rebase
2. 保持功能分支小而聚焦
3. 避免把大规模格式化与逻辑更改混在一起
4. 统一文件排序 / lint 规则
5. 对大型重构尽早沟通

## 处理二进制冲突
对于无法逐行合并的图片 / 二进制：
```bash
git checkout --ours  path/to/asset.png
git checkout --theirs path/to/asset.png
git add path/to/asset.png
```
显式选择其一。

## 常见陷阱
| 问题 | 原因 | 解决 |
|------|------|------|
| 反复冲突 | 长期分支已经严重偏离 | 及早 rebase 或更早集成 |
| 巨量冲突 | 格式与逻辑混合提交 | 先拆出仅格式提交 |
| 意外合并提交 | 策略禁用快进或工具默认 | 使用 `git pull --ff-only` 或检查钩子 |
| 丢失更改 | 未暂存前用 checkout 覆盖 | 通过 `git reflog` 恢复 |

## 合并前检查清单
- [ ] CI 通过（测试绿色）
- [ ] 已代码评审（若团队策略要求）
- [ ] 分支已更新（`git fetch && git rebase origin/main` 或最新 merge）
- [ ] 无调试产物 / 秘密信息
- [ ] 提交信息干净

## 总结
合并用于整合分叉的历史。理解合并类型、审视即将进入的提交、精确解决冲突，并用清晰的合并快照提交。持续保持卫生可降低摩擦。

## 下一步
- 探索 rebase vs merge（`git-rebase-vs-merge-when-to-use-each.md`）
- 学习结构化冲突策略（`git-conflict-resolution-strategies.md`）

---
**关键命令速览**
```bash
git merge <branch>
git merge --no-ff <branch>
git merge --squash <branch>
git merge --abort
git diff --name-only --diff-filter=U
git log --graph --oneline --decorate
```
