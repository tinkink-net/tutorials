# Comprendre les branches Git

Les branches Git sont l'une des fonctionnalités les plus puissantes du système de contrôle de version Git. Elles vous permettent de diverger de la ligne de développement principale et de travailler sur différentes fonctionnalités, corrections de bugs ou expérimentations sans affecter la base de code principale.

## Que sont les branches Git ?

Une branche dans Git est essentiellement un pointeur mobile vers un commit spécifique. Lorsque vous créez une nouvelle branche, Git crée un nouveau pointeur vers le commit sur lequel vous vous trouvez actuellement. La branche par défaut dans la plupart des dépôts Git s'appelle `main` (ou `master` dans les anciens dépôts).

Pensez aux branches comme des univers parallèles pour votre code - vous pouvez travailler sur différentes fonctionnalités simultanément sans qu'elles interfèrent les unes avec les autres.

## Pourquoi utiliser des branches ?

### 1. **Développement parallèle**
Plusieurs développeurs peuvent travailler sur différentes fonctionnalités simultanément sans conflits.

### 2. **Isolation des fonctionnalités**
Chaque fonctionnalité peut être développée en isolation, ce qui facilite les tests et le débogage.

### 3. **Expérimentation sécurisée**
Vous pouvez expérimenter de nouvelles idées sans risquer de casser la base de code principale.

### 4. **Révision de code**
Les branches permettent des processus de révision de code appropriés via les pull/merge requests.

## Opérations de base sur les branches

### Visualiser les branches

Pour voir toutes les branches de votre dépôt :

```bash
# Lister toutes les branches locales
git branch

# Lister toutes les branches (locales et distantes)
git branch -a

# Lister uniquement les branches distantes
git branch -r
```

La branche actuelle sera mise en évidence avec un astérisque (*).

### Créer une nouvelle branche

Il existe plusieurs façons de créer une nouvelle branche :

```bash
# Créer une nouvelle branche mais rester sur la branche actuelle
git branch feature-login

# Créer et basculer vers une nouvelle branche
git checkout -b feature-login

# Méthode moderne : créer et basculer vers une nouvelle branche
git switch -c feature-login
```

### Basculer entre les branches

```bash
# Basculer vers une branche existante (méthode traditionnelle)
git checkout main

# Basculer vers une branche existante (méthode moderne)
git switch main
```

### Conventions de nommage des branches

Les bons noms de branches sont descriptifs et suivent un modèle cohérent :

```bash
# Branches de fonctionnalités
git branch feature/user-authentication
git branch feature/shopping-cart
git branch feat/add-payment-gateway

# Branches de correction de bugs
git branch bugfix/login-error
git branch fix/navbar-responsive
git branch hotfix/security-patch

# Branches de version
git branch release/v1.2.0
git branch release/2024-01-15
```

## Travailler avec les branches

### Effectuer des modifications sur une branche

1. **Basculer vers votre branche** :
```bash
git switch feature-login
```

2. **Effectuer vos modifications** et les valider :
```bash
# Éditer les fichiers
echo "Login functionality" > login.js

# Mettre en scène les modifications
git add login.js

# Valider les modifications
git commit -m "Add basic login functionality"
```

3. **Pousser la branche vers le distant** :
```bash
# Première poussée d'une nouvelle branche
git push -u origin feature-login

# Poussées suivantes
git push
```

### Suivre les branches distantes

Lors du travail avec des dépôts distants :

```bash
# Récupérer les dernières modifications du distant
git fetch origin

# Créer une branche locale qui suit une branche distante
git checkout -b feature-login origin/feature-login

# Ou utiliser la syntaxe moderne
git switch -c feature-login origin/feature-login
```

## Statut et informations des branches

### Vérifier le statut des branches

```bash
# Afficher la branche actuelle et les modifications non validées
git status

# Afficher l'historique des commits de la branche
git log --oneline

# Afficher les différences entre branches
git diff main..feature-login
```

### Comparer les branches

```bash
# Voir les commits qui sont dans feature-login mais pas dans main
git log main..feature-login

# Voir les différences de fichiers entre branches
git diff main feature-login

# Voir uniquement les noms de fichiers modifiés
git diff --name-only main feature-login
```

## Meilleures pratiques pour la gestion des branches

### 1. **Garder les branches de courte durée**
Créez des branches pour des fonctionnalités ou corrections spécifiques et fusionnez-les rapidement.

### 2. **Mises à jour régulières**
Gardez vos branches de fonctionnalités à jour avec les dernières modifications de main :

```bash
# Basculer vers main et récupérer les dernières modifications
git switch main
git pull origin main

# Retourner à la branche de fonctionnalité et fusionner main
git switch feature-login
git merge main
```

### 3. **Nettoyer les branches**
Supprimez les branches après les avoir fusionnées :

```bash
# Supprimer la branche locale
git branch -d feature-login

# Supprimer la branche distante
git push origin --delete feature-login
```

### 4. **Utiliser des noms descriptifs**
Les noms de branches doivent clairement indiquer à quoi sert la branche.

## Scénarios courants de branches

### Scénario 1 : Développement de fonctionnalité

```bash
# Commencer depuis main
git switch main
git pull origin main

# Créer une branche de fonctionnalité
git switch -c feature/user-profile

# Travailler sur la fonctionnalité
echo "Profile page" > profile.html
git add profile.html
git commit -m "Add user profile page"

# Pousser vers le distant
git push -u origin feature/user-profile
```

### Scénario 2 : Correction de bug

```bash
# Créer une branche de correction de bug depuis main
git switch main
git switch -c bugfix/navbar-mobile

# Corriger le bug
echo "Fixed navbar" > navbar.css
git add navbar.css
git commit -m "Fix navbar responsiveness on mobile"

# Pousser et créer une pull request
git push -u origin bugfix/navbar-mobile
```

### Scénario 3 : Correctif urgent

```bash
# Créer une branche de correctif urgent depuis main
git switch main
git switch -c hotfix/security-patch

# Appliquer le correctif urgent
echo "Security update" > security.js
git add security.js
git commit -m "Apply security patch for user authentication"

# Pousser pour fusion immédiate
git push -u origin hotfix/security-patch
```

## Dépannage des problèmes courants

### Problème : Impossible de basculer entre branches à cause de modifications non validées

```bash
# Option 1 : Mettre temporairement les modifications de côté
git stash
git switch other-branch
git stash pop

# Option 2 : Valider d'abord les modifications
git add .
git commit -m "WIP: temporary commit"
git switch other-branch
```

### Problème : La branche a divergé du distant

```bash
# Poussée forcée (utiliser avec précaution)
git push --force-with-lease

# Ou créer une nouvelle branche
git switch -c feature-login-fixed
git push -u origin feature-login-fixed
```

## Commandes avancées de branches

### Création interactive de branches

```bash
# Créer une branche depuis un commit spécifique
git branch feature-login abc123

# Créer une branche depuis un tag
git branch release-branch v1.0.0

# Créer une branche orpheline (sans historique de commits)
git checkout --orphan gh-pages
```

### Informations sur les branches

```bash
# Afficher le dernier commit de chaque branche
git branch -v

# Afficher les branches fusionnées
git branch --merged main

# Afficher les branches non fusionnées
git branch --no-merged main
```

## Prochaines étapes

Maintenant que vous comprenez les branches Git, vous devriez apprendre :

1. **Fusionner des branches** - Comment combiner les modifications de différentes branches
2. **Résoudre les conflits de fusion** - Gérer les conflits lors de la fusion
3. **Pull Requests** - Flux de travail collaboratif pour la révision de code
4. **Git Rebase** - Alternative à la fusion pour un historique plus propre

## Conclusion

Les branches Git sont essentielles pour tout flux de travail de développement. Elles offrent la flexibilité de travailler sur plusieurs fonctionnalités simultanément tout en gardant la base de code principale stable. Exercez-vous à créer des branches, effectuer des modifications et basculer entre elles pour vous familiariser avec cette puissante fonctionnalité Git.

Rappelez-vous : les branches sont bon marché et rapides dans Git, alors n'hésitez pas à les créer librement pour tout nouveau travail que vous entreprenez !