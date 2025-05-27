# Cómo usar Github Copilot Chat

## Qué es Copilot Chat

Copilot (<https://github.com/features/copilot/>) es una ayuda de codificación con IA proporcionada por Github que ofrece sugerencias de código basadas en aprendizaje de IA durante el proceso de codificación. En muchos casos, solo se necesitan comentarios o nombres de funciones, y Copilot puede generar el código completo.

Para más información, visite [Cómo usar Github Copilot y Atajos](/es/vscode/copilot-usage-and-shortcut.html).

Copilot Chat está relacionado con Copilot, comparte la suscripción con Copilot, pero no es lo mismo. Copilot Chat es un chatbot que se puede usar en VSCode. Se puede utilizar para chatear con Copilot, y Copilot te dará sugerencias de código basadas en el contenido de tu chat. Por ejemplo, puedes hacer preguntas técnicas a Copilot Chat, o pedirle a Copilot Chat que te ayude a escribir código.

Lo que hace que Copilot Chat sea diferente de Copilot es que Copilot Chat es un chatbot, esto significa que no tienes que indicarle con código, simplemente puedes chatear con él, y te dará la respuesta o sugerencias de código.

## Instalando el plugin

Para usar Copilot Chat, necesitas instalar un plugin, busca `Copilot Chat` en el menú de plugins de VSCode para encontrar el plugin, el nombre es `Github Copilot Chat`, la dirección correspondiente en el marketplace de plugins es <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat>, instálalo.

![Captura de pantalla de instalación](/attachments/vscode/copilot-chat-usage/01.png)

## Uso

Haz clic en el menú `Chat` en la barra lateral izquierda de VSCode para abrir la ventana de chat, y luego puedes chatear con Copilot Chat.

Puedes hacer preguntas a Copilot Chat sobre programación, como `¿Cuál es el operador en JavaScript para realizar un bit xor?`, responderá `En JavaScript, el operador de XOR bit a bit está representado por el símbolo de acento circunflejo (^)`, y te dará un ejemplo de código y su explicación. Es bastante útil cuando quieres consultar algún conocimiento de programación.

![Captura de pantalla de la ventana de chat](/attachments/vscode/copilot-chat-usage/02.png)

### Escribir código

Además de conocimientos de programación, también puedes pedirle a Copilot Chat que te ayude a escribir código, como `Escribe una función para calcular la suma de dos números en JavaScript`, te dará un ejemplo de código de la función que quieres escribir:

```
Sure, here is a simple JavaScript function that calculates the sum of two numbers:

function sum(a, b) {
    return a + b;
}

You can use this function by calling it with two numbers as arguments, like so: sum(5, 3). This would return 8.
```

Cuando tu ratón se sitúa sobre el ejemplo de código, puedes ver varios botones de acción, puedes copiar el código, o insertar el código en la posición actual del cursor del editor, también puedes guardar el código en un nuevo archivo o ejecutar el código en la terminal (si es un comando de shell ejecutable).

![Captura de pantalla del ejemplo de código](/attachments/vscode/copilot-chat-usage/03.png)

El botón más útil es el botón `Insert`, puedes insertar el código recién creado en un archivo existente, o puedes usar este botón para reemplazar un fragmento de código seleccionado, hablaremos de esto en detalle más adelante.

Si no estás satisfecho con el ejemplo de código, puedes hablar con Copilot Chat de nuevo, como `Por favor, verifica el tipo de datos de entrada, si uno de ellos no es un número, devuelve 0`, Copilot Chat te dará un nuevo ejemplo de código:

```
Sure, here is a revised version of the function that checks the input data types:

function sum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return 0;
    }
    return a + b;
}

In this version, the function checks if either a or b is not a number. If either is not a number, the function returns 0. Otherwise, it returns the sum of a and b.
```

Como puedes ver, puedes pedirle a Copilot Chat que mejore el código una y otra vez, hasta que estés satisfecho con el código. Lo más importante es: ¡Nunca se quejará de ti, qué buen tipo!

### Modificar código

Si tienes un fragmento de código que quieres modificar, puedes seleccionar el código y luego hacer clic en el menú `Chat` en la barra lateral izquierda de VSCode para abrir la ventana de chat, y luego puedes chatear con Copilot Chat. El código seleccionado se enviará a Copilot Chat como contexto, y Copilot Chat te dará sugerencias de código basadas en el contexto y lo que digas.

Por ejemplo, tenemos un fragmento de código con un error:

```javascript
function sumArr(arr) {
    let sum = 0;
    for (let i in arr) {
        sum += i;
    }
    return sum;
}
```

Esta función toma un array de números como entrada y devuelve la suma de los números en el array. Pero hay un error en el código, lee la clave del array en lugar del valor, por lo que devuelve la suma del índice del array en lugar de la suma del valor del array.

Queremos arreglar el error, así que seleccionamos el código y abrimos la ventana de chat, y luego decimos `Por favor, arregla el error`, Copilot Chat nos dará un ejemplo de código que arregla el error:

```
function sumArr(arr) {
    let sum = 0;
    for (let i of arr) {
        sum += i;
    }
    return sum;
}

In the original code, the for...in loop was used, which iterates over the enumerable properties of an object, in this case, the indices of the array. To fix the bug, the for...of loop should be used instead, which iterates over the values of an iterable object, in this case, the elements of the array.
```

Como puedes ver, Copilot Chat ha arreglado el error por nosotros, y también nos da una explicación del código.

Además, puedes hacer lo mismo de una manera más simple, puedes seleccionar el código y luego introducir `/fix` o hacer clic en `/fix the problems in my code`, Copilot Chat arreglará el código tal como hicimos antes.

### Convertir código

A veces puede que necesites convertir una lista de valores a un array, o mapa o algo más, por ejemplo, copiamos un mapa de pares clave-valor de una tabla de excel:

```
name    age
John    20
Mary    21
Rose    22
Robert  18
Jane    19
```

Puedes seleccionar el texto y luego abrir la ventana de chat, y luego puedes decir `Convierte el texto a un array (JSON), el elemento del array es otro array que contiene nombre y edad, por ejemplo: [['John', 20]], solo da el resultado, no es necesario dar código, sin explicación`, Copilot Chat te dará un ejemplo de código que convierte el texto a un array:

```
Here is the converted text to an array:

[
    ["John", 20],
    ["Mary", 21],
    ["Rose", 22],
    ["Robert", 18],
    ["Jane", 19]
]
```

Nota, debes describir tus peticiones con el mayor detalle posible, para que Copilot Chat pueda entender tu petición y darte el resultado correcto. Por ejemplo, si no especificas la salida, Copilot Chat te dará el ejemplo de código que convierte el texto a un array, que no es lo que quieres.

Por supuesto, puedes pedirle a Copilot Chat que convierta el texto a otras estructuras de datos, como un mapa, o una lista de objetos, etc.

## Conclusión

Podemos usar Copilot Chat para hacer muchas cosas, como:

- convertir texto a estructura de datos
- añadir tipos para el código
- convertir un fragmento de código a otro lenguaje de programación
- traducir tu archivo i18n a otro idioma
- añadir manejo de errores para el código
- arreglar pequeños errores
- refactorizar el código para hacerlo más legible
- ...

El único límite es tu imaginación y tu paciencia. A veces Copilot Chat puede no entender tu petición, o puede darte un resultado incorrecto, pero puedes seguir mejorando tu petición hasta obtener el resultado correcto. Después de algo de práctica, encontrarás que Copilot Chat es una herramienta muy útil.