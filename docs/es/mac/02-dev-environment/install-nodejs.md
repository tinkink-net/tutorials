# Cómo Instalar Node.js en macOS

<Validator lang="es" :platform-list="['macOS 14.2.1']" date="2024-01-11" />

Node.js es un entorno de ejecución de JavaScript construido sobre el motor V8 de JavaScript de Chrome. Utiliza un modelo de E/S sin bloqueo y orientado a eventos que lo hace ligero y eficiente.

Hay muchos casos de uso para Node.js, como construir herramientas de línea de comandos, aplicaciones web e incluso aplicaciones de escritorio. También puedes instalar muchas herramientas cli con npm incluso si no usas Node.js.

## Opción 1: Instalar Node.js a través del Instalador Oficial

El instalador oficial de Node.js está disponible en [https://nodejs.org/](https://nodejs.org/). Puedes descargar el instalador desde el sitio web e instalarlo.

![Sitio Web Oficial](/attachments/mac/install-nodejs/01.official-website.png)

Hay dos versiones principales de Node.js: LTS y Current. LTS es la versión de soporte a largo plazo, que es más estable, la versión siempre es par. Current es la última versión, que es más avanzada. Para la mayoría de los usuarios, se recomienda instalar la versión LTS.

![Instalador de Node.js](/attachments/mac/install-nodejs/02.nodejs-installer.png)

Luego puedes usar el comando `node` en la terminal.

## Opción 2: Instalar Node.js a través de Homebrew

[Homebrew](https://brew.sh/) es un gestor de paquetes para macOS. Puedes instalar Node.js con Homebrew.

```sh
brew install node
```

Luego puedes usar el comando `node` en la terminal.

## Opción 3: Instalar Node.js a través de fnm

Instalar node.js a través del instalador oficial o Homebrew instalará Node.js globalmente, pero solo puedes instalar una versión de Node.js. Si quieres instalar múltiples versiones de Node.js, puedes usar un gestor de versiones.

[fnm](https://github.com/Schniz/fnm) es un gestor de versiones de Node.js rápido y simple, construido en Rust.

Puedes instalar fnm con Homebrew:

```sh
brew install fnm
```

o instalarlo con curl:

```sh
curl -fsSL https://fnm.vercel.app/install | bash
```

Luego puedes instalar Node.js con fnm:

```sh
fnm install 20
```

También puedes instalar múltiples versiones de Node.js con fnm:

```sh
fnm install 20
fnm install 16
fnm install 14
```

Luego puedes usar el comando `fnm use` para cambiar entre diferentes versiones de Node.js:

```sh
fnm use 20
```

También puedes usar el comando `fnm default` para establecer la versión predeterminada de Node.js:

```sh
fnm default 20
```

Si estás trabajando en un proyecto, también puedes usar el archivo `.node-version` para especificar la versión de Node.js:

```sh
echo "20" > .node-version
# instalar la versión de Node.js especificada en el archivo .node-version
fnm install
# usar la versión de Node.js especificada en el archivo .node-version
fnm use
```

## Resumen

Hay muchas formas de instalar Node.js en macOS. Puedes elegir el método que mejor se adapte a ti. Para los desarrolladores, se recomienda usar fnm para instalar Node.js, que es más flexible.