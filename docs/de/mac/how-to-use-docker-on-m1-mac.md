# Verwendung von Docker auf Silicon-Chip (M1/M2) Mac-Computern

<Validator lang="de" :platform-list="['macOS 13.2.1']" date="2023-03-14" />

## Hintergrund und Schwierigkeiten

Apple hat im Jahr 2020 offiziell Computer mit eigenem Chip, dem Apple Silicon, veröffentlicht, und das erste Chip-Modell, das mit dem Computer veröffentlicht wurde, war der M1. Die Architektur dieses Chips wurde von der klassischen x86-Architektur auf die ARM-Architektur geändert.

Um das Problem der Softwareinkompatibilität aufgrund der Änderung der CPU-Architektur zu lösen, hat Apple Rosetta 2 in MacOS integriert, das den APP-Code übersetzt. Diese Software übersetzt x86-Architekturcode zur Laufzeit in ARM-Architekturcode und ermöglicht es den meisten Softwareprogrammen, nahtlos auf MacOS mit den neuen Chips zu laufen.

Während die meisten Softwareprogramme bereits gut auf Apple Silicon (M1/M2) Chips laufen, gibt es eine bestimmte Art von Software, die nicht reibungslos ausgeführt werden kann - Virtualisierungssoftware. Hierzu gehören Softwareprogramme wie virtuelle Maschinen und Docker.

Klassische Virtualisierungssoftware wie VirtualBox geben explizit an, dass es keine Unterstützungspläne gibt. Und obwohl Parallels Desktop dies unterstützt, ist der Preis abschreckend.

Da Docker tatsächlich auf einem virtualisierten Linux als Host auf Nicht-Linux-Systemen angewiesen ist, gibt es keine Möglichkeit, dass Docker reibungslos läuft, ohne eine solide Lösung für virtuelle Maschinen.

## Offizielle Lösung

Docker Desktop für Mac bietet eine Version, die auf Apple Silicon-Chips läuft, und verwendet QEMU, um die Virtualisierung auf verschiedenen Architekturen zu handhaben. Es ist jedoch nicht mehr kostenlos für Unternehmen ab einer bestimmten Größe. Wenn Sie also in einem etwas größeren Unternehmen sind, möchten Sie möglicherweise Docker Desktop für Mac nicht verwenden, und wenn Sie ein persönlicher Benutzer sind, ist Docker Desktop für Mac immer noch eine sehr gute Lösung.

## Lima

[Lima](https://github.com/lima-vm/lima) ist eine kostenlose Open-Source-Software, die ebenfalls QEMU verwendet, um die Virtualisierung für verschiedene Architekturen zu handhaben. Im Gegensatz zu Docker Desktop für Mac verwendet es Containerd anstelle von Docker für seine Container-Software.

> Containerd ist eine Implementierung dieses Standards, und Docker hält sich ebenfalls daran. Daher sind Containerd und Docker in der Verwendung nahezu kompatibel.

Befolgen Sie das offizielle Tutorial, um Lima mit Homebrew zu installieren, und Sie sind bereit, es zu verwenden:

```sh
# Installieren
brew install lima

# Start
limactl start
```

An diesem Punkt können Sie ``nerdctl`` verwenden, um verschiedene Operationen mit Containerd durchzuführen.

```sh
lima nerdctl run -d --name nginx -p 80:80 nginx:alpine
```

Wie Sie sehen können, ist die Verwendung von ``lima nerdctl`` fast identisch mit ``docker``. Zusätzlich zum Herunterfahren des Containers, wenn Sie fertig sind, können Sie auch die virtualisierte Umgebung herunterfahren, um Speicherplatz zu sparen:

```sh
limactl stop
```

lima ermöglicht es Ihnen auch, sehr viele Virtualisierungsdetails festzulegen und mehrere virtuelle Umgebungen einzurichten. Weitere Verwendungsdetails finden Sie in der offiziellen Dokumentation: <https://github.com/lima-vm/lima>

## Colima

[Colima](https://github.com/abiosoft/colima) ist ein Paket, das auf Lima basiert, ebenfalls kostenlose und Open-Source-Software, aber es verwendet Docker für seine Container-Software.

Colima ist auch sehr einfach zu installieren und zu verwenden:

```sh
# Wenn Sie keinen Docker-Client installiert haben, müssen Sie ihn zuerst installieren
brew install docker
# Installieren Sie Colima
brew install colima
```

Um es zu verwenden, verwenden Sie einfach den Befehl `colima`.

```sh
colima start
```

Nach Abschluss des Startvorgangs können Sie den `docker`-Befehl normal verwenden, es ist keine zusätzliche Einrichtung erforderlich.

Sie können die virtualisierte Umgebung auch herunterfahren, wenn Sie sie nicht mehr benötigen: ``sh colima start

```sh
colima stop
```

## OrbStack

"OrbStack ist eine schnelle, leichte und einfache Möglichkeit, Docker-Container und Linux-Maschinen auf macOS auszuführen. Sie können es sich als eine aufgeladene WSL und Docker Desktop für macOS vorstellen, alles in einer benutzerfreundlichen App." (Von der offiziellen Website.)

OrbStack bietet eine grafische Benutzeroberfläche zur Verwaltung von Docker-Containern und Linux-Maschinen auf macOS sowie eine Befehlszeilenschnittstelle.

Sie können es von der offiziellen Website herunterladen: <https://orbstack.dev/> oder mit Homebrew installieren:

```sh
brew install --cask orbstack
```

```sh
Ausführen von `brew update --auto-update`...

...

...

==> Caveats
Öffnen Sie die OrbStack-App, um die Einrichtung abzuschließen.

==> Downloading https://cdn-updates.orbstack.dev/arm64/OrbStack_v0.5.1_985_arm64.dmg
######################################################################## 100.0%
==> Installing Cask orbstack
==> Moving App 'OrbStack.app' to '/Applications/OrbStack.app'
🍺  orbstack wurde erfolgreich installiert!
```

Starten Sie einfach OrbStack und Sie können jetzt Docker verwenden.

![Screenshot von OrbStack](/attachments/mac/how-to-use-docker-on-m1-mac/01.screenshot-orbstack.png)

## Zusammenfassung

- Docker ist für Mac-Geräte mit Apple Silicon Chips nicht einfach zu verwenden
- Docker Desktop für Mac ist verfügbar, berechnet jedoch Gebühren für mittlere und große Unternehmen
- Lima & Colima sind kostenlose und Open-Source-Lösungen
- OrbStack ist eine GUI-Lösung