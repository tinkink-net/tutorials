# Comprendre les bases et la terminologie de Git

## Introduction

Git est un système de contrôle de version distribué qui suit les modifications du code source pendant le développement logiciel. Avant de plonger dans l'utilisation pratique de Git, il est essentiel de comprendre les concepts fondamentaux et la terminologie qui forment la base du fonctionnement de Git.

Ce tutoriel couvrira les concepts de base que tout utilisateur de Git devrait comprendre, vous fournissant une base solide pour travailler efficacement avec Git.

## Qu'est-ce que le contrôle de version ?

Le contrôle de version est un système qui enregistre les modifications apportées aux fichiers au fil du temps afin que vous puissiez rappeler des versions spécifiques ultérieurement. Il vous permet de :

- Suivre les modifications de votre code
- Collaborer avec d'autres développeurs
- Revenir à des versions précédentes si nécessaire
- Comprendre ce qui a changé, quand et qui a fait les modifications
- Maintenir différentes versions de votre projet simultanément

## Git vs. Autres systèmes de contrôle de version

### Centralisé vs. Distribué

Les systèmes de contrôle de version traditionnels (comme CVS, Subversion) sont **centralisés** :
- Un serveur central unique stocke toutes les versions
- Les développeurs extraient les fichiers du dépôt central
- Si le serveur tombe en panne, la collaboration s'arrête

Git est **distribué** :
- Chaque développeur possède une copie complète de l'historique du projet
- Peut travailler hors ligne et synchroniser les modifications ultérieurement
- Pas de point unique de défaillance
- Plusieurs copies de sauvegarde existent naturellement

## Concepts fondamentaux de Git

### Dépôt (Repo)

Un **dépôt** est un espace de stockage où vit votre projet. Il contient :
- Tous vos fichiers de projet
- L'historique complet des modifications
- Les branches et les tags
- Les paramètres de configuration

Types de dépôts :
- **Dépôt local** : Sur votre ordinateur
- **Dépôt distant** : Sur un serveur (comme GitHub, GitLab)

### Répertoire de travail

Le **répertoire de travail** est le dossier sur votre ordinateur où vous travaillez actuellement sur vos fichiers de projet. C'est là que vous modifiez, créez et supprimez des fichiers.

### Zone de préparation (Index)

La **zone de préparation** est un fichier qui stocke des informations sur ce qui ira dans votre prochain commit. C'est comme un aperçu de votre prochain commit.

Pensez-y comme à un panier d'achat :
- Vous ajoutez des articles (modifications) à votre panier (zone de préparation)
- Quand vous êtes prêt, vous passez à la caisse (commit) avec tout ce qui est dans votre panier

### Commit

Un **commit** est un instantané de votre projet à un moment précis. Chaque commit contient :
- Un identifiant unique (hash)
- Informations sur l'auteur
- Horodatage
- Message de commit décrivant les modifications
- Pointeur vers le commit précédent

### Branche

Une **branche** est un pointeur léger et mobile vers un commit spécifique. Elle vous permet de :
- Travailler sur différentes fonctionnalités simultanément
- Expérimenter sans affecter le code principal
- Collaborer avec d'autres sur des fonctionnalités séparées

La branche par défaut est généralement appelée `main` ou `master`.

### HEAD

**HEAD** est un pointeur qui fait référence à la branche sur laquelle vous travaillez actuellement. Il indique à Git quel commit vous êtes en train de consulter.

## États du flux de travail Git

Les fichiers Git peuvent exister dans trois états principaux :

### 1. Modifié
- Les fichiers ont été modifiés mais pas commités
- Les modifications n'existent que dans votre répertoire de travail

### 2. Préparé
- Les fichiers sont marqués pour être inclus dans le prochain commit
- Les modifications sont dans la zone de préparation

### 3. Commité
- Les fichiers sont stockés en toute sécurité dans votre dépôt local
- Les modifications font partie de l'historique du projet

## Les trois zones de Git

Comprendre ces trois zones est crucial pour maîtriser Git :

```
Répertoire de travail → Zone de préparation → Dépôt
      (modifier)            (préparer)        (commiter)
```

### Répertoire de travail
- Où vous modifiez les fichiers
- Contient une version du projet
- Les fichiers peuvent être modifiés, ajoutés ou supprimés

### Zone de préparation
- Stocke des informations sur ce qui ira dans le prochain commit
- Également appelée "index"
- Vous permet de définir exactement ce qui va dans chaque commit

### Dépôt
- Où Git stocke les métadonnées et la base de données d'objets
- Contient toutes les versions de votre projet
- Le dossier `.git` dans la racine de votre projet

## Terminologie essentielle de Git

### Clone
Création d'une copie locale d'un dépôt distant sur votre ordinateur.

### Fork
Création d'une copie personnelle du dépôt de quelqu'un d'autre sur un service d'hébergement comme GitHub.

### Pull
Récupération des modifications d'un dépôt distant et fusion avec votre branche actuelle.

### Push
Téléchargement de vos commits locaux vers un dépôt distant.

### Merge
Combinaison des modifications de différentes branches en une seule branche.

### Rebase
Déplacement ou combinaison de commits d'une branche à une autre, créant un historique linéaire.

### Tag
Une référence à un commit spécifique, généralement utilisée pour marquer des points de version.

### Remote
Une version de votre dépôt hébergée sur un serveur, utilisée pour la collaboration.

### Origin
Le nom par défaut du dépôt distant à partir duquel vous avez cloné.

### Upstream
Le dépôt original à partir duquel vous avez fait un fork (dans les flux de travail basés sur les forks).

## Types d'objets Git

Git stocke tout sous forme d'objets dans sa base de données :

### 1. Blob (Binary Large Object)
- Stocke le contenu des fichiers
- Ne contient pas le nom du fichier ou la structure de répertoire

### 2. Tree
- Représente les répertoires
- Contient des références aux blobs et autres trees
- Stocke les noms de fichiers et les permissions

### 3. Commit
- Pointe vers un objet tree
- Contient des métadonnées (auteur, horodatage, message)
- Référence le(s) commit(s) parent(s)

### 4. Tag
- Pointe vers un commit
- Contient des métadonnées supplémentaires
- Généralement utilisé pour les versions

## Aperçu des commandes Git courantes

Voici les commandes Git les plus fréquemment utilisées et leurs objectifs :

### Opérations sur les dépôts
- `git init` - Initialiser un nouveau dépôt
- `git clone` - Copier un dépôt distant en local
- `git status` - Vérifier l'état de votre répertoire de travail

### Flux de travail de base
- `git add` - Préparer des modifications pour un commit
- `git commit` - Sauvegarder les modifications dans le dépôt
- `git push` - Télécharger les modifications vers un dépôt distant
- `git pull` - Télécharger les modifications depuis un dépôt distant

### Opérations sur les branches
- `git branch` - Lister, créer ou supprimer des branches
- `git checkout` - Changer de branche ou restaurer des fichiers
- `git merge` - Fusionner les modifications d'une branche dans une autre

### Commandes d'information
- `git log` - Voir l'historique des commits
- `git diff` - Afficher les différences entre commits, branches, etc.
- `git show` - Afficher des informations sur les commits

## Bonnes pratiques pour comprendre Git

### 1. Penser en instantanés
Git ne stocke pas les différences ; il stocke des instantanés de l'ensemble de votre projet à chaque commit.

### 2. Les commits sont peu coûteux
N'ayez pas peur de commiter souvent. Les commits petits et ciblés sont plus faciles à comprendre et à gérer.

### 3. Utiliser des messages de commit significatifs
Écrivez des messages de commit clairs et descriptifs qui expliquent ce qui a changé et pourquoi.

### 4. Comprendre les trois états
Soyez toujours conscient de l'état de vos fichiers : modifié, préparé ou commité.

### 5. Créer des branches tôt et souvent
Utilisez des branches pour les fonctionnalités, les expériences et les corrections de bugs. Elles sont légères et faciles à utiliser.

## Résumé

Comprendre les concepts fondamentaux et la terminologie de Git est essentiel pour un contrôle de version efficace. Points clés à retenir :

- **Git est distribué** : Chaque copie est un dépôt complet
- **Trois états** : Modifié, préparé, commité
- **Trois zones** : Répertoire de travail, zone de préparation, dépôt
- **Les commits sont des instantanés** : Pas des différences, mais des états complets du projet
- **Les branches sont des pointeurs** : Références légères vers des commits
- **HEAD suit l'emplacement** : Montre où vous êtes dans l'historique du projet

Avec ces concepts fondamentaux compris, vous êtes prêt à commencer à utiliser Git efficacement. Le prochain tutoriel vous guidera dans la création de votre premier dépôt Git et l'exécution d'opérations de base.

## Prochaines étapes

Maintenant que vous comprenez les bases et la terminologie de Git, vous pouvez passer à :
1. [Créer votre premier dépôt Git](./creating-your-first-git-repository.md)
2. [Flux de travail Git de base : Add, Commit, Push](./basic-git-workflow-add-commit-push.md)
3. [Comprendre les branches Git](./understanding-git-branches.md)

## Ressources connexes

- [Installation et configuration de Git](./git-installation-and-setup.md)
- [Utiliser différentes configurations Git dans différents projets](./git-using-different-config-in-different-projects.md)
- [Documentation officielle de Git](https://git-scm.com/doc)
- [Livre Pro Git](https://git-scm.com/book)