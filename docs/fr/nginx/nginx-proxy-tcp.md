# Comment configurer NGINX comme un proxy TCP

Vous savez peut-être que NGINX est un serveur web puissant et un serveur proxy inverse, nous l'utilisons pour servir des requêtes HTTP, y compris des fichiers statiques, du contenu dynamique et du proxy inverse vers des services backend. Il peut également servir de proxy pour les connexions WebSocket.

> Si vous n'êtes pas familier avec le proxy NGINX, veuillez consulter [Configuration Nginx avec proxy inverse Node.js](/fr/nginx/nginx-reverse-proxy-nodejs.html).

Cependant, NGINX peut également être utilisé comme serveur proxy TCP, ce qui est utile pour proxifier des protocoles non-HTTP tels que MySQL, Redis et d'autres services basés sur TCP. Cet article vous guidera à travers le processus de configuration de NGINX comme proxy TCP.

## Prérequis

Avant de commencer, assurez-vous d'avoir les prérequis suivants :

- Un serveur avec NGINX installé. Vous pouvez installer NGINX en utilisant votre gestionnaire de paquets ou le télécharger depuis le [site officiel](https://nginx.org/en/download.html).
- Connaissance de base des fichiers de configuration NGINX et comment les modifier.
- Accès au fichier de configuration NGINX, généralement situé à `/etc/nginx/nginx.conf` ou `/etc/nginx/conf.d/default.conf`.
- Le service TCP que vous souhaitez proxifier (par exemple, MySQL, Redis) doit être en cours d'exécution et accessible sur le serveur.

## Étape 1 : Installer NGINX avec le module TCP

Assurez-vous que votre installation NGINX inclut le module `ngx_stream_core_module`, qui est nécessaire pour le proxy TCP. Vous pouvez vérifier si ce module est inclus en exécutant :

```bash
nginx -V 2>&1 | grep --color=auto stream
```

Si la sortie inclut `--with-stream`, alors votre installation NGINX prend en charge le proxy TCP. Sinon, vous devrez peut-être installer une version de NGINX qui inclut ce module.
Si vous utilisez un gestionnaire de paquets, vous pouvez installer NGINX avec le module stream en exécutant :

```bash
# Pour Debian/Ubuntu
sudo apt-get install nginx-extras
```

ou

```bash
# Pour CentOS/RHEL
sudo yum install nginx-mod-stream
```

Si vous compilez NGINX à partir des sources, assurez-vous d'inclure l'option `--with-stream` pendant l'étape de configuration.

Si vous utilisez une image Docker, vous pouvez utiliser l'image officielle NGINX avec le module stream inclus.

Par exemple, vous pouvez utiliser le Dockerfile suivant :

```dockerfile
FROM nginx:latest
RUN apt-get update && apt-get install -y nginx-extras
```

## Étape 2 : Configurer NGINX pour le proxy TCP

Ouvrez votre fichier de configuration NGINX, généralement situé à `/etc/nginx/nginx.conf` ou `/etc/nginx/conf.d/default.conf`, et ajoutez le bloc de configuration suivant. Notez que le bloc `stream` doit être au même niveau que le bloc `http` (pas à l'intérieur) :

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

Dans cet exemple, nous configurons NGINX pour écouter sur le port `3306` (le port MySQL par défaut) et proxifier le trafic vers un serveur MySQL backend fonctionnant sur `127.0.0.1:3306`.

Vous pouvez remplacer `127.0.0.1:3306` par l'adresse et le port de votre serveur MySQL réel.

Après avoir ajouté la configuration, enregistrez le fichier et testez la configuration NGINX pour les erreurs de syntaxe :

```bash
sudo nginx -t
```

Si le test de configuration est réussi, rechargez NGINX pour appliquer les modifications :

```bash
sudo systemctl reload nginx
```

## Configuration des délais d'attente et de l'équilibrage de charge

Vous pouvez également configurer les délais d'attente et l'équilibrage de charge pour votre proxy TCP. Par exemple, pour définir un délai d'attente de 30 secondes et activer l'équilibrage de charge avec deux serveurs backend, vous pouvez modifier la configuration comme suit :

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

        # Configurer la journalisation d'accès pour le proxy TCP
        access_log /var/log/nginx/tcp-access.log;
    }
}
```

> **Important** : Le bloc `stream` doit être placé en dehors du bloc `http` et au même niveau que le bloc `http` dans votre configuration NGINX. Le placer à l'intérieur du bloc `http` entraînera des erreurs de configuration.

Cette configuration définit un délai de connexion de 30 secondes, un délai de proxy de 15 secondes (c'est le temps après lequel une connexion sera fermée s'il n'y a pas d'activité), et permet deux tentatives avec un délai d'attente d'une seconde lors de la tentative de connexion au serveur upstream suivant si le premier échoue.

Pour l'équilibrage de charge, vous pouvez ajouter plusieurs serveurs backend dans le bloc `upstream` :

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
        server 127.0.0.1:3307;  # Réplique MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;
    }
}
```

Cette configuration distribuera les connexions entrantes aux deux serveurs MySQL dans le bloc `upstream`.

Vous pouvez consulter [Configuration Nginx avec proxy inverse Node.js](/fr/nginx/nginx-reverse-proxy-nodejs.html) pour plus de détails sur l'équilibrage.

## Le protocole Proxy

Si vous devez transmettre l'adresse IP du client d'origine au serveur backend, vous pouvez activer le protocole Proxy. Ceci est utile pour les applications qui ont besoin de connaître l'adresse IP du client d'origine.

Pour activer le protocole Proxy, vous pouvez modifier le bloc `server` comme suit :

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

Cette configuration active le protocole Proxy pour le proxy TCP, permettant au serveur backend de recevoir l'adresse IP du client d'origine.

Ce qui se passe ici, c'est que NGINX va préfixer l'en-tête du protocole Proxy à la connexion TCP, qui contient l'adresse IP et le port du client d'origine. Voici un exemple de ce à quoi ressemble l'en-tête du protocole Proxy :

```
PROXY TCP4 192.168.1.100 192.168.1.200 56324 3306
```

Cet en-tête indique que la connexion utilise TCP sur IPv4, avec l'adresse IP du client d'origine `192.168.1.100` et le port du client d'origine `56324`. (L'adresse IP du serveur backend est `192.168.1.200` et le port du serveur backend est `3306`.)

Le serveur backend doit être configuré pour comprendre et analyser cet en-tête. MySQL lui-même ne prend pas en charge nativement le protocole Proxy, mais vous pouvez utiliser des proxys comme ProxySQL ou des outils comme HAProxy qui le prennent en charge.

Pour la plupart des services backend, vous devrez consulter leur documentation pour voir comment activer la prise en charge du protocole Proxy. Certains services courants qui prennent en charge le protocole Proxy incluent :

- HAProxy
- Traefik
- Redis (avec la bonne configuration)
- PostgreSQL (avec certaines extensions)
- Certaines versions personnalisées de MySQL/MariaDB

Assurez-vous de tester la configuration après avoir activé le protocole Proxy pour vous assurer que le serveur backend reçoit la bonne adresse IP du client.

## Support SSL/TLS pour le proxy TCP

NGINX peut également proxifier des connexions TCP chiffrées en utilisant SSL/TLS. Ceci est utile lorsque vous devez sécuriser la connexion entre les clients et votre serveur proxy. Voici comment configurer SSL/TLS pour votre proxy TCP :

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

Cette configuration crée un proxy SSL/TLS qui écoute sur le port 3307 et transmet le trafic déchiffré au serveur MySQL backend fonctionnant sur le port 3306. Les clients se connectent au proxy en utilisant SSL/TLS, tandis que la connexion entre le proxy et le serveur backend peut être non chiffrée (généralement pour les connexions locales) ou chiffrée selon vos besoins.

> Remarque : Vous pouvez également choisir de laisser le serveur backend gérer la terminaison SSL/TLS s'il la prend en charge, auquel cas vous n'auriez pas besoin de configurer SSL/TLS dans le proxy NGINX.

## Conclusion

Dans ce guide, nous avons couvert comment configurer un proxy TCP avec NGINX, y compris l'équilibrage de charge et le protocole Proxy. En suivant ces étapes, vous pouvez gérer efficacement le trafic TCP et vous assurer que vos services backend reçoivent les informations client nécessaires.
Vous pouvez utiliser NGINX comme un puissant serveur proxy TCP pour gérer divers protocoles et services, offrant flexibilité et évolutivité pour vos applications.

## Ressources supplémentaires

- [Documentation NGINX](https://nginx.org/en/docs/)
- [Module Stream NGINX](https://nginx.org/en/docs/stream/ngx_stream_core_module.html)
- [Équilibrage de charge NGINX](https://nginx.org/en/docs/http/load_balancing.html)