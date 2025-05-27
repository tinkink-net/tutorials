# Cómo usar Nginx para alojar un servidor de archivos estáticos

Nginx es un servidor web que se puede utilizar para alojar archivos estáticos. Este tutorial describe cómo usar Nginx para alojar un servidor de archivos estáticos.

Después de completar este tutorial, podrás:

- Navegar por directorios
- Acceder a subdirectorios y archivos
- Descargar archivos a través del navegador

## Configurar Nginx

Primero, necesitas tener Nginx instalado. Si no has instalado Nginx, puedes consultar otros tutoriales.

Después de instalar Nginx, puedes configurarlo para alojar un servidor de archivos estáticos. Revisa `/etc/nginx/nginx.conf` para ver si el archivo de configuración está dividido en múltiples archivos. Puedes usar el siguiente comando para abrirlo:

```
vi /etc/nginx/nginx.conf
```

Si puedes ver `include /etc/nginx/conf.d/*.conf;` en la sección `http`, significa que el archivo de configuración está dividido en múltiples archivos.

Puedes usar el siguiente comando para crear un nuevo archivo de configuración:

```
vi /etc/nginx/conf.d/static-file-server.conf
```

> Nota: Es posible que necesites usar `sudo` para ejecutar el comando anterior. `sudo vi /etc/nginx/conf.d/static-file-server.conf`

Luego, agrega la siguiente configuración al archivo:

```
server {
    listen       80;
    server_name  static-file-server.tinkink.net; # Cambia a tu nombre de dominio

    root /path/to/your/static/files; # Cambia al directorio de tus archivos estáticos

    autoindex on; # Habilita la lista de directorios

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Aquí, `listen` especifica el puerto de escucha, `server_name` especifica el nombre de dominio o dirección IP, `root` especifica el directorio de archivos estáticos, y `autoindex` habilita la lista de directorios.

`location /` coincide con la ruta raíz, `try_files` especifica los archivos a probar, y devuelve un error 404 si el archivo no se encuentra.

## Reiniciar Nginx

Después de configurar Nginx, necesitas reiniciarlo para que la configuración surta efecto:

```
sudo systemctl restart nginx
```

o

```
sudo service nginx restart
```

## Acceder al sitio

Ahora puedes acceder al sitio a través del navegador, por ejemplo: `http://static-file-server.tinkink.net`

## Permisos

Asegúrate de que los permisos del directorio estén configurados correctamente para evitar problemas de seguridad. Como nginx puede usar un usuario único `nginx` para ejecutarse, debes establecer el propietario y grupo del directorio a este grupo de usuarios. Puedes usar el siguiente comando para establecer los permisos:

```
chown -R nginx:nginx /path/to/your/static/files
```

Además, si el directorio de archivos estáticos está ubicado en el directorio home del usuario, también necesitas asegurarte de que el directorio home y el directorio de archivos estáticos tengan los permisos de acceso correctos. Es un poco complicado, por lo que recomendaré que muevas el directorio de archivos estáticos fuera del directorio home.

Si usas constantemente directorios home, necesitarás agregar el usuario `nginx` a tu grupo de usuarios. Puedes usar el siguiente comando:

```
usermod -a -G {username} nginx
```

Luego, necesitas agregar permisos al grupo. Puedes usar el siguiente comando:

```
chmod g+rwx /home/{username}
```

> Nota: Reemplaza `{username}` con tu nombre de usuario.

Si aún no funciona, puedes intentar desactivar SELinux. Puedes usar el siguiente comando:

```
sudo setenforce 0
```

Si ahora funciona, puedes desactivar permanentemente SELinux. Abre el archivo `/etc/selinux/config` y cambia `SELINUX=enforcing` a `SELINUX=disabled`, luego guarda y reinicia el sistema.

## Conclusión

Configurar un servidor de archivos estáticos con Nginx es fácil, pero si quieres poner los archivos en el directorio home, puede ser un poco complicado.