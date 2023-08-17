# Linux 环境如何压缩和解压缩文件

## 打包和压缩的区别

打包和压缩是不同的概念，打包是将多个文件/文件夹合并为一个文件，而压缩则是通过压缩算法来减小文件体积。要注意的是，打包并不意味着减小体积，压缩也不意味着要把文件合并到一起。尽管大部分时候我们习惯了“打包并压缩”，有时候并不需要对它们进行区分，但了解它们的区别有助于更好地认知 Linux 系统中的相关命令。

## 打包和解包（tar）

### 只打包不压缩

使用`tar`命令将多个文件/文件夹打包为一个文件：

```sh
tar -cvf archive.tar file1 file2 file3
```

其中`archive.tar`打包后的文件，`file1`, `file2` 和 `file3`是要打包的文件/文件夹。

针对每一个被打包的文件，会有输出：

```sh
a file1
a file2
a file3
```

### 打包并压缩

`tar`命令也集成了压缩功能，可以使用 gzip 或 bzip2 压缩算法，对应的参数分别是`-z`和`-j`：

```sh
# 使用gzip压缩，文件名后面加上 .gz
tar -zcvf archive.tar.gz file1 file2 file3

# 使用gzip压缩，文件名后缀使用 .tgz
tar -zcvf archive.tgz file1 file2 file3

# 使用bzip2压缩，文件名后面加上 .bz2
tar -jcvf archive.tar.bz2 file1 file2 file3

# 使用bzip2压缩，文件名后缀使用 .tbz2
tar -jcvf archive.tbz2 file1 file2 file3
```

### 解包

```sh
tar -xvf archive.tar
```

如果需要解包到指定目录，则加上`-C`参数：

```sh
tar -xvf archive.tar -C /path/to/destination/directory
```

如果有压缩的话，加上对应的`-z`或者`-j`参数即可：

```sh
# 解压缩gzip格式的压缩包
tar -zxvf archive.tar.gz

# 解压缩bzip2格式的压缩包
tar -jxvf archive.tar.bz2
```

## 压缩和解压缩文件

### gzip压缩

`gzip`命令用来压缩文件，值得注意的是，它会覆盖原文件，即使用`gzip`命令压缩后，原文件会消失：

```sh
# file会消失，新产生一个file.gz
gzip file
```

如果将`gzip`直接应用到目录上没有任何效果，因为`gzip`只能压缩文件，而不能压缩目录。但可以使用`-r`参数来递归压缩目录中的所有文件：

```sh
# dirname目录中的所有文件都会被压缩，每个文件生成一个对应的.gz文件，原文件消失
gzip dirname
```

### gzip解压缩

解压单个文件，使用`-d`参数：

```sh
# 将file.gz文件解压缩，新产生一个file
gzip -d file.gz
```

增加`-r`参数可针对目录进行递归解压缩，和压缩时的递归类似，也是将目录中的所有文件都解压缩：

```sh
# 将dirname及子目录下的所有gzip压缩文件全部解压缩
gzip -dr dirname
```

### zip压缩

zip可以同时完成打包和压缩2个动作。

打包压缩：

```sh
zip archive.zip file1 file2 file3
```

输出：

```sh
adding: file1 (stored 0%)
adding: file2 (stored 0%)
adding: file3 (stored 0%)
```

如果有目录需要一起打包压缩，需要加上`-r`参数，此外可以使用`-q`参数关闭输出：

```sh
zip -qr archive.zip dirname
```

### zip解压缩

当前目录下直接解压缩：

```sh
unzip archive.zip
```

如需要解压到指定目录，可使用`-d`参数，此外`-o`参数可以不询问直接覆盖已有文件：

```sh
unzip -d /path/to/destination/directory -o archive.zip
```

## 速查总结

| 后缀 | 打包/压缩 | 解包/解压缩 |
| ---- | ------- | --------- |
| .tar | tar -cvf archive.tar file1 file2  | tar -xvf archive.tar -C /dest/path |
| .tar.gz/.tgz | tar -zcvf archive.tar file1 file2  | tar -zxvf archive.tar -C /dest/path |
| .tar.bz2/.tbz2 | tar -jcvf archive.tar file1 file2  | tar -jxvf archive.tar -C /dest/path |
| .gz | gzip file  | gzip -d file.gz |
| .zip | zip -r archive.zip file1 file2  | unzip -d /dest/path -o archive.zip |
