# Installation et configuration de Git

Git est un système de contrôle de version distribué qui vous aide à suivre les changements dans votre code, à collaborer avec d'autres personnes et à gérer différentes versions de vos projets. Ce tutoriel vous guidera à travers l'installation de Git sur différents systèmes d'exploitation et la configuration initiale.

## Qu'est-ce que Git ?

Git est un puissant système de contrôle de version qui :
- Suit les changements dans vos fichiers au fil du temps
- Vous permet de revenir à des versions précédentes
- Permet la collaboration avec plusieurs développeurs
- Gère différentes versions (branches) de votre projet
- Fonctionne hors ligne et se synchronise lorsqu'il est connecté

## Installation de Git

### Windows

#### Option 1 : Git officiel pour Windows
1. Visitez [git-scm.com](https://git-scm.com/download/win)
2. Téléchargez la dernière version pour Windows
3. Exécutez l'installateur et suivez ces paramètres recommandés :
   - Choisissez "Use Git from the Windows Command Prompt"
   - Sélectionnez "Checkout Windows-style, commit Unix-style line endings"
   - Choisissez "Use Windows' default console window"

#### Option 2 : Utilisation d'un gestionnaire de paquets (Chocolatey)
Si vous avez Chocolatey installé :
```bash
choco install git
```

#### Option 3 : Utilisation d'un gestionnaire de paquets (Scoop)
Si vous avez Scoop installé :
```bash
scoop install git
```

### macOS

#### Option 1 : Utilisation de Homebrew (Recommandé)
```bash
brew install git
```

#### Option 2 : Utilisation de MacPorts
```bash
sudo port install git
```

#### Option 3 : Outils de ligne de commande Xcode
```bash
xcode-select --install
```

#### Option 4 : Installateur officiel
1. Visitez [git-scm.com](https://git-scm.com/download/mac)
2. Téléchargez l'installateur macOS
3. Exécutez l'installateur et suivez les instructions

### Linux

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install git
```

#### CentOS/RHEL/Fedora
```bash
# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

#### Arch Linux
```bash
sudo pacman -S git
```

#### OpenSUSE
```bash
sudo zypper install git
```

## Vérification de l'installation

Après l'installation, vérifiez que Git est correctement installé :

```bash
git --version
```

Vous devriez voir une sortie similaire à :
```
git version 2.39.0
```

## Configuration initiale de Git

Avant d'utiliser Git, vous devez configurer votre identité. Ces informations seront attachées à vos commits.

### Configuration de votre identité

Configurez votre nom et adresse e-mail :

```bash
git config --global user.name "Votre Nom Complet"
git config --global user.email "votre.email@exemple.com"
```

Exemple :
```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@example.com"
```

### Configuration de votre éditeur par défaut

Configurez votre éditeur de texte préféré pour les opérations Git :

```bash
# Pour Visual Studio Code
git config --global core.editor "code --wait"

# Pour Vim
git config --global core.editor "vim"

# Pour Nano
git config --global core.editor "nano"

# Pour Sublime Text
git config --global core.editor "subl -n -w"
```

### Configuration du nom de branche par défaut

Définissez le nom de branche par défaut pour les nouveaux dépôts :

```bash
git config --global init.defaultBranch main
```

### Configuration des fins de ligne

#### Windows
```bash
git config --global core.autocrlf true
```

#### macOS/Linux
```bash
git config --global core.autocrlf input
```

## Options de configuration avancées

### Configuration des alias

Créez des raccourcis pour les commandes Git courantes :

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### Configuration du comportement de push

Définissez le comportement de push par défaut :

```bash
git config --global push.default simple
```

### Configuration du stockage des identifiants

Pour éviter de taper votre mot de passe à plusieurs reprises :

#### Windows
```bash
git config --global credential.helper manager-core
```

#### macOS
```bash
git config --global credential.helper osxkeychain
```

#### Linux
```bash
git config --global credential.helper store
```

## Affichage de votre configuration

Pour voir tous vos paramètres de configuration Git :

```bash
git config --list
```

Pour voir une valeur de configuration spécifique :

```bash
git config user.name
git config user.email
```

Pour voir où un paramètre est défini :

```bash
git config --show-origin user.name
```

## Emplacements des fichiers de configuration

La configuration Git est stockée à trois niveaux :

1. **Système entier** : `/etc/gitconfig` (affecte tous les utilisateurs)
2. **Spécifique à l'utilisateur** : `~/.gitconfig` ou `~/.config/git/config` (affecte l'utilisateur actuel)
3. **Spécifique au dépôt** : `.git/config` (affecte uniquement le dépôt actuel)

Chaque niveau remplace le précédent, donc les paramètres spécifiques au dépôt ont la priorité.

## Configuration de clé SSH (Optionnel mais recommandé)

Pour une authentification sécurisée avec des dépôts distants comme GitHub :

### Générer une clé SSH
```bash
ssh-keygen -t ed25519 -C "votre.email@exemple.com"
```

### Ajouter la clé SSH à l'agent SSH
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Copier la clé publique
```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
xclip -sel clip < ~/.ssh/id_ed25519.pub

# Windows
clip < ~/.ssh/id_ed25519.pub
```

Ensuite, ajoutez cette clé publique à votre compte GitHub/GitLab/Bitbucket.

## Résolution des problèmes courants

### Erreur de permission refusée
Si vous rencontrez des problèmes de permission :
```bash
sudo chown -R $(whoami) ~/.gitconfig
```

### HTTPS vs SSH
Si vous avez des problèmes d'authentification, vous devrez peut-être basculer entre HTTPS et SSH :
```bash
# Vérifier l'URL distante actuelle
git remote -v

# Passer à SSH
git remote set-url origin git@github.com:username/repository.git

# Passer à HTTPS
git remote set-url origin https://github.com/username/repository.git
```

### Problèmes de certificat
Si vous rencontrez des erreurs de certificat SSL :
```bash
git config --global http.sslVerify false
```

**Remarque** : Utilisez ceci uniquement comme solution temporaire et réactivez la vérification SSL par la suite.

## Prochaines étapes

Maintenant que vous avez installé et configuré Git, vous êtes prêt à :
- Créer votre premier dépôt Git
- Apprendre les commandes Git de base
- Commencer à suivre les changements dans vos projets
- Collaborer avec d'autres personnes en utilisant Git

## Résumé

Dans ce tutoriel, vous avez appris à :
- Installer Git sur Windows, macOS et Linux
- Configurer votre identité Git et vos préférences
- Configurer des clés SSH pour une authentification sécurisée
- Résoudre les problèmes d'installation courants
- Comprendre la hiérarchie de configuration de Git

Git est maintenant prêt à vous aider à suivre les changements, collaborer avec d'autres et gérer votre code efficacement. Dans le prochain tutoriel, nous explorerons les bases de Git et la terminologie pour construire votre fondation.