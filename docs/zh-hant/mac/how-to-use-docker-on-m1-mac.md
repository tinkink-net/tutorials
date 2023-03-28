# 在蘋果Silicon芯片（M1/M2）Mac電腦上使用Docker

<Validator lang="zh-hans" :platform-list="['macOS 13.2.1']" date="2023-03-14" />

## 背景和困難

蘋果於 2020 年正式發佈了搭載自研芯片 Apple Silicon 的電腦，隨電腦發佈的第一款芯片型號爲 M1 。這款芯片的架構由經典的 x86 改爲了 ARM 架構。

爲了解決 CPU 架構變更帶來的軟件不兼容問題，蘋果在 MacOS 中附帶了用了轉譯 APP 代碼的 Rosetta 2 。這個軟件可以在運行時將 x86 架構的代碼轉譯爲 ARM 架構的代碼，從而使得大部分軟件無縫地運行在搭載新芯片的 MacOS 上。

儘管大部分的軟件已經可以在 Apple Silicon （M1/M2）芯片上正常運行，但有一類特殊的軟件卻一直無法很順利地運行——虛擬化軟件。這包括虛擬機和 Docker 之類的軟件。

經典的虛擬機軟件如 VirtualBox 明確表示沒有支持計劃。而 Parallels Desktop 雖然支持，但價格讓人望而生畏。

因爲 Docker 在非 Linux 系統中實際上也依賴於一個虛擬化的 Linux 作爲 Host，因此在虛擬機沒有完善的解決方法時，Docker 也是沒有辦法順暢運行的。

## 官方方案

Docker Desktop For Mac 提供了可以在 Apple Silicon 芯片上運行的版本，它使用了 QEMU 來處理不同架構的虛擬化問題。但是它對有一定規模的公司不再免費。因此如果你在一個稍具規模的公司，可能不會選擇使用 Docker Desktop For Mac。如果你是個人使用，那麼 Docker Desktop For Mac 仍然是一個非常不錯的解決方案。

## Lima

[Lima](https://github.com/lima-vm/lima) 是一個免費的開源軟件，同樣使用 QEMU 來處理不同架構的虛擬化問題。和 Docker Desktop For Mac 不同的是，它的容器軟件使用的是 Containerd 而不是 Docker。

> 在容器的發展歷史中，一開始只有 Docker ，但隨後社區希望容器可以標準化，因此誕生了 CRI 標準。Containerd 是一個這個標準的一種實現，Docker 也同樣遵守這個標準。因此 Containerd 與 Docker 在使用時幾乎可以兼容。

按照官方教程，使用 Homebrew 安裝 lima 之後就可以使用了：

```sh
# 安裝
brew install lima

# 啓動
limactl start
```

此時就可以使用`nerdctl`來進行 Containerd 的各種操作。

```sh
lima nerdctl run -d --name nginx -p 80:80 nginx:alpine
```

可以看到，`lima nerdctl`的使用與`docker`幾乎一模一樣。使用完成後除了將容器關掉外，還可以將虛擬化環境也關閉，以節約內存：

```sh
limactl stop
```

lima 還可以設置非常多虛擬化的細節，也可以設置多個虛擬環境。更多使用細節可查看官方文檔：<(https://github.com/lima-vm/lima>

## Colima

[Colima](https://github.com/abiosoft/colima) 是一個基於 Lima 的封裝，同樣是免費的開源軟件，但是它的容器軟件使用的是 Docker。

Colima 的安裝使用也非常簡單：

```sh
# 如果你沒有安裝過 docker 客戶端，需要先安裝
brew install docker
# 安裝 colima
brew install colima
```

使用時，只需要使用 `colima` 命令即可：

```sh
colima start
```

待啓動完成後，就可以正常使用`docker`命令了，不需要額外進行其它的設置。

使用完成後同樣可以將虛擬化環境關閉：

```sh
colima stop
```

## OrbStack

"OrbStack 是在 macOS 上運行 Docker 容器和 Linux 機器的快速、輕量、簡單的方式。您可以將其視爲超級 WSL 和 Docker Desktop 的 macOS 版本，所有這些都在一個易於使用的應用程序中。"（來自官方網站。）

OrbStack 提供了一個 GUI 界面來管理 macOS 上的 Docker 容器和 Linux 機器。以及一個命令行界面。

您可以從官方網站下載：<https://orbstack.dev/>，或使用 Homebrew 安裝：

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

只需啓動 OrbStack，您現在就可以使用 Docker 了。

![OrbStack 的截圖](/attachments/mac/how-to-use-docker-on-m1-mac/01.screenshot-orbstack.png)

## 小結

- Apple Silicon 芯片的 Mac 設備使用 Docker 不是很容易
- Docker Desktop For Mac 可用，但是對大中型公司收費
- Lima & Colima 是免費開源的解決方案
- OrbStack 是一個 GUI 解決方案
