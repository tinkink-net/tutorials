# 如何在 macOS 上安装 Node.js

<Validator lang="zh-hans" :platform-list="['macOS 14.2.1']" date="2024-01-11" />

Node.js 是构建在 Chrome 的 V8 JavaScript 引擎上的 JavaScript 运行时。它采用事件驱动、非阻塞 I/O 模型，使其轻量高效。

Node.js 有许多用途，例如构建命令行工具、Web 应用程序，甚至桌面应用程序。即使您不使用 Node.js，您也可以使用 npm 安装许多命令行工具。

## 选项 1：通过官方安装程序安装 Node.js

官方的 Node.js 安装程序可在 [https://nodejs.org/](https://nodejs.org/) 上获得。您可以从该网站下载安装程序并进行安装。

![官方网站](/attachments/mac/install-nodejs/01.official-website.png)

Node.js 有两个主要版本：LTS 和 Current。LTS 是长期支持版本，更加稳定，版本号始终为偶数。Current 是最新版本，更加先进。对于大多数用户来说，建议安装 LTS 版本。

![Node.js 安装程序](/attachments/mac/install-nodejs/02.nodejs-installer.png)

然后您可以在终端中使用 `node` 命令。

## 选项2：通过Homebrew安装Node.js

[Homebrew](https://brew.sh/)是macOS的软件包管理器。您可以使用Homebrew安装Node.js。

```sh
brew install node
```

然后您可以在终端中使用`node`命令。

## 选项3：通过fnm安装Node.js

通过官方安装程序或Homebrew安装Node.js会将Node.js全局安装，但您只能安装一个版本的Node.js。如果您想安装多个版本的Node.js，可以使用版本管理器。

[fnm](https://github.com/Schniz/fnm)是一个快速简单的Node.js版本管理器，使用Rust构建。

您可以使用Homebrew安装fnm：

```sh
brew install fnm
```

或者使用curl安装：

```sh
curl -fsSL https://fnm.vercel.app/install | bash
```

然后您可以使用fnm安装Node.js：

```sh
fnm install 20
```

您还可以使用fnm安装多个版本的Node.js：

```sh
fnm install 20
fnm install 16
fnm install 14
```

然后您可以使用`fnm use`命令在不同版本的Node.js之间切换：

```sh
fnm use 20
```

您还可以使用`fnm default`命令设置默认版本的Node.js：

```sh
fnm default 20
```

如果您正在处理一个项目，您还可以使用`.node-version`文件指定Node.js的版本：

```sh
echo "20" > .node-version

# 在 .node-version 文件中指定的版本安装 Node.js
fnm install
# 使用 .node-version 文件中指定的版本的 Node.js
fnm use
```

## 摘要

在 macOS 上安装 Node.js 有很多种方法。您可以选择适合您的方法。对于开发人员来说，建议使用 fnm 安装 Node.js，这样更灵活。