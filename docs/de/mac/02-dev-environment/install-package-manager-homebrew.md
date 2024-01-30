# Wie man den Paketmanager Homebrew installiert

[Homebrew](https://brew.sh/) ist ein Paketmanager für macOS. Aber was ist ein Paketmanager? Ein Paketmanager ist ein Tool, das es Ihnen ermöglicht, Softwarepakete einfach über die Befehlszeile zu installieren. Es ist ähnlich wie der App Store auf macOS, aber es handelt sich um ein Befehlszeilentool und es bietet mehr Softwarepakete als der App Store.

Mit Homebrew können wir viele gängige Softwarepakete wie Node.js, Git, Nginx usw. installieren. In diesem Tutorial erfahren Sie, wie Sie Homebrew auf macOS installieren können.

## Homebrew installieren

Die offizielle Website von Homebrew ist [brew.sh](https://brew.sh/). Sie können die offizielle Website besuchen, um mehr über Homebrew zu erfahren.

Bevor Sie Homebrew installieren, müssen Sie die Xcode-Befehlszeilentools installieren. Sie können die Xcode-Befehlszeilentools installieren, indem Sie den folgenden Befehl im Terminal ausführen:

```sh
xcode-select --install
```

Wenn Sie die Xcode-Befehlszeilentools bereits installiert haben, können Sie Homebrew installieren, indem Sie den folgenden Befehl im Terminal ausführen:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Wenn alles gut läuft, sehen Sie die folgende Ausgabe:

```sh
==> Next steps:
- Run `brew help` to get started
- Further documentation:
    https://docs.brew.sh
```

Dann können Sie den Befehl `brew` im Terminal verwenden.

## Installation über Mirror

Wenn Sie sich in China befinden, können Sie Homebrew über einen Mirror installieren. Führen Sie den folgenden Befehl im Terminal aus:

```sh
git clone --depth=1 https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.git brew-install
/bin/bash brew-install/install.sh
rm -rf brew-install
```

Der obige Code installiert Homebrew über den Mirror der Tsinghua University. Wenn Sie andere Mirror-Seiten bevorzugen, können Sie den Mirror der Tsinghua University durch andere Mirror-Seiten ersetzen.

Wenn Sie einen Mirror benötigen, um Homebrew zu installieren, müssen Sie möglicherweise auch einen Mirror verwenden, um andere Softwarepakete zu installieren. Verwenden Sie den folgenden Befehl, um den Mirror festzulegen:

```sh
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
```

Sie können den obigen Code zur Datei `.bashrc` oder `.zshrc` oder an anderer Stelle hinzufügen.

## Verwendung

Sie können den `brew`-Befehl verwenden, um Softwarepakete zu installieren. Zum Beispiel können Sie den folgenden Befehl verwenden, um Node.js zu installieren:

```sh
brew install node
```

> Wir haben ein weiteres Tutorial zur Installation von Node.js. Sie können es [hier](/en/mac/install-nodejs.md) lesen.

Sie können den `brew uninstall`-Befehl verwenden, um ein Softwarepaket zu deinstallieren:

```sh
brew uninstall node
```

Homebrew Cask ist eine Erweiterung von Homebrew, mit der Sie größere Binärdateien installieren können. Zum Beispiel können Sie den folgenden Befehl verwenden, um Google Chrome zu installieren:

```sh
brew install --cask google-chrome
```

Weitere Befehle finden Sie in der [Dokumentation](https://docs.brew.sh/).

## Homebrew deinstallieren

Wenn Sie Homebrew deinstallieren möchten, können Sie den folgenden Befehl im Terminal ausführen:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

## Fazit

In diesem Tutorial haben wir gelernt, wie man Homebrew auf macOS installiert. Jetzt haben Sie den beliebtesten Paketmanager auf macOS. Sie können ihn verwenden, um viele Softwarepakete zu installieren.

Viel Spaß damit!
