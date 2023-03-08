# 如何使用Nginx搭建靜態文件服務器

Nginx是一個可以用來託管靜態文件的Web服務器。本教程介紹如何使用Nginx搭建靜態文件服務器。完成本教程後，您將能夠：

- 瀏覽目錄
- 導航到子目錄和文件
- 通過瀏覽器下載文件

## 配置Nginx

首先，您需要安裝Nginx。如果您還沒有安裝Nginx，可以參考其他教程進行安裝。

安裝完Nginx後，您可以配置它來託管一個靜態文件服務器。檢查`/etc/nginx/nginx.conf`文件，看看配置文件是否分成了多個文件。您可以使用以下命令打開它：

```
vi /etc/nginx/nginx.conf
```

如果在http部分中看到`include /etc/nginx/conf.d/*.conf;`，那麼說明配置文件被分成了多個文件。

您可以使用以下命令創建一個新的配置文件：

```
vi /etc/nginx/conf.d/static-file-server.conf
```

> 注意：您可能需要使用sudo運行上述命令。`sudo vi /etc/nginx/conf.d/static-file-server.conf`

然後，將以下配置添加到文件中：

```
server {
    listen       80;
    server_name  static-file-server.tinkink.net; # 更改爲您的域名
    root /path/to/your/static/files; # 更改爲您的靜態文件目錄
    autoindex on; # 啓用目錄列表
    location / {
        try_files $uri $uri/ =404;
    }
}
```

在這裏，`listen`指定監聽端口，`server_name`指定域名或IP地址，`root`指定靜態文件目錄，`autoindex`啓用目錄列表。

`location /`匹配根路徑，`try_files`指定要嘗試的文件，並在找不到文件時返回404錯誤。

## 重啓Nginx

配置完Nginx後，您需要重啓它以使配置生效：

```
sudo systemctl restart nginx
```

或者

```
sudo service nginx restart
```

## 訪問網站

現在，您可以通過瀏覽器訪問該網站，例如：http://static-file-server.tinkink.net

## 權限

確保目錄權限設置正確，以防止安全問題。由於Nginx可能使用唯一的用戶`nginx`來運行，因此您應該將目錄的所有者和組設置爲該用戶組。您可以使用以下命令設置權限：

```
chown -R nginx:nginx /path/to/your/static/files
```

此外，如果靜態文件目錄位於用戶的主目錄中，則還需要確保主目錄和靜態文件目錄具有正確的訪問權限。這有點複雜，因此我建議您將靜態文件目錄移到主目錄之外。

如果您一直使用主目錄，則需要將`nginx`用戶添加到您的用戶組中。您可以使用以下命令：

```
usermod -a -G {username} nginx
```

然後，您需要爲組添加權限。您可以使用以下命令：

```
chmod g+rwx /home/{username}
```

> 注意：用您的用戶名替換{username}。

如果仍然無法正常工作，您可以嘗試關閉SELinux。您可以使用以下命令：

```
sudo setenforce 0
```

如果現在可以正常工作，則可以永久禁用SELinux。打開`/etc/selinux/config`文件，將`SELINUX=enforcing`更改爲`SELINUX=disabled`，然後保存並重新啓動系統。

## 結論

使用Nginx搭建靜態文件服務器很容易，但如果您想將文件放在主目錄中，可能會有點複雜。
