# Configuration du proxy inverse WebSocket Nginx

WebSocket est un protocole de communication bidirectionnel en temps réel pour les applications Web basé sur le protocole HTTP. Depuis sa sortie, un nombre croissant de navigateurs et de logiciels côté serveur ont pris en charge WebSocket.

Lorsque nous utilisons nginx comme couche d'accès HTTP, nous constatons que la communication WebSocket échoue par défaut. C'est parce que nginx n'est pas configuré pour prendre en charge les WebSockets par défaut, et nécessite une configuration supplémentaire pour prendre en charge les WebSockets.

## Détails de la poignée de main du protocole WebSocket

Lorsqu'un client initie une requête WebSocket, il essaie d'abord de suggérer une connexion, et l'adresse de requête utilisée à ce moment n'est pas une adresse normale commençant par `http://` ou `https://`, mais une adresse commençant par `ws://` (non chiffré avec TLS et correspondant à HTTP) ou `wss://` (chiffré avec TLS et correspondant à HTTPS).

En prenant `ws://example.com/websocket` comme exemple, l'en-tête de la requête est le suivant.

```
GET /websocket HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Version: 13
```

Comme vous pouvez le voir, l'en-tête de la requête est très similaire à l'en-tête de requête HTTP normal, à l'exception de quelques champs supplémentaires.

- `Upgrade`: doit être `websocket`, indiquant que le protocole doit être mis à niveau vers WebSocket pour la communication
- `Connection`: doit être `Upgrade`, indiquant que la connexion doit être mise à niveau
- `Sec-WebSocket-Key`: doit être une chaîne aléatoire, utilisée pour l'authentification de la poignée de main, le serveur renverra également une chaîne similaire

En-tête de réponse.

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

Après une telle poignée de main, les deux parties peuvent établir une connexion WebSocket pour une communication bidirectionnelle en temps réel.

## Configuration du proxy inverse WebSocket

Pour que nginx fasse un proxy inverse des WebSockets, vous devez ajouter explicitement les en-têtes `Upgrade` et `Connection`.

```
## S'il n'y a pas d'en-tête Upgrade, alors $connection_upgrade est close, sinon c'est upgrade
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
        # Ces deux lignes sont la clé
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

Avec la configuration ci-dessus, nginx sera capable de proxifier correctement les requêtes WebSocket.

Si vous avez plusieurs serveurs backend, vous pouvez définir plusieurs serveurs backend en utilisant `upstream` et utiliser `proxy_pass` dans `location` pour spécifier le serveur backend.

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
        # Ces deux lignes sont la clé
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

## Résumé

Le plus important est de configurer les en-têtes `Upgrade` et `Connection` lorsque vous faites un proxy inverse.