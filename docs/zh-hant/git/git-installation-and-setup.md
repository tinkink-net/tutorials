# Git 安裝和設置

Git 是一個分佈式版本控制系統，可幫助您跟蹤代碼中的更改，與他人協作，並管理項目的不同版本。本教程將指導您在不同操作系統上安裝 Git 並進行初始配置。

## 什麼是 Git？

Git 是一個強大的版本控制系統，它：
- 隨時間跟蹤文件中的更改
- 允許您恢復到以前的版本
- 支持多個開發人員協作
- 管理項目的不同版本（分支）
- 可離線工作並在連接時同步

## 安裝 Git

### Windows

#### 選項 1：官方 Git for Windows
1. 訪問 [git-scm.com](https://git-scm.com/download/win)
2. 下載最新的 Windows 版本
3. 運行安裝程序並遵循以下推薦設置：
   - 選擇"從 Windows 命令提示符使用 Git"
   - 選擇"檢出 Windows 風格，提交 Unix 風格的行尾"
   - 選擇"使用 Windows 的默認控制台窗口"

#### 選項 2：使用包管理器 (Chocolatey)
如果您已安裝 Chocolatey：
```bash
choco install git
```

#### 選項 3：使用包管理器 (Scoop)
如果您已安裝 Scoop：
```bash
scoop install git
```

### macOS

#### 選項 1：使用 Homebrew（推薦）
```bash
brew install git
```

#### 選項 2：使用 MacPorts
```bash
sudo port install git
```

#### 選項 3：Xcode 命令行工具
```bash
xcode-select --install
```

#### 選項 4：官方安裝程序
1. 訪問 [git-scm.com](https://git-scm.com/download/mac)
2. 下載 macOS 安裝程序
3. 運行安裝程序並按照說明進行操作

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

## 驗證安裝

安裝後，驗證 Git 是否正確安裝：

```bash
git --version
```

您應該看到類似以下的輸出：
```
git version 2.39.0
```

## Git 初始配置

在使用 Git 之前，您需要配置您的身份。此信息將附加到您的提交中。

### 設置您的身份

配置您的姓名和電子郵件地址：

```bash
git config --global user.name "您的全名"
git config --global user.email "your.email@example.com"
```

示例：
```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@example.com"
```

### 設置您的默認編輯器

為 Git 操作配置您首選的文本編輯器：

```bash
# 對於 Visual Studio Code
git config --global core.editor "code --wait"

# 對於 Vim
git config --global core.editor "vim"

# 對於 Nano
git config --global core.editor "nano"

# 對於 Sublime Text
git config --global core.editor "subl -n -w"
```

### 設置默認分支名稱

為新倉庫設置默認分支名稱：

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

## 高級配置選項

### 設置別名

為常用的 Git 命令創建快捷方式：

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### 配置推送行為

設置默認推送行為：

```bash
git config --global push.default simple
```

### 設置憑據存儲

避免重複輸入密碼：

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

查看所有 Git 配置設置：

```bash
git config --list
```

查看特定配置值：

```bash
git config user.name
git config user.email
```

查看設置的定義位置：

```bash
git config --show-origin user.name
```

## 配置文件位置

Git 配置存儲在三個級別：

1. **系統級**：`/etc/gitconfig`（影響所有用戶）
2. **用戶級**：`~/.gitconfig` 或 `~/.config/git/config`（影響當前用戶）
3. **倉庫級**：`.git/config`（僅影響當前倉庫）

每個級別會覆蓋前一個級別，因此倉庫特定設置優先級最高。

## SSH 密鑰設置（可選但推薦）

用於與 GitHub 等遠程倉庫進行安全認證：

### 生成 SSH 密鑰
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

### 將 SSH 密鑰添加到 SSH 代理
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 複製公鑰
```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
xclip -sel clip < ~/.ssh/id_ed25519.pub

# Windows
clip < ~/.ssh/id_ed25519.pub
```

然後將此公鑰添加到您的 GitHub/GitLab/Bitbucket 賬戶。

## 常見問題排查

### 權限拒絕錯誤
如果遇到權限問題：
```bash
sudo chown -R $(whoami) ~/.gitconfig
```

### HTTPS vs SSH
如果遇到認證問題，您可能需要在 HTTPS 和 SSH 之間切換：
```bash
# 檢查當前遠程 URL
git remote -v

# 更改為 SSH
git remote set-url origin git@github.com:username/repository.git

# 更改為 HTTPS
git remote set-url origin https://github.com/username/repository.git
```

### 證書問題
如果遇到 SSL 證書錯誤：
```bash
git config --global http.sslVerify false
```

**注意**：僅將此作為臨時解決方案，之後重新啟用 SSL 驗證。

## 下一步

現在您已經安裝並配置了 Git，您可以：
- 創建您的第一個 Git 倉庫
- 學習基本的 Git 命令
- 開始跟蹤項目中的更改
- 使用 Git 與他人協作

## 總結

在本教程中，您學習了如何：
- 在 Windows、macOS 和 Linux 上安裝 Git
- 配置您的 Git 身份和偏好
- 設置 SSH 密鑰進行安全認證
- 排查常見安裝問題
- 了解 Git 配置層次結構

Git 現在已準備好幫助您跟蹤更改、與他人協作並有效管理您的代碼。在下一個教程中，我們將探索 Git 基礎知識和術語，為您打下基礎。