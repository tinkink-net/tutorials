# Linuxネットワーキングの基礎

<Validator lang="ja" :platform-list="['Ubuntu 24.10']" date="2025-05-23" />

Linuxシステムアドミニストレーターまたはデベロッパーとして、ネットワーク設定を扱うことが多いでしょう。日常業務で必要となる重要な概念とツールを見ていきましょう。

## ネットワークインターフェースの基本

Linuxでネットワーク設定を初めて見るとき、ネットワークインターフェースに出会うでしょう。これらはコンピュータとネットワークの接続ポイントと考えてください - スイッチのポートが異なるデバイスを接続するのと同様です。通常、最初のイーサネットカードは`eth0`、ワイヤレス接続は`wlan0`、システムが自分自身と通信するためのループバックインターフェースは`lo`のような名前で表示されます。

ネットワークインターフェースを扱う際には、コマンドをよく使用します。

## ip linkコマンド

`ip link show`コマンドは、システム上のすべてのネットワークインターフェースの状態を確認するための基本ツールです。これはインターフェースだけでなく、その動作状態や物理/MACアドレスも表示します。特に以下の場合に役立ちます：

- ネットワーク接続の問題のトラブルシューティング
- 新しいネットワークインターフェースのセットアップ
- ネットワークカードが正しく認識されているかの確認
- インターフェースがUPまたはDOWN状態かの確認

```bash
ip link show
```

このコマンドを実行すると、次のような出力が表示されます：

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
```

**この出力は何を意味するのか？** 分解して見てみましょう：

注目すべき重要な部分は、インターフェース名（`lo`と`eth0`）とその状態（`UP`または`DOWN`）です。これらのインターフェースに割り当てられたIPアドレスについてより詳細な情報が必要な場合は、次のコマンドを使用できます：

### IPアドレスの確認

`ip addr show`コマンドは`ip link`よりも包括的で、インターフェースとそれに割り当てられたIPアドレスの両方を表示します。このコマンドは以下の場合に不可欠です：

- IPアドレスの割り当てを確認する
- 重複するIPアドレスをチェックする
- DHCP関連の問題をデバッグする
- サブネットマスク設定を確認する

インターフェースを特定したら、それらがどのIPアドレスを持っているかを知りたいでしょう。`ip addr show`コマンドはこの情報を提供します：

```bash
ip addr show
```

このコマンドを実行すると、次のような出力が表示されます：
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0
    inet6 fe80::215:5dff:fe01:ca05/64 scope link
```

この出力を解読しましょう：
- `inet 127.0.0.1/8`：サブネットマスク付きのループバックアドレス
- `inet 192.168.1.100/24`：実際のIPアドレスとサブネット
- `scope global`：このアドレスが外部世界との使用に有効であることを示す
- `dynamic`：このアドレスがDHCPによって割り当てられたことを示す

同様の情報を取得するために`ifconfig`を使用することもできますが、`ip`コマンドに代わって非推奨となっています：

> `ifconfig`は非推奨のため、最新のシステムではデフォルトでインストールされていない場合があります。必要な場合は、`net-tools`パッケージをインストールできます。

```bash
ifconfig
```

このコマンドを実行すると、次のような出力が表示されます：

```
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet

```

インターフェースのMACアドレス、IP、その他の詳細も確認できます。

## ネットワーク接続の管理

### 静的vs動的IP設定

サーバーやワークステーションをセットアップする際、最初に直面する決断の一つは、静的または動的IPアドレッシングを使用するかどうかです。

サーバーをセットアップする場合、おそらく静的IPが必要でしょう。方法は次のとおりです：

静的IPアドレスを設定する場合、`ip addr add`コマンドで即座に制御できます。構文は`ip addr add IPアドレス/サブネットマスク dev インターフェース`のパターンに従います。例えば：

```bash
sudo ip addr add 192.168.1.100/24 dev eth0
```

このコマンドは以下に最適です：
- ネットワーク設定の迅速なテスト
- 緊急のネットワーク修復
- トラブルシューティング中の一時的なIP割り当て
- インターフェースへのセカンダリIPアドレスの追加

> ヒント：IPアドレスを削除するには、`sudo ip addr del IPアドレス dev インターフェース`を使用します。利用可能なすべてのオプションを確認するには`ip --help`を使用できます。

ただし、この設定は再起動後には維持されません。最新のUbuntuやDebianシステムで永続的なセットアップを行うには、netplan設定を編集する必要があります。通常は`/etc/netplan/01-netcfg.yaml`または類似の場所にあります。静的設定の例は次のとおりです：

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
```

またはDHCPを使用する場合：

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: true
```

ファイルを編集した後、次のコマンドで変更を適用します：

```bash
sudo netplan apply
```

## 必須のネットワークトラブルシューティングツール

問題が発生した場合（そして必ず発生します）、これらの診断ツールをしっかりと理解しておく必要があります：

### ネットワーク接続テスト

基本から始めましょう - `ping`コマンド。単純に思えるかもしれませんが、非常に強力です：

`ping`コマンドは基本的に見えるかもしれませんが、非常に多機能です。`-c`フラグは送信するパケット数を制限し、スクリプト作成や迅速なテストに役立ちます：

```bash
ping -c 4 google.com  # 正確に4つのパケットを送信して停止
```

pingコマンドを実行すると、次のような出力が表示されます：
```
PING google.com (142.250.189.78) 56(84) bytes of data.
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=1 ttl=116 time=14.3 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=2 ttl=116 time=13.9 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=3 ttl=116 time=14.1 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=4 ttl=116 time=14.0 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 13.915/14.075/14.284/0.151 ms
```

この出力は以下を示しています：
- リモートIPアドレス（142.250.189.78）
- 各パケットの往復時間（例：14.3 ms）
- パケット損失の割合（この場合は0%）
- タイミングのばらつきに関する統計

pingの用途：
- 基本的な接続テスト
- ネットワークレイテンシの測定
- DNS解決の検証
- ホストの可用性監視

接続が遅い、または失敗している理由を知りたい場合は、`traceroute`が役立ちます：

トラフィックが通るパスを理解する必要がある場合、`traceroute`は非常に価値があります：

```bash
traceroute google.com
```

tracerouteを使用すると、次のように表示されることがあります：
```
traceroute to google.com (142.250.189.78), 30 hops max, 60 byte packets
 1  _gateway (192.168.1.1)  0.344 ms  0.313 ms  0.307 ms
 2  isp-router.net (10.0.0.1)  12.132 ms  12.125 ms  12.119 ms
 3  core-router.isp.net (172.16.0.1)  13.225 ms  13.219 ms  13.213 ms
 4  google-peer.isp.net (192.0.2.1)  13.376 ms  13.370 ms  13.364 ms
 5  lhr25s35-in-f14.1e100.net (142.250.189.78)  14.090 ms  14.084 ms  14.078 ms
```

各行は接続の「ホップ」を表しています：
- 先頭の数字はホップカウント
- 各ルーターのホスト名とIPアドレス
- そのホップまでのレイテンシを示す3つの時間測定

このツールは以下に役立ちます：
- ネットワークのボトルネックの特定
- ルーティングの問題のトラブルシューティング
- ネットワークパスの検証
- ネットワーク輻輳ポイントの検出

### DNS解決

ドメイン名が正しく解決されるかどうかを確認する必要がある場合、`dig`が最適なツールです。`nslookup`よりも強力で、DNS照会に関する詳細情報を提供します：

```bash
dig google.com
```

このコマンドを実行すると、次のような出力が表示されます：
```
; <<>> DiG 9.16.1-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
;; QUESTION SECTION:
;google.com.			IN	A
;; ANSWER SECTION:
google.com.		299	IN		142.250.189.78
;; Query time: 14 msec
;; SERVER:  8.8.8.8#53
;; WHEN: Wed Oct 25 12:34:56 UTC 2023
;; MSG SIZE  rcvd: 55
```

この出力は以下を提供します：
- クエリに使用されたDNSサーバー（8.8.8.8）
- 応答を得るのにかかった時間（14ミリ秒）
- 応答メッセージのサイズ（55バイト）

### 接続分析

より複雑な問題については、`ss`や`netstat`などのツールでより深く掘り下げる必要があります：

`ss`コマンドはnetstatの最新の代替品で、詳細なソケット統計を提供します：

```bash
ss -tuln  # TCP(-t)とUDP(-u)のリスニング(-l)ポートを数値形式(-n)で表示
```

ssコマンドを実行すると：
```
Netid  State    Recv-Q  Send-Q   Local Address:Port    Peer Address:Port
tcp    LISTEN   0       128      0.0.0.0:22            0.0.0.0:*
tcp    LISTEN   0       128      0.0.0.0:80            0.0.0.0:*
tcp    ESTAB    0       0        192.168.1.100:22      192.168.1.10:52414
```

この出力は以下を示しています：
- `LISTEN`：接続を待機しているサービス
- `ESTAB`：確立された接続
- ローカルとリモートのアドレス:ポートのペア
- 受信/送信データのキュー長

このコマンドは以下に不可欠です：
- セキュリティ監査
- サービスのデバッグ
- ポート競合の解決
- 接続状態の分析

## 結論

Linuxネットワーキングにはまだ多くのトピックとツールがあります。ファイアウォール（iptables/nftables）、VPN、パケットフィルタリング、ネットワークパフォーマンスチューニングなどです。しかし、基本をマスターすることで、構築するための堅固な基盤が得られます。

Linuxネットワーキングのマスタリングは目的地ではなく旅です。基本から始め、定期的に練習し、ニーズが増えるにつれて徐々により高度なトピックを探求していきましょう。