# Linux: Search Files with Find Command

<Validator lang="en" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9', 'macOS 13.2.1']" date="2023-04-04" />

The `find` command in Linux is a powerful tool that allows you to search for files and directories in a given directory hierarchy based on various parameters. In this tutorial, we'll explore how to use the find command and its various options.

## Basic Syntax

The basic syntax of the find command is as follows:

```sh
find [directory] [expression]
```

Here, `[directory]` is the directory in which you want to search for files, and `[expression]` is the search criteria that you want to apply. The find command will search for files and directories in the given `[directory]` and its subdirectories that match the specified `[expression]`.

The output of the find command is a list of files and directories that match the specified search criteria. For example, if you run the following command:

```sh
find . -name "*.txt"
```

You'll get a list of all files with a `.txt` extension in the current directory and its subdirectories:

```
./example.txt
./example2.txt
./subdir/example3.txt
```

## Finding Files by Name

To search for a file by name, use the `-name` option followed by the name of the file you're looking for. For example, to search for a file named `example.txt` in the current directory and its subdirectories, use the following command:

```sh
find . -name "example.txt"
```

This will search for all files named "example.txt" in the current directory and its subdirectories.

To search for all files with a specific extension, use the `-name` option followed by the wildcard character `*` and the extension you're looking for. For example, to search for all files with a `.txt` extension in the current directory and its subdirectories, use the following command:

```sh
find . -name "*.txt"
```

This will search for all files with a `.txt` extension in the current directory and its subdirectories.

In fact, the wildcard character `*` can be used in any part of the file name. For example:

```sh
find . -name "example*"
find . -name "*example.txt"
find . -name "*example.*"
```

## Finding Directories

To search for all directories in the current directory and its subdirectories, use the `-type` option followed by `d`. For example, to search for all directories in the current directory and its subdirectories, use the following command:

```sh
find . -type d
```

This will search for all directories in the current directory and its subdirectories.

## Finding Files by Modification Time

To search for all files modified within a specific time frame, use the `-mtime` option followed by the number of days. If you want to search for files modified within the last `n` days, use a negative number `-n`.

For example, to search for all files modified within the last 7 days, use the following command:

```sh
find . -mtime -7
find . -mtime -1w
```

The default unit of time for the `-mtime` option is days.

You can use other units of time on macOS:

- `s` - Seconds
- `m` - Minutes
- `h` - Hours
- `d` - Days
- `w` - Weeks

> You can also use `-atime` and `-ctime` options to search for files based on their access time and creation time respectively.

## Finding Files by Size

To search for all files larger than a specific size, use the `-size` option followed by the size in bytes with a `+` sign. To search for all files smaller than a specific size, use the `-size` option followed by the size in bytes with a `-` sign.

For example, to search for all files larger than `10MB` in the current directory and its subdirectories, use the following command:

```sh
find . -size +10M
```

This will search for all files larger than `10MB` in the current directory and its subdirectories.

The common units of size that you can use are:

- `c` - Bytes
- `k` - Kilobytes (1024 bytes)
- `M` - Megabytes (1024 kilobytes)
- `G` - Gigabytes (1024 megabytes)
- `T` - Terabytes (1024 gigabytes)
- `P` - Petabytes (1024 terabytes)

## Combining Search Criteria

You can combine multiple search criteria to find files that match specific conditions. For example, to search for all files with a specific extension that were modified within the last 7 days, use the following command:

```sh
find . -name "*.txt" -type f -mtime -7
```

This will search for all files with a `.txt` extension that were modified within the last 7 days in the current directory and its subdirectories.

## Using the Output of the find Command


You can use the output of the find command in various ways. Here are some examples:

To save the output of the find command to a file, use the following command:

```sh
find . -name "*.txt" > files.txt
```

This will save the names of all files with a `.txt` extension to a file named `files.txt`.

To use the output of the find command as input to another command, use the `xargs` command.

For example, to delete all files with a specific extension, use the following command:

```sh
find . -name "*.txt" -type f | xargs rm
```

To perform an action on each file found by the find command, use the `-exec` option.

For example, to change the permissions of all files with a specific extension, use the following command:

```sh
find . -name "*.txt" -type f -exec chmod 644 {} \;
```

The syntax of `-exec` argument is:

```sh
-exec command {} \;
```

- `command` is the command that you want to execute on the files found by find.
- `{}` is a placeholder that will be replaced by the name of the file found by find.
- `\;` is used to terminate the command and signify the end of the `-exec` argument.

To count the number of files found by the find command, use the `wc` command. For example, to count the number of files with a specific extension, use the following command:

```sh
find . -name "*.txt" -type f | wc -l
```

## Conclusion

The `find` command in Linux is a powerful tool that allows you to search for files and directories based on various criteria. By using its various options and combining search criteria, you can quickly find the files and directories you need. You can also use the output of the find command in various ways to perform actions on the files found.
