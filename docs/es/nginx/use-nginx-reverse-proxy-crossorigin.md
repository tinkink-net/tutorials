# Cómo resolver problemas de origen cruzado (CORS) con proxy inverso Nginx

## ¿Qué es el origen cruzado?

El intercambio de recursos de origen cruzado (CORS) es una característica de seguridad implementada por los navegadores web para evitar que sitios web maliciosos realicen solicitudes a un dominio diferente al que sirvió la página web original. Esto es importante para proteger los datos del usuario y prevenir el acceso no autorizado a los recursos.

Cuando una página web realiza una solicitud a un dominio diferente, el navegador verifica si el servidor en ese dominio permite solicitudes de origen cruzado. Si no lo permite, el navegador bloquea la solicitud y genera un error CORS.

```
Access to XMLHttpRequest at 'http://example.com/api/data' from origin 'http://yourdomain.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## ¿Por qué importan los problemas de origen cruzado?

Los problemas de origen cruzado son importantes porque pueden impedir que las solicitudes legítimas sean procesadas, lo que lleva a funcionalidades rotas en aplicaciones web.

Por ejemplo, si estás visitando una página web, y luego la página web realiza una solicitud AJAX a un dominio diferente, como tu servicio de banca en línea o sitio de compras en línea. Sin la protección de CORS, la página web maliciosa podría potencialmente acceder a la información de tu cuenta bancaria como tu saldo, historial de transacciones y otros datos sensibles, o incluso realizar transacciones no autorizadas en tu nombre.

## Cómo resolver problemas de origen cruzado con proxy inverso Nginx

Primero, debes garantizar que tu demanda sea razonable. Como discutimos anteriormente, los problemas de origen cruzado son una característica de seguridad implementada por los navegadores web para proteger a los usuarios de sitios web maliciosos.

Usar el proxy inverso Nginx para resolver problemas de origen cruzado es una práctica común. Al configurar Nginx para agregar los encabezados CORS apropiados a la respuesta, puedes permitir solicitudes de origen cruzado desde dominios específicos o todos los dominios.

Un ejemplo de configuración de Nginx para resolver problemas de origen cruzado es el siguiente:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://backend_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # Add CORS headers
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';

        # Handle preflight requests
        if ($request_method = OPTIONS) {
            add_header 'Access-Control-Max-Age' 86400;
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}
```

> Si estás interesado en cómo configurar el proxy inverso Nginx, consulta [este artículo](/es/nginx/nginx-reverse-proxy-nodejs.html).

En este ejemplo, estamos permitiendo solicitudes de origen cruzado desde cualquier dominio (`*`). Puedes reemplazar `*` con un dominio específico si deseas restringir el acceso solo a ese dominio.

El encabezado `Access-Control-Allow-Methods` especifica qué métodos HTTP están permitidos para solicitudes de origen cruzado, y el encabezado `Access-Control-Allow-Headers` especifica qué encabezados están permitidos en la solicitud.

El encabezado `Access-Control-Max-Age` especifica cuánto tiempo pueden ser almacenados en caché los resultados de una solicitud de preflight por el navegador.

El bloque `if` maneja las solicitudes de preflight, que son enviadas por el navegador antes de realizar una solicitud de origen cruzado para verificar si el servidor lo permite. Si el método de solicitud es `OPTIONS`, devolvemos una respuesta `204 No Content` con los encabezados CORS apropiados.

Puedes ajustar la configuración según tus necesidades. Ten especial cuidado con `Access-Control-Allow-Headers`, si estás utilizando encabezados personalizados en tus solicitudes, necesitas agregarlos a este encabezado.

## Conclusión

En conclusión, los problemas de origen cruzado son una característica de seguridad importante implementada por los navegadores web para proteger a los usuarios de sitios web maliciosos. Sin embargo, también pueden causar que solicitudes legítimas sean bloqueadas. Al usar el proxy inverso Nginx para agregar los encabezados CORS apropiados a la respuesta, puedes permitir solicitudes de origen cruzado desde dominios específicos o todos los dominios.

Esta es una práctica común en el desarrollo web y puede ayudar a resolver problemas de origen cruzado de manera efectiva.

Ten en cuenta que permitir solicitudes de origen cruzado desde todos los dominios puede exponer tu aplicación a riesgos de seguridad, por lo que es importante considerar cuidadosamente las implicaciones de esta configuración y restringir el acceso solo a dominios confiables siempre que sea posible.