# How to use Github Copilot Chat

## What is Copilot Chat

Copilot (<https://github.com/features/copilot/>) is an AI coding aid provided by Github that provides AI-learning based coding suggestions during the coding process. In many cases, all that is needed is comments or function names, and Copilot can instance the complete code.

For more information, please visit [How to use Github Copilot and Shortcuts](/en/vscode/copilot-usage-and-shortcut).

Copilot Chat is related to Copilot, it shares the subscription with Copilot, but it is not the same thing. Copilot Chat is a chatbot that can be used in VSCode. It can be used to chat with Copilot, and Copilot will give you code suggestions based on your chat content. For example, you can ask Copilot Chat tech questions, or ask Copilot Chat to help you write code.

What makes Copilot Chat different from Copilot is that Copilot Chat is a chatbot, this means you don't have to prompt it with code, you can just chat with it, and it will give you the answer or code suggestions.

## Installing the plugin

To use Copilot Chat, you need to install a plugin, search `Copilot Chat` in VSCode's plugin menu to find the plugin, the name is `Github Copilot Chat`, the corresponding plugin marketplace address is <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat>, install it.

![Installation screenshot](/attachments/vscode/copilot-chat-usage/01.png)

## Use

Click the `Chat` menu in the VSCode left sidebar to open the chat window, and then you can chat with Copilot Chat.

You can ask Copilot Chat questions on programming, such as `What's the operator in JavaScript to perform a bit xor?`, it will answer `In JavaScript, the bitwise XOR operator is represented by the  caret symbol (^)`, and give you a code example and its explanation. It's quite useful when you want to query for some programming knowledge.

![Screenshot of chat window](/attachments/vscode/copilot-chat-usage/02.png)

### Write code

Except for programming knowledge, you can also ask Copilot Chat to help you write code, such as `Write a function to calculate the sum of two numbers in JavaScript`, it will give you a code example of the function you want to write:

```
Sure, here is a simple JavaScript function that calculates the sum of two numbers:

function sum(a, b) {
    return a + b;
}

You can use this function by calling it with two numbers as arguments, like so: sum(5, 3). This would return 8.
```

When your mouse hovers over the code example, you can see several action buttons, you can copy the code, or insert the code at the current cursor position of the editor, you can also save the code to a new file or run the code in the terminal (if it's a runnable shell command).

![Screenshot of code example](/attachments/vscode/copilot-chat-usage/03.png)

The most useful button is the `Insert` button, you can insert the newly created code to an existing file, or you can use this button to replace a piece of selected code, we will talk about this in detail later.

If you are not satisfied with the code example, you can talk to Copilot Chat again, such as `Please check the input data type, if one of them is not a number, return 0`, Copilot Chat will give you a new code example:

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

As you can see, you can ask Copilot Chat to improve the code over and over again, until you are satisfied with the code. The most important thing is: It will never complain about you, what a nice guy!

### Modify code

If you have a piece of code that you want to modify, you can select the code and then click the `Chat` menu in the VSCode left sidebar to open the chat window, and then you can chat with Copilot Chat. The selected code will be sent to Copilot Chat as context, and Copilot Chat will give you code suggestions based on the context and what you say.

For example, we have a piece of code with a bug:

```javascript
function sumArr(arr) {
    let sum = 0;
    for (let i in arr) {
        sum += i;
    }
    return sum;
}
```

This function takes an array of numbers as input and returns the sum of the numbers in the array. But there is a bug in the code, it reads the key of the array instead of the value, so it returns the sum of the array index instead of the sum of the array value.

We want to fix the bug, so we select the code and open the chat window, and then we say `Please fix the bug`, Copilot Chat will give us a code example that fixes the bug:

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

As you can see, Copilot Chat has fixed the bug for us, and it also gives us an explanation of the code.

What's more, you can do the same thing in a more simple way, you can select the code and then input `/fix` or click `/fix the problems in my code`, Copilot Chat will fix ths code just as we did before.

### Convert code

Sometimes you may need to convert a list of values to an array, or map or something else, for example, we copy a map of key-value pairs from an excel table:

```
name    age
John    20
Mary    21
Rose    22
Robert  18
Jane    19
```

You can select the text and then open the chat window, and then you can say `Convert the text to an array (JSON), the element of array is another array contains name & age, for example: [['John', 20]], just give out result, no need to give out code, no explaination`, Copilot Chat will give you a code example that converts the text to an array:

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

Note, You should describe your requests as detailed as possible, so Copilot Chat can understand your request and give you the correct result. For example, if you don't require the output, Copilot Chat will give you the code example that converts the text to an array, which is not what you want.

Of course, you can ask Copilot Chat to convert the text to other data structures, such as a map, or a list of objects, etc.

## Conclusion

We can use Copilot Chat to do many many things, such as:

- convert text to data structure
- add types for code
- convert a piece of code to another programming language
- translate your i18n file to another language
- add error handling for code
- fix small bugs
- refactor the code to make it more readable
- ...

The only limit is your imagination and your patience. Sometimes Copilot Chat may not understand your request, or it may give you a wrong result, but you can keep improving your request until you get the correct result. After some practice, you will find that Copilot Chat is a very useful tool.
