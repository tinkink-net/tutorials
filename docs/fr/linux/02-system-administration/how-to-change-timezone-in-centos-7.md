---
description: Découvrez comment changer le fuseau horaire sur votre système d'exploitation Linux avec ce tutoriel étape par étape. Que vous utilisiez Ubuntu, Debian ou CentOS, notre guide complet vous montrera comment utiliser timedatectl pour vérifier et définir le fuseau horaire correct.
---

# Comment changer le fuseau horaire sous Linux (Ubuntu, Debian, CentOS 7)

<Validator lang="fr" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9']" date="2023-03-05" />

> Pour modifier le fuseau horaire, vous devez utiliser l'utilisateur root ou un utilisateur avec des privilèges sudo.

## Vérifier le fuseau horaire actuel

Dans les distributions Linux modernes comme Ubuntu, Debian ou CentOS, le fuseau horaire actuel peut être vérifié à l'aide de la commande suivante.

```sh
timedatectl
```

La sortie est la suivante.

```
      Local time: Wed 2021-11-06 22:43:42 UTC
  Universal time: Wed 2021-11-06 22:43:42 UTC
        RTC time: Wed 2021-11-06 22:43:42
       Time zone: Etc/UTC (UTC, +0000)
     NTP enabled: no
NTP synchronized: yes
 RTC in local TZ: no
      DST active: n/a
```

Comme vous pouvez le voir dans la sortie ci-dessus, le fuseau horaire actuellement utilisé est UTC.

Une autre façon de vérifier le fuseau horaire actuel est de consulter le fichier `/etc/localtime`, qui est un fichier lié symboliquement pointant vers le fichier de fuseau horaire actuellement utilisé.

```sh
ls -l /etc/localtime
```

La sortie est la suivante.

```
lrwxrwxrwx. 1 root root 29 Dec 11 09:25 /etc/localtime -> . /usr/share/zoneinfo/Etc/UTC
```

Encore une fois, vous pouvez voir que le fuseau horaire UTC est actuellement utilisé.

## Modifier le fuseau horaire

Vérifiez d'abord la liste des fuseaux horaires actuellement disponibles.

```sh
timedatectl list-timezones
```

La sortie est la suivante.

```
...
America/Tijuana
America/Toronto
America/Tortola
America/Vancouver
America/Whitehorse
America/Winnipeg
...
```

Ensuite, vous pouvez définir le fuseau horaire en utilisant la commande suivante.

```sh
timedatectl set-timezone Asia/Shanghai
```

> Remarque : Vous pourriez avoir besoin de privilèges sudo pour exécuter la commande ci-dessus. `sudo timedatectl set-timezone Asia/Shanghai`

Dans l'exemple ci-dessus, nous avons défini le fuseau horaire sur l'heure standard de Chine `Asia/Shanghai`.

Pour revérifier le fuseau horaire actuel.

```sh
timedatectl
```

La sortie est la suivante.

```
      Local time: three 2021-11-10 09:34:45 CST
  Universal time: three 2021-11-10 01:34:45 UTC
        RTC time: 三 2021-11-10 09:34:44
       Time zone: Asia/Shanghai (CST, +0800)
     NTP enabled: yes
NTP synchronized: yes
 RTC in local TZ: yes
      DST active: n/a
```

Le fuseau horaire peut également être modifié en utilisant la méthode du lien symbolique.

```sh
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

> Remarque : Vous pourriez avoir besoin de privilèges sudo pour exécuter la commande ci-dessus. `sudo timedatectl set-timezone Asia/Shanghai`

## Résumé

Les distributions Linux modernes ont rendu très facile le changement de fuseau horaire, il suffit d'utiliser `timedatectl`. Bien sûr, vous pouvez également modifier le fuseau horaire d'une manière plus traditionnelle, en utilisant un lien symbolique.