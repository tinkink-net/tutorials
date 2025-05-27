# Resolver el problema de que las sugerencias de Copilot no son aceptadas en archivos Markdown de VSCode

> Copilot (<https://copilot.github.com/>) es una ayuda de codificación AI proporcionada por Github que ofrece sugerencias de código basadas en aprendizaje de AI durante el proceso de codificación. En muchos casos, Copilot puede crear código completo con solo comentarios o nombres de funciones.

Copilot también puede complementar el texto, incluido el texto en chino, además del código de ejemplo, lo que es muy útil para escribir documentación.

## Descripción del problema

En VSCode, si el texto actual es texto Markdown, entonces la sugerencia de Copilot no es aceptada, como se muestra por la falta de respuesta después de presionar tab.

![Captura de pantalla de no poder aceptar sugerencias](/attachments/vscode/sovle-copilot-can-not-accept-in-markdown/01.problem.gif)

## Razón

El plugin Markdown All In One (<https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one>) está instalado y tiene atajos de teclado en conflicto.

## Solución

1. Abrir la configuración de atajos: presionar Ctrl+Shift+P / Cmd+Shift+P, abrir el panel de comandos, buscar `Preferences: Open Keyboard Shortcuts (JSON)`, abrirlo
2. Añadir la siguiente configuración al contenido (toda la configuración es un array, añadir los siguientes 2 elementos al array, presta especial atención a la coma al final para asegurarte de que el JSON sea válido)
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

## Referencia

- [VSCode Github Issue #131953](https://github.com/microsoft/vscode/issues/131953)
- [vscode-markdown Github Issue #1011](https://github.com/yzhang-gh/vscode-markdown/issues/1011)