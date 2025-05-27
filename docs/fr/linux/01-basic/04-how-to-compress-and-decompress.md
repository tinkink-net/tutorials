# Comment compresser et décompresser des fichiers dans un environnement Linux

## La différence entre l'archivage et la compression

L'archivage et la compression sont des concepts différents. L'archivage consiste à combiner plusieurs fichiers/dossiers en un seul fichier, tandis que la compression consiste à réduire la taille du fichier grâce à des algorithmes de compression. Il est important de noter que l'archivage ne signifie pas réduire la taille, et la compression ne signifie pas fusionner des fichiers ensemble. Bien que la plupart du temps nous soyons habitués à "archiver et compresser" et que parfois nous n'ayons pas besoin de les distinguer, comprendre la différence peut vous aider à mieux comprendre les commandes dans votre système Linux.

## Archiver et désarchiver (tar)

### Archiver seulement

Utilisez la commande `tar` pour archiver plusieurs fichiers/dossiers en un seul fichier.

```sh
tar -cvf archive.tar file1 file2 file3
```

où `archive.tar` est le fichier archivé, `file1`, `file2` et `file3` sont les fichiers/dossiers à archiver.

Pour chaque fichier archivé, la sortie sera.

```sh
a file1
a file2
a file3
```

### Archiver et compresser

La commande `tar` intègre également la compression, soit en utilisant les algorithmes de compression gzip ou bzip2, avec les paramètres suivants `-z` et `-j` respectivement.

```sh
# Utiliser la compression gzip avec .gz après le nom du fichier
tar -zcvf archive.tar.gz file1 file2 file3

# Utiliser la compression gzip avec .tgz comme suffixe de nom de fichier
tar -zcvf archive.tgz file1 file2 file3

# Compresser en utilisant bzip2 avec .bz2 après le nom du fichier
tar -jcvf archive.tar.bz2 file1 file2 file3

# Compresser avec bzip2, en utilisant .tbz2 comme suffixe de nom de fichier
tar -jcvf archive.tbz2 file1 file2 file3
```

### Désarchiver

```sh
tar -xvf archive.tar
```

Si vous devez désarchiver vers un répertoire spécifié, ajoutez le paramètre `-C`.

```sh
tar -xvf archive.tar -C /path/to/destination/directory
```

S'il y a compression, ajoutez les arguments correspondants `-z` ou `-j` :

```sh
# Décompresser l'archive gzip
tar -zxvf archive.tar.gz

# Décompresser l'archive bzip2
tar -jxvf archive.tar.bz2
```

## Compresser et décompresser des fichiers

### Compression gzip

La commande `gzip` est utilisée pour compresser un fichier. Il est à noter qu'elle écrase le fichier original, c'est-à-dire que le fichier original disparaît après avoir été compressé avec la commande `gzip`.

```sh
## file disparaîtra et un nouveau file.gz sera créé
gzip file
```

Appliquer `gzip` directement à un répertoire n'a aucun effet, car `gzip` ne peut compresser que des fichiers, pas des répertoires. Cependant, tous les fichiers d'un répertoire peuvent être compressés de manière récursive en utilisant l'argument `-r` :

```sh
# Tous les fichiers du répertoire dirname sont compressés, chaque fichier génère un fichier .gz correspondant, et le fichier original disparaît
gzip dirname
```

### Décompression gzip

Décompressez un seul fichier, en utilisant le paramètre `-d`.

```sh
### Décompresse le fichier file.gz, créant un nouveau fichier
gzip -d file.gz
```

L'ajout de l'argument `-r` permet une décompression récursive contre les répertoires, similaire à la récursion dans la compression, qui décompresse également tous les fichiers d'un répertoire :

```sh
# Décompresse tous les fichiers compressés gzip dans dirname et ses sous-répertoires
gzip -dr dirname
```

### Compression zip

zip peut à la fois archiver et compresser.

Pour archiver et compresser.

```sh
zip archive.zip file1 file2 file3
```

Sortie.

```sh
adding: file1 (stored 0%)
adding: file2 (stored 0%)
adding: file3 (stored 0%)
```

Si vous avez des répertoires à compresser ensemble, vous devez ajouter le paramètre `-r`, et vous pouvez utiliser le paramètre `-q` pour désactiver la sortie :

```sh
zip -qr archive.zip dirname
```

### Décompression zip

Pour décompresser directement dans le répertoire courant.

```sh
unzip archive.zip
```

Si vous voulez décompresser dans un répertoire spécifique, utilisez le paramètre `-d`, de plus le paramètre `-o` peut écraser les fichiers existants sans demander :

```sh
unzip -d /path/to/destination/directory -o archive.zip
```

## Résumé rapide

| suffixe | archiver/compresser | désarchiver/décompresser |
| ---- | ------- | --------- |
| .tar | tar -cvf archive.tar file1 file2 | tar -xvf archive.tar -C /dest/path |
| .tar.gz/.tgz | tar -zcvf archive.tar file1 file2 | tar -zxvf archive.tar -C /dest/path |
| .tar.bz2/.tbz2 | tar -jcvf archive.tar file1 file2 | tar -jxvf archive.tar -C /dest/path |
| .gz | gzip file | gzip -d file.gz |
| .zip | zip -r archive.zip file1 file2 | unzip -d /dest/path -o archive.zip |