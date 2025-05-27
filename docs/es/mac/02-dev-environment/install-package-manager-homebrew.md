# Cómo Instalar el Gestor de Paquetes Homebrew

[Homebrew](https://brew.sh/) es un gestor de paquetes para macOS. Entonces, ¿qué es un gestor de paquetes? Un gestor de paquetes es una herramienta que te permite instalar paquetes de software fácilmente desde la línea de comandos. Es similar a la App Store en macOS, pero es una herramienta de línea de comandos, y tiene más paquetes de software que la App Store.

Podemos usar Homebrew para instalar muchos paquetes de software comunes, como Node.js, Git, Nginx, etc. En este tutorial, aprenderemos cómo instalar Homebrew en macOS.

## Instalar Homebrew

El sitio web oficial de Homebrew es [brew.sh](https://brew.sh/). Puedes visitar el sitio web oficial para aprender más sobre Homebrew.

Antes de instalar Homebrew, necesitas instalar las herramientas de línea de comandos de Xcode. Puedes instalar las herramientas de línea de comandos de Xcode ejecutando el siguiente comando en la terminal:

```sh
xcode-select --install
```

Si ya has instalado las herramientas de línea de comandos de Xcode, puedes instalar Homebrew ejecutando el siguiente comando en la terminal:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Si todo va bien, verás la siguiente salida:

```sh
==> Next steps:
- Run `brew help` to get started
- Further documentation:
    https://docs.brew.sh
```

Entonces podrás usar el comando `brew` en la terminal.

## Instalar a través de un Espejo

Si estás en China, puedes instalar Homebrew a través de un espejo. Puedes ejecutar el siguiente comando en la terminal:

```sh
git clone --depth=1 https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.git brew-install
/bin/bash brew-install/install.sh
rm -rf brew-install
```

El código anterior instalará Homebrew a través del espejo de la Universidad de Tsinghua. Si tienes otros sitios espejo que te gusten, puedes reemplazar el sitio espejo de la Universidad de Tsinghua con otros sitios espejo.

Si necesitas un sitio espejo para instalar Homebrew, es posible que también necesites usar un sitio espejo para instalar otros paquetes de software. Puedes usar el siguiente comando para configurar el sitio espejo:

```sh
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
```

Puedes añadir el código anterior al archivo `.bashrc` o al archivo `.zshrc` o en algún otro lugar.

## Uso

Puedes usar el comando `brew` para instalar paquetes de software. Por ejemplo, puedes usar el siguiente comando para instalar Node.js:

```sh
brew install node
```

> Tenemos otro tutorial sobre cómo instalar Node.js. Puedes leerlo [aquí](/es/mac/install-nodejs.html).

Puedes usar el comando `brew uninstall` para desinstalar un paquete de software:

```sh
brew uninstall node
```

Homebrew Cask es una extensión de Homebrew que te permite instalar archivos binarios más grandes. Por ejemplo, puedes usar el siguiente comando para instalar Google Chrome:

```sh
brew install --cask google-chrome
```

Otros comandos se pueden encontrar en la [documentación](https://docs.brew.sh/).

## Desinstalar Homebrew

Si quieres desinstalar Homebrew, puedes ejecutar el siguiente comando en la terminal:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

## Conclusión

En este tutorial, aprendimos cómo instalar Homebrew en macOS. Ahora tienes el gestor de paquetes más popular en macOS. Puedes usarlo para instalar muchos paquetes de software.

¡Disfrútalo!