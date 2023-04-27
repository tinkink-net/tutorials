# Basic Linux Commands for Beginners

<Validator lang="en" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-04-27" />

If you are new to Linux, learning basic commands is essential to navigate your way around the file system. Here are some of the most important commands and how to use them:

## cd (Change Directory)

The `cd` command is used to enter directories in the Linux file system. Here’s how you use it:

```sh
cd [directory_name]
```

For example, to enter the “Documents” folder, you would type:

```sh
cd Documents
```

In Linux, there is a special directory called the “home” directory. This is the directory where you will be placed when you first log in to your Linux system. You can use `~` to represent the home directory. For example, to enter the home directory, you would type:

```sh
cd ~
```

You can also use `..` to represent the parent directory. For example, if you are in the “Documents” folder and want to enter the parent directory, you would type:

```sh
cd ..
```

You can use multiple directory names to enter a directory (separated by `/`). For example if you want to enter the “Documents” folder under the “home” directory, you would type:

```sh
cd ~/Documents
```

## ls (List)

The ls command is used to display the contents of a directory. Here’s how to use it:

```sh
ls [directory_name]
```

For example, to list the contents of the `/usr/share` folder, you would type:

```sh
ls /usr/share
```

The output will be:

```sh
applications  backgrounds  color  cups  dbus-1  doc  fonts  games  glib-2.0  gnome-shell  icons  i18n  locale  man  metainfo  mime  perl  pixmaps  polkit-1  systemd  themes  xml
```

You can see all the files and directories in the `/usr/share` directory. But the only thing you can see is the names of the files and directories. If you want to see more information about the files and directories, you can use the `-l` option. For example:

```sh
ls -l /var/log
```

The output will be:

```sh
total 172
-rw-r--r-- 1 root     root    8241 Sep 14 00:00 alternatives.log
-rw-r----- 1 syslog   adm   134781 Sep 16 23:47 auth.log
-rw-r--r-- 1 root     root    1040 Sep 14 00:00 bootstrap.log
drwxr-xr-x 2 root     root    4096 Jan 25 18:16 cups
-rw-r--r-- 1 root     root    4935 Sep 14 00:00 dmesg
...
```

You can see that the `-l` option displays more information about the files and directories, from left to right, including:

- File type and permissions: The first character indicates the file type. `-` indicates a regular file, `d` indicates a directory, `l` indicates a symbolic link, and so on.
- Owner and group
- File size. For directories, the size is always 4096 bytes.
- Last modified date and time
- File name

## mkdir (Make Directory)

The `mkdir` command is used to create a new directory. Here’s how you use it:

```sh
mkdir [directory_name]
```

For example, to create a new directory called “Projects,” you would type:

```sh
mkdir Projects/
```

This command has no output, but you can use the ls command to verify that the directory has been created.

If you want to create multiple directories at once, you can use the `-p` option. For example, to create a directory called “Projects” under the “Documents” folder, you would type:

```sh
mkdir -p Documents/Projects
```

## rm (Remove)

The `rm` command is used to remove files or directories. Here’s how you use it:

```sh
rm [file_name_or_directory_name]
```

For example, to remove a file called “example.txt,” you would type:

```sh
rm example.txt
```

If you want to remove a directory, you can use the `-r` option. For example, to remove a directory called “Projects,” you would type:

```sh
rm -r Projects/
```

All files and subdirectories in the directory will be removed.

In most cases, you will be prompted to confirm the deletion. If you want to skip the confirmation, you can use the `-f` option. For example:

```sh
rm -r example.txt
rm -rf Projects/
```

## mv (Move)

The `mv` command is used to move files or directories from one location to another. Here’s how you use it:

```sh
mv [source_path] [destination_path]
```

For example, to move a file called “example.txt” from the “Documents” folder to the “Projects” folder, you would type:

```sh
mv Documents/example.txt Projects/
```

## cp (Copy)

The `cp` command is used to copy files or directories to another location. Here’s how you use it:

```sh
cp [source_path] [destination_path]
```

For example, to copy a file called “example.txt” from the “Documents” folder to the “Projects” folder, you would type:

```sh
cp Documents/example.txt Projects/
```

If you want to copy a directory, you can use the `-r` option. For example, to copy a directory called “Projects” to the “Documents” folder, you would type:

```sh
cp -r Projects/ Documents/
```

If you want to merge the contents of the source directory with the destination directory, you can use the `-a` option. For example, to copy a directory called “Projects” to the “Documents” folder, you would type:

```sh
cp -a Projects/ Documents/
```

## touch

The `touch` command is used to create a new empty file. Here’s how you use it:

```sh
touch [file_name]
```

For example, to create a file called “example.txt,” you would type:

```sh
touch example.txt
```

## cat

The `cat` command is used to view the contents of a file. Here’s how you use it:

```sh
cat [file_name]
```

For example, to view the contents of a file called “example.txt,” you would type:

```sh
cat example.txt
```

## pwd (Print Working Directory)

The `pwd` command is used to display the current working directory. Here’s how you use it:

```sh
pwd
```

The output will be like this:

```sh
/home/username
```

## Summary

These are just some of the basic Linux commands that you’ll need to get started with. As you become more comfortable with the Linux environment, you’ll find that there are many more powerful commands at your disposal.
