# Wie man die SSH-Verbindung offen hält (Broken Pipe)

Wenn Sie SSH verwenden, stoßen Sie oft auf eine unterbrochene Verbindung. Manchmal schneiden Sie einfach aus dem Fenster, um andere Arbeiten zu erledigen, und wenn Sie zum Terminalfenster zurückkehren, stellen Sie fest, dass die SSH-Verbindung unterbrochen wurde. In diesem Moment können Sie nichts direkt tun, aber nach einigen Sekunden des Wartens erscheint die folgende Meldung:

```sh
Write failed: Broken pipe
```

Das ist eine sehr unproduktive Situation.

## Grund

SSH verwendet lange Verbindungen, daher wird die Verbindung bei Datenkommunikation offen gehalten. Ohne die Konfiguration zu ändern, wird SSH jedoch nach einer bestimmten Zeit ohne Datenkommunikation getrennt, was zu dem oben genannten Phänomen führt.

## Lösung

Da die Verbindung getrennt wird, weil keine Datenkommunikation stattfindet, ist es möglich, dass SSH während der Leerlaufzeit in regelmäßigen Abständen einige Kommunikation generiert. Die Antwort ist ja. Und dies ist ein Problem, für das sowohl die Server- als auch die Clientseite von SSH Lösungen bieten.

### Serverseitige Einstellungen

Der serverseitige SSH-Dienst wird sshd genannt, daher befindet sich die Konfigurationsdatei unter `/etc/ssh/sshd_config`, und Sie müssen nur diese Datei ändern.

```
ClientAliveInterval 60
ClientAliveCountMax 5
```

Hierbei gibt `ClientAliveInterval` an, wie oft ein "Herzschlag" an den Client gesendet werden soll, und `ClientAliveCountMax` gibt an, wie oft die Verbindung getrennt werden soll, wenn keine Antwort empfangen wird. Die obige Konfiguration bedeutet also: Sende alle 60 Sekunden einen Herzschlag an den Client und trenne die Verbindung, wenn keine Antwort 5 Mal empfangen wird.

Starten Sie den sshd-Dienst nach der Konfiguration neu: `systemctl restart sshd.service` oder `service sshd restart`.

### Client-Einstellungen

Die Client-Konfiguration befindet sich in `/etc/ssh/ssh_config`, was eine globale Konfigurationsdatei ist. Wenn Sie die Einstellungen nur für den aktuellen Benutzer festlegen möchten, können Sie auch `~/.ssh/ssh_config` ändern.

```
TCPKeepAlive yes
ServerAliveInterval 60
ServerAliveCountMax 5
```

Die Parameterbedeutungen sind fast die gleichen wie auf der Serverseite.

### Temporäre Lösung auf der Clientseite

Neben der Änderung der Konfiguration kann der Client auch die folgenden Parameter verwenden, um beim Herstellen einer Verbindung einen zeitgesteuerten "Herzschlag" festzulegen.

```sh
ssh -o ServerAliveInterval=60 root@xx.xx.xx.xx
```

## Zusammenfassung

Sobald Sie den "Herzschlag" festgelegt haben, müssen Sie sich keine Sorgen mehr machen, dass die SSH-Verbindung ohne Grund getrennt wird.
