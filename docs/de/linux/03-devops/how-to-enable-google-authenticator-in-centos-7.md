# Aktivieren Sie Google Authenticator für die Zwei-Faktor-Authentifizierung (2FA / MFA) in CentOS 7

## Zwei-Faktor-Authentifizierung

Die Zwei-Faktor-Authentifizierung (2FA) ist der Prozess, bei dem zwei separate Satz von Anmeldeinformationen bereitgestellt werden, um einen Benutzer während der Anmeldung zu authentifizieren. Manchmal werden auch mehr als 2 Anmeldeinformationen verwendet, was als Multi-Faktor-Authentifizierung (MFA) bezeichnet wird.

Die Zwei-Faktor-Authentifizierung kann effektiv vor Sicherheitsrisiken durch Passwortknacken, Passwortlecks usw. schützen. Selbst wenn ein Angreifer das Passwort hat, gibt es nur einen Satz von Anmeldeinformationen, der die Zwei-Faktor-Authentifizierung nicht bestehen kann.

Im Allgemeinen besteht der erste Satz von Anmeldeinformationen für die Zwei-Faktor-Authentifizierung aus dem Passwort, das wir kennen, während der zweite Satz von Anmeldeinformationen ein Token-Code wie Google Authenticator oder eine SMS-Authentifizierung auf dem Mobiltelefon sein kann.

Der Google Authenticator-Authentifizierungscode ist im Wesentlichen eine Reihe von Zahlen, die auf einem Zeitstempel basieren und alle 30 Sekunden aktualisiert werden. Der offizielle Begriff dafür ist "zeitbasiertes Einmalpasswort-Algorithmus" (TOTP). Es erfordert keine Internetverbindung und kann jederzeit zur Authentifizierung verwendet werden.

## Installieren Sie Google Authenticator und initialisieren Sie es

Fügen Sie zunächst die EPEL-Quelle hinzu.

```sh
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```

> Wenn Sie nicht den Root-Benutzer verwenden, müssen Sie möglicherweise ``sudo`` verwenden, um den Befehl auszuführen.

Installieren Sie als nächstes Google Authenticator.

```sh
yum install google-authenticator
```

Als nächstes müssen Sie initialisieren.

```sh
google-authenticator
```

Die Seite zeigt einen großen QR-Code an. Verwenden Sie zu diesem Zeitpunkt Google Authenticator oder eine ähnliche Authenticator-App, um den QR-Code zu scannen und ihn zu Ihrem Telefon hinzuzufügen.

Dann stellt die App einige Fragen. Geben Sie einfach `y` ein und drücken Sie die Eingabetaste.

```sh
# Möchten Sie zeitbasierte Tokens verwenden?
Möchten Sie, dass Authentifizierungstokens zeitbasiert sind (j/n) y
# Möchten Sie die Konfigurationsdatei aktualisieren?
Möchten Sie, dass ich Ihre "/root/.google_authenticator"-Datei aktualisiere (j/n) y
# Möchten Sie die Verwendung desselben Tokens mehrmals verbieten?
Möchten Sie die Verwendung derselben Authentifizierung mehrmals verbieten?
Dies schränkt Sie auf eine Anmeldung alle etwa 30 Sekunden ein, erhöht jedoch
Ihre Chancen, Man-in-the-Middle-Angriffe zu bemerken oder sogar zu verhindern (j/n) y

# Erlauben Sie Token innerhalb eines 1-minütigen Zeitfehlers vor und nach dem aktuellen Zeitpunkt?
Standardmäßig sind Tokens 30 Sekunden gültig.
Aufgrund möglicher Zeitabweichungen zwischen Client und Server erlauben wir ein zusätzliches Token vor und nach dem aktuellen Zeitpunkt.
Bei schlechter Zeitsynchronisation können Sie das Zeitfenster von seinem Standardwert erhöhen.
Wenn Sie Probleme mit schlechter Zeitsynchronisation haben, können Sie das Zeitfenster von seiner Standardgröße von +1 Minute (Fenstergröße von 3) auf etwa +-4 Minuten (Fenstergröße von 17 akzeptablen Tokens) erhöhen.
Möchten Sie das tun? (j/n) j
```

An diesem Punkt wurde Google Authenticator installiert.

## PAM-Authentifizierung

Die PAM (Pluggable Authentication Modules)-Authentifizierung ist eine erweiterbare Authentifizierungsmethode in Linux-Systemen. Wenn Sie eine neue Authentifizierungsmethode hinzufügen möchten, fügen Sie einfach das entsprechende PAM-Modul hinzu.

Der oben installierte Google Authenticator ist ebenfalls ein PAM-Modul.

Lassen Sie uns also zuerst die Google Authenticator-Authentifizierung in der von sshd verwendeten PAM-Konfiguration aktivieren. Fügen Sie die folgende Zeile unterhalb der zweiten Zeile von `/etc/pam.d/sshd` hinzu:

```
auth required pam_google_authenticator.so
```

Hinweis: Die Position dieser Zeile ist sehr wichtig, die modifizierte Datei sollte wie folgt aussehen:

```

#%PAM-1.0
auth       required     pam_sepermit.so
auth       required     pam_google_authenticator.so
auth       substack     password-auth

# andere Zeilen
......

Als nächstes müssen Sie die Herausforderungsauthentifizierung in der sshd-Konfiguration aktivieren. Suchen Sie die folgende Konfiguration in `/etc/ssh/sshd_config` und ändern Sie sie auf `yes`.

```
# Change to no to disable s/key passwords
ChallengeResponseAuthentication yes
#ChallengeResponseAuthentication no
```

Starten Sie den sshd-Dienst neu, um die sekundäre Authentifizierung zu verwenden.

```sh
systemctl restart sshd.service
```

## Konfigurationsdatei

Die Konfigurationsdatei für den Google Authenticator befindet sich in `/root/.google_authenticator`. Wenn Sie sie anzeigen möchten, können Sie `cat /root/.google_authenticator` verwenden.

Die Konfigurationsdatei besteht aus 3 Teilen: Schlüssel + Konfiguration + Wiederherstellungscode.

Der Schlüssel bestimmt das Ergebnis des Tokens. Der gleiche Schlüssel erzeugt das gleiche Token. Wenn Sie also möchten, dass mehrere Server das gleiche Token verwenden, können Sie ihre Schlüssel auf den gleichen Wert setzen.

Wiederherstellungscodes werden zur Notfallwiederherstellung verwendet, wenn der Authenticator verloren geht, und sollten an einem sicheren Ort aufbewahrt werden.