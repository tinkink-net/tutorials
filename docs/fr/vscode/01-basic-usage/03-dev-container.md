# Profitez de la fonctionnalité Dev Container dans VS Code

## Qu'est-ce qu'un Container ?

> Si vous êtes familier avec les containers ou Docker, vous pouvez passer cette section.

Un container est une unité légère, portable et autonome qui peut exécuter des logiciels dans un environnement isolé.

Il regroupe le code de l'application avec ses dépendances, bibliothèques et fichiers de configuration, garantissant qu'il s'exécute de manière cohérente dans différents environnements informatiques.

Les containers sont construits sur des technologies de conteneurisation comme Docker, qui permettent aux développeurs de créer, déployer et gérer facilement des applications.

> Le terme "container" est souvent utilisé de manière interchangeable avec "container Docker", car Docker est la plateforme de conteneurisation la plus populaire.

## Qu'est-ce qu'un Dev Container ?

Un Dev Container est un type spécial de container spécifiquement conçu pour les besoins de développement. Il fournit un environnement cohérent et isolé pour les développeurs, garantissant que l'application se comporte de la même manière quel que soit l'endroit où elle est exécutée.

Il peut résoudre de nombreux problèmes courants de développement, tels que les conflits de dépendances, les incohérences d'environnement et les incompatibilités de versions. En utilisant un Dev Container, les développeurs peuvent s'assurer que leur environnement de développement est reproductible et cohérent, facilitant ainsi la collaboration avec d'autres et évitant les problèmes du type "ça marche sur ma machine".

## Avantages de l'utilisation des Dev Containers

L'utilisation des Dev Containers dans votre flux de travail de développement offre plusieurs avantages :

1. **Environnement de développement cohérent** : Tout le monde dans l'équipe travaille avec exactement le même environnement, éliminant les problèmes du type "ça marche sur ma machine".

2. **Isolation** : Votre environnement de développement est isolé de votre système local, évitant les conflits entre différents projets ou versions de dépendances.

3. **Intégration facile** : Les nouveaux membres de l'équipe peuvent démarrer rapidement sans passer du temps à configurer leur environnement local.

4. **Builds reproductibles** : L'environnement de développement est défini comme du code, le rendant reproductible sur différentes machines.

5. **Machine locale propre** : Gardez votre machine locale propre car toutes les dépendances spécifiques au projet sont contenues dans le container.

## Prérequis pour utiliser les Dev Containers

Avant de commencer à utiliser les Dev Containers dans VS Code, vous devez vous assurer que vous avez installé les prérequis suivants :

**Docker**

Les Dev Containers s'appuient sur Docker pour créer et gérer les environnements de container. Vous devez installer Docker avant d'utiliser les Dev Containers.

> Vous pouvez choisir Docker Desktop (sur Windows et macOS) ou Docker Engine (sur Linux) depuis [le site officiel de Docker](https://www.docker.com/products/docker-desktop/). Vous pouvez également utiliser des outils Docker tiers comme OrbStack, consultez [Utiliser Docker sur les Mac avec puce Silicon (M1/M2/M3)](/fr/mac/how-to-use-docker-on-m1-mac.html) pour plus de détails.


**VS Code**

Assurez-vous d'avoir installé la dernière version de Visual Studio Code. Vous pouvez la télécharger depuis [code.visualstudio.com](https://code.visualstudio.com/).


**Extension Dev Containers**

Installez l'extension Dev Containers depuis le VS Code Marketplace.

![Installer l'extension Dev Containers](/attachments/vscode/dev-container/01-extension.png)

## Comment utiliser les Dev Containers dans VS Code : Un guide étape par étape

Pour utiliser les Dev Containers dans Visual Studio Code, ouvrez d'abord votre projet, puis suivez ces étapes :

**Ajouter la configuration Dev Container** :

Ouvrez la Palette de commandes (`Ctrl`+`Shift`+`P` ou `Cmd`+`Shift`+`P` sur macOS) et tapez "Dev Containers: Add Development Container Configuration Files...", puis choisissez "Add configuration to workspace".

![Ajouter la configuration Dev Container](/attachments/vscode/dev-container/02-add-config.png)

Sélectionnez une configuration Dev Container prédéfinie dans la liste. Par exemple, sélectionnez "Node.js & TypeScript" si vous travaillez sur un projet Node.js.

![Sélectionner la configuration Node.js](/attachments/vscode/dev-container/03-select-nodejs.png)

Ensuite, choisissez la version de l'image et d'autres options en fonction des besoins de votre projet. Si vous n'êtes pas sûr, vous pouvez opter pour les options par défaut.

Après cela, VS Code créera un dossier `.devcontainer` dans votre espace de travail avec un fichier de configuration `devcontainer.json` :

```json
// For format details, see https://aka.ms/devcontainer.json. For config options, see the
// README at: https://github.com/devcontainers/templates/tree/main/src/javascript-node
{
	"name": "Node.js",
	// Or use a Dockerfile or Docker Compose file. More info: https://containers.dev/guide/dockerfile
	"image": "mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm"

	// Features to add to the dev container. More info: https://containers.dev/features.
	// "features": {},

	// Use 'forwardPorts' to make a list of ports inside the container available locally.
	// "forwardPorts": [],

	// Use 'postCreateCommand' to run commands after the container is created.
	// "postCreateCommand": "yarn install",

	// Configure tool-specific properties.
	// "customizations": {},

	// Uncomment to connect as root instead. More info: https://aka.ms/dev-containers-non-root.
	// "remoteUser": "root"
}
```

**Ouvrir votre projet dans le Dev Container** :

Vous pouvez ensuite ouvrir le Dev Container en cliquant sur le bouton "Open a remote window" qui apparaît dans le coin inférieur gauche de la fenêtre VS Code, puis en sélectionnant "Reopen in Container".

![Ouvrir une fenêtre distante](/attachments/vscode/dev-container/04-open-remote-window.png)

![Rouvrir dans le Container](/attachments/vscode/dev-container/05-reopen-in-container.png)

Alternativement, vous pouvez ouvrir la Palette de commandes (`Ctrl`+`Shift`+`P` ou `Cmd`+`Shift`+`P` sur macOS) et taper "Dev Containers: Reopen in Container".

Vous verrez alors une barre de progression indiquant que VS Code est en train de construire l'image Dev Container et de démarrer le container. Vous pouvez cliquer sur le bouton "Show Log" pour voir les logs de construction.

![Progression](/attachments/vscode/dev-container/06-progress.png)

Si tout se passe bien, vous verrez une nouvelle fenêtre VS Code connectée au Dev Container. Avant de pouvoir commencer à travailler, vous devrez peut-être attendre que le container termine son initialisation (téléchargement et installation des dépendances et extensions nécessaires).

![Initialisation du Container](/attachments/vscode/dev-container/07-container-initializing.png)

Une fois que le container est prêt, vous pouvez commencer à travailler sur votre projet à l'intérieur du container.

## Résolution des problèmes courants

Si vous rencontrez des problèmes avec les Dev Containers, essayez ces étapes de dépannage :

1. **Vérifiez que Docker est en cours d'exécution** : Assurez-vous que Docker est installé et en cours d'exécution sur votre machine.
2. **Augmentez l'allocation de ressources** : Si les containers fonctionnent lentement, essayez d'augmenter l'allocation de mémoire et de CPU pour Docker dans les paramètres de Docker Desktop.
3. **Mettez à jour VS Code et les extensions** : Assurez-vous d'utiliser la dernière version de VS Code et de l'extension Dev Containers.
4. **Vérifiez les paramètres réseau** : Si votre container doit accéder à des ressources réseau, assurez-vous que les paramètres du pare-feu ne bloquent pas les connexions.
5. **Consultez les logs** : Utilisez le bouton "Show Log" dans la barre de progression des Dev Containers pour voir les logs détaillés pour le dépannage.

## Conclusion

Les Dev Containers dans VS Code offrent un moyen puissant de créer des environnements de développement cohérents et isolés. En tirant parti de la technologie des containers, vous pouvez vous assurer que votre environnement de développement est reproductible sur différentes machines et éviter les problèmes courants liés à l'environnement.

Que vous travailliez sur un projet personnel ou que vous collaboriez avec une équipe, les Dev Containers peuvent rationaliser votre flux de travail et vous permettre de vous concentrer sur l'écriture de code plutôt que sur la configuration des environnements.
