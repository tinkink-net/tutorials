# Fundamentos de Redes en Linux

<Validator lang="es" :platform-list="['Ubuntu 24.10']" date="2025-05-23" />

Como administrador de sistemas Linux o desarrollador, a menudo te encontrarás trabajando con configuraciones de red. Exploremos los conceptos y herramientas esenciales que necesitarás en tu trabajo diario.

## Comenzando con las Interfaces de Red

Cuando examinas por primera vez la configuración de red en Linux, te encontrarás con interfaces de red. Piensa en ellas como los puntos de conexión entre tu computadora y la red - similar a cómo los puertos de un switch conectan diferentes dispositivos. Normalmente verás interfaces nombradas como `eth0` para tu primera tarjeta Ethernet, `wlan0` para conexiones inalámbricas, y `lo` para la interfaz de loopback que tu sistema usa para comunicarse consigo mismo.

Cuando trabajas con interfaces de red, frecuentemente usarás comandos.

## El Comando ip link

El comando `ip link show` es tu herramienta principal para verificar el estado de todas las interfaces de red en tu sistema. Muestra no solo las interfaces, sino también su estado operacional y direcciones físicas/MAC. Lo encontrarás particularmente útil cuando:

- Solucionas problemas de conectividad de red
- Configuras nuevas interfaces de red
- Verificas si las tarjetas de red son reconocidas correctamente
- Compruebas si las interfaces están UP o DOWN

```bash
ip link show
```

Cuando ejecutas este comando, verás una salida como esta:

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
```

**¿Qué significa esta salida?** Analicémosla:

Las partes importantes a notar son los nombres de las interfaces (`lo` y `eth0`) y sus estados (`UP` o `DOWN`). Si necesitas información más detallada sobre las direcciones IP asignadas a estas interfaces, puedes usar:

### Verificando Direcciones IP

El comando `ip addr show` es más completo que `ip link` ya que muestra tanto las interfaces como sus direcciones IP asignadas. Este comando es esencial cuando necesitas:

- Verificar asignaciones de direcciones IP
- Comprobar direcciones IP duplicadas
- Depurar problemas relacionados con DHCP
- Confirmar configuraciones de máscara de subred

Una vez que hayas identificado tus interfaces, querrás saber qué direcciones IP tienen. El comando `ip addr show` proporciona esta información:

```bash
ip addr show
```

Cuando ejecutas este comando, verás algo como:
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0
    inet6 fe80::215:5dff:fe01:ca05/64 scope link
```

Decodifiquemos esta salida:
- `inet 127.0.0.1/8`: La dirección de loopback con su máscara de subred
- `inet 192.168.1.100/24`: Tu dirección IP real y subred
- `scope global`: Indica que esta dirección es válida para uso con el mundo exterior
- `dynamic`: Muestra que esta dirección fue asignada por DHCP

También puedes usar `ifconfig` para obtener información similar, pero está obsoleto en favor de `ip`:

> Como `ifconfig` está obsoleto, es posible que no lo encuentres instalado por defecto en sistemas modernos. Si lo necesitas, puedes instalar el paquete `net-tools`.

```bash
ifconfig
```

Cuando ejecutas este comando, verás una salida como esta:

```
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet

```

También puedes ver la dirección MAC de la interfaz, IP y otros detalles.

## Administrando Conexiones de Red

### Configuración de IP Estática vs Dinámica

Al configurar un servidor o estación de trabajo, una de las primeras decisiones que enfrentarás es si usar direccionamiento IP estático o dinámico.

Si estás configurando un servidor, probablemente querrás una IP estática. Así es como puedes hacerlo:

Al configurar una dirección IP estática, el comando `ip addr add` te da control inmediato. La sintaxis sigue el patrón `ip addr add DIRECCIÓN_IP/MÁSCARA_SUBRED dev INTERFAZ`. Por ejemplo:

```bash
sudo ip addr add 192.168.1.100/24 dev eth0
```

Este comando es perfecto para:
- Pruebas rápidas de configuraciones de red
- Reparaciones de emergencia de red
- Asignación temporal de IP durante la solución de problemas
- Agregar direcciones IP secundarias a una interfaz

> Consejos, para eliminar una dirección IP, usa: `sudo ip addr del DIRECCIÓN_IP dev INTERFAZ`, puedes usar `ip --help` para ver todas las opciones disponibles.

Pero recuerda, esta configuración no sobrevivirá a un reinicio. Para una configuración permanente en sistemas Ubuntu o Debian modernos, querrás editar la configuración de netplan, que a menudo se encuentra en `/etc/netplan/01-netcfg.yaml` o similar. Aquí hay un ejemplo de una configuración estática:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
```

o usar dhcp:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: true
```

Después de editar el archivo, aplica los cambios con:

```bash
sudo netplan apply
```

## Herramientas Esenciales para Solución de Problemas de Red

Cuando las cosas van mal (y lo harán), necesitarás una sólida comprensión de estas herramientas de diagnóstico:

### Pruebas de Conectividad de Red

Comencemos con lo básico - el comando `ping`. Puede parecer simple, pero es increíblemente potente:

El comando `ping` puede parecer básico, pero es increíblemente versátil. La bandera `-c` limita el número de paquetes enviados, lo cual es útil para scripts y pruebas rápidas:

```bash
ping -c 4 google.com  # Envía exactamente 4 paquetes y se detiene
```

Cuando ejecutas el comando ping, verás una salida como esta:
```
PING google.com (142.250.189.78) 56(84) bytes of data.
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=1 ttl=116 time=14.3 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=2 ttl=116 time=13.9 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=3 ttl=116 time=14.1 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=4 ttl=116 time=14.0 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 13.915/14.075/14.284/0.151 ms
```

Esta salida te indica:
- La dirección IP remota (142.250.189.78)
- Tiempo de ida y vuelta para cada paquete (por ejemplo, 14.3 ms)
- Porcentaje de pérdida de paquetes (0% en este caso)
- Estadísticas sobre variaciones de tiempo

Usa ping para:
- Pruebas básicas de conectividad
- Medición de latencia de red
- Verificación de resolución DNS
- Monitoreo de disponibilidad de host

¿Quieres saber por qué una conexión es lenta o falla? Ahí es donde entra `traceroute`:

Cuando necesitas entender la ruta que toma tu tráfico, `traceroute` se vuelve invaluable:

```bash
traceroute google.com
```

Al usar traceroute, podrías ver:
```
traceroute to google.com (142.250.189.78), 30 hops max, 60 byte packets
 1  _gateway (192.168.1.1)  0.344 ms  0.313 ms  0.307 ms
 2  isp-router.net (10.0.0.1)  12.132 ms  12.125 ms  12.119 ms
 3  core-router.isp.net (172.16.0.1)  13.225 ms  13.219 ms  13.213 ms
 4  google-peer.isp.net (192.0.2.1)  13.376 ms  13.370 ms  13.364 ms
 5  lhr25s35-in-f14.1e100.net (142.250.189.78)  14.090 ms  14.084 ms  14.078 ms
```

Cada línea representa un "salto" en tu conexión:
- El número al inicio es el conteo de saltos
- El nombre de host y dirección IP de cada router
- Tres mediciones de tiempo mostrando la latencia a ese salto

Esta herramienta te ayuda a:
- Identificar cuellos de botella en la red
- Solucionar problemas de enrutamiento
- Verificar rutas de red
- Detectar puntos de congestión de red

### Resolución DNS

Cuando necesitas verificar si un nombre de dominio se resuelve correctamente, `dig` es tu mejor amigo. Es más potente que `nslookup` y proporciona información detallada sobre consultas DNS:

```bash
dig google.com
```

Cuando ejecutas este comando, verás una salida como esta:
```
; <<>> DiG 9.16.1-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
;; QUESTION SECTION:
;google.com.			IN	A
;; ANSWER SECTION:
google.com.		299	IN		142.250.189.78
;; Query time: 14 msec
;; SERVER:  8.8.8.8#53
;; WHEN: Wed Oct 25 12:34:56 UTC 2023
;; MSG SIZE  rcvd: 55
```

Esta salida proporciona:
- El servidor DNS utilizado para la consulta (8.8.8.8)
- El tiempo que tomó obtener una respuesta (14 msec)
- El tamaño del mensaje de respuesta (55 bytes)

### Análisis de Conexión

Para problemas más complejos, necesitarás profundizar con herramientas como `ss` y `netstat`:

El comando `ss` es el reemplazo moderno de netstat, proporcionando estadísticas detalladas de socket:

```bash
ss -tuln  # Muestra puertos TCP(-t) y UDP(-u) en escucha(-l) numéricos(-n)
```

Al ejecutar el comando ss:
```
Netid  State    Recv-Q  Send-Q   Local Address:Port    Peer Address:Port
tcp    LISTEN   0       128      0.0.0.0:22            0.0.0.0:*
tcp    LISTEN   0       128      0.0.0.0:80            0.0.0.0:*
tcp    ESTAB    0       0        192.168.1.100:22      192.168.1.10:52414
```

Esta salida muestra:
- `LISTEN`: Servicios esperando conexiones
- `ESTAB`: Conexiones establecidas
- Pares de dirección:puerto locales y remotos
- Longitudes de cola para datos entrantes/salientes

Este comando es esencial para:
- Auditoría de seguridad
- Depuración de servicios
- Resolución de conflictos de puertos
- Análisis de estado de conexión

## Conclusión

Todavía hay muchos más temas y herramientas para explorar en redes Linux, como firewalls (iptables/nftables), VPNs, filtrado de paquetes y ajuste de rendimiento de red. Sin embargo, dominar los conceptos básicos te dará una base sólida sobre la cual construir.

Recuerda, dominar las redes en Linux es un viaje, no un destino. Comienza con lo básico, practica regularmente y gradualmente explora temas más avanzados a medida que crecen tus necesidades.