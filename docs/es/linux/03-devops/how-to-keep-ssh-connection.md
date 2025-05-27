# Cómo mantener la conexión ssh abierta (Broken pipe)

Cuando usas ssh, a menudo encontrarás una conexión interrumpida. A veces simplemente sales de la ventana para hacer otro trabajo, y cuando regresas a la ventana de terminal, descubrirás que la conexión ssh se ha roto. En este punto, no puedes hacer nada directamente, pero después de unos segundos de espera, aparece el siguiente mensaje

```sh
Write failed: Broken pipe
```

Esta es una situación muy improductiva.

## Razón

ssh utiliza conexiones largas, por lo que cuando hay comunicación de datos, la conexión se mantendrá abierta, pero sin modificar la configuración, ssh se desconectará después de un período de tiempo sin comunicación de datos, causando así que ocurra el fenómeno anterior.

## Solución

Dado que la conexión se desconecta porque no hay comunicación de datos, ¿es posible que ssh genere alguna comunicación a intervalos regulares durante el tiempo de inactividad? La respuesta es sí. Y este es un problema para el cual tanto el lado del servidor como el cliente de ssh proporcionan soluciones.

### Configuración del lado del servidor

El servicio ssh del lado del servidor se llama sshd, por lo que su archivo de configuración es `/etc/ssh/sshd_config`, y solo necesitas modificar este archivo a:

```
ClientAliveInterval 60
ClientAliveCountMax 5
```

Donde `ClientAliveInterval` indica con qué frecuencia enviar un "latido" al cliente, y `ClientAliveCountMax` indica cuántas veces desconectar si no se recibe respuesta. Así que la configuración anterior significa: enviar un latido al cliente cada 60s, y desconectar cuando no se reciba respuesta 5 veces.

Reinicia el servicio sshd después de configurar: `systemctl restart sshd.service` o `service sshd restart`.

### Configuración del cliente

La configuración del cliente se encuentra en `/etc/ssh/ssh_config`, que es un archivo de configuración global. Si configuras solo para el usuario actual, también puedes modificar `~/.ssh/ssh_config` a:

```
TCPKeepAlive yes
ServerAliveInterval 60
ServerAliveCountMax 5
```

Los significados de los parámetros son casi los mismos que los establecidos en el lado del servidor.

### Solución temporal del lado del cliente

Además de modificar la configuración, el cliente también puede usar los siguientes parámetros para especificar un "latido" programado al iniciar una conexión

```sh
ssh -o ServerAliveInterval=60 root@xx.xx.xx.xx
```

## Resumen

Una vez que configures el "latido", ya no tendrás miedo de que ssh se desconecte sin razón.