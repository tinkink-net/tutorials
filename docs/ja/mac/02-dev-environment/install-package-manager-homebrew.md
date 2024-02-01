# パッケージマネージャーHomebrewのインストール方法

[Homebrew](https://brew.sh/)は、macOS用のパッケージマネージャーです。では、パッケージマネージャーとは何でしょうか？パッケージマネージャーは、コマンドラインから簡単にソフトウェアパッケージをインストールするためのツールです。macOSのApp Storeに似ていますが、コマンドラインツールであり、App Storeよりも多くのソフトウェアパッケージを提供しています。

Homebrewを使用して、Node.js、Git、Nginxなどの一般的なソフトウェアパッケージをインストールすることができます。このチュートリアルでは、macOSにHomebrewをインストールする方法を学びます。

## Homebrewのインストール

Homebrewの公式ウェブサイトは[brew.sh](https://brew.sh/)です。Homebrewについて詳しくは公式ウェブサイトをご覧ください。

Homebrewをインストールする前に、Xcodeのコマンドラインツールをインストールする必要があります。ターミナルで以下のコマンドを実行してXcodeのコマンドラインツールをインストールできます。

```sh
xcode-select --install
```

Xcodeのコマンドラインツールをインストール済みの場合は、ターミナルで以下のコマンドを実行してHomebrewをインストールできます。

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

すべてがうまくいけば、以下の出力が表示されます。

```sh
==> Next steps:
- Run `brew help` to get started
- Further documentation:
    https://docs.brew.sh
```

その後、ターミナルで`brew`コマンドを使用できます。

## ミラーを使用してインストールする

中国にいる場合、ミラーを使用してHomebrewをインストールすることができます。ターミナルで次のコマンドを実行します：

```sh
git clone --depth=1 https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.git brew-install
/bin/bash brew-install/install.sh
rm -rf brew-install
```

上記のコードは、清華大学のミラーサイトを使用してHomebrewをインストールします。他のミラーサイトを使用したい場合は、清華大学のミラーサイトを他のミラーサイトに置き換えることができます。

Homebrewをインストールするためにミラーサイトが必要な場合、他のソフトウェアパッケージをインストールするためにもミラーサイトを使用する必要があります。次のコマンドを使用してミラーサイトを設定できます：

```sh
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
```

上記のコードを`.bashrc`ファイルや`.zshrc`ファイル、または他の場所に追加できます。

## 使用方法

ソフトウェアパッケージをインストールするために、`brew`コマンドを使用することができます。例えば、以下のコマンドを使用してNode.jsをインストールすることができます：

```sh
brew install node
```

> Node.jsのインストール方法については、[こちら](/ja/mac/install-nodejs.md)をご覧ください。

ソフトウェアパッケージをアンインストールするために、`brew uninstall`コマンドを使用することができます：

```sh
brew uninstall node
```

Homebrew Caskは、より大きなバイナリファイルをインストールするためのHomebrewの拡張機能です。例えば、以下のコマンドを使用してGoogle Chromeをインストールすることができます：

```sh
brew install --cask google-chrome
```

その他のコマンドは[ドキュメント](https://docs.brew.sh/)で見つけることができます。

## Homebrewのアンインストール

Homebrewをアンインストールする場合は、ターミナルで以下のコマンドを実行します：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

## 結論

このチュートリアルでは、macOSにHomebrewをインストールする方法を学びました。これでmacOSで最も人気のあるパッケージマネージャーを利用することができます。多くのソフトウェアパッケージをインストールするために使用することができます。

お楽しみください！
