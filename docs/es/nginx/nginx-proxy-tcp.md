# Cómo Configurar NGINX como un Proxy TCP

Es posible que sepas que NGINX es un poderoso servidor web y servidor proxy inverso, lo usamos para servir solicitudes HTTP, incluyendo archivos estáticos, contenido dinámico y proxy inverso a servicios backend. También puede hacer proxy de conexiones WebSocket.

> En caso de que no estés familiarizado con el proxy de NGINX, consulta [Configuración de Nginx con proxy inverso de Node.js](/es/nginx/nginx-reverse-proxy-nodejs.html).

Sin embargo, NGINX también puede ser utilizado como un servidor proxy TCP, lo cual es útil para hacer proxy de protocolos no HTTP como MySQL, Redis y otros servicios basados en TCP. Este artículo te guiará a través del proceso de configuración de NGINX como un proxy TCP.

## Prerrequisitos

Antes de comenzar, asegúrate de tener los siguientes prerrequisitos:

- Un servidor con NGINX instalado. Puedes instalar NGINX usando tu gestor de paquetes o descargarlo desde el [sitio web oficial](https://nginx.org/en/download.html).
- Conocimiento básico de los archivos de configuración de NGINX y cómo editarlos.
- Acceso al archivo de configuración de NGINX, generalmente ubicado en `/etc/nginx/nginx.conf` o `/etc/nginx/conf.d/default.conf`.
- El servicio TCP que deseas hacer proxy (por ejemplo, MySQL, Redis) debe estar ejecutándose y ser accesible en el servidor.

## Paso 1: Instalar NGINX con el Módulo TCP

Asegúrate de que tu instalación de NGINX incluya el módulo `ngx_stream_core_module`, que es necesario para el proxy TCP. Puedes verificar si este módulo está incluido ejecutando:

```bash
nginx -V 2>&1 | grep --color=auto stream
```

Si la salida incluye `--with-stream`, entonces tu instalación de NGINX soporta proxy TCP. Si no, es posible que necesites instalar una versión de NGINX que incluya este módulo.
Si estás usando un gestor de paquetes, puedes instalar NGINX con el módulo stream ejecutando:

```bash
# Para Debian/Ubuntu
sudo apt-get install nginx-extras
```

o

```bash
# Para CentOS/RHEL
sudo yum install nginx-mod-stream
```

Si estás compilando NGINX desde el código fuente, asegúrate de incluir la opción `--with-stream` durante el paso de configuración.

Si estás usando una imagen de Docker, puedes usar la imagen oficial de NGINX con el módulo stream incluido.

Por ejemplo, puedes usar el siguiente Dockerfile:

```dockerfile
FROM nginx:latest
RUN apt-get update && apt-get install -y nginx-extras
```

## Paso 2: Configurar NGINX para Proxy TCP

Abre tu archivo de configuración de NGINX, generalmente ubicado en `/etc/nginx/nginx.conf` o `/etc/nginx/conf.d/default.conf`, y añade el siguiente bloque de configuración. Ten en cuenta que el bloque `stream` debe estar al mismo nivel que el bloque `http` (no dentro de él):

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;
    }
}
```

En este ejemplo, estamos configurando NGINX para escuchar en el puerto `3306` (el puerto predeterminado de MySQL) y hacer proxy del tráfico a un servidor MySQL backend que se ejecuta en `127.0.0.1:3306`.

Puedes reemplazar `127.0.0.1:3306` con la dirección y el puerto de tu servidor MySQL real.

Después de añadir la configuración, guarda el archivo y prueba la configuración de NGINX para detectar errores de sintaxis:

```bash
sudo nginx -t
```

Si la prueba de configuración es exitosa, recarga NGINX para aplicar los cambios:

```bash
sudo systemctl reload nginx
```

## Configuración de Timeout y Balanceo

También puedes configurar timeouts y balanceo de carga para tu proxy TCP. Por ejemplo, para establecer un timeout de 30 segundos y habilitar el balanceo de carga con dos servidores backend, puedes modificar la configuración de la siguiente manera:

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;

        proxy_connect_timeout 30s;
        proxy_timeout 15s;
        proxy_next_upstream_timeout 1s;
        proxy_next_upstream_tries 2;

        # Configurar el registro de acceso para el proxy TCP
        access_log /var/log/nginx/tcp-access.log;
    }
}
```

> **Importante**: El bloque `stream` debe colocarse fuera del bloque `http` y al mismo nivel que el bloque `http` en tu configuración de NGINX. Colocarlo dentro del bloque `http` resultará en errores de configuración.

Esta configuración establece un timeout de conexión de 30 segundos, un timeout de proxy de 15 segundos (este es el tiempo después del cual se cerrará una conexión si no hay actividad), y permite dos reintentos con un timeout de 1 segundo al intentar conectarse al siguiente servidor upstream si el primero falla.

Para el balanceo de carga, puedes añadir múltiples servidores backend en el bloque `upstream`:

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
        server 127.0.0.1:3307;  # Réplica de MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;
    }
}
```

Esta configuración distribuirá las conexiones entrantes a ambos servidores MySQL en el bloque `upstream`.

Puedes consultar [Configuración de Nginx con proxy inverso de Node.js](/es/nginx/nginx-reverse-proxy-nodejs.html) para más detalles sobre el balanceo.

## El Protocolo Proxy

Si necesitas pasar la dirección IP original del cliente al servidor backend, puedes habilitar el Protocolo Proxy. Esto es útil para aplicaciones que necesitan conocer la dirección IP original del cliente.

Para habilitar el Protocolo Proxy, puedes modificar el bloque `server` de la siguiente manera:

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;

        proxy_protocol on;
    }
}
```

Esta configuración habilita el Protocolo Proxy para el proxy TCP, permitiendo que el servidor backend reciba la dirección IP original del cliente.

Lo que está sucediendo aquí es que NGINX antepondrá la cabecera del Protocolo Proxy a la conexión TCP, que contiene la dirección IP y el puerto original del cliente. Aquí hay un ejemplo de cómo se ve la cabecera del Protocolo Proxy:

```
PROXY TCP4 192.168.1.100 192.168.1.200 56324 3306
```

Esta cabecera indica que la conexión está utilizando TCP sobre IPv4, con la dirección IP original del cliente `192.168.1.100` y el puerto original del cliente `56324`. (La dirección IP del servidor backend es `192.168.1.200` y el puerto del servidor backend es `3306`.)

El servidor backend debe estar configurado para entender y analizar esta cabecera. MySQL en sí no soporta nativamente el Protocolo Proxy, pero puedes usar proxies como ProxySQL o herramientas como HAProxy que sí lo soportan.

Para la mayoría de los servicios backend, necesitarás consultar su documentación para ver cómo habilitar el soporte del Protocolo Proxy. Algunos servicios comunes que soportan el Protocolo Proxy incluyen:

- HAProxy
- Traefik
- Redis (con la configuración adecuada)
- PostgreSQL (con ciertas extensiones)
- Algunas compilaciones personalizadas de MySQL/MariaDB

Asegúrate de probar la configuración después de habilitar el Protocolo Proxy para asegurar que el servidor backend está recibiendo la dirección IP correcta del cliente.

## Soporte SSL/TLS para Proxy TCP

NGINX también puede hacer proxy de conexiones TCP cifradas usando SSL/TLS. Esto es útil cuando necesitas asegurar la conexión entre los clientes y tu servidor proxy. Aquí te mostramos cómo configurar SSL/TLS para tu proxy TCP:

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;
    }

    server {
        listen 3307 ssl;
        proxy_pass backend;

        ssl_certificate /path/to/certificate.crt;
        ssl_certificate_key /path/to/private.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
    }
}
```

Esta configuración crea un proxy habilitado para SSL/TLS que escucha en el puerto 3307 y reenvía el tráfico descifrado al servidor MySQL backend que se ejecuta en el puerto 3306. Los clientes se conectan al proxy usando SSL/TLS, mientras que la conexión entre el proxy y el servidor backend puede ser no cifrada (típicamente para conexiones locales) o cifrada dependiendo de tus necesidades.

> Nota: También puedes elegir dejar que el servidor backend maneje la terminación SSL/TLS si lo soporta, en cuyo caso no necesitarías configurar SSL/TLS en el proxy NGINX.

## Conclusión

En esta guía, cubrimos cómo configurar un proxy TCP con NGINX, incluyendo balanceo de carga y el Protocolo Proxy. Siguiendo estos pasos, puedes gestionar eficazmente el tráfico TCP y asegurar que tus servicios backend reciban la información necesaria del cliente.
Puedes usar NGINX como un poderoso servidor proxy TCP para manejar varios protocolos y servicios, proporcionando flexibilidad y escalabilidad para tus aplicaciones.

## Recursos Adicionales

- [Documentación de NGINX](https://nginx.org/en/docs/)
- [Módulo Stream de NGINX](https://nginx.org/en/docs/stream/ngx_stream_core_module.html)
- [Balanceo de Carga de NGINX](https://nginx.org/en/docs/http/load_balancing.html)