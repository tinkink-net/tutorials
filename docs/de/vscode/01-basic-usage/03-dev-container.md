# Nutzen Sie die Dev Container-Funktion in VS Code

## Was ist ein Container?

> Wenn Sie mit Containern oder Docker vertraut sind, können Sie diesen Abschnitt überspringen.

Ein Container ist eine leichtgewichtige, portable und eigenständige Einheit, die Software in einer isolierten Umgebung ausführen kann.

Er verpackt den Anwendungscode zusammen mit seinen Abhängigkeiten, Bibliotheken und Konfigurationsdateien und stellt sicher, dass er in verschiedenen Computerumgebungen konsistent ausgeführt wird.

Container basieren auf Containerisierungstechnologien wie Docker, die es Entwicklern ermöglichen, Anwendungen einfach zu erstellen, bereitzustellen und zu verwalten.

> Der Begriff "Container" wird oft synonym mit "Docker-Container" verwendet, da Docker die beliebteste Containerisierungsplattform ist.

## Was ist ein Dev Container?

Ein Dev Container ist ein spezieller Containertyp, der speziell für Entwicklungszwecke konzipiert wurde. Er bietet eine konsistente und isolierte Umgebung für Entwickler, um darin zu arbeiten, und stellt sicher, dass sich die Anwendung unabhängig davon, wo sie ausgeführt wird, gleich verhält.

Er kann viele häufige Entwicklungsprobleme lösen, wie Abhängigkeitskonflikte, Umgebungsinkonsistenzen und Versionskonflikte. Durch die Verwendung eines Dev Containers können Entwickler sicherstellen, dass ihre Entwicklungsumgebung reproduzierbar und konsistent ist, was die Zusammenarbeit mit anderen erleichtert und "bei mir funktioniert es"-Probleme vermeidet.

## Vorteile der Verwendung von Dev Containern

Die Verwendung von Dev Containern in Ihrem Entwicklungsworkflow bietet mehrere Vorteile:

1. **Konsistente Entwicklungsumgebung**: Jeder im Team arbeitet mit genau der gleichen Umgebung, was "bei mir funktioniert es"-Probleme beseitigt.

2. **Isolation**: Ihre Entwicklungsumgebung ist von Ihrem lokalen System isoliert, was Konflikte zwischen verschiedenen Projekten oder Versionen von Abhängigkeiten verhindert.

3. **Einfaches Onboarding**: Neue Teammitglieder können schnell starten, ohne Zeit mit der Konfiguration ihrer lokalen Umgebung zu verbringen.

4. **Reproduzierbare Builds**: Die Entwicklungsumgebung ist als Code definiert, was sie auf verschiedenen Maschinen reproduzierbar macht.

5. **Saubere lokale Maschine**: Halten Sie Ihre lokale Maschine sauber, da alle projektspezifischen Abhängigkeiten im Container enthalten sind.

## Voraussetzungen für die Verwendung von Dev Containern

Bevor Sie mit der Verwendung von Dev Containern in VS Code beginnen, müssen Sie sicherstellen, dass Sie die folgenden Voraussetzungen installiert haben:

**Docker**

Dev Container basieren auf Docker, um Container-Umgebungen zu erstellen und zu verwalten. Sie müssen Docker installieren, bevor Sie Dev Container verwenden können.

> Sie können Docker Desktop (unter Windows und macOS) oder Docker Engine (unter Linux) von der [offiziellen Docker-Website](https://www.docker.com/products/docker-desktop/) wählen. Sie können auch Docker-Tools von Drittanbietern wie OrbStack verwenden, weitere Details finden Sie unter [Docker auf Silicon-Chip (M1/M2/M3) Mac-Computern verwenden](/de/mac/how-to-use-docker-on-m1-mac.html).


**VS Code**

Stellen Sie sicher, dass Sie die neueste Version von Visual Studio Code installiert haben. Sie können es von [code.visualstudio.com](https://code.visualstudio.com/) herunterladen.


**Dev Containers-Erweiterung**

Installieren Sie die Dev Containers-Erweiterung aus dem VS Code Marketplace.

![Dev Containers-Erweiterung installieren](/attachments/vscode/dev-container/01-extension.png)

## Wie man Dev Container in VS Code verwendet: Eine Schritt-für-Schritt-Anleitung

Um Dev Container in Visual Studio Code zu verwenden, öffnen Sie zunächst Ihr Projekt und folgen Sie dann diesen Schritten:

**Dev Container-Konfiguration hinzufügen**:

Öffnen Sie die Befehlspalette (`Strg`+`Umschalt`+`P` oder `Cmd`+`Umschalt`+`P` unter macOS) und geben Sie "Dev Containers: Add Development Container Configuration Files..." ein, wählen Sie dann "Add configuration to workspace".

![Dev Container-Konfiguration hinzufügen](/attachments/vscode/dev-container/02-add-config.png)

Wählen Sie eine vordefinierte Dev Container-Konfiguration aus der Liste aus. Wählen Sie beispielsweise "Node.js & TypeScript", wenn Sie an einem Node.js-Projekt arbeiten.

![Node.js-Konfiguration auswählen](/attachments/vscode/dev-container/03-select-nodejs.png)

Wählen Sie dann die Image-Version und andere Optionen basierend auf Ihren Projektanforderungen aus. Wenn Sie sich nicht sicher sind, können Sie die Standardoptionen verwenden.

Danach erstellt VS Code einen `.devcontainer`-Ordner in Ihrem Workspace mit einer Konfigurationsdatei `devcontainer.json`:

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

**Öffnen Sie Ihr Projekt im Dev Container**:

Sie können den Dev Container öffnen, indem Sie auf die Schaltfläche "Open a remote window" in der unteren linken Ecke des VS Code-Fensters klicken und dann "Reopen in Container" auswählen.

![Ein Remote-Fenster öffnen](/attachments/vscode/dev-container/04-open-remote-window.png)

![Im Container neu öffnen](/attachments/vscode/dev-container/05-reopen-in-container.png)

Alternativ können Sie die Befehlspalette öffnen (`Strg`+`Umschalt`+`P` oder `Cmd`+`Umschalt`+`P` unter macOS) und "Dev Containers: Reopen in Container" eingeben.

Dann sehen Sie einen Fortschrittsbalken, der anzeigt, dass VS Code das Dev Container-Image erstellt und den Container startet. Sie können auf die Schaltfläche "Show Log" klicken, um die Build-Logs anzuzeigen.

![Fortschritt](/attachments/vscode/dev-container/06-progress.png)

Wenn alles gut geht, sehen Sie ein neues VS Code-Fenster, das mit dem Dev Container verbunden ist. Bevor Sie mit der Arbeit beginnen können, müssen Sie möglicherweise warten, bis der Container die Initialisierung abgeschlossen hat (Herunterladen und Installieren notwendiger Abhängigkeiten und Erweiterungen).

![Container wird initialisiert](/attachments/vscode/dev-container/07-container-initializing.png)

Sobald der Container bereit ist, können Sie mit der Arbeit an Ihrem Projekt innerhalb des Containers beginnen.

## Fehlerbehebung bei häufigen Problemen

Wenn Sie auf Probleme mit Dev Containern stoßen, versuchen Sie diese Schritte zur Fehlerbehebung:

1. **Überprüfen Sie, ob Docker läuft**: Stellen Sie sicher, dass Docker auf Ihrem Computer installiert ist und läuft.
2. **Erhöhen Sie die Ressourcenzuweisung**: Wenn Container langsam laufen, versuchen Sie, die Speicher- und CPU-Zuweisung für Docker in den Docker Desktop-Einstellungen zu erhöhen.
3. **Aktualisieren Sie VS Code und Erweiterungen**: Stellen Sie sicher, dass Sie die neueste Version von VS Code und der Dev Containers-Erweiterung verwenden.
4. **Überprüfen Sie die Netzwerkeinstellungen**: Wenn Ihr Container auf Netzwerkressourcen zugreifen muss, stellen Sie sicher, dass Firewall-Einstellungen keine Verbindungen blockieren.
5. **Überprüfen Sie die Logs**: Verwenden Sie die Schaltfläche "Show Log" im Dev Containers-Fortschrittsbalken, um detaillierte Logs zur Fehlerbehebung anzuzeigen.

## Fazit

Dev Container in VS Code bieten eine leistungsstarke Möglichkeit, konsistente, isolierte Entwicklungsumgebungen zu erstellen. Durch die Nutzung der Container-Technologie können Sie sicherstellen, dass Ihre Entwicklungsumgebung auf verschiedenen Maschinen reproduzierbar ist und häufige umgebungsbezogene Probleme vermeiden.

Egal, ob Sie an einem persönlichen Projekt arbeiten oder mit einem Team zusammenarbeiten, Dev Container können Ihren Workflow optimieren und es Ihnen erleichtern, sich auf das Schreiben von Code zu konzentrieren, anstatt Umgebungen zu konfigurieren.
