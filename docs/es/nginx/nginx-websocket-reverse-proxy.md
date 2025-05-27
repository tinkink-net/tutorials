# Configuración de Proxy Inverso WebSocket en Nginx

WebSocket es un protocolo de comunicación bidireccional en tiempo real para aplicaciones Web basado en el protocolo HTTP. Desde su lanzamiento, un número creciente de navegadores y software del lado del servidor han comenzado a soportar WebSocket.

Cuando usamos nginx como capa de acceso HTTP, encontramos que la comunicación WebSocket falla por defecto. Esto se debe a que nginx no está configurado para soportar WebSockets por defecto, y requiere configuración adicional para soportar WebSockets.

## Detalles del protocolo de negociación WebSocket

Cuando un cliente inicia una solicitud WebSocket, primero intenta sugerir una conexión, y la dirección de solicitud utilizada en este punto no es una dirección normal que comienza con `http://` o `https://`, sino una dirección que comienza con `ws://` (sin cifrar con TLS y correspondiente a HTTP) o `wss://` (cifrado con TLS y correspondiente a HTTPS).

Tomando `ws://example.com/websocket` como ejemplo, la cabecera de la solicitud es la siguiente.

```
GET /websocket HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Version: 13
```

Como puedes ver, la cabecera de la solicitud es muy similar a la cabecera de solicitud HTTP normal, excepto por algunos campos adicionales.

- `Upgrade`: debe ser `websocket`, indicando que el protocolo necesita ser actualizado a WebSocket para la comunicación
- `Connection`: debe ser `Upgrade`, indicando que la conexión necesita ser actualizada
- `Sec-WebSocket-Key`: debe ser una cadena aleatoria, utilizada para la autenticación del protocolo de negociación, el servidor también devolverá una cadena similar

Cabecera de respuesta.

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

Después de tal negociación, ambas partes pueden establecer una conexión WebSocket para comunicación bidireccional en tiempo real.

## Configuración de Proxy Inverso WebSocket

Para que nginx haga proxy inverso de WebSockets, necesitas agregar explícitamente las cabeceras `Upgrade` y `Connection`.

```
## Si no hay cabecera Upgrade, entonces $connection_upgrade es close, de lo contrario es upgrade
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
    ...
    location /websocket {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # Estas dos líneas son la clave
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

Con la configuración anterior, nginx podrá hacer proxy de solicitudes WebSocket correctamente.

Si tienes múltiples servidores backend, puedes definir múltiples servidores backend usando `upstream` y usar `proxy_pass` en `location` para especificar el servidor backend.

```
upstream backend {
    192.168.3.1:3000;
    192.168.3.2:300;
}

map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
close; }

server {
    ...
    location /websocket {
        proxy_pass http://upstream;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # Estas dos líneas son la clave
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

## Resumen

Lo más importante es configurar las cabeceras `Upgrade` y `Connection` cuando haces proxy inverso.