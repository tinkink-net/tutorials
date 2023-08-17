# Linuxでsystemdを使ってタイマーを設定する方法

<Validator lang="ja" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9']" date="2023-03-29" />

## 背景

タイマーはLinuxで広く使用されています。特定の時間や間隔でタスクを実行するために使用されます。たとえば、タイマーを使用して、毎日、毎週、または毎月特定の時間にバックアップスクリプトを実行することができます。

いくつかの使用例：

- 自動バックアップのスケジュール設定：たとえば、特定の時間にデータベースのバックアップを実行するタイマーを設定できます。
- システムパフォーマンスの監視：CPU使用率、メモリ使用量、ディスクスペースなどのシステムメトリックスの定期的なチェックをスケジュールすることができます。これにより、管理者は重大な問題になる前にパフォーマンスの問題を特定して解決することができます。
- 定期的な間隔でスクリプトを実行する：Linuxタイマーを使用して、定期的な間隔でスクリプトを実行することができます。これは、一時ファイルのクリーンアップ、システムメンテナンススクリプトの実行などのタスクに役立ちます。

古いバージョンのLinuxでは、cronデーモンを使用してタスクをスケジュールしていました。しかし、cronデーモンは新しいインストールには推奨されていません。代わりに、systemdタイマーを使用する必要があります。

## タイマーの一覧表示

すべてのタイマーの一覧を表示するには、次のコマンドを使用します。

```sh
systemctl list-timers
```

タイマーの名前、次にトリガーされる時間、最後にトリガーされた時間を含むタイマーのリストが表示されます。

```
NEXT                        LEFT          LAST PASSED UNIT                         ACTIVATES
Wed 2023-03-29 10:06:35 CST 4min 49s left n/a  n/a    ua-timer.timer               ua-timer.service
Wed 2023-03-29 10:14:03 CST 12min left    n/a  n/a    systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Wed 2023-03-29 17:35:56 CST 7h left       n/a  n/a    motd-news.timer              motd-news.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a  n/a    dpkg-db-backup.timer         dpkg-db-backup.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a  n/a    logrotate.timer              logrotate.service
Thu 2023-03-30 03:27:59 CST 17h left      n/a  n/a    apt-daily.timer              apt-daily.service
Thu 2023-03-30 06:58:06 CST 20h left      n/a  n/a    apt-daily-upgrade.timer      apt-daily-upgrade.service
Sun 2023-04-02 03:10:16 CST 3 days left   n/a  n/a    e2scrub_all.timer            e2scrub_all.service
```

## Linux systemdを使用してタイマーを設定する

> タイマーを設定するには、rootユーザーまたはsudo権限を持つユーザーを使用する必要があります。

Linux systemdを使用してタイマーを設定し、出力をファイルに記録するには、次の手順に従います。

まず、`/etc/systemd/system`ディレクトリに新しいタイマーユニットファイルを作成します。ファイル名は任意のものにできますが、`.timer`拡張子を持つ必要があります。たとえば、`helloworld.timer`という名前のファイルを作成します。

タイマーユニットファイルに、次の行を追加します。

```
[Unit]
Description=Hello World Timer

[Timer]
OnCalendar=*:0/10
Unit=helloworld.service

[Install]
WantedBy=timers.target
```

`.timer`ファイルは、タイマーを定義するsystemdユニットファイルです。`[Unit]`セクションが含まれ、タイマーの説明を提供し、`[Timer]`セクションが含まれ、タイマーがトリガーされる時間と実行するサービスを定義し、`[Install]`セクションが含まれ、タイマーをインストールする場所を指定します。

これにより、システムは10分ごとに`helloworld.service`ユニットを実行し、`OnCalendar`を使用して、任意の時間の10分ごとにタイマーをトリガーするように設定されます。

> 注意：`OnCalendar`は、タイマーがトリガーされる時間を定義するために柔軟な構文を使用します。この例では、`*:0/10`は「10分ごと」を意味します。異なる間隔を指定するために他の値を使用できます。
詳細については、付録を参照してください。

次に、同じディレクトリに新しいサービスユニットファイルを作成します。ファイル名は任意のものにできますが、`.service` 拡張子を持つ必要があります。たとえば、`helloworld.service` という名前のファイルを作成します。

サービスユニットファイルに、次の行を追加します。

```
[Unit]
Description=Hello World Service

[Service]
Type=oneshot
ExecStart=/bin/echo "Hello World"

[Install]
WantedBy=multi-user.target
```

`.service` ファイルは、サービスを定義する systemd ユニットファイルです。`[Unit]` と `[Install]` セクションは `.timer` ファイルと似ています。`[Service]` セクションは、サービスの実行方法を定義します。

これにより、タイマーがトリガーされたときに `/bin/echo "Hello World"` コマンドが実行されるようにシステムに指示されます。

新しいユニットファイルを読み込むために systemd デーモンを再読み込みします。

```sh
sudo systemctl daemon-reload
```

タイマーを有効にして開始します。

```sh
sudo systemctl enable helloworld.timer
sudo systemctl start helloworld.timer
```

これで、システムは10分ごとに "Hello World" を出力し、出力をファイルに記録します。タイマーリストを再度確認して、タイマーが実行されていることを確認できます。

```sh
systemctl list-timers
```

```
NEXT                        LEFT          LAST                        PASSED       UNIT                         ACTIVATES
Wed 2023-03-29 10:10:00 CST 1min 46s left n/a                         n/a          helloworld.timer             helloworld.service
Wed 2023-03-29 10:14:03 CST 5min left     n/a                         n/a          systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Wed 2023-03-29 16:14:38 CST 6h left       Wed 2023-03-29 10:06:43 CST 1min 29s ago ua-timer.timer               ua-timer.service
Wed 2023-03-29 17:18:24 CST 7h left       n/a                         n/a          motd-news.timer              motd-news.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a                         n/a          dpkg-db-backup.timer         dpkg-db-backup.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a                         n/a          logrotate.timer              logrotate.service
Thu 2023-03-30 05:50:50 CST 19h left      n/a                         n/a          apt-daily.timer              apt-daily.service
Thu 2023-03-30 06:41:07 CST 20h left      n/a                         n/a          apt-daily-upgrade.timer      apt-daily-upgrade.service
Sun 2023-04-02 03:10:39 CST 3 days left   n/a                         n/a          e2scrub_all.timer            e2scrub_all.service
```

次のトリガー時間が1分46秒後であることがわかるように、`helloworld.timer`が実行されています。数分待ってログファイルを確認してください：

```sh
journalctl -u helloworld.service
```

`echo`コマンドの出力が表示されます：

```
Mar 29 10:10:02 ubuntu systemd[1]: Hello World Serviceを開始中...
Mar 29 10:10:02 ubuntu echo[7942]: Hello World
Mar 29 10:10:02 ubuntu systemd[1]: helloworld.service: 正常に停止しました。
Mar 29 10:10:02 ubuntu systemd[1]: Hello World Serviceが終了しました。
```

出力をファイルにリダイレクトする場合は、サービスユニットファイルの`ExecStart`行を以下のように変更できます：

```sh
ExecStart=/bin/sh -c '/bin/echo "Hello World" >> /tmp/helloworld.log'
```

## 付録

### OnCalendar

`OnCalendar`は、タイマーユニットファイルの`[Timer]`セクションのオプションであり、タイマーがトリガーされるタイミングを指定します。`OnCalendar`の構文は以下のようになります。

```
OnCalendar=
```

カレンダー式は、タスクのスケジュールを指定する単純または複雑な式である。完全な式は以下のようになります。

```
dayOfWeek year-month-day hour:minute:second
```

- 曜日：`Mon`、`Tue`、`Wed`、`Thu`、`Fri`、`Sat`、`Sun`
- 年/月/日：数字を使用する
- 時/分/秒：数字を使用する

各部分は、範囲、リスト、または間隔、または任意の値に一致する`*`を使用できます。例えば：

- `Mon..Fri`：月曜日から金曜日まで
- `Mon、Fri`：月曜日と金曜日
- `8..18/2`：午前8時から午後6時まで、2時間ごと
- `*-*-1`：毎月1日目

各部分は省略することができます。例えば：

- 毎時タスクを実行するには、`OnCalendar=*:0`を使用します。
- 毎日午後3時30分にタスクを実行するには、`OnCalendar=15:30`を使用します。
- 毎週月曜日の午前9時にタスクを実行するには、`OnCalendar=Mon 9:00`を使用します。
- 15分ごとにタスクを実行するには、`OnCalendar=*:0/15`を使用します。
- 平日の午前8時にタスクを実行するには、`OnCalendar=Mon..Fri 8:00`を使用します。

これらの基本的な式に加えて、範囲、リスト、および間隔を含むより複雑な式を使用できます。以下にいくつかの例を示します。
- 8:00 AMから6:00 PMの間、2時間ごとにタスクを実行するには、`OnCalendar=8..18/2:0`を使用します。
- 毎月15日の午前10時にタスクを実行するには、`OnCalendar=*-*-15 10:00`を使用します。

また、一般的なスケジュールを指定するために、特別なキーワード`minutely`、`hourly`、`daily`、`weekly`、`monthly`、`yearly`を使用することもできます。

常に`systemd-analyze`コマンドを使用して`OnCalendar`式を検証できます。

```sh
systemd-analyze calendar "Mon..Fri 8:00"
```

出力には、式の正規化された形式と次の経過時間が表示されます。

```
  Original form: Mon..Fri 8:00
Normalized form: Mon..Fri *-*-* 08:00:00
    Next elapse: Thu 2023-03-30 08:00:00 CST
       (in UTC): Thu 2023-03-30 00:00:00 UTC
       From now: 18h left
```

全体的に、`OnCalendar`オプションは、Linuxでsystemdタイマーを使用してタスクをスケジュールする柔軟で強力な方法を提供します。構文を理解し、適切なカレンダー式を使用することで、システムを自動化し、時間と労力を節約できます。
