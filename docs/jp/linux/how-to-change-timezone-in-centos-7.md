---
description: このステップバイステップのチュートリアルでLinuxオペレーティングシステムのタイムゾーンを変更する方法を学びましょう。Ubuntu、Debian、またはCentOSを使用している場合でも、当社の包括的なガイドを使用して、timedatectlを使用して正しいタイムゾーンを確認および設定する方法を示します。
---

# Linuxでタイムゾーンを変更する方法（Ubuntu、Debian、CentOS 7）

<Validator :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9']" date="2023-03-05" />

> タイムゾーンを変更するには、rootユーザーまたはsudo権限を持つユーザーを使用する必要があります。

## 現在のタイムゾーンを確認する

Ubuntu、Debian、CentOSなどの現代のLinuxでは、次のコマンドを使用して現在のタイムゾーンを確認できます。

```sh
timedatectl
```

出力は次のようになります。

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

上記の出力から、現在使用されているタイムゾーンがUTCであることがわかります。

現在のタイムゾーンを確認する別の方法は、現在使用されているタイムゾーンファイルを指すソフトリンクファイルである `/etc/localtime` ファイルを確認することです。

```sh
ls -l /etc/localtime
```

出力は次のようになります。

```
lrwxrwxrwx. 1 root root 29 Dec 11 09:25 /etc/localtime -> . /usr/share/zoneinfo/Etc/UTC
```

再び、現在UTCタイムゾーンが使用されていることがわかります。

## タイムゾーンを変更する

最初に、現在利用可能なタイムゾーンのリストを確認します。

```sh
timedatectl list-timezones
```

出力は次のようになります。

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

次に、次のコマンドを使用してタイムゾーンを設定できます。

```sh
timedatectl set-timezone Asia/Shanghai
```

> 注意：上記のコマンドを実行するには、sudo権限が必要な場合があります。 `sudo timedatectl set-timezone Asia/Shanghai`

上記の例では、タイムゾーンを中国標準時 `Asia/Shanghai` に設定しました。

現在のタイムゾーンを再確認するには。

```sh
timedatectl
```

出力は次のようになります。

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

タイムゾーンは、ソフトリンク方法を使用しても変更できます。

```sh
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

> 注意：上記のコマンドを実行するには、sudo権限が必要な場合があります。 `sudo timedatectl set-timezone Asia/Shanghai`

## 要約

現代のLinuxでは、`timedatectl`を使用してタイムゾーンを変更することが非常に簡単になりました。もちろん、ソフトリンクを使用して従来の方法でタイムゾーンを変更することもできます。