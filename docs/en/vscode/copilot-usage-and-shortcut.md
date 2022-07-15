# How to use Github Copilot and shortcuts

## What is Copilot

Copilot (<https://copilot.github.com/>) is an AI coding aid provided by Github that provides AI-learning based coding suggestions during the coding process. In many cases, all that is needed is comments or function names, and Copilot can instance the complete code.

Copilot is not yet available in full volume, and you need to request access to open it. Visit its official website <https://copilot.github.com/> and click the "Sign up" button to apply for access. Once you get the access, you can use Copilot on Github.

![Screenshot](/attachments/vscode/copilot-usage-and-shortcut/01.website.png)

## Installing the plugin

To use Copilot, you need to install a plugin, search `Copilot` in VSCode's plugin menu to find the plugin, the name is `Github Copilot`, the corresponding plugin marketplace address is <https://marketplace.visualstudio.com/items? itemName=GitHub.copilot>, install it.

![Installation screenshot](/attachments/vscode/copilot-usage-and-shortcut/02.install.png)

After installation, the plugin will prompt for Github login, just follow the instructions to login.

Follow the instructions to log in.

![login screenshot](/attachments/vscode/copilot-usage-and-shortcut/03.login.png)

## Use

In normal use, when Copilot gives a suggestion, the suggested code appears behind the cursor position and is displayed in gray text. If you do not want to use the suggestion, just keep entering the code, if you want to use the suggested code, just press the Tab key.

![Screenshot of usage](/attachments/vscode/copilot-usage-and-shortcut/04.completion.png)

In VSCode, Copilot has an icon that needs to be confirmed that the status is on. When it looks similar to other icons and has no background color, it means it is on, at this time when you edit the code file, Copilot will automatically prompt for code suggestions. When it has a background color (red, dark yellow, etc.), it means it is off. If you want to switch the status, just click it and select Globally.

![status-icon](/attachments/vscode/copilot-usage-and-shortcut/05.icon.png)

## Shortcut keys

Copilot also provides some shortcut keys that can be easily used.

- Accept suggestions: `Tab`
- Reject suggestion: `Esc`
- Open Copilot: `Ctrl + Enter` (will open a separate panel showing 10 suggestions)
- Next suggestion: `Alt/Option + ]`
- Previous suggestion: `Alt/Option + [`
- Trigger in-line Copilot: `Alt/Option + \` (Coplit hasn't given a suggestion or the suggestion has been rejected and wants to manually trigger it to provide a suggestion)

![Screenshot of shortcuts](/attachments/vscode/copilot-usage-and-shortcut/06.shortcut.jpg)
