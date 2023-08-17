# 初心者のための基本的なLinuxコマンド

<Validator lang="ja" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-04-27" />

Linuxに慣れていない場合、基本的なコマンドを学ぶことは、ファイルシステムを操作するために必要不可欠です。以下は、最も重要なコマンドとその使い方です。

## cd (Change Directory)

`cd`コマンドは、Linuxファイルシステム内のディレクトリに移動するために使用されます。以下が使用方法です。

```sh
cd [directory_name]
```

例えば、「Documents」フォルダに入るには、次のように入力します。

```sh
cd Documents
```

Linuxには、「ホーム」ディレクトリと呼ばれる特別なディレクトリがあります。これは、Linuxシステムに最初にログインしたときに配置されるディレクトリです。ホームディレクトリを表すために、`~`を使用できます。例えば、ホームディレクトリに入るには、次のように入力します。

```sh
cd ~
```

親ディレクトリを表すために、`..`を使用することもできます。例えば、「Documents」フォルダにいて親ディレクトリに入りたい場合は、次のように入力します。

```sh
cd ..
```

複数のディレクトリ名を使用してディレクトリに入ることもできます（`/`で区切られます）。例えば、「ホーム」ディレクトリの下の「Documents」フォルダに入りたい場合は、次のように入力します。

```sh
cd ~/Documents
```

## ls (リスト)

lsコマンドは、ディレクトリの内容を表示するために使用されます。使い方は以下の通りです。

```sh
ls [directory_name]
```

例えば、`/usr/share`フォルダの内容をリストするには、以下のように入力します。

```sh
ls /usr/share
```

出力は以下のようになります。

```sh
applications  backgrounds  color  cups  dbus-1  doc  fonts  games  glib-2.0  gnome-shell  icons  i18n  locale  man  metainfo  mime  perl  pixmaps  polkit-1  systemd  themes  xml
```

`/usr/share`ディレクトリのすべてのファイルとディレクトリが表示されます。ただし、表示されるのはファイルとディレクトリの名前だけです。ファイルとディレクトリに関する詳細情報を表示するには、`-l`オプションを使用できます。例えば：

```sh
ls -l /var/log
```

出力は以下のようになります。

```sh
total 172
-rw-r--r-- 1 root     root    8241 Sep 14 00:00 alternatives.log
-rw-r----- 1 syslog   adm   134781 Sep 16 23:47 auth.log
-rw-r--r-- 1 root     root    1040 Sep 14 00:00 bootstrap.log
drwxr-xr-x 2 root     root    4096 Jan 25 18:16 cups
-rw-r--r-- 1 root     root    4935 Sep 14 00:00 dmesg
...
```

`-l`オプションにより、左から右に、ファイルの種類とアクセス権、所有者、グループ、ファイルサイズ、更新日時、ファイル名が表示されることがわかります。

- ファイルタイプを示す最初の文字。`-` は通常のファイルを、`d` はディレクトリを、`l` はシンボリックリンクを示します。
- オーナーとグループ
- ファイルサイズ。ディレクトリの場合、サイズは常に 4096 バイトです。
- 最終更新日時
- ファイル名

## mkdir (Make Directory)

`mkdir` コマンドは、新しいディレクトリを作成するために使用されます。以下は使用方法です。

```sh
mkdir [directory_name]
```

例えば、新しいディレクトリ「Projects」を作成するには、次のように入力します。

```sh
mkdir Projects/
```

このコマンドには出力がありませんが、ディレクトリが作成されたことを確認するために ls コマンドを使用できます。

複数のディレクトリを一度に作成する場合は、`-p` オプションを使用できます。例えば、「Documents」フォルダーの下に「Projects」という名前のディレクトリを作成するには、次のように入力します。

```sh
mkdir -p Documents/Projects
```

## rm (削除)

`rm`コマンドは、ファイルやディレクトリを削除するために使用されます。以下が使用方法です。

```sh
rm [ファイル名またはディレクトリ名]
```

例えば、「example.txt」というファイルを削除する場合は、以下のように入力します。

```sh
rm example.txt
```

ディレクトリを削除する場合は、`-r`オプションを使用できます。例えば、「Projects」というディレクトリを削除する場合は、以下のように入力します。

```sh
rm -r Projects/
```

ディレクトリ内のすべてのファイルとサブディレクトリが削除されます。

ほとんどの場合、削除を確認するように促されます。確認をスキップする場合は、`-f`オプションを使用できます。例えば：

```sh
rm -r example.txt
rm -rf Projects/
```

## mv (移動)

`mv`コマンドは、ファイルやディレクトリを別の場所に移動するために使用されます。以下が使用方法です。

```sh
mv [元のパス] [移動先のパス]
```

例えば、「Documents」フォルダから「Projects」フォルダに「example.txt」というファイルを移動する場合は、以下のように入力します。

```sh
mv Documents/example.txt Projects/
```

## cp (コピー)

`cp` コマンドは、ファイルやディレクトリを別の場所にコピーするために使用されます。以下は使用方法です。

```sh
cp [source_path] [destination_path]
```

例えば、「Documents」フォルダから「Projects」フォルダに「example.txt」という名前のファイルをコピーする場合は、次のように入力します。

```sh
cp Documents/example.txt Projects/
```

ディレクトリをコピーする場合は、`-r` オプションを使用できます。例えば、「Projects」ディレクトリを「Documents」フォルダにコピーする場合は、次のように入力します。

```sh
cp -r Projects/ Documents/
```

ソースディレクトリの内容を宛先ディレクトリの内容とマージする場合は、`-a` オプションを使用できます。例えば、「Projects」ディレクトリを「Documents」フォルダにコピーする場合は、次のように入力します。

```sh
cp -a Projects/ Documents/
```

## touch

`touch` コマンドは、新しい空のファイルを作成するために使用されます。以下は使用方法です。

```sh
touch [file_name]
```

例えば、「example.txt」という名前のファイルを作成する場合は、次のように入力します。

```sh
touch example.txt
```

## cat

`cat` コマンドは、ファイルの内容を表示するために使用されます。以下は使用方法です。

```sh
cat [file_name]
```

例えば、「example.txt」という名前のファイルの内容を表示する場合は、次のように入力します。

```sh
cat example.txt
```

## pwd (現在の作業ディレクトリを表示する)

`pwd` コマンドは、現在の作業ディレクトリを表示するために使用されます。以下が使用方法です:

```sh
pwd
```

出力は以下のようになります:

```sh
/home/username
```

## 概要

これらは、Linuxを始めるために必要な基本的なコマンドの一部です。Linux環境に慣れてくると、より多くの強力なコマンドがあることがわかります。
