# Nginx配置WebSocket反向代理

WebSocket 是基於 HTTP 協議，爲 Web 應用提供的實時雙向通訊協議。自從發佈以來，越來越多的瀏覽器和服務端軟件都已經支持了 WebSocket 。

當我們使用 nginx 作爲 HTTP 接入層時，卻會發現默認情況下，WebSocket 通訊會失敗。這是因爲 nginx 的配置默認情況下不支持 WebSocket，需要額外的配置才能支持 WebSocket。

## WebSocket 協議握手細節

當客戶端發起 WebSocket 請求時，會首先嚐試建議連接，此時使用的請求地址並不是普通的`http://`或`https://`開頭的地址，而是以`ws://`（未經TLS加密，與HTTP對應）或`wss://`（經TLS加密，與HTTPS對應）開頭的地址。

以`ws://example.com/websocket`爲例，請求頭如下：

```
GET /websocket HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Version: 13
```

可見，該請求頭與普通的 HTTP 請求頭非常類似，除了多幾個字段：

- `Upgrade`：必須爲`websocket`，表示需要升級協議爲 WebSocket 進行通訊
- `Connection`：必須爲`Upgrade`，表示需要升級連接
- `Sec-WebSocket-Key`：必須爲隨機字符串，用於握手驗證，服務器也會返回一個類似的字符串

響應頭：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

經過這樣的握手，雙方就可以建立 WebSocket 連接，進行實時雙向通訊了。

## 配置 WebSocket 反向代理

nginx 反向代理 WebSocket 的話，需要明確地添加`Upgrade`和`Connection`頭：

```
# 如果沒有Upgrade頭，則$connection_upgrade爲close，否則爲upgrade
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    ...
    location /websocket {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # 下面這兩行是關鍵
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

通過以上配置，nginx 就可以正常代理 WebSocket 請求了。

如果有多個後端服務器，則可以使用 `upstream` 定義多個後端服務器，並在 `location` 中使用 `proxy_pass` 指定後端服務器即可：

```
upstream backend {
    192.168.3.1:3000;
    192.168.3.2:300;
}

map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    ...
    location /websocket {
        proxy_pass http://upstream;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # 下面這兩行是關鍵
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

## 小結

nginx 反向代理 WebSocket 還是比較簡單的，最重要的就是在反向代理時配置好`Upgrade`和`Connection`頭。
