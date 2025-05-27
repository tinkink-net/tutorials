# Comment mettre à jour glibc

::: warning
Cet article est en cours de révision et peut contenir des erreurs ou des inexactitudes. Veuillez le lire avec prudence et n'hésitez pas à fournir des commentaires.
:::

## Contexte

La bibliothèque GNU C (glibc) est la bibliothèque C standard pour le système GNU. C'est la bibliothèque principale pour le système GNU et elle est utilisée par la plupart des programmes sur les systèmes GNU/Linux. Elle fournit les routines de base pour l'allocation de mémoire, la recherche dans les répertoires, l'ouverture et la fermeture de fichiers, la lecture et l'écriture de fichiers, la manipulation de chaînes, la correspondance de motifs, l'arithmétique, etc.

Lorsque vous installez un logiciel sur Linux, vous pouvez rencontrer l'erreur suivante :

```bash
./configure: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by ./configure)
```

Cette erreur signifie que la version de glibc est trop ancienne. Vous devez mettre à jour glibc vers la dernière version.

Nous pouvons vérifier la version de glibc avec la commande suivante :

```bash
strings /lib64/libc.so.6|grep GLIBC_
```

La sortie est la suivante :

```bash
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_PRIVATE
```

Comme vous pouvez le voir, la version de glibc est 2.12. C'est trop ancien. Nous devons la mettre à jour vers la dernière version.

## Mettre à jour glibc

Tout d'abord, nous devons créer un répertoire pour stocker le code source de glibc :

```bash
mkdir ~/tmp/glibc
```

Ensuite, nous devons télécharger le code source de glibc :

```bash
cd ~/tmp/glibc
wget --no-check-certificate https://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
```

> Remarque : `--no-check-certificate` est utilisé pour désactiver la vérification du certificat, car le certificat du site officiel est très récent pour certaines distributions Linux, donc le système peut ne pas lui faire confiance, ce qui peut entraîner l'échec du téléchargement.

Ensuite, nous devons extraire le code source :

```bash
tar -xvf glibc-2.17.tar.gz
```

Vous verrez alors un répertoire nommé `glibc-2.17`. Si vous avez des problèmes pour extraire le code source, vous pouvez consulter [Comment compresser et décompresser](/fr/linux/how-to-compress-and-decompress.html).

Nous devons entrer dans le répertoire et compiler le code source, puis l'installer :

```bash
cd glibc-2.17
mkdir build && cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make&&make install
```

> Remarque : l'installation de glibc nécessite des privilèges root, vous devez donc passer à l'utilisateur `root` ou utiliser `sudo` pour exécuter les commandes ci-dessus.

Maintenant, nous avons mis à jour glibc vers la dernière version. Nous pouvons vérifier à nouveau la version de glibc :

```bash
strings /lib64/libc.so.6|grep GLIBC_
```

La sortie est la suivante :

```bash
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_2.13
GLIBC_2.14
GLIBC_2.15
GLIBC_2.16
GLIBC_2.17
GLIBC_PRIVATE
```

Comme vous pouvez le voir, la version de glibc a été mise à jour vers 2.17. Maintenant, nous pouvons installer le logiciel qui nécessite une version plus récente de glibc.