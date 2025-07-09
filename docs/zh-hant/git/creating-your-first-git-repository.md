# 創建你的第一個 Git 倉庫

## 介紹

現在你已經了解了 Git 基礎和術語，是時候創建你的第一個 Git 倉庫了。本教程將指導你完成初始化新 Git 倉庫的過程，理解目錄結構，並為版本控制設置你的第一個項目。

在本教程結束時，你將擁有一個功能完善的 Git 倉庫，並了解如何開始跟蹤你的項目文件。

## 前提條件

在開始本教程之前，請確保你已經：
- 在系統上安裝了 Git（[Git 安裝和設置](./git-installation-and-setup.md)）
- 對 Git 概念有基本了解（[理解 Git 基礎和術語](./understanding-git-basics-and-terminology.md)）
- 有一個你選擇的文本編輯器或 IDE
- 具備基本的命令行知識

## 創建 Git 倉庫的兩種方法

創建 Git 倉庫有兩種主要方法：

1. 在現有目錄中**初始化新倉庫**
2. 從遠程位置**克隆現有倉庫**

本教程重點介紹第一種方法。克隆將在後續關於遠程倉庫的教程中介紹。

## 方法 1：初始化新倉庫

### 步驟 1：創建項目目錄

首先，為你的項目創建一個新目錄：

```bash
# 創建一個新目錄
mkdir my-first-git-project

# 導航到該目錄
cd my-first-git-project
```

### 步驟 2：初始化 Git 倉庫

在你的項目目錄中初始化 Git：

```bash
git init
```

你應該會看到類似以下的輸出：
```
Initialized empty Git repository in /path/to/my-first-git-project/.git/
```

**剛剛發生了什麼？**
- Git 在你的項目文件夾中創建了一個隱藏的 `.git` 目錄
- 這個 `.git` 目錄包含所有 Git 元數據和對象數據庫
- 你的目錄現在是一個 Git 倉庫（但是空的）

### 步驟 3：驗證倉庫創建

檢查 Git 在你的目錄中是否正常工作：

```bash
git status
```

你應該會看到：
```
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

這確認了：
- 你在 `main` 分支上
- 還沒有提交
- 沒有被跟蹤的文件

## 理解 .git 目錄

`.git` 目錄包含所有 Git 倉庫數據。讓我們探索它的結構：

```bash
ls -la .git/
```

你會看到類似這樣的目錄和文件：
- `config` - 倉庫配置
- `description` - 倉庫描述（由 GitWeb 使用）
- `HEAD` - 指向當前分支
- `hooks/` - Git 鉤子（腳本）目錄
- `info/` - 額外的倉庫信息
- `objects/` - Git 對象數據庫
- `refs/` - 引用（分支，標籤）

**重要**：除非你確切知道自己在做什麼，否則不要手動編輯 `.git` 目錄中的文件！

## 創建你的第一個文件

### 步驟 1：創建 README 文件

為你的項目創建一個 README 文件：

```bash
echo "# My First Git Project" > README.md
```

或者使用你的文本編輯器創建：

```markdown
# My First Git Project

This is my first project using Git version control.

## Features

- Learning Git basics
- Understanding version control
- Building good development habits

## Getting Started

This project demonstrates basic Git workflow and commands.
```

### 步驟 2：創建其他文件

讓我們創建更多文件，使我們的項目更有趣：

```bash
# 創建一個簡單的 Python 腳本
cat > hello.py << 'EOF'
#!/usr/bin/env python3

def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("World"))
EOF

# 創建一個簡單的文本文件
echo "This is a sample text file for Git practice." > sample.txt

# 創建一個項目配置文件
cat > config.json << 'EOF'
{
  "project": "my-first-git-project",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Learning Git version control"
}
EOF
```

### 步驟 3：檢查倉庫狀態

現在檢查 Git 看到了什麼：

```bash
git status
```

你應該會看到：
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

**理解輸出：**
- `Untracked files` - Git 當前沒有跟蹤的文件
- Git 建議使用 `git add` 開始跟蹤這些文件

## Git 中的文件狀態

Git 將文件分為不同的狀態：

### 1. 未跟蹤
- 存在於你的工作目錄但未被 Git 跟蹤的文件
- 新文件屬於這一類別

### 2. 已跟蹤
Git 已知的文件，可以是：
- **未修改** - 自上次提交以來沒有變化
- **已修改** - 已更改但未暫存
- **已暫存** - 已標記為下次提交的更改

## 基本 Git 配置（可選）

在提交之前，你可能想用你的身份配置 Git：

```bash
# 設置你的姓名和郵箱（如果沒有全局設置）
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 查看當前配置
git config --list
```

## 倉庫特定配置

你也可以為這個倉庫設置特定配置：

```bash
# 設置倉庫特定配置
git config user.name "Project Specific Name"
git config user.email "project@example.com"

# 查看倉庫配置
git config --local --list
```

## 創建 .gitignore 文件

創建一個 `.gitignore` 文件來指定 Git 應該忽略的文件：

```bash
cat > .gitignore << 'EOF'
# Ignore compiled Python files
*.pyc
__pycache__/

# Ignore temporary files
*.tmp
*.temp

# Ignore log files
*.log

# Ignore IDE files
.vscode/
.idea/
*.swp
*.swo

# Ignore OS-specific files
.DS_Store
Thumbs.db
EOF
```

### 為什麼使用 .gitignore？
- 防止跟蹤臨時文件
- 保持倉庫整潔
- 減少 `git status` 中的噪音
- 防止意外提交敏感數據

## 理解 Git 倉庫結構

你的項目現在有這樣的結構：

```
my-first-git-project/
├── .git/                 # Git 倉庫數據（隱藏）
├── .gitignore           # 要忽略的文件
├── README.md            # 項目文檔
├── config.json          # 配置文件
├── hello.py             # Python 腳本
└── sample.txt           # 示例文本文件
```

## 再次檢查倉庫狀態

讓我們看看我們的倉庫現在是什麼樣子：

```bash
git status
```

你應該會看到：
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

## 倉庫創建的最佳實踐

### 1. 儘早初始化
從項目一開始就使用 Git，而不是在你已經寫了大量代碼之後。

### 2. 創建一個好的 README
始終包含一個 README 文件，解釋：
- 項目做什麼
- 如何安裝/運行它
- 如何貢獻

### 3. 從一開始就使用 .gitignore
儘早設置 `.gitignore` 以避免跟蹤不必要的文件。

### 4. 選擇有意義的目錄名
為你的項目目錄使用描述性名稱。

### 5. 保持倉庫根目錄整潔
不要在根目錄中放置太多文件。

## 要避免的常見錯誤

### 1. 不要在你的主目錄中初始化 Git
```bash
# 不要這樣做
cd ~
git init
```

### 2. 不要刪除 .git 目錄
刪除 `.git` 會破壞所有 Git 歷史。

### 3. 不要在另一個 Git 倉庫內初始化 Git
這可能導致混淆和衝突。

### 4. 不要跟蹤大型二進制文件
對於大文件，請使用 Git LFS。

## 方法 2：使用文件初始化

如果你已經在目錄中有文件，可以在那裡初始化 Git：

```bash
# 導航到現有項目
cd existing-project

# 初始化 Git
git init

# 文件現在未被跟蹤，準備添加
git status
```

## 常見問題排除

### 問題："Not a git repository"
**解決方案**：確保你在正確的目錄中並且已運行 `git init`。

### 問題：Permission Denied
**解決方案**：檢查文件權限並確保你對目錄有寫入權限。

### 問題：Repository Already Exists
**解決方案**：如果你看到 "Reinitialized existing Git repository"，Git 檢測到了現有的 `.git` 目錄。

## 總結

你已成功創建了你的第一個 Git 倉庫！以下是你完成的內容：

1. **創建了項目目錄**並初始化了 Git
2. **了解了 .git 目錄**的結構和用途
3. **創建了項目文件**，包括 README、代碼和配置
4. **設置了 .gitignore**以排除不必要的文件
5. **了解了 Git 中的文件狀態**（已跟蹤與未跟蹤）
6. **為你的倉庫配置了 Git**

### 使用的關鍵命令：
- `git init` - 初始化新倉庫
- `git status` - 檢查倉庫狀態
- `git config` - 配置 Git 設置

### 當前倉庫狀態：
- ✅ 倉庫已初始化
- ✅ 文件已創建
- ✅ .gitignore 已配置
- ⏳ 文件未被跟蹤（準備暫存）

## 下一步

現在你已經有了一個帶有文件的倉庫，你已準備好學習基本的 Git 工作流程：

1. **將文件添加到暫存區**（git add）
2. **提交更改**（git commit）
3. **推送到遠程倉庫**（git push）

繼續閱讀：[基本 Git 工作流程：添加、提交、推送](./basic-git-workflow-add-commit-push.md)

## 相關資源

- [理解 Git 基礎和術語](./understanding-git-basics-and-terminology.md)
- [Git 安裝和設置](./git-installation-and-setup.md)
- [Git 在不同項目中使用不同配置](./git-using-different-config-in-different-projects.md)
- [官方 Git 教程](https://git-scm.com/docs/gittutorial)
- [Pro Git 書籍 - 入門](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)