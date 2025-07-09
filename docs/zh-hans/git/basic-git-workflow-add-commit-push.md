# Git 基本工作流程：添加、提交、推送

## 介绍

现在你已经创建了你的第一个 Git 仓库并理解了基本概念，是时候学习基本的 Git 工作流程了。这个工作流程构成了日常 Git 使用的骨干，由三个主要步骤组成：**添加（Add）**、**提交（Commit）**和**推送（Push）**。

本教程将指导你完成这些基本操作，帮助你理解如何跟踪更改、保存工作快照以及与他人共享代码。

## 前提条件

在开始本教程之前，请确保你：
- 已创建 Git 仓库（[创建你的第一个 Git 仓库](./creating-your-first-git-repository.md)）
- 对 Git 概念有基本了解（[理解 Git 基础和术语](./understanding-git-basics-and-terminology.md)）
- 在你的仓库中有一些文件可以操作

## 基本 Git 工作流程

标准的 Git 工作流程遵循以下步骤：

```
1. 在工作目录中修改文件
2. 暂存更改 (git add)
3. 提交更改 (git commit)
4. 推送到远程仓库 (git push)
```

让我们详细探讨每个步骤。

## 步骤 1：了解当前状态

在进行任何更改之前，让我们检查仓库的当前状态：

```bash
git status
```

你应该会看到类似这样的内容：
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

这表明：
- 当前分支：`main`
- 尚无提交
- 有几个未跟踪的文件

## 步骤 2：将文件添加到暂存区 (git add)

`git add` 命令将文件从工作目录移动到暂存区。这是你准备下一次提交的地方。

### 添加单个文件

逐个添加文件：

```bash
# 添加 README 文件
git add README.md

# 检查状态
git status
```

你应该会看到：
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	config.json
	hello.py
	sample.txt
```

**注意区别：**
- `README.md` 现在位于"Changes to be committed"（已暂存）下
- 其他文件仍然是"Untracked"（未跟踪）

### 添加多个文件

一次添加多个文件：

```bash
# 添加多个特定文件
git add hello.py config.json

# 或添加当前目录中的所有文件
git add .

# 检查状态
git status
```

添加所有文件后：
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   .gitignore
	new file:   README.md
	new file:   config.json
	new file:   hello.py
	new file:   sample.txt
```

### 常见的 git add 模式

```bash
# 添加所有文件
git add .

# 添加当前目录和子目录中的所有文件
git add -A

# 仅添加已修改的文件（不包括新文件）
git add -u

# 交互式添加文件
git add -i

# 添加特定类型的文件
git add *.py
git add *.md
```

### 理解暂存区

暂存区允许你：
- **精确构建提交** - 精确选择每次提交中包含的内容
- **审查更改** - 在提交前查看将要提交的内容
- **拆分更改** - 分别提交相关的更改

## 步骤 3：进行你的第一次提交 (git commit)

提交会创建已暂存更改的快照。每次提交应该代表一个逻辑工作单元。

### 基本提交命令

```bash
git commit -m "Initial commit: Add project files"
```

你应该会看到类似这样的输出：
```
[main (root-commit) a1b2c3d] Initial commit: Add project files
 5 files changed, 23 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 config.json
 create mode 100755 hello.py
 create mode 100644 sample.txt
```

**理解输出：**
- `main` - 当前分支
- `root-commit` - 这是第一次提交
- `a1b2c3d` - 短提交哈希
- `5 files changed, 23 insertions(+)` - 更改摘要

### 提交信息最佳实践

良好的提交信息对项目维护至关重要：

#### 结构
```
简短摘要（50个字符或更少）

如果需要，可以添加更详细的解释。在72个字符处换行。
解释做了什么和为什么，而不是如何做。

- 使用项目符号列出多项更改
- 如果适用，引用问题编号
```

#### 良好提交信息的示例
```bash
# 好 - 清晰简洁
git commit -m "添加用户认证系统"

# 好 - 解释原因
git commit -m "修复阻止密码重置的登录错误"

# 好 - 多行提交
git commit -m "实现用户资料编辑功能

- 添加表单验证
- 更新用户模型
- 添加个人资料图片上传
- 修复移动端样式问题"
```

#### 不良提交信息的示例
```bash
# 差 - 太模糊
git commit -m "修复东西"

# 差 - 不具描述性
git commit -m "更新"

# 差 - 摘要太长
git commit -m "此提交添加了新的用户认证系统，允许用户使用电子邮件验证和密码重置功能登录和注册账户"
```

### 替代提交方法

#### 使用默认编辑器
```bash
# 打开默认编辑器编写提交信息
git commit
```

#### 提交所有更改
```bash
# 暂存并提交所有已跟踪文件
git commit -a -m "更新所有已跟踪文件"
```

## 步骤 4：查看提交历史

提交后，你可以查看仓库的历史记录：

```bash
# 查看提交历史
git log
```

输出：
```
commit a1b2c3d4e5f6789... (HEAD -> main)
Author: Your Name <your.email@example.com>
Date:   Wed Jul 9 10:30:00 2025 +0000

    Initial commit: Add project files
```

### 有用的 git log 选项

```bash
# 紧凑的单行格式
git log --oneline

# 显示最后3次提交
git log -3

# 显示带文件更改的提交
git log --stat

# 显示带实际更改的提交
git log -p

# 图形化表示
git log --graph --oneline
```

## 进行额外更改

让我们通过一些更改来练习工作流程：

### 步骤 1：修改文件

编辑 README.md 文件：

```bash
echo "

## Recent Updates

- Added basic project structure
- Created initial configuration
- Set up Git repository" >> README.md
```

### 步骤 2：检查状态

```bash
git status
```

你应该会看到：
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

no changes added to commit (use "git add" and commit)
```

### 步骤 3：查看更改

查看更改内容：

```bash
git diff
```

这会显示工作目录与最后一次提交之间的差异。

### 步骤 4：暂存和提交

```bash
# 暂存更改
git add README.md

# 提交更改
git commit -m "Update README with project status"
```

## 理解文件状态

Git 中的文件经历不同的状态：

```
未跟踪 → 已暂存 → 已提交
   ↓        ↓        ↓
git add → git commit → git push
```

### 文件状态示例

```bash
# 检查详细状态
git status

# 查看简短状态
git status -s
```

简短状态符号：
- `??` - 未跟踪文件
- `A` - 已添加（已暂存）
- `M` - 已修改
- `D` - 已删除
- `R` - 已重命名

## 步骤 5：设置远程仓库

要推送你的更改，你需要一个远程仓库。让我们设置一个远程仓库：

### 使用 GitHub（示例）

1. 在 GitHub 上创建一个新仓库
2. 复制仓库 URL
3. 将其添加为远程仓库：

```bash
# 添加远程仓库
git remote add origin https://github.com/yourusername/my-first-git-project.git

# 验证远程仓库
git remote -v
```

### 使用 GitLab 或其他服务

过程类似：
```bash
# GitLab 示例
git remote add origin https://gitlab.com/yourusername/my-first-git-project.git

# 自托管 Git 服务器
git remote add origin user@server:/path/to/repo.git
```

## 步骤 6：推送到远程仓库 (git push)

将你的提交推送到远程仓库：

```bash
# 推送到远程仓库
git push -u origin main
```

`-u` 标志设置本地 `main` 分支与远程 `main` 分支之间的跟踪关系。

### 理解推送输出

```
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (7/7), 1.23 KiB | 1.23 MiB/s, done.
Total 7 (delta 0), reused 0 (delta 0)
To https://github.com/yourusername/my-first-git-project.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### 未来的推送

在使用 `-u` 进行初始推送后，你可以简单地使用：

```bash
git push
```

## 完整工作流程示例

以下是 Git 工作流程的完整示例：

```bash
# 1. 进行更改
echo "print('Hello, Git!')" > new_script.py

# 2. 检查状态
git status

# 3. 暂存更改
git add new_script.py

# 4. 提交更改
git commit -m "Add new Python script"

# 5. 推送到远程
git push
```

## 常见 Git 工作流程模式

### 功能开发工作流程
```bash
# 开始开发功能
git status
# ... 进行更改 ...
git add .
git commit -m "实现功能 X"
git push
```

### 错误修复工作流程
```bash
# 修复错误
git status
# ... 修复错误 ...
git add -u  # 仅添加已修改的文件
git commit -m "修复用户认证中的错误"
git push
```

### 常规开发工作流程
```bash
# 日常开发周期
git status
# ... 编写代码 ...
git add .
git commit -m "添加用户资料验证"
# ... 更多工作 ...
git add .
git commit -m "更新错误处理"
git push
```

## 最佳实践

### 1. 经常提交
- 进行小而集中的提交
- 将相关更改一起提交
- 不要在提交之间等待太久

### 2. 编写良好的提交信息
- 使用现在时态（"添加功能"而不是"已添加功能"）
- 保持第一行不超过50个字符
- 解释为什么，而不仅仅是做了什么

### 3. 提交前审查
```bash
# 始终检查你要提交的内容
git status
git diff --staged
```

### 4. 有效使用暂存区
- 只暂存相关更改
- 使用 `git add -p` 进行部分文件暂存
- 在提交前审查已暂存的更改

## 常见问题排查

### 问题："Nothing to commit"（没有可提交的内容）
**原因**：没有为提交暂存任何更改。
**解决方案**：先使用 `git add` 暂存更改。

### 问题："Repository not found"（找不到仓库）
**原因**：远程仓库 URL 不正确。
**解决方案**：使用 `git remote -v` 检查远程 URL。

### 问题："Authentication failed"（认证失败）
**原因**：凭据或权限不正确。
**解决方案**：验证你的用户名/密码或 SSH 密钥。

### 问题："Uncommitted changes"（未提交的更改）
**原因**：尝试推送时有未提交的更改。
**解决方案**：先提交或暂存更改。

## 有用命令总结

### 状态和信息
```bash
git status          # 检查仓库状态
git log             # 查看提交历史
git diff            # 显示更改
git remote -v       # 显示远程仓库
```

### 暂存和提交
```bash
git add <file>      # 暂存特定文件
git add .           # 暂存所有文件
git commit -m "msg" # 带信息提交
git commit -a -m "msg" # 暂存并提交已跟踪文件
```

### 远程操作
```bash
git remote add origin <url>  # 添加远程仓库
git push -u origin main      # 推送并设置上游
git push                     # 推送到已配置的远程仓库
```

## 总结

你已成功学习了基本的 Git 工作流程！以下是你完成的内容：

1. **理解工作流程**：添加 → 提交 → 推送
2. **暂存更改**：使用 `git add` 准备提交
3. **进行提交**：使用 `git commit` 创建快照
4. **设置远程仓库**：连接到外部仓库
5. **推送更改**：使用 `git push` 共享你的工作
6. **最佳实践**：编写良好的提交信息和组织工作

### 掌握的关键命令：
- `git add` - 暂存要提交的更改
- `git commit` - 创建已暂存更改的快照
- `git push` - 将提交上传到远程仓库
- `git status` - 检查当前仓库状态
- `git log` - 查看提交历史
- `git diff` - 查看版本之间的更改

### 工作流程模式：
```
编辑文件 → git add → git commit → git push
```

这个基本工作流程构成了所有 Git 使用的基础。无论你是独自工作还是与团队合作，这些命令都将成为你进行版本控制的日常工具。

## 下一步

现在你已经理解了基本的 Git 工作流程，你已准备好探索更高级的主题：

1. [理解 Git 分支](./understanding-git-branches.md)
2. [创建和切换分支](./creating-and-switching-branches.md)
3. [使用远程仓库](./working-with-remote-repositories.md)

## 相关资源

- [创建你的第一个 Git 仓库](./creating-your-first-git-repository.md)
- [理解 Git 基础和术语](./understanding-git-basics-and-terminology.md)
- [Git 安装和设置](./git-installation-and-setup.md)
- [官方 Git 教程](https://git-scm.com/docs/gittutorial)
- [Pro Git 书籍 - Git 基础](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)