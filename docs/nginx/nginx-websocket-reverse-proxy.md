# Nginx配置WebSocket反向代理

WebSocket 是基于 HTTP 协议，为 Web 应用提供的实时双向通讯协议。自从发布以来，越来越多的浏览器和服务端软件都已经支持了 WebSocket 。

当我们使用 nginx 作为 HTTP 接入层时，却会发现默认情况下，WebSocket 通讯会失败。这是因为 nginx 的配置默认情况下不支持 WebSocket，需要额外的配置才能支持 WebSocket。

## WebSocket 协议握手细节

当客户端发起 WebSocket 请求时，会首先尝试建议连接，此时使用的请求地址并不是普通的`http://`或`https://`开头的地址，而是以`ws://`（未经TLS加密，与HTTP对应）或`wss://`（经TLS加密，与HTTPS对应）开头的地址。

以`ws://example.com/websocket`为例，请求头如下：

```
GET /websocket HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Version: 13
```

可见，该请求头与普通的 HTTP 请求头非常类似，除了多几个字段：

- `Upgrade`：必须为`websocket`，表示需要升级协议为 WebSocket 进行通讯
- `Connection`：必须为`Upgrade`，表示需要升级连接
- `Sec-WebSocket-Key`：必须为随机字符串，用于握手验证，服务器也会返回一个类似的字符串

响应头：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

经过这样的握手，双方就可以建立 WebSocket 连接，进行实时双向通讯了。

## 配置 WebSocket 反向代理

nginx 反向代理 WebSocket 的话，需要明确地添加`Upgrade`和`Connection`头：

```
# 如果没有Upgrade头，则$connection_upgrade为close，否则为upgrade
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
        # 下面这两行是关键
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

通过以上配置，nginx 就可以正常代理 WebSocket 请求了。

如果有多个后端服务器，则可以使用 `upstream` 定义多个后端服务器，并在 `location` 中使用 `proxy_pass` 指定后端服务器即可：

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
        # 下面这两行是关键
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

## 小结

nginx 反向代理 WebSocket 还是比较简单的，最重要的就是在反向代理时配置好`Upgrade`和`Connection`头。
