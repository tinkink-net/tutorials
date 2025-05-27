# Linux: Buscar archivos con el comando Find

<Validator lang="es" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9', 'macOS 13.2.1']" date="2023-04-04" />

El comando `find` en Linux es una herramienta poderosa que te permite buscar archivos y directorios en una jerarquía de directorios determinada basándose en varios parámetros. En este tutorial, exploraremos cómo usar el comando find y sus diversas opciones.

## Sintaxis básica

La sintaxis básica del comando find es la siguiente:

```sh
find [directorio] [expresión]
```

Aquí, `[directorio]` es el directorio en el que quieres buscar archivos, y `[expresión]` es el criterio de búsqueda que quieres aplicar. El comando find buscará archivos y directorios en el `[directorio]` dado y sus subdirectorios que coincidan con la `[expresión]` especificada.

La salida del comando find es una lista de archivos y directorios que coinciden con los criterios de búsqueda especificados. Por ejemplo, si ejecutas el siguiente comando:

```sh
find . -name "*.txt"
```

Obtendrás una lista de todos los archivos con extensión `.txt` en el directorio actual y sus subdirectorios:

```
./example.txt
./example2.txt
./subdir/example3.txt
```

## Buscar archivos por nombre

Para buscar un archivo por nombre, usa la opción `-name` seguida del nombre del archivo que estás buscando. Por ejemplo, para buscar un archivo llamado `example.txt` en el directorio actual y sus subdirectorios, usa el siguiente comando:

```sh
find . -name "example.txt"
```

Esto buscará todos los archivos llamados "example.txt" en el directorio actual y sus subdirectorios.

Para buscar todos los archivos con una extensión específica, usa la opción `-name` seguida del carácter comodín `*` y la extensión que estás buscando. Por ejemplo, para buscar todos los archivos con extensión `.txt` en el directorio actual y sus subdirectorios, usa el siguiente comando:

```sh
find . -name "*.txt"
```

Esto buscará todos los archivos con extensión `.txt` en el directorio actual y sus subdirectorios.

De hecho, el carácter comodín `*` puede usarse en cualquier parte del nombre del archivo. Por ejemplo:

```sh
find . -name "example*"
find . -name "*example.txt"
find . -name "*example.*"
```

## Buscar directorios

Para buscar todos los directorios en el directorio actual y sus subdirectorios, usa la opción `-type` seguida de `d`. Por ejemplo, para buscar todos los directorios en el directorio actual y sus subdirectorios, usa el siguiente comando:

```sh
find . -type d
```

Esto buscará todos los directorios en el directorio actual y sus subdirectorios.

## Buscar archivos por tiempo de modificación

Para buscar todos los archivos modificados dentro de un marco de tiempo específico, usa la opción `-mtime` seguida del número de días. Si quieres buscar archivos modificados en los últimos `n` días, usa un número negativo `-n`.

Por ejemplo, para buscar todos los archivos modificados en los últimos 7 días, usa el siguiente comando:

```sh
find . -mtime -7
find . -mtime -1w
```

La unidad de tiempo predeterminada para la opción `-mtime` es días.

Puedes usar otras unidades de tiempo en macOS:

- `s` - Segundos
- `m` - Minutos
- `h` - Horas
- `d` - Días
- `w` - Semanas

> También puedes usar las opciones `-atime` y `-ctime` para buscar archivos basados en su tiempo de acceso y tiempo de creación respectivamente.

## Buscar archivos por tamaño

Para buscar todos los archivos más grandes que un tamaño específico, usa la opción `-size` seguida del tamaño en bytes con un signo `+`. Para buscar todos los archivos más pequeños que un tamaño específico, usa la opción `-size` seguida del tamaño en bytes con un signo `-`.

Por ejemplo, para buscar todos los archivos más grandes que `10MB` en el directorio actual y sus subdirectorios, usa el siguiente comando:

```sh
find . -size +10M
```

Esto buscará todos los archivos más grandes que `10MB` en el directorio actual y sus subdirectorios.

Las unidades de tamaño comunes que puedes usar son:

- `c` - Bytes
- `k` - Kilobytes (1024 bytes)
- `M` - Megabytes (1024 kilobytes)
- `G` - Gigabytes (1024 megabytes)
- `T` - Terabytes (1024 gigabytes)
- `P` - Petabytes (1024 terabytes)

## Combinar criterios de búsqueda

Puedes combinar múltiples criterios de búsqueda para encontrar archivos que coincidan con condiciones específicas. Por ejemplo, para buscar todos los archivos con una extensión específica que fueron modificados en los últimos 7 días, usa el siguiente comando:

```sh
find . -name "*.txt" -type f -mtime -7
```

Esto buscará todos los archivos con extensión `.txt` que fueron modificados en los últimos 7 días en el directorio actual y sus subdirectorios.

## Usar la salida del comando find

Puedes usar la salida del comando find de varias maneras. Aquí hay algunos ejemplos:

Para guardar la salida del comando find en un archivo, usa el siguiente comando:

```sh
find . -name "*.txt" > files.txt
```

Esto guardará los nombres de todos los archivos con extensión `.txt` en un archivo llamado `files.txt`.

Para usar la salida del comando find como entrada para otro comando, usa el comando `xargs`.

Por ejemplo, para eliminar todos los archivos con una extensión específica, usa el siguiente comando:

```sh
find . -name "*.txt" -type f | xargs rm
```

Para realizar una acción en cada archivo encontrado por el comando find, usa la opción `-exec`.

Por ejemplo, para cambiar los permisos de todos los archivos con una extensión específica, usa el siguiente comando:

```sh
find . -name "*.txt" -type f -exec chmod 644 {} \;
```

La sintaxis del argumento `-exec` es:

```sh
-exec comando {} \;
```

- `comando` es el comando que quieres ejecutar en los archivos encontrados por find.
- `{}` es un marcador de posición que será reemplazado por el nombre del archivo encontrado por find.
- `\;` se usa para terminar el comando y señalar el final del argumento `-exec`.

Para contar el número de archivos encontrados por el comando find, usa el comando `wc`. Por ejemplo, para contar el número de archivos con una extensión específica, usa el siguiente comando:

```sh
find . -name "*.txt" -type f | wc -l
```

## Conclusión

El comando `find` en Linux es una herramienta poderosa que te permite buscar archivos y directorios basados en varios criterios. Al usar sus diversas opciones y combinar criterios de búsqueda, puedes encontrar rápidamente los archivos y directorios que necesitas. También puedes usar la salida del comando find de varias maneras para realizar acciones en los archivos encontrados.