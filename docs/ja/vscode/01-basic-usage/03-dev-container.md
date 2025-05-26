# VS Codeのデブコンテナ機能を活用する

## コンテナとは何か？

> コンテナやDockerに詳しい方は、このセクションをスキップしてください。

コンテナは、分離された環境でソフトウェアを実行できる、軽量で持ち運び可能、自己完結型のユニットです。

アプリケーションコードとその依存関係、ライブラリ、設定ファイルをパッケージ化し、異なるコンピューティング環境間で一貫して動作することを保証します。

コンテナはDockerのようなコンテナ化技術の上に構築されており、開発者がアプリケーションを簡単に作成、デプロイ、管理できるようにします。

> 「コンテナ」という用語は、Dockerが最も人気のあるコンテナ化プラットフォームであるため、「Dockerコンテナ」と互換的に使用されることがよくあります。

## デブコンテナとは何か？

デブコンテナは、開発目的のために特別に設計されたコンテナの一種です。開発者が作業するための一貫性のある分離された環境を提供し、アプリケーションがどこで実行されても同じように動作することを保証します。

依存関係の競合、環境の不一致、バージョンの不一致など、多くの一般的な開発問題を解決できます。デブコンテナを使用することで、開発者は開発環境の再現性と一貫性を確保し、他の人との協力を容易にし、「自分のマシンでは動作する」問題を回避できます。

## デブコンテナを使用する利点

開発ワークフローでデブコンテナを使用すると、いくつかの利点があります：

1. **一貫した開発環境**：チーム全員が全く同じ環境で作業するため、「自分のマシンでは動作する」問題が解消されます。

2. **分離**：開発環境はローカルシステムから分離されているため、異なるプロジェクトや依存関係のバージョン間の競合を防ぎます。

3. **簡単な導入**：新しいチームメンバーはローカル環境の設定に時間を費やすことなく、すぐに作業を開始できます。

4. **再現可能なビルド**：開発環境はコードとして定義されているため、異なるマシン間で再現可能です。

5. **クリーンなローカルマシン**：プロジェクト固有の依存関係はすべてコンテナ内に含まれているため、ローカルマシンをクリーンに保ちます。

## デブコンテナを使用するための前提条件

VS Codeでデブコンテナを使用する前に、以下の前提条件がインストールされていることを確認する必要があります：

**Docker**

デブコンテナはDockerを使用してコンテナ環境を作成および管理します。デブコンテナを使用する前にDockerをインストールする必要があります。

> [Dockerの公式ウェブサイト](https://www.docker.com/products/docker-desktop/)からDocker Desktop（WindowsとmacOS上）またはDocker Engine（Linux上）を選択できます。OrbStackなどのサードパーティのDockerツールを使用することもできます。詳細については[Siliconチップ（M1/M2/M3）Mac上でのDockerの使用](/en/mac/02-dev-environment/how-to-use-docker-on-m1-mac.md)を参照してください。


**VS Code**

Visual Studio Codeの最新バージョンがインストールされていることを確認してください。[code.visualstudio.com](https://code.visualstudio.com/)からダウンロードできます。


**デブコンテナ拡張機能**

VS Code Marketplaceからデブコンテナ拡張機能をインストールします。

![デブコンテナ拡張機能のインストール](/attachments/vscode/dev-container/01-extension.png)

## VS Codeでデブコンテナを使用する方法：ステップバイステップガイド

Visual Studio Codeでデブコンテナを使用するには、まずプロジェクトを開き、次の手順に従います：

**デブコンテナ設定を追加する**：

コマンドパレット（`Ctrl`+`Shift`+`P`または`Cmd`+`Shift`+`P`（macOS））を開き、「Dev Containers: Add Development Container Configuration Files...」と入力し、「Add configuration to workspace」を選択します。

![デブコンテナ設定を追加](/attachments/vscode/dev-container/02-add-config.png)

リストから事前定義されたデブコンテナ設定を選択します。例えば、Node.jsプロジェクトで作業している場合は「Node.js & TypeScript」を選択します。

![Node.js設定を選択](/attachments/vscode/dev-container/03-select-nodejs.png)

次に、プロジェクトの要件に基づいてイメージバージョンやその他のオプションを選択します。よくわからない場合は、デフォルトのオプションを選択できます。

その後、VS Codeはワークスペースに`.devcontainer`フォルダを作成し、設定ファイル`devcontainer.json`を作成します：

```json
// For format details, see https://aka.ms/devcontainer.json. For config options, see the
// README at: https://github.com/devcontainers/templates/tree/main/src/javascript-node
{
	"name": "Node.js",
	// Or use a Dockerfile or Docker Compose file. More info: https://containers.dev/guide/dockerfile
	"image": "mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm"

	// Features to add to the dev container. More info: https://containers.dev/features.
	// "features": {},

	// Use 'forwardPorts' to make a list of ports inside the container available locally.
	// "forwardPorts": [],

	// Use 'postCreateCommand' to run commands after the container is created.
	// "postCreateCommand": "yarn install",

	// Configure tool-specific properties.
	// "customizations": {},

	// Uncomment to connect as root instead. More info: https://aka.ms/dev-containers-non-root.
	// "remoteUser": "root"
}
```

**プロジェクトをデブコンテナで開く**：

VS Codeウィンドウの左下隅に表示される「Open a remote window」ボタンをクリックし、「Reopen in Container」を選択してデブコンテナを開くことができます。

![リモートウィンドウを開く](/attachments/vscode/dev-container/04-open-remote-window.png)

![コンテナで再度開く](/attachments/vscode/dev-container/05-reopen-in-container.png)

または、コマンドパレット（`Ctrl`+`Shift`+`P`または`Cmd`+`Shift`+`P`（macOS））を開き、「Dev Containers: Reopen in Container」と入力することもできます。

その後、VS Codeがデブコンテナイメージをビルドしてコンテナを起動していることを示す進行状況バーが表示されます。「Show Log」ボタンをクリックしてビルドログを表示できます。

![進行状況](/attachments/vscode/dev-container/06-progress.png)

すべてがうまくいけば、デブコンテナに接続された新しいVS Codeウィンドウが表示されます。作業を開始する前に、コンテナが初期化を完了するのを待つ必要があるかもしれません（必要な依存関係と拡張機能のダウンロードとインストール）。

![コンテナの初期化](/attachments/vscode/dev-container/07-container-initializing.png)

コンテナの準備ができたら、コンテナ内でプロジェクトの作業を開始できます。

## 一般的な問題のトラブルシューティング

デブコンテナで問題が発生した場合は、次のトラブルシューティング手順を試してください：

1. **Dockerが実行されていることを確認する**：マシンにDockerがインストールされ、実行されていることを確認します。
2. **リソース割り当てを増やす**：コンテナの動作が遅い場合は、Docker Desktopの設定でDockerのメモリとCPU割り当てを増やしてみてください。
3. **VS Codeと拡張機能を更新する**：VS Codeとデブコンテナ拡張機能の最新バージョンを使用していることを確認します。
4. **ネットワーク設定を確認する**：コンテナがネットワークリソースにアクセスする必要がある場合は、ファイアウォール設定が接続をブロックしていないことを確認します。
5. **ログを確認する**：デブコンテナの進行状況バーにある「Show Log」ボタンを使用して、トラブルシューティングのための詳細なログを表示します。

## 結論

VS Codeのデブコンテナは、一貫性のある分離された開発環境を作成するための強力な方法を提供します。コンテナ技術を活用することで、開発環境が異なるマシン間で再現可能であることを確保し、一般的な環境関連の問題を回避できます。

個人プロジェクトで作業している場合でも、チームと協力している場合でも、デブコンテナはワークフローを合理化し、環境の設定よりもコードの作成に集中しやすくします。