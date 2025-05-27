# Rotation des journaux Linux avec logratate

## Introduction à la rotation des journaux

La journalisation est une partie très importante des services en ligne. Divers services enregistrent constamment leurs propres journaux opérationnels pendant leur exécution, tels que les journaux d'accès nginx, les journaux de flux des systèmes métier, divers journaux d'erreurs, etc. Ces journaux sont généralement stockés dans différents fichiers, et la taille des fichiers de journaux augmente avec le temps d'exécution.

Mais l'espace disque d'un serveur en ligne est limité, et si la taille des fichiers de journaux continue de croître, cela finira par entraîner un manque d'espace disque. Pour résoudre ce problème, nous devons effectuer des rotations sur les journaux.

Plus précisément, la rotation effectuera plusieurs choses.

1. définir certaines règles de rotation (par exemple, par temps ou par volume)
2. transformer le journal actuel en journal historique lorsque la règle est satisfaite, et générer un nouveau fichier journal comme fichier journal actuel
3. nettoyer automatiquement certains anciens fichiers journaux lorsqu'il y a trop de fichiers journaux historiques

De cette façon, le fichier journal original volumineux deviendra un ensemble de petits fichiers journaux, qui seront coupés et tournés de temps en temps, et l'historique total des journaux est globalement stable et inchangé, donc vous n'avez pas à vous inquiéter que les journaux continuent de croître et d'occuper de l'espace disque.

## Utilisation de logrotate

La plupart des distributions Linux ont un outil logrotate intégré, qui facilite la définition des règles de rotation des journaux et le nettoyage automatique des fichiers journaux obsolètes.

Le fichier de configuration pour `logrotate` est

- `/etc/logrotate.conf` fichier de configuration principal
- Le répertoire `/etc/logrotate.d` peut contenir de nombreux fichiers de configuration spécifiques à logrotate

Lorsque nous devons configurer une règle de rotation des journaux, nous pouvons créer un nouveau fichier de configuration sous `/etc/logrotate.d`. Par exemple `/etc/logrotate.d/nginx`, le contenu de ce fichier est le suivant

```
/var/log/nginx/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 640 root root
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 \`cat /var/run/nginx.pid`
    endscript
}
```

La signification de ce fichier de configuration est.

- `daily` rotation une fois par jour
- `missingok` ne fait pas de rotation si le fichier n'existe pas
- `rotate 7` conserve les 7 derniers fichiers journaux
- `compress` Compresse les fichiers journaux
- `delaycompress` Retarde la compression
- `notifempty` Ne fait pas de rotation si le fichier est vide
- `create 640 root root` Le propriétaire et les permissions du nouveau fichier journal, surtout si nginx n'est pas exécuté par l'utilisateur `root`
- `sharedscripts` partage les scripts, c'est-à-dire exécute les scripts après que les journaux ont fini de tourner, sinon vous devrez exécuter des scripts une fois pour chaque fichier journal tourné
- `postrotate` script qui s'exécute après que les journaux ont fini de tourner, certains journaux métier peuvent ne pas avoir besoin de ce script

Une fois la configuration de la règle de rotation des journaux définie, vous pouvez utiliser `logrotate -d` pour vérifier la règle, par exemple

```sh
logrotate -d /etc/logrotate.d/nginx
```

renvoie quelque chose comme ce qui suit.

```
reading config file /etc/logrotate.d/nginx
Allocating hash table for state file, size: 15360 B

Handling 1 logs

rotating pattern: /var/log/nginx/*.log after 1 days (7 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/nginx/*.log /access.log
  log does not need rotating (log has been already rotated)
considering log /var/log/nginx/*.log /error.log
  log does not need rotating (log has been already rotated)

running postrotate script
......
```

Pas d'erreurs signifie que le fichier de configuration est correct.

Si vous voulez voir les résultats immédiatement, vous pouvez utiliser `logrotate -f` pour forcer une rotation, par exemple

```sh
logrotate -f /etc/logrotate.d/nginx
```

## Autres paramètres

- `compress` compresse les journaux historiques après la rotation
- `nocompress` ne compresse pas le journal historique après la rotation
- `copytruncate` est utilisé pour sauvegarder et tronquer le fichier journal actuel alors qu'il est encore ouvert; c'est une façon de copier puis de vider, il y a un décalage temporel entre la copie et le vidage, et certaines données de journal peuvent être perdues.
- `nocopytruncate` sauvegarde le fichier journal mais ne le tronque pas
- `create mode owner group` Spécifie le propriétaire et les permissions pour la création de nouveaux fichiers
- `nocreate` ne crée pas de nouveaux fichiers journaux
- `delaycompress` et `compress` ensemble compressent le fichier journal historique jusqu'à la prochaine rotation
- `nodelaycompress` remplace l'option `delaycompress` et compresse lors de la rotation
- `missingok` Si un journal est manquant, continue à passer au journal suivant sans signaler d'erreur
- `errors address` Envoie les messages d'erreur à l'adresse Email spécifiée lors de la rotation
- `ifempty` Fait la rotation même si le fichier journal est vide
- `notifempty` Ne fait pas de rotation lorsque le fichier journal est vide
- `mail address` Envoie le fichier journal en rotation à l'adresse Email spécifiée
- `nomail` N'envoie pas de fichiers journaux lors de la rotation
- `olddir directory` Place le fichier journal en rotation dans le répertoire spécifié, il doit être sur le même système de fichiers que le fichier journal actuel
- `noolddir` Le fichier journal en rotation est placé dans le même répertoire que le fichier journal actuel
- `sharedscripts` partage les scripts, c'est-à-dire exécute les scripts après la rotation des journaux, sinon exécute les scripts une fois pour chaque fichier journal tourné
- `prerotate` la commande à exécuter avant la rotation, comme la modification des propriétés du fichier; doit être sur une ligne séparée
- `postrotate` Une commande à exécuter après la rotation, comme le redémarrage (`kill -HUP`) d'un service; doit être sur une ligne séparée
- `daily` spécifie que la période de rotation est quotidienne
- `weekly` spécifie que la période de rotation est hebdomadaire
- `monthly` spécifie un cycle de rotation mensuel
- `rotate count` spécifie le nombre de fois que le fichier journal est tourné avant d'être supprimé, `0` signifie qu'aucune sauvegarde n'est conservée, `5` signifie que 5 sauvegardes sont conservées
- `dateext` utilise la date actuelle comme format de nommage
- `dateformat . %s` utilisé avec dateext, apparaît immédiatement après la ligne suivante, définit le nom du fichier après sa coupe, doit être utilisé avec `dateext`, ne prend en charge que les quatre paramètres `%Y`/`%m`/`%d`/`%s`
- `size log-size` (ou `minsize log-size`) Fait tourner le fichier journal lorsqu'il atteint la taille spécifiée, voici le format légal.
    - `size = 5` ou `size 5` (tourne lorsque >= 5 octets)
    - `size = 100k` ou `size 100k`
    - `size = 100M` ou `size 100M`