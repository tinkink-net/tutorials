# Configuración de HTTPS en Nginx

## Conocimientos Básicos

HTTPS es una conexión HTTP cifrada que utiliza un protocolo de capa de transporte cifrado para proteger la seguridad de los datos. Específicamente para el proceso de cifrado, HTTPS se puede dividir en dos fases.

1. el proceso de negociación del handshake utiliza un algoritmo de cifrado asimétrico para generar la clave
2. el proceso de transporte utiliza un algoritmo de cifrado simétrico para cifrar los datos

En el proceso de negociación del handshake utilizando algoritmo asimétrico, el servidor necesita emitir una clave pública firmada por una CA autorizada, también llamada certificado. Correspondiente a esto, el servidor también tiene una clave privada.

Así que para usar HTTPS, el servidor necesita proporcionar un certificado, generalmente con un sufijo de `.cer` o `.crt`, y una clave privada correspondiente, generalmente seguida de `.key`.

La obtención del certificado HTTPS se puede hacer utilizando los servicios de varios proveedores de servicios de certificados, tanto de pago como gratuitos, tanto puramente manuales como mediante scripts automatizados, consulte otros materiales.

## Configuración Básica

Al configurar HTTPS con nginx, es muy simple si no tienes requisitos adicionales, solo necesitas configurar.

1. escuchar en el puerto 443 con el protocolo SSL
2. usar `server_name` para especificar el nombre de dominio, que debe coincidir con el nombre de dominio del certificado
3. usar `ssl_certificate` para especificar la ruta del certificado
4. usar `ssl_certificate_key` para especificar la ruta de la clave privada

```
server {
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;
}
```

Esto permitirá el acceso HTTPS.

## Redirección HTTP

La configuración anterior no funciona si el usuario está accediendo mediante el protocolo HTTP. Para que el protocolo HTTP también sea accesible, es necesario añadir una configuración de redirección. Hay dos ideas para la configuración específica.

La primera es configurar un `server` separado para soportar el acceso HTTP.

```
server {
    listen 80;
    server_name www.xxx.com;
    return 301 https://$host$request_uri;
}
```

Segunda, en el mismo `server`, usar `rewrite` para redirigir.

```
server {
    listen 80;
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;

    if ($scheme ! = "https") {
        rewrite ^ https://$host$request_uri permanent;
    }
}
```

## Problemas comunes

### El certificado es válido, pero el navegador dice que no es seguro

Hay varias razones por las que el navegador puede indicar inseguridad.

1. el certificado raíz/certificado intermedio de la autoridad emisora del certificado no es confiable
2. El mecanismo de seguridad del certificado está obsoleto y el navegador/sistema operativo ya no lo considera seguro
3. La cadena de certificados está incompleta

Si el certificado se solicita a una autoridad válida, normalmente los problemas de 1 y 2 no ocurrirán, y la mayor posibilidad es que la cadena de certificados esté incompleta.

Generalmente, un certificado seguro tendrá un certificado intermedio y un certificado raíz asociados además del propio certificado. La mayoría de los sistemas operativos/navegadores tienen un certificado raíz común incorporado, pero los certificados intermedios pueden no estar siempre incorporados. Cuando el sistema operativo/navegador no puede encontrar el certificado intermedio, puede indicar que no es seguro.

En este caso, necesitas fusionar nuestro certificado con el certificado intermedio, y luego usar el certificado fusionado para configurar el servidor.

Método de operación específico.

- Si el certificado aplicado tiene un certificado fusionado (como `fullchain.crt` u otros archivos), entonces puedes usarlo directamente
- Si el certificado aplicado no tiene un certificado fusionado, necesitas fusionar el certificado aplicado con el certificado intermedio, abrir los dos archivos con cualquier editor de texto, y luego pegar los contenidos de los dos archivos de certificado juntos, con el certificado del servidor delante y el certificado intermedio detrás, y luego guardarlo como un nuevo archivo.