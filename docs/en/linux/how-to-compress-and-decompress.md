## How to compress and uncompress files in a Linux environment

## The difference between packing and compression

Packing and compression are different concepts. Packing is combining multiple files/folders into a single file, while compression is reducing the file size through compression algorithms. It is important to note that packing does not mean reducing the size, and compressing does not mean merging files together. Although most of the time we are used to "pack and compress" and sometimes we don't need to distinguish between them, understanding the difference can help you better understand the commands in your Linux system.

## Pack and unpack (tar)

### Pack and compress only

Use the `tar` command to pack multiple files/folders into one file.

```sh
tar -cvf archive.tar file1 file2 file3
```

where `archive.tar` is the packed file, `file1`, `file2` and `file3` are the files/folders to be packed.

For each packaged file, the output will be.

```sh
a file1
a file2
a file3
```

### Pack and compress

The `tar` command also integrates compression, either using the gzip or bzip2 compression algorithms, with the following parameters `-z` and `-j` respectively.

```sh
# Use gzip compression with .gz after the file name
tar -zcvf archive.tar.gz file1 file2 file3

# Use gzip compression with .tgz as a filename suffix
tar -zcvf archive.tgz file1 file2 file3

# Compress using bzip2 with .bz2 after the file name
tar -jcvf archive.tar.bz2 file1 file2 file3

# Compress with bzip2, using .tbz2 as a filename suffix
tar -jcvf archive.tbz2 file1 file2 file3
```

### Unpack

```sh
tar -xvf archive.tar
```

If you need to unpack to the specified directory, add the ``-C`` parameter.

```sh
tar -xvf archive.tar -C /path/to/destination/directory
```

If there is compression, add the corresponding `-z` or `-j` arguments: ``sh

```sh
# Decompress the gzip archive
tar -zxvf archive.tar.gz

# Decompress the bzip2 archive
tar -jxvf archive.tar.bz2
```

## Compress and uncompress files

### gzip compression

The ``gzip`` command is used to compress a file. It is worth noting that it overwrites the original file, i.e. the original file disappears after being compressed with the ``gzip`` command.

```sh
## file will disappear and a new file.gz will be created
gzip file
```

Applying `gzip` directly to a directory has no effect, because `gzip` can only compress files, not directories. However, all files in a directory can be compressed recursively using the `-r` argument: ``

```sh
# All the files in the dirname directory are compressed, each file generates a corresponding .gz file, and the original file disappears
gzip dirname
```

### gzip decompression

Decompress a single file, using the `-d` parameter.

```sh
### Decompress the file.gz file, creating a new file
gzip -d file.gz
```

Adding the `-r` argument allows recursive decompression against directories, similar to the recursion in compression, which also decompresses all files in a directory: ``

```sh
# Decompress all gzip compressed files in dirname and subdirectories
gzip -dr dirname
```

### zip compression

zip can do both packing and compressing.

To pack and compress.

```sh
zip archive.zip file1 file2 file3
```

Output.

```sh
adding: file1 (stored 0%)
adding: file2 (stored 0%)
adding: file3 (stored 0%)
```

If you have directories to compress together, you need to add the `-r` parameter, and you can use the `-q` parameter to turn off the output: ```sh

```sh
zip -qr archive.zip dirname
```

### zip unzip

To unzip directly from the current directory.

```sh
unzip archive.zip
```

If you want to unzip to a specific directory, use the `-d` parameter, in addition the `-o` parameter can overwrite existing files without asking: ``sh

```sh
unzip -d /path/to/destination/directory -o archive.zip
```

## Quick Summary

| suffix | pack/zip | unpack/unzip |
| ---- | ------- | --------- |
| .tar | tar -cvf archive.tar file1 file2 | tar -xvf archive.tar -C /dest/path |
| .tar.gz/.tgz | tar -zcvf archive.tar file1 file2 | tar -zxvf archive.tar -C /dest/path |
| .tar.bz2/.tbz2 | tar -jcvf archive.tar file1 file2 | tar -jxvf archive.tar -C /dest/path |
| .gz | gzip file | gzip -d file.gz |
| .zip | zip -r archive.zip file1 file2 | unzip -d /dest/path -o archive.zip |
