# How to Install Node.js on macOS

<Validator lang="en" :platform-list="['macOS 14.2.1']" date="2024-01-11" />

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

There are many use cases for Node.js, such as building command line tools, web applications, and even desktop applications. You can also install many cli tools with npm even if you don't use Node.js.

## Option 1: Install Node.js via Official Installer

The official Node.js installer is available at [https://nodejs.org/](https://nodejs.org/). You can download the installer from the website and install it.

![Offcial Website](/attachments/mac/install-nodejs/01.official-website.png)

There are two main versions of Node.js: LTS and Current. LTS is the long-term support version, which is more stable, the version is always even. Current is the latest version, which is more advanced. For most users, it is recommended to install the LTS version.

![Node.js Installer](/attachments/mac/install-nodejs/02.nodejs-installer.png)

Then you can use the `node` command in the terminal.

## Option 2: Install Node.js via Homebrew

[Homebrew](https://brew.sh/) is a package manager for macOS. You can install Node.js with Homebrew.

```sh
brew install node
```

Then you can use the `node` command in the terminal.

## Option 3: Install Node.js via fnm

Install node.js via official installer or Homebrew will install Node.js globally, but you can only install one version of Node.js. If you want to install multiple versions of Node.js, you can use a version manager.

[fnm](https://github.com/Schniz/fnm) is a fast and simple Node.js version manager, built in Rust.

You can install fnm with Homebrew:

```sh
brew install fnm
```

or install it with curl:

```sh
curl -fsSL https://fnm.vercel.app/install | bash
```

Then you can install Node.js with fnm:

```sh
fnm install 20
```

You can also install multiple versions of Node.js with fnm:

```sh
fnm install 20
fnm install 16
fnm install 14
```

Then you can use the `fnm use` command to switch between different versions of Node.js:

```sh
fnm use 20
```

You can also use the `fnm default` command to set the default version of Node.js:

```sh
fnm default 20
```

If you are working on a project, you can also use the `.node-version` file to specify the version of Node.js:

```sh
echo "20" > .node-version
# install the version of Node.js specified in the .node-version file
fnm install
# use the version of Node.js specified in the .node-version file
fnm use
```

## Summary

There are many ways to install Node.js on macOS. You can choose the method that suits you best. For developers, it is recommended to use fnm to install Node.js, which is more flexible.
