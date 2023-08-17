# Linux 基礎命令入門

<Validator lang="zh-hant" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-04-27" />

如果你是 Linux 新手，學習基礎命令是必要的，以便在文件系統中瀏覽。以下是一些最重要的命令及其使用方法：

## cd（切換目錄）

`cd` 命令用於進入 Linux 文件系統中的目錄。以下是使用方法：

```sh
cd [目錄名]
```

例如，要進入“Documents”文件夾，你需要輸入：

```sh
cd Documents
```

在 Linux 中，有一個特殊的目錄叫做“home”目錄。這是你第一次登錄 Linux 系統時所在的目錄。你可以使用 `~` 表示 home 目錄。例如，要進入 home 目錄，你需要輸入：

```sh
cd ~
```

你也可以使用 `..` 表示上級目錄。例如，如果你在“Documents”文件夾中，想要進入上級目錄，你需要輸入：

```sh
cd ..
```

你可以使用多個目錄名進入目錄（用 `/` 分隔）。例如，如果你想要進入“home”目錄下的“Documents”文件夾，你需要輸入：

```sh
cd ~/Documents
```

## ls（列表）

ls命令用於顯示目錄的內容。以下是如何使用它：

```sh
ls [directory_name]
```

例如，要列出`/usr/share`文件夾的內容，您可以鍵入：

```sh
ls /usr/share
```

輸出將是：

```sh
applications  backgrounds  color  cups  dbus-1  doc  fonts  games  glib-2.0  gnome-shell  icons  i18n  locale  man  metainfo  mime  perl  pixmaps  polkit-1  systemd  themes  xml
```

您可以看到`/usr/share`目錄中的所有文件和目錄。但是，您只能看到文件和目錄的名稱。如果您想查看有關文件和目錄的更多信息，可以使用`-l`選項。例如：

```sh
ls -l /var/log
```

輸出將是：

```sh
total 172
-rw-r--r-- 1 root     root    8241 Sep 14 00:00 alternatives.log
-rw-r----- 1 syslog   adm   134781 Sep 16 23:47 auth.log
-rw-r--r-- 1 root     root    1040 Sep 14 00:00 bootstrap.log
drwxr-xr-x 2 root     root    4096 Jan 25 18:16 cups
-rw-r--r-- 1 root     root    4935 Sep 14 00:00 dmesg
...
```

您可以看到，`-l`選項從左到右顯示有關文件和目錄的更多信息，包括：

- 文件類型和權限：第一個字符表示文件類型。`-` 表示普通文件，`d` 表示目錄，`l` 表示符號鏈接等。
- 所有者和組
- 文件大小。對於目錄，大小始終爲 4096 字節。
- 最後修改的日期和時間
- 文件名

## mkdir（創建目錄）

`mkdir` 命令用於創建新目錄。以下是使用方法：

```sh
mkdir [目錄名]
```

例如，要創建一個名爲“Projects”的新目錄，您可以鍵入：

```sh
mkdir Projects/
```

此命令沒有輸出，但您可以使用 ls 命令驗證已創建目錄。

如果要一次創建多個目錄，可以使用 `-p` 選項。例如，要在“文檔”文件夾下創建一個名爲“Projects”的目錄，您可以鍵入：

```sh
mkdir -p Documents/Projects
```

## rm（刪除）

`rm`命令用於刪除文件或目錄。以下是使用方法：

```sh
rm [文件名或目錄名]
```

例如，要刪除名爲“example.txt”的文件，您可以鍵入：

```sh
rm example.txt
```

如果要刪除目錄，則可以使用`-r`選項。例如，要刪除名爲“Projects”的目錄，您可以鍵入：

```sh
rm -r Projects/
```

目錄中的所有文件和子目錄都將被刪除。

在大多數情況下，您將被提示確認刪除。如果要跳過確認，請使用`-f`選項。例如：

```sh
rm -r example.txt
rm -rf Projects/
```

## mv（移動）

`mv`命令用於將文件或目錄從一個位置移動到另一個位置。以下是使用方法：

```sh
mv [源路徑] [目標路徑]
```

例如，要將名爲“example.txt”的文件從“Documents”文件夾移動到“Projects”文件夾，您可以鍵入：

```sh
mv Documents/example.txt Projects/
```

## cp (複製)

`cp` 命令用於將文件或目錄複製到另一個位置。以下是使用方法：

```sh
cp [源路徑] [目標路徑]
```

例如，要將名爲“example.txt”的文件從“Documents”文件夾複製到“Projects”文件夾，您可以鍵入：

```sh
cp Documents/example.txt Projects/
```

如果要複製目錄，則可以使用 `-r` 選項。例如，要將名爲“Projects”的目錄複製到“Documents”文件夾，您可以鍵入：

```sh
cp -r Projects/ Documents/
```

如果要將源目錄的內容合併到目標目錄中，則可以使用 `-a` 選項。例如，要將名爲“Projects”的目錄複製到“Documents”文件夾，您可以鍵入：

```sh
cp -a Projects/ Documents/
```

## touch

`touch` 命令用於創建一個新的空文件。以下是使用方法：

```sh
touch [文件名]
```

例如，要創建一個名爲“example.txt”的文件，您可以鍵入：

```sh
touch example.txt
```

## cat

`cat` 命令用於查看文件的內容。以下是使用方法：

```sh
cat [文件名]
```

例如，要查看名爲“example.txt”的文件的內容，您可以鍵入：

```sh
cat example.txt
```

## pwd（打印當前工作目錄）

`pwd` 命令用於顯示當前工作目錄。以下是使用方法：

```sh
pwd
```

輸出結果如下：

```sh
/home/username
```

## 總結

這些只是一些基本的 Linux 命令，您需要開始使用它們。隨着您對 Linux 環境的熟悉程度越來越高，您會發現有更多強大的命令可供使用。
