# Wie man Cross-Origin (CORS) Probleme mit Nginx Reverse Proxy löst

## Was ist Cross-Origin?

Cross-Origin Resource Sharing (CORS) ist eine Sicherheitsfunktion, die von Webbrowsern implementiert wird, um zu verhindern, dass bösartige Websites Anfragen an eine andere Domain stellen als die, die die ursprüngliche Webseite bereitgestellt hat. Dies ist wichtig, um Benutzerdaten zu schützen und unbefugten Zugriff auf Ressourcen zu verhindern.

Wenn eine Webseite eine Anfrage an eine andere Domain stellt, prüft der Browser, ob der Server in dieser Domain domainübergreifende Anfragen zulässt. Wenn nicht, blockiert der Browser die Anfrage und löst einen CORS-Fehler aus.

```
Access to XMLHttpRequest at 'http://example.com/api/data' from origin 'http://yourdomain.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Warum sind Cross-Origin-Probleme wichtig?

Cross-Origin-Probleme sind wichtig, weil sie verhindern können, dass legitime Anfragen verarbeitet werden, was zu fehlerhaften Funktionen in Webanwendungen führen kann.

Wenn Sie beispielsweise eine Webseite besuchen und diese Webseite eine AJAX-Anfrage an eine andere Domain stellt, wie Ihren Online-Banking-Dienst oder eine Online-Shopping-Seite. Ohne den Schutz von CORS könnte die eval-Webseite potenziell auf Ihre Bankkontoinformationen wie Ihren Kontostand, Ihre Transaktionshistorie und andere sensible Daten zugreifen oder sogar unbefugte Transaktionen in Ihrem Namen durchführen.

## Wie man Cross-Origin-Probleme mit Nginx Reverse Proxy löst

Zunächst sollten Sie sicherstellen, dass Ihre Anforderung vernünftig ist. Wie oben besprochen, sind Cross-Origin-Probleme eine Sicherheitsfunktion, die von Webbrowsern implementiert wird, um Benutzer vor bösartigen Websites zu schützen.

Die Verwendung eines Nginx Reverse Proxy zur Lösung von Cross-Origin-Problemen ist eine gängige Praxis. Durch die Konfiguration von Nginx zum Hinzufügen der entsprechenden CORS-Header zur Antwort können Sie domainübergreifende Anfragen von bestimmten Domains oder allen Domains zulassen.

Ein Beispiel für eine Nginx-Konfiguration zur Lösung von Cross-Origin-Problemen ist wie folgt:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://backend_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # Add CORS headers
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';

        # Handle preflight requests
        if ($request_method = OPTIONS) {
            add_header 'Access-Control-Max-Age' 86400;
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}
```

> Wenn Sie daran interessiert sind, wie man einen Nginx Reverse Proxy konfiguriert, lesen Sie bitte [diesen Artikel](/en/nginx/nginx-reverse-proxy-nodejs.html).

In diesem Beispiel erlauben wir domainübergreifende Anfragen von jeder Domain (`*`). Sie können `*` durch eine bestimmte Domain ersetzen, wenn Sie den Zugriff nur auf diese Domain beschränken möchten.

Der Header `Access-Control-Allow-Methods` gibt an, welche HTTP-Methoden für domainübergreifende Anfragen erlaubt sind, und der Header `Access-Control-Allow-Headers` gibt an, welche Header in der Anfrage erlaubt sind.

Der Header `Access-Control-Max-Age` gibt an, wie lange die Ergebnisse einer Preflight-Anfrage vom Browser zwischengespeichert werden können.

Der `if`-Block behandelt Preflight-Anfragen, die vom Browser gesendet werden, bevor eine domainübergreifende Anfrage gestellt wird, um zu prüfen, ob der Server dies erlaubt. Wenn die Anfragemethode `OPTIONS` ist, geben wir eine Antwort `204 No Content` mit den entsprechenden CORS-Headern zurück.

Sie können die Konfiguration nach Ihren Bedürfnissen anpassen. Achten Sie besonders auf `Access-Control-Allow-Headers`, wenn Sie benutzerdefinierte Header in Ihren Anfragen verwenden, müssen Sie diese zu diesem Header hinzufügen.

## Fazit

Zusammenfassend sind Cross-Origin-Probleme eine wichtige Sicherheitsfunktion, die von Webbrowsern implementiert wird, um Benutzer vor bösartigen Websites zu schützen. Sie können jedoch auch dazu führen, dass legitime Anfragen blockiert werden. Durch die Verwendung eines Nginx Reverse Proxy zum Hinzufügen der entsprechenden CORS-Header zur Antwort können Sie domainübergreifende Anfragen von bestimmten Domains oder allen Domains zulassen.

Dies ist eine gängige Praxis in der Webentwicklung und kann dazu beitragen, Cross-Origin-Probleme effektiv zu lösen.

Bitte beachten Sie, dass das Zulassen von domainübergreifenden Anfragen von allen Domains Ihre Anwendung Sicherheitsrisiken aussetzen kann. Daher ist es wichtig, die Auswirkungen dieser Konfiguration sorgfältig zu bedenken und den Zugriff wann immer möglich nur auf vertrauenswürdige Domains zu beschränken.