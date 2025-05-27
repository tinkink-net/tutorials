# 如何使用Github Copilot Chat

## 什麼是Copilot Chat

Copilot (<https://github.com/features/copilot/>) 是由Github提供的AI編碼助手，在編碼過程中提供基於AI學習的編碼建議。在許多情況下，只需要註釋或函數名稱，Copilot就可以生成完整的代碼。

更多信息，請訪問[如何使用Github Copilot和快捷方式](/zh-hant/vscode/copilot-usage-and-shortcut.html)。

Copilot Chat與Copilot相關，它與Copilot共享訂閱，但它們並不是同一樣東西。Copilot Chat是一個可以在VSCode中使用的聊天機器人。您可以使用它與Copilot進行聊天，Copilot將根據您的聊天內容給出代碼建議。例如，您可以向Copilot Chat提問技術問題，或者要求Copilot Chat幫助您編寫代碼。

Copilot Chat與Copilot的不同之處在於，Copilot Chat是一個聊天機器人，這意味着您不需要用代碼提示它，您只需與它聊天，它就會給您答案或代碼建議。

## 安裝插件

要使用 Copilot Chat，您需要安裝一個插件，在 VSCode 的插件菜單中搜索 `Copilot Chat`，找到插件，名稱爲 `Github Copilot Chat`，對應的插件市場地址是 <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat>，安裝它。

![安裝截圖](/attachments/vscode/copilot-chat-usage/01.png)

## 使用

點擊 VSCode 左側邊欄的 `Chat` 菜單打開聊天窗口，然後您可以與 Copilot Chat 進行聊天。

您可以向 Copilot Chat 提問關於編程的問題，例如 `JavaScript 中執行位異或的運算符是什麼？`，它會回答 `在 JavaScript 中，位異或運算符用插入符號 (^) 表示`，並給出一個代碼示例和解釋。當您想查詢一些編程知識時，它非常有用。

![聊天窗口截圖](/attachments/vscode/copilot-chat-usage/02.png)

### 編寫代碼

除了編程知識外，您還可以向 Copilot Chat 請求幫助編寫代碼，比如 `在 JavaScript 中編寫一個計算兩個數字之和的函數`，它會給您一個所需函數的代碼示例：

```
當然，這是一個簡單的 JavaScript 函數，用於計算兩個數字的和：

function sum(a, b) {
    return a + b;
}

您可以通過將兩個數字作爲參數調用此函數來使用它，例如：sum(5, 3)。這將返回 8。
```

當鼠標懸停在代碼示例上時，您會看到幾個操作按鈕，您可以複製代碼，或將代碼插入到當前編輯器光標位置，您還可以將代碼保存到新文件中或在終端中運行代碼（如果是可運行的 shell 命令）。

![代碼示例的屏幕截圖](/attachments/vscode/copilot-chat-usage/03.png)

最有用的按鈕是 `插入` 按鈕，您可以將新創建的代碼插入到現有文件中，或者可以使用此按鈕替換選定的代碼片段，我們將在後面詳細討論此功能。

如果您對代碼示例不滿意，可以再次與 Copilot Chat 對話，例如 `請檢查輸入數據類型，如果其中一個不是數字，則返回 0`，Copilot Chat 將給您一個新的代碼示例：

```
這是一個檢查輸入數據類型的函數的修訂版本：

function sum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return 0;
    }
    return a + b;
}
```

在這個版本中，函數檢查a或b是否不是數字。如果其中一個不是數字，函數返回0。否則，它返回a和b的和。

正如你所看到的，你可以一次又一次地要求Copilot Chat改進代碼，直到你對代碼滿意爲止。最重要的是：它永遠不會抱怨你，多麼好的人！

### 修改代碼

如果你有一段想要修改的代碼，你可以選擇代碼，然後點擊 VSCode 左側邊欄的 `Chat` 菜單來打開聊天窗口，然後你可以與 Copilot Chat 進行對話。選中的代碼將作爲上下文發送給 Copilot Chat，Copilot Chat 將根據上下文和你的說法給出代碼建議。

例如，我們有一段有 bug 的代碼：

```javascript
function sumArr(arr) {
    let sum = 0;
    for (let i in arr) {
        sum += i;
    }
    return sum;
}
```

這個函數接受一個數字數組作爲輸入，並返回數組中數字的總和。但是代碼中有一個 bug，它讀取的是數組的鍵而不是值，所以它返回的是數組索引的總和而不是數組值的總和。

我們想要修復這個 bug，所以我們選擇了這段代碼並打開了聊天窗口，然後我們說 `Please fix the bug`，Copilot Chat 將給出一個修復 bug 的代碼示例：

```
function sumArr(arr) {
    let sum = 0;
    for (let i of arr) {
        sum += i;
    }
    return sum;
}
```

在原始代碼中，使用了for...in循環，它遍歷對象的可枚舉屬性，這裏是數組的索引。爲了修復錯誤，應該使用for...of循環，它遍歷可迭代對象的值，這裏是數組的元素。
```

正如您所看到的，Copilot Chat已經爲我們修復了錯誤，並且還給出了代碼的解釋。

更重要的是，您可以以更簡單的方式做同樣的事情，只需選擇代碼，然後輸入`/fix`或點擊`/fix the problems in my code`，Copilot Chat將像我們之前所做的那樣修復代碼。

### 轉換代碼

有時候你可能需要將一組值轉換爲數組、映射或其他數據結構，例如，我們從一個 Excel 表格中複製了一個鍵值對的映射：

```
name    age
John    20
Mary    21
Rose    22
Robert  18
Jane    19
```

你可以選擇這段文本，然後打開聊天窗口，然後說“將文本轉換爲數組（JSON），數組的元素是包含姓名和年齡的另一個數組，例如：[['John', 20]]，只給出結果，不需要給出代碼，不需要解釋”，Copilot Chat 將給你一個將文本轉換爲數組的代碼示例：

```
這是將文本轉換爲數組的結果：

[
    ["John", 20],
    ["Mary", 21],
    ["Rose", 22],
    ["Robert", 18],
    ["Jane", 19]
]
```

注意，你應該儘可能詳細地描述你的請求，這樣 Copilot Chat 才能理解你的請求並給出正確的結果。例如，如果你不要求輸出結果，Copilot Chat 將給你一個將文本轉換爲數組的代碼示例，這不是你想要的。

當然，你可以要求 Copilot Chat 將文本轉換爲其他數據結構，比如映射或對象的列表等。

## 結論

我們可以使用Copilot Chat來做很多事情，比如：

- 將文本轉換爲數據結構
- 爲代碼添加類型
- 將一段代碼轉換爲另一種編程語言
- 將您的i18n文件翻譯成其他語言
- 爲代碼添加錯誤處理
- 修復小錯誤
- 重構代碼以使其更易讀
- ...

唯一的限制是您的想象力和耐心。有時候Copilot Chat可能無法理解您的請求，或者可能給您錯誤的結果，但您可以不斷改進您的請求，直到獲得正確的結果。經過一些實踐，您會發現Copilot Chat是一個非常有用的工具。
