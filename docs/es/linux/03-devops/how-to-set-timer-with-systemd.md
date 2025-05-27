# Cómo configurar un temporizador con systemd en Linux

<Validator lang="es" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9']" date="2023-03-29" />

## Antecedentes

El temporizador es ampliamente utilizado en Linux. Se utiliza para programar tareas que se ejecuten en un momento o intervalo específico. Por ejemplo, puedes usar un temporizador para programar un script de respaldo que se ejecute a una hora específica cada día, semana o mes.

Algunos usos:

- Programación de copias de seguridad automatizadas: Por ejemplo, puedes configurar un temporizador para ejecutar una copia de seguridad de base de datos a una hora específica cada día.
- Monitoreo del rendimiento del sistema: Programación de verificaciones periódicas del uso de CPU, uso de memoria, espacio en disco y otras métricas del sistema. Esto ayuda a los administradores a identificar y resolver problemas de rendimiento antes de que se vuelvan críticos.
- Ejecución de scripts a intervalos regulares: Los temporizadores de Linux pueden usarse para ejecutar scripts a intervalos regulares. Esto es útil para tareas como limpiar archivos temporales, ejecutar scripts de mantenimiento del sistema.

Las versiones anteriores de Linux utilizan el demonio cron para programar tareas. Sin embargo, el demonio cron ya no se recomienda para nuevas instalaciones. En su lugar, deberías usar el temporizador systemd.

## Listar temporizadores existentes

Para listar todos los temporizadores existentes, usa el siguiente comando:

```sh
systemctl list-timers
```

Verás una lista de temporizadores, incluyendo el nombre del temporizador, la próxima vez que se activará y la última vez que se activó.

```
NEXT                        LEFT          LAST PASSED UNIT                         ACTIVATES
Wed 2023-03-29 10:06:35 CST 4min 49s left n/a  n/a    ua-timer.timer               ua-timer.service
Wed 2023-03-29 10:14:03 CST 12min left    n/a  n/a    systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Wed 2023-03-29 17:35:56 CST 7h left       n/a  n/a    motd-news.timer              motd-news.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a  n/a    dpkg-db-backup.timer         dpkg-db-backup.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a  n/a    logrotate.timer              logrotate.service
Thu 2023-03-30 03:27:59 CST 17h left      n/a  n/a    apt-daily.timer              apt-daily.service
Thu 2023-03-30 06:58:06 CST 20h left      n/a  n/a    apt-daily-upgrade.timer      apt-daily-upgrade.service
Sun 2023-04-02 03:10:16 CST 3 days left   n/a  n/a    e2scrub_all.timer            e2scrub_all.service
```

## Configurar un temporizador usando systemd de Linux

> Para configurar un temporizador, necesitas usar el usuario root o un usuario con privilegios sudo.

Para configurar un temporizador usando systemd de Linux y registrar la salida en un archivo, sigue estos pasos:

Primero, crea un nuevo archivo de unidad de temporizador en el directorio `/etc/systemd/system`. Puedes nombrarlo como quieras, pero debe tener una extensión `.timer`. Por ejemplo, crea un archivo llamado `helloworld.timer`.

En el archivo de unidad de temporizador, añade las siguientes líneas:

```
[Unit]
Description=Hello World Timer

[Timer]
OnCalendar=*:0/10
Unit=helloworld.service

[Install]
WantedBy=timers.target
```

El archivo `.timer` es un archivo de unidad systemd que define un temporizador. Contiene una sección `[Unit]`, que proporciona una descripción del temporizador, una sección `[Timer]`, que define cuándo debe activarse el temporizador y qué servicio ejecutar, y una sección `[Install]`, que especifica dónde debe instalarse el temporizador.

Esto le dice al sistema que ejecute la unidad `helloworld.service` cada 10 minutos, y configura el temporizador para que se active cada 10 minutos de cualquier hora (`*`) usando `OnCalendar`.

> Nota: `OnCalendar` utiliza una sintaxis flexible para definir cuándo debe activarse el temporizador. En este ejemplo, `*:0/10` significa "cada 10 minutos". Puedes usar otros valores para especificar diferentes intervalos.
>
> Para más información, consulta el Apéndice.

Luego, crea un nuevo archivo de unidad de servicio en el mismo directorio. De nuevo, puedes nombrarlo como quieras, pero debe tener una extensión `.service`. Por ejemplo, crea un archivo llamado `helloworld.service`.

En el archivo de unidad de servicio, añade las siguientes líneas:

```
[Unit]
Description=Hello World Service

[Service]
Type=oneshot
ExecStart=/bin/echo "Hello World"

[Install]
WantedBy=multi-user.target
```

El archivo `.service` es un archivo de unidad systemd que define un servicio. Las secciones `[Unit]` y `[Install]` son similares al archivo `.timer`. La sección `[Service]` define cómo debe ejecutarse el servicio.

Esto le dice al sistema que ejecute el comando `/bin/echo "Hello World"` cuando se active el temporizador.

Recarga el demonio systemd para cargar los nuevos archivos de unidad:

```sh
sudo systemctl daemon-reload
```

Habilita e inicia el temporizador:

```sh
sudo systemctl enable helloworld.timer
sudo systemctl start helloworld.timer
```

Ahora, el sistema imprimirá "Hello World" cada 10 minutos y registrará la salida en un archivo. Podemos verificar la lista de temporizadores nuevamente para ver que el temporizador está funcionando:

```sh
systemctl list-timers
```

```
NEXT                        LEFT          LAST                        PASSED       UNIT                         ACTIVATES
Wed 2023-03-29 10:10:00 CST 1min 46s left n/a                         n/a          helloworld.timer             helloworld.service
Wed 2023-03-29 10:14:03 CST 5min left     n/a                         n/a          systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Wed 2023-03-29 16:14:38 CST 6h left       Wed 2023-03-29 10:06:43 CST 1min 29s ago ua-timer.timer               ua-timer.service
Wed 2023-03-29 17:18:24 CST 7h left       n/a                         n/a          motd-news.timer              motd-news.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a                         n/a          dpkg-db-backup.timer         dpkg-db-backup.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a                         n/a          logrotate.timer              logrotate.service
Thu 2023-03-30 05:50:50 CST 19h left      n/a                         n/a          apt-daily.timer              apt-daily.service
Thu 2023-03-30 06:41:07 CST 20h left      n/a                         n/a          apt-daily-upgrade.timer      apt-daily-upgrade.service
Sun 2023-04-02 03:10:39 CST 3 days left   n/a                         n/a          e2scrub_all.timer            e2scrub_all.service
```

Como puedes ver, el `helloworld.timer` está funcionando y el próximo tiempo de activación es en 1 minuto y 46 segundos. Espera unos minutos y verifica el archivo de registro:

```sh
journalctl -u helloworld.service
```

Deberías ver la salida del comando `echo`:

```
Mar 29 10:10:02 ubuntu systemd[1]: Starting Hello World Service...
Mar 29 10:10:02 ubuntu echo[7942]: Hello World
Mar 29 10:10:02 ubuntu systemd[1]: helloworld.service: Deactivated successfully.
Mar 29 10:10:02 ubuntu systemd[1]: Finished Hello World Service.
```

Si quieres redirigir la salida a un archivo, puedes cambiar la línea `ExecStart` en el archivo de unidad de servicio a:

```sh
ExecStart=/bin/sh -c '/bin/echo "Hello World" >> /tmp/helloworld.log'
```

## Apéndice

### OnCalendar

`OnCalendar` es una opción en la sección `[Timer]` de un archivo de unidad de temporizador que especifica cuándo debe activarse el temporizador. La sintaxis para `OnCalendar` es la siguiente:

```
OnCalendar=
```

La expresión de calendario puede ser una expresión simple o compleja que especifica el horario para la tarea. La expresión completa es así:

```
díaDeLaSemana año-mes-día hora:minuto:segundo
```

- Día de la semana: `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`
- Año/Mes/Día: Usa números
- Hora/Minuto/Segundo: Usa números

Cada parte puede ser un rango, una lista, un intervalo, o `*` para coincidir con cualquier valor. Por ejemplo:

- `Mon..Fri`: Lunes a viernes
- `Mon,Fri`: Lunes y viernes
- `8..18/2`: 8:00 AM a 6:00 PM, cada 2 horas
- `*-*-1`: El primer día de cada mes

Cada parte puede omitirse. Por ejemplo:

- Para ejecutar una tarea cada hora, usa `OnCalendar=*:0`
- Para ejecutar una tarea a las 3:30 PM todos los días, usa `OnCalendar=15:30`
- Para ejecutar una tarea todos los lunes a las 9:00 AM, usa `OnCalendar=Mon 9:00`
- Para ejecutar una tarea cada 15 minutos, usa `OnCalendar=*:0/15`
- Para ejecutar una tarea todos los días laborables a las 8:00 AM, usa `OnCalendar=Mon..Fri 8:00`

Además de estas expresiones básicas, puedes usar expresiones más complejas que incluyen rangos, listas e intervalos. Aquí hay algunos ejemplos:

- Para ejecutar una tarea cada 2 horas entre las 8:00 AM y las 6:00 PM, usa `OnCalendar=8..18/2:0`
- Para ejecutar una tarea el día 15 de cada mes a las 10:00 AM, usa `OnCalendar=*-*-15 10:00`

También puedes usar las palabras clave especiales `minutely`, `hourly`, `daily`, `weekly`, `monthly` y `yearly` para especificar horarios comunes.

Siempre puedes validar tu expresión `OnCalendar` usando el comando `systemd-analyze`:

```sh
systemd-analyze calendar "Mon..Fri 8:00"
```

La salida mostrará la forma normalizada de la expresión y el próximo tiempo de activación:

```
  Original form: Mon..Fri 8:00
Normalized form: Mon..Fri *-*-* 08:00:00
    Next elapse: Thu 2023-03-30 08:00:00 CST
       (in UTC): Thu 2023-03-30 00:00:00 UTC
       From now: 18h left
```

En general, la opción `OnCalendar` proporciona una forma flexible y potente de programar tareas en Linux usando temporizadores systemd. Al comprender la sintaxis y usar las expresiones de calendario apropiadas, puedes automatizar tu sistema y ahorrar tiempo y esfuerzo.