# Linux環境でのファイルの圧縮と解凍方法

## パッキングと圧縮の違い

パッキングと圧縮は異なる概念です。パッキングは複数のファイル/フォルダを1つのファイルに結合することであり、圧縮は圧縮アルゴリズムを通じてファイルサイズを縮小することです。パッキングはサイズを縮小することを意味せず、圧縮はファイルを結合することを意味しないことに注意することが重要です。ほとんどの場合、「パックと圧縮」という言葉を使って区別する必要がないことがありますが、Linuxシステムのコマンドをよりよく理解するのに役立ちます。

## パックとアンパック（tar）

### パックと圧縮のみ

複数のファイル/フォルダを1つのファイルにパックするには、`tar`コマンドを使用します。

```sh
tar -cvf archive.tar file1 file2 file3
```

ここで、`archive.tar`はパックされたファイルであり、`file1`、`file2`、`file3`はパックするファイル/フォルダです。

各パッケージ化されたファイルに対して、出力は次のようになります。

```sh
a file1
a file2
a file3
```

### パックと圧縮

`tar`コマンドは、gzipまたはbzip2圧縮アルゴリズムを使用して圧縮を統合することもできます。gzipまたはbzip2圧縮アルゴリズムを使用するには、それぞれ次のパラメーター`-z`と`-j`を使用します。

```sh
# gzip圧縮を使用し、ファイル名の後に.gzを付ける
tar -zcvf archive.tar.gz file1 file2 file3

# gzip圧縮を使用し、.tgzをファイル名のサフィックスとして使用する
tar -zcvf archive.tgz file1 file2 file3

# bzip2を使用して圧縮し、ファイル名の後に.bz2を使用する
tar -jcvf archive.tar.bz2 file1 file2 file3

# bzip2を使用して圧縮し、.tbz2をファイル名のサフィックスとして使用する
tar -jcvf archive.tbz2 file1 file2 file3
```

### アンパック

```sh
tar -xvf archive.tar
```

指定されたディレクトリにアンパックする必要がある場合は、`-C`パラメーターを追加します。

```sh
tar -xvf archive.tar -C /path/to/destination/directory
```

圧縮がある場合は、対応する`-z`または`-j`引数を追加します。

```sh
# gzipアーカイブを解凍する
tar -zxvf archive.tar.gz

# bzip2アーカイブを解凍する
tar -jxvf archive.tar.bz2
```

## ファイルの圧縮と解凍

### gzip圧縮

`gzip`コマンドはファイルを圧縮するために使用されます。元のファイルが上書きされることに注意してください。つまり、`gzip`コマンドで圧縮された後、元のファイルは消えます。

```sh
## fileは消え、新しいfile.gzが作成されます
gzip file
```

ディレクトリに直接`gzip`を適用すると、効果がありません。`gzip`はファイルのみを圧縮できるためです。ただし、`-r`引数を使用してディレクトリ内のすべてのファイルを再帰的に圧縮できます。

```sh
# dirnameディレクトリ内のすべてのファイルが圧縮され、各ファイルは対応する.gzファイルを生成し、元のファイルは消えます
gzip dirname
```

### gzip解凍

`-d`パラメーターを使用して、単一のファイルを解凍します。

```sh
### file.gzファイルを解凍し、新しいファイルを作成します
gzip -d file.gz
```

`-r`引数を追加すると、圧縮と同様に再帰的にディレクトリを解凍できます。これにより、ディレクトリ内のすべてのファイルも解凍されます。

```sh
# dirnameおよびサブディレクトリ内のすべてのgzip圧縮ファイルを解凍する
gzip -dr dirname
```

### zip圧縮

zipはパッキングと圧縮の両方を行うことができます。

パックと圧縮するには、次のようにします。

```sh
zip archive.zip file1 file2 file3
```

出力。

```sh
adding: file1 (stored 0%)
adding: file2 (stored 0%)
adding: file3 (stored 0%)
```

一緒に圧縮するディレクトリがある場合は、`-r`パラメーターを追加する必要があります。また、`-q`パラメーターを使用して出力をオフにすることもできます。

```sh
zip -qr archive.zip dirname
```

### zip解凍

現在のディレクトリから直接解凍するには、次のようにします。

```sh
unzip archive.zip
```

特定のディレクトリに解凍する場合は、`-d`パラメーターを使用します。また、`-o`パラメーターを使用して、既存のファイルを問い合わせることなく上書きすることもできます。

```sh
unzip -d /path/to/destination/directory -o archive.zip
```

## まとめ

| サフィックス | パック/圧縮 | アンパック/解凍 |
| ---- | ------- | --------- |
| .tar | tar -cvf archive.tar file1 file2 | tar -xvf archive.tar -C /dest/path |
| .tar.gz/.tgz | tar -zcvf archive.tar file1 file2 | tar -zxvf archive.tar -C /dest/path |
| .tar.bz2/.tbz2 | tar -jcvf archive.tar file1 file2 | tar -jxvf archive.tar -C /dest/path |
| .gz | gzip file | gzip -d file.gz |
| .zip | zip -r archive.zip file1 file2 | unzip -d /dest/path -o archive.zip |