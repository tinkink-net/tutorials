# Nginx Konfiguration des WebSocket Reverse Proxy

WebSocket ist ein echtzeitfähiges, bidirektionales Kommunikationsprotokoll für Webanwendungen, das auf dem HTTP-Protokoll basiert. Seit seiner Veröffentlichung unterstützen immer mehr Browser und serverseitige Software WebSocket.

Wenn wir nginx als HTTP-Zugriffsschicht verwenden, stellen wir fest, dass die WebSocket-Kommunikation standardmäßig fehlschlägt. Dies liegt daran, dass nginx standardmäßig nicht für WebSockets konfiguriert ist und zusätzliche Konfiguration erfordert, um WebSockets zu unterstützen.

## Details des WebSocket-Protokoll-Handshakes

Wenn ein Client eine WebSocket-Anfrage initiiert, versucht er zuerst eine Verbindung vorzuschlagen. Die verwendete Anfrageadresse ist zu diesem Zeitpunkt keine normale Adresse, die mit `http://` oder `https://` beginnt, sondern eine Adresse, die mit `ws://` (unverschlüsselt mit TLS und entsprechend zu HTTP) oder `wss://` (verschlüsselt mit TLS und entsprechend zu HTTPS) beginnt.

Nehmen wir `ws://example.com/websocket` als Beispiel, dann sieht der Anfrageheader wie folgt aus.

```
GET /websocket HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Version: 13
```

Wie Sie sehen können, ist der Anfrageheader dem normalen HTTP-Anfrageheader sehr ähnlich, mit Ausnahme einiger zusätzlicher Felder.

- `Upgrade`: muss `websocket` sein und zeigt an, dass das Protokoll für die Kommunikation auf WebSocket aktualisiert werden muss
- `Connection`: muss `Upgrade` sein und zeigt an, dass die Verbindung aktualisiert werden muss
- `Sec-WebSocket-Key`: muss eine zufällige Zeichenkette sein und wird zur Handshake-Authentifizierung verwendet. Der Server wird ebenfalls eine ähnliche Zeichenkette zurückgeben.

Antwortheader.

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

Nach einem solchen Händedruck können beide Parteien eine WebSocket-Verbindung für Echtzeit-Zwei-Wege-Kommunikation herstellen.

## Konfigurieren eines WebSocket Reverse Proxys

Um nginx dazu zu bringen, WebSockets umzukehren, müssen Sie explizit die `Upgrade`- und `Connection`-Header hinzufügen.

```

## Wenn kein Upgrade-Header vorhanden ist, dann ist $connection_upgrade close, ansonsten ist es upgrade
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
    ...
    location /websocket {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # Diese beiden Zeilen sind der Schlüssel
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

Mit der obigen Konfiguration kann nginx WebSocket-Anfragen ordnungsgemäß weiterleiten.

Wenn Sie mehrere Backend-Server haben, können Sie mehrere Backend-Server mit `upstream` definieren und `proxy_pass` in `location` verwenden, um den Backend-Server anzugeben.

```
upstream backend {
    192.168.3.1:3000;
    192.168.3.2:300;
}

map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
close; }

server {
    ...
    location /websocket {
        proxy_pass http://upstream;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # Diese beiden Zeilen sind der Schlüssel
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

## Zusammenfassung

Das Wichtigste ist, die `Upgrade`- und `Connection`-Header richtig zu konfigurieren, wenn Sie einen Reverse Proxy verwenden.