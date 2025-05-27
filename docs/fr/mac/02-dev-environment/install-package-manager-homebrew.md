# Comment installer le gestionnaire de paquets Homebrew

[Homebrew](https://brew.sh/) est un gestionnaire de paquets pour macOS. Alors qu'est-ce qu'un gestionnaire de paquets ? Un gestionnaire de paquets est un outil qui vous permet d'installer facilement des paquets logiciels depuis la ligne de commande. C'est similaire à l'App Store sur macOS, mais c'est un outil en ligne de commande, et il dispose de plus de paquets logiciels que l'App Store.

Nous pouvons utiliser Homebrew pour installer de nombreux paquets logiciels courants, tels que Node.js, Git, Nginx, etc. Dans ce tutoriel, nous allons apprendre comment installer Homebrew sur macOS.

## Installer Homebrew

Le site officiel de Homebrew est [brew.sh](https://brew.sh/). Vous pouvez visiter le site officiel pour en savoir plus sur Homebrew.

Avant d'installer Homebrew, vous devez installer les outils de ligne de commande Xcode. Vous pouvez installer les outils de ligne de commande Xcode en exécutant la commande suivante dans le terminal :

```sh
xcode-select --install
```

Si vous avez déjà installé les outils de ligne de commande Xcode, vous pouvez installer Homebrew en exécutant la commande suivante dans le terminal :

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Si tout se passe bien, vous verrez la sortie suivante :

```sh
==> Next steps:
- Run `brew help` to get started
- Further documentation:
    https://docs.brew.sh
```

Ensuite, vous pourrez utiliser la commande `brew` dans le terminal.

## Installation via miroir

Si vous êtes en Chine, vous pouvez installer Homebrew via un miroir. Vous pouvez exécuter la commande suivante dans le terminal :

```sh
git clone --depth=1 https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.git brew-install
/bin/bash brew-install/install.sh
rm -rf brew-install
```

Le code ci-dessus installera Homebrew via le miroir de l'Université Tsinghua. Si vous avez d'autres sites miroirs que vous préférez, vous pouvez remplacer le site miroir de l'Université Tsinghua par d'autres sites miroirs.

Si vous avez besoin d'un site miroir pour installer Homebrew, vous pourriez également avoir besoin d'utiliser un site miroir pour installer d'autres paquets logiciels. Vous pouvez utiliser la commande suivante pour définir le site miroir :

```sh
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
```

Vous pouvez ajouter le code ci-dessus au fichier `.bashrc` ou au fichier `.zshrc` ou ailleurs.

## Utilisation

Vous pouvez utiliser la commande `brew` pour installer des paquets logiciels. Par exemple, vous pouvez utiliser la commande suivante pour installer Node.js :

```sh
brew install node
```

> Nous avons un autre tutoriel sur l'installation de Node.js. Vous pouvez le lire [ici](/fr/mac/install-nodejs.html).

Vous pouvez utiliser la commande `brew uninstall` pour désinstaller un paquet logiciel :

```sh
brew uninstall node
```

Homebrew Cask est une extension de Homebrew qui vous permet d'installer des fichiers binaires plus volumineux. Par exemple, vous pouvez utiliser la commande suivante pour installer Google Chrome :

```sh
brew install --cask google-chrome
```

D'autres commandes peuvent être trouvées dans la [documentation](https://docs.brew.sh/).

## Désinstaller Homebrew

Si vous souhaitez désinstaller Homebrew, vous pouvez exécuter la commande suivante dans le terminal :

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

## Conclusion

Dans ce tutoriel, nous avons appris comment installer Homebrew sur macOS. Vous disposez maintenant du gestionnaire de paquets le plus populaire sur macOS. Vous pouvez l'utiliser pour installer de nombreux paquets logiciels.

Profitez-en !