# 理解 Git 分支

Git 分支是 Git 版本控制系统最强大的功能之一。它们允许您从主开发线分离出来，在不影响主代码库的情况下处理不同的功能、错误修复或实验。

## 什么是 Git 分支？

Git 中的分支本质上是指向特定提交的可移动指针。当您创建新分支时，Git 会创建一个指向当前所在提交的新指针。大多数 Git 仓库中的默认分支称为 `main`（在较旧的仓库中为 `master`）。

可以将分支想象成代码的平行宇宙 - 您可以同时处理不同的功能，而它们不会相互干扰。

## 为什么使用分支？

### 1. **并行开发**
多个开发人员可以同时处理不同的功能而不会发生冲突。

### 2. **功能隔离**
每个功能都可以独立开发，更容易测试和调试。

### 3. **安全实验**
您可以尝试新想法而不会破坏主代码库的风险。

### 4. **代码审查**
分支通过拉取/合并请求实现适当的代码审查流程。

## 基本分支操作

### 查看分支

要查看仓库中的所有分支：

```bash
# 列出所有本地分支
git branch

# 列出所有分支（本地和远程）
git branch -a

# 仅列出远程分支
git branch -r
```

当前分支将用星号 (*) 标出。

### 创建新分支

有几种创建新分支的方法：

```bash
# 创建新分支但保持在当前分支
git branch feature-login

# 创建并切换到新分支
git checkout -b feature-login

# 现代方式：创建并切换到新分支
git switch -c feature-login
```

### 在分支间切换

```bash
# 切换到现有分支（传统方式）
git checkout main

# 切换到现有分支（现代方式）
git switch main
```

### 分支命名约定

好的分支名称是描述性的，遵循一致的模式：

```bash
# 功能分支
git branch feature/user-authentication
git branch feature/shopping-cart
git branch feat/add-payment-gateway

# 错误修复分支
git branch bugfix/login-error
git branch fix/navbar-responsive
git branch hotfix/security-patch

# 发布分支
git branch release/v1.2.0
git branch release/2024-01-15
```

## 使用分支

### 在分支上做更改

1. **切换到您的分支**：
```bash
git switch feature-login
```

2. **进行更改**并提交：
```bash
# 编辑文件
echo "Login functionality" > login.js

# 暂存更改
git add login.js

# 提交更改
git commit -m "Add basic login functionality"
```

3. **将分支推送到远程**：
```bash
# 首次推送新分支
git push -u origin feature-login

# 后续推送
git push
```

### 跟踪远程分支

与远程仓库工作时：

```bash
# 从远程获取最新更改
git fetch origin

# 创建跟踪远程分支的本地分支
git checkout -b feature-login origin/feature-login

# 或使用现代语法
git switch -c feature-login origin/feature-login
```

## 分支状态和信息

### 检查分支状态

```bash
# 显示当前分支和未提交的更改
git status

# 显示分支提交历史
git log --oneline

# 显示分支差异
git diff main..feature-login
```

### 比较分支

```bash
# 查看 feature-login 中有而 main 中没有的提交
git log main..feature-login

# 查看分支间的文件差异
git diff main feature-login

# 仅查看更改的文件名
git diff --name-only main feature-login
```

## 分支管理最佳实践

### 1. **保持分支短寿命**
为特定功能或修复创建分支，并快速将其合并回去。

### 2. **定期更新**
保持您的功能分支与主分支的最新更改同步：

```bash
# 切换到 main 并拉取最新更改
git switch main
git pull origin main

# 切换回功能分支并合并 main
git switch feature-login
git merge main
```

### 3. **清理分支**
合并后删除分支：

```bash
# 删除本地分支
git branch -d feature-login

# 删除远程分支
git push origin --delete feature-login
```

### 4. **使用描述性名称**
分支名称应清楚表明分支的用途。

## 常见分支场景

### 场景 1：功能开发

```bash
# 从 main 开始
git switch main
git pull origin main

# 创建功能分支
git switch -c feature/user-profile

# 处理功能
echo "Profile page" > profile.html
git add profile.html
git commit -m "Add user profile page"

# 推送到远程
git push -u origin feature/user-profile
```

### 场景 2：错误修复

```bash
# 从 main 创建错误修复分支
git switch main
git switch -c bugfix/navbar-mobile

# 修复错误
echo "Fixed navbar" > navbar.css
git add navbar.css
git commit -m "Fix navbar responsiveness on mobile"

# 推送并创建拉取请求
git push -u origin bugfix/navbar-mobile
```

### 场景 3：紧急热修复

```bash
# 从 main 创建热修复分支
git switch main
git switch -c hotfix/security-patch

# 应用紧急修复
echo "Security update" > security.js
git add security.js
git commit -m "Apply security patch for user authentication"

# 推送以便立即合并
git push -u origin hotfix/security-patch
```

## 常见问题疑难解答

### 问题：由于未提交的更改无法切换分支

```bash
# 选项 1：临时存储更改
git stash
git switch other-branch
git stash pop

# 选项 2：先提交更改
git add .
git commit -m "WIP: temporary commit"
git switch other-branch
```

### 问题：分支与远程分歧

```bash
# 强制推送（谨慎使用）
git push --force-with-lease

# 或创建新分支
git switch -c feature-login-fixed
git push -u origin feature-login-fixed
```

## 高级分支命令

### 交互式分支创建

```bash
# 从特定提交创建分支
git branch feature-login abc123

# 从标签创建分支
git branch release-branch v1.0.0

# 创建孤立分支（无提交历史）
git checkout --orphan gh-pages
```

### 分支信息

```bash
# 显示每个分支的最后提交
git branch -v

# 显示已合并的分支
git branch --merged main

# 显示未合并的分支
git branch --no-merged main
```

## 下一步

现在您了解了 Git 分支，应该学习：

1. **合并分支** - 如何合并来自不同分支的更改
2. **解决合并冲突** - 合并时处理冲突
3. **拉取请求** - 代码审查的协作工作流程
4. **Git Rebase** - 合并的替代方案，获得更清洁的历史

## 结论

Git 分支对于任何开发工作流程都是必不可少的。它们提供了同时处理多个功能的灵活性，同时保持主代码库稳定。练习创建分支、进行更改和在它们之间切换，以熟悉这个强大的 Git 功能。

记住：在 Git 中分支是廉价且快速的，所以不要犹豫为您正在做的任何新工作自由创建它们！