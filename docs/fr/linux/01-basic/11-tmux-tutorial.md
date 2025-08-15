# Tutoriel Tmux : Multiplexeur de Terminal pour Linux

Tmux (Terminal Multiplexer) est un outil puissant qui vous permet de gérer plusieurs sessions de terminal dans une seule fenêtre. Il est particulièrement utile pour exécuter des processus longs, organiser votre flux de travail et maintenir des sessions qui persistent même après vous être déconnecté d'un serveur.

## Qu'est-ce que Tmux ?

Tmux est un multiplexeur de terminal, ce qui signifie qu'il vous permet d'exécuter plusieurs sessions de terminal dans une seule fenêtre de terminal. Considérez-le comme un gestionnaire de fenêtres pour votre terminal - il vous permet de créer, d'accéder et de contrôler plusieurs sessions de terminal, chacune avec plusieurs fenêtres et panneaux.

Le concept fondamental de tmux est la séparation du terminal (votre émulateur de terminal comme gnome-terminal, iTerm2, etc.) des sessions qui s'exécutent à l'intérieur. Cette séparation offre des capacités puissantes qui seraient autrement impossibles avec un terminal standard.

## Comment fonctionne Tmux

Tmux fonctionne avec une architecture client-serveur :

1. **Serveur** : Lorsque vous exécutez une commande tmux pour la première fois, un processus serveur tmux démarre en arrière-plan. Ce serveur gère toutes vos sessions, fenêtres et panneaux.

2. **Sessions** : Une session est une instance de tmux qui peut contenir plusieurs fenêtres. Chaque session est indépendante et peut être attachée ou détachée des clients de terminal.

3. **Client** : Lorsque vous exécutez des commandes tmux, vous créez en réalité des connexions client au serveur tmux. Ces clients affichent ce qui se passe dans une session.

Cette architecture est ce qui donne à tmux ses puissantes capacités de persistance. Même si tous les clients se déconnectent, le serveur continue de fonctionner, gardant vos sessions actives.

## Pourquoi utiliser Tmux ?

Tmux offre plusieurs avantages clés qui le rendent inestimable pour le travail en terminal :

### Sessions persistantes
L'une des fonctionnalités les plus puissantes de tmux est la persistance des sessions. Vos sessions continuent de fonctionner même lorsque vous vous déconnectez du terminal. C'est particulièrement précieux lorsque :
- Vous travaillez sur des serveurs distants via SSH
- Vous exécutez des processus longs qui prennent des heures à compléter
- Vous êtes déconnecté de façon inattendue d'une session de terminal

### Gestion des fenêtres et des panneaux
Tmux vous permet d'organiser efficacement votre travail en terminal :
- Créer plusieurs fenêtres dans une seule session (comme des onglets de navigateur)
- Diviser les fenêtres en plusieurs panneaux pour le multitâche
- Redimensionner et réorganiser les panneaux selon vos besoins
- Exécuter plusieurs commandes simultanément dans une disposition structurée

### Productivité améliorée
Tmux améliore considérablement votre flux de travail en terminal :
- Basculer entre différents projets ou tâches sans ouvrir plusieurs fenêtres de terminal
- Maintenir des environnements de travail cohérents entre les sessions de terminal
- Utiliser des raccourcis clavier pour naviguer rapidement entre les fenêtres et les panneaux
- Copier et coller du texte entre les panneaux et les sessions

## Installation de Tmux

Avant d'utiliser tmux, vous devrez l'installer :

### Ubuntu/Debian :
```sh
sudo apt update
sudo apt install tmux
```

### CentOS/RHEL/Fedora :
```sh
# CentOS/RHEL
sudo yum install tmux

# Fedora
sudo dnf install tmux
```

### macOS :
```sh
# Avec Homebrew
brew install tmux
```

## Concepts de base de Tmux

Comprendre la structure hiérarchique de tmux est essentiel pour l'utiliser efficacement :

- **Session** : Le conteneur de niveau supérieur qui peut contenir plusieurs fenêtres. Une session est ce à quoi vous vous attachez et détachez. Chaque session a un nom unique et peut être considérée comme un espace de travail de projet.

- **Fenêtre** : Similaire à un onglet dans un navigateur, une fenêtre existe au sein d'une session et peut contenir un ou plusieurs panneaux. Chaque fenêtre a son propre ensemble de panneaux et peut exécuter différents programmes indépendamment.

- **Panneau** : Une vue de terminal séparée dans une fenêtre. Les panneaux vous permettent d'exécuter plusieurs programmes côte à côte dans la même fenêtre. Vous pouvez diviser les fenêtres horizontalement ou verticalement pour créer des panneaux.

Cette hiérarchie à trois niveaux (Session → Fenêtre → Panneau) fournit un système d'organisation puissant pour votre travail en terminal. Par exemple, vous pourriez avoir une session pour un projet de développement web avec plusieurs fenêtres (une pour le code, une pour les logs, une pour la base de données), chacune avec plusieurs panneaux (éditeur, terminal, sortie).

## Démarrer Tmux

Il existe plusieurs façons de démarrer tmux, selon vos besoins :

### Créer une nouvelle session
Pour démarrer une nouvelle session tmux sans nom :
```sh
tmux
```

Cela ouvrira une nouvelle session tmux avec une barre d'état en bas affichant les informations de session.

### Créer une session nommée
Pour une meilleure organisation, surtout lorsque vous travaillez sur plusieurs projets, créez des sessions nommées :
```sh
tmux new -s nom_session
```

Les sessions nommées facilitent l'identification et la gestion de plusieurs sessions.

### Se connecter à une session existante
Pour vous connecter à une session existante :
```sh
tmux attach -t nom_session
```

Si vous n'avez qu'une seule session, vous pouvez simplement utiliser :
```sh
tmux attach
```

### Comprendre la barre d'état
Lorsque vous démarrez tmux, vous remarquerez une barre d'état au bas du terminal. Cette barre fournit des informations importantes :
- Nom de la session actuelle
- Liste des fenêtres avec la fenêtre active mise en évidence
- Informations système comme l'heure et la date
- Nom d'hôte

La barre d'état est votre principal indicateur visuel de ce qui se passe dans tmux, et elle peut être personnalisée pour afficher des informations supplémentaires.

## Raccourcis clavier de Tmux

Toutes les commandes tmux commencent par une touche préfixe. Par défaut, c'est `Ctrl+b`. Après avoir appuyé sur la touche préfixe, vous pouvez appuyer sur une autre touche pour exécuter une commande.

Par exemple, pour créer une nouvelle fenêtre, vous appuieriez sur `Ctrl+b` suivi de `c`.

### Comprendre le mécanisme de touche préfixe

Le mécanisme de touche préfixe est central au fonctionnement de tmux. Puisque tmux s'exécute à l'intérieur d'un terminal, il a besoin d'un moyen de distinguer entre :
1. Les commandes que vous voulez envoyer aux programmes s'exécutant dans tmux
2. Les commandes que vous voulez envoyer à tmux lui-même

En exigeant une touche préfixe avant les commandes tmux, tmux peut intercepter ces commandes tout en permettant à toutes les autres frappes de passer à vos programmes. C'est pourquoi vous pouvez utiliser vim, emacs ou tout autre programme basé sur terminal normalement à l'intérieur de tmux - tmux ne capture que les combinaisons de touches spécifiques qui commencent par le préfixe.

### Pourquoi Ctrl+b ?

La touche préfixe par défaut `Ctrl+b` a été choisie parce qu'elle est rarement utilisée par d'autres programmes. Cependant, de nombreux utilisateurs la changent en `Ctrl+a` (similaire à GNU Screen) car elle est plus facile à presser d'une seule main.

### Mode commande

Après avoir appuyé sur la touche préfixe, tmux entre en mode commande pendant une brève période (configurable) durant laquelle il attend votre commande. Si vous appuyez sur la mauvaise touche ou changez d'avis, vous pouvez appuyer sur `Esc` ou attendre le délai d'expiration pour revenir au fonctionnement normal.

## Commandes de base de Tmux

### Gestion des sessions
- `tmux new -s nom_session` - Créer une nouvelle session avec un nom spécifique
- `tmux ls` - Lister toutes les sessions
- `tmux attach -t nom_session` - Se connecter à une session existante
- `tmux kill-session -t nom_session` - Tuer une session spécifique

### Dans une session Tmux
- `Ctrl+b d` - Se détacher de la session actuelle
- `Ctrl+b $` - Renommer la session actuelle
- `Ctrl+b s` - Lister toutes les sessions et basculer entre elles

### Gestion des fenêtres
- `Ctrl+b c` - Créer une nouvelle fenêtre
- `Ctrl+b n` - Passer à la fenêtre suivante
- `Ctrl+b p` - Passer à la fenêtre précédente
- `Ctrl+b w` - Lister toutes les fenêtres et en sélectionner une
- `Ctrl+b ,` - Renommer la fenêtre actuelle
- `Ctrl+b &` - Fermer la fenêtre actuelle

### Gestion des panneaux
- `Ctrl+b %` - Diviser le panneau actuel verticalement
- `Ctrl+b "` - Diviser le panneau actuel horizontalement
- `Ctrl+b o` - Basculer entre les panneaux
- `Ctrl+b ;` - Basculer vers le dernier panneau actif
- `Ctrl+b x` - Fermer le panneau actuel
- `Ctrl+b z` - Basculer le zoom du panneau (maximiser/minimiser)
- `Ctrl+b {` - Déplacer le panneau actuel vers la gauche
- `Ctrl+b }` - Déplacer le panneau actuel vers la droite

### Mode copie
- `Ctrl+b [` - Entrer en mode copie
- Touches fléchées ou navigation de style vim (h,j,k,l) pour se déplacer
- `Espace` - Commencer la sélection
- `Entrée` - Copier la sélection
- `Ctrl+b ]` - Coller le texte copié

## Exemples pratiques

### Exemple 1 : Exécuter un processus long
L'un des cas d'utilisation les plus courants de tmux est l'exécution de processus longs qui doivent continuer même si vous vous déconnectez du terminal.

1. Démarrer une nouvelle session tmux nommée :
   ```sh
   tmux new -s processus_long
   ```
   
   Créer une session nommée la rend plus facile à identifier plus tard.

2. Exécuter votre processus long (par exemple, une sauvegarde) :
   ```sh
   tar -czf backup.tar.gz /home/user/data
   ```
   
   Ce processus s'exécutera à l'intérieur de la session tmux.

3. Si vous devez vous déconnecter :
   Appuyez sur `Ctrl+b` puis `d` pour vous détacher de la session.
   
   Se détacher n'arrête pas le processus - il continue de s'exécuter en arrière-plan. C'est le mécanisme clé qui permet la persistance.

4. Plus tard, se reconnecter pour vérifier le processus :
   ```sh
   tmux attach -t processus_long
   ```
   
   Lorsque vous vous reconnectez, vous verrez l'état actuel de votre processus exactement comme il était lorsque vous êtes parti.

### Exemple 2 : Organiser votre travail de développement
Tmux excelle dans l'organisation de flux de travail complexes avec plusieurs tâches connexes.

1. Démarrer une nouvelle session pour votre projet :
   ```sh
   tmux new -s projet
   ```
   
   Cela crée un espace de travail dédié à votre projet.

2. Créer des fenêtres pour différentes tâches :
   - Appuyez sur `Ctrl+b c` pour créer une fenêtre pour le codage
   - Appuyez à nouveau sur `Ctrl+b c` pour créer une fenêtre pour les logs
   - Appuyez à nouveau sur `Ctrl+b c` pour créer une fenêtre pour la documentation
   
   Chaque fenêtre est comme un onglet, isolant différents aspects de votre travail.

3. Dans une fenêtre, divisez les panneaux pour le multitâche :
   - Appuyez sur `Ctrl+b %` pour diviser verticalement pour l'éditeur et le terminal
   - Appuyez sur `Ctrl+b "` pour diviser horizontalement pour la sortie
   
   Les panneaux vous permettent de voir simultanément plusieurs vues connexes.

4. Naviguer dans votre espace de travail organisé :
   - Utilisez `Ctrl+b n` et `Ctrl+b p` pour basculer entre les fenêtres
   - Utilisez `Ctrl+b o` pour parcourir les panneaux dans la fenêtre actuelle
   - Utilisez `Ctrl+b w` pour voir une liste visuelle de toutes les fenêtres

Cette organisation vous permet de maintenir un environnement de travail cohérent pour chaque projet. Lorsque vous revenez à votre session "projet", tout est exactement comme vous l'avez laissé.

### Exemple 3 : Session collaborative
Plusieurs utilisateurs peuvent se connecter à la même session tmux, permettant un travail collaboratif :

1. L'utilisateur 1 crée une session :
   ```sh
   tmux new -s collaboration
   ```

2. L'utilisateur 2 (connecté au même système) se connecte à la même session :
   ```sh
   tmux attach -t collaboration
   ```
   
Les deux utilisateurs verront le même terminal, et les actions d'un utilisateur seront visibles pour l'autre. C'est possible parce que l'architecture client-serveur de tmux permet à plusieurs clients de se connecter à la même session.

## Personnalisation de Tmux

Tmux est hautement personnalisable via son fichier de configuration `~/.tmux.conf`. Ce fichier est lu au démarrage de tmux et vous permet de modifier les raccourcis clavier, l'apparence, le comportement, et plus encore.

### Comprendre la configuration de tmux

Le fichier de configuration tmux utilise une syntaxe simple où chaque ligne est une commande. Les commentaires commencent par `#`. Voici un exemple de base avec des explications :

```bash
# Définir la touche préfixe à Ctrl+a (comme screen)
# C'est souvent préféré car c'est plus facile à presser d'une seule main
unbind C-b          # Supprimer la liaison de touche préfixe par défaut
set -g prefix C-a   # Définir Ctrl+a comme nouvelle touche préfixe
bind C-a send-prefix # Permettre à Ctrl+a Ctrl+a de passer aux programmes

# Activer la prise en charge de la souris
# Avec ceci activé, vous pouvez cliquer pour sélectionner des panneaux, redimensionner des panneaux et faire défiler
set -g mouse on

# Définir le style de la barre d'état
# Personnaliser l'apparence de la barre d'état en bas
set -g status-style bg=black,fg=white

# Activer la prise en charge des 256 couleurs
# Cela garantit que les programmes à l'intérieur de tmux peuvent afficher correctement les couleurs
set -g default-terminal "screen-256color"

# Augmenter le tampon de défilement
# Cela vous permet de faire défiler vers le haut et de voir plus d'historique dans chaque panneau
set -g history-limit 10000

# Réassigner le changement de panneau pour utiliser les touches de style vim
# Cela rend la navigation plus intuitive pour les utilisateurs de vim
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R
```

### Appliquer les changements de configuration

Après avoir créé ou modifié `~/.tmux.conf`, vous avez deux options :

1. Redémarrer tmux (ce qui mettra fin à vos sessions)
2. Recharger la configuration dans votre session tmux existante :
   ```sh
   tmux source-file ~/.tmux.conf
   ```

La deuxième option est préférable car elle applique les changements sans perturber votre travail. Vous pouvez même lier une touche pour le faire automatiquement :
```bash
# Recharger la configuration avec préfixe + r
bind r source-file ~/.tmux.conf
```

### Portée de la configuration

Remarquez le drapeau `-g` dans de nombreuses commandes de configuration. Cela signifie "global" et signifie que le paramètre s'applique à toutes les sessions, fenêtres et panneaux. Sans `-g`, les paramètres ne s'appliquent qu'à la session actuelle.

Les options de configuration peuvent être définies à différents niveaux :
- Global (avec `-g`) : S'applique partout
- Session : S'applique à une session
- Fenêtre : S'applique à une fenêtre
- Panneau : S'applique à un panneau

## Résumé

Tmux est un outil incroyablement puissant pour gérer les sessions de terminal qui fonctionne sur une architecture client-serveur, offrant la persistance des sessions, la gestion des fenêtres et l'organisation des panneaux.

### Mécanismes clés

1. **Architecture client-serveur** : Tmux s'exécute comme un processus serveur qui gère les sessions indépendamment des clients de terminal, permettant des sessions persistantes qui survivent aux déconnexions.

2. **Organisation hiérarchique** : La structure à trois niveaux (Session → Fenêtre → Panneau) fournit une organisation puissante pour les flux de travail complexes.

3. **Système de touche préfixe** : Le mécanisme de touche préfixe permet à tmux d'intercepter les commandes tout en transmettant toutes les autres frappes aux programmes s'exécutant à l'intérieur.

4. **Détachement et rattachement** : La capacité de se détacher des sessions sans arrêter les processus est ce qui rend tmux inestimable pour le travail à distance et les tâches de longue durée.

### Avantages

- **Persistance** : Ne perdez jamais votre travail en raison de problèmes de réseau ou de fermetures de terminal
- **Organisation** : Structurez des flux de travail complexes avec des fenêtres et des panneaux
- **Collaboration** : Plusieurs utilisateurs peuvent voir et interagir avec la même session
- **Efficacité des ressources** : Exécutez plusieurs terminaux dans une seule fenêtre de terminal
- **Productivité** : Naviguez rapidement entre les tâches avec des raccourcis clavier

Avec de la pratique, tmux peut améliorer considérablement votre productivité lorsque vous travaillez dans des environnements de terminal. La courbe d'apprentissage initiale est rapidement récompensée par les gains d'efficacité de la gestion de flux de travail complexes en terminal avec facilité.