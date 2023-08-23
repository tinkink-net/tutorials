# Search Content with Grep Command

<Validator lang="en" :platformList="['Ubuntu 22.10', 'macOS 13.2.1']" date="2023-08-23" />

Searching for content in files is a common task for Linux users. For example, you may want to find all files that contain a specific word or phrase. It's very useful when you are looking for a specific configuration or a method call in a large codebase.

`grep` is a command-line utility tool used in Linux systems to search for specific patterns in file contents. It is a powerful tool that allows users to search for text strings, regular expressions, or patterns in one or more files. `grep` is commonly used in conjunction with other commands to filter and manipulate data. It is also available on other platforms like Windows and macOS.

In this tutorial, we will show you how to use the `grep` command through practical examples and detailed explanations of the most common options.

## How to Use Grep Command

The basic syntax of the `grep` command is as follows:

```bash
grep [OPTIONS] PATTERN [FILE...]
```

The `grep` command searches for a pattern in one or more files. If the pattern is found, it prints the matching lines. If no files are specified, `grep` reads from the standard input.

Let's say you have a file named `file.txt` with the following content:

```
This is a test file.
It has some text in it.
Another line of text.
```

To search for the word `text` in the `file.txt` file, you would run the following command:

```bash
> grep test file.txt

It has some text in it.
```

The output shows the line that contains the word `test`.

If you want to show the context of the match, you can use the `-C` option followed by the number of lines to show before and after the match:

```bash
> grep -C 1 test file.txt

This is a test file.
It has some text in it.
Another line of text.
```

The output shows the line that contains the word `test` and 1 line before and after it.

If there are multiple results, the output will be separated by `--`. For example:

```bash
> grep -C 1 xxx file.txt

This is a test file.
It has some text in it.
Another line of text.
--
This is a test file.
It has some text in it.
Another line of text.
```

## Grep Command Options

The `grep` command comes with a lot of options that allow you to customize the output and search for specific patterns. In this section, we will show you the most common options.

### Ignore Case

By default, `grep` is case sensitive. It means that if you search for the word `text`, it will not match `Text` or `TEXT`.

To make `grep` case insensitive, use the `-i` option:

```bash
> grep -i TEXT file.txt

It has some text in it.
```

### Invert Match

To invert the match, use the `-v` option. It will print all lines that do not match the pattern:

```bash
> grep -v text file.txt

This is a test file.
Another line of text.
```

### Show Line Numbers

To show the line numbers of the matched lines, use the `-n` option:

```bash
> grep -n text file.txt

2:It has some text in it.
```

### Show Only Matching Part

To show only the matching part of the line, use the `-o` option:

```bash
> grep -o text file.txt

text
```

### Show Only File Names

To show only the file names that match the pattern, use the `-l` option:

```bash
> grep -l text file.txt

file.txt
```

### Show Only Count

To show only the count of matching lines, use the `-c` option:

```bash
> grep -c text file.txt

1
```

### Search Recursively

Addtion to searching in a single file, you can also search recursively in a directory and its subdirectories using the `-r` option:

```bash
> grep -r text .

file.txt:It has some text in it.
```

### Search Multiple Patterns

To search for multiple patterns, use the `-e` option followed by the pattern:

```bash
> grep -e text -e line file.txt

It has some text in it.
Another line of text.
```

Note, the patterns are matched using the logical OR operator, which means that if any of the patterns match, the line will be printed.

### Exclude Files

To exclude files that match a specific pattern, use the `--exclude` option:

```bash
> grep --exclude=*.txt text .
```

You can also use the `--exclude-dir` option to exclude directories:

```bash
> grep --exclude-dir=dir text .
```

Node, the value of `--exclude` and `--exclude-dir` are glob expressions that are matched against the file names, you can use `*` to match any number of characters and `?` to match a single character.

### Use Regular Expressions

`grep` supports regular expressions. To use regular expressions, use the `-E` option:

```bash
> grep -E 't.xt' file.txt

It has some text in it.
```

Note, the dot in the regular expression matches any character. So, `t.xt` matches `text`.

## Common Grep Command Examples

In this section, we will show you some practical examples of using the `grep` command.

### Search for a Word in a File

To search for a word in a file, use the following command:

```bash
> grep -n -C 2 -i word file.txt
```

### Search a Word under a Specific Directory

To search for a word under a specific directory, use the following command:

```bash
> grep -r -n -i word /path/to/directory
```

This is useful, for example, you may want to search a specific variable name in `node_modules` directory, or you may want to check if a specific configuration is used in your project.

### Search and Exclude Directories

To search for a word and exclude directories, use the following command:

```bash
> grep -r -n -i --exclude-dir=dir1 --exclude-dir=dir2 word /path/to/directory
```

For example, you may want to search for a word in a project directory but exclude the `node_modules` directory.

## Conclusion

In this tutorial, we have shown you how to use the `grep` command. You can now search for specific patterns in files and directories. To learn more about the `grep` command, visit the [official documentation](https://www.gnu.org/software/grep/manual/grep.html).
