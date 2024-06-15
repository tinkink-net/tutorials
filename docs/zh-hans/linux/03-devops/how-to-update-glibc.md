# 如何更新glibc

::: warning
This article is under review, and may contain errors or inaccuracies. Please read with caution, and welcome to provide feedback.
:::

## 背景

GNU C库（glibc）是GNU系统的标准C库。它是GNU系统的主要库，GNU/Linux系统的大多数程序都使用它。它提供了分配内存、搜索目录、打开和关闭文件、读写文件、字符串处理、模式匹配、算术等基本程序。

当你在Linux上安装一些软件时，你可能会遇到以下错误。

```bash
./configure: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by ./configure)
```

这个错误意味着glibc的版本太低。你需要更新glibc到最新的版本。

我们可以通过以下命令检查glibc的版本。

``bash
strings /lib64/libc.so.6|grep GLIBC_
```

输出结果如下。

``bash
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_PRIVATE
```

正如你所看到的，glibc的版本是2.12。它太低了。我们需要把它更新到最新的版本。

## 更新glibc

首先，我们需要创建一个目录来存储glibc源代码。

```bash
mkdir ~/tmp/glibc
```

然后，我们需要下载glibc的源代码。

```bash
cd ~/tmp/glibc
wget --no-check-certificate https://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
```

> 注意：`--no-check-certificate`是用来禁用证书检查的，因为官方网站的证书对某些Linux发行版来说非常新，所以系统可能不信任它，导致下载失败。

接下来，我们需要解压源代码。

```bash
tar -xvf glibc-2.17.tar.gz
```

然后，你会看到一个名为`glibc-2.17`的目录。如果你在提取源代码时遇到问题，你可以参考[如何压缩和解压缩](/zh-hans/linux/how-to-compress-and-decompress.html)。

我们需要进入该目录并编译源代码，然后安装它。

```bash
cd glibc-2.17
mkdir build&&cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make&&make install
```

> 注意：安装glibc需要root权限，所以你需要切换到`root`用户，或者使用`sudo`来执行上述命令。

现在我们已经将glibc更新到了最新版本。我们可以再次检查glibc的版本。

``bash
strings /lib64/libc.so.6|grep GLIBC_
```

输出结果如下。

```bash
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_2.13
GLIBC_2.14
GLIBC_2.15
GLIBC_2.16
GLIBC_2.17
GLIBC_PRIVATE
```

正如你所看到的，glibc的版本已经更新为2.17。现在我们可以安装需要更高版本的glibc的软件了。
