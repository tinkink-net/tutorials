# 解决 VSCode Markdown 文件中无法接受Copilot建议的问题

> Copilot (<https://copilot.github.com/>) 是由 Github 提供的AI编码辅助工具，它可以在编码过程中提供基于 AI 学习的编码建议。在很多情况下，只需要有注释或者函数名称，Copilot就可以实例完整的代码。

Copilot 除了能实例代码以外，也能补充文本，而且包括中文文本，这对我们编写文档非常有用。

## 问题描述

在 VSCode 中，如果当前文本是 Markdown 文本，那么就无法接受 Copilot 的建议，具体表现为按下 tab 后无反应。

![无法接受建议截图](/attachments/vscode/sovle-copilot-can-not-accept-in-markdown/01.problem.gif)

## 原因

安装了插件 Markdown All In One (<https://marketplace.visualstudio.com/items?itemName=markdown-all-in-one.markdown-all-in-one>)，快捷键有冲突。

## 解决方案

1. 打开快捷键设置：按 Ctrl+Shift+P / Cmd+Shift+P，打开命令面板，找到`Preferences: Open Keyboard Shortcuts (JSON)`，打开它
2. 在内容中添加如下设置项（整个设置项是一个数组，将以下2项添加到数组中，请特别注意结尾逗号，确保JSON合法）：
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

## 参考资料

- [VSCode Github Issue #131953](https://github.com/microsoft/vscode/issues/131953)
- [vscode-markdown Github Issue #1011](https://github.com/yzhang-gh/vscode-markdown/issues/1011)
