# Work with Text Files in Linux

<Validator lang="en" :platform-list="['Ubuntu 22.04']" date="2023-05-05" />

Working with text files in Linux is a fundamental skill that every user should possess. Text files are commonly used in Linux systems to store configuration files, scripts, and various other types of data in plain text format. In this tutorial, we will cover how to work with text files in Linux.

## Text File Usage

Text files are commonly used in Linux to store configuration information, logs, scripts, and other data that can be read and edited using a text editor. Text files can be opened and edited using any compatible text editor. The common file extensions for text files are `.txt`, `.conf`, `.cfg`, `.log` and `.sh`. In addition, any program source code written in a programming language such as C, C++, Java, Python, Perl, Ruby, etc., is also stored in text files.

The most common tasks performed on text files are editing and reading.

Text files can be edited using any text editor, but the most popular editors are nano and vim. Both editors are included in most Linux distributions by default.

> If Nano or Vim is not installed on your system, you can install it using the package manager of your Linux distribution. For example, if you are using Debian or Ubuntu, you can install nano with the following command: `apt-get install nano`. (You may need to use `sudo` to run the command as root.)

## Edit With Nano

Nano is a popular choice for beginners because of its simplicity and ease of use. To create a new file or edit an existing file using the nano editor, type the following command in your terminal:

```sh
nano filename.txt
```

Replace `filename` with your desired file name. Once your file is open, you can begin typing. To save your file in nano editor, press `CTRL + O` followed by `Enter`. To exit the nano editor, press `CTRL + X`.

The other useful commands are listed at the bottom of the screen. For example, if you want to search for a specific string in your file, press `CTRL + W` and type your search string. To replace a string, press `CTRL + \`. You can alse use `CTRL + G` to get help.

As you can see, the nano editor is very simple and easy to use. It is a great choice for beginners who are just getting started with Linux.

## Edit With Vim

Vim is a powerful, command-line text editor that is installed on most Linux systems by default. It is a favorite among experienced Linux users because of its power and flexibility. And in many system administration tasks, it is the default editor, for example, when editing configuration crontab tasks. To create a new file or edit an existing file using Vim, type the following command in your terminal:

```sh
vim filename.txt
```

> You can also use the `vi` command instead of `vim`, they are the same.

What makes Vim different from other text editors is that it has two modes: command mode and insert mode. In command mode, you can use various commands to perform actions such as saving, quitting, and searching. In insert mode, you can type text into your file. Many people find this confusing at first, for example, when they try to type text into their file but nothing happens, or something unexpected happens. This is because they are in command mode instead of insert mode. It takes some time to get used to, once you get used to it, it becomes second nature.

Remember: To enter insert mode, press `i`, make sure the left bottom corner of the screen says `-- INSERT --`. To exit insert mode, press `ESC`.

To edit your file in vim editor, enter insert mode by pressing `i` and type your text. Once you have finished, press `ESC` to exit insert mode. Then type `:wq` and press `Enter`. If you want to save your file without quitting vim, type `:w` and press `Enter`. If you want to quit without saving, type `:q!` and press `Enter`.

To search for a specific string in your file, enter command mode by pressing `ESC` and type `/string`. To replace a string, enter command mode by pressing `ESC` and type `:s/old/new/g`.

Other quick tips:

- To move the cursor to the beginning of the line, press `0`.
- To move the cursor to the end of the line, press `$`.
- To move the cursor to the beginning of the file, press `gg`.
- To move the cursor to the end of the file, press `G`.
- To move the cursor to the next word, press `w`.
- To move the cursor to the previous word, press `b`.
- To move the cursor in four directions, press `h`, `j`, `k`, `l`.
- To move the cursor to line 10, press `10G`.
- To delete a character, press `x`.
- To delete a line, press `dd`.
- To undo, press `u`.
- To copy a line, press `yy`.
- To paste a line, press `p`.

> Note: Commands in Vim are case-sensitive. For example, `:wq` is not the same as `:WQ`.

There are many more commands, and it`s possible to combine them to perform more complex actions. But these are the most common ones. You can find more commands by typing `:help` in command mode.

## Read With Less

As text editors, Nano and Vim are great for creating and editing text files. But what if you just want to read a text file? For example, if you want to read a log file or a configuration file. Of course, you can use a text editor to read a text file, but that is not very efficient, especially if the file is very large.

> Note: When you open a very large file in a text editor, it can take a long time to load, and it can also use a lot of system resources. Please avoid opening large files in a text editor on a production server.

The better way to read a text file is to use the `less` command. The `less` command is a pager that allows you to read text files in your terminal. To read a text file using the `less` command, type the following command in your terminal:

```sh
less filename.txt
```

The basic usage of the `less` command is similar to Vim. You can use the arrow keys to scroll up and down, you can also use `/` to search for a specific string. To exit the `less` command, press `q`.

Since Less is a pager, it reads the file one page at a time instead of loads the entire file into memory, the performance is much better than a text editor. It is also very useful for reading large files.

## Read With Cat

Another way to read a text file is to use the `cat` command. The `cat` command is a utility that allows you to read text files in your terminal. To read a text file using the `cat` command, type the following command in your terminal:

```sh
cat filename.txt
```

The main difference between the `cat` command and the `less` command is that the `cat` command reads the entire file at once, and prints it to the terminal. This is useful if you want to read a small file, but it is not recommended for large files.

It's also useful if you want to pipe the output of one command to another command as input. For example, if you want to search for a specific string in a file, you can use the `cat` command to read the file and pipe the output to the `grep` command to search for the string. For example:

```sh
cat filename.txt | grep "string"
```

## Read With Head and Tail

The `head` command is a utility that allows you to read the first few lines of a text file. To read the first few lines of a text file using the `head` command, type the following command in your terminal:

```sh
head filename.txt
```

The `head` command is useful if you want to quickly check the contents of a file without opening it in a text editor or pager.

If you want to set the number of lines to read, you can use the `-n` option. For example, if you want to read the first 10 lines of a file, you can use the following command:

```sh
head -n 10 filename.txt
```

As opposed to the `head` command, the `tail` command allows you to read the last few lines of a text file. To read the last few lines of a text file using the `tail` command, type the following command in your terminal:

```sh
tail filename.txt
```

The `tail` command also has a `-n` option that allows you to set the number of lines to read. For example, if you want to read the last 10 lines of a file, you can use the following command:

```sh
tail -n 10 filename.txt
```

## Conclusion

In conclusion, working with text files is an essential skill every Linux user should possess. The Nano and Vim editors make it easy to create, edit, and save text files in Linux. The `less` command is a pager that allows you to read text files in your terminal. The `cat` command is a utility that allows you to read text files in your terminal. The `head` and `tail` commands allow you to read the first and last few lines of a text file. With this article, you have learned how to create and edit text files using both nano and vim editors. Happy editing!
