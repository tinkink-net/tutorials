---
description: Descubre cómo cambiar la zona horaria en tu sistema operativo Linux con este tutorial paso a paso. Ya sea que estés usando Ubuntu, Debian o CentOS, nuestra guía completa te mostrará cómo usar timedatectl para verificar y establecer la zona horaria correcta.
---

# Cómo cambiar la zona horaria en Linux (Ubuntu, Debian, CentOS 7)

<Validator lang="es" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9']" date="2023-03-05" />

> Para modificar la zona horaria, necesitas usar el usuario root o un usuario con privilegios sudo.

## Verificar la zona horaria actual

En Linux moderno como Ubuntu, Debian o CentOS, la zona horaria actual se puede verificar usando el siguiente comando.

```sh
timedatectl
```

La salida es la siguiente.

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

Como puedes ver en la salida anterior, la zona horaria actualmente en uso es UTC.

Otra forma de verificar la zona horaria actual es revisar el archivo `/etc/localtime`, que es un archivo con enlace simbólico que apunta al archivo de zona horaria actualmente en uso.

```sh
ls -l /etc/localtime
```

La salida es la siguiente.

```
lrwxrwxrwx. 1 root root 29 Dec 11 09:25 /etc/localtime -> . /usr/share/zoneinfo/Etc/UTC
```

Nuevamente, puedes ver que la zona horaria UTC está actualmente en uso.

## Modificar la zona horaria

Primero verifica la lista de zonas horarias disponibles actualmente.

```sh
timedatectl list-timezones
```

La salida es la siguiente.

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

A continuación, puedes establecer la zona horaria, usando el siguiente comando.

```sh
timedatectl set-timezone Asia/Shanghai
```

> Nota: Es posible que necesites privilegios sudo para ejecutar el comando anterior. `sudo timedatectl set-timezone Asia/Shanghai`

En el ejemplo anterior establecimos la zona horaria a la Hora Estándar de China `Asia/Shanghai`.

Para volver a verificar la zona horaria actual.

```sh
timedatectl
```

La salida es la siguiente.

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

La zona horaria también se puede modificar utilizando el método de enlace simbólico.

```sh
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

> Nota: Es posible que necesites privilegios sudo para ejecutar el comando anterior. `sudo timedatectl set-timezone Asia/Shanghai`

## Resumen

El Linux moderno ha facilitado mucho el cambio de zonas horarias, solo usa `timedatectl`. Por supuesto, también puedes modificar la zona horaria de una manera más tradicional, utilizando un enlace simbólico.