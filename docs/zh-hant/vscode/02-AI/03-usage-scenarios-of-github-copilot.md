# Github Copilot的使用場景

Copilot（<https://copilot.github.com/>）是Github提供的一個人工智能編碼輔助工具，在編碼過程中提供基於人工智能學習的編碼建議。在很多情況下，Copilot可以只用註釋或函數名就能實例化出完整的代碼。

但是你知道嗎，你可以在更多的使用場景中使用Copilot？Copilot還可以補充測試用例、註釋、文檔、數字序列，甚至是翻譯。在這篇文章中，我們將介紹Copilot的更多使用場景。

> 如果你想了解Copilot的基礎，請參考[如何使用Github Copilot和快捷鍵]（/zh-hant/vscode/copilot-usage-and-shortcut.html）。

## 解決算法問題

Copilot可以幫助你解決算法問題。例如，你可以用Copilot來解決尋找數組最大值的問題。

以JavaScript爲例，你可以在VSCode中寫下以下文字。

```
// 使用快速排序對數組進行排序

```

然後等待Copilot建議代碼，然後按`Tab`接受建議，你會得到以下代碼。

```js
// 使用快速排序對數組進行排序
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

如果你把註釋改爲`//使用冒泡排序對數組進行排序`，你會得到以下代碼。

```js
// 使用bubble sort對數組進行排序

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

哇，Copilot可以爲你解決算法問題!

## 編寫測試用例

Copilot還可以幫助你編寫測試用例。例如，你可以用Copilot爲上一節中的`quickSort`函數編寫測試用例。

以JavaScript爲例，你可以在VSCode中寫下以下文字。

```
// 測試 quickSort
test('quickSort', () => {
```

然後等待Copilot建議代碼，然後按`Tab`接受建議，你會得到以下代碼。

```js
// 測試 quickSort
test('quickSort', () => {
  expect(quickSort([1, 2, 3, 4, 5]).toEqual([1, 2, 3, 4, 5])。
  expect(quickSort([5, 4, 3, 2, 1]).toEqual([1, 2, 3, 4, 5])。
  expect(quickSort([1, 3, 2, 5, 4]).toEqual([1, 2, 3, 4, 5])。
});
```

舉個更復雜的例子，假設你有一個叫做`UserService`的服務，它有一個叫做`getUserInfo`的方法來獲取用戶信息，還有一個叫做`setUserInfo`的方法來設置用戶信息。你可以在VSCode中寫下以下文字。

```
// 測試
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName');
```

然後等待Copilot建議代碼，然後按`Tab`接受建議，你將得到以下代碼。

```js
// 測試
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName')。
expect(userService.getUserInfo()).toEqual({
  name: 'testName',
});
```

看，Copilot知道你想測試`setUserInfo`方法，它將自動爲你生成測試代碼。

如果你用它來編寫更多的測試用例，你會發現Copilot足夠聰明，可以爲你編寫測試用例。它知道你想測試什麼，它將自動爲你生成測試代碼。如果你多次測試一個方法，Copilot甚至會爲你命名變量屬性（`userInfo2`, `userInfo3`, 等等）。而且它還知道在測試後銷燬數據，這樣就不會影響下一次的測試。

## 寫註釋

Copilot還可以幫助你寫註釋。例如，你可以用Copilot爲上一節中的 "quickSort "函數寫註釋。

以JavaScript爲例，你可以在VSCode中寫下以下文字。

```js
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

然後你在`quickSort`函數的上面一行寫上以`/**`開頭的註釋，等待Copilot建議代碼，然後按`Tab`接受建議，你會得到以下代碼。

```js
/**
 *使用快速排序對數組進行排序
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

然後你可以像這樣完成`quickSort`函數的參數和返回值。

```js
/**
 * 使用快速排序對數組進行排序
 * @param
 */
```

然後等待Copilot建議代碼，然後按`Tab`接受建議，你將得到以下代碼。

```js
/**
 * 使用快速排序對數組進行排序
 * @param {number[]} arr
 * @returns {number[]}
 */
```

看，Copilot知道你想爲`quickSort`函數寫一個註釋，它會自動爲你生成註釋，還知道如何履行`quickSort`函數的參數和返回值。

## 數字序列

Copilot還可以幫助你編寫數字序列。例如，你可以用Copilot生成一個從1到100的數組。

以JavaScript爲例，你可以在VSCode中寫下以下文字。

```js
// 從1到100的數字數組
const arr = [1, 2,
```

然後等待Copilot建議代碼，然後按`Tab`接受建議，你會得到以下代碼。

```js
//從1到100的數字數組
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50。51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
```

你也可以生成一個從100到1的數字數組或其他東西。

```js
// 從100到1的數字數組
const arr = [100, 99,

// 從1到100的奇數數組
const arr = [1, 3,
```

## 詞典

Copilot也可以作爲詞典使用。例如，你可以用Copilot查詢"test"這個詞的含義。

你可以在VSCode中寫下以下文字。

```
//解釋一下test這個詞
測試：爲了
```

然後等待Copilot建議代碼，然後按`Tab`接受建議，你將得到以下代碼。

```
// 解釋一下測試這個詞
測試：爲了檢查某物是否符合要求，或爲了證明某事是否正確而進行的一系列操作。
```

你可以添加更多的詞來查詢。

```
// 解釋這些詞
測試：爲了檢查某物是否符合要求，或爲了證明某事是否正確而進行的一系列操作。
算法：
編程：
LGTM：
```

然後等待Copilot建議代碼，然後按`Tab`接受建議，你將得到以下代碼。

```
//解釋一下這些詞
測試：爲了確定準確性、可靠性或質量而進行的一系列行動、事件等。
算法：解決問題的一種方法或步驟。
編程：用計算機語言編寫的程序。
LGTM：看起來不錯。
```

## 翻譯

Copilot還可以幫助你進行翻譯。例如，你可以用Copilot將以下文字從英文翻譯成中文。

```
English: Hello, I am Copilot, I can help you write code.
Chinese:
```

然後等待Copilot建議代碼，然後按`Tab`接受建議，你會得到以下代碼。

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以幫助你寫代碼。
```

你可以添加更多的語言來翻譯。

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以幫助你寫代碼。
Traditional Chinese:
Japanese:
```

然後等待Copilot建議代碼，然後按`Tab`接受建議，你會得到以下代碼。

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以幫助你寫代碼。
Traditional Chinese: 你好，我是 Copilot，我可以幫助你寫代碼。
Japanese: こんにちは、私は Copilot です。私はあなたがコードを書くのを手伝うことができます。
```

## 總結

在這篇文章中，我爲你介紹了Copilot的更多使用場景。當你寫代碼時，Copilot可以提供很多幫助。它還可以幫助你寫文檔，寫測試用例，寫註釋，生成數字序列，以及翻譯。它是非常有用的。我希望你能喜歡它。
