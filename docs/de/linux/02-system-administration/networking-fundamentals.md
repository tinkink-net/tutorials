# Linux-Netzwerkgrundlagen

<Validator lang="de" :platform-list="['Ubuntu 24.10']" date="2025-05-23" />

Als Linux-Systemadministrator oder Entwickler werden Sie häufig mit Netzwerkkonfigurationen arbeiten. Lassen Sie uns die wesentlichen Konzepte und Werkzeuge erkunden, die Sie in Ihrer täglichen Arbeit benötigen werden.

## Erste Schritte mit Netzwerkschnittstellen

Wenn Sie sich zum ersten Mal mit der Netzwerkkonfiguration in Linux beschäftigen, werden Sie auf Netzwerkschnittstellen stoßen. Stellen Sie sich diese als Verbindungspunkte zwischen Ihrem Computer und dem Netzwerk vor - ähnlich wie Ports an einem Switch verschiedene Geräte verbinden. Typischerweise sehen Sie Schnittstellen mit Namen wie `eth0` für Ihre erste Ethernet-Karte, `wlan0` für drahtlose Verbindungen und `lo` für die Loopback-Schnittstelle, die Ihr System verwendet, um mit sich selbst zu kommunizieren.

Bei der Arbeit mit Netzwerkschnittstellen werden Sie häufig Befehle verwenden.

## Der Befehl ip link

Der Befehl `ip link show` ist Ihr bevorzugtes Werkzeug, um den Status aller Netzwerkschnittstellen auf Ihrem System zu überprüfen. Er zeigt nicht nur die Schnittstellen an, sondern auch ihren Betriebszustand und physische/MAC-Adressen. Dies ist besonders nützlich, wenn Sie:

- Netzwerkverbindungsprobleme beheben
- Neue Netzwerkschnittstellen einrichten
- Überprüfen, ob Netzwerkkarten richtig erkannt werden
- Prüfen, ob Schnittstellen UP oder DOWN sind

```bash
ip link show
```

Wenn Sie diesen Befehl ausführen, sehen Sie eine Ausgabe wie diese:

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
```

**Was bedeutet diese Ausgabe?** Lassen Sie uns das aufschlüsseln:

Die wichtigen Teile, auf die Sie achten sollten, sind die Schnittstellennamen (`lo` und `eth0`) und ihre Zustände (`UP` oder `DOWN`). Wenn Sie detailliertere Informationen über IP-Adressen benötigen, die diesen Schnittstellen zugewiesen sind, können Sie Folgendes verwenden:

### Überprüfen von IP-Adressen

Der Befehl `ip addr show` ist umfassender als `ip link`, da er sowohl die Schnittstellen als auch ihre zugewiesenen IP-Adressen anzeigt. Dieser Befehl ist unerlässlich, wenn Sie:

- IP-Adresszuweisungen überprüfen müssen
- Nach doppelten IP-Adressen suchen
- DHCP-bezogene Probleme beheben
- Subnetzmasken-Konfigurationen bestätigen

Sobald Sie Ihre Schnittstellen identifiziert haben, möchten Sie wissen, welche IP-Adressen sie haben. Der Befehl `ip addr show` liefert diese Informationen:

```bash
ip addr show
```

Wenn Sie diesen Befehl ausführen, sehen Sie etwas wie:
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0
    inet6 fe80::215:5dff:fe01:ca05/64 scope link
```

Lassen Sie uns diese Ausgabe entschlüsseln:
- `inet 127.0.0.1/8`: Die Loopback-Adresse mit ihrer Subnetzmaske
- `inet 192.168.1.100/24`: Ihre tatsächliche IP-Adresse und Subnetz
- `scope global`: Zeigt an, dass diese Adresse für die Verwendung mit der Außenwelt gültig ist
- `dynamic`: Zeigt, dass diese Adresse von DHCP zugewiesen wurde

Sie können auch `ifconfig` verwenden, um ähnliche Informationen zu erhalten, aber es ist zugunsten von `ip` veraltet:

> Da `ifconfig` veraltet ist, ist es möglicherweise nicht standardmäßig auf modernen Systemen installiert. Wenn Sie es benötigen, können Sie das Paket `net-tools` installieren.

```bash
ifconfig
```

Wenn Sie diesen Befehl ausführen, sehen Sie eine Ausgabe wie diese:

```
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet

```

Sie können auch die MAC-Adresse der Schnittstelle, IP und andere Details sehen.

## Verwalten von Netzwerkverbindungen

### Statische vs. Dynamische IP-Konfiguration

Bei der Einrichtung eines Servers oder einer Workstation ist eine der ersten Entscheidungen, ob Sie statische oder dynamische IP-Adressierung verwenden möchten.

Wenn Sie einen Server einrichten, möchten Sie wahrscheinlich eine statische IP. So können Sie das tun:

Bei der Einrichtung einer statischen IP-Adresse gibt Ihnen der Befehl `ip addr add` sofortige Kontrolle. Die Syntax folgt dem Muster `ip addr add IP_ADRESSE/SUBNETZMASKE dev SCHNITTSTELLE`. Zum Beispiel:

```bash
sudo ip addr add 192.168.1.100/24 dev eth0
```

Dieser Befehl ist perfekt für:
- Schnelles Testen von Netzwerkkonfigurationen
- Notfall-Netzwerkreparaturen
- Temporäre IP-Zuweisung während der Fehlerbehebung
- Hinzufügen sekundärer IP-Adressen zu einer Schnittstelle

> Tipp: Um eine IP-Adresse zu entfernen, verwenden Sie: `sudo ip addr del IP_ADRESSE dev SCHNITTSTELLE`, Sie können `ip --help` verwenden, um alle verfügbaren Optionen zu sehen.

Aber denken Sie daran, dass diese Konfiguration einen Neustart nicht überlebt. Für eine dauerhafte Einrichtung auf modernen Ubuntu- oder Debian-Systemen sollten Sie die Netplan-Konfiguration bearbeiten, die sich oft in `/etc/netplan/01-netcfg.yaml` oder ähnlich befindet. Hier ist ein Beispiel für eine statische Konfiguration:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
```

oder DHCP verwenden:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: true
```

Nach dem Bearbeiten der Datei wenden Sie die Änderungen mit folgendem Befehl an:

```bash
sudo netplan apply
```

## Wesentliche Netzwerk-Fehlerbehebungswerkzeuge

Wenn Probleme auftreten (und das werden sie), benötigen Sie ein solides Verständnis dieser Diagnosewerkzeuge:

### Netzwerkverbindungstests

Beginnen wir mit den Grundlagen - dem Befehl `ping`. Sie denken vielleicht, er ist einfach, aber er ist unglaublich leistungsstark:

Der Befehl `ping` mag grundlegend erscheinen, ist aber unglaublich vielseitig. Die Option `-c` begrenzt die Anzahl der gesendeten Pakete, was für Skripte und schnelle Tests nützlich ist:

```bash
ping -c 4 google.com  # Sendet genau 4 Pakete und stoppt dann
```

Wenn Sie den ping-Befehl ausführen, sehen Sie eine Ausgabe wie diese:
```
PING google.com (142.250.189.78) 56(84) bytes of data.
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=1 ttl=116 time=14.3 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=2 ttl=116 time=13.9 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=3 ttl=116 time=14.1 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=4 ttl=116 time=14.0 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 13.915/14.075/14.284/0.151 ms
```

Diese Ausgabe teilt Ihnen mit:
- Die Remote-IP-Adresse (142.250.189.78)
- Umlaufzeit für jedes Paket (z.B. 14,3 ms)
- Paketverlustprozentsatz (in diesem Fall 0%)
- Statistiken über Zeitvariationen

Verwenden Sie ping für:
- Grundlegende Konnektivitätstests
- Messung der Netzwerklatenz
- Überprüfung der DNS-Auflösung
- Überwachung der Host-Verfügbarkeit

Möchten Sie wissen, warum eine Verbindung langsam ist oder ausfällt? Hier kommt `traceroute` ins Spiel:

Wenn Sie den Weg verstehen müssen, den Ihr Datenverkehr nimmt, wird `traceroute` unschätzbar:

```bash
traceroute google.com
```

Bei der Verwendung von traceroute könnten Sie Folgendes sehen:
```
traceroute to google.com (142.250.189.78), 30 hops max, 60 byte packets
 1  _gateway (192.168.1.1)  0.344 ms  0.313 ms  0.307 ms
 2  isp-router.net (10.0.0.1)  12.132 ms  12.125 ms  12.119 ms
 3  core-router.isp.net (172.16.0.1)  13.225 ms  13.219 ms  13.213 ms
 4  google-peer.isp.net (192.0.2.1)  13.376 ms  13.370 ms  13.364 ms
 5  lhr25s35-in-f14.1e100.net (142.250.189.78)  14.090 ms  14.084 ms  14.078 ms
```

Jede Zeile repräsentiert einen "Hop" in Ihrer Verbindung:
- Die Zahl am Anfang ist die Hop-Anzahl
- Der Hostname und die IP-Adresse jedes Routers
- Drei Zeitmessungen, die die Latenz zu diesem Hop zeigen

Dieses Tool hilft Ihnen:
- Netzwerkengpässe identifizieren
- Routing-Probleme beheben
- Netzwerkpfade überprüfen
- Netzwerküberlastungspunkte erkennen

### DNS-Auflösung

Wenn Sie überprüfen müssen, ob ein Domainname korrekt aufgelöst wird, ist `dig` Ihr bester Freund. Es ist leistungsfähiger als `nslookup` und liefert detaillierte Informationen über DNS-Abfragen:

```bash
dig google.com
```

Wenn Sie diesen Befehl ausführen, sehen Sie eine Ausgabe wie diese:
```
; <<>> DiG 9.16.1-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
;; QUESTION SECTION:
;google.com.			IN	A
;; ANSWER SECTION:
google.com.		299	IN		142.250.189.78
;; Query time: 14 msec
;; SERVER:  8.8.8.8#53
;; WHEN: Wed Oct 25 12:34:56 UTC 2023
;; MSG SIZE  rcvd: 55
```

Diese Ausgabe liefert:
- Den für die Abfrage verwendeten DNS-Server (8.8.8.8)
- Die Zeit, die für eine Antwort benötigt wurde (14 msec)
- Die Größe der Antwortnachricht (55 Bytes)

### Verbindungsanalyse

Für komplexere Probleme müssen Sie mit Werkzeugen wie `ss` und `netstat` tiefer eintauchen:

Der Befehl `ss` ist der moderne Ersatz für netstat und liefert detaillierte Socket-Statistiken:

```bash
ss -tuln  # Zeigt TCP(-t) und UDP(-u) lauschende(-l) numerische(-n) Ports
```

Bei der Ausführung des ss-Befehls:
```
Netid  State    Recv-Q  Send-Q   Local Address:Port    Peer Address:Port
tcp    LISTEN   0       128      0.0.0.0:22            0.0.0.0:*
tcp    LISTEN   0       128      0.0.0.0:80            0.0.0.0:*
tcp    ESTAB    0       0        192.168.1.100:22      192.168.1.10:52414
```

Diese Ausgabe zeigt:
- `LISTEN`: Dienste, die auf Verbindungen warten
- `ESTAB`: Etablierte Verbindungen
- Lokale und entfernte Adresse:Port-Paare
- Warteschlangenlängen für eingehende/ausgehende Daten

Dieser Befehl ist unerlässlich für:
- Sicherheitsaudits
- Service-Debugging
- Lösung von Portkonflikten
- Analyse des Verbindungszustands

## Fazit

Es gibt noch viele weitere Themen und Werkzeuge im Bereich Linux-Netzwerke zu erkunden, wie Firewalls (iptables/nftables), VPNs, Paketfilterung und Netzwerkleistungsoptimierung. Die Beherrschung der Grundlagen gibt Ihnen jedoch eine solide Basis, auf der Sie aufbauen können.

Denken Sie daran, dass die Beherrschung von Linux-Netzwerken eine Reise ist, kein Ziel. Beginnen Sie mit den Grundlagen, üben Sie regelmäßig und erkunden Sie nach und nach fortgeschrittenere Themen, wenn Ihre Bedürfnisse wachsen.