# Nginx 配置 HTTPS

## 背景知识

HTTPS 是加密的 HTTP 连接，它使用加密的传输层协议，以保护数据的安全性。具体到加密过程，HTTPS 可以分为两个阶段：

1. 握手协商过程使用非对称加密算法，生成密钥
2. 传输过程使用对称加密算法，加密数据

在握手协商使用非对称算法的过程中，服务端需要出具经权威CA签名后的公钥，也叫证书。与此对应的，服务端还有一个私钥。

因此要使用 HTTPS，服务端需要提供一个证书，一般后缀为`.cer`或者`.crt`，以及与之对应的一个私钥，一般后续为`.key`。

HTTPS 证书的获取，可使用各种证书服务商的服务完成，既有收费的，也有免费的，有纯手工的也有可以使用自动化脚本完成的，可参考其它资料。

## 基本配置

nginx 配置 HTTPS 时，如果没有额外的要求，还是非常简单的，只需要配置：

1. 以 SSL 协议监听 443 端口
2. 使用 `server_name` 指定域名，域名需要与证书的域名一致
3. 使用 `ssl_certificate` 指定证书路径
4. 使用 `ssl_certificate_key` 指定私钥路径

```
server {
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;
}
```

这样就可以支持 HTTPS 访问了。

## HTTP 重定向

如果用户使用 HTTP 协议访问的话，上述配置是不起作用的。为了让 HTTP 协议也能访问到，还需要增加一个重定向配置。在具体配置上有两种思路：

第一种，单独设置一个`server`，用于支持 HTTP 协议访问：

```
server {
    listen 80;
    server_name www.xxx.com;
    return 301 https://$host$request_uri;
}
```

第二种，在同一个`server`中，使用 `rewrite` 重定向：

```
server {
    listen 80;
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;

    if ($scheme != "https") {
        rewrite ^ https://$host$request_uri permanent;
    }
}
```

## 常见问题

### 证书是有效的/刚申请的，但是提示不安全

一般浏览器提示不安全可能有几方面原因：

1. 证书签发机构的根证书/中级证书不受信任
2. 证书的安全机制过时，浏览器/操作系统不再认为它是安全的
3. 证书链不全

如果是从有效的机构申请的证书，一般不会出现 1 和 2 的问题，最大的可能性就是证书链不完整。

一般来说一个安全的证书除了证书自身之外，还会有与之关联的中级证书和根证书。大部分的操作系统/浏览器会内置常见的根证书，但中级证书不一定都有内置。当操作系统/浏览器无法找到中级证书时，就有可能提示不安全。

此时需要将我们的证书与中级证书合并到一起，然后使用合并之后的证书配置服务器。

具体的操作方法：

- 如果申请的证书有合并后的证书（例如`fullchain.crt`之类的文件），则可以直接使用
- 如果申请的证书没有合并后的证书，则需要将申请的证书与中级证书合并，使用任意文本编辑器打开两个文件，然后将两个证书文件的内容粘贴到一起，服务器证书在前，中级证书在后，然后保存为新文件即可
