# Comment installer Node.js sur macOS

<Validator lang="fr" :platform-list="['macOS 14.2.1']" date="2024-01-11" />

Node.js est un environnement d'exécution JavaScript construit sur le moteur JavaScript V8 de Chrome. Il utilise un modèle d'E/S non bloquant et piloté par les événements qui le rend léger et efficace.

Il existe de nombreux cas d'utilisation pour Node.js, comme la création d'outils en ligne de commande, d'applications web, et même d'applications de bureau. Vous pouvez également installer de nombreux outils cli avec npm même si vous n'utilisez pas Node.js.

## Option 1 : Installer Node.js via l'installateur officiel

L'installateur officiel de Node.js est disponible sur [https://nodejs.org/](https://nodejs.org/). Vous pouvez télécharger l'installateur depuis le site web et l'installer.

![Site officiel](/attachments/mac/install-nodejs/01.official-website.png)

Il existe deux versions principales de Node.js : LTS et Current. LTS est la version à support à long terme, qui est plus stable, la version est toujours paire. Current est la dernière version, qui est plus avancée. Pour la plupart des utilisateurs, il est recommandé d'installer la version LTS.

![Installateur Node.js](/attachments/mac/install-nodejs/02.nodejs-installer.png)

Ensuite, vous pouvez utiliser la commande `node` dans le terminal.

## Option 2 : Installer Node.js via Homebrew

[Homebrew](https://brew.sh/) est un gestionnaire de paquets pour macOS. Vous pouvez installer Node.js avec Homebrew.

```sh
brew install node
```

Ensuite, vous pouvez utiliser la commande `node` dans le terminal.

## Option 3 : Installer Node.js via fnm

Installer Node.js via l'installateur officiel ou Homebrew installera Node.js globalement, mais vous ne pourrez installer qu'une seule version de Node.js. Si vous souhaitez installer plusieurs versions de Node.js, vous pouvez utiliser un gestionnaire de versions.

[fnm](https://github.com/Schniz/fnm) est un gestionnaire de versions Node.js rapide et simple, construit en Rust.

Vous pouvez installer fnm avec Homebrew :

```sh
brew install fnm
```

ou l'installer avec curl :

```sh
curl -fsSL https://fnm.vercel.app/install | bash
```

Ensuite, vous pouvez installer Node.js avec fnm :

```sh
fnm install 20
```

Vous pouvez également installer plusieurs versions de Node.js avec fnm :

```sh
fnm install 20
fnm install 16
fnm install 14
```

Ensuite, vous pouvez utiliser la commande `fnm use` pour basculer entre différentes versions de Node.js :

```sh
fnm use 20
```

Vous pouvez également utiliser la commande `fnm default` pour définir la version par défaut de Node.js :

```sh
fnm default 20
```

Si vous travaillez sur un projet, vous pouvez également utiliser le fichier `.node-version` pour spécifier la version de Node.js :

```sh
echo "20" > .node-version
# installer la version de Node.js spécifiée dans le fichier .node-version
fnm install
# utiliser la version de Node.js spécifiée dans le fichier .node-version
fnm use
```

## Résumé

Il existe de nombreuses façons d'installer Node.js sur macOS. Vous pouvez choisir la méthode qui vous convient le mieux. Pour les développeurs, il est recommandé d'utiliser fnm pour installer Node.js, ce qui est plus flexible.