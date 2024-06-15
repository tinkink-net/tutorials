# How to update glibc

::: warning
This article is under review, and may contain errors or inaccuracies. Please read with caution, and welcome to provide feedback.
:::

## Background

The GNU C Library (glibc) is the standard C library for the GNU system. It is the main library for the GNU system and is used by most programs on GNU/Linux systems. It provides the basic routines for allocating memory, searching directories, opening and closing files, reading and writing files, string handling, pattern matching, arithmetic, and so on.

When you install some software on Linux, you may encounter the following error:

```bash
./configure: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by ./configure)
```

This error means that the version of glibc is too low. You need to update glibc to the latest version.

We can check the version of glibc by the following command:

```bash
strings /lib64/libc.so.6|grep GLIBC_
```

The output is as follows:

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
GLIBC_PRIVATE
```

As you can see, the version of glibc is 2.12. It is too low. We need to update it to the latest version.

## Update glibc

First, we need to create a directory to store the glibc source code:

```bash
mkdir ~/tmp/glibc
```

Then, we need to download the glibc source code:

```bash
cd ~/tmp/glibc
wget --no-check-certificate https://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
```

> Notice: `--no-check-certificate` is used to disable the certificate check, because the certificate of the official website is very new to some Linux distributions, so the system may not trust it, and cause the download to fail.

Next, we need to extract the source code:

```bash
tar -xvf glibc-2.17.tar.gz
```

Then, you will see a directory named `glibc-2.17`. If you have problem extracting the source code, you can see [How to compress and de compress](/en/linux/how-to-compress-and-decompress.html).

We need to enter the directory and compile the source code, then install it:

```bash
cd glibc-2.17
mkdir build && cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make&&make install
```

> Notice: installing glibc requires root privileges, so you need switch to `root` user, or use `sudo` to execute the above commands.

Now we have updated glibc to the latest version. We can check the version of glibc again:

```bash
strings /lib64/libc.so.6|grep GLIBC_
```

The output is as follows:

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

As you can see, the version of glibc has been updated to 2.17. Now we can install the software that requires a higher version of glibc.
