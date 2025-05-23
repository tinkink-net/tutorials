# 使用VSCode 時間線/本地文件歷史功能防止誤刪文件

在代碼開發中，最恐怖的事情莫過於誤刪文件了。有時候可能只是一個彈框點錯了按鈕，或者 git 操作失誤，辛苦幾天的勞動成果就不見了。

如果有一個功能能夠將保存過的代碼的每一個版本都記錄到本地，可以隨時找回來，這樣就不用擔心誤刪文件導致損失了。

在 VSCode 中，以前需要通過安裝插件來實現（例如 Local History 插件），但在 1.44 版本之後，VSCode 內置了時間線（Timeline）功能。本文就來看看如何使用時間線功能防止誤刪文件造成損失。

## 使用方法

當打開一個代碼文件之後，在左側的文件面板下方，將出來一個“TIMELINE”面板，這個面板就是時間線。

![TIMELINE面板](/attachments/vscode/timeline-local-history-usage/01.panel.png)

當文件被修改和保存之後，時間線中就會出現一個新的節點，這個節點就是代碼文件的歷史版本。

![歷史版本記錄](/attachments/vscode/timeline-local-history-usage/02.timeline-versions.png)

> 除了“保存”之外，Git提交、文件重命名等操作，也會作爲一個版本顯示在面板中。

點擊某個版本，將出現它與當前文件的對比界面，可以直觀看到從歷史版本到最新版本產生了哪些變化。

右鍵點擊某個版本，可以看到有一系列菜單：

![歷史版本記錄](/attachments/vscode/timeline-local-history-usage/03.context-menu.png)

這些菜單分別是（以 Mac 系統爲例）：

- Compare with File 與當前文件版本對比
- Compare with Previous 與上一個版本對比
- Select for Compare 將當前版本選中作爲一個對比版本（可以文件樹或者 TIMELINE 面板再選中一個，兩個版本進行對比）
- Show Contents 顯示選中的版本內容
- Restore Contents 恢復選中的版本內容
- Reveal in Finder 在文件管理器中展示選中的版本的文件
- Rename 重命名選中版本
- Delete 刪除選中版本

點擊 TIMELINE 面板右側的篩選按鈕，可以選擇面板中顯示的記錄類型，目前包括本地文件記錄和 Git 提交記錄，可以按需顯示。

如果只勾選 Git 提交記錄，則相當於在查看文件的 Git 提交歷史，非常方便。

## 找回被誤刪除文件

如果一個文件被誤刪除了，那麼它在 VSCode 中將無法被顯示、打開，因而也就無法在 TIMELINE 面板中找到它。但實際上，雖然文件被誤刪除了，但是它的歷史版本還是保留在本地的。

要恢復被刪除的檔案，你可以簡單地在同一目錄下創建一個同名的新檔案，然後打開 TIMELINE 面板。被刪除的檔案將出現在 TIMELINE 面板中，你可以通過右鍵點擊它來恢復。

就是這樣！被刪除的檔案已經恢復了。但如果你不記得你刪除的檔案的名稱，找到它可能會有點棘手。

我們可以先找到一個檔案，同一專案中任何檔案的任何版本都可以。然後通過右鍵點擊它在檔案管理器中打開所選版本檔案，這樣我們就可以找到 VSCode 保存歷史版本的資料夾。例如，在 Mac 系統上，路徑如下。

```
/Users/xxx/Library/Application Support/Code/User/History/61e8902
```

往上一級，即`History`目錄即是所有的歷史版本存放的目錄，因此我們只需要在裏面按照關鍵詞搜索即可找到對應的文件。

例如我們要找關鍵詞`DbConnection`，搜索的命令可參考：

```sh
# Mac / Linux
grep -r DbConnection "/Users/xxx/Library/Application Support/Code/User/History"

# Windows
findstr /s /i DbConnection "C:\Users\xxx\AppData\Roaming\Code\User\History"
```

搜索到結果之後，就能打開對應的文件，一一進行確認，找到我們需要的版本了。

## 小結

時間線（Timeline）是一個簡單而又方便的功能，有了它以後不需要其他插件就可以保存所有的文件歷史記錄，再也不用擔心誤刪文件導致損失代碼了。
