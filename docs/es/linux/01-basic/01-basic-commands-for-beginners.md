# Comandos Básicos de Linux para Principiantes

<Validator lang="es" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-04-27" />

Si eres nuevo en Linux, aprender comandos básicos es esencial para navegar por el sistema de archivos. Aquí están algunos de los comandos más importantes y cómo usarlos:

## cd (Cambiar Directorio)

El comando `cd` se utiliza para entrar en directorios en el sistema de archivos de Linux. Así es como se usa:

```sh
cd [nombre_del_directorio]
```

Por ejemplo, para entrar en la carpeta "Documentos", escribirías:

```sh
cd Documents
```

En Linux, hay un directorio especial llamado directorio "home". Este es el directorio donde serás ubicado cuando inicies sesión por primera vez en tu sistema Linux. Puedes usar `~` para representar el directorio home. Por ejemplo, para entrar al directorio home, escribirías:

```sh
cd ~
```

También puedes usar `..` para representar el directorio padre. Por ejemplo, si estás en la carpeta "Documentos" y quieres entrar al directorio padre, escribirías:

```sh
cd ..
```

Puedes usar múltiples nombres de directorios para entrar a un directorio (separados por `/`). Por ejemplo, si quieres entrar a la carpeta "Documentos" bajo el directorio "home", escribirías:

```sh
cd ~/Documents
```

## ls (Listar)

El comando ls se utiliza para mostrar el contenido de un directorio. Así es como se usa:

```sh
ls [nombre_del_directorio]
```

Por ejemplo, para listar el contenido de la carpeta `/usr/share`, escribirías:

```sh
ls /usr/share
```

La salida será:

```sh
applications  backgrounds  color  cups  dbus-1  doc  fonts  games  glib-2.0  gnome-shell  icons  i18n  locale  man  metainfo  mime  perl  pixmaps  polkit-1  systemd  themes  xml
```

Puedes ver todos los archivos y directorios en el directorio `/usr/share`. Pero lo único que puedes ver son los nombres de los archivos y directorios. Si quieres ver más información sobre los archivos y directorios, puedes usar la opción `-l`. Por ejemplo:

```sh
ls -l /var/log
```

La salida será:

```sh
total 172
-rw-r--r-- 1 root     root    8241 Sep 14 00:00 alternatives.log
-rw-r----- 1 syslog   adm   134781 Sep 16 23:47 auth.log
-rw-r--r-- 1 root     root    1040 Sep 14 00:00 bootstrap.log
drwxr-xr-x 2 root     root    4096 Jan 25 18:16 cups
-rw-r--r-- 1 root     root    4935 Sep 14 00:00 dmesg
...
```

Puedes ver que la opción `-l` muestra más información sobre los archivos y directorios, de izquierda a derecha, incluyendo:

- Tipo de archivo y permisos: El primer carácter indica el tipo de archivo. `-` indica un archivo regular, `d` indica un directorio, `l` indica un enlace simbólico, y así sucesivamente.
- Propietario y grupo
- Tamaño del archivo. Para directorios, el tamaño siempre es de 4096 bytes.
- Fecha y hora de última modificación
- Nombre del archivo

## mkdir (Crear Directorio)

El comando `mkdir` se utiliza para crear un nuevo directorio. Así es como se usa:

```sh
mkdir [nombre_del_directorio]
```

Por ejemplo, para crear un nuevo directorio llamado "Projects", escribirías:

```sh
mkdir Projects/
```

Este comando no tiene salida, pero puedes usar el comando ls para verificar que el directorio ha sido creado.

Si quieres crear múltiples directorios a la vez, puedes usar la opción `-p`. Por ejemplo, para crear un directorio llamado "Projects" bajo la carpeta "Documents", escribirías:

```sh
mkdir -p Documents/Projects
```

## rm (Eliminar)

El comando `rm` se utiliza para eliminar archivos o directorios. Así es como se usa:

```sh
rm [nombre_del_archivo_o_directorio]
```

Por ejemplo, para eliminar un archivo llamado "example.txt", escribirías:

```sh
rm example.txt
```

Si quieres eliminar un directorio, puedes usar la opción `-r`. Por ejemplo, para eliminar un directorio llamado "Projects", escribirías:

```sh
rm -r Projects/
```

Todos los archivos y subdirectorios en el directorio serán eliminados.

En la mayoría de los casos, se te pedirá confirmar la eliminación. Si quieres omitir la confirmación, puedes usar la opción `-f`. Por ejemplo:

```sh
rm -r example.txt
rm -rf Projects/
```

## mv (Mover)

El comando `mv` se utiliza para mover archivos o directorios de una ubicación a otra. Así es como se usa:

```sh
mv [ruta_origen] [ruta_destino]
```

Por ejemplo, para mover un archivo llamado "example.txt" desde la carpeta "Documents" a la carpeta "Projects", escribirías:

```sh
mv Documents/example.txt Projects/
```

## cp (Copiar)

El comando `cp` se utiliza para copiar archivos o directorios a otra ubicación. Así es como se usa:

```sh
cp [ruta_origen] [ruta_destino]
```

Por ejemplo, para copiar un archivo llamado "example.txt" desde la carpeta "Documents" a la carpeta "Projects", escribirías:

```sh
cp Documents/example.txt Projects/
```

Si quieres copiar un directorio, puedes usar la opción `-r`. Por ejemplo, para copiar un directorio llamado "Projects" a la carpeta "Documents", escribirías:

```sh
cp -r Projects/ Documents/
```

Si quieres fusionar el contenido del directorio de origen con el directorio de destino, puedes usar la opción `-a`. Por ejemplo, para copiar un directorio llamado "Projects" a la carpeta "Documents", escribirías:

```sh
cp -a Projects/ Documents/
```

## touch

El comando `touch` se utiliza para crear un nuevo archivo vacío. Así es como se usa:

```sh
touch [nombre_del_archivo]
```

Por ejemplo, para crear un archivo llamado "example.txt", escribirías:

```sh
touch example.txt
```

## cat

El comando `cat` se utiliza para ver el contenido de un archivo. Así es como se usa:

```sh
cat [nombre_del_archivo]
```

Por ejemplo, para ver el contenido de un archivo llamado "example.txt", escribirías:

```sh
cat example.txt
```

## pwd (Imprimir Directorio de Trabajo)

El comando `pwd` se utiliza para mostrar el directorio de trabajo actual. Así es como se usa:

```sh
pwd
```

La salida será algo como esto:

```sh
/home/username
```

## Resumen

Estos son solo algunos de los comandos básicos de Linux que necesitarás para empezar. A medida que te sientas más cómodo con el entorno Linux, descubrirás que hay muchos más comandos poderosos a tu disposición.