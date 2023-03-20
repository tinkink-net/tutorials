# Copilotの提案がVSCodeのMarkdownファイルで受け入れられない問題の解決方法

> Copilot (<https://copilot.github.com/>) は、AI学習に基づくコーディング支援を提供するGithubのAIコーディング支援です。多くの場合、Copilotはコメントや関数名だけで完全なコードを生成することができます。

Copilotは、例のコードに加えて、中国語のテキストを補完することもできます。これは、ドキュメンテーションを書くために非常に役立ちます。

## 問題の説明

VSCodeで、現在のテキストがMarkdownテキストの場合、Copilotの提案は受け入れられず、タブを押しても反応がありません。

![Can't accept suggestions screenshot](/attachments/vscode/sovle-copilot-can-not-accept-in-markdown/01.problem.gif)

## 原因

Markdown All In One (<https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one>) プラグインがインストールされており、ショートカットが競合しているためです。

## 解決方法

1. ショートカット設定を開く：Ctrl+Shift+P / Cmd+Shift+Pを押して、コマンドパネルを開き、「Preferences: Open Keyboard Shortcuts (JSON)」を検索して開きます。
2. 次の設定をコンテンツに追加します（全体の設定は配列であり、以下の2つの項目を配列に追加します。JSONが正当であることを確認するために、最後にカンマに特別な注意を払ってください）
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

## 参考

- [VSCode Github Issue #131953](https://github.com/microsoft/vscode/issues/131953)
- [vscode-markdown Github Issue #1011](https://github.com/yzhang-gh/vscode-markdown/issues/1011)