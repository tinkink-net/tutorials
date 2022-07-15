# Nginx Configuring WebSocket Reverse Proxy

WebSocket is a real-time, two-way communication protocol for Web applications based on the HTTP protocol. Since its release, a growing number of browsers and server-side software have supported WebSocket.

When we use nginx as the HTTP access layer, we find that WebSocket communication fails by default. This is because nginx is not configured to support WebSockets by default, and requires additional configuration to support WebSockets.

## WebSocket protocol handshake details

When a client initiates a WebSocket request, it first tries to suggest a connection, and the request address used at this point is not a normal address starting with `http://` or `https://`, but an address starting with `ws://` (unencrypted with TLS and corresponding to HTTP) or `wss://` (encrypted with TLS and corresponding to HTTPS).

Taking `ws://example.com/websocket` as an example, the request header is as follows.

```
GET /websocket HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Version: 13
```

As you can see, the request header is very similar to the normal HTTP request header, except for a few more fields.

- `Upgrade`: must be `websocket`, indicating that the protocol needs to be upgraded to WebSocket for communication
- `Connection`: must be `Upgrade`, indicating that the connection needs to be upgraded
- `Sec-WebSocket-Key`: must be a random string, used for handshake authentication, the server will also return a similar string

Response header.

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

After such a handshake, both parties can establish a WebSocket connection for real-time two-way communication.

## Configuring WebSocket Reverse Proxy

For nginx to reverse proxy WebSockets, you need to explicitly add the `Upgrade` and `Connection` headers.

```
## If there is no Upgrade header, then $connection_upgrade is close, otherwise it is upgrade
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
        # These two lines are the key
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

With the above configuration, nginx will be able to proxy WebSocket requests properly.

If you have multiple backend servers, you can define multiple backend servers using `upstream` and use `proxy_pass` in `location` to specify the backend server.

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
        # These two lines are the key
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

## Summary

The most important thing is to configure the `Upgrade` and `Connection` headers when you reverse proxy.
