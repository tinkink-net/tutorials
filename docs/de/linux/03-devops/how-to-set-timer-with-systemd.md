# Wie man einen Timer mit systemd in Linux einstellt

<Validator lang="de" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9']" date="2023-03-29" />

## Hintergrund

Timer werden in Linux weit verbreitet eingesetzt. Sie werden verwendet, um Aufgaben zu einem bestimmten Zeitpunkt oder in bestimmten Intervallen auszuführen. Zum Beispiel können Sie einen Timer verwenden, um ein Backup-Skript jeden Tag, jede Woche oder jeden Monat zu einer bestimmten Zeit auszuführen.

Einige Anwendungsbereiche:

- Planung automatisierter Backups: Sie können beispielsweise einen Timer einstellen, um eine Datenbank jeden Tag zu einer bestimmten Zeit zu sichern.
- Überwachung der Systemleistung: Planung regelmäßiger Überprüfungen der CPU-Auslastung, des Speicherbedarfs, des Festplattenspeicherplatzes und anderer Systemmetriken. Dies hilft Administratoren dabei, Leistungsprobleme zu identifizieren und zu beheben, bevor sie kritisch werden.
- Ausführen von Skripten in regelmäßigen Abständen: Linux-Timer können verwendet werden, um Skripte in regelmäßigen Abständen auszuführen. Dies ist hilfreich für Aufgaben wie das Bereinigen temporärer Dateien oder das Ausführen von Systemwartungsskripten.

Ältere Versionen von Linux verwenden den Cron-Daemon zur Planung von Aufgaben. Der Cron-Daemon wird jedoch für neue Installationen nicht mehr empfohlen. Stattdessen sollten Sie den systemd-Timer verwenden.

## Liste vorhandener Timer

Um alle vorhandenen Timer aufzulisten, verwenden Sie den folgenden Befehl:

```sh
systemctl list-timers
```

Sie sehen eine Liste der Timer, einschließlich des Namens des Timers, der nächsten Auslösezeit und der letzten Auslösezeit.

```
NÄCHSTE                       VERBLEIBEND    LETZT VERGANGEN EINHEIT                       AKTIVIERT
Mi 2023-03-29 10:06:35 CST   4min 49s übrig n/a  n/a    ua-timer.timer               ua-timer.service
Mi 2023-03-29 10:14:03 CST   12min übrig    n/a  n/a    systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Mi 2023-03-29 17:35:56 CST   7h übrig       n/a  n/a    motd-news.timer              motd-news.service
Do 2023-03-30 00:00:00 CST   13h übrig      n/a  n/a    dpkg-db-backup.timer         dpkg-db-backup.service
Do 2023-03-30 00:00:00 CST   13h übrig      n/a  n/a    logrotate.timer              logrotate.service
Do 2023-03-30 03:27:59 CST   17h übrig      n/a  n/a    apt-daily.timer              apt-daily.service
Do 2023-03-30 06:58:06 CST   20h übrig      n/a  n/a    apt-daily-upgrade.timer      apt-daily-upgrade.service
So 2023-04-02 03:10:16 CST   3 Tage übrig   n/a  n/a    e2scrub_all.timer            e2scrub_all.service
```

## Timer mit Linux systemd einstellen

> Um einen Timer einzustellen, benötigen Sie den Root-Benutzer oder einen Benutzer mit sudo-Berechtigungen.

Um einen Timer mit Linux systemd einzustellen und die Ausgabe in eine Datei zu protokollieren, befolgen Sie diese Schritte:

Erstellen Sie zunächst eine neue Timer-Unit-Datei im Verzeichnis `/etc/systemd/system`. Sie können sie beliebig benennen, aber sie muss die Erweiterung `.timer` haben. Erstellen Sie zum Beispiel eine Datei mit dem Namen `helloworld.timer`.

Fügen Sie der Timer-Unit-Datei die folgenden Zeilen hinzu:

```
[Unit]
Description=Hello World Timer

[Timer]
OnCalendar=*:0/10
Unit=helloworld.service

[Install]
WantedBy=timers.target
```

Die `.timer`-Datei ist eine systemd-Unit-Datei, die einen Timer definiert. Sie enthält einen `[Unit]`-Abschnitt, der eine Beschreibung des Timers enthält, einen `[Timer]`-Abschnitt, der festlegt, wann der Timer ausgelöst werden soll und welcher Service ausgeführt werden soll, sowie einen `[Install]`-Abschnitt, der angibt, wo der Timer installiert werden soll.

Dies teilt dem System mit, dass die `helloworld.service`-Unit alle 10 Minuten ausgeführt werden soll und der Timer alle 10 Minuten jeder Stunde (`*`) mit `OnCalendar` ausgelöst wird.

> Hinweis: `OnCalendar` verwendet eine flexible Syntax, um festzulegen, wann der Timer ausgelöst werden soll. In diesem Beispiel bedeutet `*:0/10` "alle 10 Minuten". Sie können andere Werte verwenden, um unterschiedliche Intervalle festzulegen.

> Für weitere Informationen siehe den Anhang.

Erstellen Sie dann eine neue Service-Unit-Datei im selben Verzeichnis. Sie können sie beliebig benennen, aber sie muss die Erweiterung `.service` haben. Erstellen Sie zum Beispiel eine Datei mit dem Namen `helloworld.service`.

Fügen Sie der Service-Unit-Datei die folgenden Zeilen hinzu:

```
[Unit]
Description=Hello World Service

[Service]
Type=oneshot
ExecStart=/bin/echo "Hello World"

[Install]
WantedBy=multi-user.target
```

Die `.service`-Datei ist eine systemd-Unit-Datei, die einen Service definiert. Die Abschnitte `[Unit]` und `[Install]` sind ähnlich wie in der `.timer`-Datei. Der Abschnitt `[Service]` definiert, wie der Service ausgeführt werden soll.

Dies teilt dem System mit, den Befehl `/bin/echo "Hello World"` auszuführen, wenn der Timer ausgelöst wird.

Laden Sie den systemd-Daemon neu, um die neuen Unit-Dateien zu laden:

```sh
sudo systemctl daemon-reload
```

Aktivieren und starten Sie den Timer:

```sh
sudo systemctl enable helloworld.timer
sudo systemctl start helloworld.timer
```

Nun wird das System alle 10 Minuten "Hello World" ausgeben und die Ausgabe in eine Datei protokollieren. Wir können die Timerliste erneut überprüfen, um zu sehen, ob der Timer läuft:

```sh
systemctl list-timers
```

```
NEXT                        LEFT          LAST                        PASSED       UNIT                         ACTIVATES

Wed 2023-03-29 10:10:00 CST 1min 46s übrig n/a                         n/a          helloworld.timer             helloworld.service
Wed 2023-03-29 10:14:03 CST 5min übrig     n/a                         n/a          systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Wed 2023-03-29 16:14:38 CST 6h übrig       Wed 2023-03-29 10:06:43 CST vor 1min 29s ua-timer.timer               ua-timer.service
Wed 2023-03-29 17:18:24 CST 7h übrig       n/a                         n/a          motd-news.timer              motd-news.service
Thu 2023-03-30 00:00:00 CST 13h übrig      n/a                         n/a          dpkg-db-backup.timer         dpkg-db-backup.service
Thu 2023-03-30 00:00:00 CST 13h übrig      n/a                         n/a          logrotate.timer              logrotate.service
Thu 2023-03-30 05:50:50 CST 19h übrig      n/a                         n/a          apt-daily.timer              apt-daily.service
Thu 2023-03-30 06:41:07 CST 20h übrig      n/a                         n/a          apt-daily-upgrade.timer      apt-daily-upgrade.service
Sun 2023-04-02 03:10:39 CST 3 Tage übrig   n/a                         n/a          e2scrub_all.timer            e2scrub_all.service

Wie Sie sehen können, läuft der `helloworld.timer` und die nächste Auslösezeit ist in 1 Minute und 46 Sekunden. Warten Sie ein paar Minuten und überprüfen Sie die Protokolldatei:

```sh
journalctl -u helloworld.service
```

Sie sollten die Ausgabe des `echo`-Befehls sehen:

```
Mar 29 10:10:02 ubuntu systemd[1]: Starte Hello World Service...
Mar 29 10:10:02 ubuntu echo[7942]: Hallo Welt
Mar 29 10:10:02 ubuntu systemd[1]: helloworld.service: Erfolgreich deaktiviert.
Mar 29 10:10:02 ubuntu systemd[1]: Beendete Hello World Service.
```

Wenn Sie die Ausgabe in eine Datei umleiten möchten, können Sie die `ExecStart`-Zeile in der Service-Unit-Datei wie folgt ändern:

```sh
ExecStart=/bin/sh -c '/bin/echo "Hallo Welt" >> /tmp/helloworld.log'
```

## Anhang

### OnCalendar

`OnCalendar` ist eine Option im `[Timer]`-Abschnitt einer Timer-Unit-Datei, die angibt, wann der Timer ausgelöst werden soll. Die Syntax für `OnCalendar` lautet wie folgt:

```
OnCalendar=
```

Der Kalenderausdruck kann ein einfacher oder komplexer Ausdruck sein, der den Zeitplan für die Aufgabe festlegt. Der vollständige Ausdruck sieht wie folgt aus:

```
Wochentag Jahr-Monat-Tag Stunde:Minute:Sekunde
```

- Wochentag: `Mon`, `Die`, `Mit`, `Don`, `Fre`, `Sam`, `Son`
- Jahr/Monat/Tag: Verwenden Sie Zahlen
- Stunde/Minute/Sekunde: Verwenden Sie Zahlen

Jeder Teil kann ein Bereich, eine Liste oder ein Intervall sein oder `*`, um jeden Wert anzupassen. Zum Beispiel:

- `Mon..Fre`: Montag bis Freitag
- `Mon,Fre`: Montag und Freitag
- `8..18/2`: 8:00 bis 18:00 Uhr, alle 2 Stunden
- `*-*-1`: Der erste Tag jedes Monats

Jeder Teil kann weggelassen werden. Zum Beispiel:

- Um eine Aufgabe jede Stunde auszuführen, verwenden Sie `OnCalendar=*:0`
- Um eine Aufgabe täglich um 15:30 Uhr auszuführen, verwenden Sie `OnCalendar=15:30`
- Um eine Aufgabe jeden Montag um 9:00 Uhr auszuführen, verwenden Sie `OnCalendar=Mon 9:00`
- Um eine Aufgabe alle 15 Minuten auszuführen, verwenden Sie `OnCalendar=*:0/15`
- Um eine Aufgabe an jedem Wochentag um 8:00 Uhr auszuführen, verwenden Sie `OnCalendar=Mon..Fre 8:00`

Zusätzlich zu diesen grundlegenden Ausdrücken können Sie komplexere Ausdrücke verwenden, die Bereiche, Listen und Intervalle enthalten. Hier sind einige Beispiele:

- Um eine Aufgabe alle 2 Stunden zwischen 8:00 Uhr und 18:00 Uhr auszuführen, verwenden Sie `OnCalendar=8..18/2:0`
- Um eine Aufgabe am 15. Tag jeden Monats um 10:00 Uhr auszuführen, verwenden Sie `OnCalendar=*-*-15 10:00`

Sie können auch die speziellen Schlüsselwörter `minutely`, `hourly`, `daily`, `weekly`, `monthly` und `yearly` verwenden, um häufig verwendete Zeitpläne anzugeben.

Sie können Ihre `OnCalendar`-Ausdrücke jederzeit mit dem Befehl `systemd-analyze` überprüfen:

```sh
systemd-analyze calendar "Mon..Fri 8:00"
```

Die Ausgabe zeigt die normalisierte Form des Ausdrucks und die nächste Ausführungszeit an:

```
  Original form: Mon..Fri 8:00
Normalized form: Mon..Fri *-*-* 08:00:00
    Next elapse: Thu 2023-03-30 08:00:00 CST
       (in UTC): Thu 2023-03-30 00:00:00 UTC
       From now: 18h left
```

Insgesamt bietet die Option `OnCalendar` eine flexible und leistungsstarke Möglichkeit, Aufgaben in Linux mithilfe von systemd-Timern zu planen. Durch das Verständnis der Syntax und die Verwendung der entsprechenden Kalenderausdrücke können Sie Ihr System automatisieren und Zeit und Aufwand sparen.