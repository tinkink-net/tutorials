# 如何使用Github Copilot Chat

## 什么是Copilot Chat

Copilot (<https://github.com/features/copilot/>) 是由Github提供的AI编码助手，在编码过程中提供基于AI学习的编码建议。在许多情况下，只需要注释或函数名称，Copilot就可以生成完整的代码。

更多信息，请访问[如何使用Github Copilot和快捷方式](/zh-hans/vscode/copilot-usage-and-shortcut.html)。

Copilot Chat与Copilot相关，它与Copilot共享订阅，但它们并不是同一样东西。Copilot Chat是一个可以在VSCode中使用的聊天机器人。您可以使用它与Copilot进行聊天，Copilot将根据您的聊天内容给出代码建议。例如，您可以向Copilot Chat提问技术问题，或者要求Copilot Chat帮助您编写代码。

Copilot Chat与Copilot的不同之处在于，Copilot Chat是一个聊天机器人，这意味着您不需要用代码提示它，您只需与它聊天，它就会给您答案或代码建议。

## 安装插件

要使用 Copilot Chat，您需要安装一个插件，在 VSCode 的插件菜单中搜索 `Copilot Chat`，找到插件，名称为 `Github Copilot Chat`，对应的插件市场地址是 <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat>，安装它。

![安装截图](/attachments/vscode/copilot-chat-usage/01.png)

## 使用

点击 VSCode 左侧边栏的 `Chat` 菜单打开聊天窗口，然后您可以与 Copilot Chat 进行聊天。

您可以向 Copilot Chat 提问关于编程的问题，例如 `JavaScript 中执行位异或的运算符是什么？`，它会回答 `在 JavaScript 中，位异或运算符用插入符号 (^) 表示`，并给出一个代码示例和解释。当您想查询一些编程知识时，它非常有用。

![聊天窗口截图](/attachments/vscode/copilot-chat-usage/02.png)

### 编写代码

除了编程知识外，您还可以向 Copilot Chat 请求帮助编写代码，比如 `在 JavaScript 中编写一个计算两个数字之和的函数`，它会给您一个所需函数的代码示例：

```
当然，这是一个简单的 JavaScript 函数，用于计算两个数字的和：

function sum(a, b) {
    return a + b;
}

您可以通过将两个数字作为参数调用此函数来使用它，例如：sum(5, 3)。这将返回 8。
```

当鼠标悬停在代码示例上时，您会看到几个操作按钮，您可以复制代码，或将代码插入到当前编辑器光标位置，您还可以将代码保存到新文件中或在终端中运行代码（如果是可运行的 shell 命令）。

![代码示例的屏幕截图](/attachments/vscode/copilot-chat-usage/03.png)

最有用的按钮是 `插入` 按钮，您可以将新创建的代码插入到现有文件中，或者可以使用此按钮替换选定的代码片段，我们将在后面详细讨论此功能。

如果您对代码示例不满意，可以再次与 Copilot Chat 对话，例如 `请检查输入数据类型，如果其中一个不是数字，则返回 0`，Copilot Chat 将给您一个新的代码示例：

```
这是一个检查输入数据类型的函数的修订版本：

function sum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return 0;
    }
    return a + b;
}
```

在这个版本中，函数检查a或b是否不是数字。如果其中一个不是数字，函数返回0。否则，它返回a和b的和。

正如你所看到的，你可以一次又一次地要求Copilot Chat改进代码，直到你对代码满意为止。最重要的是：它永远不会抱怨你，多么好的人！

### 修改代码

如果你有一段想要修改的代码，你可以选择代码，然后点击 VSCode 左侧边栏的 `Chat` 菜单来打开聊天窗口，然后你可以与 Copilot Chat 进行对话。选中的代码将作为上下文发送给 Copilot Chat，Copilot Chat 将根据上下文和你的说法给出代码建议。

例如，我们有一段有 bug 的代码：

```javascript
function sumArr(arr) {
    let sum = 0;
    for (let i in arr) {
        sum += i;
    }
    return sum;
}
```

这个函数接受一个数字数组作为输入，并返回数组中数字的总和。但是代码中有一个 bug，它读取的是数组的键而不是值，所以它返回的是数组索引的总和而不是数组值的总和。

我们想要修复这个 bug，所以我们选择了这段代码并打开了聊天窗口，然后我们说 `Please fix the bug`，Copilot Chat 将给出一个修复 bug 的代码示例：

```
function sumArr(arr) {
    let sum = 0;
    for (let i of arr) {
        sum += i;
    }
    return sum;
}
```

在原始代码中，使用了for...in循环，它遍历对象的可枚举属性，这里是数组的索引。为了修复错误，应该使用for...of循环，它遍历可迭代对象的值，这里是数组的元素。
```

正如您所看到的，Copilot Chat已经为我们修复了错误，并且还给出了代码的解释。

更重要的是，您可以以更简单的方式做同样的事情，只需选择代码，然后输入`/fix`或点击`/fix the problems in my code`，Copilot Chat将像我们之前所做的那样修复代码。

### 转换代码

有时候你可能需要将一组值转换为数组、映射或其他数据结构，例如，我们从一个 Excel 表格中复制了一个键值对的映射：

```
name    age
John    20
Mary    21
Rose    22
Robert  18
Jane    19
```

你可以选择这段文本，然后打开聊天窗口，然后说“将文本转换为数组（JSON），数组的元素是包含姓名和年龄的另一个数组，例如：[['John', 20]]，只给出结果，不需要给出代码，不需要解释”，Copilot Chat 将给你一个将文本转换为数组的代码示例：

```
这是将文本转换为数组的结果：

[
    ["John", 20],
    ["Mary", 21],
    ["Rose", 22],
    ["Robert", 18],
    ["Jane", 19]
]
```

注意，你应该尽可能详细地描述你的请求，这样 Copilot Chat 才能理解你的请求并给出正确的结果。例如，如果你不要求输出结果，Copilot Chat 将给你一个将文本转换为数组的代码示例，这不是你想要的。

当然，你可以要求 Copilot Chat 将文本转换为其他数据结构，比如映射或对象的列表等。

## 结论

我们可以使用Copilot Chat来做很多事情，比如：

- 将文本转换为数据结构
- 为代码添加类型
- 将一段代码转换为另一种编程语言
- 将您的i18n文件翻译成其他语言
- 为代码添加错误处理
- 修复小错误
- 重构代码以使其更易读
- ...

唯一的限制是您的想象力和耐心。有时候Copilot Chat可能无法理解您的请求，或者可能给您错误的结果，但您可以不断改进您的请求，直到获得正确的结果。经过一些实践，您会发现Copilot Chat是一个非常有用的工具。
