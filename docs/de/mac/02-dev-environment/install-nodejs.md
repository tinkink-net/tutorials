# Node.js auf macOS installieren

<Validator lang="de" :platform-list="['macOS 14.2.1']" date="2024-01-11" />

Node.js ist eine auf Chromes V8 JavaScript-Engine basierende JavaScript-Laufzeitumgebung. Sie verwendet ein ereignisgesteuertes, nicht blockierendes I/O-Modell, das sie leichtgewichtig und effizient macht.

Es gibt viele Anwendungsfälle für Node.js, wie z.B. die Erstellung von Befehlszeilentools, Webanwendungen und sogar Desktopanwendungen. Sie können auch viele CLI-Tools mit npm installieren, auch wenn Sie Node.js nicht verwenden.

## Option 1: Node.js über den offiziellen Installer installieren

Der offizielle Node.js-Installer ist auf [https://nodejs.org/](https://nodejs.org/) verfügbar. Sie können den Installer von der Website herunterladen und installieren.

![Offizielle Website](/attachments/mac/install-nodejs/01.official-website.png)

Es gibt zwei Hauptversionen von Node.js: LTS und Current. LTS ist die Version mit langfristiger Unterstützung, die stabiler ist. Die Versionsnummer ist immer gerade. Current ist die neueste Version, die fortschrittlicher ist. Für die meisten Benutzer wird empfohlen, die LTS-Version zu installieren.

![Node.js Installer](/attachments/mac/install-nodejs/02.nodejs-installer.png)

Danach können Sie den Befehl `node` im Terminal verwenden.

## Option 2: Node.js über Homebrew installieren

[Homebrew](https://brew.sh/) ist ein Paketmanager für macOS. Sie können Node.js mit Homebrew installieren.

```sh
brew install node
```

Dann können Sie den Befehl `node` im Terminal verwenden.

## Option 3: Node.js über fnm installieren

Node.js über den offiziellen Installer oder Homebrew zu installieren, installiert Node.js global, aber Sie können nur eine Version von Node.js installieren. Wenn Sie mehrere Versionen von Node.js installieren möchten, können Sie einen Versionsmanager verwenden.

[fnm](https://github.com/Schniz/fnm) ist ein schneller und einfacher Versionsmanager für Node.js, der in Rust entwickelt wurde.

Sie können fnm mit Homebrew installieren:

```sh
brew install fnm
```

oder mit curl installieren:

```sh
curl -fsSL https://fnm.vercel.app/install | bash
```

Dann können Sie Node.js mit fnm installieren:

```sh
fnm install 20
```

Sie können auch mehrere Versionen von Node.js mit fnm installieren:

```sh
fnm install 20
fnm install 16
fnm install 14
```

Dann können Sie den Befehl `fnm use` verwenden, um zwischen verschiedenen Versionen von Node.js zu wechseln:

```sh
fnm use 20
```

Sie können auch den Befehl `fnm default` verwenden, um die Standardversion von Node.js festzulegen:

```sh
fnm default 20
```

Wenn Sie an einem Projekt arbeiten, können Sie auch die Datei `.node-version` verwenden, um die Version von Node.js anzugeben:

```sh
echo "20" > .node-version

# Installieren Sie die in der .node-version Datei angegebene Version von Node.js
fnm install
# Verwenden Sie die in der .node-version Datei angegebene Version von Node.js
fnm use
```

## Zusammenfassung

Es gibt viele Möglichkeiten, Node.js auf macOS zu installieren. Sie können die Methode wählen, die am besten zu Ihnen passt. Für Entwickler wird empfohlen, fnm zu verwenden, um Node.js zu installieren, da es flexibler ist.