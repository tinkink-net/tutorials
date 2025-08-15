# Flux de travail Git de base : Add, Commit, Push

## Introduction

Maintenant que vous avez créé votre premier dépôt Git et que vous comprenez les concepts de base, il est temps d'apprendre le flux de travail fondamental de Git. Ce flux de travail constitue l'épine dorsale de l'utilisation quotidienne de Git et se compose de trois étapes principales : **Add**, **Commit** et **Push**.

Ce tutoriel vous guidera à travers ces opérations essentielles, vous aidant à comprendre comment suivre les modifications, enregistrer des instantanés de votre travail et partager votre code avec d'autres.

## Prérequis

Avant de commencer ce tutoriel, assurez-vous d'avoir :
- Un dépôt Git créé ([Création de votre premier dépôt Git](./creating-your-first-git-repository.md))
- Une compréhension de base des concepts Git ([Comprendre les bases et la terminologie Git](./understanding-git-basics-and-terminology.md))
- Quelques fichiers dans votre dépôt pour travailler

## Le flux de travail Git de base

Le flux de travail standard de Git suit ces étapes :

```
1. Modifier les fichiers dans le répertoire de travail
2. Préparer les modifications (git add)
3. Valider les modifications (git commit)
4. Pousser vers le dépôt distant (git push)
```

Explorons chaque étape en détail.

## Étape 1 : Comprendre l'état actuel

Avant de faire des modifications, vérifions l'état actuel de notre dépôt :

```bash
git status
```

Vous devriez voir quelque chose comme :
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

Cela montre :
- Branche actuelle : `main`
- Pas encore de commits
- Plusieurs fichiers non suivis

## Étape 2 : Ajouter des fichiers à la zone de préparation (git add)

La commande `git add` déplace les fichiers du répertoire de travail vers la zone de préparation. C'est là que vous préparez votre prochain commit.

### Ajouter des fichiers individuels

Ajoutez des fichiers un par un :

```bash
# Ajouter le fichier README
git add README.md

# Vérifier l'état
git status
```

Vous devriez voir :
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	config.json
	hello.py
	sample.txt
```

**Remarquez la différence :**
- `README.md` est maintenant sous "Changes to be committed" (préparé)
- Les autres fichiers restent "Untracked" (non suivis)

### Ajouter plusieurs fichiers

Ajoutez plusieurs fichiers à la fois :

```bash
# Ajouter plusieurs fichiers spécifiques
git add hello.py config.json

# Ou ajouter tous les fichiers du répertoire courant
git add .

# Vérifier l'état
git status
```

Après avoir ajouté tous les fichiers :
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   .gitignore
	new file:   README.md
	new file:   config.json
	new file:   hello.py
	new file:   sample.txt
```

### Modèles courants de git add

```bash
# Ajouter tous les fichiers
git add .

# Ajouter tous les fichiers dans le répertoire courant et les sous-répertoires
git add -A

# Ajouter uniquement les fichiers modifiés (pas les nouveaux fichiers)
git add -u

# Ajouter des fichiers de manière interactive
git add -i

# Ajouter des types de fichiers spécifiques
git add *.py
git add *.md
```

### Comprendre la zone de préparation

La zone de préparation vous permet de :
- **Créer des commits précis** - Choisir exactement ce qui va dans chaque commit
- **Examiner les modifications** - Voir ce qui sera validé avant de le valider
- **Diviser les modifications** - Valider séparément les modifications connexes

## Étape 3 : Faire votre premier commit (git commit)

Un commit crée un instantané de vos modifications préparées. Chaque commit doit représenter une unité logique de travail.

### Commande de base pour commit

```bash
git commit -m "Initial commit: Add project files"
```

Vous devriez voir une sortie comme :
```
[main (root-commit) a1b2c3d] Initial commit: Add project files
 5 files changed, 23 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 config.json
 create mode 100755 hello.py
 create mode 100644 sample.txt
```

**Comprendre la sortie :**
- `main` - Branche actuelle
- `root-commit` - C'est le premier commit
- `a1b2c3d` - Hash court du commit
- `5 files changed, 23 insertions(+)` - Résumé des modifications

### Bonnes pratiques pour les messages de commit

De bons messages de commit sont cruciaux pour la maintenance du projet :

#### Structure
```
Résumé court (50 caractères ou moins)

Explication plus détaillée si nécessaire. Retour à la ligne à 72 caractères.
Expliquez quoi et pourquoi, pas comment.

- Utilisez des puces pour plusieurs modifications
- Référencez les numéros de problèmes si applicable
```

#### Exemples de bons messages de commit
```bash
# Bon - Clair et concis
git commit -m "Ajouter système d'authentification utilisateur"

# Bon - Explique le pourquoi
git commit -m "Corriger bug de connexion qui empêchait la réinitialisation du mot de passe"

# Bon - Commit sur plusieurs lignes
git commit -m "Implémenter l'édition de profil utilisateur

- Ajouter validation de formulaire
- Mettre à jour le modèle utilisateur
- Ajouter téléchargement d'image de profil
- Corriger problèmes de style sur mobile"
```

#### Exemples de mauvais messages de commit
```bash
# Mauvais - Trop vague
git commit -m "corriger des trucs"

# Mauvais - Pas descriptif
git commit -m "mise à jour"

# Mauvais - Trop long pour un résumé
git commit -m "Ce commit ajoute le nouveau système d'authentification utilisateur qui permet aux utilisateurs de se connecter et d'enregistrer des comptes avec validation par email et fonctionnalité de réinitialisation de mot de passe"
```

### Méthodes alternatives de commit

#### Utiliser l'éditeur par défaut
```bash
# Ouvre votre éditeur par défaut pour le message de commit
git commit
```

#### Valider toutes les modifications
```bash
# Prépare et valide tous les fichiers suivis
git commit -a -m "Mettre à jour tous les fichiers suivis"
```

## Étape 4 : Afficher l'historique des commits

Après avoir fait des commits, vous pouvez consulter l'historique de votre dépôt :

```bash
# Afficher l'historique des commits
git log
```

Sortie :
```
commit a1b2c3d4e5f6789... (HEAD -> main)
Author: Your Name <your.email@example.com>
Date:   Wed Jul 9 10:30:00 2025 +0000

    Initial commit: Add project files
```

### Options utiles pour git log

```bash
# Format compact sur une ligne
git log --oneline

# Afficher les 3 derniers commits
git log -3

# Afficher les commits avec les modifications de fichiers
git log --stat

# Afficher les commits avec les modifications réelles
git log -p

# Représentation graphique
git log --graph --oneline
```

## Faire des modifications supplémentaires

Pratiquons le flux de travail avec quelques modifications :

### Étape 1 : Modifier un fichier

Éditez le fichier README.md :

```bash
echo "

## Recent Updates

- Added basic project structure
- Created initial configuration
- Set up Git repository" >> README.md
```

### Étape 2 : Vérifier l'état

```bash
git status
```

Vous devriez voir :
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

no changes added to commit (use "git add" and commit)
```

### Étape 3 : Voir les modifications

Voir ce qui a changé :

```bash
git diff
```

Cela montre les différences entre votre répertoire de travail et le dernier commit.

### Étape 4 : Préparer et valider

```bash
# Préparer les modifications
git add README.md

# Valider les modifications
git commit -m "Update README with project status"
```

## Comprendre les états des fichiers

Les fichiers dans Git passent par différents états :

```
Non suivi → Préparé → Validé
    ↓         ↓         ↓
  git add → git commit → git push
```

### Exemples d'états de fichiers

```bash
# Vérifier l'état détaillé
git status

# Voir l'état court
git status -s
```

Symboles d'état court :
- `??` - Fichier non suivi
- `A` - Ajouté (préparé)
- `M` - Modifié
- `D` - Supprimé
- `R` - Renommé

## Étape 5 : Configurer un dépôt distant

Pour pousser vos modifications, vous avez besoin d'un dépôt distant. Configurons un dépôt distant :

### Utilisation de GitHub (Exemple)

1. Créez un nouveau dépôt sur GitHub
2. Copiez l'URL du dépôt
3. Ajoutez-le comme dépôt distant :

```bash
# Ajouter un dépôt distant
git remote add origin https://github.com/yourusername/my-first-git-project.git

# Vérifier le dépôt distant
git remote -v
```

### Utilisation de GitLab ou d'autres services

Le processus est similaire :
```bash
# Exemple GitLab
git remote add origin https://gitlab.com/yourusername/my-first-git-project.git

# Serveur Git auto-hébergé
git remote add origin user@server:/path/to/repo.git
```

## Étape 6 : Pousser vers le dépôt distant (git push)

Poussez vos commits vers le dépôt distant :

```bash
# Pousser vers le dépôt distant
git push -u origin main
```

L'option `-u` configure le suivi entre votre branche locale `main` et la branche distante `main`.

### Comprendre la sortie de push

```
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (7/7), 1.23 KiB | 1.23 MiB/s, done.
Total 7 (delta 0), reused 0 (delta 0)
To https://github.com/yourusername/my-first-git-project.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Pushes futurs

Après le push initial avec `-u`, vous pouvez simplement utiliser :

```bash
git push
```

## Exemple complet de flux de travail

Voici un exemple complet du flux de travail Git :

```bash
# 1. Faire des modifications
echo "print('Hello, Git!')" > new_script.py

# 2. Vérifier l'état
git status

# 3. Préparer les modifications
git add new_script.py

# 4. Valider les modifications
git commit -m "Add new Python script"

# 5. Pousser vers le dépôt distant
git push
```

## Modèles courants de flux de travail Git

### Flux de travail de développement de fonctionnalités
```bash
# Commencer à travailler sur une fonctionnalité
git status
# ... faire des modifications ...
git add .
git commit -m "Implement feature X"
git push
```

### Flux de travail de correction de bug
```bash
# Corriger un bug
git status
# ... corriger le bug ...
git add -u  # Ajouter uniquement les fichiers modifiés
git commit -m "Fix bug in user authentication"
git push
```

### Flux de travail de développement régulier
```bash
# Cycle de développement quotidien
git status
# ... travailler sur le code ...
git add .
git commit -m "Add user profile validation"
# ... plus de travail ...
git add .
git commit -m "Update error handling"
git push
```

## Bonnes pratiques

### 1. Valider souvent
- Faites des commits petits et ciblés
- Validez ensemble les modifications connexes
- N'attendez pas trop longtemps entre les commits

### 2. Écrire de bons messages de commit
- Utilisez le présent ("Add feature" et non "Added feature")
- Gardez la première ligne sous 50 caractères
- Expliquez pourquoi, pas seulement quoi

### 3. Réviser avant de valider
```bash
# Vérifiez toujours ce que vous validez
git status
git diff --staged
```

### 4. Utiliser efficacement la zone de préparation
- Ne préparez que les modifications connexes
- Utilisez `git add -p` pour la préparation partielle de fichiers
- Révisez les modifications préparées avant de les valider

## Résolution des problèmes courants

### Problème : "Nothing to commit"
**Cause** : Aucune modification n'est préparée pour le commit.
**Solution** : Utilisez `git add` pour préparer les modifications d'abord.

### Problème : "Repository not found"
**Cause** : L'URL du dépôt distant est incorrecte.
**Solution** : Vérifiez l'URL distante avec `git remote -v`.

### Problème : "Authentication failed"
**Cause** : Identifiants ou permissions incorrects.
**Solution** : Vérifiez votre nom d'utilisateur/mot de passe ou vos clés SSH.

### Problème : "Uncommitted changes"
**Cause** : Tentative de push avec des modifications non validées.
**Solution** : Validez ou mettez en réserve les modifications d'abord.

## Résumé des commandes utiles

### État et information
```bash
git status          # Vérifier l'état du dépôt
git log             # Voir l'historique des commits
git diff            # Montrer les modifications
git remote -v       # Afficher les dépôts distants
```

### Préparation et validation
```bash
git add <file>      # Préparer un fichier spécifique
git add .           # Préparer tous les fichiers
git commit -m "msg" # Valider avec un message
git commit -a -m "msg" # Préparer et valider les fichiers suivis
```

### Opérations distantes
```bash
git remote add origin <url>  # Ajouter un dépôt distant
git push -u origin main      # Pousser et définir l'upstream
git push                     # Pousser vers le dépôt distant configuré
```

## Résumé

Vous avez appris avec succès le flux de travail Git de base ! Voici ce que vous avez accompli :

1. **Comprendre le flux de travail** : Add → Commit → Push
2. **Préparer les modifications** : Utiliser `git add` pour préparer les commits
3. **Faire des commits** : Créer des instantanés avec `git commit`
4. **Configurer des dépôts distants** : Se connecter à des dépôts externes
5. **Pousser les modifications** : Partager votre travail avec `git push`
6. **Bonnes pratiques** : Écrire de bons messages de commit et organiser le travail

### Commandes clés maîtrisées :
- `git add` - Préparer les modifications pour le commit
- `git commit` - Créer un instantané des modifications préparées
- `git push` - Télécharger les commits vers le dépôt distant
- `git status` - Vérifier l'état actuel du dépôt
- `git log` - Voir l'historique des commits
- `git diff` - Voir les différences entre les versions

### Modèle de flux de travail :
```
Éditer les fichiers → git add → git commit → git push
```

Ce flux de travail de base constitue le fondement de toute utilisation de Git. Que vous travailliez seul ou en équipe, ces commandes seront vos outils quotidiens pour le contrôle de version.

## Prochaines étapes

Maintenant que vous comprenez le flux de travail Git de base, vous êtes prêt à explorer des sujets plus avancés :

1. [Comprendre les branches Git](./understanding-git-branches.md)
<!-- 2. [Créer et changer de branches](./creating-and-switching-branches.md) -->
<!-- 3. [Travailler avec des dépôts distants](./working-with-remote-repositories.md) -->

## Ressources connexes

- [Création de votre premier dépôt Git](./creating-your-first-git-repository.md)
- [Comprendre les bases et la terminologie Git](./understanding-git-basics-and-terminology.md)
- [Installation et configuration de Git](./git-installation-and-setup.md)
- [Tutoriel officiel Git](https://git-scm.com/docs/gittutorial)
- [Livre Pro Git - Les bases de Git](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
