---
description: 本篇教程將教您如何一步一步在您的Linux操作系統上更改時區，無論您使用Ubuntu、Debian還是CentOS，我們全面的指南將向您展示如何使用timedatectl檢查和設置正確的時區。
---

# Linux 如何修改時區（Ubuntu、Debian、CentOS）

<Validator lang="zh-hant" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9']" date="2023-03-05" />

> 修改時區需要使用root用戶或者具有sudo權限的用戶。

## 檢查當前時區

在現代 Linux 系統（如 Ubuntu、Debian、CentOS等）中，可以使用以下命令檢查當前時區：

```sh
timedatectl
```

輸出如下：

```
      Local time: Wed 2021-11-06 22:43:42 UTC
  Universal time: Wed 2021-11-06 22:43:42 UTC
        RTC time: Wed 2021-11-06 22:43:42
       Time zone: Etc/UTC (UTC, +0000)
     NTP enabled: no
NTP synchronized: yes
 RTC in local TZ: no
      DST active: n/a
```

從上面的輸出中看出，目前使用的時區是UTC時區。

另外一種檢查當前時區的方法是檢查`/etc/localtime`文件，這是一個軟鏈的文件，指向當前使用的時區文件。

```sh
ls -l /etc/localtime
```

輸出如下：

```
lrwxrwxrwx. 1 root root 29 Dec 11 09:25 /etc/localtime -> ../usr/share/zoneinfo/Etc/UTC
```

同樣可以看到目前使用的是UTC時區。

## 修改時區

首先查看當前可用的時區列表：

```sh
timedatectl list-timezones
```

輸出如下：

```
...
America/Tijuana
America/Toronto
America/Tortola
America/Vancouver
America/Whitehorse
America/Winnipeg
...
```

接下來就可以設置時區了，使用以下命令：

```sh
timedatectl set-timezone Asia/Shanghai
```

> 注意：可能需要sudo權限來執行上面的命令。`sudo timedatectl set-timezone Asia/Shanghai`

上面的例子我們將時區設置爲了中國標準時間`Asia/Shanghai`。

重新檢查當前時區：

```sh
timedatectl
```

輸出如下：

```
      Local time: 三 2021-11-10 09:34:45 CST
  Universal time: 三 2021-11-10 01:34:45 UTC
        RTC time: 三 2021-11-10 09:34:44
       Time zone: Asia/Shanghai (CST, +0800)
     NTP enabled: yes
NTP synchronized: yes
 RTC in local TZ: yes
      DST active: n/a
```

也可以使用軟鏈的方式來修改時區：

```sh
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

> 注意：可能需要sudo權限來執行上面的命令。`sudo timedatectl set-timezone Asia/Shanghai`

## 小結

現代 Linux 修改時區已經非常方便了，使用`timedatectl`即可。當然也可以比較傳統的方式，使用軟鏈的方式來修改時區。
