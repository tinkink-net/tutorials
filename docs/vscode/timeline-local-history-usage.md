# 使用VSCode 时间线/本地文件历史功能防止误删文件

在代码开发中，最恐怖的事情莫过于误删文件了。有时候可能只是一个弹框点错了按钮，或者 git 操作失误，辛苦几天的劳动成果就不见了。

如果有一个功能能够将保存过的代码的每一个版本都记录到本地，可以随时找回来，这样就不用担心误删文件导致损失了。

在 VSCode 中，以前需要通过安装插件来实现（例如 Local History 插件），但在 1.44 版本之后，VSCode 内置了时间线（Timeline）功能。本文就来看看如何使用时间线功能防止误删文件造成损失。

## 使用

当打开一个代码文件之后，在左侧的文件面板下方，将出来一个“TIMELINE”面板，这个面板就是时间线。

![TIMELINE面板](/attachments/vscode/timeline-local-history-usage/01.panel.png)

当文件被修改和保存之后，时间线中就会出现一个新的节点，这个节点就是代码文件的历史版本。

![历史版本记录](/attachments/vscode/timeline-local-history-usage/02.timeline-versions.png)

> 除了“保存”之外，Git提交、文件重命名等操作，也会作为一个版本显示在面板中。

点击某个版本，将出现它与当前文件的对比界面，可以直观看到从历史版本到最新版本产生了哪些变化。

右键点击某个版本，可以看到有一系列菜单：

![历史版本记录](/attachments/vscode/timeline-local-history-usage/03.context-menu.png)

这些菜单分别是（以 Mac 系统为例）：

- Compare with File 与当前文件版本对比
- Compare with Previous 与上一个版本对比
- Select for Compare 将当前版本选中作为一个对比版本（可以文件树或者 TIMELINE 面板再选中一个，两个版本进行对比）
- Show Contents 显示选中的版本内容
- Restore Contents 恢复选中的版本内容
- Reveal in Finder 在文件管理器中展示选中的版本的文件
- Rename 重命名选中版本
- Delete 删除选中版本

点击 TIMELINE 面板右侧的筛选按钮，可以选择面板中显示的记录类型，目前包括本地文件记录和 Git 提交记录，可以按需显示。

如果只勾选 Git 提交记录，则相当于在查看文件的 Git 提交历史，非常方便。

## 找回被误删除文件

如果一个文件被误删除了，那么它在 VSCode 中将无法被显示、打开，因而也就无法在 TIMELINE 面板中找到它。但实际上，虽然文件被误删除了，但是它的历史版本还是保留在本地的。

我们在同一个项目中找到任意一个文件的任意一个版本，然后通过右键点击，在文件管理器中打开选中的版本文件，这样就能找到 VSCode 存放历史版本的文件夹。以 Mac 系统为例，路径如下：

```
/Users/xxx/Library/Application Support/Code/User/History/61e8902
```

往上一级，即`History`目录即是所有的历史版本存放的目录，因此我们只需要在里面按照关键词搜索即可找到对应的文件。

例如我们要找关键词`DbConnection`，搜索的命令可参考：

```sh
# Mac / Linux
grep -r DbConnection "/Users/xxx/Library/Application Support/Code/User/History"

# Windows
findstr /s /i DbConnection "C:\Users\xxx\AppData\Roaming\Code\User\History"
```

搜索到结果之后，就能打开对应的文件，一一进行确认，找到我们需要的版本了。

## 小结

时间线（Timeline）是一个简单而又方便的功能，有了它以后不需要其他插件就可以保存所有的文件历史记录，再也不用担心误删文件导致损失代码了。
