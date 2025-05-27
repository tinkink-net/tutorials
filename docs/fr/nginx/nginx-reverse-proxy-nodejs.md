# Configuration Nginx avec proxy inverse Node.js

Nous utilisons souvent divers frameworks pour Node.js (comme koa / egg / nest, etc.) pour implémenter des backends web. Lorsque nous passons en production, bien que Node.js puisse effectivement fournir des services directement au monde extérieur, nous utilisons souvent nginx comme couche d'accès en amont, en tenant compte de HTTPS, de la journalisation, des services de fichiers statiques, de l'équilibrage de charge, etc., et utilisons nginx pour accéder aux services Node.js. Dans ce cas, vous devez configurer le proxy inverse nginx.

## Configuration de base

Pour rendre la configuration nginx plus gérable, nous utilisons généralement un fichier de configuration séparé pour chaque service web. Cela nécessite que le fichier de configuration principal de nginx contienne chaque fichier de configuration individuel.

Trouvez le fichier de configuration principal de nginx (généralement situé à `/etc/nginx.conf`), et dans la section `http{}`, trouvez ou ajoutez la configuration `include`.

```
http {
    # ...

    include /etc/nginx/conf.d/*.conf;
}
```

À ce stade, il est possible de configurer un fichier de configuration séparé pour le site Node.js, comme `/etc/nginx/conf.d/tinkink.net.conf`, qui contient ce qui suit.

```
server {
    listen 80;
    server_name tinkinkink.net;

    error_log /var/log/nginx/tinkinkink_error.log;
    access_log /var/log/nginx/tinkinkink_accss.log;

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

Utilisez `nginx -t` pour tester le fichier de configuration, et s'il est correct, utilisez `nginx -s reload` pour recharger la configuration. Une fois la résolution de domaine effectuée, vous pouvez accéder au service Node.js via le nom de domaine dans `server_name`.

## Configuration de HTTPS

Si vous devez configurer l'accès HTTPS, vous devez alors écouter sur le port 443 et configurer le certificat.

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

## Configuration de l'équilibrage de charge

Si le service Node.js n'est pas sur la même machine que nginx, vous devez simplement changer l'adresse de `proxy_pass` pour l'adresse LAN du serveur Node.js. Cependant, s'il y a plusieurs serveurs Node.js, vous devrez configurer l'équilibrage de charge.

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

Le `upstream` ci-dessus définit un groupe d'équilibrage de charge nommé `nodejs` qui contient les adresses de plusieurs serveurs Node.js. Dans `proxy_pass`, vous n'avez qu'à spécifier le nom du groupe d'équilibrage de charge.

En plus de spécifier plusieurs adresses de serveur, `upstream` peut également spécifier des poids ou des algorithmes d'équilibrage de charge, comme

```
upstream nodejs {
    server 192.168.0.2:3000 weight=1;
    server 192.168.0.2:3001 weight=2;
    server 192.168.0.3:3000 weight=1;
    server 192.168.0.3:3001 weight=2;
}
```

Par défaut, les requêtes sont attribuées aux différents services Node.js un par un dans l'ordre, et sont abandonnées si l'un d'eux se bloque. Cette configuration ci-dessus permettra plutôt aux deux serveurs d'accepter plus de requêtes sur le port `3001`.

Autres politiques.

- `ip_hash` : chaque requête est attribuée selon le résultat de hachage de l'IP accédée, de sorte que si l'IP de l'utilisateur reste la même, elle aura un accès fixe à un serveur backend
- `fair` : allouer les requêtes selon le temps de réponse du serveur backend, en donnant la priorité à ceux avec un temps de réponse court
- `url_hash` : allouer les requêtes selon le résultat de hachage de l'URL accédée, de sorte que chaque URL soit dirigée vers le même serveur backend

Utilisation des politiques.

```
upstream nodejs {
    # Write the policy name
    ip_hash
    server 192.168.0.2:3000;
    server 192.168.0.2:3001;
    server 192.168.0.3:3000;
    server 192.168.0.3:3001;
}
```

## Résumé

En général, configurer un proxy inverse Node.js avec nginx est relativement simple, en se concentrant sur l'élément de configuration `proxy_pass`, qui spécifie le proxy inverse. Cette méthode est également applicable pour faire un proxy inverse des services backend HTTP dans d'autres langages et frameworks.