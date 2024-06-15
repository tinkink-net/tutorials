# 如何更新glibc

::: warning
This article is under review, and may contain errors or inaccuracies. Please read with caution, and welcome to provide feedback.
:::

## 背景

GNU C庫（glibc）是GNU系統的標準C庫。它是GNU系統的主要庫，GNU/Linux系統的大多數程序都使用它。它提供了分配內存、搜索目錄、打開和關閉文件、讀寫文件、字符串處理、模式匹配、算術等基本程序。

當你在Linux上安裝一些軟件時，你可能會遇到以下錯誤。

```bash
./configure: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by ./configure)
```

這個錯誤意味着glibc的版本太低。你需要更新glibc到最新的版本。

我們可以通過以下命令檢查glibc的版本。

``bash
strings /lib64/libc.so.6|grep GLIBC_
```

輸出結果如下。

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

正如你所看到的，glibc的版本是2.12。它太低了。我們需要把它更新到最新的版本。

## 更新glibc

首先，我們需要創建一個目錄來存儲glibc源代碼。

```bash
mkdir ~/tmp/glibc
```

然後，我們需要下載glibc的源代碼。

```bash
cd ~/tmp/glibc
wget --no-check-certificate https://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
```

> 注意：`--no-check-certificate`是用來禁用證書檢查的，因爲官方網站的證書對某些Linux發行版來說非常新，所以系統可能不信任它，導致下載失敗。

接下來，我們需要解壓源代碼。

```bash
tar -xvf glibc-2.17.tar.gz
```

然後，你會看到一個名爲`glibc-2.17`的目錄。如果你在提取源代碼時遇到問題，你可以參考[如何壓縮和解壓縮](/zh-hant/linux/how-to-compress-and-decompress.html)。

我們需要進入該目錄並編譯源代碼，然後安裝它。

```bash
cd glibc-2.17
mkdir build&&cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make&&make install
```

> 注意：安裝glibc需要root權限，所以你需要切換到`root`用戶，或者使用`sudo`來執行上述命令。

現在我們已經將glibc更新到了最新版本。我們可以再次檢查glibc的版本。

``bash
strings /lib64/libc.so.6|grep GLIBC_
```

輸出結果如下。

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

正如你所看到的，glibc的版本已經更新爲2.17。現在我們可以安裝需要更高版本的glibc的軟件了。
