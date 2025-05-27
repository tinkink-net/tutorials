# Entender la Zona Horaria en MySQL

## Conocimientos Básicos: Fecha y Hora, Timestamp y Zona Horaria

En la mayoría de los escenarios, la fecha y hora se refieren a la hora actual en la zona horaria local. Por ejemplo, cuando ves `"2024-06-15 12:00:00"`, significa que ahora son las 12:00:00 del 15 de junio de 2024 en tu zona horaria local.

Sin embargo, cuando tu aplicación sirve a usuarios de diferentes zonas horarias, necesitas considerar el problema de la zona horaria. Por ejemplo, si un usuario en Nueva York crea un registro a las `"2024-06-15 12:00:00"`, significa que el registro se creó a las 12:00:00 en la zona horaria de Nueva York. Si otro usuario en Beijing ve el registro, la hora debería convertirse a la zona horaria de Beijing.

En resumen, la fecha y hora es el tiempo en la zona horaria local, debes agregar información de zona horaria a la fecha y hora para que esté disponible en todo el mundo.

Por otro lado, el timestamp es el número de segundos que han transcurrido desde el 1 de enero de 1970 a las 00:00:00 UTC. El timestamp es independiente de la zona horaria, siempre es el mismo sin importar dónde te encuentres.

## Tipos de Datos de Fecha y Hora en MySQL

En MySQL, hay varios tipos de datos de fecha y hora, pero los más importantes son `DATETIME` y `TIMESTAMP`.

- `DATETIME`: La fecha y hora, el formato es `YYYY-MM-DD HH:MM:SS`. Almacena la fecha y hora, por lo que se debe considerar la zona horaria.
- `TIMESTAMP`: El timestamp, almacena el número de timestamp, que es independiente de la zona horaria. Pero cuando escribes o lees el timestamp, habrá una conversión de zona horaria.

## Zona Horaria en MySQL

MySQL tiene una variable de sistema `time_zone` para establecer la zona horaria. Puedes establecer la zona horaria de las siguientes maneras:

1. Establecer la zona horaria en el archivo de configuración `my.cnf`:

    ```ini
    [mysqld]
    default-time-zone = '+00:00'
    ```

2. Establecer la zona horaria en el cliente MySQL:

    ```sql
    SET time_zone = '+00:00';
    ```

3. Establecer la zona horaria en la cadena de conexión:

    ```sql
    mysql -u root -p --default-time-zone='+00:00'
    ```

Si no estableces la zona horaria, MySQL utilizará la zona horaria del sistema por defecto.

## Establecer la Zona Horaria en la Aplicación

Cuando usas MySQL en tu aplicación, debes establecer la zona horaria en la aplicación. Por ejemplo, en Node.js, puedes establecer la zona horaria así:

```javascript
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost
    user: 'root
    password: 'password',
    database: 'test',
    timezone: '+00:00'
});
```

Ten en cuenta que, en muchos casos, establecer la zona horaria en tu aplicación es la única forma de asegurarte de que la zona horaria sea correcta. Porque puede que no tengas la oportunidad de tocar el servidor MySQL, pero siempre puedes cambiar el código de la aplicación.

Si tu aplicación utiliza algún ORM que no admite la configuración de zona horaria, todavía tienes otras opciones:

1. Realizar una consulta de configuración de zona horaria antes de cualquier otra consulta. (`SET time_zone = '+00:00';`)
2. Utilizar un tipo de datos diferente para almacenar la fecha y hora, como `INT` o `VARCHAR`, y manejar la conversión de zona horaria en la aplicación.
3. Convertir cualquier valor de fecha y hora a la misma zona horaria que el servidor MySQL antes de escribirlo en la base de datos. También tienes que hacer una conversión de zona horaria en la aplicación cuando lees el valor de fecha y hora.

## Conclusión

En este artículo, aprendimos los conocimientos básicos de fecha y hora, timestamp y zona horaria: la fecha y hora deben tener información de zona horaria, el timestamp es independiente de la zona horaria. Luego aprendimos los tipos de datos de fecha y hora en MySQL: `DATETIME` y `TIMESTAMP`. Finalmente, aprendimos cómo establecer la zona horaria en MySQL y en la aplicación.