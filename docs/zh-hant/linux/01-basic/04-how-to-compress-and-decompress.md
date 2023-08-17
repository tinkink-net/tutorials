# Linux 環境如何壓縮和解壓縮文件

## 打包和壓縮的區別

打包和壓縮是不同的概念，打包是將多個文件/文件夾合併爲一個文件，而壓縮則是通過壓縮算法來減小文件體積。要注意的是，打包並不意味着減小體積，壓縮也不意味着要把文件合併到一起。儘管大部分時候我們習慣了“打包並壓縮”，有時候並不需要對它們進行區分，但瞭解它們的區別有助於更好地認知 Linux 系統中的相關命令。

## 打包和解包（tar）

### 只打包不壓縮

使用`tar`命令將多個文件/文件夾打包爲一個文件：

```sh
tar -cvf archive.tar file1 file2 file3
```

其中`archive.tar`打包後的文件，`file1`, `file2` 和 `file3`是要打包的文件/文件夾。

針對每一個被打包的文件，會有輸出：

```sh
a file1
a file2
a file3
```

### 打包並壓縮

`tar`命令也集成了壓縮功能，可以使用 gzip 或 bzip2 壓縮算法，對應的參數分別是`-z`和`-j`：

```sh
# 使用gzip壓縮，文件名後面加上 .gz
tar -zcvf archive.tar.gz file1 file2 file3

# 使用gzip壓縮，文件名後綴使用 .tgz
tar -zcvf archive.tgz file1 file2 file3

# 使用bzip2壓縮，文件名後面加上 .bz2
tar -jcvf archive.tar.bz2 file1 file2 file3

# 使用bzip2壓縮，文件名後綴使用 .tbz2
tar -jcvf archive.tbz2 file1 file2 file3
```

### 解包

```sh
tar -xvf archive.tar
```

如果需要解包到指定目錄，則加上`-C`參數：

```sh
tar -xvf archive.tar -C /path/to/destination/directory
```

如果有壓縮的話，加上對應的`-z`或者`-j`參數即可：

```sh
# 解壓縮gzip格式的壓縮包
tar -zxvf archive.tar.gz

# 解壓縮bzip2格式的壓縮包
tar -jxvf archive.tar.bz2
```

## 壓縮和解壓縮文件

### gzip壓縮

`gzip`命令用來壓縮文件，值得注意的是，它會覆蓋原文件，即使用`gzip`命令壓縮後，原文件會消失：

```sh
# file會消失，新產生一個file.gz
gzip file
```

如果將`gzip`直接應用到目錄上沒有任何效果，因爲`gzip`只能壓縮文件，而不能壓縮目錄。但可以使用`-r`參數來遞歸壓縮目錄中的所有文件：

```sh
# dirname目錄中的所有文件都會被壓縮，每個文件生成一個對應的.gz文件，原文件消失
gzip dirname
```

### gzip解壓縮

解壓單個文件，使用`-d`參數：

```sh
# 將file.gz文件解壓縮，新產生一個file
gzip -d file.gz
```

增加`-r`參數可針對目錄進行遞歸解壓縮，和壓縮時的遞歸類似，也是將目錄中的所有文件都解壓縮：

```sh
# 將dirname及子目錄下的所有gzip壓縮文件全部解壓縮
gzip -dr dirname
```

### zip壓縮

zip可以同時完成打包和壓縮2個動作。

打包壓縮：

```sh
zip archive.zip file1 file2 file3
```

輸出：

```sh
adding: file1 (stored 0%)
adding: file2 (stored 0%)
adding: file3 (stored 0%)
```

如果有目錄需要一起打包壓縮，需要加上`-r`參數，此外可以使用`-q`參數關閉輸出：

```sh
zip -qr archive.zip dirname
```

### zip解壓縮

當前目錄下直接解壓縮：

```sh
unzip archive.zip
```

如需要解壓到指定目錄，可使用`-d`參數，此外`-o`參數可以不詢問直接覆蓋已有文件：

```sh
unzip -d /path/to/destination/directory -o archive.zip
```

## 速查總結

| 後綴 | 打包/壓縮 | 解包/解壓縮 |
| ---- | ------- | --------- |
| .tar | tar -cvf archive.tar file1 file2  | tar -xvf archive.tar -C /dest/path |
| .tar.gz/.tgz | tar -zcvf archive.tar file1 file2  | tar -zxvf archive.tar -C /dest/path |
| .tar.bz2/.tbz2 | tar -jcvf archive.tar file1 file2  | tar -jxvf archive.tar -C /dest/path |
| .gz | gzip file  | gzip -d file.gz |
| .zip | zip -r archive.zip file1 file2  | unzip -d /dest/path -o archive.zip |
