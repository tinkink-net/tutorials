# Linuxログローリングカットとlogrotate

## ログローリングの紹介

ログはオンラインサービスの非常に重要な部分です。さまざまなサービスは、nginxアクセスログ、ビジネスシステムフローログ、さまざまなエラーログなど、実行中に自分自身の操作ログを常に記録しています。これらのログは通常、異なるログファイルに保存され、ログファイルのサイズは実行時間が増えるにつれて増加します。

しかし、オンラインサーバーのディスクスペースは限られており、ログファイルのサイズが増え続けると、最終的にディスクスペースが不足することになります。この問題を解決するには、ログに対してローリングカットを実行する必要があります。

具体的には、ローリングカットは次のことを行います。

1. 特定のスクロールルールを設定する（時間またはボリュームなど）
2. ルールが満たされたときに現在のログを履歴ログに変更し、新しいログファイルを現在のログファイルとして生成する
3. 履歴ログファイルが多すぎる場合は、古いログファイルを自動的にクリーンアップする

これにより、元の大きなログファイルは一定期間ごとにカットされ、小さなログファイルの束になり、総ログ履歴は基本的に安定して変化しないため、ログが増え続けてディスクスペースを占有することを心配する必要はありません。

## logrotateの使用方法

ほとんどのLinuxディストリビューションには、logrotateツールが組み込まれており、logrotateルールを設定し、古いログファイルを自動的にクリーンアップすることが簡単になっています。

`logrotate`の設定ファイルは次のとおりです。

- `/etc/logrotate.conf` メインの設定ファイル
- `/etc/logrotate.d` ディレクトリには、多くの特定のlogrotate設定ファイルを保持できます

ログローリングカットルールを設定する必要がある場合は、`/etc/logrotate.d`の下に新しい設定ファイルを作成できます。たとえば、`/etc/logrotate.d/nginx`の場合、このファイルの内容は次のようになります。

```
/var/log/nginx/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 640 root root
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 \`cat /var/run/nginx.pid`
    endscript
}
```

この設定ファイルの意味は次のとおりです。

- `daily` 1日ごとにロールオーバーする
- `missingok` ファイルが存在しない場合はロールバックしない
- `rotate 7` 最後の7つのログファイルを保持する
- `compress` ログファイルを圧縮する
- `delaycompress` 圧縮を遅延させる
- `notifempty` ファイルが空の場合はロールバックしない
- `create 640 root root` 新しいログファイルの所有者とアクセス許可を指定する。特に、nginxが`root`ユーザーによって実行されていない場合
- `sharedscripts` スクリプトを共有し、ログのスクロールが完了した後にスクリプトを実行します。そうでない場合、各ログファイルのスクロールごとにスクリプトを実行する必要があります。
- `postrotate` ログのスクロールが完了した後に実行されるスクリプト。一部のビジネスログには、このスクリプトが必要ない場合があります。

ログローリングカットルールの設定が完了したら、``logrotate -d``を使用してルールを確認できます。たとえば、

```sh
logrotate -d /etc/logrotate.d/nginx
```

次のようなものが返されます。

```
reading config file /etc/logrotate.d/nginx
Allocating hash table for state file, size: 15360 B

Handling 1 logs

rotating pattern: /var/log/nginx/*.log after 1 days (7 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/nginx/*.log /access.log
  log does not need rotating (log has been already rotated)
considering log /var/log/nginx/*.log /error.log
  log does not need rotating (log has been already rotated)

running postrotate script
......
```

エラーがない場合は、設定ファイルが正しいことを意味します。

すぐに結果を確認したい場合は、`logrotate -f`を使用してスクロールカットを強制できます。たとえば、

```sh
logrotate -f /etc/logrotate.d/nginx
```

## その他のパラメータ

- `compress` ローリング後に履歴ログを圧縮する
- ``nocompress`` ローリング後に履歴ログを圧縮しない
- `copytruncate` 現在のログファイルをバックアップして切り捨てるために使用されます。コピーしてから空にする方法であり、コピーと空にする間に時間的なギャップがあり、一部のログデータが失われる可能性があります。
- `nocopytruncate` ログファイルをバックアップしますが、切り捨てません
- `create mode owner group` 新しいファイルを作成するときの所有者とアクセス許可を指定します
- `nocreate` 新しいログファイルを作成しない
- `delaycompress` と `compress` を一緒に使用すると、次のロールオーバーまで履歴ログファイルを圧縮します
- `nodelaycompress` は `delaycompress` オプションを上書きし、ローリングベースで圧縮します
- `missingok` ログがない場合、エラーを報告せずに次のログにスクロールします
- `errors address` スクロール時にエラーメッセージを指定されたメールアドレスに送信します
- `ifempty` ログファイルが空でもスクロールします
- `notifempty` ログファイルが空の場合はスクロールしない
- `mail address` スクロールされたログファイルを指定されたメールアドレスに送信します
- `nomail` スクロール時にログファイルを送信しない
- `olddir directory` スクロールされたログファイルを指定されたディレクトリに配置します。現在のログファイルと同じファイルシステムにある必要があります
- `noolddir` スクロールされたログファイルは、現在のログファイルと同じディレクトリに配置されます
- `sharedscripts` スクリプトを共有し、ログのスクロールが完了した後にスクリプトを実行します。そうでない場合、各ログファイルのスクロールごとにスクリプトを実行する必要があります。
- `prerotate` スクロール前に実行されるコマンド（ファイルのプロパティを変更するなど）；別の行でなければなりません
- `postrotate` ロールオーバー後に実行されるコマンド（サービスを再起動するための`kill -HUP`など）；別の行でなければなりません
- `daily` ローリング期間が1日であることを指定します
- `weekly` ローリング期間が1週間であることを指定します
- `monthly` ローリングサイクルが1か月であることを指定します
- `rotate count` ログファイルが削除される前にロールオーバーされる回数を指定します。 `0`はバックアップが保持されないことを意味し、 `5`は5つのバックアップが保持されることを意味します
- `dateext` 現在の日付を名前の形式として使用します
- `dateformat . %s` は、`dateext` と一緒に使用され、次の行の直後に表示され、ファイル名を定義します。`dateext` と一緒に使用する必要があり、`%Y`/`%m`/`%d`/`%s` の 4 つのパラメーターのみをサポートしています。
- `size log-size`（または `minsize log-size`）は、指定されたサイズに到達したときにログファイルをスクロールします。以下は正しいフォーマットです。
    - `size = 5` または `size 5` （5 バイト以上の場合にスクロール）
    - `size = 100k` または `size 100k`
    - `size = 100M` または `size 100M`
