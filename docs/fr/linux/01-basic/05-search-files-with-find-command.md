# Linux : Recherche de fichiers avec la commande Find

<Validator lang="fr" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9', 'macOS 13.2.1']" date="2023-04-04" />

La commande `find` sous Linux est un outil puissant qui vous permet de rechercher des fichiers et des répertoires dans une hiérarchie de répertoires donnée en fonction de divers paramètres. Dans ce tutoriel, nous allons explorer comment utiliser la commande find et ses différentes options.

## Syntaxe de base

La syntaxe de base de la commande find est la suivante :

```sh
find [répertoire] [expression]
```

Ici, `[répertoire]` est le répertoire dans lequel vous souhaitez rechercher des fichiers, et `[expression]` est le critère de recherche que vous souhaitez appliquer. La commande find recherchera les fichiers et répertoires dans le `[répertoire]` donné et ses sous-répertoires qui correspondent à l'`[expression]` spécifiée.

Le résultat de la commande find est une liste de fichiers et de répertoires qui correspondent aux critères de recherche spécifiés. Par exemple, si vous exécutez la commande suivante :

```sh
find . -name "*.txt"
```

Vous obtiendrez une liste de tous les fichiers avec une extension `.txt` dans le répertoire courant et ses sous-répertoires :

```
./example.txt
./example2.txt
./subdir/example3.txt
```

## Recherche de fichiers par nom

Pour rechercher un fichier par son nom, utilisez l'option `-name` suivie du nom du fichier que vous recherchez. Par exemple, pour rechercher un fichier nommé `example.txt` dans le répertoire courant et ses sous-répertoires, utilisez la commande suivante :

```sh
find . -name "example.txt"
```

Cela recherchera tous les fichiers nommés "example.txt" dans le répertoire courant et ses sous-répertoires.

Pour rechercher tous les fichiers avec une extension spécifique, utilisez l'option `-name` suivie du caractère générique `*` et de l'extension que vous recherchez. Par exemple, pour rechercher tous les fichiers avec une extension `.txt` dans le répertoire courant et ses sous-répertoires, utilisez la commande suivante :

```sh
find . -name "*.txt"
```

Cela recherchera tous les fichiers avec une extension `.txt` dans le répertoire courant et ses sous-répertoires.

En fait, le caractère générique `*` peut être utilisé dans n'importe quelle partie du nom de fichier. Par exemple :

```sh
find . -name "example*"
find . -name "*example.txt"
find . -name "*example.*"
```

## Recherche de répertoires

Pour rechercher tous les répertoires dans le répertoire courant et ses sous-répertoires, utilisez l'option `-type` suivie de `d`. Par exemple, pour rechercher tous les répertoires dans le répertoire courant et ses sous-répertoires, utilisez la commande suivante :

```sh
find . -type d
```

Cela recherchera tous les répertoires dans le répertoire courant et ses sous-répertoires.

## Recherche de fichiers par date de modification

Pour rechercher tous les fichiers modifiés dans un intervalle de temps spécifique, utilisez l'option `-mtime` suivie du nombre de jours. Si vous souhaitez rechercher des fichiers modifiés au cours des `n` derniers jours, utilisez un nombre négatif `-n`.

Par exemple, pour rechercher tous les fichiers modifiés au cours des 7 derniers jours, utilisez la commande suivante :

```sh
find . -mtime -7
find . -mtime -1w
```

L'unité de temps par défaut pour l'option `-mtime` est le jour.

Vous pouvez utiliser d'autres unités de temps sur macOS :

- `s` - Secondes
- `m` - Minutes
- `h` - Heures
- `d` - Jours
- `w` - Semaines

> Vous pouvez également utiliser les options `-atime` et `-ctime` pour rechercher des fichiers en fonction de leur date d'accès et de création respectivement.

## Recherche de fichiers par taille

Pour rechercher tous les fichiers plus grands qu'une taille spécifique, utilisez l'option `-size` suivie de la taille en octets avec un signe `+`. Pour rechercher tous les fichiers plus petits qu'une taille spécifique, utilisez l'option `-size` suivie de la taille en octets avec un signe `-`.

Par exemple, pour rechercher tous les fichiers plus grands que `10MB` dans le répertoire courant et ses sous-répertoires, utilisez la commande suivante :

```sh
find . -size +10M
```

Cela recherchera tous les fichiers plus grands que `10MB` dans le répertoire courant et ses sous-répertoires.

Les unités de taille courantes que vous pouvez utiliser sont :

- `c` - Octets
- `k` - Kilooctets (1024 octets)
- `M` - Mégaoctets (1024 kilooctets)
- `G` - Gigaoctets (1024 mégaoctets)
- `T` - Téraoctets (1024 gigaoctets)
- `P` - Pétaoctets (1024 téraoctets)

## Combinaison de critères de recherche

Vous pouvez combiner plusieurs critères de recherche pour trouver des fichiers qui correspondent à des conditions spécifiques. Par exemple, pour rechercher tous les fichiers avec une extension spécifique qui ont été modifiés au cours des 7 derniers jours, utilisez la commande suivante :

```sh
find . -name "*.txt" -type f -mtime -7
```

Cela recherchera tous les fichiers avec une extension `.txt` qui ont été modifiés au cours des 7 derniers jours dans le répertoire courant et ses sous-répertoires.

## Utilisation du résultat de la commande find

Vous pouvez utiliser le résultat de la commande find de différentes manières. Voici quelques exemples :

Pour enregistrer le résultat de la commande find dans un fichier, utilisez la commande suivante :

```sh
find . -name "*.txt" > files.txt
```

Cela enregistrera les noms de tous les fichiers avec une extension `.txt` dans un fichier nommé `files.txt`.

Pour utiliser le résultat de la commande find comme entrée pour une autre commande, utilisez la commande `xargs`.

Par exemple, pour supprimer tous les fichiers avec une extension spécifique, utilisez la commande suivante :

```sh
find . -name "*.txt" -type f | xargs rm
```

Pour effectuer une action sur chaque fichier trouvé par la commande find, utilisez l'option `-exec`.

Par exemple, pour modifier les permissions de tous les fichiers avec une extension spécifique, utilisez la commande suivante :

```sh
find . -name "*.txt" -type f -exec chmod 644 {} \;
```

La syntaxe de l'argument `-exec` est :

```sh
-exec commande {} \;
```

- `commande` est la commande que vous souhaitez exécuter sur les fichiers trouvés par find.
- `{}` est un espace réservé qui sera remplacé par le nom du fichier trouvé par find.
- `\;` est utilisé pour terminer la commande et signifier la fin de l'argument `-exec`.

Pour compter le nombre de fichiers trouvés par la commande find, utilisez la commande `wc`. Par exemple, pour compter le nombre de fichiers avec une extension spécifique, utilisez la commande suivante :

```sh
find . -name "*.txt" -type f | wc -l
```

## Conclusion

La commande `find` sous Linux est un outil puissant qui vous permet de rechercher des fichiers et des répertoires en fonction de divers critères. En utilisant ses différentes options et en combinant les critères de recherche, vous pouvez rapidement trouver les fichiers et répertoires dont vous avez besoin. Vous pouvez également utiliser le résultat de la commande find de différentes manières pour effectuer des actions sur les fichiers trouvés.