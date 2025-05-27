# Travailler avec des Fichiers Texte sous Linux

<Validator lang="fr" :platform-list="['Ubuntu 22.04']" date="2023-05-05" />

Travailler avec des fichiers texte sous Linux est une compétence fondamentale que chaque utilisateur devrait posséder. Les fichiers texte sont couramment utilisés dans les systèmes Linux pour stocker des fichiers de configuration, des scripts et divers autres types de données au format texte brut. Dans ce tutoriel, nous allons couvrir comment travailler avec des fichiers texte sous Linux.

## Utilisation des Fichiers Texte

Les fichiers texte sont couramment utilisés sous Linux pour stocker des informations de configuration, des journaux, des scripts et d'autres données qui peuvent être lues et modifiées à l'aide d'un éditeur de texte. Les fichiers texte peuvent être ouverts et modifiés à l'aide de n'importe quel éditeur de texte compatible. Les extensions de fichier courantes pour les fichiers texte sont `.txt`, `.conf`, `.cfg`, `.log` et `.sh`. De plus, tout code source de programme écrit dans un langage de programmation tel que C, C++, Java, Python, Perl, Ruby, etc., est également stocké dans des fichiers texte.

Les tâches les plus courantes effectuées sur les fichiers texte sont l'édition et la lecture.

Les fichiers texte peuvent être édités à l'aide de n'importe quel éditeur de texte, mais les éditeurs les plus populaires sont nano et vim. Les deux éditeurs sont inclus par défaut dans la plupart des distributions Linux.

> Si Nano ou Vim n'est pas installé sur votre système, vous pouvez l'installer à l'aide du gestionnaire de paquets de votre distribution Linux. Par exemple, si vous utilisez Debian ou Ubuntu, vous pouvez installer nano avec la commande suivante : `apt-get install nano`. (Vous devrez peut-être utiliser `sudo` pour exécuter la commande en tant que root.)

## Éditer avec Nano

Nano est un choix populaire pour les débutants en raison de sa simplicité et de sa facilité d'utilisation. Pour créer un nouveau fichier ou modifier un fichier existant à l'aide de l'éditeur nano, tapez la commande suivante dans votre terminal :

```sh
nano filename.txt
```

Remplacez `filename` par le nom de fichier souhaité. Une fois votre fichier ouvert, vous pouvez commencer à taper. Pour enregistrer votre fichier dans l'éditeur nano, appuyez sur `CTRL + O` suivi de `Entrée`. Pour quitter l'éditeur nano, appuyez sur `CTRL + X`.

Les autres commandes utiles sont listées en bas de l'écran. Par exemple, si vous souhaitez rechercher une chaîne spécifique dans votre fichier, appuyez sur `CTRL + W` et tapez votre chaîne de recherche. Pour remplacer une chaîne, appuyez sur `CTRL + \`. Vous pouvez également utiliser `CTRL + G` pour obtenir de l'aide.

Comme vous pouvez le voir, l'éditeur nano est très simple et facile à utiliser. C'est un excellent choix pour les débutants qui commencent tout juste avec Linux.

## Éditer avec Vim

Vim est un éditeur de texte puissant en ligne de commande qui est installé par défaut sur la plupart des systèmes Linux. C'est un favori parmi les utilisateurs expérimentés de Linux en raison de sa puissance et de sa flexibilité. Et dans de nombreuses tâches d'administration système, c'est l'éditeur par défaut, par exemple, lors de l'édition des tâches de configuration crontab. Pour créer un nouveau fichier ou modifier un fichier existant à l'aide de Vim, tapez la commande suivante dans votre terminal :

```sh
vim filename.txt
```

> Vous pouvez également utiliser la commande `vi` au lieu de `vim`, ils sont identiques.

Ce qui rend Vim différent des autres éditeurs de texte, c'est qu'il possède deux modes : le mode commande et le mode insertion. En mode commande, vous pouvez utiliser diverses commandes pour effectuer des actions telles que l'enregistrement, la sortie et la recherche. En mode insertion, vous pouvez taper du texte dans votre fichier. Beaucoup de gens trouvent cela déroutant au début, par exemple, lorsqu'ils essaient de taper du texte dans leur fichier mais que rien ne se passe, ou que quelque chose d'inattendu se produit. C'est parce qu'ils sont en mode commande au lieu du mode insertion. Cela prend du temps pour s'y habituer, mais une fois que vous y êtes habitué, cela devient naturel.

Rappel : Pour entrer en mode insertion, appuyez sur `i`, assurez-vous que le coin inférieur gauche de l'écran indique `-- INSERT --`. Pour quitter le mode insertion, appuyez sur `ESC`.

Pour éditer votre fichier dans l'éditeur vim, entrez en mode insertion en appuyant sur `i` et tapez votre texte. Une fois que vous avez terminé, appuyez sur `ESC` pour quitter le mode insertion. Ensuite, tapez `:wq` et appuyez sur `Entrée`. Si vous souhaitez enregistrer votre fichier sans quitter vim, tapez `:w` et appuyez sur `Entrée`. Si vous souhaitez quitter sans enregistrer, tapez `:q!` et appuyez sur `Entrée`.

Pour rechercher une chaîne spécifique dans votre fichier, entrez en mode commande en appuyant sur `ESC` et tapez `/chaîne`. Pour remplacer une chaîne, entrez en mode commande en appuyant sur `ESC` et tapez `:s/ancien/nouveau/g`.

Autres conseils rapides :

- Pour déplacer le curseur au début de la ligne, appuyez sur `0`.
- Pour déplacer le curseur à la fin de la ligne, appuyez sur `$`.
- Pour déplacer le curseur au début du fichier, appuyez sur `gg`.
- Pour déplacer le curseur à la fin du fichier, appuyez sur `G`.
- Pour déplacer le curseur au mot suivant, appuyez sur `w`.
- Pour déplacer le curseur au mot précédent, appuyez sur `b`.
- Pour déplacer le curseur dans quatre directions, appuyez sur `h`, `j`, `k`, `l`.
- Pour déplacer le curseur à la ligne 10, appuyez sur `10G`.
- Pour supprimer un caractère, appuyez sur `x`.
- Pour supprimer une ligne, appuyez sur `dd`.
- Pour annuler, appuyez sur `u`.
- Pour copier une ligne, appuyez sur `yy`.
- Pour coller une ligne, appuyez sur `p`.

> Remarque : Les commandes dans Vim sont sensibles à la casse. Par exemple, `:wq` n'est pas la même chose que `:WQ`.

Il existe de nombreuses autres commandes, et il est possible de les combiner pour effectuer des actions plus complexes. Mais ce sont les plus courantes. Vous pouvez trouver plus de commandes en tapant `:help` en mode commande.

## Lire avec Less

En tant qu'éditeurs de texte, Nano et Vim sont excellents pour créer et éditer des fichiers texte. Mais que faire si vous voulez simplement lire un fichier texte ? Par exemple, si vous souhaitez lire un fichier journal ou un fichier de configuration. Bien sûr, vous pouvez utiliser un éditeur de texte pour lire un fichier texte, mais ce n'est pas très efficace, surtout si le fichier est très volumineux.

> Remarque : Lorsque vous ouvrez un fichier très volumineux dans un éditeur de texte, cela peut prendre beaucoup de temps à charger et peut également utiliser beaucoup de ressources système. Veuillez éviter d'ouvrir des fichiers volumineux dans un éditeur de texte sur un serveur de production.

La meilleure façon de lire un fichier texte est d'utiliser la commande `less`. La commande `less` est un paginateur qui vous permet de lire des fichiers texte dans votre terminal. Pour lire un fichier texte à l'aide de la commande `less`, tapez la commande suivante dans votre terminal :

```sh
less filename.txt
```

L'utilisation de base de la commande `less` est similaire à Vim. Vous pouvez utiliser les touches fléchées pour faire défiler vers le haut et vers le bas, vous pouvez également utiliser `/` pour rechercher une chaîne spécifique. Pour quitter la commande `less`, appuyez sur `q`.

Comme Less est un paginateur, il lit le fichier une page à la fois au lieu de charger l'intégralité du fichier en mémoire, les performances sont bien meilleures qu'avec un éditeur de texte. C'est également très utile pour lire des fichiers volumineux.

## Lire avec Cat

Une autre façon de lire un fichier texte est d'utiliser la commande `cat`. La commande `cat` est un utilitaire qui vous permet de lire des fichiers texte dans votre terminal. Pour lire un fichier texte à l'aide de la commande `cat`, tapez la commande suivante dans votre terminal :

```sh
cat filename.txt
```

La principale différence entre la commande `cat` et la commande `less` est que la commande `cat` lit l'intégralité du fichier en une seule fois et l'imprime dans le terminal. C'est utile si vous voulez lire un petit fichier, mais ce n'est pas recommandé pour les fichiers volumineux.

C'est également utile si vous souhaitez rediriger la sortie d'une commande vers une autre commande en entrée. Par exemple, si vous souhaitez rechercher une chaîne spécifique dans un fichier, vous pouvez utiliser la commande `cat` pour lire le fichier et rediriger la sortie vers la commande `grep` pour rechercher la chaîne. Par exemple :

```sh
cat filename.txt | grep "chaîne"
```

## Lire avec Head et Tail

La commande `head` est un utilitaire qui vous permet de lire les premières lignes d'un fichier texte. Pour lire les premières lignes d'un fichier texte à l'aide de la commande `head`, tapez la commande suivante dans votre terminal :

```sh
head filename.txt
```

La commande `head` est utile si vous souhaitez vérifier rapidement le contenu d'un fichier sans l'ouvrir dans un éditeur de texte ou un paginateur.

Si vous souhaitez définir le nombre de lignes à lire, vous pouvez utiliser l'option `-n`. Par exemple, si vous souhaitez lire les 10 premières lignes d'un fichier, vous pouvez utiliser la commande suivante :

```sh
head -n 10 filename.txt
```

Contrairement à la commande `head`, la commande `tail` vous permet de lire les dernières lignes d'un fichier texte. Pour lire les dernières lignes d'un fichier texte à l'aide de la commande `tail`, tapez la commande suivante dans votre terminal :

```sh
tail filename.txt
```

La commande `tail` possède également une option `-n` qui vous permet de définir le nombre de lignes à lire. Par exemple, si vous souhaitez lire les 10 dernières lignes d'un fichier, vous pouvez utiliser la commande suivante :

```sh
tail -n 10 filename.txt
```

## Conclusion

En conclusion, travailler avec des fichiers texte est une compétence essentielle que tout utilisateur Linux devrait posséder. Les éditeurs Nano et Vim facilitent la création, l'édition et l'enregistrement de fichiers texte sous Linux. La commande `less` est un paginateur qui vous permet de lire des fichiers texte dans votre terminal. La commande `cat` est un utilitaire qui vous permet de lire des fichiers texte dans votre terminal. Les commandes `head` et `tail` vous permettent de lire les premières et dernières lignes d'un fichier texte. Avec cet article, vous avez appris à créer et à éditer des fichiers texte à l'aide des éditeurs nano et vim. Bonne édition !