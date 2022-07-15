# Resolve the problem that Copilot suggestions are not accepted in VSCode Markdown files

> Copilot (<https://copilot.github.com/>) is an AI coding aid provided by Github that provides AI-learning based coding suggestions during the coding process. In many cases, Copilot can instantiate complete code with just comments or function names.

Copilot can also supplement the text, including Chinese text, in addition to the example code, which is very useful for us to write documentation.

## Problem Description

In VSCode, if the current text is Markdown text, then Copilot's suggestion is not accepted, as shown by no response after pressing tab.

![Can't accept suggestions screenshot](/attachments/vscode/sovle-copilot-can-not-accept-in-markdown/01.problem.gif)

## Reason

The plugin Markdown All In One (<https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one>) is installed and has conflicting shortcuts.

## Solution

1. Open shortcut settings: press Ctrl+Shift+P / Cmd+Shift+P, open command panel, find `Preferences: Open Keyboard Shortcuts (JSON)`, open it
2. Add the following settings to the content (the whole settings is an array, add the following 2 items to the array, please pay special attention to the comma at the end to make sure the JSON is legal)
   ```json
   {
      "key": "tab",
      "command": "markdown.extension.onTabKey",
      "when": "editorTextFocus && !inlineSuggestionVisible && !editorReadonly && !editorTabMovesFocus && !hasOtherSuggestions && ! hasSnippetCompletions && !inSnippetMode && !successWidgetVisible && editorLangId == 'markdown'"
    },
    {
      "key": "tab",
      "command": "-markdown.extension.onTabKey",
      "when": "editorTextFocus && !editorReadonly && !editorTabMovesFocus && !hasOtherSuggestions && !hasSnippetCompletions && !inSnippetMode && ! suggestWidgetVisible && editorLangId == 'markdown'"
    }
    ```

## Reference

- [VSCode Github Issue #131953](https://github.com/microsoft/vscode/issues/131953)
- [vscode-markdown Github Issue #1011](https://github.com/yzhang-gh/vscode-markdown/issues/1011)
