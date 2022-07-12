# CentOS 7 如何修改时区

> 修改时区需要使用root用户或者具有sudo权限的用户。

## 检查当前时区

在CentOS 7中，可以使用以下命令检查当前时区：

```sh
timedatectl
```

输出如下：

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

从上面的输出中看出，目前使用的时区是UTC时区。

另外一种检查当前时区的方法是检查`/etc/localtime`文件，这是一个软链的文件，指向当前使用的时区文件。

```sh
ls -l /etc/localtime
```

输出如下：

```
lrwxrwxrwx. 1 root root 29 Dec 11 09:25 /etc/localtime -> ../usr/share/zoneinfo/Etc/UTC
Copy
```

同样可以看到目前使用的是UTC时区。

## 修改时区

首先查看当前可用的时区列表：

```sh
timedatectl list-timezones
```

输出如下：

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

接下来就可以设置时区了，使用以下命令：

```sh
timedatectl set-timezone Asia/Shanghai
```

上面的例子我们将时区设置为了中国标准时间`Asia/Shanghai`。

重新检查当前时区：

```sh
timedatectl
```

输出如下：

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

也可以使用软链的方式来修改时区：

```sh
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

## 小结

现代 Linux 修改时区已经非常方便了，使用`timedatectl`即可。当然也可以比较传统的方式，使用软链的方式来修改时区。
