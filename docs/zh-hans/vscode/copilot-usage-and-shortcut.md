# Github Copilot 的使用方法和快捷键

## Copilot 是什么

Copilot (<https://copilot.github.com/>) 是由 Github 提供的AI编码辅助工具，它可以在编码过程中提供基于 AI 学习的编码建议。在很多情况下，只需要有注释或者函数名称，Copilot就可以实例完整的代码。

目前 Copilot 已经不再免费，需要支持10美元/月或者100美元/年。但你可以试用2个月。访问 Github 设置页面（<https://github.com/settings/copilot>），按页面提示点击按钮以开通使用权限。当获得开通权限后，就可以在 Github 上使用 Copilot。

![官网截图](/attachments/vscode/copilot-usage-and-shortcut/01.website.png)

## 安装插件

使用 Copilot 时，需要安装一个插件，在 VSCode 的插件菜单中搜索 `Copilot`，即可找到插件，名字为 `Github Copilot`，对应的插件市场的地址为<https://marketplace.visualstudio.com/items?itemName=GitHub.copilot>，安装即可。

![安装截图](/attachments/vscode/copilot-usage-and-shortcut/02.install.png)

安装后插件会提示要求登录 Github ，按提示登录即可。

![登录截图](/attachments/vscode/copilot-usage-and-shortcut/03.login.png)

## 使用

正常使用时，当 Copilot 给出建议时，会在光标位置的后方出现建议的代码，并灰色字显示。如果不希望使用提示，则继续输入代码即可，如果希望使用提示的代码，按下 Tab 键即可。

![使用截图](/attachments/vscode/copilot-usage-and-shortcut/04.completion.png)

在 VSCode 中，Copilot 有一个图标，需要确认状态是打开的。当它的样子与其它图标类似，没有背景颜色时，表示是开启的，此时当你编辑代码文件的时候，Copilot会自动提示代码建议。当它有背景颜色（红色、深黄色等）时，表示是关闭的。如果要切换状态只要点击它，然后选择全局（Globally）即可。

![状态图标](/attachments/vscode/copilot-usage-and-shortcut/05.icon.png)

## 快捷键

Copilot 也提供了一些快捷键，可以很方便地使用。

- 接受建议：`Tab`
- 拒绝建议：`Esc`
- 打开Copilot：`Ctrl + Enter` （会打开一个单独的面板，展示10个建议）
- 下一条建议：`Alt/Option + ]`
- 上一条建议：`Alt/Option + [`
- 触发行内Copilot：`Alt/Option + \` （Coplit还没有给出建议或者建议被拒绝了，希望手工触发它提供建议）

![快捷键截图](/attachments/vscode/copilot-usage-and-shortcut/06.shortcut.jpg)

## Http代理

有些用户（比如中国大陆的用户）可能会遇到Copilot不工作的问题，原因是Copilot无法访问互联网或Github api。你可以在输出面板上看到以下错误信息：`GitHub Copilot could not connect to server. Extension activation failed: "connect ETIMEDOUT xxx.xxx.xxx:443"`。

在这种情况下，你需要设置http代理。

首先，获取你的http代理信息。你可以向你的网络管理员询问代理地址和端口，或者如果你使用代理软件，你可以在代理软件设置中找到代理地址和端口。

下面是一个使用代理软件"ClashX"的例子，你可以在"设置"标签中找到代理地址和端口，代理地址是 "127.0.0.1:1080"。

![代理截图](/attachments/vscode/copilot-usage-and-shortcut/07.proxy.png)

然后，打开VSCode的设置，搜索`http.proxy`，并设置代理地址和端口。

![代理设置截图](/attachments/vscode/copilot-usage-and-shortcut/08.proxy-settings.png)

设置完成后，重新启动VSCode，Copilot应该可以正常工作。
