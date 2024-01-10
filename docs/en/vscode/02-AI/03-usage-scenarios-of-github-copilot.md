# Usage scenarios of Github Copilot

Copilot (<https://copilot.github.com/>) is an AI coding aid provided by Github that provides AI-learning based coding suggestions during the coding process. In many cases, Copilot can instantiate complete code with just comments or function names.

But do you know, You can use Copilot in more usage scenarios? Copilot can also supplement test cases, comments, documents, number sequences, and even translations. In this article, we will introduce more usage scenarios of Copilot.

> If you want to know the bases of Copilot, please refer to [How to use Github Copilot and shortcuts](/en/vscode/copilot-usage-and-shortcut.html).

## Solve algorithm problems

Copilot can help you solve algorithm problems. For example, you can use Copilot to solve the problem of finding the maximum value of an array.

Take JavaScript as an example, you can write the following text in the VSCode:

```
// Sort the array using quick sort

```

Then wait Copilot to suggest the code, and then press `Tab` to accept the suggestion, and you will get the following code:

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

If you change the comment to `// Sort the array using bubble sort`, you will get the following code:

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

Wow, Copilot can solve the algorithm problem for you!

## Write test cases

Copilot can also help you write test cases. For example, you can use Copilot to write test cases for the `quickSort` function in the previous section.

Take JavaScript as an example, you can write the following text in the VSCode:

```
// Test quickSort
test('quickSort', () => {
```

Then wait Copilot to suggest the code, and then press `Tab` to accept the suggestion, and you will get the following code:

```js
// Test quickSort
test('quickSort', () => {
  expect(quickSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(quickSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(quickSort([1, 3, 2, 5, 4])).toEqual([1, 2, 3, 4, 5]);
});
```

Take a more complicated example, suppose you have a service called `UserService` that has a method called `getUserInfo` to get user information, and a method called `setUserInfo` to set user information. You can write the following text in the VSCode:

```
// test
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName');
```

Then wait Copilot to suggest the code, and then press `Tab` to accept the suggestion, and you will get the following code:

```js
// test
const userService = new UserService();
const userInfo = userService.getUserInfo();
userInfo.setUserInfo('name', 'testName');
expect(userService.getUserInfo()).toEqual({
  name: 'testName',
});
```

See, Copilot knows that you want to test the `setUserInfo` method, and it will automatically generate the test code for you.

If you use it to write more test cases, you will find that Copilot is smart enough to write test cases for you. It knows what your want to test, and it will automatically generate the test code for you. If you test a method many times, Copilot will even name the variables property for you (`userInfo2`, `userInfo3`, etc.). And it also knows to destroy the data after the test, so that the next test will not be affected.

## Write comments

Copilot can also help you write comments. For example, you can use Copilot to write comments for the `quickSort` function in the previous section.

Take JavaScript as an example, you can write the following text in the VSCode:

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

Then you write the comment starting with `/**` in the line above the `quickSort` function, and wait Copilot to suggest the code, and then press `Tab` to accept the suggestion, and you will get the following code:

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

Then you can fulfill the parameters and return value of the `quickSort` function like this:

```js
/**
 * Sort the array using quick sort
 * @param
 */
```

Then wait Copilot to suggest the code, and then press `Tab` to accept the suggestion, and you will get the following code:

```js
/**
 * Sort the array using quick sort
 * @param {number[]} arr
 * @returns {number[]}
 */
```

See, Copilot knows that you want to write a comment for the `quickSort` function, and it will automatically generate the comment for you, and also know how to fulfill the parameters and return value of the `quickSort` function.

## Number sequences

Copilot can also help you write number sequences. For example, you can use Copilot to generate an array of numbers from 1 to 100.

Take JavaScript as an example, you can write the following text in the VSCode:

```
// array of numbers from 1 to 100
const arr = [1, 2,
```

Then wait Copilot to suggest the code, and then press `Tab` to accept the suggestion, and you will get the following code:

```js
// array of numbers from 1 to 100
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
```

You can also generate an array of numbers from 100 to 1 or something else.

```js
// array of numbers from 100 to 1
const arr = [100, 99,

// array of odd numbers from 1 to 100
const arr = [1, 3,
```

## Dictionary

Copilot can also be used as a dictionary. For example, you can use Copilot to look up the meaning of the word `test`.

You can write the following text in the VSCode:

```
// explaine the word test
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
```

Then wait Copilot to suggest the code, and then press `Tab` to accept the suggestion, and you will get the following code:

```
// explaine the word test
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
```

You can add more words to look up:

```
// explaine the words
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
algorithm:
programming:
LGTM:
```

Then wait Copilot to suggest the code, and then press `Tab` to accept the suggestion, and you will get the following code:

```
// explaine the words
test: a series of actions, events, etc., carried out in order to determine accuracy, reliability, or quality.
algorithm: a set of rules or procedures that must be followed in calculations or other problem-solving operations, especially by a computer.
programming: the process of writing computer programs.
LGTM: looks good to me.
```

## Translation

Copilot can also help you translate. For example, you can use Copilot to translate the following text from English to Chinese.

```
English: Hello, I am Copilot, I can help you write code.
Chinese:
```

Then wait Copilot to suggest the code, and then press `Tab` to accept the suggestion, and you will get the following code:

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
```

You can add more languages to translate:

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
Traditional Chinese:
Japanese:
```

Then wait Copilot to suggest the code, and then press `Tab` to accept the suggestion, and you will get the following code:

```
English: Hello, I am Copilot, I can help you write code.
Chinese: 你好，我是 Copilot，我可以帮助你写代码。
Traditional Chinese: 你好，我是 Copilot，我可以幫助你寫代碼。
Japanese: こんにちは、私は Copilot です。私はあなたがコードを書くのを手伝うことができます。
```

## Summary

In this article, I introduced more usage scenarios of Copilot for you. Copilot can help a lot when you write code. It can also help you write documents, write test cases, write comments, generate number sequences, and translate. It is very useful. I hope you can enjoy it.
