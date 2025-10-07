# 在Git中创建和切换分支

分支是Git的超能力。它让你创建隔离的开发线，这样你就可以实验、修复错误或构建功能，而不会影响主代码线的稳定性。掌握如何高效地创建和切换分支是任何有效Git工作流的基础。

---
## 1. 为什么存在分支（思维模型）
将`main`（或`master`）分支视为项目的已发布历史。分支只是指向提交的可移动指针。当你创建一个新分支时，你是在说："从历史的这一点起，我想开始一条新的工作线。"没有东西被复制；Git只是创建了一个轻量级引用。

关键概念：
- 分支指向一个提交。
- 你的`HEAD`告诉你现在"在"哪个分支（或提交）上。
- 当你在一个分支上提交时，分支指针会向前移动。

因为分支很轻量，所以应该慷慨使用：每个功能、每个错误修复、每个实验都用一个分支。

---
## 2. 列出并理解当前分支
查看本地已有分支：
```
$ git branch
```
当前分支会用星号标记。要同时查看本地和远程分支：
```
$ git branch -a
```
要查看每个分支指向哪里以及最后提交信息：
```
$ git branch -v
```
如果你想清理陈旧的远程跟踪分支（指向远程已删除分支的引用）：
```
$ git fetch --prune
```

---
## 3. 创建一个新分支
你通常会从另一个分支（通常是`main`）的最新状态创建分支。首先确保你是最新的：
```
$ git checkout main
$ git pull origin main
```
现在创建一个分支：
```
$ git branch feature/login-form
```
这会创建分支但不会切换到该分支。要同时创建并切换（首选）：
```
$ git switch -c feature/login-form
```
较旧的语法（仍然有效）：
```
$ git checkout -b feature/login-form
```
命名约定很重要。使用：
- `feature/<n>` 用于新功能
- `bugfix/<ticket-id>` 用于修复
- `hotfix/<critical>` 用于紧急生产补丁
- `chore/…`、`refactor/…` 等

避免使用空格、大写字母和模糊的名称，如`new`或`temp`。

---
## 4. 在分支之间切换
切换到现有分支：
```
$ git switch feature/login-form
```
或使用较旧的语法：
```
$ git checkout feature/login-form
```
如果你有未提交的更改且会被覆盖，Git将拒绝切换。选项：
- 提交它们。
- 暂存它们（`git stash push -m "WIP"`）。
- 丢弃它们（`git restore .`）。

要快速返回到之前的分支：
```
$ git switch -
```

### 分离头指针状态
如果你检出特定的提交（而不是分支）：
```
$ git checkout 4f2a9c1
```
你将进入"分离头指针"模式。你可以探索、构建或测试，但如果不创建分支就进行提交，这些提交以后可能很难找到。要保存工作：
```
$ git switch -c experiment/performance-tuning
```

---
## 5. 保持分支更新
在功能分支上工作时，其他提交可能会进入`main`。要合并它们：
```
$ git switch feature/login-form
$ git fetch origin
$ git merge origin/main
```
这会创建一个合并提交（如果需要）。对于线性历史，如果分支只有你在使用：
```
$ git fetch origin
$ git rebase origin/main
```
变基会将你的分支的提交重写到最新的`main`顶端上。不要对他人可能使用的共享分支进行变基；它会更改提交哈希。

---
## 6. 将分支推送到远程
分支仅在本地存在，直到你推送它：
```
$ git push -u origin feature/login-form
```
`-u`设置上游，这样未来的`git push`和`git pull`命令就知道默认的远程分支。

列出跟踪关系：
```
$ git branch -vv
```

---
## 7. 重命名分支
如果分支名称不清晰或需求变更：
### 如果你在要重命名的分支上（本地）：
```
$ git branch -m feature/login-form feature/auth-ui
```
如果已经推送，删除远程旧名称并推送新名称：
```
$ git push origin :feature/login-form
$ git push -u origin feature/auth-ui
```
一些托管平台提供了自动处理重定向的"重命名"功能——如果有的话使用它。

---
## 8. 删除分支
合并后（确保不再需要）：
本地删除：
```
$ git branch -d feature/login-form
```
`-d`是安全的；如果未合并会拒绝。强制删除（危险）：
```
$ git branch -D feature/login-form
```
远程删除：
```
$ git push origin :feature/login-form
```
或更新的语法：
```
$ git push origin --delete feature/login-form
```
清理可以减轻认知负担。

---
## 9. 常见工作流示例（功能分支）
1. 更新main：`git switch main && git pull`。
2. 创建分支：`git switch -c feature/report-export`。
3. 编码 + 频繁提交，使用有意义的信息。
4. 定期变基或合并`origin/main`以保持最新。
5. 推送：`git push -u origin feature/report-export`。
6. 打开一个拉取请求（PR）/ 合并请求（MR）。
7. 合并后，删除本地 + 远程分支。

这个循环按目的保持历史分段，并提高代码审查的焦点。

---
## 10. 故障排除场景
| 情况 | 原因 | 解决方案 |
|-----------|-------|------------|
| 无法切换分支 | 未提交的冲突更改 | 提交、暂存或恢复文件 |
| 分离头指针警告 | 检出了提交而不是分支 | 使用`git switch -c new-branch`创建分支 |
| 克隆后分支缺失 | 只克隆了默认分支 | `git fetch --all`然后`git switch branch-name` |
| 推送被拒绝（非快进） | 远程独立前进 | `git pull --rebase`然后重新推送 |
| 意外删除分支 | 不存在引用 | 通过`git reflog` -> `git branch recovered <commit>`恢复 |

---
## 11. 战略性使用分支
分支不仅仅用于功能：
- 原型探索
- 直接从发布标签的热修复
- 长期运行的集成分支（谨慎使用——考虑基于主干 + 功能标志代替）
- 文档或基础架构更改

尽量保持功能分支的生命周期短。分支存在的时间越长，干净合并就越困难。

---
## 12. 练习练习
1. 克隆或初始化仓库。
2. 创建`feature/colors`分支并添加一个文件。
3. 使用有意义的信息提交两次。
4. 在`main`添加不相关的提交后，将其变基到更新的`main`上。
5. 将分支重命名为`feature/theme-colors`。
6. 推送并打开PR。
7. 合并并在本地和远程删除分支。

反思：哪些步骤感觉慢？使用别名或脚本自动化它们（例如，`gco`，`gpl`，`gpsup`）。

---
## 13. 关键要点
- 分支创建是即时的；使用许多小而专注的分支。
- `switch`是更改分支的现代、更清晰的命令。
- 主动保持分支最新，以最小化合并摩擦。
- 合并后进行清理，以维护整洁的仓库。
- 在提交探索性工作之前始终创建一个分支。

掌握分支为高级工作流打下基础，如变基、交互式历史编辑和多分支发布策略。
