# Résoudre le problème des suggestions Copilot qui ne sont pas acceptées dans les fichiers Markdown de VSCode

> Copilot (<https://copilot.github.com/>) est une aide au codage IA fournie par Github qui propose des suggestions de code basées sur l'apprentissage par IA pendant le processus de codage. Dans de nombreux cas, Copilot peut instancier du code complet avec seulement des commentaires ou des noms de fonctions.

Copilot peut également compléter le texte, y compris le texte en chinois, en plus du code d'exemple, ce qui est très utile pour nous aider à rédiger de la documentation.

## Description du problème

Dans VSCode, si le texte actuel est au format Markdown, alors la suggestion de Copilot n'est pas acceptée, comme le montre l'absence de réponse après avoir appuyé sur la touche tab.

![Capture d'écran de l'impossibilité d'accepter les suggestions](/attachments/vscode/sovle-copilot-can-not-accept-in-markdown/01.problem.gif)

## Raison

Le plugin Markdown All In One (<https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one>) est installé et présente des raccourcis clavier conflictuels.

## Solution

1. Ouvrez les paramètres de raccourcis : appuyez sur Ctrl+Shift+P / Cmd+Shift+P, ouvrez le panneau de commandes, trouvez `Preferences: Open Keyboard Shortcuts (JSON)`, ouvrez-le
2. Ajoutez les paramètres suivants au contenu (l'ensemble des paramètres est un tableau, ajoutez les 2 éléments suivants au tableau, veuillez faire particulièrement attention à la virgule à la fin pour vous assurer que le JSON est valide)
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

## Référence

- [VSCode Github Issue #131953](https://github.com/microsoft/vscode/issues/131953)
- [vscode-markdown Github Issue #1011](https://github.com/yzhang-gh/vscode-markdown/issues/1011)