# Linux: Findコマンドでファイルを検索する

<Validator lang="ja" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9', 'macOS 13.2.1']" date="2023-04-04" />

Linuxの`find`コマンドは、さまざまなパラメータに基づいて、指定されたディレクトリ階層内のファイルやディレクトリを検索することができる強力なツールです。このチュートリアルでは、findコマンドとそのさまざまなオプションの使用方法について説明します。

## 基本構文

findコマンドの基本構文は次のとおりです。

```sh
find [directory] [expression]
```

ここで、`[directory]`はファイルを検索するディレクトリであり、`[expression]`は適用する検索条件です。findコマンドは、指定された`[directory]`とそのサブディレクトリ内で、指定された`[expression]`に一致するファイルやディレクトリを検索します。

findコマンドの出力は、指定された検索条件に一致するファイルやディレクトリのリストです。たとえば、次のコマンドを実行すると、

```sh
find . -name "*.txt"
```

現在のディレクトリとそのサブディレクトリにある、拡張子が`.txt`のすべてのファイルのリストが表示されます。

```
./example.txt
./example2.txt
./subdir/example3.txt
```

## ファイル名で検索する

ファイル名で検索するには、`-name`オプションに続けて検索したいファイル名を指定します。例えば、現在のディレクトリとそのサブディレクトリ内で`example.txt`という名前のファイルを検索するには、次のコマンドを使用します。

```sh
find . -name "example.txt"
```

これにより、現在のディレクトリとそのサブディレクトリ内のすべての`example.txt`という名前のファイルが検索されます。

特定の拡張子を持つすべてのファイルを検索するには、`-name`オプションにワイルドカード文字`*`と検索したい拡張子を続けて指定します。例えば、現在のディレクトリとそのサブディレクトリ内のすべての`.txt`拡張子を持つファイルを検索するには、次のコマンドを使用します。

```sh
find . -name "*.txt"
```

これにより、現在のディレクトリとそのサブディレクトリ内のすべての`.txt`拡張子を持つファイルが検索されます。

実際には、ワイルドカード文字`*`はファイル名の任意の部分に使用できます。例えば：

```sh
find . -name "example*"
find . -name "*example.txt"
find . -name "*example.*"
```

## ディレクトリの検索

現在のディレクトリとそのサブディレクトリ内のすべてのディレクトリを検索するには、`-type`オプションに続いて`d`を使用します。たとえば、現在のディレクトリとそのサブディレクトリ内のすべてのディレクトリを検索するには、次のコマンドを使用します。

```sh
find . -type d
```

これにより、現在のディレクトリとそのサブディレクトリ内のすべてのディレクトリが検索されます。

## 変更時間によるファイルの検索

特定の時間枠内に変更されたすべてのファイルを検索するには、`-mtime`オプションに続いて日数を指定します。過去の`n`日以内に変更されたファイルを検索する場合は、負の数`-n`を使用します。

たとえば、過去7日間に変更されたすべてのファイルを検索するには、次のコマンドを使用します。

```sh
find . -mtime -7
find . -mtime -1w
```

`-mtime`オプションのデフォルトの時間単位は日です。

macOSでは、他の時間単位を使用できます。

- `s` - 秒
- `m` - 分
- `h` - 時間
- `d` - 日
- `w` - 週

> `atime`オプションと`ctime`オプションを使用して、アクセス時間と作成時間に基づいてファイルを検索することもできます。

## ファイルサイズで検索する

特定のサイズより大きいすべてのファイルを検索するには、`-size`オプションにバイト単位のサイズと`+`記号を続けます。特定のサイズより小さいすべてのファイルを検索するには、`-size`オプションにバイト単位のサイズと`-`記号を続けます。

たとえば、現在のディレクトリとそのサブディレクトリ内の`10MB`より大きいすべてのファイルを検索するには、次のコマンドを使用します。

```sh
find . -size +10M
```

これにより、現在のディレクトリとそのサブディレクトリ内の`10MB`より大きいすべてのファイルが検索されます。

使用できる一般的なサイズの単位は次のとおりです。

- `c` - バイト
- `k` - キロバイト（1024バイト）
- `M` - メガバイト（1024キロバイト）
- `G` - ギガバイト（1024メガバイト）
- `T` - テラバイト（1024ギガバイト）
- `P` - ペタバイト（1024テラバイト）

## 検索条件の組み合わせ

複数の検索条件を組み合わせて、特定の条件に一致するファイルを検索できます。たとえば、特定の拡張子を持つすべてのファイルで、過去7日間に変更されたファイルを検索するには、次のコマンドを使用します。

```sh
find . -name "*.txt" -type f -mtime -7
```

これにより、現在のディレクトリとそのサブディレクトリ内で、過去7日間に変更された`.txt`拡張子を持つすべてのファイルが検索されます。

## findコマンドの出力の使用

findコマンドの出力は、さまざまな方法で使用できます。以下にいくつかの例を示します。

findコマンドの出力をファイルに保存するには、次のコマンドを使用します。

```sh
find . -name "*.txt" > files.txt
```

これにより、拡張子が`.txt`のすべてのファイルの名前が`files.txt`という名前のファイルに保存されます。

findコマンドの出力を別のコマンドの入力として使用するには、`xargs`コマンドを使用します。

たとえば、特定の拡張子を持つすべてのファイルを削除するには、次のコマンドを使用します。

```sh
find . -name "*.txt" -type f | xargs rm
```

findコマンドによって見つかった各ファイルに対してアクションを実行するには、`-exec`オプションを使用します。

たとえば、特定の拡張子を持つすべてのファイルのアクセス許可を変更するには、次のコマンドを使用します。

```sh
find . -name "*.txt" -type f -exec chmod 644 {} \;
```

`-exec`引数の構文は次のとおりです。

```sh
-exec command {} \;
```

- `command`は、findによって見つかったファイルで実行するコマンドです。
- `{}`は、findによって見つかったファイルの名前に置き換えられるプレースホルダーです。
- `\;`は、コマンドを終了し、`-exec`引数の終わりを示すために使用されます。

findコマンドで見つかったファイルの数を数えるには、`wc`コマンドを使用します。たとえば、特定の拡張子を持つファイルの数を数えるには、次のコマンドを使用します。

```sh
find . -name "*.txt" -type f | wc -l
```

## 結論

Linuxの`find`コマンドは、さまざまな基準に基づいてファイルやディレクトリを検索することができる強力なツールです。さまざまなオプションを使用して検索条件を組み合わせることで、必要なファイルやディレクトリを素早く見つけることができます。また、findコマンドの出力をさまざまな方法で使用して、見つかったファイルに対してアクションを実行することもできます。