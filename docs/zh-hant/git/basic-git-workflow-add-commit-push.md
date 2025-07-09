# Git 基本工作流程：添加、提交、推送

## 介紹

現在你已經創建了你的第一個 Git 倉庫並理解了基本概念，是時候學習基本的 Git 工作流程了。這個工作流程構成了日常 Git 使用的骨幹，由三個主要步驟組成：**添加（Add）**、**提交（Commit）**和**推送（Push）**。

本教程將指導你完成這些基本操作，幫助你理解如何跟蹤更改、保存工作快照以及與他人共享代碼。

## 前提條件

在開始本教程之前，請確保你：
- 已創建 Git 倉庫（[創建你的第一個 Git 倉庫](./creating-your-first-git-repository.md)）
- 對 Git 概念有基本了解（[理解 Git 基礎和術語](./understanding-git-basics-and-terminology.md)）
- 在你的倉庫中有一些文件可以操作

## 基本 Git 工作流程

標準的 Git 工作流程遵循以下步驟：

```
1. 在工作目錄中修改文件
2. 暫存更改 (git add)
3. 提交更改 (git commit)
4. 推送到遠程倉庫 (git push)
```

讓我們詳細探討每個步驟。

## 步驟 1：了解當前狀態

在進行任何更改之前，讓我們檢查倉庫的當前狀態：

```bash
git status
```

你應該會看到類似這樣的內容：
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

這表明：
- 當前分支：`main`
- 尚無提交
- 有幾個未跟蹤的文件

## 步驟 2：將文件添加到暫存區 (git add)

`git add` 命令將文件從工作目錄移動到暫存區。這是你準備下一次提交的地方。

### 添加單個文件

逐個添加文件：

```bash
# 添加 README 文件
git add README.md

# 檢查狀態
git status
```

你應該會看到：
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

**注意區別：**
- `README.md` 現在位於"Changes to be committed"（已暫存）下
- 其他文件仍然是"Untracked"（未跟蹤）

### 添加多個文件

一次添加多個文件：

```bash
# 添加多個特定文件
git add hello.py config.json

# 或添加當前目錄中的所有文件
git add .

# 檢查狀態
git status
```

添加所有文件後：
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

### 常見的 git add 模式

```bash
# 添加所有文件
git add .

# 添加當前目錄和子目錄中的所有文件
git add -A

# 僅添加已修改的文件（不包括新文件）
git add -u

# 交互式添加文件
git add -i

# 添加特定類型的文件
git add *.py
git add *.md
```

### 理解暫存區

暫存區允許你：
- **精確構建提交** - 精確選擇每次提交中包含的內容
- **審查更改** - 在提交前查看將要提交的內容
- **拆分更改** - 分別提交相關的更改

## 步驟 3：進行你的第一次提交 (git commit)

提交會創建已暫存更改的快照。每次提交應該代表一個邏輯工作單元。

### 基本提交命令

```bash
git commit -m "Initial commit: Add project files"
```

你應該會看到類似這樣的輸出：
```
[main (root-commit) a1b2c3d] Initial commit: Add project files
 5 files changed, 23 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 config.json
 create mode 100755 hello.py
 create mode 100644 sample.txt
```

**理解輸出：**
- `main` - 當前分支
- `root-commit` - 這是第一次提交
- `a1b2c3d` - 短提交哈希
- `5 files changed, 23 insertions(+)` - 更改摘要

### 提交信息最佳實踐

良好的提交信息對項目維護至關重要：

#### 結構
```
簡短摘要（50個字符或更少）

如果需要，可以添加更詳細的解釋。在72個字符處換行。
解釋做了什麼和為什麼，而不是如何做。

- 使用項目符號列出多項更改
- 如果適用，引用問題編號
```

#### 良好提交信息的示例
```bash
# 好 - 清晰簡潔
git commit -m "添加用戶認證系統"

# 好 - 解釋原因
git commit -m "修復阻止密碼重置的登錄錯誤"

# 好 - 多行提交
git commit -m "實現用戶資料編輯功能

- 添加表單驗證
- 更新用戶模型
- 添加個人資料圖片上傳
- 修復移動端樣式問題"
```

#### 不良提交信息的示例
```bash
# 差 - 太模糊
git commit -m "修復東西"

# 差 - 不具描述性
git commit -m "更新"

# 差 - 摘要太長
git commit -m "此提交添加了新的用戶認證系統，允許用戶使用電子郵件驗證和密碼重置功能登錄和註冊賬戶"
```

### 替代提交方法

#### 使用默認編輯器
```bash
# 打開默認編輯器編寫提交信息
git commit
```

#### 提交所有更改
```bash
# 暫存並提交所有已跟蹤文件
git commit -a -m "更新所有已跟蹤文件"
```

## 步驟 4：查看提交歷史

提交後，你可以查看倉庫的歷史記錄：

```bash
# 查看提交歷史
git log
```

輸出：
```
commit a1b2c3d4e5f6789... (HEAD -> main)
Author: Your Name <your.email@example.com>
Date:   Wed Jul 9 10:30:00 2025 +0000

    Initial commit: Add project files
```

### 有用的 git log 選項

```bash
# 緊湊的單行格式
git log --oneline

# 顯示最後3次提交
git log -3

# 顯示帶文件更改的提交
git log --stat

# 顯示帶實際更改的提交
git log -p

# 圖形化表示
git log --graph --oneline
```

## 進行額外更改

讓我們通過一些更改來練習工作流程：

### 步驟 1：修改文件

編輯 README.md 文件：

```bash
echo "

## Recent Updates

- Added basic project structure
- Created initial configuration
- Set up Git repository" >> README.md
```

### 步驟 2：檢查狀態

```bash
git status
```

你應該會看到：
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

no changes added to commit (use "git add" and commit)
```

### 步驟 3：查看更改

查看更改內容：

```bash
git diff
```

這會顯示工作目錄與最後一次提交之間的差異。

### 步驟 4：暫存和提交

```bash
# 暫存更改
git add README.md

# 提交更改
git commit -m "Update README with project status"
```

## 理解文件狀態

Git 中的文件經歷不同的狀態：

```
未跟蹤 → 已暫存 → 已提交
   ↓        ↓        ↓
git add → git commit → git push
```

### 文件狀態示例

```bash
# 檢查詳細狀態
git status

# 查看簡短狀態
git status -s
```

簡短狀態符號：
- `??` - 未跟蹤文件
- `A` - 已添加（已暫存）
- `M` - 已修改
- `D` - 已刪除
- `R` - 已重命名

## 步驟 5：設置遠程倉庫

要推送你的更改，你需要一個遠程倉庫。讓我們設置一個遠程倉庫：

### 使用 GitHub（示例）

1. 在 GitHub 上創建一個新倉庫
2. 複製倉庫 URL
3. 將其添加為遠程倉庫：

```bash
# 添加遠程倉庫
git remote add origin https://github.com/yourusername/my-first-git-project.git

# 驗證遠程倉庫
git remote -v
```

### 使用 GitLab 或其他服務

過程類似：
```bash
# GitLab 示例
git remote add origin https://gitlab.com/yourusername/my-first-git-project.git

# 自託管 Git 服務器
git remote add origin user@server:/path/to/repo.git
```

## 步驟 6：推送到遠程倉庫 (git push)

將你的提交推送到遠程倉庫：

```bash
# 推送到遠程倉庫
git push -u origin main
```

`-u` 標誌設置本地 `main` 分支與遠程 `main` 分支之間的跟蹤關係。

### 理解推送輸出

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

### 未來的推送

在使用 `-u` 進行初始推送後，你可以簡單地使用：

```bash
git push
```

## 完整工作流程示例

以下是 Git 工作流程的完整示例：

```bash
# 1. 進行更改
echo "print('Hello, Git!')" > new_script.py

# 2. 檢查狀態
git status

# 3. 暫存更改
git add new_script.py

# 4. 提交更改
git commit -m "Add new Python script"

# 5. 推送到遠程
git push
```

## 常見 Git 工作流程模式

### 功能開發工作流程
```bash
# 開始開發功能
git status
# ... 進行更改 ...
git add .
git commit -m "實現功能 X"
git push
```

### 錯誤修復工作流程
```bash
# 修復錯誤
git status
# ... 修復錯誤 ...
git add -u  # 僅添加已修改的文件
git commit -m "修復用戶認證中的錯誤"
git push
```

### 常規開發工作流程
```bash
# 日常開發週期
git status
# ... 編寫代碼 ...
git add .
git commit -m "添加用戶資料驗證"
# ... 更多工作 ...
git add .
git commit -m "更新錯誤處理"
git push
```

## 最佳實踐

### 1. 經常提交
- 進行小而集中的提交
- 將相關更改一起提交
- 不要在提交之間等待太久

### 2. 編寫良好的提交信息
- 使用現在時態（"添加功能"而不是"已添加功能"）
- 保持第一行不超過50個字符
- 解釋為什麼，而不僅僅是做了什麼

### 3. 提交前審查
```bash
# 始終檢查你要提交的內容
git status
git diff --staged
```

### 4. 有效使用暫存區
- 只暫存相關更改
- 使用 `git add -p` 進行部分文件暫存
- 在提交前審查已暫存的更改

## 常見問題排查

### 問題："Nothing to commit"（沒有可提交的內容）
**原因**：沒有為提交暫存任何更改。
**解決方案**：先使用 `git add` 暫存更改。

### 問題："Repository not found"（找不到倉庫）
**原因**：遠程倉庫 URL 不正確。
**解決方案**：使用 `git remote -v` 檢查遠程 URL。

### 問題："Authentication failed"（認證失敗）
**原因**：憑據或權限不正確。
**解決方案**：驗證你的用戶名/密碼或 SSH 密鑰。

### 問題："Uncommitted changes"（未提交的更改）
**原因**：嘗試推送時有未提交的更改。
**解決方案**：先提交或暫存更改。

## 有用命令總結

### 狀態和信息
```bash
git status          # 檢查倉庫狀態
git log             # 查看提交歷史
git diff            # 顯示更改
git remote -v       # 顯示遠程倉庫
```

### 暫存和提交
```bash
git add <file>      # 暫存特定文件
git add .           # 暫存所有文件
git commit -m "msg" # 帶信息提交
git commit -a -m "msg" # 暫存並提交已跟蹤文件
```

### 遠程操作
```bash
git remote add origin <url>  # 添加遠程倉庫
git push -u origin main      # 推送並設置上游
git push                     # 推送到已配置的遠程倉庫
```

## 總結

你已成功學習了基本的 Git 工作流程！以下是你完成的內容：

1. **理解工作流程**：添加 → 提交 → 推送
2. **暫存更改**：使用 `git add` 準備提交
3. **進行提交**：使用 `git commit` 創建快照
4. **設置遠程倉庫**：連接到外部倉庫
5. **推送更改**：使用 `git push` 共享你的工作
6. **最佳實踐**：編寫良好的提交信息和組織工作

### 掌握的關鍵命令：
- `git add` - 暫存要提交的更改
- `git commit` - 創建已暫存更改的快照
- `git push` - 將提交上傳到遠程倉庫
- `git status` - 檢查當前倉庫狀態
- `git log` - 查看提交歷史
- `git diff` - 查看版本之間的更改

### 工作流程模式：
```
編輯文件 → git add → git commit → git push
```

這個基本工作流程構成了所有 Git 使用的基礎。無論你是獨自工作還是與團隊合作，這些命令都將成為你進行版本控制的日常工具。

## 下一步

現在你已經理解了基本的 Git 工作流程，你已準備好探索更高級的主題：

1. [理解 Git 分支](./understanding-git-branches.md)
2. [創建和切換分支](./creating-and-switching-branches.md)
3. [使用遠程倉庫](./working-with-remote-repositories.md)

## 相關資源

- [創建你的第一個 Git 倉庫](./creating-your-first-git-repository.md)
- [理解 Git 基礎和術語](./understanding-git-basics-and-terminology.md)
- [Git 安裝和設置](./git-installation-and-setup.md)
- [官方 Git 教程](https://git-scm.com/docs/gittutorial)
- [Pro Git 書籍 - Git 基礎](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)