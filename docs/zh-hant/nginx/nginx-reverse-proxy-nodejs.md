# Nginx配置Node.js反向代理

我們經常使用 Node.js 的各種框架（如koa / egg / nest等）實現web後端，在正式上線時，雖然 Node.js 的確可以直接對外提供服務，但考慮到HTTPS、日誌、靜態文件服務、負載均衡等問題，我們往往會在前面再使用 nginx 作爲接入層，通過 nginx 來訪問 Node.js 服務。此時就需要配置 nginx 反向代理。

## 基本配置

爲了讓 nginx 配置更易管理，一般我們會將每個 web 服務單獨使用一個獨立的配置文件。這需要 nginx 主配置文件中包含各個獨立配置文件。

找到 nginx 主配置文件（一般位於`/etc/nginx.conf`），在`http{}`段中找到或者添加`include`配置：

```
http {
    # ...

    include /etc/nginx/conf.d/*.conf;
}
```

此時就可以爲 Node.js 站點設置獨立的配置文件，比如 `/etc/nginx/conf.d/tinkink.net.conf`，其中包含如下內容：

```
server {
    listen       80 ;
    server_name  tinkink.net;

    error_log    /var/log/nginx/tinkink_error.log;
    access_log    /var/log/nginx/tinkink_accss.log;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Node.js的本機地址，注意端口
        proxy_pass    http://localhost:3000;
    }
}
```

使用`nginx -t`測試配置文件，如果無誤，則使用`nginx -s reload`重新載入配置。在做好域名解析後，就可以通過`server_name`中的域名訪問到 Node.js 服務了。

## 配置HTTPS

如果需要配置 HTTPS 訪問，則需要再監聽 443 端口，並配置好證書：

```
server {
    listen       80 ;
    listen      443 ssl;
    server_name  tinkink.net;

    https_certificate /etc/nginx/ssl/tinkink.net.crt;
    https_certificate_key /etc/nginx/ssl/tinkink.net.key;

    # ...
}
```

## 配置負載均衡

如果 Node.js 服務與 nginx 不在同一機器，則只需要將`proxy_pass`的地址改爲 Node.js 服務器的局域網地址即可。但如果有多臺 Node.js 服務器，則需要配置負載均衡。

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
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Node.js的本機地址，注意端口
        proxy_pass    http://nodejs;
    }
}
```

上面的`upstream`定義了一個名爲`nodejs`的負載均衡組，其中包含了多個 Node.js 服務器的地址。在`proxy_pass`中只需要指定負載均衡組名即可。

`upstream`除了可以指定多個服務器地址，還可以指定權重或者負載均衡算法，比如：

```
upstream nodejs {
    server 192.168.0.2:3000 weight=1;
    server 192.168.0.2:3001 weight=2;
    server 192.168.0.3:3000 weight=1;
    server 192.168.0.3:3001 weight=2;
}
```

默認情況下，請求會按順序逐一分配到不同的 Node.js 服務，如果某一個服務掛了則會被剔除。上面這個配置則會讓兩臺服務器的`3001`端口接受更多的請求。

其它的策略：

- `ip_hash`：每個請求按訪問ip的hash結果分配，這樣在用戶 IP 不變的情況下，將固定訪問一個後端服務器
- `fair`：按後端服務器的響應時間來分配請求，響應時間短的優先分配
- `url_hash` 按訪問 url 的 hash 結果來分配請求，使每個 url 定向到同一個後端服務器

策略使用方法：

```
upstream nodejs {
    # 寫上策略名
    ip_hash
    server 192.168.0.2:3000;
    server 192.168.0.2:3001;
    server 192.168.0.3:3000;
    server 192.168.0.3:3001;
}
```

## 小結

總體上 nginx 配置 Node.js 反向代理比較簡單，重點是`proxy_pass`配置項，指定反向代理即可。該方法也適用於其它語言其它框架 HTTP 後端服務的反向代理。
