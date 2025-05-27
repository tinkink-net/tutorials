# Cómo ver el uso de espacio en disco en Linux

## Visualización de la ocupación de espacio de una partición de disco

Para usar una partición en Linux, necesitas montarla bajo cierto directorio, por lo que se puede entender sin crítica que una partición debe corresponder a un directorio cuyo contenido es el contenido de esa partición.

Para ver la ocupación de espacio de una partición, puedes usar el comando ``df``.

```sh
df -h
```

El contenido de retorno es similar al siguiente.

```
File system capacity used available used % mount point
devtmpfs 3.9G 0 3.9G 0% /dev
tmpfs 3.9G 0 3.9G 0% /dev/shm
/dev/sda2 496G 2.6G 484G 1% /
/dev/sda1 969M 112M 792M 13% /boot
```

Como puedes ver, las particiones principales son `/dev/sda1` y `/dev/sda2`, donde `/dev/sda2` tiene mucho espacio y es la partición utilizada principalmente para el almacenamiento de datos, y el punto de montaje es `/`, el directorio raíz. Desde el retorno anterior, puedes ver la ocupación de espacio de cada partición de disco.

## Comprobación de la ocupación de espacio de un directorio

Para ver la ocupación de espacio de un directorio, puedes usar el comando `du`. Por defecto, el comando `du` lista el espacio ocupado por directorios y archivos en todos los niveles en el directorio especificado. Puedes especificar que solo se liste el espacio ocupado por directorios y archivos en el nivel especificado con el parámetro `-max-depth`.

```sh
du -h --max-depth=1
```

El retorno es similar al siguiente.

```
68K . /nginx
12K . /scripts
44M . /log
20K . /bakup
1.9M . /letsencrypt
20M . /storage
22M . /tmp
88M .
```

Desde el retorno anterior, puedes ver el espacio total ocupado por cada directorio.

Vale la pena señalar que el comando `-du` es ligeramente más lento de ejecutar porque necesita iterar a través de todos los archivos y directorios en el directorio especificado, por lo que necesitas ser paciente y tomará más tiempo si hay más directorios y archivos.

También es posible especificar un valor mayor para el parámetro `-max-depth` mientras se asegura que la legibilidad no se vea afectada, por ejemplo:

```sh
du -h --max-depth=2
```

De esta manera puedes ver más información a la vez y entender más rápidamente qué directorios están ocupando mucho espacio.

## Resumen

Lo anterior es la forma de verificar el uso de espacio en disco en sistemas Linux. La combinación de ambos puede usarse para completar la tarea diaria de verificar el uso de espacio en disco.