# Git 安装和设置

Git 是一个分布式版本控制系统，可帮助您跟踪代码中的更改，与他人协作，并管理项目的不同版本。本教程将指导您在不同操作系统上安装 Git 并进行初始配置。

## 什么是 Git？

Git 是一个强大的版本控制系统，它：
- 随时间跟踪文件中的更改
- 允许您恢复到以前的版本
- 支持多个开发人员协作
- 管理项目的不同版本（分支）
- 可离线工作并在连接时同步

## 安装 Git

### Windows

#### 选项 1：官方 Git for Windows
1. 访问 [git-scm.com](https://git-scm.com/download/win)
2. 下载最新的 Windows 版本
3. 运行安装程序并遵循以下推荐设置：
   - 选择"从 Windows 命令提示符使用 Git"
   - 选择"检出 Windows 风格，提交 Unix 风格的行尾"
   - 选择"使用 Windows 的默认控制台窗口"

#### 选项 2：使用包管理器 (Chocolatey)
如果您已安装 Chocolatey：
```bash
choco install git
```

#### 选项 3：使用包管理器 (Scoop)
如果您已安装 Scoop：
```bash
scoop install git
```

### macOS

#### 选项 1：使用 Homebrew（推荐）
```bash
brew install git
```

#### 选项 2：使用 MacPorts
```bash
sudo port install git
```

#### 选项 3：Xcode 命令行工具
```bash
xcode-select --install
```

#### 选项 4：官方安装程序
1. 访问 [git-scm.com](https://git-scm.com/download/mac)
2. 下载 macOS 安装程序
3. 运行安装程序并按照说明进行操作

### Linux

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install git
```

#### CentOS/RHEL/Fedora
```bash
# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

#### Arch Linux
```bash
sudo pacman -S git
```

#### OpenSUSE
```bash
sudo zypper install git
```

## 验证安装

安装后，验证 Git 是否正确安装：

```bash
git --version
```

您应该看到类似以下的输出：
```
git version 2.39.0
```

## Git 初始配置

在使用 Git 之前，您需要配置您的身份。此信息将附加到您的提交中。

### 设置您的身份

配置您的姓名和电子邮件地址：

```bash
git config --global user.name "您的全名"
git config --global user.email "your.email@example.com"
```

示例：
```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@example.com"
```

### 设置您的默认编辑器

为 Git 操作配置您首选的文本编辑器：

```bash
# 对于 Visual Studio Code
git config --global core.editor "code --wait"

# 对于 Vim
git config --global core.editor "vim"

# 对于 Nano
git config --global core.editor "nano"

# 对于 Sublime Text
git config --global core.editor "subl -n -w"
```

### 设置默认分支名称

为新仓库设置默认分支名称：

```bash
git config --global init.defaultBranch main
```

### 配置行尾

#### Windows
```bash
git config --global core.autocrlf true
```

#### macOS/Linux
```bash
git config --global core.autocrlf input
```

## 高级配置选项

### 设置别名

为常用的 Git 命令创建快捷方式：

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### 配置推送行为

设置默认推送行为：

```bash
git config --global push.default simple
```

### 设置凭据存储

避免重复输入密码：

#### Windows
```bash
git config --global credential.helper manager-core
```

#### macOS
```bash
git config --global credential.helper osxkeychain
```

#### Linux
```bash
git config --global credential.helper store
```

## 查看您的配置

查看所有 Git 配置设置：

```bash
git config --list
```

查看特定配置值：

```bash
git config user.name
git config user.email
```

查看设置的定义位置：

```bash
git config --show-origin user.name
```

## 配置文件位置

Git 配置存储在三个级别：

1. **系统级**：`/etc/gitconfig`（影响所有用户）
2. **用户级**：`~/.gitconfig` 或 `~/.config/git/config`（影响当前用户）
3. **仓库级**：`.git/config`（仅影响当前仓库）

每个级别会覆盖前一个级别，因此仓库特定设置优先级最高。

## SSH 密钥设置（可选但推荐）

用于与 GitHub 等远程仓库进行安全认证：

### 生成 SSH 密钥
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

### 将 SSH 密钥添加到 SSH 代理
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 复制公钥
```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
xclip -sel clip < ~/.ssh/id_ed25519.pub

# Windows
clip < ~/.ssh/id_ed25519.pub
```

然后将此公钥添加到您的 GitHub/GitLab/Bitbucket 账户。

## 常见问题排查

### 权限拒绝错误
如果遇到权限问题：
```bash
sudo chown -R $(whoami) ~/.gitconfig
```

### HTTPS vs SSH
如果遇到认证问题，您可能需要在 HTTPS 和 SSH 之间切换：
```bash
# 检查当前远程 URL
git remote -v

# 更改为 SSH
git remote set-url origin git@github.com:username/repository.git

# 更改为 HTTPS
git remote set-url origin https://github.com/username/repository.git
```

### 证书问题
如果遇到 SSL 证书错误：
```bash
git config --global http.sslVerify false
```

**注意**：仅将此作为临时解决方案，之后重新启用 SSL 验证。

## 下一步

现在您已经安装并配置了 Git，您可以：
- 创建您的第一个 Git 仓库
- 学习基本的 Git 命令
- 开始跟踪项目中的更改
- 使用 Git 与他人协作

## 总结

在本教程中，您学习了如何：
- 在 Windows、macOS 和 Linux 上安装 Git
- 配置您的 Git 身份和偏好
- 设置 SSH 密钥进行安全认证
- 排查常见安装问题
- 了解 Git 配置层次结构

Git 现在已准备好帮助您跟踪更改、与他人协作并有效管理您的代码。在下一个教程中，我们将探索 Git 基础知识和术语，为您打下基础。