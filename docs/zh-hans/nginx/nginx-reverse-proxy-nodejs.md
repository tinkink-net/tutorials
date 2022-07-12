# Nginx配置Node.js反向代理

我们经常使用 Node.js 的各种框架（如koa / egg / nest等）实现web后端，在正式上线时，虽然 Node.js 的确可以直接对外提供服务，但考虑到HTTPS、日志、静态文件服务、负载均衡等问题，我们往往会在前面再使用 nginx 作为接入层，通过 nginx 来访问 Node.js 服务。此时就需要配置 nginx 反向代理。

## 基本配置

为了让 nginx 配置更易管理，一般我们会将每个 web 服务单独使用一个独立的配置文件。这需要 nginx 主配置文件中包含各个独立配置文件。

找到 nginx 主配置文件（一般位于`/etc/nginx.conf`），在`http{}`段中找到或者添加`include`配置：

```
http {
    # ...

    include /etc/nginx/conf.d/*.conf;
}
```

此时就可以为 Node.js 站点设置独立的配置文件，比如 `/etc/nginx/conf.d/maiyatang.co.conf`，其中包含如下内容：

```
server {
    listen       80 ;
    server_name  maiyatang.co;

    error_log    /var/log/nginx/maiayatang_error.log;
    access_log    /var/log/nginx/maiayatang_accss.log;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Node.js的本机地址，注意端口
        proxy_pass    http://localhost:3000;
    }
}
```

使用`nginx -t`测试配置文件，如果无误，则使用`nginx -s reload`重新载入配置。在做好域名解析后，就可以通过`server_name`中的域名访问到 Node.js 服务了。

## 配置HTTPS

如果需要配置 HTTPS 访问，则需要再监听 443 端口，并配置好证书：

```
server {
    listen       80 ;
    listen      443 ssl;
    server_name  maiyatang.co;

    https_certificate /etc/nginx/ssl/maiyatang.co.crt;
    https_certificate_key /etc/nginx/ssl/maiyatang.co.key;

    # ...
}
```

## 配置负载均衡

如果 Node.js 服务与 nginx 不在同一机器，则只需要将`proxy_pass`的地址改为 Node.js 服务器的局域网地址即可。但如果有多台 Node.js 服务器，则需要配置负载均衡。

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
        # Node.js的本机地址，注意端口
        proxy_pass    http://nodejs;
    }
}
```

上面的`upstream`定义了一个名为`nodejs`的负载均衡组，其中包含了多个 Node.js 服务器的地址。在`proxy_pass`中只需要指定负载均衡组名即可。

`upstream`除了可以指定多个服务器地址，还可以指定权重或者负载均衡算法，比如：

```
upstream nodejs {
    server 192.168.0.2:3000 weight=1;
    server 192.168.0.2:3001 weight=2;
    server 192.168.0.3:3000 weight=1;
    server 192.168.0.3:3001 weight=2;
}
```

默认情况下，请求会按顺序逐一分配到不同的 Node.js 服务，如果某一个服务挂了则会被剔除。上面这个配置则会让两台服务器的`3001`端口接受更多的请求。

其它的策略：

- `ip_hash`：每个请求按访问ip的hash结果分配，这样在用户 IP 不变的情况下，将固定访问一个后端服务器
- `fair`：按后端服务器的响应时间来分配请求，响应时间短的优先分配
- `url_hash` 按访问 url 的 hash 结果来分配请求，使每个 url 定向到同一个后端服务器

策略使用方法：

```
upstream nodejs {
    # 写上策略名
    ip_hash
    server 192.168.0.2:3000;
    server 192.168.0.2:3001;
    server 192.168.0.3:3000;
    server 192.168.0.3:3001;
}
```

## 小结

总体上 nginx 配置 Node.js 反向代理比较简单，重点是`proxy_pass`配置项，指定反向代理即可。该方法也适用于其它语言其它框架 HTTP 后端服务的反向代理。
