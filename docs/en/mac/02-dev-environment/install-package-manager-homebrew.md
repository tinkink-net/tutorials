# How to Install Package Manager Homebrew

[Homebrew](https://brew.sh/) is a package manager for macOS. So what is a package manager? A package manager is a tool that allows you to install software packages easily from the command line. It is similar to the App Store on macOS, but it is a command line tool, and it has more software packages than the App Store.

We can use Homebrew to install many common software packages, such as Node.js, Git, Nginx, etc. In this tutorial, we will learn how to install Homebrew on macOS.

## Install Homebrew

The official website of Homebrew is [brew.sh](https://brew.sh/). You can visit the official website to learn more about Homebrew.

Before installing Homebrew, you need to install the Xcode command line tools. You can install the Xcode command line tools by running the following command in the terminal:

```sh
xcode-select --install
```

If you have installed the Xcode command line tools, you can install Homebrew by running the following command in the terminal:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If everything goes well, you will see the following output:

```sh
==> Next steps:
- Run `brew help` to get started
- Further documentation:
    https://docs.brew.sh
```

Then you can use the `brew` command in the terminal.

## Install via Mirror

If you are in China, you can install Homebrew via mirror. You can run the following command in the terminal:

```sh
git clone --depth=1 https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.git brew-install
/bin/bash brew-install/install.sh
rm -rf brew-install
```

The code above will install Homebrew via the mirror of Tsinghua University. If you have other mirror sites you like, you can replace the mirror site of Tsinghua University with other mirror sites.

If you need a mirror site to install Homebrew, you may also need to use a mirror site to install other software packages. You can use the following command to set the mirror site:

```sh
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
```

You can add the above code to the `.bashrc` file or `.zshrc` file or somewhere else.

## Usage

You can use the `brew` command to install software packages. For example, you can use the following command to install Node.js:

```sh
brew install node
```

> We have another tutorial on how to install Node.js. You can read it [here](/de/mac/install-nodejs.html).

You can use the `brew uninstall` command to uninstall a software package:

```sh
brew uninstall node
```

Homebrew Cask is an extension to Homebrew that allows you to install larger binary files. For example, you can use the following command to install Google Chrome:

```sh
brew install --cask google-chrome
```

Other commands can be found in the [documentation](https://docs.brew.sh/).

## Uninstall Homebrew

If you want to uninstall Homebrew, you can run the following command in the terminal:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

## Conclusion

In this tutorial, we learned how to install Homebrew on macOS. Now you have the most popular package manager on macOS. You can use it to install many software packages.

Enjoy it!
