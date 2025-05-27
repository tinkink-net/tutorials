# Cómo actualizar glibc

::: warning
Este artículo está bajo revisión y puede contener errores o inexactitudes. Por favor, léalo con precaución y siéntase libre de proporcionar comentarios.
:::

## Antecedentes

La Biblioteca GNU C (glibc) es la biblioteca C estándar para el sistema GNU. Es la biblioteca principal para el sistema GNU y es utilizada por la mayoría de los programas en sistemas GNU/Linux. Proporciona las rutinas básicas para asignar memoria, buscar directorios, abrir y cerrar archivos, leer y escribir archivos, manejo de cadenas, coincidencia de patrones, aritmética, etc.

Cuando instalas algún software en Linux, puedes encontrarte con el siguiente error:

```bash
./configure: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by ./configure)
```

Este error significa que la versión de glibc es demasiado baja. Necesitas actualizar glibc a la última versión.

Podemos verificar la versión de glibc con el siguiente comando:

```bash
strings /lib64/libc.so.6|grep GLIBC_
```

La salida es la siguiente:

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

Como puedes ver, la versión de glibc es 2.12. Es demasiado baja. Necesitamos actualizarla a la última versión.

## Actualizar glibc

Primero, necesitamos crear un directorio para almacenar el código fuente de glibc:

```bash
mkdir ~/tmp/glibc
```

Luego, necesitamos descargar el código fuente de glibc:

```bash
cd ~/tmp/glibc
wget --no-check-certificate https://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
```

> Nota: `--no-check-certificate` se utiliza para deshabilitar la verificación del certificado, porque el certificado del sitio web oficial es muy nuevo para algunas distribuciones de Linux, por lo que el sistema puede no confiar en él y causar que la descarga falle.

A continuación, necesitamos extraer el código fuente:

```bash
tar -xvf glibc-2.17.tar.gz
```

Entonces, verás un directorio llamado `glibc-2.17`. Si tienes problemas para extraer el código fuente, puedes ver [Cómo comprimir y descomprimir](/es/linux/how-to-compress-and-decompress.html).

Necesitamos entrar en el directorio y compilar el código fuente, luego instalarlo:

```bash
cd glibc-2.17
mkdir build && cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make&&make install
```

> Nota: la instalación de glibc requiere privilegios de root, por lo que necesitas cambiar al usuario `root` o usar `sudo` para ejecutar los comandos anteriores.

Ahora hemos actualizado glibc a la última versión. Podemos verificar la versión de glibc nuevamente:

```bash
strings /lib64/libc.so.6|grep GLIBC_
```

La salida es la siguiente:

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

Como puedes ver, la versión de glibc ha sido actualizada a 2.17. Ahora podemos instalar el software que requiere una versión más alta de glibc.