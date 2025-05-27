# NGINXをTCPプロキシとして設定する方法

NGINXは強力なWebサーバーおよびリバースプロキシサーバーであることはご存知かもしれません。私たちはこれを使用して、静的ファイル、動的コンテンツ、バックエンドサービスへのリバースプロキシングなど、HTTPリクエストを処理します。また、WebSocket接続のプロキシも可能です。

> NGINXプロキシに馴染みがない場合は、[Node.jsリバースプロキシを使用したNginx設定](//ja/nginx/nginx-reverse-proxy-nodejs.html)を参照してください。

しかし、NGINXはTCPプロキシサーバーとしても使用できます。これはMySQL、Redis、その他のTCPベースのサービスなど、非HTTPプロトコルをプロキシする場合に便利です。この記事では、NGINXをTCPプロキシとして設定するプロセスを説明します。

## 前提条件

始める前に、以下の前提条件を確認してください：

- NGINXがインストールされたサーバー。パッケージマネージャーを使用してNGINXをインストールするか、[公式ウェブサイト](https://nginx.org/ja/download.html)からダウンロードできます。
- NGINXの設定ファイルと編集方法に関する基本的な知識。
- NGINXの設定ファイルへのアクセス（通常は `/etc/nginx/nginx.conf` または `/etc/nginx/conf.d/default.conf` にあります）。
- プロキシしたいTCPサービス（例：MySQL、Redis）がサーバー上で実行され、アクセス可能であること。

## ステップ1：TCPモジュール付きのNGINXをインストールする

NGINXのインストールに `ngx_stream_core_module` が含まれていることを確認してください。これはTCPプロキシングに必要です。以下のコマンドを実行して、このモジュールが含まれているかどうかを確認できます：

```bash
nginx -V 2>&1 | grep --color=auto stream
```

出力に `--with-stream` が含まれている場合、NGINXのインストールはTCPプロキシングをサポートしています。含まれていない場合は、このモジュールを含むバージョンのNGINXをインストールする必要があるかもしれません。
パッケージマネージャーを使用している場合は、以下のコマンドを実行してストリームモジュール付きのNGINXをインストールできます：

```bash
# Debian/Ubuntu向け
sudo apt-get install nginx-extras
```

または

```bash
# CentOS/RHEL向け
sudo yum install nginx-mod-stream
```

ソースからNGINXをコンパイルしている場合は、設定ステップ中に `--with-stream` オプションを含めるようにしてください。
Dockerイメージを使用している場合は、ストリームモジュールが含まれている公式NGINXイメージを使用できます。
例えば、以下のようなDockerfileを使用できます：

```dockerfile
FROM nginx:latest
RUN apt-get update && apt-get install -y nginx-extras
```

## ステップ2：TCPプロキシ用にNGINXを設定する

NGINXの設定ファイル（通常は `/etc/nginx/nginx.conf` または `/etc/nginx/conf.d/default.conf`）を開き、以下の設定ブロックを追加します。`stream` ブロックは `http` ブロックと同じレベル（その中ではなく）に配置する必要があることに注意してください：

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;
    }
}
```

この例では、NGINXがポート `3306`（MySQLのデフォルトポート）でリッスンし、トラフィックを `127.0.0.1:3306` で実行されているバックエンドMySQLサーバーにプロキシするように設定しています。

`127.0.0.1:3306` を実際のMySQLサーバーのアドレスとポートに置き換えることができます。

設定を追加した後、ファイルを保存し、NGINXの設定を構文エラーがないかテストします：

```bash
sudo nginx -t
```

設定テストが成功したら、NGINXをリロードして変更を適用します：

```bash
sudo systemctl reload nginx
```

## タイムアウトとバランシングの設定

TCPプロキシのタイムアウトとロードバランシングも設定できます。例えば、30秒のタイムアウトを設定し、2つのバックエンドサーバーでロードバランシングを有効にするには、以下のように設定を変更できます：

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;

        proxy_connect_timeout 30s;
        proxy_timeout 15s;
        proxy_next_upstream_timeout 1s;
        proxy_next_upstream_tries 2;

        # TCPプロキシのアクセスログを設定
        access_log /var/log/nginx/tcp-access.log;
    }
}
```

> **重要**：`stream` ブロックは `http` ブロックの外側に配置し、NGINXの設定で `http` ブロックと同じレベルに配置する必要があります。`http` ブロック内に配置すると、設定エラーが発生します。

この設定では、接続タイムアウトを30秒、プロキシタイムアウトを15秒（これはアクティビティがない場合に接続が閉じられるまでの時間）に設定し、最初のサーバーが失敗した場合に次のアップストリームサーバーに接続しようとする際に1秒のタイムアウトで2回の再試行を許可します。

ロードバランシングについては、`upstream` ブロックに複数のバックエンドサーバーを追加できます：

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
        server 127.0.0.1:3307;  # MySQLレプリカ
    }
    server {
        listen 3306;
        proxy_pass backend;
    }
}
```

この設定では、着信接続を `upstream` ブロック内の両方のMySQLサーバーに分散します。

バランシングの詳細については、[Node.jsリバースプロキシを使用したNginx設定](//ja/nginx/nginx-reverse-proxy-nodejs.html)を参照してください。

## プロキシプロトコル

バックエンドサーバーに元のクライアントIPアドレスを渡す必要がある場合は、プロキシプロトコルを有効にできます。これは、元のクライアントのIPアドレスを知る必要があるアプリケーションに役立ちます。

プロキシプロトコルを有効にするには、`server` ブロックを以下のように変更できます：

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
    }
    server {
        listen 3306;
        proxy_pass backend;

        proxy_protocol on;
    }
}
```

この設定では、TCPプロキシのプロキシプロトコルを有効にし、バックエンドサーバーが元のクライアントIPアドレスを受信できるようにします。

ここで起こっていることは、NGINXがTCP接続にプロキシプロトコルヘッダーを前置し、元のクライアントIPアドレスとポートを含めるということです。プロキシプロトコルヘッダーの例は次のようになります：

```
PROXY TCP4 192.168.1.100 192.168.1.200 56324 3306
```

このヘッダーは、接続がIPv4上のTCPを使用していることを示し、元のクライアントIPアドレスは `192.168.1.100`、元のクライアントポートは `56324` です。（バックエンドサーバーのIPアドレスは `192.168.1.200`、バックエンドサーバーのポートは `3306` です。）

バックエンドサーバーはこのヘッダーを理解して解析するように設定する必要があります。MySQL自体はネイティブにプロキシプロトコルをサポートしていませんが、ProxySQLやHAProxyなどのプロキシを使用することができます。

ほとんどのバックエンドサービスでは、プロキシプロトコルのサポートを有効にする方法についてドキュメントを確認する必要があります。プロキシプロトコルをサポートする一般的なサービスには以下のものがあります：

- HAProxy
- Traefik
- Redis（適切な設定で）
- PostgreSQL（特定の拡張機能で）
- MySQL/MariaDBのカスタムビルド

プロキシプロトコルを有効にした後、バックエンドサーバーが正しいクライアントIPアドレスを受信していることを確認するために設定をテストしてください。

## TCPプロキシのためのSSL/TLSサポート

NGINXはSSL/TLSを使用して暗号化されたTCP接続もプロキシできます。これは、クライアントとプロキシサーバー間の接続を保護する必要がある場合に役立ちます。TCPプロキシ用にSSL/TLSを設定する方法は次のとおりです：

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;
    }

    server {
        listen 3307 ssl;
        proxy_pass backend;

        ssl_certificate /path/to/certificate.crt;
        ssl_certificate_key /path/to/private.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
    }
}
```

この設定では、ポート3307でリッスンし、復号化されたトラフィックをポート3306で実行されているバックエンドMySQLサーバーに転送するSSL/TLS対応のプロキシを作成します。クライアントはSSL/TLSを使用してプロキシに接続しますが、プロキシとバックエンドサーバー間の接続は（通常はローカル接続の場合）暗号化されていないか、必要に応じて暗号化されます。

> 注意：バックエンドサーバーがSSL/TLS終端をサポートしている場合は、バックエンドサーバーにSSL/TLS終端を処理させることもできます。その場合、NGINXプロキシでSSL/TLSを設定する必要はありません。

## 結論

このガイドでは、ロードバランシングとプロキシプロトコルを含むNGINXでのTCPプロキシの設定方法について説明しました。これらの手順に従うことで、TCPトラフィックを効果的に管理し、バックエンドサービスが必要なクライアント情報を受信できるようになります。
NGINXを強力なTCPプロキシサーバーとして使用して、さまざまなプロトコルとサービスを処理し、アプリケーションに柔軟性とスケーラビリティを提供することができます。

## 追加リソース

- [NGINXドキュメント](https://nginx.org/en/docs/)
- [NGINXストリームモジュール](https://nginx.org/ja/docs/stream/ngx_stream_core_module.html)
- [NGINXロードバランシング](https://nginx.org/ja/docs/http/load_balancing.html)
