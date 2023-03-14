# Using Docker on Silicon chip (M1/M2) Mac computers

<Validator :platform-list="['macOS 13.2.1']" date="2023-03-14" />

## Background and difficulties

Apple officially released computers with its own chip, Apple Silicon, in 2020, and the first chip model released with the computer was M1. This chip's architecture was changed from the classic x86 to the ARM architecture.

To solve the problem of software incompatibility caused by the change in CPU architecture, Apple included Rosetta 2 in MacOS, which translates APP code. This software translates x86 architecture code to ARM architecture code at runtime, allowing most software to run seamlessly on MacOS with the new chips.

While most software already runs well on Apple Silicon (M1/M2) chips, there is one particular class of software that has not been able to run smoothly - virtualization software. This includes software such as virtual machines and Docker.

Classic virtual machine software such as VirtualBox explicitly states that there are no support plans. And while Parallels Desktop does support it, the price is prohibitive.

Because Docker actually relies on a virtualized Linux as a Host on non-Linux systems, there is no way for Docker to run smoothly without a sound solution for virtual machines.

## Official Solution

Docker Desktop For Mac provides a version that runs on Apple Silicon chips, and it uses QEMU to handle virtualization on different architectures. But it's no longer free for companies of a certain size. So if you're in a slightly larger company, you may not choose to use Docker Desktop For Mac, and if you're a personal user, then Docker Desktop For Mac is still a very good solution.

## Lima

[Lima](https://github.com/lima-vm/lima) is a free open source software that also uses QEMU to handle virtualization for different architectures. Unlike Docker Desktop For Mac, it uses Containerd instead of Docker for its container software.

> Containerd is an implementation of this standard, and Docker adheres to it as well. Therefore, Containerd and Docker are almost compatible in use.

Follow the official tutorial to install lima with Homebrew and you are ready to use it:

```sh
# Install
brew install lima

# Start
limactl start
```

At this point, you can use ``nerdctl`` to perform various operations with Containerd.

```sh
lima nerdctl run -d --name nginx -p 80:80 nginx:alpine
```

As you can see, the use of ``lima nerdctl`` is almost identical to ``docker``. In addition to shutting down the container when you are done, you can also shut down the virtualized environment to save memory:

```sh
limactl stop
```

lima also allows you to set very many virtualization details, and to set up multiple virtual environments. More usage details can be found in the official documentation: <https://github.com/lima-vm/lima>

## Colima

[Colima](https://github.com/abiosoft/colima) is a package based on Lima, also free and open source software, but it uses Docker for its container software.

Colima is also very simple to install and use:

```sh
# If you don't have a docker client installed, you need to install it first
brew install docker
# Install colima
brew install colima
```

To use it, just use the `colima` command.

```sh
colima start
```

After the startup is complete, you can use the `docker` command normally, no additional setup is needed.

You can also shut down the virtualized environment when you are done using it: ``sh colima start

```sh
colima stop
```

## Summary

- Docker is not easy to use for Mac devices with Apple Silicon chips
- Docker Desktop For Mac is available, but charges for medium and large companies
- Lima & Colima are free and open source solutions
