# Commandes Linux de Base pour Débutants

<Validator lang="fr" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-04-27" />

Si vous débutez avec Linux, apprendre les commandes de base est essentiel pour naviguer dans le système de fichiers. Voici quelques-unes des commandes les plus importantes et comment les utiliser :

## cd (Changer de Répertoire)

La commande `cd` est utilisée pour entrer dans les répertoires du système de fichiers Linux. Voici comment l'utiliser :

```sh
cd [nom_du_répertoire]
```

Par exemple, pour entrer dans le dossier "Documents", vous tapez :

```sh
cd Documents
```

Dans Linux, il existe un répertoire spécial appelé répertoire "home". C'est le répertoire où vous serez placé lorsque vous vous connectez pour la première fois à votre système Linux. Vous pouvez utiliser `~` pour représenter le répertoire home. Par exemple, pour entrer dans le répertoire home, vous tapez :

```sh
cd ~
```

Vous pouvez également utiliser `..` pour représenter le répertoire parent. Par exemple, si vous êtes dans le dossier "Documents" et que vous voulez entrer dans le répertoire parent, vous tapez :

```sh
cd ..
```

Vous pouvez utiliser plusieurs noms de répertoires pour entrer dans un répertoire (séparés par `/`). Par exemple, si vous voulez entrer dans le dossier "Documents" sous le répertoire "home", vous tapez :

```sh
cd ~/Documents
```

## ls (Lister)

La commande ls est utilisée pour afficher le contenu d'un répertoire. Voici comment l'utiliser :

```sh
ls [nom_du_répertoire]
```

Par exemple, pour lister le contenu du dossier `/usr/share`, vous tapez :

```sh
ls /usr/share
```

Le résultat sera :

```sh
applications  backgrounds  color  cups  dbus-1  doc  fonts  games  glib-2.0  gnome-shell  icons  i18n  locale  man  metainfo  mime  perl  pixmaps  polkit-1  systemd  themes  xml
```

Vous pouvez voir tous les fichiers et répertoires dans le répertoire `/usr/share`. Mais la seule chose que vous pouvez voir est les noms des fichiers et répertoires. Si vous voulez voir plus d'informations sur les fichiers et répertoires, vous pouvez utiliser l'option `-l`. Par exemple :

```sh
ls -l /var/log
```

Le résultat sera :

```sh
total 172
-rw-r--r-- 1 root     root    8241 Sep 14 00:00 alternatives.log
-rw-r----- 1 syslog   adm   134781 Sep 16 23:47 auth.log
-rw-r--r-- 1 root     root    1040 Sep 14 00:00 bootstrap.log
drwxr-xr-x 2 root     root    4096 Jan 25 18:16 cups
-rw-r--r-- 1 root     root    4935 Sep 14 00:00 dmesg
...
```

Vous pouvez voir que l'option `-l` affiche plus d'informations sur les fichiers et répertoires, de gauche à droite, notamment :

- Type de fichier et permissions : Le premier caractère indique le type de fichier. `-` indique un fichier régulier, `d` indique un répertoire, `l` indique un lien symbolique, etc.
- Propriétaire et groupe
- Taille du fichier. Pour les répertoires, la taille est toujours de 4096 octets.
- Date et heure de dernière modification
- Nom du fichier

## mkdir (Créer un Répertoire)

La commande `mkdir` est utilisée pour créer un nouveau répertoire. Voici comment l'utiliser :

```sh
mkdir [nom_du_répertoire]
```

Par exemple, pour créer un nouveau répertoire appelé "Projects", vous tapez :

```sh
mkdir Projects/
```

Cette commande n'a pas de sortie, mais vous pouvez utiliser la commande ls pour vérifier que le répertoire a été créé.

Si vous voulez créer plusieurs répertoires à la fois, vous pouvez utiliser l'option `-p`. Par exemple, pour créer un répertoire appelé "Projects" sous le dossier "Documents", vous tapez :

```sh
mkdir -p Documents/Projects
```

## rm (Supprimer)

La commande `rm` est utilisée pour supprimer des fichiers ou des répertoires. Voici comment l'utiliser :

```sh
rm [nom_du_fichier_ou_du_répertoire]
```

Par exemple, pour supprimer un fichier appelé "example.txt", vous tapez :

```sh
rm example.txt
```

Si vous voulez supprimer un répertoire, vous pouvez utiliser l'option `-r`. Par exemple, pour supprimer un répertoire appelé "Projects", vous tapez :

```sh
rm -r Projects/
```

Tous les fichiers et sous-répertoires du répertoire seront supprimés.

Dans la plupart des cas, vous serez invité à confirmer la suppression. Si vous voulez ignorer la confirmation, vous pouvez utiliser l'option `-f`. Par exemple :

```sh
rm -r example.txt
rm -rf Projects/
```

## mv (Déplacer)

La commande `mv` est utilisée pour déplacer des fichiers ou des répertoires d'un emplacement à un autre. Voici comment l'utiliser :

```sh
mv [chemin_source] [chemin_destination]
```

Par exemple, pour déplacer un fichier appelé "example.txt" du dossier "Documents" vers le dossier "Projects", vous tapez :

```sh
mv Documents/example.txt Projects/
```

## cp (Copier)

La commande `cp` est utilisée pour copier des fichiers ou des répertoires vers un autre emplacement. Voici comment l'utiliser :

```sh
cp [chemin_source] [chemin_destination]
```

Par exemple, pour copier un fichier appelé "example.txt" du dossier "Documents" vers le dossier "Projects", vous tapez :

```sh
cp Documents/example.txt Projects/
```

Si vous voulez copier un répertoire, vous pouvez utiliser l'option `-r`. Par exemple, pour copier un répertoire appelé "Projects" vers le dossier "Documents", vous tapez :

```sh
cp -r Projects/ Documents/
```

Si vous voulez fusionner le contenu du répertoire source avec le répertoire de destination, vous pouvez utiliser l'option `-a`. Par exemple, pour copier un répertoire appelé "Projects" vers le dossier "Documents", vous tapez :

```sh
cp -a Projects/ Documents/
```

## touch

La commande `touch` est utilisée pour créer un nouveau fichier vide. Voici comment l'utiliser :

```sh
touch [nom_du_fichier]
```

Par exemple, pour créer un fichier appelé "example.txt", vous tapez :

```sh
touch example.txt
```

## cat

La commande `cat` est utilisée pour afficher le contenu d'un fichier. Voici comment l'utiliser :

```sh
cat [nom_du_fichier]
```

Par exemple, pour afficher le contenu d'un fichier appelé "example.txt", vous tapez :

```sh
cat example.txt
```

## pwd (Afficher le Répertoire de Travail)

La commande `pwd` est utilisée pour afficher le répertoire de travail actuel. Voici comment l'utiliser :

```sh
pwd
```

Le résultat sera comme ceci :

```sh
/home/username
```

## Résumé

Ce ne sont que quelques-unes des commandes Linux de base dont vous aurez besoin pour commencer. Au fur et à mesure que vous vous familiariserez avec l'environnement Linux, vous découvrirez qu'il existe de nombreuses autres commandes puissantes à votre disposition.