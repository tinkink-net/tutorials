# Utilisation de Docker sur les ordinateurs Mac avec puce Silicon (M1/M2/M3)

<Validator lang="fr" :platform-list="['macOS 13.2.1']" date="2023-03-14" />

## Contexte et difficultés

Apple a officiellement lancé des ordinateurs avec sa propre puce, Apple Silicon, en 2020, et le premier modèle de puce commercialisé avec l'ordinateur était le M1. L'architecture de cette puce est passée de la classique x86 à l'architecture ARM.

Pour résoudre le problème d'incompatibilité logicielle causé par le changement d'architecture CPU, Apple a inclus Rosetta 2 dans MacOS, qui traduit le code des applications. Ce logiciel traduit le code d'architecture x86 en code d'architecture ARM à l'exécution, permettant à la plupart des logiciels de fonctionner sans problème sur MacOS avec les nouvelles puces.

Bien que la plupart des logiciels fonctionnent déjà bien sur les puces Apple Silicon (M1/M2/M3), il existe une catégorie particulière de logiciels qui n'a pas pu fonctionner correctement - les logiciels de virtualisation. Cela inclut des logiciels tels que les machines virtuelles et Docker.

Les logiciels classiques de machine virtuelle comme VirtualBox indiquent explicitement qu'il n'y a pas de plans de support. Et bien que Parallels Desktop le prenne en charge, le prix est prohibitif.

Comme Docker s'appuie en réalité sur un Linux virtualisé comme hôte sur les systèmes non-Linux, il n'y a aucun moyen pour Docker de fonctionner correctement sans une solution solide pour les machines virtuelles.

## Solution officielle

Docker Desktop For Mac propose une version qui fonctionne sur les puces Apple Silicon, et utilise QEMU pour gérer la virtualisation sur différentes architectures. Mais ce n'est plus gratuit pour les entreprises d'une certaine taille. Donc, si vous êtes dans une entreprise un peu plus grande, vous pourriez ne pas choisir d'utiliser Docker Desktop For Mac, et si vous êtes un utilisateur personnel, alors Docker Desktop For Mac reste une très bonne solution.

## Lima

[Lima](https://github.com/lima-vm/lima) est un logiciel libre et gratuit qui utilise également QEMU pour gérer la virtualisation pour différentes architectures. Contrairement à Docker Desktop For Mac, il utilise Containerd au lieu de Docker pour son logiciel de conteneur.

> Containerd est une implémentation de cette norme, et Docker y adhère également. Par conséquent, Containerd et Docker sont presque compatibles dans leur utilisation.

Suivez le tutoriel officiel pour installer lima avec Homebrew et vous êtes prêt à l'utiliser :

```sh
# Installation
brew install lima

# Démarrage
limactl start
```

À ce stade, vous pouvez utiliser ``nerdctl`` pour effectuer diverses opérations avec Containerd.

```sh
lima nerdctl run -d --name nginx -p 80:80 nginx:alpine
```

Comme vous pouvez le voir, l'utilisation de ``lima nerdctl`` est presque identique à ``docker``. En plus d'arrêter le conteneur lorsque vous avez terminé, vous pouvez également arrêter l'environnement virtualisé pour économiser de la mémoire :

```sh
limactl stop
```

lima vous permet également de définir de nombreux détails de virtualisation et de configurer plusieurs environnements virtuels. Plus de détails d'utilisation peuvent être trouvés dans la documentation officielle : <https://github.com/lima-vm/lima>

## Colima

[Colima](https://github.com/abiosoft/colima) est un package basé sur Lima, également un logiciel libre et gratuit, mais il utilise Docker pour son logiciel de conteneur.

Colima est également très simple à installer et à utiliser :

```sh
# Si vous n'avez pas de client docker installé, vous devez d'abord l'installer
brew install docker
# Installer colima
brew install colima
```

Pour l'utiliser, il suffit d'utiliser la commande `colima`.

```sh
colima start
```

Une fois le démarrage terminé, vous pouvez utiliser la commande `docker` normalement, aucune configuration supplémentaire n'est nécessaire.

Vous pouvez également arrêter l'environnement virtualisé lorsque vous avez fini de l'utiliser : ``sh colima start

```sh
colima stop
```

## OrbStack

"OrbStack est un moyen rapide, léger et simple d'exécuter des conteneurs Docker et des machines Linux sur macOS. Vous pouvez le considérer comme un WSL et Docker Desktop surpuissants pour macOS, le tout dans une application facile à utiliser." (Extrait du site officiel.)

OrbStack offre une interface graphique pour gérer les conteneurs Docker et les machines Linux sur macOS. Ainsi qu'une interface en ligne de commande.

Vous pouvez télécharger depuis le site officiel : <https://orbstack.dev/>, ou utiliser Homebrew pour l'installer :

```sh
brew install --cask orbstack
```

```sh
Running `brew update --auto-update`...

...

...

==> Caveats
Open the OrbStack app to finish setup.

==> Downloading https://cdn-updates.orbstack.dev/arm64/OrbStack_v0.5.1_985_arm64.dmg
######################################################################## 100.0%
==> Installing Cask orbstack
==> Moving App 'OrbStack.app' to '/Applications/OrbStack.app'
🍺  orbstack was successfully installed!
```

Il suffit de démarrer OrbStack et vous pouvez utiliser docker maintenant.

![Capture d'écran d'OrbStack](/attachments/mac/how-to-use-docker-on-m1-mac/01.screenshot-orbstack.png)

## Résumé

- Docker n'est pas facile à utiliser pour les appareils Mac avec des puces Apple Silicon
- Docker Desktop For Mac est disponible, mais facture les moyennes et grandes entreprises
- Lima & Colima sont des solutions libres et open source
- OrbStack est une solution avec interface graphique