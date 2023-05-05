# Linux 基础命令入门

<Validator lang="zh-hans" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-04-27" />

如果你是 Linux 新手，学习基础命令是必要的，以便在文件系统中浏览。以下是一些最重要的命令及其使用方法：

## cd（切换目录）

`cd` 命令用于进入 Linux 文件系统中的目录。以下是使用方法：

```sh
cd [目录名]
```

例如，要进入“Documents”文件夹，你需要输入：

```sh
cd Documents
```

在 Linux 中，有一个特殊的目录叫做“home”目录。这是你第一次登录 Linux 系统时所在的目录。你可以使用 `~` 表示 home 目录。例如，要进入 home 目录，你需要输入：

```sh
cd ~
```

你也可以使用 `..` 表示上级目录。例如，如果你在“Documents”文件夹中，想要进入上级目录，你需要输入：

```sh
cd ..
```

你可以使用多个目录名进入目录（用 `/` 分隔）。例如，如果你想进入“home”目录下的“Documents”文件夹，你需要输入：

```sh
cd ~/Documents
```

## ls（列表）

ls命令用于显示目录的内容。以下是如何使用它：

```sh
ls [directory_name]
```

例如，要列出`/usr/share`文件夹的内容，您可以键入：

```sh
ls /usr/share
```

输出将是：

```sh
applications  backgrounds  color  cups  dbus-1  doc  fonts  games  glib-2.0  gnome-shell  icons  i18n  locale  man  metainfo  mime  perl  pixmaps  polkit-1  systemd  themes  xml
```

您可以看到`/usr/share`目录中的所有文件和目录。但是，您只能看到文件和目录的名称。如果您想查看有关文件和目录的更多信息，可以使用`-l`选项。例如：

```sh
ls -l /var/log
```

输出将是：

```sh
total 172
-rw-r--r-- 1 root     root    8241 Sep 14 00:00 alternatives.log
-rw-r----- 1 syslog   adm   134781 Sep 16 23:47 auth.log
-rw-r--r-- 1 root     root    1040 Sep 14 00:00 bootstrap.log
drwxr-xr-x 2 root     root    4096 Jan 25 18:16 cups
-rw-r--r-- 1 root     root    4935 Sep 14 00:00 dmesg
...
```

您可以看到，`-l`选项从左到右显示有关文件和目录的更多信息，包括：

- 文件类型和权限：第一个字符表示文件类型。`-` 表示普通文件，`d` 表示目录，`l` 表示符号链接等等。
- 所有者和组
- 文件大小。对于目录，大小始终为 4096 字节。
- 最后修改日期和时间
- 文件名

## mkdir（创建目录）

`mkdir` 命令用于创建新目录。以下是使用方法：

```sh
mkdir [目录名]
```

例如，要创建一个名为“Projects”的新目录，您可以键入：

```sh
mkdir Projects/
```

此命令没有输出，但您可以使用 ls 命令验证已创建目录。

如果要同时创建多个目录，可以使用 `-p` 选项。例如，要在“文档”文件夹下创建一个名为“Projects”的目录，您可以键入：

```sh
mkdir -p Documents/Projects
```

## rm（删除）

`rm`命令用于删除文件或目录。以下是使用方法：

```sh
rm [文件名或目录名]
```

例如，要删除名为“example.txt”的文件，您可以键入：

```sh
rm example.txt
```

如果要删除目录，则可以使用`-r`选项。例如，要删除名为“Projects”的目录，您可以键入：

```sh
rm -r Projects/
```

目录中的所有文件和子目录都将被删除。

在大多数情况下，您将被提示确认删除。如果要跳过确认，则可以使用`-f`选项。例如：

```sh
rm -r example.txt
rm -rf Projects/
```

## mv（移动）

`mv`命令用于将文件或目录从一个位置移动到另一个位置。以下是使用方法：

```sh
mv [源路径] [目标路径]
```

例如，要将名为“example.txt”的文件从“Documents”文件夹移动到“Projects”文件夹，您可以键入：

```sh
mv Documents/example.txt Projects/
```

## cp（复制）

`cp` 命令用于将文件或目录复制到另一个位置。以下是使用方法：

```sh
cp [源路径] [目标路径]
```

例如，要将名为“example.txt”的文件从“Documents”文件夹复制到“Projects”文件夹，您可以键入：

```sh
cp Documents/example.txt Projects/
```

如果要复制目录，则可以使用 `-r` 选项。例如，要将名为“Projects”的目录复制到“Documents”文件夹，您可以键入：

```sh
cp -r Projects/ Documents/
```

如果要将源目录的内容合并到目标目录中，则可以使用 `-a` 选项。例如，要将名为“Projects”的目录复制到“Documents”文件夹，您可以键入：

```sh
cp -a Projects/ Documents/
```

## touch

`touch` 命令用于创建一个新的空文件。以下是使用方法：

```sh
touch [文件名]
```

例如，要创建一个名为“example.txt”的文件，您可以键入：

```sh
touch example.txt
```

## cat

`cat` 命令用于查看文件的内容。以下是使用方法：

```sh
cat [文件名]
```

例如，要查看名为“example.txt”的文件的内容，您可以键入：

```sh
cat example.txt
```

## pwd（打印工作目录）

`pwd` 命令用于显示当前工作目录。以下是使用方法：

```sh
pwd
```

输出结果如下：

```sh
/home/username
```

## 总结

这些只是一些基本的 Linux 命令，您需要开始使用它们。随着您对 Linux 环境的熟悉程度越来越高，您会发现有更多强大的命令可供使用。