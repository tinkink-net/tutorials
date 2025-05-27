# GIT : Utiliser différentes configurations (nom d'utilisateur git / gmail ou clés ssh) dans différents projets

<Validator lang="fr" :platform-list="['Git 2.37']" date="2023-03-06" />

## Contexte

Lorsque nous utilisons Git, nous configurons souvent des éléments de configuration de base, tels que le nom d'utilisateur (`user.name`) et l'email (`user.email`). S'ils ne sont pas configurés, la première fois que vous utilisez Git pour valider du code, une erreur s'affichera :

```
Make sure you configure your 'user.email' and 'user.name' in git
```

Nous pouvons résoudre ce problème en utilisant la commande `git config` pour définir les valeurs.

```sh
git config --global user.name "Tinymemo"
git config --global user.email "tinymemo@tinkink.net"
```

Cette commande écrit en fait deux éléments de configuration dans le fichier de configuration global : `user.name` et `user.email`. Nous pouvons essayer d'ouvrir le fichier de configuration (généralement situé à `~/.gitconfig` ou `C:\Users\<username>\.gitconfig`) :

```
[user]
        name = Tinymemo
        email = tinymemo
```

Si nous n'exécutons pas la commande avec l'option `--global`, le fichier de configuration sera écrit dans le répertoire courant, généralement situé à `.git/config`.

## Utiliser différentes configurations dans différents projets

Lorsque nous voulons participer à des projets avec différentes identités, nous devons utiliser différentes configurations pour chaque projet. Mais nous ne voulons pas écrire une configuration séparée dans chaque projet, car nous devrions utiliser la configuration globale si le projet n'a pas de configuration. Nous avons donc besoin d'une meilleure solution.

Heureusement, Git fournit la directive `includeIf`, qui peut être utilisée pour spécifier différentes configurations pour différents chemins.

Supposons que nous ayons les deux chemins suivants :

- `~/work` le nom d'utilisateur et l'email correspondants sont `Tinymemo` / `tinymemo@somework.com`
- `~/hobby` le nom d'utilisateur et l'email correspondants sont `Tinymemo` / `tinymemo@somehobby.com`

D'abord, nous créons deux fichiers de configuration séparés :

`~/.gitconfig-work` :

```
[user]
        name = Tinymemo
        email = tinymemo@somework.com
```

`~/.gitconfig-hobby` :

```
[user]
        name = Tinymemo
        email = tinymemo@somehobby.com
```

Ensuite, nous ajoutons les lignes suivantes au fichier de configuration global `~/.gitconfig`, veuillez noter le dernier slash dans le chemin :

```
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
[includeIf "gitdir:~/hobby/"]
    path = ~/.gitconfig-hobby
```

Nous pouvons ensuite vérifier dans le répertoire correspondant du projet :

```sh
# ~/work/project1
git config user.name // Tinymemo
git config user.email // tinymemo@somework.com

# ~/hobby/project2
git config user.name // Tinymemo
git config user.email // tinymemo@somehobby.com
```

> Remarque : vous devez exécuter la commande `git config` dans le répertoire du projet, sinon elle utilisera la configuration globale.

Ainsi, nous pouvons facilement utiliser différentes configurations dans différents projets.

## Utiliser différentes configurations pour les clés publiques/privées

La configuration ci-dessus facilite l'utilisation de différents noms d'utilisateur et emails pour différents projets, mais nous voulons également utiliser différentes clés SSH publiques/privées pour différents projets dans certains cas.

Tout d'abord, nous devons créer une nouvelle clé publique. Si nous avons déjà une clé publique, nous pouvons sauter cette étape.

```sh
cd ~/.ssh
ssh-keygen -t rsa
```

Veuillez noter le nom du fichier, il ne peut pas être le nom par défaut `id_rsa`, sinon il entrera en conflit avec la clé publique existante.

```
Enter file in which to save the key (/Users/tinymemo/.ssh/id_rsa): id_rsa_hobby
```

Appuyez simplement sur Entrée jusqu'à la fin.

Ensuite, nous pouvons ajouter un nouvel élément de configuration au fichier de configuration, pour spécifier la nouvelle clé publique pour la commande `ssh` :

```
[core]
    sshCommand = "ssh -i ~/.ssh/id_rsa_hobby -F /dev/null"
```

Après cela, nous pouvons utiliser différentes clés publiques/privées pour différents projets :

## Résumé

En utilisant la directive `[includeIf]` dans la configuration globale, nous pouvons facilement utiliser différents noms d'utilisateur, emails et clés publiques/privées pour différents projets dans différents répertoires.