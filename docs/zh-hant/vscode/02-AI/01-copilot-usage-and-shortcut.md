# Github Copilot 的使用方法和快捷鍵

## Copilot 是什麼

Copilot (<https://copilot.github.com/>) 是由 Github 提供的AI編碼輔助工具，它可以在編碼過程中提供基於 AI 學習的編碼建議。在很多情況下，只需要有註釋或者函數名稱，Copilot就可以實例完整的代碼。

目前 Copilot 已經不再免費，需要支付10美元/月或者100美元/年。但你可以試用2個月。訪問 Github 設置頁面（<https://github.com/settings/copilot>），按頁面提示點擊按鈕以開通使用權限。當獲得開通權限後，就可以在 Github 上使用 Copilot。

![官網截圖](/attachments/vscode/copilot-usage-and-shortcut/01.website.png)

## 安裝插件

使用 Copilot 時，需要安裝一個插件，在 VSCode 的插件菜單中搜索 `Copilot`，即可找到插件，名字爲 `Github Copilot`，對應的插件市場的地址爲<https://marketplace.visualstudio.com/items?itemName=GitHub.copilot>，安裝即可。

![安裝截圖](/attachments/vscode/copilot-usage-and-shortcut/02.install.png)

安裝後插件會提示要求登錄 Github ，按提示登錄即可。

![登錄截圖](/attachments/vscode/copilot-usage-and-shortcut/03.login.png)

## 使用

正常使用時，當 Copilot 給出建議時，會在光標位置的後方出現建議的代碼，並灰色字顯示。如果不希望使用提示，則繼續輸入代碼即可，如果希望使用提示的代碼，按下 Tab 鍵即可。

![使用截圖](/attachments/vscode/copilot-usage-and-shortcut/04.completion.png)

在 VSCode 中，Copilot 有一個圖標，需要確認狀態是打開的。當它的樣子與其它圖標類似，沒有背景顏色時，表示是開啓的，此時當你編輯代碼文件的時候，Copilot會自動提示代碼建議。當它有背景顏色（紅色、深黃色等）時，表示是關閉的。如果要切換狀態只要點擊它，然後選擇全局（Globally）即可。

![狀態圖標](/attachments/vscode/copilot-usage-and-shortcut/05.icon.png)

## 快捷鍵

Copilot 也提供了一些快捷鍵，可以很方便地使用。

- 接受建議：`Tab`
- 拒絕建議：`Esc`
- 打開Copilot：`Ctrl + Enter` （會打開一個單獨的面板，展示10個建議）
- 下一條建議：`Alt/Option + ]`
- 上一條建議：`Alt/Option + [`
- 觸發行內Copilot：`Alt/Option + \` （Coplit還沒有給出建議或者建議被拒絕了，希望手工觸發它提供建議）

![快捷鍵截圖](/attachments/vscode/copilot-usage-and-shortcut/06.shortcut.jpg)

## Http代理

有些用戶（比如中國大陸的用戶）可能會遇到Copilot不工作的問題，原因是Copilot無法訪問互聯網或Github api。你可以在輸出面板上看到以下錯誤信息：`GitHub Copilot could not connect to server. Extension activation failed: "connect ETIMEDOUT xxx.xxx.xxx:443"`。

在這種情況下，你需要設置http代理。

首先，獲取你的http代理信息。你可以向你的網絡管理員詢問代理地址和端口，或者如果你使用代理軟件，你可以在代理軟件設置中找到代理地址和端口。

下面是一個使用代理軟件"ClashX"的例子，你可以在"設置"標籤中找到代理地址和端口，代理地址是 "127.0.0.1:1080"。

![代理截圖](/attachments/vscode/copilot-usage-and-shortcut/07.proxy.png)

然後，打開VSCode的設置，搜索`http.proxy`，並設置代理地址和端口。

![代理設置截圖](/attachments/vscode/copilot-usage-and-shortcut/08.proxy-settings.png)

設置完成後，重新啓動VSCode，Copilot應該可以正常工作。
