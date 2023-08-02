# Anwendungsszenarien von Github Copilot

Copilot (<https://copilot.github.com/>) ist eine KI-Codierhilfe, die von Github bereitgestellt wird und während des Codierungsprozesses KI-gestützte Codierungsvorschläge bietet. In vielen Fällen kann Copilot vollständigen Code nur mit Kommentaren oder Funktionsnamen instanziieren.

Aber wussten Sie, dass Sie Copilot in noch mehr Anwendungsszenarien verwenden können? Copilot kann auch Testfälle, Kommentare, Dokumente, Zahlenfolgen und sogar Übersetzungen ergänzen. In diesem Artikel werden wir weitere Anwendungsszenarien von Copilot vorstellen.

> Wenn Sie die Grundlagen von Copilot kennenlernen möchten, lesen Sie bitte [Wie man Github Copilot und Tastenkombinationen verwendet](/de/vscode/copilot-verwendung-und-tastenkombinationen.html).

## Löse Algorithmusprobleme

Copilot kann Ihnen helfen, Algorithmusprobleme zu lösen. Zum Beispiel können Sie Copilot verwenden, um das Problem zu lösen, den maximalen Wert eines Arrays zu finden.

Nehmen wir JavaScript als Beispiel, Sie können den folgenden Text in VSCode schreiben:

```
// Sortiere das Array mit Quick Sort

```

Warten Sie dann darauf, dass Copilot den Code vorschlägt, und drücken Sie dann `Tab`, um den Vorschlag anzunehmen. Sie erhalten den folgenden Code:

```js
// Sortiere das Array mit Quick Sort
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

Wenn Sie den Kommentar in `// Sortiere das Array mit Bubble Sort` ändern, erhalten Sie den folgenden Code:

```js
// Sortiere das Array mit Bubble Sort

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

Wow, Copilot kann das Algorithmusproblem für dich lösen!

## Schreibe Testfälle

Copilot kann Ihnen auch beim Schreiben von Testfällen helfen. Zum Beispiel können Sie Copilot verwenden, um Testfälle für die `quickSort`-Funktion im vorherigen Abschnitt zu schreiben.

Nehmen wir JavaScript als Beispiel, Sie können den folgenden Text in VSCode schreiben:

```
// Test quickSort
test('quickSort', () => {
```

Warten Sie dann auf Copilot, um den Code vorzuschlagen, und drücken Sie dann `Tab`, um den Vorschlag anzunehmen. Sie erhalten den folgenden Code:

```js
// Test quickSort
test('quickSort', () => {
  expect(quickSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(quickSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(quickSort([1, 3, 2, 5, 4])).toEqual([1, 2, 3, 4, 5]);
});
```

Nehmen wir ein komplizierteres Beispiel an. Angenommen, Sie haben einen Service namens `UserService`, der eine Methode namens `getUserInfo` zum Abrufen von Benutzerinformationen und eine Methode namens `setUserInfo` zum Festlegen von Benutzerinformationen hat. Sie können den folgenden Text in VSCode schreiben:

```
// test
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName');
```

Warten Sie dann auf Copilot, um den Code vorzuschlagen, und drücken Sie dann `Tab`, um den Vorschlag anzunehmen. Sie erhalten den folgenden Code:

```js
// test
const userService = new UserService();
const userInfo = userService.getUserInfo();

userInfo.setUserInfo('name', 'testName');
expect(userService.getUserInfo()).toEqual({
  name: 'testName',
});
```

Siehst du, Copilot weiß, dass du die Methode `setUserInfo` testen möchtest, und es generiert automatisch den Testcode für dich.

Wenn du es verwendest, um mehr Testfälle zu schreiben, wirst du feststellen, dass Copilot klug genug ist, um Testfälle für dich zu schreiben. Es weiß, was du testen möchtest, und es generiert automatisch den Testcode für dich. Wenn du eine Methode mehrmals testest, benennt Copilot sogar die Variablen für dich (`userInfo2`, `userInfo3`, usw.). Und es weiß auch, die Daten nach dem Test zu löschen, damit der nächste Test nicht beeinflusst wird.

## Kommentare schreiben

Copilot kann Ihnen auch beim Schreiben von Kommentaren helfen. Zum Beispiel können Sie Copilot verwenden, um Kommentare für die `quickSort`-Funktion im vorherigen Abschnitt zu schreiben.

Nehmen wir JavaScript als Beispiel. Sie können den folgenden Text in VSCode schreiben:

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

Dann schreiben Sie den Kommentar, der mit `/**` in der Zeile über der `quickSort`-Funktion beginnt, und warten Sie, bis Copilot den Code vorschlägt. Drücken Sie dann `Tab`, um den Vorschlag anzunehmen, und Sie erhalten den folgenden Code:

```js
/**
 * Sortieren Sie das Array mit Quick Sort
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

Dann können Sie die Parameter und den Rückgabewert der `quickSort`-Funktion wie folgt erfüllen und zurückgeben:

```js
/**
 * Sortiere das Array mit Quick Sort
 * @param {number[]} arr
 * @returns {number[]}
 */
```

Warten Sie dann, bis Copilot den Code vorschlägt, und drücken Sie dann `Tab`, um den Vorschlag anzunehmen. Sie erhalten den folgenden Code:

```js
/**
 * Sortiere das Array mit Quick Sort
 * @param {number[]} arr
 * @returns {number[]}
 */
```

Sehen Sie, Copilot weiß, dass Sie einen Kommentar für die `quickSort`-Funktion schreiben möchten, und er generiert automatisch den Kommentar für Sie. Er weiß auch, wie er die Parameter und den Rückgabewert der `quickSort`-Funktion ausfüllen kann.

## Zahlenfolgen

Copilot kann Ihnen auch dabei helfen, Zahlenfolgen zu schreiben. Zum Beispiel können Sie Copilot verwenden, um ein Array von Zahlen von 1 bis 100 zu generieren.

Nehmen wir JavaScript als Beispiel, Sie können den folgenden Text in VSCode eingeben:

```
// Array von Zahlen von 1 bis 100
const arr = [1, 2,
```

Warten Sie dann auf den Vorschlag von Copilot und drücken Sie `Tab`, um den Vorschlag anzunehmen. Sie erhalten den folgenden Code:

```js
// Array von Zahlen von 1 bis 100
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
```

Sie können auch ein Array von Zahlen von 100 bis 1 oder etwas anderem generieren.

```js
// Array von Zahlen von 100 bis 1
const arr = [100, 99,

// Array von ungeraden Zahlen von 1 bis 100
const arr = [1, 3,
```

## Wörterbuch

Copilot kann auch als Wörterbuch verwendet werden. Zum Beispiel können Sie Copilot verwenden, um die Bedeutung des Wortes `test` nachzuschlagen.

Sie können den folgenden Text in VSCode schreiben:

```
// Erklären Sie das Wort test
test: eine Reihe von Aktionen, Ereignissen usw., die durchgeführt werden, um Genauigkeit, Zuverlässigkeit oder Qualität festzustellen.
```

Warten Sie dann darauf, dass Copilot den Code vorschlägt, und drücken Sie dann `Tab`, um den Vorschlag anzunehmen. Sie erhalten den folgenden Code:

```
// Erklären Sie das Wort test
test: eine Reihe von Aktionen, Ereignissen usw., die durchgeführt werden, um Genauigkeit, Zuverlässigkeit oder Qualität festzustellen.
```

Sie können weitere Wörter zum Nachschlagen hinzufügen:

```
// Erklären Sie die Wörter
test: eine Reihe von Aktionen, Ereignissen usw., die durchgeführt werden, um Genauigkeit, Zuverlässigkeit oder Qualität festzustellen.
algorithm:
programming:
LGTM:
```

Warten Sie dann darauf, dass Copilot den Code vorschlägt, und drücken Sie `Tab`, um den Vorschlag anzunehmen. Sie erhalten den folgenden Code:

```
// Erklären Sie die Wörter
test: eine Reihe von Aktionen, Ereignissen usw., die durchgeführt werden, um Genauigkeit, Zuverlässigkeit oder Qualität festzustellen.
algorithm: eine Reihe von Regeln oder Verfahren, die bei Berechnungen oder anderen problemlösenden Operationen, insbesondere von einem Computer, befolgt werden müssen.
programming: der Prozess des Schreibens von Computerprogrammen.
LGTM: sieht gut aus für mich.
```

## Übersetzung

Copilot kann Ihnen auch beim Übersetzen helfen. Sie können zum Beispiel Copilot verwenden, um den folgenden Text von Englisch nach Chinesisch zu übersetzen.

```
Englisch: Hello, I am Copilot, I can help you write code.
Chinesisch:
```

Warten Sie dann auf den Vorschlag von Copilot und drücken Sie die `Tab`-Taste, um den Vorschlag anzunehmen. Sie erhalten den folgenden Code:

```
Englisch: Hello, I am Copilot, I can help you write code.
Chinesisch: 你好，我是 Copilot，我可以帮助你写代码。
```

Sie können weitere Sprachen hinzufügen, um zu übersetzen:

```
Englisch: Hello, I am Copilot, I can help you write code.
Chinesisch: 你好，我是 Copilot，我可以帮助你写代码。
Traditionelles Chinesisch:
Japanisch:
```

Warten Sie dann auf den Vorschlag von Copilot und drücken Sie die `Tab`-Taste, um den Vorschlag anzunehmen. Sie erhalten den folgenden Code:

```
Englisch: Hello, I am Copilot, I can help you write code.
Chinesisch: 你好，我是 Copilot，我可以帮助你写代码。
Traditionelles Chinesisch: 你好，我是 Copilot，我可以幫助你寫代碼。
Japanisch: こんにちは、私は Copilot です。私はあなたがコードを書くのを手伝うことができます。
```

## Zusammenfassung

In diesem Artikel habe ich Ihnen weitere Anwendungsszenarien von Copilot vorgestellt. Copilot kann Ihnen sehr helfen, wenn Sie Code schreiben. Es kann Ihnen auch beim Schreiben von Dokumenten, Testfällen, Kommentaren, beim Generieren von Zahlenfolgen und beim Übersetzen helfen. Es ist sehr nützlich. Ich hoffe, Sie haben Spaß damit.