# Création de votre premier dépôt Git

## Introduction

Maintenant que vous comprenez les bases et la terminologie de Git, il est temps de créer votre premier dépôt Git. Ce tutoriel vous guidera à travers le processus d'initialisation d'un nouveau dépôt Git, la compréhension de la structure des répertoires et la configuration de votre premier projet pour le contrôle de version.

À la fin de ce tutoriel, vous aurez un dépôt Git entièrement fonctionnel et vous comprendrez comment commencer à suivre les fichiers de votre projet.

## Prérequis

Avant de commencer ce tutoriel, assurez-vous d'avoir :
- Git installé sur votre système ([Installation et configuration de Git](./git-installation-and-setup.md))
- Une compréhension de base des concepts Git ([Comprendre les bases et la terminologie de Git](./understanding-git-basics-and-terminology.md))
- Un éditeur de texte ou un IDE de votre choix
- Des connaissances de base en ligne de commande

## Deux façons de créer un dépôt Git

Il existe deux façons principales de créer un dépôt Git :

1. **Initialiser un nouveau dépôt** dans un répertoire existant
2. **Cloner un dépôt existant** depuis un emplacement distant

Ce tutoriel se concentre sur la première méthode. Le clonage sera abordé dans les tutoriels ultérieurs sur les dépôts distants.

## Méthode 1 : Initialiser un nouveau dépôt

### Étape 1 : Créer un répertoire de projet

Tout d'abord, créez un nouveau répertoire pour votre projet :

```bash
# Créer un nouveau répertoire
mkdir my-first-git-project

# Naviguer dans le répertoire
cd my-first-git-project
```

### Étape 2 : Initialiser le dépôt Git

Initialisez Git dans votre répertoire de projet :

```bash
git init
```

Vous devriez voir une sortie similaire à :
```
Initialized empty Git repository in /path/to/my-first-git-project/.git/
```

**Que vient-il de se passer ?**
- Git a créé un répertoire caché `.git` dans votre dossier de projet
- Ce répertoire `.git` contient toutes les métadonnées Git et la base de données d'objets
- Votre répertoire est maintenant un dépôt Git (mais vide)

### Étape 3 : Vérifier la création du dépôt

Vérifiez que Git fonctionne dans votre répertoire :

```bash
git status
```

Vous devriez voir :
```
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

Cela confirme que :
- Vous êtes sur la branche `main`
- Aucun commit n'a encore été effectué
- Il n'y a pas de fichiers suivis

## Comprendre le répertoire .git

Le répertoire `.git` contient toutes les données du dépôt Git. Explorons sa structure :

```bash
ls -la .git/
```

Vous verrez des répertoires et des fichiers comme :
- `config` - Configuration du dépôt
- `description` - Description du dépôt (utilisée par GitWeb)
- `HEAD` - Pointe vers la branche actuelle
- `hooks/` - Répertoire pour les hooks Git (scripts)
- `info/` - Informations supplémentaires sur le dépôt
- `objects/` - Base de données d'objets Git
- `refs/` - Références (branches, tags)

**Important** : Ne modifiez jamais manuellement les fichiers dans le répertoire `.git` à moins de savoir exactement ce que vous faites !

## Création de vos premiers fichiers

### Étape 1 : Créer un fichier README

Créez un fichier README pour votre projet :

```bash
echo "# My First Git Project" > README.md
```

Ou créez-le avec votre éditeur de texte :

```markdown
# My First Git Project

This is my first project using Git version control.

## Features

- Learning Git basics
- Understanding version control
- Building good development habits

## Getting Started

This project demonstrates basic Git workflow and commands.
```

### Étape 2 : Créer des fichiers supplémentaires

Créons quelques fichiers supplémentaires pour rendre notre projet plus intéressant :

```bash
# Créer un script Python simple
cat > hello.py << 'EOF'
#!/usr/bin/env python3

def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("World"))
EOF

# Créer un fichier texte simple
echo "This is a sample text file for Git practice." > sample.txt

# Créer un fichier de configuration de projet
cat > config.json << 'EOF'
{
  "project": "my-first-git-project",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Learning Git version control"
}
EOF
```

### Étape 3 : Vérifier l'état du dépôt

Maintenant, vérifiez ce que Git voit :

```bash
git status
```

Vous devriez voir :
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

**Comprendre la sortie :**
- `Untracked files` - Fichiers que Git ne suit pas actuellement
- Git suggère d'utiliser `git add` pour commencer à suivre ces fichiers

## État des fichiers dans Git

Git classe les fichiers dans différents états :

### 1. Non suivis (Untracked)
- Fichiers qui existent dans votre répertoire de travail mais ne sont pas suivis par Git
- Les nouveaux fichiers entrent dans cette catégorie

### 2. Suivis (Tracked)
Les fichiers que Git connaît, qui peuvent être :
- **Non modifiés** - Pas de changements depuis le dernier commit
- **Modifiés** - Changés mais non indexés
- **Indexés** - Changements marqués pour le prochain commit

## Configuration de base de Git (Optionnel)

Avant de faire des commits, vous voudrez peut-être configurer Git avec votre identité :

```bash
# Définir votre nom et email (si ce n'est pas fait globalement)
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"

# Voir la configuration actuelle
git config --list
```

## Configuration spécifique au dépôt

Vous pouvez également définir une configuration spécifique à ce dépôt :

```bash
# Définir une configuration spécifique au dépôt
git config user.name "Nom Spécifique au Projet"
git config user.email "projet@example.com"

# Voir la configuration du dépôt
git config --local --list
```

## Création d'un fichier .gitignore

Créez un fichier `.gitignore` pour spécifier les fichiers que Git doit ignorer :

```bash
cat > .gitignore << 'EOF'
# Ignore compiled Python files
*.pyc
__pycache__/

# Ignore temporary files
*.tmp
*.temp

# Ignore log files
*.log

# Ignore IDE files
.vscode/
.idea/
*.swp
*.swo

# Ignore OS-specific files
.DS_Store
Thumbs.db
EOF
```

### Pourquoi utiliser .gitignore ?
- Empêche le suivi des fichiers temporaires
- Garde le dépôt propre
- Réduit le bruit dans `git status`
- Empêche les commits accidentels de données sensibles

## Comprendre la structure du dépôt Git

Votre projet a maintenant cette structure :

```
my-first-git-project/
├── .git/                 # Données du dépôt Git (caché)
├── .gitignore           # Fichiers à ignorer
├── README.md            # Documentation du projet
├── config.json          # Fichier de configuration
├── hello.py             # Script Python
└── sample.txt           # Fichier texte d'exemple
```

## Vérifier à nouveau l'état du dépôt

Voyons à quoi ressemble notre dépôt maintenant :

```bash
git status
```

Vous devriez voir :
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

## Bonnes pratiques pour la création de dépôt

### 1. Initialiser tôt
Commencez avec Git dès le début de votre projet, pas après avoir déjà écrit beaucoup de code.

### 2. Créer un bon README
Incluez toujours un fichier README qui explique :
- Ce que fait le projet
- Comment l'installer/l'exécuter
- Comment contribuer

### 3. Utiliser .gitignore dès le début
Configurez `.gitignore` tôt pour éviter de suivre des fichiers inutiles.

### 4. Choisir des noms de répertoire significatifs
Utilisez des noms descriptifs pour vos répertoires de projet.

### 5. Garder la racine du dépôt propre
Ne surchargez pas le répertoire racine avec trop de fichiers.

## Erreurs courantes à éviter

### 1. Ne pas initialiser Git dans votre répertoire personnel
```bash
# NE FAITES PAS CECI
cd ~
git init
```

### 2. Ne pas supprimer le répertoire .git
Supprimer `.git` détruit tout l'historique Git.

### 3. Ne pas initialiser Git à l'intérieur d'un autre dépôt Git
Cela peut causer de la confusion et des conflits.

### 4. Ne pas suivre de gros fichiers binaires
Utilisez Git LFS pour les gros fichiers à la place.

## Méthode 2 : Initialiser avec des fichiers

Si vous avez déjà des fichiers dans un répertoire, vous pouvez y initialiser Git :

```bash
# Naviguer vers un projet existant
cd existing-project

# Initialiser Git
git init

# Les fichiers sont maintenant non suivis, prêts à être ajoutés
git status
```

## Résolution des problèmes courants

### Problème : "Not a git repository"
**Solution** : Assurez-vous d'être dans le bon répertoire et d'avoir exécuté `git init`.

### Problème : Permission Denied
**Solution** : Vérifiez les permissions des fichiers et assurez-vous d'avoir un accès en écriture au répertoire.

### Problème : Repository Already Exists
**Solution** : Si vous voyez "Reinitialized existing Git repository", Git a détecté un répertoire `.git` existant.

## Résumé

Vous avez créé avec succès votre premier dépôt Git ! Voici ce que vous avez accompli :

1. **Créé un répertoire de projet** et initialisé Git
2. **Compris la structure et l'objectif** du répertoire .git
3. **Créé des fichiers de projet** incluant README, code et configuration
4. **Configuré .gitignore** pour exclure les fichiers inutiles
5. **Appris les états des fichiers** dans Git (suivis vs non suivis)
6. **Configuré Git** pour votre dépôt

### Commandes clés utilisées :
- `git init` - Initialiser un nouveau dépôt
- `git status` - Vérifier l'état du dépôt
- `git config` - Configurer les paramètres Git

### État actuel du dépôt :
- ✅ Dépôt initialisé
- ✅ Fichiers créés
- ✅ .gitignore configuré
- ⏳ Les fichiers ne sont pas suivis (prêts pour l'indexation)

## Prochaines étapes

Maintenant que vous avez un dépôt avec des fichiers, vous êtes prêt à apprendre le flux de travail Git de base :

1. **Ajouter des fichiers à la zone d'indexation** (git add)
2. **Valider les changements** (git commit)
3. **Pousser vers un dépôt distant** (git push)

Continuez avec : [Flux de travail Git de base : Add, Commit, Push](./basic-git-workflow-add-commit-push.md)

## Ressources connexes

- [Comprendre les bases et la terminologie de Git](./understanding-git-basics-and-terminology.md)
- [Installation et configuration de Git](./git-installation-and-setup.md)
- [Utiliser différentes configurations Git dans différents projets](./git-using-different-config-in-different-projects.md)
- [Tutoriel officiel Git](https://git-scm.com/docs/gittutorial)
- [Livre Pro Git - Démarrage](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)