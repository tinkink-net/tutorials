# Nginx WebSocketリバースプロキシの設定

WebSocketは、HTTPプロトコルに基づくWebアプリケーションのリアルタイム双方向通信プロトコルです。リリース以来、増え続けるブラウザとサーバーサイドソフトウェアがWebSocketをサポートしています。

nginxをHTTPアクセス層として使用する場合、WebSocket通信がデフォルトで失敗することがあります。これは、nginxがデフォルトでWebSocketをサポートするように構成されていないためであり、WebSocketをサポートするためには追加の設定が必要です。

## WebSocketプロトコルのハンドシェイクの詳細

クライアントがWebSocketリクエストを開始すると、最初に接続を提案し、この時点で使用されるリクエストアドレスは、通常の`http://`または`https://`で始まるアドレスではなく、`ws://`（TLSで暗号化されていないHTTPに対応）または`wss://`（TLSで暗号化されたHTTPSに対応）で始まるアドレスです。

例えば、`ws://example.com/websocket`を取ると、リクエストヘッダは以下のようになります。

```
GET /websocket HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Version: 13
```

ご覧のように、リクエストヘッダは通常のHTTPリクエストヘッダと非常に似ていますが、いくつかのフィールドが追加されています。

- `Upgrade`：`websocket`でなければならず、通信のためにプロトコルをWebSocketにアップグレードすることを示します。
- `Connection`：`Upgrade`でなければならず、接続をアップグレードすることを示します。
- `Sec-WebSocket-Key`：ランダムな文字列でなければならず、ハンドシェイクの認証に使用され、サーバーも同様の文字列を返します。

レスポンスヘッダ。

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

このようなハンドシェイクの後、両者はリアルタイムの双方向通信のためにWebSocket接続を確立できます。

## WebSocketリバースプロキシの設定

nginxがWebSocketをリバースプロキシするには、明示的に`Upgrade`と`Connection`ヘッダを追加する必要があります。

```
## Upgradeヘッダがない場合、$connection_upgradeはcloseになります。それ以外の場合はupgradeになります。
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
    ...
    location /websocket {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # これらの2行が重要です
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

上記の設定で、nginxはWebSocketリクエストを適切にプロキシできます。

複数のバックエンドサーバーがある場合は、`upstream`を使用して複数のバックエンドサーバーを定義し、`location`で`proxy_pass`を使用してバックエンドサーバーを指定できます。

```
upstream backend {
    192.168.3.1:3000;
    192.168.3.2:300;
}

map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
close; }

server {
    ...
    location /websocket {
        proxy_pass http://upstream;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # これらの2行が重要です
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

## 要約

リバースプロキシする場合は、`Upgrade`と`Connection`ヘッダを設定することが最も重要です。