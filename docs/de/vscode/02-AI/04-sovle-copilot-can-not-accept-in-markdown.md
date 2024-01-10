# Das Problem lösen, dass Copilot-Vorschläge in VSCode-Markdown-Dateien nicht akzeptiert werden

> Copilot (<https://copilot.github.com/>) ist eine KI-Codierhilfe von Github, die während des Codierungsprozesses KI-gestützte Codierungsvorschläge bietet. In vielen Fällen kann Copilot vollständigen Code nur mit Kommentaren oder Funktionsnamen instanziieren.

Copilot kann auch den Text ergänzen, einschließlich chinesischen Texts, zusätzlich zum Beispielcode, was sehr nützlich ist, um Dokumentationen zu schreiben.

## Problem Beschreibung

In VSCode werden Copilot-Vorschläge nicht akzeptiert, wenn der aktuelle Text ein Markdown-Text ist, wie durch keine Reaktion nach dem Drücken der Tab-Taste angezeigt.

![Screenshot der nicht akzeptierten Vorschläge](/attachments/vscode/sovle-copilot-can-not-accept-in-markdown/01.problem.gif)

## Grund

Das Plugin Markdown All In One (<https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one>) ist installiert und hat konkurrierende Tastenkombinationen.

## Lösung

1. Öffnen Sie die Tastenkürzeleinstellungen: Drücken Sie Strg+Shift+P / Cmd+Shift+P, öffnen Sie das Befehlsfeld, suchen Sie nach "Einstellungen: Tastenkürzel (JSON) öffnen" und öffnen Sie es.
2. Fügen Sie die folgenden Einstellungen zum Inhalt hinzu (die gesamten Einstellungen sind ein Array, fügen Sie die folgenden 2 Elemente zum Array hinzu, achten Sie bitte besonders auf das Komma am Ende, um sicherzustellen, dass das JSON gültig ist)
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

## Referenz

- [VSCode Github Issue #131953](https://github.com/microsoft/vscode/issues/131953)
- [vscode-markdown Github Issue #1011](https://github.com/yzhang-gh/vscode-markdown/issues/1011)