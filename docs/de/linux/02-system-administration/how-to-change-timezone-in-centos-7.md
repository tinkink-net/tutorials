---
description: Erfahren Sie, wie Sie die Zeitzone auf Ihrem Linux-Betriebssystem mit diesem Schritt-für-Schritt-Tutorial ändern können. Egal, ob Sie Ubuntu, Debian oder CentOS verwenden, unser umfassender Leitfaden zeigt Ihnen, wie Sie timedatectl verwenden, um die korrekte Zeitzone zu überprüfen und einzustellen.
---

# Wie man die Zeitzone in Linux ändert (Ubuntu, Debian, CentOS 7)

<Validator lang="de" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9']" date="2023-03-05" />

> Um die Zeitzone zu ändern, müssen Sie den Root-Benutzer oder einen Benutzer mit sudo-Berechtigungen verwenden.

## Überprüfen Sie die aktuelle Zeitzone

In modernen Linux-Distributionen wie Ubuntu, Debian oder CentOS kann die aktuelle Zeitzone mit dem folgenden Befehl überprüft werden.

```sh
timedatectl
```

Die Ausgabe lautet wie folgt.

```
      Lokale Zeit: Mi 2021-11-06 22:43:42 UTC
 Universelle Zeit: Mi 2021-11-06 22:43:42 UTC
        RTC-Zeit: Mi 2021-11-06 22:43:42
   Zeitzone: Etc/UTC (UTC, +0000)
     NTP aktiviert: nein
NTP synchronisiert: ja
 RTC in lokaler Zeitzone: nein
      DST aktiv: n/a
```

Wie Sie aus der obigen Ausgabe sehen können, wird derzeit die Zeitzone UTC verwendet.

Eine andere Möglichkeit, die aktuelle Zeitzone zu überprüfen, besteht darin, die Datei `/etc/localtime` zu überprüfen, die eine symbolische Verknüpfung ist und auf die derzeit verwendete Zeitzonendatei verweist.

```sh
ls -l /etc/localtime
```

Die Ausgabe lautet wie folgt.

```
lrwxrwxrwx. 1 root root 29 Dez 11 09:25 /etc/localtime -> . /usr/share/zoneinfo/Etc/UTC
```

Erneut können Sie sehen, dass die UTC-Zeitzone derzeit verwendet wird.

## Zeitzone ändern

Überprüfen Sie zunächst die Liste der derzeit verfügbaren Zeitzonen.

```sh
timedatectl list-timezones
```

Die Ausgabe lautet wie folgt.

```
...
America/Tijuana
America/Toronto
America/Tortola
America/Vancouver
America/Whitehorse
America/Winnipeg
...
```

Als nächstes können Sie die Zeitzone mit dem folgenden Befehl festlegen.

```sh
timedatectl set-timezone Asia/Shanghai
```

> Hinweis: Möglicherweise benötigen Sie sudo-Berechtigungen, um den obigen Befehl auszuführen. `sudo timedatectl set-timezone Asia/Shanghai`

Im obigen Beispiel haben wir die Zeitzone auf China Standard Time `Asia/Shanghai` festgelegt.

Um die aktuelle Zeitzone erneut zu überprüfen.

```sh
timedatectl
```

Die Ausgabe lautet wie folgt.

```
      Lokale Zeit: drei 2021-11-10 09:34:45 CST
  Universelle Zeit: drei 2021-11-10 01:34:45 UTC
        RTC-Zeit: 三 2021-11-10 09:34:44
       Zeitzone: Asia/Shanghai (CST, +0800)
     NTP aktiviert: ja
NTP synchronisiert: ja
 RTC in lokaler TZ: ja
      DST aktiv: n/a
```

Die Zeitzone kann auch mit der Softlink-Methode geändert werden.

```sh
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

> Hinweis: Möglicherweise benötigen Sie sudo-Berechtigungen, um den obigen Befehl auszuführen. `sudo timedatectl set-timezone Asia/Shanghai`

## Zusammenfassung

Mit dem modernen Linux ist es sehr einfach, die Zeitzone zu ändern, verwenden Sie einfach `timedatectl`. Natürlich können Sie die Zeitzone auch auf traditionelle Weise ändern, indem Sie einen Softlink verwenden.