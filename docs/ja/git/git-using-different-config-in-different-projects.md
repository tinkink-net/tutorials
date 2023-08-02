# GIT: 異なる設定（gitユーザー名/メールアドレスまたはSSHキー）を異なるプロジェクトで使用する方法

<Validator lang="ja" :platform-list="['Git 2.37']" date="2023-03-06" />

## 背景

Gitを使用する際、ユーザー名（`user.name`）やメールアドレス（`user.email`）などの基本的な設定項目を設定することがよくあります。設定されていない場合、Gitを使用してコードをコミットするとエラーが発生します。

```
Make sure you configure your 'user.email' and 'user.name' in git
```

これは、`git config`コマンドを使用して値を設定することで修正できます。

```sh
git config --global user.name "Tinymemo"
git config --global user.email "tinymemo@tinkink.net"
```

このコマンドは、実際に2つの設定項目をグローバル設定ファイルに書き込みます：`user.name`と`user.email`。設定ファイルを開いてみることができます（通常は`~/.gitconfig`または`C:\Users\<username>\.gitconfig`にあります）。

```
[user]
        name = Tinymemo
        email = tinymemo
```

`--global`オプションを使用せずにコマンドを実行しない場合、設定ファイルは現在のディレクトリに書き込まれます。通常は`.git/config`にあります。

## 異なるプロジェクトで異なる設定を使用する

異なるアイデンティティでプロジェクトに参加したい場合、各プロジェクトで異なる設定を使用する必要があります。ただし、各プロジェクトに別々の設定を書き込むことは望ましくありません。プロジェクトに設定がない場合はグローバル設定を使用する必要があるためです。より良い方法が必要です。

幸いなことに、Gitは`includeIf`ディレクティブを提供しており、異なるパスに対して異なる設定を指定することができます。

次の2つのパスがあると仮定します。

- `~/work`に対応するユーザー名とメールアドレスは`Tinymemo` / `tinymemo@somework.com`
- `~/hobby`に対応するユーザー名とメールアドレスは`Tinymemo` / `tinymemo@somehobby.com`

まず、2つの別々の設定ファイルを作成します。

`~/.gitconfig-work`：

```
[user]
        name = Tinymemo
        email = tinymemo@somework.com
```

`~/.gitconfig-hobby`：

```
[user]
        name = Tinymemo
        email = tinymemo@somehobby.com
```

次に、グローバル設定ファイル`~/.gitconfig`に次の行を追加します。パスの最後にスラッシュがあることに注意してください。

```
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
[includeIf "gitdir:~/hobby/"]
    path = ~/.gitconfig-hobby
```

その後、プロジェクトの対応するディレクトリで検証できます。

```sh
# ~/work/project1
git config user.name // Tinymemo
git config user.email // tinymemo@somework.com

# ~/hobby/project2
git config user.name // Tinymemo
git config user.email // tinymemo@somehobby.com
```

> 注意：`git config`コマンドはプロジェクトディレクトリで実行する必要があります。そうしないと、グローバル設定が使用されます。

これにより、異なるプロジェクトで異なる設定を簡単に使用できるようになりました。

## 公開/秘密キーに異なる設定を使用する

上記の設定により、異なるプロジェクトで異なるユーザー名とメールアドレスを簡単に使用できるようになりましたが、一部の場合では異なるSSH公開/秘密キーを使用する必要があります。

まず、新しい公開キーを作成する必要があります。すでに公開キーがある場合は、この手順をスキップできます。

```sh
cd ~/.ssh
ssh-keygen -t rsa
```

ファイル名に注意してください。デフォルトの`id_rsa`名にすることはできません。そうすると、既存の公開キーと競合します。

```
Enter file in which to save the key (/Users/tinymemo/.ssh/id_rsa): id_rsa_hobby
```

すべてEnterを押してください。

次に、新しい公開キーを`ssh`コマンドのために指定する新しい設定項目を追加できます。

```
[core]
    sshCommand = "ssh -i ~/.ssh/id_rsa_hobby -F /dev/null"
```

これで、異なるプロジェクトで異なる公開/秘密キーを使用できるようになりました。

## まとめ

グローバル設定で`[includeIf]`ディレクティブを使用することで、異なるディレクトリの異なるプロジェクトで異なるユーザー名、メールアドレス、公開/秘密キーを簡単に使用できるようになりました。
