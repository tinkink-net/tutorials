# 在Silicon芯片(M1/M2)Mac电脑上使用Docker

<Validator lang="zh-hant" :platform-list="['macOS 13.2.1']" date="2023-03-14" />

## 背景和困难

苹果于 2020 年正式发布了搭载自研芯片 Apple Silicon 的电脑，随电脑发布的第一款芯片型号为 M1 。这款芯片的架构由经典的 x86 改为了 ARM 架构。

为了解决 CPU 架构变更带来的软件不兼容问题，苹果在 MacOS 中附带了用了转译 APP 代码的 Rosetta 2 。这个软件可以在运行时将 x86 架构的代码转译为 ARM 架构的代码，从而使得大部分软件无缝地运行在搭载新芯片的 MacOS 上。

尽管大部分的软件已经可以在 Apple Silicon （M1/M2）芯片上正常运行，但有一类特殊的软件却一直无法很顺利地运行——虚拟化软件。这包括虚拟机和 Docker 之类的软件。

经典的虚拟机软件如 VirtualBox 明确表示没有支持计划。而 Parallels Desktop 虽然支持，但价格让人望而生畏。

因为 Docker 在非 Linux 系统中实际上也依赖于一个虚拟化的 Linux 作为 Host，因此在虚拟机没有完善的解决方法时，Docker 也是没有办法顺畅运行的。

## 官方方案

Docker Desktop For Mac 提供了可以在 Apple Silicon 芯片上运行的版本，它使用了 QEMU 来处理不同架构的虚拟化问题。但是它对有一定规模的公司不再免费。因此如果你在一个稍具规模的公司，可能不会选择使用 Docker Desktop For Mac。如果你是个人使用，那么 Docker Desktop For Mac 仍然是一个非常不错的解决方案。

## Lima

[Lima](https://github.com/lima-vm/lima) 是一个免费的开源软件，同样使用 QEMU 来处理不同架构的虚拟化问题。和 Docker Desktop For Mac 不同的是，它的容器软件使用的是 Containerd 而不是 Docker。

> 在容器的发展历史中，一开始只有 Docker ，但随后社区希望容器可以标准化，因此诞生了 CRI 标准。Containerd 是一个这个标准的一种实现，Docker 也同样遵守这个标准。因此 Containerd 与 Docker 在使用时几乎可以兼容。

按照官方教程，使用 Homebrew 安装 lima 之后就可以使用了：

```sh
# 安装
brew install lima

# 启动
limactl start
```

此时就可以使用`nerdctl`来进行 Containerd 的各种操作。

```sh
lima nerdctl run -d --name nginx -p 80:80 nginx:alpine
```

可以看到，`lima nerdctl`的使用与`docker`几乎一模一样。使用完成后除了将容器关掉外，还可以将虚拟化环境也关闭，以节约内存：

```sh
limactl stop
```

lima 还可以设置非常多虚拟化的细节，也可以设置多个虚拟环境。更多使用细节可查看官方文档：<(https://github.com/lima-vm/lima>

## Colima

[Colima](https://github.com/abiosoft/colima) 是一个基于 Lima 的封装，同样是免费的开源软件，但是它的容器软件使用的是 Docker。

Colima 的安装使用也非常简单：

```sh
# 如果你没有安装过 docker 客户端，需要先安装
brew install docker
# 安装 colima
brew install colima
```

使用时，只需要使用 `colima` 命令即可：

```sh
colima start
```

待启动完成后，就可以正常使用`docker`命令了，不需要额外进行其它的设置。

使用完成后同样可以将虚拟化环境关闭：

```sh
colima stop
```

## 小结

- Apple Silicon 芯片的 Mac 设备使用 Docker 不是很容易
- Docker Desktop For Mac 可用，但是对大中型公司收费
- Lima & Colima 是免费开源的解决方案
