# Aide-mémoire Tmux

<Validator lang="fr" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-05-01" />

Cette aide-mémoire fournit une référence rapide pour les commandes tmux les plus couramment utilisées. Toutes les commandes nécessitent d'abord d'appuyer sur la touche préfixe (par défaut `Ctrl+b`), suivie de la touche de commande.

## Gestion des Sessions

| Commande | Description |
|---------|-------------|
| `tmux` | Démarrer une nouvelle session tmux |
| `tmux new -s name` | Démarrer une nouvelle session nommée |
| `tmux ls` | Lister toutes les sessions |
| `tmux attach -t name` | Se rattacher à une session nommée |
| `tmux kill-session -t name` | Tuer une session nommée |
| `tmux kill-server` | Tuer toutes les sessions et le serveur tmux |

## Combinaisons de Touches Préfixe

Toutes les commandes suivantes nécessitent d'appuyer d'abord sur la touche préfixe (`Ctrl+b` par défaut) :

### Commandes de Session
| Touche | Description |
|-----|-------------|
| `d` | Se détacher de la session courante |
| `s` | Lister les sessions |
| `$` | Renommer la session |
| `(` | Passer à la session précédente |
| `)` | Passer à la session suivante |

### Commandes de Fenêtre
| Touche | Description |
|-----|-------------|
| `c` | Créer une nouvelle fenêtre |
| `n` | Fenêtre suivante |
| `p` | Fenêtre précédente |
| `w` | Lister les fenêtres |
| `,` | Renommer la fenêtre courante |
| `&` | Fermer la fenêtre courante |
| `0-9` | Passer à la fenêtre numéro |

### Commandes de Panneau
| Touche | Description |
|-----|-------------|
| `%` | Diviser le panneau verticalement |
| `"` | Diviser le panneau horizontalement |
| `o` | Passer au panneau suivant |
| `;` | Passer au dernier panneau actif |
| `x` | Fermer le panneau courant |
| `z` | Basculer le zoom du panneau |
| `{` | Déplacer le panneau courant vers la gauche |
| `}` | Déplacer le panneau courant vers la droite |
| `space` | Basculer entre les dispositions de panneaux |
| `q` | Afficher les numéros de panneau |
| `Up/Down/Left/Right` | Passer au panneau dans la direction spécifiée (avec mode souris) |

### Mode Copie
| Touche | Description |
|-----|-------------|
| `[` | Entrer en mode copie |
| `]` | Coller le texte copié |
| `PgUp/PgDn` | Page précédente/suivante en mode copie |
| `/` | Rechercher en avant |
| `?` | Rechercher en arrière |

## Gestion Avancée des Panneaux

| Commande | Description |
|---------|-------------|
| `Ctrl+b Ctrl+o` | Faire pivoter les panneaux vers l'avant |
| `Ctrl+b !` | Convertir le panneau en fenêtre |
| `Ctrl+b Ctrl+Left/Right/Up/Down` | Redimensionner le panneau |
| `Ctrl+b Alt+1` | Distribuer uniformément les panneaux |
| `Ctrl+b q` | Afficher les numéros de panneau (temporairement) |

## Navigation en Mode Copie (Style Vim)

En mode copie (`Ctrl+b [`), vous pouvez utiliser la navigation de style vim :

| Touche | Description |
|-----|-------------|
| `h/j/k/l` | Déplacer à gauche/bas/haut/droite |
| `w/W` | Déplacer au mot suivant/début du mot suivant |
| `b/B` | Déplacer au mot précédent/début du mot précédent |
| `0/^` | Déplacer au début de la ligne |
| `$` | Déplacer à la fin de la ligne |
| `H/M/L` | Déplacer en haut/milieu/bas de l'écran |
| `gg/G` | Déplacer en haut/bas du tampon |
| `Ctrl+u/d` | Déplacer d'une demi-page vers le haut/bas |
| `Ctrl+b/f` | Déplacer d'une page vers le haut/bas |

## Opérations en Mode Copie

| Touche | Description |
|-----|-------------|
| `Space` | Commencer la sélection |
| `Enter` | Copier la sélection |
| `Esc` | Effacer la sélection |
| `v` | Commencer la sélection en mode caractère |
| `V` | Commencer la sélection en mode ligne |
| `Ctrl+v` | Commencer la sélection en mode bloc |

## Conseils de Personnalisation

### Changer la Touche Préfixe
Pour changer la touche préfixe de `Ctrl+b` à `Ctrl+a` (comme GNU Screen), ajoutez ceci à `~/.tmux.conf` :
```bash
unbind C-b
set -g prefix C-a
bind C-a send-prefix
```

### Activer le Support de la Souris
```bash
set -g mouse on
```

### Recharger la Configuration
Après avoir modifié `~/.tmux.conf` :
```sh
Ctrl+b : source-file ~/.tmux.conf
```

## Personnalisation de la Barre d'État

Personnalisations courantes de la barre d'état pour `~/.tmux.conf` :

```bash
# Change status bar colors
set -g status-style bg=blue,fg=white

# Show system stats
set -g status-right "#[fg=white,bg=black] #H #[fg=white,bg=blue] %H:%M %d-%b-%y "

# Show window list with better formatting
set -g status-justify centre
setw -g window-status-format "#I:#W#F"
setw -g window-status-current-format "#I:#W#F"
```

## Résumé de Référence Rapide

- **Touche préfixe** : `Ctrl+b` (par défaut)
- **Créer une session** : `tmux new -s nom_session`
- **Se détacher** : `Ctrl+b d`
- **Se rattacher** : `tmux attach -t nom_session`
- **Nouvelle fenêtre** : `Ctrl+b c`
- **Diviser le panneau** : `Ctrl+b %` (vertical) ou `Ctrl+b "` (horizontal)
- **Changer de panneau** : `Ctrl+b o` ou touches fléchées (avec mode souris)
- **Mode copie** : `Ctrl+b [`
- **Coller** : `Ctrl+b ]`

Cette aide-mémoire couvre les commandes tmux les plus essentielles. Avec celles-ci, vous serez en mesure de gérer efficacement plusieurs sessions de terminal et flux de travail.