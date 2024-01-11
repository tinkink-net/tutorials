# macOS での Node.js のインストール方法

<Validator lang="ja" :platform-list="['macOS 14.2.1']" date="2024-01-11" />

Node.js は、Chrome の V8 JavaScript エンジン上に構築された JavaScript ランタイムです。イベント駆動型で非同期の I/O モデルを使用しており、軽量で効率的です。

Node.js には、コマンドラインツール、Web アプリケーション、さらにはデスクトップアプリケーションなど、さまざまなユースケースがあります。Node.js を使用しなくても、npm を使用して多くの CLI ツールをインストールすることもできます。

## オプション 1: 公式インストーラーを使用して Node.js をインストールする

公式の Node.js インストーラーは [https://nodejs.org/](https://nodejs.org/) で入手できます。ウェブサイトからインストーラーをダウンロードしてインストールすることができます。

![公式ウェブサイト](/attachments/mac/install-nodejs/01.official-website.png)

Node.js には、LTS（長期サポート）版と Current（最新版）の2つのメインバージョンがあります。LTS は安定したバージョンで、バージョンは常に偶数です。Current は最新のバージョンで、より先進的です。ほとんどのユーザーには、LTS バージョンのインストールを推奨します。

![Node.js インストーラー](/attachments/mac/install-nodejs/02.nodejs-installer.png)

その後、ターミナルで `node` コマンドを使用することができます。

## オプション2: Homebrewを使用してNode.jsをインストールする

[Homebrew](https://brew.sh/)はmacOS用のパッケージマネージャです。Homebrewを使用してNode.jsをインストールすることができます。

```sh
brew install node
```

その後、ターミナルで`node`コマンドを使用することができます。

## オプション3: fnmを使用してNode.jsをインストールする

公式のインストーラーまたはHomebrewを使用してNode.jsをインストールすると、Node.jsがグローバルにインストールされますが、Node.jsのバージョンは1つしかインストールできません。複数のバージョンのNode.jsをインストールしたい場合は、バージョンマネージャーを使用することができます。

[fnm](https://github.com/Schniz/fnm)は、Rustで作られた高速でシンプルなNode.jsバージョンマネージャーです。

Homebrewを使用してfnmをインストールすることができます:

```sh
brew install fnm
```

または、curlを使用してインストールすることもできます:

```sh
curl -fsSL https://fnm.vercel.app/install | bash
```

その後、fnmを使用してNode.jsをインストールすることができます:

```sh
fnm install 20
```

fnmを使用して複数のバージョンのNode.jsをインストールすることもできます:

```sh
fnm install 20
fnm install 16
fnm install 14
```

その後、`fnm use`コマンドを使用して異なるバージョンのNode.jsに切り替えることができます:

```sh
fnm use 20
```

また、`fnm default`コマンドを使用してデフォルトのNode.jsのバージョンを設定することもできます:

```sh
fnm default 20
```

プロジェクトで作業している場合は、`.node-version`ファイルを使用してNode.jsのバージョンを指定することもできます:

```sh
echo "20" > .node-version

# .node-versionファイルで指定されたバージョンのNode.jsをインストールします
fnm install
# .node-versionファイルで指定されたバージョンのNode.jsを使用します
fnm use
```

## 概要

macOSにNode.jsをインストールする方法はいくつかあります。自分に合った方法を選択できます。開発者には、より柔軟なfnmを使用してNode.jsをインストールすることをおすすめします。