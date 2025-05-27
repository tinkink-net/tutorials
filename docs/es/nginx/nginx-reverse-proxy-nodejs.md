# Configuración de Nginx con proxy inverso de Node.js

A menudo utilizamos varios frameworks para Node.js (como koa / egg / nest, etc.) para implementar backends web. Cuando lanzamos formalmente, aunque Node.js puede proporcionar servicios directamente al mundo exterior, a menudo usamos nginx como una capa de acceso adicional al frente, teniendo en cuenta HTTPS, registro, servicios de archivos estáticos, balanceo de carga, etc., y usamos nginx para acceder a los servicios de Node.js. En este caso, necesitas configurar el proxy inverso de nginx.

## Configuración básica

Para hacer que la configuración de nginx sea más manejable, normalmente usamos un archivo de configuración separado para cada servicio web. Esto requiere que el archivo de configuración principal de nginx contenga cada archivo de configuración individual.

Encuentra el archivo de configuración principal de nginx (generalmente ubicado en `/etc/nginx.conf`), y en la sección `http{}`, encuentra o añade la configuración `include`.

```
http {
    # ...

    include /etc/nginx/conf.d/*.conf;
}
```

En este punto es posible configurar un archivo de configuración separado para el sitio Node.js, como `/etc/nginx/conf.d/tinkink.net.conf`, que contiene lo siguiente.

```
server {
    listen 80;
    server_name tinkinkink.net;

    error_log /var/log/nginx/tinkinkink_error.log;
    access_log /var/log/nginx/tinkink_accss.log;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Native address of Node.js, note the port
        proxy_pass http://localhost:3000;
    }
}
```

Usa `nginx -t` para probar el archivo de configuración, y si es correcto, usa `nginx -s reload` para recargar la configuración. Después de que se realice la resolución de dominio, puedes acceder al servicio Node.js a través del nombre de dominio en `server_name`.

## Configurando HTTPS

Si necesitas configurar el acceso HTTPS, entonces necesitas escuchar en el puerto 443 de nuevo y configurar el certificado.

```
server {
    listen 80 ;
    listen 443 ssl;
    server_name tinkinkink.net;

    https_certificate /etc/nginx/ssl/tinkink.net.crt;
    https_certificate_key /etc/nginx/ssl/tinkink.net.key;

    # ...
}
```

## Configurando el balanceo de carga

Si el servicio Node.js no está en la misma máquina que nginx, solo necesitas cambiar la dirección de `proxy_pass` a la dirección LAN del servidor Node.js. Sin embargo, si hay múltiples servidores Node.js, necesitarás configurar el balanceo de carga.

```
upstream nodejs {
    server 192.168.0.2:3000;
    server 192.168.0.2:3001;
    server 192.168.0.3:3000;
    server 192.168.0.3:3001;
}

server {
    # ...

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Native address of Node.js, note the port
        proxy_pass http://nodejs;
    }
}
```

El `upstream` anterior define un grupo de balanceo de carga llamado `nodejs` que contiene las direcciones de múltiples servidores Node.js. En `proxy_pass` solo necesitas especificar el nombre del grupo de balanceo de carga.

Además de especificar múltiples direcciones de servidor, `upstream` también puede especificar pesos o algoritmos de balanceo de carga, como

```
upstream nodejs {
    server 192.168.0.2:3000 weight=1;
    server 192.168.0.2:3001 weight=2;
    server 192.168.0.3:3000 weight=1;
    server 192.168.0.3:3001 weight=2;
}
```

Por defecto, las solicitudes se asignan a diferentes servicios Node.js uno por uno en orden, y se descartan si uno de ellos se cuelga. Esta configuración anterior permitirá que ambos servidores acepten más solicitudes en el puerto `3001`.

Otras políticas.

- `ip_hash`: cada solicitud se asigna por el resultado hash de la ip accedida, de modo que si la IP del usuario sigue siendo la misma, tendrá un acceso fijo a un servidor backend
- `fair`: asigna solicitudes según el tiempo de respuesta del servidor backend, dando prioridad a aquellos con tiempo de respuesta corto
- `url_hash`: asigna solicitudes según el resultado hash de la url accedida, de modo que cada url se dirige al mismo servidor backend

Uso de políticas.

```
upstream nodejs {
    # Write the policy name
    ip_hash
    server 192.168.0.2:3000;
    server 192.168.0.2:3001;
    server 192.168.0.3:3000;
    server 192.168.0.3:3001;
}
```

## Resumen

En general, configurar un proxy inverso Node.js con nginx es relativamente simple, centrándose en el elemento de configuración `proxy_pass`, que especifica el proxy inverso. Este método también es aplicable para hacer proxy inverso a servicios backend HTTP en otros lenguajes y frameworks.