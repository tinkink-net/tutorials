# 如何将 NGINX 配置为 TCP 代理

您可能已经知道 NGINX 是一个强大的 Web 服务器和反向代理服务器，我们使用它来处理 HTTP 请求，包括静态文件、动态内容和对后端服务的反向代理。它还可以代理 WebSocket 连接。

> 如果您不熟悉 NGINX 代理，请参考 [Nginx 配置与 Node.js 反向代理](//zh-hans/nginx/nginx-reverse-proxy-nodejs.html)。

然而，NGINX 也可以用作 TCP 代理服务器，这对于代理非 HTTP 协议如 MySQL、Redis 和其他基于 TCP 的服务非常有用。本文将指导您完成将 NGINX 配置为 TCP 代理的过程。

## 前提条件

在开始之前，请确保您具备以下前提条件：

- 安装了 NGINX 的服务器。您可以使用包管理器安装 NGINX 或从[官方网站](https://nginx.org/zh-hans/en/download.html)下载。
- 对 NGINX 配置文件及如何编辑它们的基本了解。
- 访问 NGINX 配置文件的权限，通常位于 `/etc/nginx/nginx.conf` 或 `/etc/nginx/conf.d/default.conf`。
- 您想要代理的 TCP 服务（例如 MySQL、Redis）应该在服务器上运行并可访问。

## 步骤 1：安装带有 TCP 模块的 NGINX

确保您的 NGINX 安装包含 `ngx_stream_core_module`，这是 TCP 代理所必需的。您可以通过运行以下命令检查是否包含此模块：

```bash
nginx -V 2>&1 | grep --color=auto stream
```

如果输出包含 `--with-stream`，则您的 NGINX 安装支持 TCP 代理。如果没有，您可能需要安装包含此模块的 NGINX 版本。
如果您使用包管理器，可以通过运行以下命令安装带有 stream 模块的 NGINX：

```bash
# 对于 Debian/Ubuntu
sudo apt-get install nginx-extras
```

或

```bash
# 对于 CentOS/RHEL
sudo yum install nginx-mod-stream
```

如果您从源代码编译 NGINX，请确保在配置步骤中包含 `--with-stream` 选项。

如果您使用 Docker 镜像，可以使用包含 stream 模块的官方 NGINX 镜像。

例如，您可以使用以下 Dockerfile：

```dockerfile
FROM nginx:latest
RUN apt-get update && apt-get install -y nginx-extras
```

## 步骤 2：为 TCP 代理配置 NGINX

打开您的 NGINX 配置文件，通常位于 `/etc/nginx/nginx.conf` 或 `/etc/nginx/conf.d/default.conf`，并添加以下配置块。请注意，`stream` 块应该与 `http` 块处于同一级别（不在其内部）：

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

在这个例子中，我们配置 NGINX 监听端口 `3306`（MySQL 的默认端口）并将流量代理到运行在 `127.0.0.1:3306` 上的后端 MySQL 服务器。

您可以将 `127.0.0.1:3306` 替换为您实际 MySQL 服务器的地址和端口。

添加配置后，保存文件并测试 NGINX 配置是否有语法错误：

```bash
sudo nginx -t
```
如果配置测试成功，重新加载 NGINX 以应用更改：

```bash
sudo systemctl reload nginx
```

## 超时和负载均衡配置

您还可以为 TCP 代理配置超时和负载均衡。例如，要设置 30 秒的超时并启用两个后端服务器的负载均衡，您可以按如下方式修改配置：

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

        # 为 TCP 代理配置访问日志
        access_log /var/log/nginx/tcp-access.log;
    }
}
```

> **重要提示**：`stream` 块应该放在 `http` 块之外，并与 `http` 块处于同一级别。将其放在 `http` 块内会导致配置错误。

此配置设置了 30 秒的连接超时，15 秒的代理超时（如果没有活动，连接将在此时间后关闭），并且在第一个服务器失败时，允许以 1 秒的超时尝试连接到下一个上游服务器两次。

对于负载均衡，您可以在 `upstream` 块中添加多个后端服务器：

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
        server 127.0.0.1:3307;  # MySQL 副本
    }
    server {
        listen 3306;
        proxy_pass backend;
    }
}
```

此配置将传入连接分配给 `upstream` 块中的两个 MySQL 服务器。

您可以参考 [Nginx 配置与 Node.js 反向代理](//zh-hans/nginx/nginx-reverse-proxy-nodejs.html) 获取有关负载均衡的更多详细信息。

## 代理协议

如果您需要将原始客户端 IP 地址传递给后端服务器，可以启用代理协议。这对于需要知道原始客户端 IP 地址的应用程序很有用。

要启用代理协议，您可以按如下方式修改 `server` 块：

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

此配置为 TCP 代理启用了代理协议，允许后端服务器接收原始客户端 IP 地址。

这里发生的是 NGINX 将代理协议头添加到 TCP 连接的前面，其中包含原始客户端 IP 地址和端口。以下是代理协议头的示例：

```
PROXY TCP4 192.168.1.100 192.168.1.200 56324 3306
```

此头部表示连接使用 TCP over IPv4，原始客户端 IP 地址为 `192.168.1.100`，原始客户端端口为 `56324`。（后端服务器 IP 地址为 `192.168.1.200`，后端服务器端口为 `3306`。）

后端服务器必须配置为理解和解析此头部。MySQL 本身不原生支持代理协议，但您可以使用支持它的代理，如 ProxySQL 或 HAProxy 等工具。

对于大多数后端服务，您需要查看它们的文档以了解如何启用代理协议支持。一些支持代理协议的常见服务包括：

- HAProxy
- Traefik
- Redis（使用正确的配置）
- PostgreSQL（使用某些扩展）
- MySQL/MariaDB 的一些自定义构建

在启用代理协议后，请确保测试配置，以确保后端服务器接收到正确的客户端 IP 地址。

## TCP 代理的 SSL/TLS 支持

NGINX 还可以使用 SSL/TLS 代理加密的 TCP 连接。当您需要保护客户端和代理服务器之间的连接时，这很有用。以下是如何为 TCP 代理配置 SSL/TLS：

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

此配置创建了一个启用 SSL/TLS 的代理，它监听端口 3307 并将解密的流量转发到运行在端口 3306 上的后端 MySQL 服务器。客户端使用 SSL/TLS 连接到代理，而代理和后端服务器之间的连接可能是未加密的（通常用于本地连接）或加密的，取决于您的需求。

> 注意：如果后端服务器支持 SSL/TLS 终止，您也可以选择让后端服务器处理 SSL/TLS 终止，在这种情况下，您不需要在 NGINX 代理中配置 SSL/TLS。

## 结论

在本指南中，我们介绍了如何使用 NGINX 设置 TCP 代理，包括负载均衡和代理协议。通过遵循这些步骤，您可以有效地管理 TCP 流量并确保您的后端服务接收必要的客户端信息。
您可以使用 NGINX 作为强大的 TCP 代理服务器来处理各种协议和服务，为您的应用程序提供灵活性和可扩展性。

## 其他资源

- [NGINX 文档](https://nginx.org/en/docs/)
- [NGINX Stream 模块](https://nginx.org/zh-hans/en/docs/stream/ngx_stream_core_module.html)
- [NGINX 负载均衡](https://nginx.org/zh-hans/en/docs/http/load_balancing.html)
