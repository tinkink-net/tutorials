# 如何將 NGINX 配置為 TCP 代理

您可能已經知道 NGINX 是一個強大的 Web 伺服器和反向代理伺服器，我們使用它來處理 HTTP 請求，包括靜態檔案、動態內容和對後端服務的反向代理。它還可以代理 WebSocket 連接。

> 如果您不熟悉 NGINX 代理，請參考 [Nginx 配置與 Node.js 反向代理](///zh-hant/nginx/nginx-reverse-proxy-nodejs.html)。

然而，NGINX 也可以用作 TCP 代理伺服器，這對於代理非 HTTP 協議如 MySQL、Redis 和其他基於 TCP 的服務非常有用。本文將指導您完成將 NGINX 配置為 TCP 代理的過程。

## 前提條件

在開始之前，請確保您具備以下前提條件：

- 安裝了 NGINX 的伺服器。您可以使用包管理器安裝 NGINX 或從[官方網站](https://nginx./zh-hant/zh-hans/en/download.html)下載。
- 對 NGINX 配置檔案及如何編輯它們的基本了解。
- 訪問 NGINX 配置檔案的權限，通常位於 `/etc/nginx/nginx.conf` 或 `/etc/nginx/conf.d/default.conf`。
- 您想要代理的 TCP 服務（例如 MySQL、Redis）應該在伺服器上運行並可訪問。

## 步驟 1：安裝帶有 TCP 模組的 NGINX

確保您的 NGINX 安裝包含 `ngx_stream_core_module`，這是 TCP 代理所必需的。您可以通過運行以下命令檢查是否包含此模組：

```bash
nginx -V 2>&1 | grep --color=auto stream
```

如果輸出包含 `--with-stream`，則您的 NGINX 安裝支持 TCP 代理。如果沒有，您可能需要安裝包含此模組的 NGINX 版本。
如果您使用包管理器，可以通過運行以下命令安裝帶有 stream 模組的 NGINX：

```bash
# 對於 Debian/Ubuntu
sudo apt-get install nginx-extras
```

或

```bash
# 對於 CentOS/RHEL
sudo yum install nginx-mod-stream
```

如果您從源代碼編譯 NGINX，請確保在配置步驟中包含 `--with-stream` 選項。

如果您使用 Docker 映像，可以使用包含 stream 模組的官方 NGINX 映像。

例如，您可以使用以下 Dockerfile：

```dockerfile
FROM nginx:latest
RUN apt-get update && apt-get install -y nginx-extras
```

## 步驟 2：為 TCP 代理配置 NGINX

打開您的 NGINX 配置檔案，通常位於 `/etc/nginx/nginx.conf` 或 `/etc/nginx/conf.d/default.conf`，並添加以下配置塊。請注意，`stream` 塊應該與 `http` 塊處於同一級別（不在其內部）：

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

在這個例子中，我們配置 NGINX 監聽端口 `3306`（MySQL 的默認端口）並將流量代理到運行在 `127.0.0.1:3306` 上的後端 MySQL 伺服器。

您可以將 `127.0.0.1:3306` 替換為您實際 MySQL 伺服器的地址和端口。

添加配置後，保存檔案並測試 NGINX 配置是否有語法錯誤：

```bash
sudo nginx -t
```

如果配置測試成功，重新加載 NGINX 以應用更改：

```bash
sudo systemctl reload nginx
```

## 超時和負載均衡配置

您還可以為 TCP 代理配置超時和負載均衡。例如，要設置 30 秒的超時並啟用兩個後端伺服器的負載均衡，您可以按如下方式修改配置：

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

        # 為 TCP 代理配置訪問日誌
        access_log /var/log/nginx/tcp-access.log;
    }
}
```

> **重要提示**：`stream` 塊應該放在 `http` 塊之外，並與 `http` 塊處於同一級別。將其放在 `http` 塊內會導致配置錯誤。

此配置設置了 30 秒的連接超時，15 秒的代理超時（如果沒有活動，連接將在此時間後關閉），並且在第一個伺服器失敗時，允許以 1 秒的超時嘗試連接到下一個上游伺服器兩次。

對於負載均衡，您可以在 `upstream` 塊中添加多個後端伺服器：

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

此配置將傳入連接分配給 `upstream` 塊中的兩個 MySQL 伺服器。

您可以參考 [Nginx 配置與 Node.js 反向代理](///zh-hant/nginx/nginx-reverse-proxy-nodejs.html) 獲取有關負載均衡的更多詳細信息。

## 代理協議

如果您需要將原始客戶端 IP 地址傳遞給後端伺服器，可以啟用代理協議。這對於需要知道原始客戶端 IP 地址的應用程序很有用。

要啟用代理協議，您可以按如下方式修改 `server` 塊：

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

此配置為 TCP 代理啟用了代理協議，允許後端伺服器接收原始客戶端 IP 地址。

這裡發生的是 NGINX 將代理協議頭添加到 TCP 連接的前面，其中包含原始客戶端 IP 地址和端口。以下是代理協議頭的示例：

```
PROXY TCP4 192.168.1.100 192.168.1.200 56324 3306
```

此頭部表示連接使用 TCP over IPv4，原始客戶端 IP 地址為 `192.168.1.100`，原始客戶端端口為 `56324`。（後端伺服器 IP 地址為 `192.168.1.200`，後端伺服器端口為 `3306`。）

後端伺服器必須配置為理解和解析此頭部。MySQL 本身不原生支持代理協議，但您可以使用支持它的代理，如 ProxySQL 或 HAProxy 等工具。

對於大多數後端服務，您需要查看它們的文檔以了解如何啟用代理協議支持。一些支持代理協議的常見服務包括：

- HAProxy
- Traefik
- Redis（使用正確的配置）
- PostgreSQL（使用某些擴展）
- MySQL/MariaDB 的一些自定義構建

在啟用代理協議後，請確保測試配置，以確保後端伺服器接收到正確的客戶端 IP 地址。

## TCP 代理的 SSL/TLS 支持

NGINX 還可以使用 SSL/TLS 代理加密的 TCP 連接。當您需要保護客戶端和代理伺服器之間的連接時，這很有用。以下是如何為 TCP 代理配置 SSL/TLS：

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

此配置創建了一個啟用 SSL/TLS 的代理，它監聽端口 3307 並將解密的流量轉發到運行在端口 3306 上的後端 MySQL 伺服器。客戶端使用 SSL/TLS 連接到代理，而代理和後端伺服器之間的連接可能是未加密的（通常用於本地連接）或加密的，取決於您的需求。

> 注意：如果後端伺服器支持 SSL/TLS 終止，您也可以選擇讓後端伺服器處理 SSL/TLS 終止，在這種情況下，您不需要在 NGINX 代理中配置 SSL/TLS。

## 結論

在本指南中，我們介紹了如何使用 NGINX 設置 TCP 代理，包括負載均衡和代理協議。通過遵循這些步驟，您可以有效地管理 TCP 流量並確保您的後端服務接收必要的客戶端信息。
您可以使用 NGINX 作為強大的 TCP 代理伺服器來處理各種協議和服務，為您的應用程序提供靈活性和可擴展性。

## 其他資源

- [NGINX 文檔](https://nginx.org/en/docs/)
- [NGINX Stream 模組](https://nginx./zh-hant/zh-hans/en/docs/stream/ngx_stream_core_module.html)
- [NGINX 負載均衡](https://nginx./zh-hant/zh-hans/en/docs/http/load_balancing.html)
