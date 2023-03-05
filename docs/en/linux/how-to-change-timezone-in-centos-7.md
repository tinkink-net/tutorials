# How to change the time zone in Linux (Ubuntu, Debian, CentOS 7)

<Validator :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9']" date="2023-03-05" />

> To modify the time zone, you need to use the root user or a user with sudo privileges.

## Check the current time zone

In modern Linux like Ubuntu, Debian or CentOS, the current time zone can be checked using the following command.

```sh
timedatectl
```

The output is as follows.

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

As you can see from the above output, the time zone currently in use is UTC.

Another way to check the current time zone is to check the `/etc/localtime` file, which is a soft-linked file that points to the time zone file currently in use.

```sh
ls -l /etc/localtime
```

The output is as follows.

```
lrwxrwxrwx. 1 root root 29 Dec 11 09:25 /etc/localtime -> . /usr/share/zoneinfo/Etc/UTC
```

Again, you can see that the UTC time zone is currently in use.

## Modify time zone

First check the list of currently available time zones.

```sh
timedatectl list-timezones
```

The output is as follows.

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

Next you can set the time zone, using the following command.

```sh
timedatectl set-timezone Asia/Shanghai
```

> Note: You may need sudo privileges to execute the above command. `sudo timedatectl set-timezone Asia/Shanghai`

In the above example we set the timezone to China Standard Time `Asia/Shanghai`.

To recheck the current time zone.

```sh
timedatectl
```

The output is as follows.

```
      Local time: three 2021-11-10 09:34:45 CST
  Universal time: three 2021-11-10 01:34:45 UTC
        RTC time: 三 2021-11-10 09:34:44
       Time zone: Asia/Shanghai (CST, +0800)
     NTP enabled: yes
NTP synchronized: yes
 RTC in local TZ: yes
      DST active: n/a
```

The time zone can also be modified by using the softlink method.

```sh
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

> Note: You may need sudo privileges to execute the above command. `sudo timedatectl set-timezone Asia/Shanghai`

## Summary

Modern Linux has made it very easy to change time zones, just use `timedatectl`. Of course you can also modify the time zone in a more traditional way, by using a softlink.
