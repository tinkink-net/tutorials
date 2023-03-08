# Nginx 配置 HTTPS

## 背景知識

HTTPS 是加密的 HTTP 連接，它使用加密的傳輸層協議，以保護數據的安全性。具體到加密過程，HTTPS 可以分爲兩個階段：

1. 握手協商過程使用非對稱加密算法，生成密鑰
2. 傳輸過程使用對稱加密算法，加密數據

在握手協商使用非對稱算法的過程中，服務端需要出具經權威CA簽名後的公鑰，也叫證書。與此對應的，服務端還有一個私鑰。

因此要使用 HTTPS，服務端需要提供一個證書，一般後綴爲`.cer`或者`.crt`，以及與之對應的一個私鑰，一般後續爲`.key`。

HTTPS 證書的獲取，可使用各種證書服務商的服務完成，既有收費的，也有免費的，有純手工的也有可以使用自動化腳本完成的，可參考其它資料。

## 基本配置

nginx 配置 HTTPS 時，如果沒有額外的要求，還是非常簡單的，只需要配置：

1. 以 SSL 協議監聽 443 端口
2. 使用 `server_name` 指定域名，域名需要與證書的域名一致
3. 使用 `ssl_certificate` 指定證書路徑
4. 使用 `ssl_certificate_key` 指定私鑰路徑

```
server {
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;
}
```

這樣就可以支持 HTTPS 訪問了。

## HTTP 重定向

如果用戶使用 HTTP 協議訪問的話，上述配置是不起作用的。爲了讓 HTTP 協議也能訪問到，還需要增加一個重定向配置。在具體配置上有兩種思路：

第一種，單獨設置一個`server`，用於支持 HTTP 協議訪問：

```
server {
    listen 80;
    server_name www.xxx.com;
    return 301 https://$host$request_uri;
}
```

第二種，在同一個`server`中，使用 `rewrite` 重定向：

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

## 常見問題

### 證書是有效的/剛申請的，但是提示不安全

一般瀏覽器提示不安全可能有幾方面原因：

1. 證書籤發機構的根證書/中級證書不受信任
2. 證書的安全機制過時，瀏覽器/操作系統不再認爲它是安全的
3. 證書鏈不全

如果是從有效的機構申請的證書，一般不會出現 1 和 2 的問題，最大的可能性就是證書鏈不完整。

一般來說一個安全的證書除了證書自身之外，還會有與之關聯的中級證書和根證書。大部分的操作系統/瀏覽器會內置常見的根證書，但中級證書不一定都有內置。當操作系統/瀏覽器無法找到中級證書時，就有可能提示不安全。

此時需要將我們的證書與中級證書合併到一起，然後使用合併之後的證書配置服務器。

具體的操作方法：

- 如果申請的證書有合併後的證書（例如`fullchain.crt`之類的文件），則可以直接使用
- 如果申請的證書沒有合併後的證書，則需要將申請的證書與中級證書合併，使用任意文本編輯器打開兩個文件，然後將兩個證書文件的內容粘貼到一起，服務器證書在前，中級證書在後，然後保存爲新文件即可
