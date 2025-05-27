# Corte de registros de Linux con logratate

## Introducción al Rollup de Registros

El registro es una parte muy importante de los servicios en línea. Varios servicios registran constantemente sus propios registros operativos mientras se ejecutan, como los registros de acceso de nginx, registros de flujo del sistema de negocio, varios registros de errores, etc. Estos registros generalmente se almacenan en diferentes archivos de registro, y el tamaño de los archivos de registro crece a medida que aumenta el tiempo de ejecución.

Pero el espacio en disco del servidor en línea es limitado, y si el tamaño de los archivos de registro sigue creciendo, eventualmente llevará a la insuficiencia de espacio en disco. Para resolver este problema, necesitamos realizar cortes rotativos en los registros.

Específicamente, el corte rotativo hará varias cosas.

1. establecer ciertas reglas de rotación (por ejemplo, por tiempo o volumen)
2. cambiar el registro actual a registro histórico cuando se cumple la regla, y generar un nuevo archivo de registro como el archivo de registro actual
3. limpiar automáticamente algunos archivos de registro antiguos cuando hay demasiados archivos de registro históricos

De esta manera, el archivo de registro grande original se convertirá en un montón de archivos de registro pequeños, y se cortará y rotará cada cierto tiempo, y el historial total de registros es básicamente estable e invariable, por lo que no tienes que preocuparte de que los registros sigan creciendo y ocupando espacio en disco.

## Uso de logrotate

La mayoría de las distribuciones de Linux tienen una herramienta logrotate incorporada, que facilita la configuración de reglas de rotación de registros y la limpieza automática de archivos de registro obsoletos.

El archivo de configuración para `logrotate` es

- `/etc/logrotate.conf` archivo de configuración principal
- El directorio `/etc/logrotate.d` puede contener muchos archivos de configuración específicos de logrotate

Cuando necesitamos configurar una regla de corte de rotación de registros, podemos crear un nuevo archivo de configuración en `/etc/logrotate.d`. Por ejemplo `/etc/logrotate.d/nginx`, el contenido de este archivo es el siguiente

```
/var/log/nginx/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 640 root root
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 \`cat /var/run/nginx.pid`
    endscript
}
```

El significado de este archivo de configuración es.

- `daily` rota una vez al día
- `missingok` no rota si el archivo no existe
- `rotate 7` mantiene los últimos 7 archivos de registro
- `compress` Comprime los archivos de registro
- `delaycompress` Retrasa la compresión
- `notifempty` No rota si el archivo está vacío
- `create 640 root root` El propietario y los permisos del nuevo archivo de registro, especialmente si nginx no se ejecuta por el usuario `root`
- `sharedscripts` compartir scripts, es decir, ejecutar scripts después de que los registros hayan terminado de rotar, de lo contrario tendrás que ejecutar scripts una vez por cada archivo de registro rotado
- `postrotate` script que se ejecuta después de que los registros hayan terminado de rotar, algunos registros de negocio pueden no necesitar este script

Una vez que se establece la configuración de la regla de corte de rotación de registros, puedes usar `logrotate -d` para verificar la regla, por ejemplo

```sh
logrotate -d /etc/logrotate.d/nginx
```

devuelve algo como lo siguiente.

```
reading config file /etc/logrotate.d/nginx
Allocating hash table for state file, size: 15360 B

Handling 1 logs

rotating pattern: /var/log/nginx/*.log after 1 days (7 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/nginx/*.log /access.log
  log does not need rotating (log has been already rotated)
considering log /var/log/nginx/*.log /error.log
  log does not need rotating (log has been already rotated)

running postrotate script
......
```

No hay errores significa que el archivo de configuración es correcto.

Si quieres ver resultados inmediatamente, puedes usar `logrotate -f` para forzar un corte de rotación, por ejemplo

```sh
logrotate -f /etc/logrotate.d/nginx
```

## Otros parámetros

- `compress` comprime los registros históricos después de rotar
- `nocompress` no comprime el registro histórico después de rotar
- `copytruncate` se utiliza para hacer una copia de seguridad y truncar el archivo de registro actual mientras todavía está abierto; es una forma de copiar y luego vaciar, hay un intervalo de tiempo entre copiar y vaciar, y algunos datos de registro pueden perderse.
- `nocopytruncate` hace una copia de seguridad del archivo de registro pero no lo trunca
- `create mode owner group` Especifica el propietario y los permisos para crear nuevos archivos
- `nocreate` no crea nuevos archivos de registro
- `delaycompress` y `compress` juntos comprimen el archivo de registro histórico hasta la próxima rotación
- `nodelaycompress` anula la opción `delaycompress` y comprime en una base rotativa
- `missingok` Si falta un registro, continúa rotando al siguiente registro sin reportar un error
- `errors address` Envía mensajes de error a la dirección de Email especificada cuando rota
- `ifempty` Rota incluso si el archivo de registro está vacío
- `notifempty` No rota cuando el archivo de registro está vacío
- `mail address` Envía el archivo de registro rotado a la dirección de Email especificada
- `nomail` No envía archivos de registro cuando rota
- `olddir directory` Pone el archivo de registro rotado en el directorio especificado, debe estar en el mismo sistema de archivos que el archivo de registro actual
- `noolddir` El archivo de registro rotado se coloca en el mismo directorio que el archivo de registro actual
- `sharedscripts` compartir scripts, es decir, ejecutar los scripts después de que los registros son rotados, de lo contrario ejecutar los scripts una vez por cada archivo de registro rotado
- `prerotate` el comando a ejecutar antes de rotar, como modificar las propiedades del archivo; debe ser una línea separada
- `postrotate` Un comando a ejecutar después de la rotación, como reiniciar (`kill -HUP`) un servicio; debe ser una línea separada
- `daily` especifica que el período de rotación es diario
- `weekly` especifica que el período de rotación es semanal
- `monthly` especifica un ciclo de rotación mensual
- `rotate count` especifica el número de veces que el archivo de registro se rota antes de ser eliminado, `0` significa que no se mantienen copias de seguridad, `5` significa que se mantienen 5 copias de seguridad
- `dateext` utiliza la fecha actual como formato de nomenclatura
- `dateformat . %s` usado con dateext, aparece inmediatamente después de la siguiente línea, define el nombre del archivo después de ser cortado, debe ser usado con `dateext`, solo soporta cuatro parámetros `%Y`/`%m`/`%d`/`%s`
- `size log-size` (o `minsize log-size`) Rota el archivo de registro cuando alcanza el tamaño especificado, el siguiente es el formato legal.
    - `size = 5` o `size 5` (rota cuando >= 5 bytes)
    - `size = 100k` o `size 100k`
    - `size = 100M` o `size 100M`