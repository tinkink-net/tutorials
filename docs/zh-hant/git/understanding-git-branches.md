# 理解 Git 分支

Git 分支是 Git 版本控制系統最強大的功能之一。它們允許您從主開發線分離出來，在不影響主程式碼庫的情況下處理不同的功能、錯誤修復或實驗。

## 什麼是 Git 分支？

Git 中的分支本質上是指向特定提交的可移動指標。當您建立新分支時，Git 會建立一個指向當前所在提交的新指標。大多數 Git 儲存庫中的預設分支稱為 `main`（在較舊的儲存庫中為 `master`）。

可以將分支想像成程式碼的平行宇宙 - 您可以同時處理不同的功能，而它們不會相互干擾。

## 為什麼使用分支？

### 1. **並行開發**
多個開發人員可以同時處理不同的功能而不會發生衝突。

### 2. **功能隔離**
每個功能都可以獨立開發，更容易測試和除錯。

### 3. **安全實驗**
您可以嘗試新想法而不會破壞主程式碼庫的風險。

### 4. **程式碼審查**
分支透過拉取/合併請求實現適當的程式碼審查流程。

## 基本分支操作

### 檢視分支

要檢視儲存庫中的所有分支：

```bash
# 列出所有本地分支
git branch

# 列出所有分支（本地和遠端）
git branch -a

# 僅列出遠端分支
git branch -r
```

目前分支將用星號 (*) 標出。

### 建立新分支

有幾種建立新分支的方法：

```bash
# 建立新分支但保持在目前分支
git branch feature-login

# 建立並切換到新分支
git checkout -b feature-login

# 現代方式：建立並切換到新分支
git switch -c feature-login
```

### 在分支間切換

```bash
# 切換到現有分支（傳統方式）
git checkout main

# 切換到現有分支（現代方式）
git switch main
```

### 分支命名約定

好的分支名稱是描述性的，遵循一致的模式：

```bash
# 功能分支
git branch feature/user-authentication
git branch feature/shopping-cart
git branch feat/add-payment-gateway

# 錯誤修復分支
git branch bugfix/login-error
git branch fix/navbar-responsive
git branch hotfix/security-patch

# 發布分支
git branch release/v1.2.0
git branch release/2024-01-15
```

## 使用分支

### 在分支上做更改

1. **切換到您的分支**：
```bash
git switch feature-login
```

2. **進行更改**並提交：
```bash
# 編輯檔案
echo "Login functionality" > login.js

# 暫存更改
git add login.js

# 提交更改
git commit -m "Add basic login functionality"
```

3. **將分支推送到遠端**：
```bash
# 首次推送新分支
git push -u origin feature-login

# 後續推送
git push
```

### 追蹤遠端分支

與遠端儲存庫工作時：

```bash
# 從遠端獲取最新更改
git fetch origin

# 建立追蹤遠端分支的本地分支
git checkout -b feature-login origin/feature-login

# 或使用現代語法
git switch -c feature-login origin/feature-login
```

## 分支狀態和資訊

### 檢查分支狀態

```bash
# 顯示目前分支和未提交的更改
git status

# 顯示分支提交歷史
git log --oneline

# 顯示分支差異
git diff main..feature-login
```

### 比較分支

```bash
# 檢視 feature-login 中有而 main 中沒有的提交
git log main..feature-login

# 檢視分支間的檔案差異
git diff main feature-login

# 僅檢視更改的檔案名
git diff --name-only main feature-login
```

## 分支管理最佳實踐

### 1. **保持分支短壽命**
為特定功能或修復建立分支，並快速將其合併回去。

### 2. **定期更新**
保持您的功能分支與主分支的最新更改同步：

```bash
# 切換到 main 並拉取最新更改
git switch main
git pull origin main

# 切換回功能分支並合併 main
git switch feature-login
git merge main
```

### 3. **清理分支**
合併後刪除分支：

```bash
# 刪除本地分支
git branch -d feature-login

# 刪除遠端分支
git push origin --delete feature-login
```

### 4. **使用描述性名稱**
分支名稱應清楚表明分支的用途。

## 常見分支場景

### 場景 1：功能開發

```bash
# 從 main 開始
git switch main
git pull origin main

# 建立功能分支
git switch -c feature/user-profile

# 處理功能
echo "Profile page" > profile.html
git add profile.html
git commit -m "Add user profile page"

# 推送到遠端
git push -u origin feature/user-profile
```

### 場景 2：錯誤修復

```bash
# 從 main 建立錯誤修復分支
git switch main
git switch -c bugfix/navbar-mobile

# 修復錯誤
echo "Fixed navbar" > navbar.css
git add navbar.css
git commit -m "Fix navbar responsiveness on mobile"

# 推送並建立拉取請求
git push -u origin bugfix/navbar-mobile
```

### 場景 3：緊急熱修復

```bash
# 從 main 建立熱修復分支
git switch main
git switch -c hotfix/security-patch

# 應用緊急修復
echo "Security update" > security.js
git add security.js
git commit -m "Apply security patch for user authentication"

# 推送以便立即合併
git push -u origin hotfix/security-patch
```

## 常見問題疑難排解

### 問題：由於未提交的更改無法切換分支

```bash
# 選項 1：暫時儲存更改
git stash
git switch other-branch
git stash pop

# 選項 2：先提交更改
git add .
git commit -m "WIP: temporary commit"
git switch other-branch
```

### 問題：分支與遠端分歧

```bash
# 強制推送（謹慎使用）
git push --force-with-lease

# 或建立新分支
git switch -c feature-login-fixed
git push -u origin feature-login-fixed
```

## 進階分支命令

### 互動式分支建立

```bash
# 從特定提交建立分支
git branch feature-login abc123

# 從標籤建立分支
git branch release-branch v1.0.0

# 建立孤立分支（無提交歷史）
git checkout --orphan gh-pages
```

### 分支資訊

```bash
# 顯示每個分支的最後提交
git branch -v

# 顯示已合併的分支
git branch --merged main

# 顯示未合併的分支
git branch --no-merged main
```

## 下一步

現在您了解了 Git 分支，應該學習：

1. **合併分支** - 如何合併來自不同分支的更改
2. **解決合併衝突** - 合併時處理衝突
3. **拉取請求** - 程式碼審查的協作工作流程
4. **Git Rebase** - 合併的替代方案，獲得更清潔的歷史

## 結論

Git 分支對於任何開發工作流程都是必不可少的。它們提供了同時處理多個功能的靈活性，同時保持主程式碼庫穩定。練習建立分支、進行更改和在它們之間切換，以熟悉這個強大的 Git 功能。

記住：在 Git 中分支是廉價且快速的，所以不要猶豫為您正在做的任何新工作自由建立它們！