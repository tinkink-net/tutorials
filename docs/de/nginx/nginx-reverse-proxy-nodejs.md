# Nginx-Konfiguration mit Node.js Reverse Proxy

Wir verwenden oft verschiedene Frameworks für Node.js (wie z.B. koa / egg / nest, etc.), um Web-Backends zu implementieren. Wenn wir offiziell live gehen, obwohl Node.js tatsächlich direkt Dienste für die Außenwelt bereitstellen kann, verwenden wir oft nginx als Zugriffsschicht erneut vorne, unter Berücksichtigung von HTTPS, Logging, statischen Dateidiensten, Lastverteilung usw., und verwenden nginx, um auf Node.js-Dienste zuzugreifen. In diesem Fall müssen Sie den nginx Reverse Proxy konfigurieren.

## Grundkonfiguration

Um die Nginx-Konfiguration besser verwalten zu können, verwenden wir in der Regel eine separate Konfigurationsdatei für jeden Webdienst. Dafür muss die Haupt-Nginx-Konfigurationsdatei jede einzelne Konfigurationsdatei enthalten.

Suchen Sie die Haupt-Nginx-Konfigurationsdatei (normalerweise unter `/etc/nginx.conf`) und suchen oder fügen Sie die `include`-Konfiguration im `http{}`-Abschnitt hinzu.

```
http {
    # ...

    include /etc/nginx/conf.d/*.conf;
}
```

An diesem Punkt ist es möglich, eine separate Konfigurationsdatei für die Node.js-Website einzurichten, z.B. `/etc/nginx/conf.d/tinkink.net.conf`, die Folgendes enthält.

```
server {
    listen 80;
    server_name tinkinkink.net;

    error_log /var/log/nginx/tinkinkink_error.log;
    access_log /var/log/nginx/tinkink_accss.log;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Native address of Node.js, note the port
        proxy_pass http://localhost:3000;
    }
}
```

Verwenden Sie `nginx -t`, um die Konfigurationsdatei zu testen, und wenn sie korrekt ist, verwenden Sie `nginx -s reload`, um die Konfiguration neu zu laden. Nachdem die Domainauflösung abgeschlossen ist, können Sie über den Domainnamen in `server_name` auf den Node.js-Dienst zugreifen.

## Konfiguration von HTTPS

Wenn Sie den HTTPS-Zugriff konfigurieren müssen, müssen Sie erneut auf Port 443 hören und das Zertifikat konfigurieren.

```
server {
    listen 80 ;
    listen 443 ssl;
    server_name tinkinkink.net;

    https_certificate /etc/nginx/ssl/tinkink.net.crt;
    https_certificate_key /etc/nginx/ssl/tinkink.net.key;

    # ...
}
```

## Konfigurieren der Lastverteilung

Wenn der Node.js-Dienst nicht auf demselben Rechner wie Nginx läuft, müssen Sie lediglich die Adresse von `proxy_pass` auf die LAN-Adresse des Node.js-Servers ändern. Wenn jedoch mehrere Node.js-Server vorhanden sind, müssen Sie die Lastverteilung konfigurieren.

```
upstream nodejs {
    server 192.168.0.2:3000;
    server 192.168.0.2:3001;
    server 192.168.0.3:3000;
    server 192.168.0.3:3001;
}

server {
    # ...

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Native address of Node.js, note the port
        proxy_pass http://nodejs;
    }
}
```

Das obenstehende `upstream` definiert eine Lastverteilungsgruppe mit dem Namen `nodejs`, die die Adressen mehrerer Node.js-Server enthält. In `proxy_pass` müssen Sie nur den Namen der Lastverteilungsgruppe angeben.

Neben der Angabe mehrerer Serveradressen kann `upstream` auch Gewichte oder Lastverteilungsalgorithmen angeben, wie zum Beispiel

```
upstream nodejs {
    server 192.168.0.2:3000 weight=1;
    server 192.168.0.2:3001 weight=2;
    server 192.168.0.3:3000 weight=1;
    server 192.168.0.3:3001 weight=2;
}
```

Standardmäßig werden Anfragen nacheinander an verschiedene Node.js-Dienste zugewiesen und verworfen, wenn einer davon hängt. Diese Konfiguration oben ermöglicht es beiden Servern, mehr Anfragen auf Port `3001` anzunehmen.

Andere Richtlinien.

- `ip_hash`: Jede Anfrage wird anhand des Hash-Ergebnisses der aufgerufenen IP zugewiesen, sodass bei gleichbleibender IP des Benutzers ein fester Zugriff auf einen Backend-Server erfolgt.
- `fair`: Anfragen werden entsprechend der Antwortzeit des Backend-Servers zugewiesen, wobei Priorität auf solche mit kurzer Antwortzeit gelegt wird.
- `url_hash`: Anfragen werden entsprechend des Hash-Ergebnisses der aufgerufenen URL zugewiesen, sodass jede URL auf denselben Backend-Server gerichtet wird.

Verwendung der Richtlinien.

```
upstream nodejs {
    # Schreiben Sie den Namen der Richtlinie
    ip_hash
    server 192.168.0.2:3000;
    server 192.168.0.2:3001;
    server 192.168.0.3:3000;
    server 192.168.0.3:3001;
}
```

## Zusammenfassung

Im Allgemeinen ist die Konfiguration eines Node.js-Reverse-Proxys mit nginx relativ einfach und konzentriert sich auf den Konfigurationspunkt `proxy_pass`, der den Reverse-Proxy angibt. Diese Methode kann auch zum Reverse-Proxying von HTTP-Backend-Diensten in anderen Sprachen und Frameworks verwendet werden.