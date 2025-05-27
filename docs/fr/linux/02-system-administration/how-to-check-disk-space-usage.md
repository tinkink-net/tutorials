# Comment afficher l'utilisation de l'espace disque sous Linux

## Affichage de l'occupation d'espace d'une partition de disque

Pour utiliser une partition sous Linux, vous devez la monter sous un certain répertoire, donc on peut comprendre sans critique qu'une partition doit correspondre à un répertoire dont le contenu est le contenu de cette partition.

Pour voir l'occupation d'espace d'une partition, vous pouvez utiliser la commande `df`.

```sh
df -h
```

Le contenu retourné est similaire à ce qui suit.

```
File system capacity used available used % mount point
devtmpfs 3.9G 0 3.9G 0% /dev
tmpfs 3.9G 0 3.9G 0% /dev/shm
/dev/sda2 496G 2.6G 484G 1% /
/dev/sda1 969M 112M 792M 13% /boot
```

Comme vous pouvez le voir, les partitions principales sont `/dev/sda1` et `/dev/sda2`, où `/dev/sda2` a beaucoup d'espace et est la partition principalement utilisée pour le stockage de données, et le point de montage est `/`, le répertoire racine. À partir du retour ci-dessus, vous pouvez voir l'occupation d'espace de chaque partition de disque.

## Vérification de l'occupation d'espace d'un répertoire

Pour voir l'occupation d'espace d'un répertoire, vous pouvez utiliser la commande `du`. Par défaut, la commande `du` liste l'espace occupé par les répertoires et fichiers à tous les niveaux dans le répertoire spécifié. Vous pouvez spécifier que seul l'espace occupé par les répertoires et fichiers au niveau spécifié est listé avec le paramètre `-max-depth`.

```sh
du -h --max-depth=1
```

Le retour est similaire à ce qui suit.

```
68K . /nginx
12K . /scripts
44M . /log
20K . /bakup
1.9M . /letsencrypt
20M . /storage
22M . /tmp
88M .
```

À partir du retour ci-dessus, vous pouvez voir l'espace total occupé par chaque répertoire.

Il est à noter que la commande `-du` est légèrement plus lente à exécuter car elle doit parcourir tous les fichiers et répertoires dans le répertoire spécifié, donc vous devez être patient et cela prendra plus de temps s'il y a plus de répertoires et de fichiers.

Il est également possible de spécifier une valeur plus grande pour le paramètre `-max-depth` tout en s'assurant que la lisibilité n'est pas affectée, par exemple :

```sh
du -h --max-depth=2
```

De cette façon, vous pouvez voir plus d'informations à la fois et comprendre plus rapidement quels répertoires occupent beaucoup d'espace.

## Résumé

Ce qui précède est la façon de vérifier l'utilisation de l'espace disque sur les systèmes Linux. La combinaison des deux peut être utilisée pour accomplir la tâche quotidienne de vérification de l'utilisation de l'espace disque.