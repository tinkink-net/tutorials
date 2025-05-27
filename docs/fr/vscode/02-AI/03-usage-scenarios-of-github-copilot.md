# Scénarios d'utilisation de Github Copilot

Copilot (<https://copilot.github.com/>) est une aide à la programmation basée sur l'IA fournie par Github qui propose des suggestions de code basées sur l'apprentissage par IA pendant le processus de codage. Dans de nombreux cas, Copilot peut instancier du code complet avec seulement des commentaires ou des noms de fonctions.

Mais saviez-vous que vous pouvez utiliser Copilot dans davantage de scénarios d'utilisation ? Copilot peut également compléter des cas de test, des commentaires, des documents, des séquences numériques, et même des traductions. Dans cet article, nous présenterons plus de scénarios d'utilisation de Copilot.

> Si vous souhaitez connaître les bases de Copilot, veuillez consulter [Comment utiliser Github Copilot et ses raccourcis](/fr/vscode/copilot-usage-and-shortcut.html).

## Résoudre des problèmes d'algorithmes

Copilot peut vous aider à résoudre des problèmes d'algorithmes. Par exemple, vous pouvez utiliser Copilot pour résoudre le problème de recherche de la valeur maximale d'un tableau.

Prenons JavaScript comme exemple, vous pouvez écrire le texte suivant dans VSCode :

```
// Sort the array using quick sort

```

Ensuite, attendez que Copilot suggère le code, puis appuyez sur `Tab` pour accepter la suggestion, et vous obtiendrez le code suivant :

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

Si vous changez le commentaire en `// Sort the array using bubble sort`, vous obtiendrez le code suivant :

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

Wow, Copilot peut résoudre le problème d'algorithme pour vous !

## Écrire des cas de test

Copilot peut également vous aider à écrire des cas de test. Par exemple, vous pouvez utiliser Copilot pour écrire des cas de test pour la fonction `quickSort` de la section précédente.

Prenons JavaScript comme exemple, vous pouvez écrire le texte suivant dans VSCode :

```
// Test quickSort
test('quickSort', () => {
```

Ensuite, attendez que Copilot suggère le code, puis appuyez sur `Tab` pour accepter la suggestion, et vous obtiendrez le code suivant :

```js
// Test quickSort
test('quickSort', () => {
  expect(quickSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(quickSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(quickSort([1, 3, 2, 5, 4])).toEqual([1, 2, 3, 4, 5]);
});
```

Prenons un exemple plus compliqué, supposons que vous avez un service appelé `UserService` qui a une méthode appelée `getUserInfo` pour obtenir les informations de l'utilisateur, et une méthode appelée `setUserInfo` pour définir les informations de l'utilisateur. Vous pouvez écrire le texte suivant dans VSCode :

```
// test
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName');
```

Ensuite, attendez que Copilot suggère le code, puis appuyez sur `Tab` pour accepter la suggestion, et vous obtiendrez le code suivant :

```js
// test
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName');
expect(userService.getUserInfo()).toEqual({
  name: 'testName',
});
```

Voyez, Copilot sait que vous voulez tester la méthode `setUserInfo`, et il générera automatiquement le code de test pour vous.

Si vous l'utilisez pour écrire plus de cas de test, vous constaterez que Copilot est assez intelligent pour écrire des cas de test pour vous. Il sait ce que vous voulez tester, et il générera automatiquement le code de test pour vous. Si vous testez une méthode plusieurs fois, Copilot nommera même correctement les variables pour vous (`userInfo2`, `userInfo3`, etc.). Et il sait également détruire les données après le test, afin que le test suivant ne soit pas affecté.

## Écrire des commentaires

Copilot peut également vous aider à écrire des commentaires. Par exemple, vous pouvez utiliser Copilot pour écrire des commentaires pour la fonction `quickSort` de la section précédente.

Prenons JavaScript comme exemple, vous pouvez écrire le texte suivant dans VSCode :

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

Ensuite, vous écrivez le commentaire commençant par `/**` sur la ligne au-dessus de la fonction `quickSort`, et attendez que Copilot suggère le code, puis appuyez sur `Tab` pour accepter la suggestion, et vous obtiendrez le code suivant :

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

Ensuite, vous pouvez compléter les paramètres et la valeur de retour de la fonction `quickSort` comme ceci :

```js
/**
 * Sort the array using quick sort
 * @param
 */
```

Ensuite, attendez que Copilot suggère le code, puis appuyez sur `Tab` pour accepter la suggestion, et vous obtiendrez le code suivant :

```js
/**
 * Sort the array using quick sort
 * @param {number[]} arr
 * @returns {number[]}
 */
```

Voyez, Copilot sait que vous voulez écrire un commentaire pour la fonction `quickSort`, et il générera automatiquement le commentaire pour vous, et sait également comment compléter les paramètres et la valeur de retour de la fonction `quickSort`.

## Séquences numériques

Copilot peut également vous aider à écrire des séquences numériques. Par exemple, vous pouvez utiliser Copilot pour générer un tableau de nombres de 1 à 100.

Prenons JavaScript comme exemple, vous pouvez écrire le texte suivant dans VSCode :

```
// array of numbers from 1 to 100
const arr = [1, 2,
```

Ensuite, attendez que Copilot suggère le code, puis appuyez sur `Tab` pour accepter la suggestion, et vous obtiendrez le code suivant :

```js
// array of numbers from 1 to 100
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
```

Vous pouvez également générer un tableau de nombres de 100 à 1 ou autre chose.

```js
// array of numbers from 100 to 1
const arr = [100, 99,

// array of odd numbers from 1 to 100
const arr = [1, 3,
```

## Dictionnaire

Copilot peut également être utilisé comme dictionnaire. Par exemple, vous pouvez utiliser Copilot pour rechercher la signification du mot `test`.

Vous pouvez écrire le texte suivant dans VSCode :

```
// explaine the word test
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
```

Ensuite, attendez que Copilot suggère le code, puis appuyez sur `Tab` pour accepter la suggestion, et vous obtiendrez le code suivant :

```
// explaine the word test
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
```

Vous pouvez ajouter plus de mots à rechercher :

```
// explaine the words
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
algorithm:
programming:
LGTM:
```

Ensuite, attendez que Copilot suggère le code, puis appuyez sur `Tab` pour accepter la suggestion, et vous obtiendrez le code suivant :

```
// explaine the words
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
algorithm: a set of rules or procedures that must be followed in calculations or other problem-solving operations, especially by a computer.
programming: the process of writing computer programs.
LGTM: looks good to me.
```

## Traduction

Copilot peut également vous aider à traduire. Par exemple, vous pouvez utiliser Copilot pour traduire le texte suivant de l'anglais vers le chinois.

```
English: Hello, I am Copilot, I can help you write code.
Chinese:
```

Ensuite, attendez que Copilot suggère le code, puis appuyez sur `Tab` pour accepter la suggestion, et vous obtiendrez le code suivant :

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
```

Vous pouvez ajouter plus de langues à traduire :

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
Traditional Chinese:
Japanese:
```

Ensuite, attendez que Copilot suggère le code, puis appuyez sur `Tab` pour accepter la suggestion, et vous obtiendrez le code suivant :

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
Traditional Chinese: 你好，我是 Copilot，我可以幫助你寫代碼。
Japanese: こんにちは、私は Copilot です。私はあなたがコードを書くのを手伝うことができます。
```

## Résumé

Dans cet article, j'ai présenté davantage de scénarios d'utilisation de Copilot pour vous. Copilot peut beaucoup vous aider lorsque vous écrivez du code. Il peut également vous aider à rédiger des documents, écrire des cas de test, écrire des commentaires, générer des séquences numériques et traduire. C'est très utile. J'espère que vous pourrez en profiter.