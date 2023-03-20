# glibcの更新方法

## 背景

GNU C Library (glibc) は、GNUシステム用の標準Cライブラリです。GNUシステムの主要なライブラリであり、GNU/Linuxシステム上のほとんどのプログラムで使用されています。メモリの割り当て、ディレクトリの検索、ファイルのオープンとクローズ、ファイルの読み書き、文字列の処理、パターンマッチング、算術などの基本的なルーチンを提供します。

Linux上でソフトウェアをインストールする際に、次のエラーが発生することがあります。

```bash
./configure: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by ./configure)
```

このエラーは、glibcのバージョンが低すぎることを意味します。glibcを最新バージョンに更新する必要があります。

glibcのバージョンを確認するには、次のコマンドを使用できます。

```bash
strings /lib64/libc.so.6|grep GLIBC_
```

出力は次のようになります。

```bash
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_PRIVATE
```

バージョンが2.12であるため、更新する必要があります。

## glibcの更新

まず、glibcのソースコードを保存するディレクトリを作成する必要があります。

```bash
mkdir ~/tmp/glibc
```

次に、glibcのソースコードをダウンロードする必要があります。

```bash
cd ~/tmp/glibc
wget --no-check-certificate https://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
```

> 注意：`--no-check-certificate`は、公式ウェブサイトの証明書が一部のLinuxディストリビューションにとって非常に新しいため、システムが信頼しないため、ダウンロードに失敗する可能性があるため、証明書チェックを無効にするために使用されます。

次に、ソースコードを展開する必要があります。

```bash
tar -xvf glibc-2.17.tar.gz
```

すると、`glibc-2.17`というディレクトリが表示されます。ソースコードを展開する際に問題がある場合は、[圧縮と解凍の方法](/ja/linux/how-to-compress-and-decompress.html)を参照してください。

ディレクトリに移動して、ソースコードをコンパイルしてインストールする必要があります。

```bash
cd glibc-2.17
mkdir build && cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make&&make install
```

> 注意：glibcをインストールするには、root権限が必要です。したがって、上記のコマンドを実行するには、`root`ユーザーに切り替えるか、`sudo`を使用する必要があります。

これで、glibcが最新バージョンに更新されました。glibcのバージョンを再度確認できます。

```bash
strings /lib64/libc.so.6|grep GLIBC_
```

出力は次のようになります。

```bash
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_2.13
GLIBC_2.14
GLIBC_2.15
GLIBC_2.16
GLIBC_2.17
GLIBC_PRIVATE
```

バージョンが2.17に更新されたことがわかります。これで、より高いバージョンのglibcが必要なソフトウェアをインストールできます。