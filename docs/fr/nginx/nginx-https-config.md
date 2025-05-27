# Configuration HTTPS avec Nginx

## Connaissances de base

HTTPS est une connexion HTTP chiffrée qui utilise un protocole de couche de transport chiffré pour protéger la sécurité des données. Spécifiquement pour le processus de chiffrement, HTTPS peut être divisé en deux phases.

1. le processus de négociation de la poignée de main utilise un algorithme de chiffrement asymétrique pour générer la clé
2. le processus de transport utilise un algorithme de chiffrement symétrique pour chiffrer les données

Dans le processus de négociation de la poignée de main utilisant un algorithme asymétrique, le serveur doit émettre une clé publique signée par une autorité de certification (CA) faisant autorité, également appelée certificat. Correspondant à cela, le côté serveur dispose également d'une clé privée.

Donc pour utiliser HTTPS, le côté serveur doit fournir un certificat, généralement avec un suffixe `.cer` ou `.crt`, et une clé privée correspondante, généralement suivie de `.key`.

L'acquisition du certificat HTTPS peut être effectuée en utilisant les services de divers fournisseurs de services de certificats, à la fois payants et gratuits, à la fois purement manuels et pouvant être réalisés à l'aide de scripts automatisés, veuillez vous référer à d'autres documents.

## Configuration de base

Lors de la configuration de HTTPS avec nginx, c'est très simple si vous n'avez pas d'exigences supplémentaires, vous devez seulement configurer.

1. écouter sur le port 443 avec le protocole SSL
2. utiliser `server_name` pour spécifier le nom de domaine, qui doit correspondre au nom de domaine du certificat
3. utiliser `ssl_certificate` pour spécifier le chemin du certificat
4. utiliser `ssl_certificate_key` pour spécifier le chemin de la clé privée

```
server {
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;
}
```

Cela permettra de prendre en charge l'accès HTTPS.

## Redirection HTTP

La configuration ci-dessus ne fonctionne pas si l'utilisateur accède en utilisant le protocole HTTP. Afin de rendre le protocole HTTP également accessible, une configuration de redirection doit être ajoutée. Il existe deux idées pour la configuration spécifique.

La première consiste à configurer un `server` séparé pour prendre en charge l'accès HTTP.

```
server {
    listen 80;
    server_name www.xxx.com;
    return 301 https://$host$request_uri;
}
```

Deuxièmement, dans le même `server`, utilisez `rewrite` pour rediriger.

```
server {
    listen 80;
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;

    if ($scheme ! = "https") {
        rewrite ^ https://$host$request_uri permanent;
    }
}
```

## Problèmes courants

### Le certificat est valide, mais le navigateur indique qu'il n'est pas sécurisé

Il y a plusieurs raisons pour lesquelles le navigateur peut indiquer une insécurité.

1. le certificat racine/certificat intermédiaire de l'autorité émettrice du certificat n'est pas fiable
2. Le mécanisme de sécurité du certificat est obsolète et le navigateur/système d'exploitation ne le considère plus comme sécurisé
3. La chaîne de certificats est incomplète

Si le certificat est appliqué à partir d'une autorité valide, généralement les problèmes de 1 et 2 ne se produiront pas, et la plus grande possibilité est que la chaîne de certificats soit incomplète.

Généralement, un certificat sécurisé aura un certificat intermédiaire et un certificat racine associés en plus du certificat lui-même. La plupart des systèmes d'exploitation/navigateurs ont un certificat racine commun intégré, mais les certificats intermédiaires peuvent ne pas toujours être intégrés. Lorsque le système d'exploitation/navigateur ne peut pas trouver le certificat intermédiaire, il peut indiquer qu'il n'est pas sécurisé.

Dans ce cas, vous devez fusionner notre certificat avec le certificat intermédiaire, puis utiliser le certificat fusionné pour configurer le serveur.

Méthode d'opération spécifique.

- Si le certificat appliqué a un certificat fusionné (comme `fullchain.crt` ou d'autres fichiers), alors vous pouvez l'utiliser directement
- Si le certificat appliqué n'a pas de certificat fusionné, vous devez fusionner le certificat appliqué avec le certificat intermédiaire, ouvrir les deux fichiers avec n'importe quel éditeur de texte, puis coller le contenu des deux fichiers de certificat ensemble, avec le certificat du serveur devant et le certificat intermédiaire derrière, puis l'enregistrer comme un nouveau fichier.