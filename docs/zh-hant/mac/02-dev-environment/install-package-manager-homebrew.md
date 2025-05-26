# 如何安裝軟件包管理器Homebrew

[Homebrew](https://brew.sh/)是macOS上的一個軟件包管理器。那麼什麼是軟件包管理器呢？軟件包管理器是一個工具，允許你通過命令行輕鬆安裝軟件包。它類似於macOS上的App Store，但它是一個命令行工具，並且擁有比App Store更多的軟件包。

我們可以使用Homebrew來安裝許多常見的軟件包，如Node.js、Git、Nginx等。在本教程中，我們將學習如何在macOS上安裝Homebrew。

## 安裝Homebrew

Homebrew的官方網站是[brew.sh](https://brew.sh/)。您可以訪問官方網站了解更多關於Homebrew的信息。

在安裝Homebrew之前，您需要安裝Xcode命令行工具。您可以通過在終端中運行以下命令來安裝Xcode命令行工具：

```sh
xcode-select --install
```

如果您已經安裝了Xcode命令行工具，您可以通過在終端中運行以下命令來安裝Homebrew：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

如果一切順利，您將看到以下輸出：

```sh
==> Next steps:
- Run `brew help` to get started
- Further documentation:
    https://docs.brew.sh
```

然後您就可以在終端中使用`brew`命令了。

## 通過鏡像安裝

如果你在中國，可以通過鏡像安裝Homebrew。你可以在終端中運行以下命令：

```sh
git clone --depth=1 https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.git brew-install
/bin/bash brew-install/install.sh
rm -rf brew-install
```

上述代碼將通過清華大學的鏡像安裝Homebrew。如果你喜歡其他鏡像站點，可以將清華大學的鏡像站點替換爲其他鏡像站點。

如果你需要使用鏡像站點安裝Homebrew，可能還需要使用鏡像站點安裝其他軟件包。你可以使用以下命令設置鏡像站點：

```sh
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
```

你可以將上述代碼添加到`.bashrc`文件或`.zshrc`文件或其他地方。

## 用法

您可以使用 `brew` 命令來安裝軟件包。例如，您可以使用以下命令來安裝 Node.js：

```sh
brew install node
```

> 我們還有另一個關於如何安裝 Node.js 的教程。您可以在[這裏](/zh-hant/mac/install-nodejs.html)閱讀。

您可以使用 `brew uninstall` 命令來卸載軟件包：

```sh
brew uninstall node
```

Homebrew Cask 是 Homebrew 的擴展，允許您安裝較大的二進制文件。例如，您可以使用以下命令來安裝 Google Chrome：

```sh
brew install --cask google-chrome
```

其他命令可以在[文檔](https://docs.brew.sh/)中找到。

## 卸載 Homebrew

如果您想卸載 Homebrew，可以在終端中運行以下命令：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

## 結論

在本教程中，我們學習瞭如何在 macOS 上安裝 Homebrew。現在您擁有了最受歡迎的 macOS 包管理器。您可以使用它來安裝許多軟件包。

盡情享受吧！
