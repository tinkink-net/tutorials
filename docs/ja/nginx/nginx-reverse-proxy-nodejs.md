# Node.jsリバースプロキシのNginx設定

私たちは、Node.jsのさまざまなフレームワーク（koa / egg / nestなど）を使用してWebバックエンドを実装することがよくあります。本番環境に移行する際には、Node.jsが直接外部にサービスを提供できることは確かですが、HTTPS、ログ、静的ファイルサービス、負荷分散などを考慮して、nginxを再度アクセスレイヤーとして使用し、nginxを使用してNode.jsサービスにアクセスすることがよくあります。この場合、nginxリバースプロキシを設定する必要があります。

## 基本設定

nginx設定をより管理しやすくするために、通常、各Webサービスに個別の設定ファイルを使用します。これにより、nginxマスター設定ファイルに各個別の設定ファイルを含める必要があります。

メインのnginx設定ファイル（通常は `/etc/nginx.conf` にあります）を見つけ、 `http {}` セクションで `include` 設定を見つけるか追加します。

```
http {
    # ...

    include /etc/nginx/conf.d/*.conf;
}
```

この時点で、Node.jsサイトのために別個の設定ファイルを設定することができます。たとえば、 `/etc/nginx/conf.d/tinkink.net.conf` に以下が含まれます。

```
server {
    listen 80;
    server_name tinkinkink.net;

    error_log /var/log/nginx/tinkinkink_error.log;
    access_log /var/log/nginx/tinkink_accss.log;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Node.jsのネイティブアドレス、ポートに注意
        proxy_pass http://localhost:3000;
    }
}
```

`nginx -t` を使用して設定ファイルをテストし、正しい場合は `nginx -s reload` を使用して設定を再読み込みします。ドメイン解決が完了した後、 `server_name` のドメイン名を使用してNode.jsサービスにアクセスできます。

## HTTPSの設定

HTTPSアクセスを設定する必要がある場合は、ポート443でリッスンし、証明書を設定する必要があります。

```
server {
    listen 80 ;
    listen 443 ssl;
    server_name tinkinkink.net;

    https_certificate /etc/nginx/ssl/tinkink.net.crt;
    https_certificate_key /etc/nginx/ssl/tinkink.net.key;

    # ...
}
```

## 負荷分散の設定

Node.jsサービスがnginxと同じマシンにない場合は、 `proxy_pass` のアドレスをNode.jsサーバーのLANアドレスに変更するだけです。ただし、複数のNode.jsサーバーがある場合は、負荷分散を設定する必要があります。

```
upstream nodejs {
    server 192.168.0.2:3000;
    server 192.168.0.2:3001;
    server 192.168.0.3:3000;
    server 192.168.0.3:3001;
}

server {
    # ...

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Node.jsのネイティブアドレス、ポートに注意
        proxy_pass http://nodejs;
    }
}
```

上記の `upstream` は、複数のNode.jsサーバーのアドレスを含む負荷分散グループ `nodejs` を定義しています。 `proxy_pass` では、負荷分散グループ名のみを指定する必要があります。

複数のサーバーアドレスを指定するだけでなく、 `upstream` は重みや負荷分散アルゴリズムを指定することもできます。たとえば、

```
upstream nodejs {
    server 192.168.0.2:3000 weight=1;
    server 192.168.0.2:3001 weight=2;
    server 192.168.0.3:3000 weight=1;
    server 192.168.0.3:3001 weight=2;
}
```

デフォルトでは、リクエストは順番に異なるNode.jsサービスに割り当てられ、1つがハングアップした場合はドロップされます。上記の設定は、代わりに両方のサーバーがポート `3001` でより多くのリクエストを受け入れるようにします。

その他のポリシー。

- `ip_hash`：アクセスされたIPのハッシュ結果によって、各リクエストが割り当てられるため、ユーザーのIPが同じ場合は常に1つのバックエンドサーバーにアクセスします。
- `fair`：バックエンドサーバーの応答時間に従ってリクエストを割り当て、応答時間が短いものに優先的に割り当てます。
- `url_hash`：アクセスされたURLのハッシュ結果に従ってリクエストを割り当て、各URLが同じバックエンドサーバーに向けられるようにします。

ポリシーの使用方法。

```
upstream nodejs {
    # ポリシー名を書く
    ip_hash
    server 192.168.0.2:3000;
    server 192.168.0.2:3001;
    server 192.168.0.3:3000;
    server 192.168.0.3:3001;
}
```

## 要約

一般的に、nginxを使用してNode.jsリバースプロキシを設定することは比較的簡単であり、 `proxy_pass` 設定項目に焦点を当てています。この方法は、他の言語やフレームワークでのHTTPバックエンドサービスのリバースプロキシにも適用されます。