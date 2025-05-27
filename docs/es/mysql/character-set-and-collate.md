# Entendiendo el Conjunto de Caracteres y las Reglas de Ordenación en MySQL

Cuando usamos MySQL, a menudo encontramos problemas relacionados con conjuntos de caracteres y reglas de ordenación, como texto ilegible al consultar datos, o errores al escribir expresiones emoji. Para entender y resolver estos problemas, necesitas comprender el conjunto de caracteres y las reglas de ordenación en MySQL.

## Conjuntos de Caracteres

En las computadoras, los caracteres se almacenan codificados, y cada carácter tiene una codificación. Por ejemplo, la letra `A` se codifica como `65` en el esquema de codificación ASCII. Sin embargo, ASCII solo tiene 128 caracteres y contiene únicamente números, letras mayúsculas y minúsculas y signos de puntuación comunes en inglés. Si se involucra el chino, necesitas usar más conjuntos de caracteres, como GK2312, GB18030, UTF8, etc.

Después de codificar cada carácter según las reglas especificadas, obtenemos un conjunto de tablas de codificación, que puede llamarse "conjunto de caracteres". Cada conjunto de caracteres tiene sus propias reglas de codificación, y el resultado de codificar el mismo carácter en diferentes conjuntos de caracteres es diferente. Si se utilizan diferentes conjuntos de caracteres al escribir datos y consultar datos, los caracteres correspondientes no se pueden analizar correctamente, lo que resulta en texto ilegible.

Para el chino, los conjuntos de caracteres comúnmente utilizados son GB2312, GBK, GB18030, UTF8, etc. Debido a la buena característica de internacionalización de UTF8, se recomienda usar la codificación UTF8 cuando no haya una razón especial.

## Configuración del Conjunto de Caracteres para Campos en MySQL

El conjunto de caracteres de MySQL se aplica en última instancia a los campos. Al crear un campo (crear una tabla o modificar una tabla), puedes especificar el conjunto de caracteres del campo de la siguiente manera.

```sql
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

El campo `name` en el SQL anterior usa el conjunto de caracteres `utf8mb4` y la regla de ordenación `utf8mb4_general_ci`. Así que el conjunto de caracteres del campo es `utf8mb4`.

Además de especificar el conjunto de caracteres en el campo, también puedes especificar el conjunto de caracteres predeterminado para toda la tabla, como en el SQL anterior, que también especifica el conjunto de caracteres predeterminado para la tabla como `utf8mb4`. En este caso, si no se especifica un conjunto de caracteres para el nuevo campo, se utiliza el conjunto de caracteres predeterminado de la tabla.

Además, MySQL también puede especificar un conjunto de caracteres predeterminado para la base de datos o incluso para todo el servidor MySQL. Estos conjuntos de caracteres también son similares a los conjuntos de caracteres predeterminados de la tabla, y cuando no se especifica ningún conjunto de caracteres de campo, se utiliza el conjunto de caracteres predeterminado. En resumen: Conjunto de Caracteres del Campo > Conjunto de Caracteres Predeterminado de la Tabla > Conjunto de Caracteres Predeterminado de la Base de Datos > Conjunto de Caracteres Predeterminado del Servidor MySQL.

Teóricamente, cuando establecemos el conjunto de caracteres de un campo, la base de datos puede contener los caracteres bajo el conjunto de caracteres correspondiente. Sin embargo, en la práctica, a menudo encontramos situaciones donde se establece el conjunto de caracteres de un campo, pero aún no funciona como se esperaba, y esta situación puede involucrar el problema del conjunto de caracteres de conexión.

## Configuración del conjunto de caracteres de conexión

Además del conjunto de caracteres almacenado en los campos de la base de datos, hay algunos otros conceptos de conjuntos de caracteres que aparecen en otros lugares al usar MySQL.

- `character_set_client` El conjunto de caracteres utilizado por el cliente para enviar declaraciones SQL
- `character_set_connection` El conjunto de caracteres al que MySQL convertirá cuando reciba una declaración SQL
- `character_set_results` El conjunto de caracteres al que MySQL convertirá el conjunto de resultados

Las siguientes configuraciones SQL se pueden usar por separado.

```sql
SET character_set_client=utf8mb4;
SET character_set_connection=utf8mb4;
SET character_set_results=utf8mb4;
```

Y hay otro atajo para configurar estos tres conjuntos de caracteres:

```sql
SET NAMES utf8mb4;
```

Solo ejecuta la declaración SQL anterior para configurar los tres conjuntos de caracteres mencionados anteriormente.

## Configuración del conjunto de caracteres en el código

Si usas MySQL en tu código, generalmente tienes que decidir el conjunto de caracteres de la conexión a través de la configuración de la biblioteca MySQL. Tomando como ejemplo el módulo `sequelize` de Node.js, necesitas especificar el conjunto de caracteres en `dialectOptions.charset`.

```js
const sequelize = new Sequelize({
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4'
    }
});
```

## Reglas de ordenación

Puedes ver `COLLATE` en muchos lugares, y en el ejemplo anterior, `utf8mb4_general_ci` es la regla de ordenación.

Como su nombre indica, las reglas de ordenación se utilizan para determinar cómo se deben ordenar los caracteres. Por ejemplo, los mismos `a` y `b` pueden estar delante de `a` bajo una regla de ordenación y detrás de `b` bajo otra.

MySQL proporciona muchas reglas de ordenación para el conjunto de caracteres `utf8mb4`, las comunes son:

- `utf8mb4_general_ci`: Regla de ordenación predeterminada de MySQL, la parte Unicode no está estrictamente ordenada en orden Unicode
- `utf8mb4_unicode_ci`: ordenación por orden de caracteres Unicode
- `utf8mb4_0900_ai_ci`: ordenado por caracteres Unicode 9.0, incluidos caracteres fuera del plano multilingüe básico

Actualmente se recomienda `utf8mb4_0900_ai_ci` o `utf8mb4_unicode_ci`.

## utf8 y utf8mb4 en MySQL

Un carácter UTF8 consta de 1-6 bytes, pero el carácter máximo utilizado hoy en día es de solo 4 bytes. El conjunto de caracteres utf8 en MySQL solo puede almacenar hasta 3 bytes, por lo que cuando encuentras un carácter de 4 bytes, no puedes almacenarlo, por eso los campos en el conjunto de caracteres utf8 no pueden almacenar expresiones emoji.

utf8mb4 es una extensión de utf8 que puede almacenar 4 bytes de caracteres, por lo que puede almacenar expresiones emoji.

Se debe usar el conjunto de caracteres utf8mb4 a menos que se especifique lo contrario, y ya no se debe usar el conjunto de caracteres utf8.

## Resumen

1. Siempre que configures el conjunto de caracteres de los campos de la base de datos MySQL y te asegures de que estás utilizando el mismo conjunto de caracteres al conectarte, puedes estar seguro de que no hay problema de caracteres ilegibles causados por el conjunto de caracteres.
2. Se recomienda el conjunto de caracteres utf8mb4 y ya no se utiliza el conjunto de caracteres utf8.
Se recomienda utilizar las reglas de ordenación utf8mb4_0900_ai_ci o utf8mb4_unicode_ci.