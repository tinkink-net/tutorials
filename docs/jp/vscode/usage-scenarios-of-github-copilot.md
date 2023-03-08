# Github Copilotの使用シナリオ

Copilot (<https://copilot.github.com/>) は、コーディングプロセス中にAI学習ベースのコーディング提案を提供するGithubが提供するAIコーディング支援です。多くの場合、Copilotはコメントや関数名だけで完全なコードをインスタンス化することができます。

しかし、あなたはCopilotをより多くの使用シナリオで使用できることを知っていますか？ Copilotは、テストケース、コメント、ドキュメント、数列、さらには翻訳を補完することもできます。この記事では、Copilotのより多くの使用シナリオを紹介します。

> Copilotの基礎を知りたい場合は、[Github Copilotとショートカットの使用方法](/en/vscode/copilot-usage-and-shortcut.html)を参照してください。

## アルゴリズム問題を解決する

Copilotはアルゴリズム問題を解決するのに役立ちます。例えば、配列の最大値を見つける問題を解決するためにCopilotを使用できます。

JavaScriptを例に取ると、VSCodeに次のテキストを書くことができます。

```
// クイックソートを使用して配列をソートする
```

その後、Copilotがコードを提案するのを待ち、`Tab`を押して提案を受け入れると、次のコードが得られます。

```js
// クイックソートを使用して配列をソートする
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

コメントを`// バブルソートを使用して配列をソートする`に変更すると、次のコードが得られます。

```js
// バブルソートを使用して配列をソートする

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

すごい、Copilotはアルゴリズム問題を解決してくれるんだ！

## テストケースを書く

Copilotはテストケースの作成も手助けしてくれます。例えば、前のセクションで説明した`quickSort`関数のテストケースを作成することができます。

JavaScriptを例にとると、VSCodeに以下のテキストを書きます。

```
// Test quickSort
test('quickSort', () => {
```

そしてCopilotがコードを提案するのを待ち、`Tab`キーを押して提案を受け入れると、以下のコードが得られます。

```js
// Test quickSort
test('quickSort', () => {
  expect(quickSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(quickSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(quickSort([1, 3, 2, 5, 4])).toEqual([1, 2, 3, 4, 5]);
});
```

もう少し複雑な例を挙げると、`UserService`というサービスがあり、ユーザ情報を取得する`getUserInfo`メソッドと、ユーザ情報を設定する`setUserInfo`メソッドがあるとします。VSCodeに以下のテキストを書きます。

```
// test
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName');
```

そしてCopilotがコードを提案するのを待ち、`Tab`キーを押して提案を受け入れると、以下のコードが得られます。

```js
// test
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName');
expect(userService.getUserInfo()).toEqual({
  name: 'testName',
});
```

Copilotは、`setUserInfo`メソッドをテストしたいと思っていることを知っているため、自動的にテストコードを生成します。

さらに多くのテストケースを書く場合、Copilotはあなたのためにテストコードを自動的に生成することができます。Copilotは、何をテストしたいかを知っているため、変数プロパティの名前を自動的に付けることができます（`userInfo2`、`userInfo3`など）。そして、テスト後にデータを破棄することを知っているため、次のテストに影響を与えることはありません。

## コメントを書く

Copilotはコメントの書き方も手助けしてくれます。例えば、前のセクションで`quickSort`関数のためのコメントを書くとします。

JavaScriptを例にとって、VSCodeで次のようなテキストを書くことができます。

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

そして、次のようにして`quickSort`関数のパラメータと戻り値を満たすようにコメントを書きます。

```js
/**
 * Sort the array using quick sort
 * @param
 */
```

そして、Copilotがコードを提案するのを待ち、`Tab`キーを押して提案を受け入れると、次のコードが得られます。

```js
/**
 * Sort the array using quick sort
 * @param {number[]} arr
 * @returns {number[]}
 */
```

Copilotは、`quickSort`関数のためのコメントを書きたいと思っていることを知っており、自動的にコメントを生成し、`quickSort`関数のパラメータと戻り値を満たす方法も知っています。

## 数列

Copilotは、数列を書くのを手伝うこともできます。例えば、Copilotを使って1から100までの数値の配列を生成することができます。

JavaScriptを例にとると、VSCodeで以下のテキストを書くことができます。

```
// array of numbers from 1 to 100
const arr = [1, 2,
```

そしてCopilotがコードを提案するのを待ち、`Tab`を押して提案を受け入れると、以下のコードが得られます。

```js
// array of numbers from 1 to 100
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
```

100から1までの数値の配列や、その他の数列を生成することもできます。

```js
// array of numbers from 100 to 1
const arr = [100, 99,

// array of odd numbers from 1 to 100
const arr = [1, 3,
```
## 辞書

Copilotは辞書としても使用できます。たとえば、単語「test」の意味を調べるためにCopilotを使用できます。

以下のテキストをVSCodeに入力できます。

```
// explaine the word test
test: 精度、信頼性、品質を決定するために実行される一連のアクション、イベントなど。
```

Copilotがコードを提案するのを待ち、提案を受け入れるために`Tab`を押すと、以下のコードが表示されます。

```
// explaine the word test
test: 精度、信頼性、品質を決定するために実行される一連のアクション、イベントなど。
```

他の単語を追加して調べることもできます。

```
// explaine the words
test: 精度、信頼性、品質を決定するために実行される一連のアクション、イベントなど。
algorithm: 計算やその他の問題解決操作で必要なルールや手順のセット、特にコンピュータによって。
programming: コンピュータプログラムを書くプロセス。
LGTM: 私にとっては良いように見えます。
```

Copilotがコードを提案するのを待ち、提案を受け入れるために`Tab`を押すと、以下のコードが表示されます。

```
// explaine the words
test: 精度、信頼性、品質を決定するために実行される一連のアクション、イベントなど。
algorithm: 計算やその他の問題解決操作で必要なルールや手順のセット、特にコンピュータによって。
programming: コンピュータプログラムを書くプロセス。
LGTM: 私にとっては良いように見えます。
```

## 翻訳

Copilotは翻訳も手助けしてくれます。例えば、以下のテキストを英語から中国語に翻訳するのにCopilotを使うことができます。

```
English: Hello, I am Copilot, I can help you write code.
Chinese:
```

Copilotがコードを提案するのを待ち、`Tab`を押して提案を受け入れると、以下のコードが得られます。

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
```

他の言語も追加できます。

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
Traditional Chinese:
Japanese:
```

Copilotがコードを提案するのを待ち、`Tab`を押して提案を受け入れると、以下のコードが得られます。

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
Traditional Chinese: 你好，我是 Copilot，我可以幫助你寫代碼。
Japanese: こんにちは、私は Copilot です。私はあなたがコードを書くのを手伝うことができます。
```

## 要約

この記事では、Copilotのより多くの使用シナリオを紹介しました。Copilotはコードを書くときに大いに役立ちます。ドキュメントの作成、テストケースの作成、コメントの書き込み、数列の生成、翻訳なども手助けしてくれます。非常に便利です。お楽しみいただけると嬉しいです。
