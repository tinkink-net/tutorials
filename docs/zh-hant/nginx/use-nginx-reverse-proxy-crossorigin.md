# 如何使用 Nginx 反向代理解決跨域（CORS）問題

## 什麼是跨域？

跨域資源共享（CORS）是由網頁瀏覽器實現的一種安全功能，用於防止惡意網站向提供原始網頁的域名以外的域名發出請求。這對於保護用戶數據和防止未經授權訪問資源非常重要。

當網頁向不同域名發出請求時，瀏覽器會檢查該域名的伺服器是否允許跨域請求。如果不允許，瀏覽器會阻止該請求並引發 CORS 錯誤。

```
Access to XMLHttpRequest at 'http://example.com/api/data' from origin 'http://yourdomain.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 為什麼跨域問題很重要？

跨域問題很重要，因為它們可能會阻止合法請求被處理，導致網絡應用程序功能失效。

例如，如果您正在訪問一個網頁，然後該網頁向不同的域名發出 AJAX 請求，比如您的網上銀行服務或在線購物網站。如果沒有 CORS 的保護，惡意網頁可能會訪問您的銀行賬戶信息，如餘額、交易歷史和其他敏感數據，甚至可能代表您進行未經授權的交易。

## 如何使用 Nginx 反向代理解決跨域問題

首先，您應該確保您的需求是合理的。如上所述，跨域問題是瀏覽器實現的一種安全功能，用於保護用戶免受惡意網站的侵害。

使用 Nginx 反向代理解決跨域問題是一種常見做法。通過配置 Nginx 在響應中添加適當的 CORS 頭，您可以允許來自特定域名或所有域名的跨域請求。

以下是解決跨域問題的 Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://backend_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # Add CORS headers
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';

        # Handle preflight requests
        if ($request_method = OPTIONS) {
            add_header 'Access-Control-Max-Age' 86400;
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}
```

> 如果您對如何配置 Nginx 反向代理感興趣，請參考[這篇文章](/en/nginx/nginx-reverse-proxy-nodejs.html)。

在這個例子中，我們允許來自任何域名（`*`）的跨域請求。如果您想限制只允許特定域名訪問，可以將 `*` 替換為特定域名。

`Access-Control-Allow-Methods` 頭指定允許哪些 HTTP 方法進行跨域請求，而 `Access-Control-Allow-Headers` 頭指定請求中允許哪些頭。

`Access-Control-Max-Age` 頭指定瀏覽器可以緩存預檢請求結果的時間長度。

`if` 塊處理預檢請求，這是瀏覽器在進行跨域請求之前發送的，用於檢查伺服器是否允許該請求。如果請求方法是 `OPTIONS`，我們返回一個帶有適當 CORS 頭的 `204 No Content` 響應。

您可以根據需要調整配置。特別注意 `Access-Control-Allow-Headers`，如果您在請求中使用自定義頭，需要將它們添加到這個頭中。

## 結論

總之，跨域問題是瀏覽器實現的一項重要安全功能，用於保護用戶免受惡意網站的侵害。然而，它們也可能導致合法請求被阻止。通過使用 Nginx 反向代理在響應中添加適當的 CORS 頭，您可以允許來自特定域名或所有域名的跨域請求。

這是網絡開發中的常見做法，可以有效解決跨域問題。

請注意，允許來自所有域名的跨域請求可能會使您的應用程序面臨安全風險，因此重要的是仔細考慮此配置的影響，並盡可能限制只允許受信任的域名訪問。