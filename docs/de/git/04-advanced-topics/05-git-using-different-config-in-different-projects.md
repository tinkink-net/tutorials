# GIT: Verwenden Sie verschiedene Konfigurationen (Git-Benutzername / Gmail oder SSH-Schlüssel) in verschiedenen Projekten

<Validator lang="de" :platform-list="['Git 2.37']" date="2023-03-06" />

## Hintergrund

Bei der Verwendung von Git konfigurieren wir oft einige grundlegende Konfigurationselemente wie den Benutzernamen (`user.name`) und die E-Mail-Adresse (`user.email`). Wenn sie nicht konfiguriert sind, wird beim ersten Commit mit Git ein Fehler gemeldet:

```
Stellen Sie sicher, dass Sie Ihre 'user.email' und 'user.name' in Git konfigurieren
```

Dieses Problem können wir beheben, indem wir den Befehl `git config` verwenden, um die Werte festzulegen.

```sh
git config --global user.name "Tinymemo"
git config --global user.email "tinymemo@tinkink.net"
```

Dieser Befehl schreibt tatsächlich zwei Konfigurationselemente in die globale Konfigurationsdatei: `user.name` und `user.email`. Wir können versuchen, die Konfigurationsdatei zu öffnen (normalerweise unter `~/.gitconfig` oder `C:\Users\<Benutzername>\.gitconfig`):

```
[user]
        name = Tinymemo
        email = tinymemo
```

Wenn wir den Befehl nicht mit der Option `--global` ausführen, wird die Konfigurationsdatei im aktuellen Verzeichnis geschrieben, normalerweise unter `.git/config`.

## Verwenden Sie verschiedene Konfigurationen in verschiedenen Projekten

Wenn wir an Projekten mit unterschiedlichen Identitäten teilnehmen möchten, müssen wir in jedem Projekt eine andere Konfiguration verwenden. Aber wir möchten keine separate Konfiguration in jedem Projekt schreiben, da wir die globale Konfiguration verwenden müssten, wenn das Projekt keine Konfiguration hat. Daher benötigen wir eine bessere Lösung.

Glücklicherweise bietet Git die `includeIf`-Direktive, mit der unterschiedliche Konfigurationen für verschiedene Pfade angegeben werden können.

Angenommen, wir haben die folgenden beiden Pfade:

- `~/work` Der entsprechende Benutzername und die E-Mail-Adresse lauten `Tinymemo` / `tinymemo@somework.com`
- `~/hobby` Der entsprechende Benutzername und die E-Mail-Adresse lauten `Tinymemo` / `tinymemo@somehobby.com`

Zuerst erstellen wir zwei separate Konfigurationsdateien:

`~/.gitconfig-work`：

```
[user]
        name = Tinymemo
        email = tinymemo@somework.com
```

`~/.gitconfig-hobby`：

```
[user]
        name = Tinymemo
        email = tinymemo@somehobby.com
```

Dann fügen wir die folgenden Zeilen zur globalen Konfigurationsdatei `~/.gitconfig` hinzu. Bitte beachten Sie den abschließenden Schrägstrich im Pfad:

```
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
[includeIf "gitdir:~/hobby/"]
    path = ~/.gitconfig-hobby
```

Dann können wir im entsprechenden Verzeichnis des Projekts überprüfen:

```sh

# ~/work/project1
git config user.name // Tinymemo
git config user.email // tinymemo@somework.com

# ~/hobby/project2
git config user.name // Tinymemo
git config user.email // tinymemo@somehobby.com
```

> Hinweis: Sie müssen den `git config` Befehl im Projektverzeichnis ausführen, sonst wird die globale Konfiguration verwendet.

So können wir es einfach machen, verschiedene Konfigurationen in verschiedenen Projekten zu verwenden.

## Verwenden Sie verschiedene Konfigurationen für öffentlichen/privaten Schlüssel

Die oben genannte Konfiguration erleichtert die Verwendung eines anderen Benutzernamens und einer anderen E-Mail-Adresse für verschiedene Projekte. In einigen Fällen möchten wir jedoch auch verschiedene SSH-öffentliche/privaten Schlüssel für verschiedene Projekte verwenden.

Zuerst müssen wir einen neuen öffentlichen Schlüssel erstellen. Wenn wir bereits einen öffentlichen Schlüssel haben, können wir diesen Schritt überspringen.

```sh
cd ~/.ssh
ssh-keygen -t rsa
```

Bitte beachten Sie den Dateinamen, er darf nicht der Standardname `id_rsa` sein, da er sonst mit dem vorhandenen öffentlichen Schlüssel in Konflikt gerät.

```
Enter file in which to save the key (/Users/tinymemo/.ssh/id_rsa): id_rsa_hobby
```

Drücken Sie einfach die Eingabetaste.

Dann können wir eine neue Konfigurationszeile zur Konfigurationsdatei hinzufügen, um den neuen öffentlichen Schlüssel für den `ssh` Befehl anzugeben:

```
[core]
    sshCommand = "ssh -i ~/.ssh/id_rsa_hobby -F /dev/null"
```

Nach diesem Schritt können wir verschiedene öffentliche/privaten Schlüssel für verschiedene Projekte verwenden:

## Zusammenfassung

Durch Verwendung der `[includeIf]` Direktive in der globalen Konfiguration können wir einfach verschiedene Benutzernamen, E-Mail-Adressen und öffentliche/private Schlüssel für verschiedene Projekte in verschiedenen Verzeichnissen verwenden.
