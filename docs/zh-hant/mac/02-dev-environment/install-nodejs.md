# 如何在 macOS 上安裝 Node.js

<Validator lang="zh-hant" :platform-list="['macOS 14.2.1']" date="2024-01-11" />

Node.js 是構建在 Chrome 的 V8 JavaScript 引擎上的 JavaScript 運行時。它採用事件驅動、非阻塞 I/O 模型，使其輕量高效。

Node.js 有許多用途，例如構建命令行工具、Web 應用程序，甚至桌面應用程序。即使您不使用 Node.js，您也可以使用 npm 安裝許多命令行工具。

## 選項 1：通過官方安裝程序安裝 Node.js

官方的 Node.js 安裝程序可在 [https://nodejs.org/](https://nodejs.org/) 上獲得。您可以從該網站下載安裝程序並進行安裝。

![官方網站](/attachments/mac/install-nodejs/01.official-website.png)

Node.js 有兩個主要版本：LTS 和 Current。LTS 是長期支持版本，更加穩定，版本號始終爲偶數。Current 是最新版本，更加先進。對於大多數用戶來說，建議安裝 LTS 版本。

![Node.js 安裝程序](/attachments/mac/install-nodejs/02.nodejs-installer.png)

然後您可以在終端中使用 `node` 命令。

## 選項2：通過Homebrew安裝Node.js

[Homebrew](https://brew.sh/)是macOS的軟件包管理器。您可以使用Homebrew安裝Node.js。

```sh
brew install node
```

然後您可以在終端中使用`node`命令。

## 選項3：通過fnm安裝Node.js

通過官方安裝程序或Homebrew安裝Node.js會將Node.js全局安裝，但您只能安裝一個版本的Node.js。如果您想安裝多個版本的Node.js，可以使用版本管理器。

[fnm](https://github.com/Schniz/fnm)是一個快速簡單的Node.js版本管理器，使用Rust構建。

您可以使用Homebrew安裝fnm：

```sh
brew install fnm
```

或者使用curl安裝：

```sh
curl -fsSL https://fnm.vercel.app/install | bash
```

然後您可以使用fnm安裝Node.js：

```sh
fnm install 20
```

您還可以使用fnm安裝多個版本的Node.js：

```sh
fnm install 20
fnm install 16
fnm install 14
```

然後您可以使用`fnm use`命令在不同版本的Node.js之間切換：

```sh
fnm use 20
```

您還可以使用`fnm default`命令設置默認版本的Node.js：

```sh
fnm default 20
```

如果您正在處理一個項目，您還可以使用`.node-version`文件指定Node.js的版本：

```sh
echo "20" > .node-version

# 在 .node-version 文件中指定的版本安裝 Node.js
fnm install
# 使用 .node-version 文件中指定的版本的 Node.js
fnm use
```

## 摘要

在 macOS 上安裝 Node.js 有很多種方法。您可以選擇適合您的方法。對於開發人員來說，建議使用 fnm 安裝 Node.js，這樣更靈活。