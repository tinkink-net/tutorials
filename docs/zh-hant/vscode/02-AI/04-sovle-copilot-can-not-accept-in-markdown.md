# 解決 VSCode Markdown 文件中無法接受Copilot建議的問題

> Copilot (<https://copilot.github.com/>) 是由 Github 提供的AI編碼輔助工具，它可以在編碼過程中提供基於 AI 學習的編碼建議。在很多情況下，只需要有註釋或者函數名稱，Copilot就可以實例完整的代碼。

Copilot 除了能實例代碼以外，也能補充文本，而且包括中文文本，這對我們編寫文檔非常有用。

## 問題描述

在 VSCode 中，如果當前文本是 Markdown 文本，那麼就無法接受 Copilot 的建議，具體表現爲按下 tab 後無反應。

![無法接受建議截圖](/attachments/vscode/sovle-copilot-can-not-accept-in-markdown/01.problem.gif)

## 原因

安裝了插件 Markdown All In One (<https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one>)，快捷鍵有衝突。

## 解決方案

1. 打開快捷鍵設置：按 Ctrl+Shift+P / Cmd+Shift+P，打開命令面板，找到`Preferences: Open Keyboard Shortcuts (JSON)`，打開它
2. 在內容中添加如下設置項（整個設置項是一個數組，將以下2項添加到數組中，請特別注意結尾逗號，確保JSON合法）：
   ```json
   {
      "key": "tab",
      "command": "markdown.extension.onTabKey",
      "when": "editorTextFocus && !inlineSuggestionVisible && !editorReadonly && !editorTabMovesFocus && !hasOtherSuggestions && !hasSnippetCompletions && !inSnippetMode && !suggestWidgetVisible && editorLangId == 'markdown'"
    },
    {
      "key": "tab",
      "command": "-markdown.extension.onTabKey",
      "when": "editorTextFocus && !editorReadonly && !editorTabMovesFocus && !hasOtherSuggestions && !hasSnippetCompletions && !inSnippetMode && !suggestWidgetVisible && editorLangId == 'markdown'"
    }
    ```

## 參考資料

- [VSCode Github Issue #131953](https://github.com/microsoft/vscode/issues/131953)
- [vscode-markdown Github Issue #1011](https://github.com/yzhang-gh/vscode-markdown/issues/1011)
