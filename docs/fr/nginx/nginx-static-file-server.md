# Comment utiliser Nginx pour héberger un serveur de fichiers statiques

Nginx est un serveur web qui peut être utilisé pour héberger des fichiers statiques. Ce tutoriel décrit comment utiliser Nginx pour héberger un serveur de fichiers statiques.

Après avoir terminé ce tutoriel, vous serez en mesure de :

- Parcourir les répertoires
- Naviguer vers les sous-répertoires et les fichiers
- Télécharger des fichiers via le navigateur

## Configurer Nginx

Tout d'abord, vous devez avoir Nginx installé. Si vous n'avez pas installé Nginx, vous pouvez vous référer à d'autres tutoriels.

Après avoir installé Nginx, vous pouvez le configurer pour héberger un serveur de fichiers statiques. Vérifiez `/etc/nginx/nginx.conf` pour voir si le fichier de configuration est divisé en plusieurs fichiers. Vous pouvez utiliser la commande suivante pour l'ouvrir :

```
vi /etc/nginx/nginx.conf
```

Si vous pouvez voir `include /etc/nginx/conf.d/*.conf;` dans la section `http`, cela signifie que le fichier de configuration est divisé en plusieurs fichiers.

Vous pouvez utiliser la commande suivante pour créer un nouveau fichier de configuration :

```
vi /etc/nginx/conf.d/static-file-server.conf
```

> Remarque : Vous pourriez avoir besoin d'utiliser `sudo` pour exécuter la commande ci-dessus. `sudo vi /etc/nginx/conf.d/static-file-server.conf`

Ensuite, ajoutez la configuration suivante au fichier :

```
server {
    listen       80;
    server_name  static-file-server.tinkink.net; # Changez pour votre nom de domaine

    root /path/to/your/static/files; # Changez pour votre répertoire de fichiers statiques

    autoindex on; # Activer la liste des répertoires

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Ici, `listen` spécifie le port d'écoute, `server_name` spécifie le nom de domaine ou l'adresse IP, `root` spécifie le répertoire des fichiers statiques, et `autoindex` active la liste des répertoires.

`location /` correspond au chemin racine, `try_files` spécifie les fichiers à essayer, et renvoie une erreur 404 si le fichier n'est pas trouvé.

## Redémarrer Nginx

Après avoir configuré Nginx, vous devez le redémarrer pour que la configuration prenne effet :

```
sudo systemctl restart nginx
```

ou

```
sudo service nginx restart
```

## Accéder au site

Maintenant, vous pouvez accéder au site via le navigateur, par exemple : `http://static-file-server.tinkink.net`

## Permissions

Assurez-vous que les permissions du répertoire sont correctement définies pour éviter les problèmes de sécurité. Comme nginx peut utiliser un utilisateur unique `nginx` pour s'exécuter. Vous devriez définir le propriétaire et le groupe du répertoire à ce groupe d'utilisateurs. Vous pouvez utiliser la commande suivante pour définir les permissions :

```
chown -R nginx:nginx /path/to/your/static/files
```

De plus, si le répertoire de fichiers statiques est situé dans le répertoire personnel de l'utilisateur, vous devez également vous assurer que le répertoire personnel et le répertoire de fichiers statiques ont les permissions d'accès correctes. C'est un peu compliqué, donc je vous recommanderai de déplacer le répertoire de fichiers statiques hors du répertoire personnel.

Si vous utilisez constamment des répertoires personnels, vous devrez ajouter l'utilisateur `nginx` à votre groupe d'utilisateurs. Vous pouvez utiliser la commande suivante :

```
usermod -a -G {username} nginx
```

Ensuite, vous devez ajouter des permissions au groupe. Vous pouvez utiliser la commande suivante :

```
chmod g+rwx /home/{username}
```

> Remarque : Remplacez `{username}` par votre nom d'utilisateur.

Si cela ne fonctionne toujours pas, vous pouvez essayer de désactiver SELinux. Vous pouvez utiliser la commande suivante :

```
sudo setenforce 0
```

Si maintenant cela fonctionne, vous pouvez désactiver définitivement SELinux. Ouvrez le fichier `/etc/selinux/config` et changez `SELINUX=enforcing` en `SELINUX=disabled`, puis sauvegardez et redémarrez le système.

## Conclusion

La mise en place d'un serveur de fichiers statiques avec Nginx est facile, mais si vous voulez mettre les fichiers dans le répertoire personnel, cela peut être un peu compliqué.