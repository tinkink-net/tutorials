# Maîtriser les Utilisateurs et les Permissions de Linux

<Validator lang="fr" :platform-list="['Ubuntu 22.04']" date="2023-08-02" />

Dans Linux, les utilisateurs sont des individus qui peuvent accéder au système et à ses ressources. Chaque utilisateur possède un nom d'utilisateur unique et un identifiant utilisateur (`UID`) qui l'identifie auprès du système. Les groupes sont des collections d'utilisateurs qui partagent des permissions communes pour accéder aux fichiers et répertoires. Les permissions sont des règles qui déterminent qui peut accéder à un fichier ou répertoire, et quelles actions ils peuvent effectuer dessus.

Linux utilise un système de permissions qui comprend trois types de permissions : lecture, écriture et exécution. Ces permissions peuvent être définies pour trois types d'utilisateurs : le propriétaire du fichier ou répertoire, les membres du groupe propriétaire du fichier ou répertoire, et tous les autres utilisateurs du système.

Comprendre comment fonctionnent les utilisateurs, les groupes et les permissions dans Linux est essentiel pour gérer l'accès aux ressources du système et assurer la sécurité de votre système.

## Utilisateurs

### Identifier l'Utilisateur Actuel

Pour identifier l'utilisateur actuel dans Linux, vous pouvez utiliser la commande `whoami`. Cette commande affichera le nom d'utilisateur de l'utilisateur actuel dans le terminal.

```sh
> whoami
tinymemo
```

De plus, vous pouvez vérifier le contenu de la variable d'environnement `$USER`, qui affichera également le nom d'utilisateur de l'utilisateur actuel.

```sh
> echo $USER
tinymemo
```

### Identifiant Utilisateur

Chaque utilisateur dans Linux possède un identifiant utilisateur unique (`UID`) qui l'identifie auprès du système. Vous pouvez utiliser la commande `id` pour afficher l'`UID` de l'utilisateur actuel.

```sh
> id
uid=1000(tinymemo) gid=1000(tinymemo) groups=1000(tinymemo),4(adm),27(sudo),44(video),50(staff)
```

Comme vous pouvez le voir, l'`UID` de l'utilisateur actuel est 1000. Vous pouvez également utiliser l'option `-u` pour afficher uniquement l'`UID`, ou vous pouvez utiliser la commande `id -u` pour afficher uniquement l'`UID`.

```sh
> id -u
1000

> echo $UID
1000
```

L'`UID` d'un utilisateur est généré automatiquement lors de la création de l'utilisateur. L'`UID` de l'utilisateur root est toujours 0.

Tous les utilisateurs d'un système Linux sont stockés dans le fichier `/etc/passwd`. Vous pouvez utiliser la commande `cat` pour afficher le contenu de ce fichier.

```sh
> cat /etc/passwd

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
...
tinymemo:x:1000:1000::/home/tinymemo:/bin/bash
```

Les deuxième et troisième champs de chaque ligne dans le fichier `/etc/passwd` sont respectivement l'`UID` et le GID de l'utilisateur. Il est important de noter que l'`UID` d'un utilisateur n'est pas le même que le GID de l'utilisateur. Le GID d'un utilisateur est l'ID du groupe auquel l'utilisateur appartient. Nous discuterons des groupes dans la section suivante.

### Créer un Nouvel Utilisateur

Pour créer un nouvel utilisateur dans Linux, vous pouvez utiliser la commande `adduser`. Cette commande créera un nouvel utilisateur avec le nom d'utilisateur et l'`UID` spécifiés. Si vous ne spécifiez pas d'`UID`, la commande `adduser` générera automatiquement un `UID` pour le nouvel utilisateur.

```sh
> sudo adduser newusername

Adding user `newusername' ...
Adding new group `newusername' (1000) ...
Adding new user `newusername' (1000) with group `newusername' ...
Creating home directory `/home/newusername' ...
Copying files from `/etc/skel' ...
New password:
Retype new password:
passwd: password updated successfully
Changing the user information for newusername
Enter the new value, or press ENTER for the default
	Full Name []:
	Room Number []:
	Work Phone []:
	Home Phone []:
	Other []:
Is the information correct? [Y/n] y
```

Une fois que vous exécutez la commande `adduser`, vous serez invité à entrer un mot de passe pour le nouvel utilisateur. Vous pouvez également utiliser la commande `passwd` pour définir un mot de passe pour le nouvel utilisateur.

```sh
> sudo passwd newuser
New password:
Retype new password:
passwd: password updated successfully
```

Si vous omettez le nom d'utilisateur lors de l'exécution de la commande `passwd`, elle définira un mot de passe pour l'utilisateur actuel.

### Supprimer un Utilisateur

Pour supprimer un utilisateur dans Linux, vous pouvez utiliser la commande `deluser`. Cette commande supprimera l'utilisateur spécifié du système.

```sh
> sudo deluser newusername

Removing crontab ...
Removing user `newuser' ...
Done.
```

## Groupes

Les groupes sont des collections d'utilisateurs qui partagent des permissions communes pour accéder aux fichiers et répertoires. Chaque groupe possède un identifiant de groupe unique (`GID`) qui l'identifie auprès du système. Vous pouvez utiliser la commande `id` pour afficher le `GID` de l'utilisateur actuel.

```sh
> id
uid=1000(tinymemo) gid=1000(tinymemo) groups=1000(tinymemo),4(adm),27(sudo),44(video),50(staff)
```

Comme vous pouvez le voir, le `GID` de l'utilisateur actuel est `1000`. Vous pouvez également utiliser l'option `-g` pour afficher uniquement le `GID`, ou vous pouvez utiliser la commande `id -g` pour afficher uniquement le `GID`.

### Ajouter un Utilisateur à un Groupe

Un utilisateur peut être membre de plusieurs groupes. Pour ajouter un utilisateur à un groupe, vous pouvez utiliser la commande `usermod`. Cette commande ajoutera l'utilisateur spécifié au groupe spécifié.

```sh
> sudo usermod -a -G groupname username
```

L'option `-a` indique à la commande `usermod` d'ajouter l'utilisateur au groupe au lieu de remplacer les groupes actuels de l'utilisateur. L'option `-G` indique à la commande `usermod` d'ajouter l'utilisateur au groupe spécifié.

### Retirer un Utilisateur d'un Groupe

Pour retirer un utilisateur d'un groupe, vous pouvez utiliser la commande `gpasswd`. Cette commande retirera l'utilisateur spécifié du groupe spécifié.

```sh
> sudo gpasswd -d username groupname

Removing user newuser from group tinkink
```

### Inspecter les Groupes d'un Utilisateur

Pour inspecter les groupes auxquels un utilisateur appartient, vous pouvez utiliser la commande `groups`. Cette commande affichera les groupes auxquels l'utilisateur spécifié appartient.

```sh
> groups newuser

newuser : newuser tinkink
```

### Créer et Supprimer un Groupe

Pour créer un nouveau groupe dans Linux, vous pouvez utiliser la commande `addgroup`. Cette commande créera un nouveau groupe avec le nom de groupe et le `GID` spécifiés. Si vous ne spécifiez pas de `GID`, la commande `addgroup` générera automatiquement un `GID` pour le nouveau groupe.

```sh
> sudo addgroup testgroup

sudo addgroup testgroup
Adding group `testgroup' (GID 1001) ...
Done.
```

Pour supprimer un groupe dans Linux, vous pouvez utiliser la commande `delgroup`. Cette commande supprimera le groupe spécifié du système.

```sh
> sudo delgroup testgroup

Removing group `testgroup' ...
Done.
```

## Permissions

Après le long voyage pour comprendre les utilisateurs et les groupes, nous sommes enfin prêts à parler des permissions. Les permissions sont les règles qui déterminent :

- qui peut accéder à un fichier ou répertoire et
- ce qu'ils peuvent en faire

Ces permissions peuvent être définies pour trois types d'utilisateurs (qui) :

- le propriétaire du fichier ou répertoire
- les membres du groupe propriétaire du fichier ou répertoire
- et tous les autres utilisateurs du système.

Il existe trois types de permissions (ce que le type peut faire) : `lecture`, `écriture` et `exécution`.

Ainsi, les permissions pour un fichier ou répertoire peuvent être définies pour trois types d'utilisateurs (qui) et trois types de permissions (ce que le type peut faire).

### Inspecter les Permissions

Pour voir les permissions d'un fichier ou répertoire, vous pouvez utiliser la commande `ls -l`. Cette commande affichera les permissions du fichier ou répertoire spécifié.

```sh
> ls -l

-rw-r--r-- 1 tinymemo tinymemo  0 Aug  1 16:00 file.txt
drwxr-xr-x 2 tinymemo tinymemo 40 Aug  1 16:00 directory
-rwxr-xr-x 1 tinymemo tinymemo  0 Aug  1 16:00 script.sh
```

Le premier caractère de chaque ligne dans la sortie de la commande `ls -l` est le type de fichier. Les types les plus courants sont :

- `-` pour un fichier régulier
- `d` pour un répertoire

Les neuf caractères suivants sont les permissions pour le fichier ou répertoire. Les trois premiers caractères sont les permissions pour le propriétaire du fichier ou répertoire. Les trois caractères suivants sont les permissions pour le groupe propriétaire du fichier ou répertoire. Les trois derniers caractères sont les permissions pour tous les autres utilisateurs du système.

Le premier caractère de chaque groupe de trois caractères est la permission de `lecture`. Le deuxième caractère de chaque groupe de trois caractères est la permission d'`écriture`. Le troisième caractère de chaque groupe de trois caractères est la permission d'`exécution`.

Prenons `file.txt` comme exemple :

- Les trois premiers caractères sont `rw-`, ce qui signifie que le propriétaire du fichier a les permissions de `lecture` et d'`écriture`, mais pas d'`exécution`.
- Les trois caractères suivants sont `r--`, ce qui signifie que le groupe propriétaire du fichier (groupe `tinymemo`) a la permission de `lecture`, mais pas d'`écriture` ou d'`exécution`.
- Les trois derniers caractères sont `r--`, ce qui signifie que tous les autres utilisateurs du système ont la permission de `lecture`, mais pas d'`écriture` ou d'`exécution`.

### Modifier les Permissions

Pour modifier les permissions d'un fichier ou répertoire, vous pouvez utiliser la commande `chmod`. Cette commande modifiera les permissions du fichier ou répertoire spécifié. Voici quelques exemples d'utilisation de la commande `chmod` :

```sh
> chmod +x file.txt
> chmod -x file.txt
> chmod u+x file.txt
> chmod g+x file.txt
> chmod o+x file.txt
> chmod 755 file.txt
> chmod 644 file.txt
> chmod 777 file.txt
> chmod 400 file.txt
```

La première syntaxe des permissions est `[rôle][opérateur][permission]`.

- Le `rôle` peut être `u` pour le propriétaire du fichier ou répertoire, `g` pour le groupe propriétaire du fichier ou répertoire, ou `o` pour tous les autres utilisateurs du système (tous les utilisateurs sauf le propriétaire et le groupe propriétaire du fichier ou répertoire). Si vous omettez le `rôle`, il s'appliquera aux trois rôles.
- L'`opérateur` peut être `+` pour ajouter une permission, `-` pour retirer une permission, ou `=` pour définir une permission.
- La `permission` peut être `r` pour `lecture`, `w` pour `écriture`, ou `x` pour `exécution`.

La deuxième syntaxe des permissions est composée de trois chiffres, chaque chiffre représentant les permissions pour le propriétaire, le groupe et tous les autres utilisateurs du système. Par exemple, le premier chiffre représente les permissions pour le propriétaire, le deuxième chiffre représente les permissions pour le groupe, et le troisième chiffre représente les permissions pour tous les autres utilisateurs du système.

La plage de chaque chiffre va de `0` à `7`. En fait, c'est un nombre binaire à trois chiffres. Le premier chiffre représente la permission de `lecture`, le deuxième chiffre représente la permission d'`écriture`, et le troisième chiffre représente la permission d'`exécution`. Si le chiffre est `1`, cela signifie que la permission est définie. Si le chiffre est `0`, cela signifie que la permission n'est pas définie. Par exemple, `7` est `111` en binaire, ce qui signifie que les trois permissions sont définies. `6` est `110` en binaire, ce qui signifie que les permissions de `lecture` et d'`écriture` sont définies, mais pas la permission d'`exécution`.

Donc, si nous voulons définir les permissions d'un fichier à `rw-r--r--`, nous pouvons calculer le nombre binaire de chaque chiffre :

- `rw-` est `110` en binaire, ce qui est `6` en décimal.
- `r--` est `100` en binaire, ce qui est `4` en décimal.
- `r--` est `100` en binaire, ce qui est `4` en décimal.

Nous pouvons utiliser la commande suivante :

```sh
> chmod 644 file.txt
```

### Changer le Propriétaire

Pour changer le propriétaire d'un fichier ou répertoire, vous pouvez utiliser la commande `chown`. Cette commande changera le propriétaire du fichier ou répertoire spécifié. Voici quelques exemples d'utilisation de la commande `chown` :

```sh
> chown tinymemo:tinymemo file.txt
> chown tinymemo: file.txt
> chown :tinymemo file.txt
> chown tinymemo file.txt
```

La première syntaxe de propriété est `[utilisateur]:[groupe]`. Vous pouvez omettre `[utilisateur]` ou `[groupe]`, cela ne changera que ce que vous avez spécifié.

Vous pouvez utiliser `-R` pour changer le propriétaire d'un répertoire de manière récursive.

### Permissions Courantes

Voici quelques permissions courantes :

- `644` pour les fichiers, c'est aussi la permission par défaut pour les fichiers
- `755` pour les répertoires, c'est aussi la permission par défaut pour les répertoires
- `600` ou `400` pour les fichiers sensibles, comme la clé privée SSH
- `777` pour les fichiers temporaires, comme les fichiers de cache, ou si vous développez, déboguez ou testez quelque chose, il est fortement déconseillé d'utiliser cette permission dans un environnement de production

Vous avez peut-être remarqué que la différence entre `644` et `755` est la permission d'`exécution` pour le propriétaire du fichier ou répertoire. Pourquoi un répertoire a-t-il besoin de la permission d'`exécution` pour le propriétaire ? C'est parce qu'accéder à un répertoire revient en fait à "exécuter" le répertoire, ce qui signifie que vous pouvez lister les fichiers et répertoires dans le répertoire.

## Conseils Finaux

Voici quelques conseils finaux :

Premièrement, les permissions d'un fichier ou répertoire dépendent également des permissions de son répertoire parent.

Par exemple, si vous n'avez pas la permission d'`exécution` pour un répertoire, vous ne pouvez pas accéder aux fichiers et répertoires dans ce répertoire, même si vous avez la permission de `lecture` pour les fichiers et répertoires. L'exemple le plus courant est le répertoire `home`, vous ne pouvez pas accéder aux répertoires home des autres utilisateurs, même si vous avez la permission de `lecture` pour les fichiers et répertoires dans les répertoires home.

Donc, si vous voulez partager un fichier ou répertoire avec d'autres utilisateurs, vous devriez mieux le placer dans un répertoire où tous les utilisateurs ont la permission d'`exécution` (en dehors du répertoire `home`), sinon vous pourriez rencontrer des problèmes de permission.

Deuxièmement, `SELinux` peut également affecter les permissions d'un fichier ou répertoire. Si vous rencontrez des problèmes de permission, et que vous êtes absolument sûr que les permissions sont correctes, vous pouvez essayer de désactiver `SELinux` pour voir si cela fonctionne.

Enfin, vous devriez toujours utiliser le principe du moindre privilège lors de la définition des permissions. Par exemple, si vous voulez partager un fichier avec d'autres utilisateurs, vous ne devriez leur donner que la permission de `lecture`, pas la permission d'`écriture`. Si vous exécutez un serveur web, vous ne devriez donner au serveur web que les permissions de `lecture` et d'`exécution`, pas la permission d'`écriture`.

## Résumé

Dans cet article, nous avons appris à propos des utilisateurs, des groupes et des permissions. Nous avons appris comment créer des utilisateurs et des groupes, comment ajouter des utilisateurs à des groupes, comment changer le propriétaire d'un fichier ou répertoire, et comment changer les permissions d'un fichier ou répertoire. J'espère que vous l'avez apprécié, à la prochaine !