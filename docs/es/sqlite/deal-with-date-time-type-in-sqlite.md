# Cómo almacenar y procesar tipos de fecha y hora en SQLite

SQLite es un sistema de base de datos que almacena datos en un archivo. Es un sistema de base de datos pequeño, rápido y fácil de usar que se utiliza a menudo en aplicaciones móviles y web.

Según la documentación oficial, SQLite no admite tipos de fecha y hora, los tipos de datos sugeridos para fecha y hora son:

- `TEXT`: El tipo de datos de texto, que es una cadena de caracteres. Almacena la fecha y hora como una cadena en formato ISO 8601, como `YYYY-MM-DD HH:MM:SS`.
- `INTEGER`: El tipo de datos entero, que es un número entero. Almacena la fecha y hora como un número de segundos desde el 1 de enero de 1970, 00:00:00 UTC, también conocido como timestamp Unix.
- `REAL`: El tipo de datos de número real, que es un número con punto decimal. Almacena la fecha y hora como un número de días desde el 24 de noviembre de 4714 a.C., 12:00:00 UTC, también conocido como número de día juliano.

## ¿Qué tipo de datos debería usar?

De hecho, puedes usar cualquier formato que desees para almacenar y procesar tipos de fecha y hora en SQLite, porque el tipo de datos más flexible es `TEXT`, que es una cadena de caracteres.

¿Por qué SQLite sugiere usar `TEXT` para almacenar y procesar fecha y hora en formato ISO 8601 en lugar de otros formatos? Porque SQLite tiene algunas funciones incorporadas relacionadas con fechas, por ejemplo, `timediff` para calcular la diferencia de tiempo entre dos fechas, `strftime` para formatear un valor de fecha.

Pero si realmente usas `TEXT`, puedes enfrentar algunos problemas:

- El formato puede ser diferente de lo que esperas, hay muchos formatos diferentes.
- Puedes perder alguna información, por ejemplo, la zona horaria.
- Es posible que no puedas comparar los tipos de fecha y hora, por ejemplo, no puedes comparar los tipos de fecha y hora usando el operador `>` o `<`. (Algunos formatos son comparables, pero no todos.)

La forma recomendada es usar `INTEGER` para almacenar el timestamp. Como es solo un número, el almacenamiento es eficiente y es fácil comparar los tipos de fecha y hora.

Además, no tienes "problema de zona horaria", porque la zona horaria del mismo tiempo en todo el mundo es exactamente la misma. Puedes formatear a cualquier zona horaria y formato según lo necesites.

## Conclusión

En la práctica, al procesar tipos de fecha y hora en SQLite, deberías usar `INTEGER` para almacenar timestamps.