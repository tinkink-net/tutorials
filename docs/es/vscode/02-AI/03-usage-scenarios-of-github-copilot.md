# Escenarios de uso de Github Copilot

Copilot (<https://copilot.github.com/>) es una ayuda de codificación con IA proporcionada por Github que ofrece sugerencias de código basadas en aprendizaje de IA durante el proceso de codificación. En muchos casos, Copilot puede crear código completo con solo comentarios o nombres de funciones.

Pero, ¿sabías que puedes usar Copilot en más escenarios? Copilot también puede complementar casos de prueba, comentarios, documentos, secuencias numéricas e incluso traducciones. En este artículo, presentaremos más escenarios de uso de Copilot.

> Si quieres conocer las bases de Copilot, consulta [Cómo usar Github Copilot y sus atajos](/es/vscode/copilot-usage-and-shortcut.html).

## Resolver problemas de algoritmos

Copilot puede ayudarte a resolver problemas de algoritmos. Por ejemplo, puedes usar Copilot para resolver el problema de encontrar el valor máximo de un array.

Tomando JavaScript como ejemplo, puedes escribir el siguiente texto en VSCode:

```
// Sort the array using quick sort

```

Luego espera a que Copilot sugiera el código, presiona `Tab` para aceptar la sugerencia, y obtendrás el siguiente código:

```js
// Sort the array using quick sort
const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};
```

Si cambias el comentario a `// Sort the array using bubble sort`, obtendrás el siguiente código:

```js
// Sort the array using bubble sort

const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
};
```

¡Wow, Copilot puede resolver el problema de algoritmo por ti!

## Escribir casos de prueba

Copilot también puede ayudarte a escribir casos de prueba. Por ejemplo, puedes usar Copilot para escribir casos de prueba para la función `quickSort` de la sección anterior.

Tomando JavaScript como ejemplo, puedes escribir el siguiente texto en VSCode:

```
// Test quickSort
test('quickSort', () => {
```

Luego espera a que Copilot sugiera el código, presiona `Tab` para aceptar la sugerencia, y obtendrás el siguiente código:

```js
// Test quickSort
test('quickSort', () => {
  expect(quickSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(quickSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(quickSort([1, 3, 2, 5, 4])).toEqual([1, 2, 3, 4, 5]);
});
```

Tomemos un ejemplo más complicado, supongamos que tienes un servicio llamado `UserService` que tiene un método llamado `getUserInfo` para obtener información del usuario, y un método llamado `setUserInfo` para establecer información del usuario. Puedes escribir el siguiente texto en VSCode:

```
// test
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName');
```

Luego espera a que Copilot sugiera el código, presiona `Tab` para aceptar la sugerencia, y obtendrás el siguiente código:

```js
// test
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName');
expect(userService.getUserInfo()).toEqual({
  name: 'testName',
});
```

Mira, Copilot sabe que quieres probar el método `setUserInfo`, y generará automáticamente el código de prueba para ti.

Si lo usas para escribir más casos de prueba, descubrirás que Copilot es lo suficientemente inteligente para escribir casos de prueba por ti. Sabe lo que quieres probar y generará automáticamente el código de prueba. Si pruebas un método muchas veces, Copilot incluso nombrará las variables correctamente para ti (`userInfo2`, `userInfo3`, etc.). Y también sabe destruir los datos después de la prueba, para que la siguiente prueba no se vea afectada.

## Escribir comentarios

Copilot también puede ayudarte a escribir comentarios. Por ejemplo, puedes usar Copilot para escribir comentarios para la función `quickSort` de la sección anterior.

Tomando JavaScript como ejemplo, puedes escribir el siguiente texto en VSCode:

```
const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};
```

Luego escribes el comentario comenzando con `/**` en la línea sobre la función `quickSort`, esperas a que Copilot sugiera el código, presionas `Tab` para aceptar la sugerencia, y obtendrás el siguiente código:

```js
/**
 * Sort the array using quick sort
 */
const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};
```

Luego puedes completar los parámetros y el valor de retorno de la función `quickSort` así:

```js
/**
 * Sort the array using quick sort
 * @param
 */
```

Luego espera a que Copilot sugiera el código, presiona `Tab` para aceptar la sugerencia, y obtendrás el siguiente código:

```js
/**
 * Sort the array using quick sort
 * @param {number[]} arr
 * @returns {number[]}
 */
```

Mira, Copilot sabe que quieres escribir un comentario para la función `quickSort`, y generará automáticamente el comentario para ti, y también sabe cómo completar los parámetros y el valor de retorno de la función `quickSort`.

## Secuencias numéricas

Copilot también puede ayudarte a escribir secuencias numéricas. Por ejemplo, puedes usar Copilot para generar un array de números del 1 al 100.

Tomando JavaScript como ejemplo, puedes escribir el siguiente texto en VSCode:

```
// array of numbers from 1 to 100
const arr = [1, 2,
```

Luego espera a que Copilot sugiera el código, presiona `Tab` para aceptar la sugerencia, y obtendrás el siguiente código:

```js
// array of numbers from 1 to 100
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
```

También puedes generar un array de números del 100 al 1 o algo más.

```js
// array of numbers from 100 to 1
const arr = [100, 99,

// array of odd numbers from 1 to 100
const arr = [1, 3,
```

## Diccionario

Copilot también puede usarse como diccionario. Por ejemplo, puedes usar Copilot para buscar el significado de la palabra `test`.

Puedes escribir el siguiente texto en VSCode:

```
// explaine the word test
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
```

Luego espera a que Copilot sugiera el código, presiona `Tab` para aceptar la sugerencia, y obtendrás el siguiente código:

```
// explaine the word test
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
```

Puedes agregar más palabras para buscar:

```
// explaine the words
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
algorithm:
programming:
LGTM:
```

Luego espera a que Copilot sugiera el código, presiona `Tab` para aceptar la sugerencia, y obtendrás el siguiente código:

```
// explaine the words
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
algorithm: a set of rules or procedures that must be followed in calculations or other problem-solving operations, especially by a computer.
programming: the process of writing computer programs.
LGTM: looks good to me.
```

## Traducción

Copilot también puede ayudarte a traducir. Por ejemplo, puedes usar Copilot para traducir el siguiente texto del inglés al chino.

```
English: Hello, I am Copilot, I can help you write code.
Chinese:
```

Luego espera a que Copilot sugiera el código, presiona `Tab` para aceptar la sugerencia, y obtendrás el siguiente código:

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
```

Puedes agregar más idiomas para traducir:

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
Traditional Chinese:
Japanese:
```

Luego espera a que Copilot sugiera el código, presiona `Tab` para aceptar la sugerencia, y obtendrás el siguiente código:

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
Traditional Chinese: 你好，我是 Copilot，我可以幫助你寫代碼。
Japanese: こんにちは、私は Copilot です。私はあなたがコードを書くのを手伝うことができます。
```

## Resumen

En este artículo, te presenté más escenarios de uso de Copilot. Copilot puede ayudarte mucho cuando escribes código. También puede ayudarte a escribir documentos, casos de prueba, comentarios, generar secuencias numéricas y traducir. Es muy útil. Espero que puedas disfrutarlo.