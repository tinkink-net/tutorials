# Siliconチップ（M1/M2）MacコンピューターでのDockerの使用

<Validator lang="ja" :platform-list="['macOS 13.2.1']" date="2023-03-14" />

## 背景と困難

Appleは2020年に自社のチップ、Apple Siliconを搭載したコンピューターを正式に発売し、最初にリリースされたチップモデルはM1でした。このチップのアーキテクチャは、従来のx86からARMアーキテクチャに変更されました。

CPUアーキテクチャの変更によって引き起こされるソフトウェアの非互換性の問題を解決するため、AppleはMacOSにRosetta 2を含めました。このソフトウェアは、x86アーキテクチャのコードをARMアーキテクチャのコードにランタイムで変換することで、ほとんどのソフトウェアが新しいチップを搭載したMacOSでシームレスに実行できるようにします。

ほとんどのソフトウェアがApple Silicon（M1/M2）チップ上でうまく動作する一方、仮想化ソフトウェアのような特定のソフトウェアはスムーズに実行できなかった。これには、仮想マシンやDockerなどのソフトウェアが含まれます。

VirtualBoxなどの従来の仮想マシンソフトウェアは、明示的にサポート計画がないことを述べています。また、Parallels Desktopはサポートしていますが、価格が高くなっています。

Dockerは、実際には非Linuxシステム上のホストとして仮想化されたLinuxに依存しているため、仮想マシンに対する確実な解決策がなければ、Dockerをスムーズに実行する方法はありません。

## 公式ソリューション

Docker Desktop For Macは、Apple Siliconチップ上で実行されるバージョンを提供し、異なるアーキテクチャの仮想化を処理するためにQEMUを使用しています。ただし、一定規模の企業にはもはや無料ではありません。したがって、やや大きな企業の場合は、Docker Desktop For Macを使用しない場合があります。個人ユーザーの場合は、Docker Desktop For Macはまだ非常に良いソリューションです。

## Lima

[Lima](https://github.com/lima-vm/lima)は、異なるアーキテクチャの仮想化を処理するためにQEMUを使用する無料のオープンソースソフトウェアです。 Docker Desktop For Macとは異なり、コンテナソフトウェアにDockerの代わりにContainerdを使用しています。

> Containerdはこの標準の実装であり、Dockerもそれに従っています。したがって、ContainerdとDockerはほぼ使用上互換性があります。

公式チュートリアルに従ってHomebrewでlimaをインストールし、使用準備ができます。

```sh
# インストール
brew install lima

# 開始
limactl start
```

この時点で、``nerdctl``を使用して、Containerdでさまざまな操作を実行できます。

```sh
lima nerdctl run -d --name nginx -p 80:80 nginx:alpine
```

見ての通り、``lima nerdctl``の使用方法は``docker``とほぼ同じです。コンテナを終了するだけでなく、仮想化された環境をシャットダウンしてメモリを節約することもできます。

```sh
limactl stop
```

limaは、非常に多くの仮想化の詳細を設定し、複数の仮想環境を設定することもできます。詳細な使用方法については、公式ドキュメントを参照してください：<https://github.com/lima-vm/lima>

## Colima

[Colima](https://github.com/abiosoft/colima)は、Limaをベースにしたパッケージで、Dockerをコンテナソフトウェアとして使用しています。また、フリーでオープンソースのソフトウェアです。

Colimaもインストールと使用が非常に簡単です。

```sh
# Dockerクライアントがインストールされていない場合は、まずインストールする必要があります
brew install docker
# Colimaをインストール
brew install colima
```

使用するには、`colima`コマンドを使用するだけです。

```sh
colima start
```

起動が完了したら、通常どおり`docker`コマンドを使用できます。追加のセットアップは必要ありません。

使用が終わったら、仮想化環境をシャットダウンすることもできます：``sh colima start

```sh
colima stop
```

## OrbStack

OrbStackは、macOS上でDockerコンテナとLinuxマシンを高速かつシンプルに実行する方法です。これは、使いやすいアプリケーションで、スーパーチャージされたWSLとDocker Desktop for macOSのようなものと考えることができます。

OrbStackは、DockerコンテナとLinuxマシンを管理するGUIインターフェースとコマンドラインインターフェースを提供しています。

公式ウェブサイトからダウンロードするか、Homebrewを使用してインストールできます。

```sh
brew install --cask orbstack
```

```sh
`brew update --auto-update`を実行しています...

...

...

==> Caveats
OrbStackアプリを開いてセットアップを完了してください。

==> Downloading https://cdn-updates.orbstack.dev/arm64/OrbStack_v0.5.1_985_arm64.dmg
######################################################################## 100.0%
==> Installing Cask orbstack
==> Moving App 'OrbStack.app' to '/Applications/OrbStack.app'
🍺  orbstack was successfully installed!
```

OrbStackを起動するだけで、Dockerを使用できます。

![OrbStackのスクリーンショット](/attachments/mac/how-to-use-docker-on-m1-mac/01.screenshot-orbstack.png)

## 概要

- Apple Siliconチップを搭載したMacデバイスではDockerの使用が簡単ではない
- Docker Desktop for Macは利用可能だが、中規模および大規模企業向けに料金がかかる
- Lima＆Colimaは無料でオープンソースのソリューションである
- OrbStackはGUIソリューションである
