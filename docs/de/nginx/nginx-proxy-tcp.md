# So konfigurieren Sie NGINX als TCP-Proxy

Sie wissen vielleicht, dass NGINX ein leistungsstarker Webserver und Reverse-Proxy-Server ist. Wir verwenden ihn, um HTTP-Anfragen zu bedienen, einschließlich statischer Dateien, dynamischer Inhalte und Reverse-Proxying zu Backend-Diensten. Er kann auch WebSocket-Verbindungen proxyen.

> Falls Sie mit dem NGINX-Proxy nicht vertraut sind, lesen Sie bitte [Nginx-Konfiguration mit Node.js-Reverse-Proxy](//de/nginx/nginx-reverse-proxy-nodejs.html).

NGINX kann jedoch auch als TCP-Proxy-Server verwendet werden, was für das Proxying von Nicht-HTTP-Protokollen wie MySQL, Redis und anderen TCP-basierten Diensten nützlich ist. Dieser Artikel führt Sie durch den Prozess der Konfiguration von NGINX als TCP-Proxy.

## Voraussetzungen

Bevor wir beginnen, stellen Sie sicher, dass Sie die folgenden Voraussetzungen erfüllen:

- Ein Server mit installiertem NGINX. Sie können NGINX mit Ihrem Paketmanager installieren oder von der [offiziellen Website](https://nginx./de/en/download.html) herunterladen.
- Grundkenntnisse der NGINX-Konfigurationsdateien und wie man sie bearbeitet.
- Zugriff auf die NGINX-Konfigurationsdatei, die sich normalerweise unter `/etc/nginx/nginx.conf` oder `/etc/nginx/conf.d/default.conf` befindet.
- Der TCP-Dienst, den Sie proxyen möchten (z.B. MySQL, Redis), sollte auf dem Server laufen und zugänglich sein.

## Schritt 1: Installieren Sie NGINX mit dem TCP-Modul

Stellen Sie sicher, dass Ihre NGINX-Installation das `ngx_stream_core_module` enthält, das für TCP-Proxying erforderlich ist. Sie können überprüfen, ob dieses Modul enthalten ist, indem Sie Folgendes ausführen:

```bash
nginx -V 2>&1 | grep --color=auto stream
```

Wenn die Ausgabe `--with-stream` enthält, dann unterstützt Ihre NGINX-Installation TCP-Proxying.

Wenn nicht, müssen Sie möglicherweise eine Version von NGINX installieren, die dieses Modul enthält.

Wenn Sie einen Paketmanager verwenden, können Sie NGINX mit dem Stream-Modul installieren, indem Sie Folgendes ausführen:

```bash
# Für Debian/Ubuntu
sudo apt-get install nginx-extras
```

oder

```bash
# Für CentOS/RHEL
sudo yum install nginx-mod-stream
```

Wenn Sie NGINX aus dem Quellcode kompilieren, stellen Sie sicher, dass Sie die Option `--with-stream` während des Konfigurationsschritts einschließen.

Wenn Sie ein Docker-Image verwenden, können Sie das offizielle NGINX-Image mit dem enthaltenen Stream-Modul verwenden.

Zum Beispiel können Sie das folgende Dockerfile verwenden:

```dockerfile
FROM nginx:latest
RUN apt-get update && apt-get install -y nginx-extras
```

## Schritt 2: Konfigurieren Sie NGINX für TCP-Proxying

Öffnen Sie Ihre NGINX-Konfigurationsdatei, die sich normalerweise unter `/etc/nginx/nginx.conf` oder `/etc/nginx/conf.d/default.conf` befindet, und fügen Sie den folgenden Konfigurationsblock hinzu. Beachten Sie, dass der `stream`-Block auf der gleichen Ebene wie der `http`-Block sein sollte (nicht innerhalb davon):

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;
    }
}
```

In diesem Beispiel konfigurieren wir NGINX so, dass es auf Port `3306` (der Standard-MySQL-Port) lauscht und den Verkehr zu einem Backend-MySQL-Server weiterleitet, der auf `127.0.0.1:3306` läuft.

Sie können `127.0.0.1:3306` durch die Adresse und den Port Ihres tatsächlichen MySQL-Servers ersetzen.

Nachdem Sie die Konfiguration hinzugefügt haben, speichern Sie die Datei und testen Sie die NGINX-Konfiguration auf Syntaxfehler:

```bash
sudo nginx -t
```

Wenn der Konfigurationstest erfolgreich ist, laden Sie NGINX neu, um die Änderungen anzuwenden:

```bash
sudo systemctl reload nginx
```

## Timeout- und Balancing-Konfiguration

Sie können auch Timeouts und Lastausgleich für Ihren TCP-Proxy konfigurieren. Um beispielsweise ein Timeout von 30 Sekunden festzulegen und Lastausgleich mit zwei Backend-Servern zu aktivieren, können Sie die Konfiguration wie folgt ändern:

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;

        proxy_connect_timeout 30s;
        proxy_timeout 15s;
        proxy_next_upstream_timeout 1s;
        proxy_next_upstream_tries 2;

        # Konfigurieren Sie das Zugriffsprotokoll für den TCP-Proxy
        access_log /var/log/nginx/tcp-access.log;
    }
}
```

> **Wichtig**: Der `stream`-Block sollte außerhalb des `http`-Blocks und auf der gleichen Ebene wie der `http`-Block in Ihrer NGINX-Konfiguration platziert werden. Wenn Sie ihn innerhalb des `http`-Blocks platzieren, führt dies zu Konfigurationsfehlern.

Diese Konfiguration legt ein Verbindungs-Timeout von 30 Sekunden, ein Proxy-Timeout von 15 Sekunden (dies ist die Zeit, nach der eine Verbindung geschlossen wird, wenn keine Aktivität vorhanden ist) fest und erlaubt zwei Wiederholungsversuche mit einem Timeout von 1 Sekunde beim Versuch, eine Verbindung zum nächsten Upstream-Server herzustellen, wenn der erste fehlschlägt.

Für den Lastausgleich können Sie mehrere Backend-Server im `upstream`-Block hinzufügen:

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
        server 127.0.0.1:3307;  # MySQL-Replikat
    }
    server {
        listen 3306;
        proxy_pass backend;
    }
}
```

Diese Konfiguration verteilt eingehende Verbindungen auf beide MySQL-Server im `upstream`-Block.

Weitere Details zum Balancing finden Sie unter [Nginx-Konfiguration mit Node.js-Reverse-Proxy](//de/nginx/nginx-reverse-proxy-nodejs.html).

## Das Proxy-Protokoll

Wenn Sie die ursprüngliche Client-IP-Adresse an den Backend-Server weitergeben müssen, können Sie das Proxy-Protokoll aktivieren. Dies ist nützlich für Anwendungen, die die ursprüngliche IP-Adresse des Clients kennen müssen.

Um das Proxy-Protokoll zu aktivieren, können Sie den `server`-Block wie folgt ändern:

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;

        proxy_protocol on;
    }
}
```

Diese Konfiguration aktiviert das Proxy-Protokoll für den TCP-Proxy, wodurch der Backend-Server die ursprüngliche Client-IP-Adresse empfangen kann.

Was hier passiert, ist, dass NGINX den Proxy-Protokoll-Header der TCP-Verbindung voranstellt, der die ursprüngliche Client-IP-Adresse und den Port enthält. Hier ist ein Beispiel, wie der Proxy-Protokoll-Header aussieht:

```
PROXY TCP4 192.168.1.100 192.168.1.200 56324 3306
```

Dieser Header gibt an, dass die Verbindung TCP über IPv4 verwendet, mit der ursprünglichen Client-IP-Adresse `192.168.1.100` und dem ursprünglichen Client-Port `56324`. (Die Backend-Server-IP-Adresse ist `192.168.1.200` und der Backend-Server-Port ist `3306`.)

Der Backend-Server muss konfiguriert sein, um diesen Header zu verstehen und zu analysieren. MySQL selbst unterstützt das Proxy-Protokoll nicht nativ, aber Sie können Proxies wie ProxySQL oder Tools wie HAProxy verwenden, die es unterstützen.

Für die meisten Backend-Dienste müssen Sie deren Dokumentation überprüfen, um zu sehen, wie Sie die Unterstützung des Proxy-Protokolls aktivieren können. Einige gängige Dienste, die das Proxy-Protokoll unterstützen, sind:

- HAProxy
- Traefik
- Redis (mit der richtigen Konfiguration)
- PostgreSQL (mit bestimmten Erweiterungen)
- Einige benutzerdefinierte Builds von MySQL/MariaDB

Stellen Sie sicher, dass Sie die Konfiguration nach der Aktivierung des Proxy-Protokolls testen, um sicherzustellen, dass der Backend-Server die korrekte Client-IP-Adresse empfängt.

## SSL/TLS-Unterstützung für TCP-Proxying

NGINX kann auch verschlüsselte TCP-Verbindungen mit SSL/TLS proxyen. Dies ist nützlich, wenn Sie die Verbindung zwischen Clients und Ihrem Proxy-Server sichern müssen. Hier erfahren Sie, wie Sie SSL/TLS für Ihren TCP-Proxy konfigurieren:

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;
    }

    server {
        listen 3307 ssl;
        proxy_pass backend;

        ssl_certificate /path/to/certificate.crt;
        ssl_certificate_key /path/to/private.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
    }
}
```

Diese Konfiguration erstellt einen SSL/TLS-fähigen Proxy, der auf Port 3307 lauscht und den entschlüsselten Verkehr an den Backend-MySQL-Server weiterleitet, der auf Port 3306 läuft. Clients verbinden sich mit dem Proxy über SSL/TLS, während die Verbindung zwischen dem Proxy und dem Backend-Server unverschlüsselt sein kann (typischerweise für lokale Verbindungen) oder verschlüsselt, je nach Ihren Anforderungen.

> Hinweis: Sie können auch wählen, den Backend-Server die SSL/TLS-Terminierung handhaben zu lassen, wenn er dies unterstützt, in diesem Fall müssten Sie SSL/TLS im NGINX-Proxy nicht konfigurieren.

## Fazit

In diesem Leitfaden haben wir behandelt, wie man einen TCP-Proxy mit NGINX einrichtet, einschließlich Lastausgleich und dem Proxy-Protokoll. Indem Sie diesen Schritten folgen, können Sie effektiv TCP-Verkehr verwalten und sicherstellen, dass Ihre Backend-Dienste die notwendigen Client-Informationen erhalten.
Sie können NGINX als leistungsstarken TCP-Proxy-Server verwenden, um verschiedene Protokolle und Dienste zu handhaben, was Flexibilität und Skalierbarkeit für Ihre Anwendungen bietet.

## Zusätzliche Ressourcen

- [NGINX-Dokumentation](https://nginx.org/en/docs/)
- [NGINX Stream-Modul](https://nginx./de/en/docs/stream/ngx_stream_core_module.html)
- [NGINX-Lastausgleich](https://nginx./de/en/docs/http/load_balancing.html)
