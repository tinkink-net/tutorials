# 如何使用Nginx搭建静态文件服务器

Nginx是一个可以用来托管静态文件的Web服务器。本教程介绍如何使用Nginx搭建静态文件服务器。完成本教程后，您将能够：

- 浏览目录
- 导航到子目录和文件
- 通过浏览器下载文件

## 配置Nginx

首先，您需要安装Nginx。如果您还没有安装Nginx，可以参考其他教程进行安装。

安装完Nginx后，您可以配置它来托管一个静态文件服务器。检查`/etc/nginx/nginx.conf`文件，看看配置文件是否分成了多个文件。您可以使用以下命令打开它：

```
vi /etc/nginx/nginx.conf
```

如果在http部分中看到`include /etc/nginx/conf.d/*.conf;`，那么说明配置文件被分成了多个文件。

您可以使用以下命令创建一个新的配置文件：

```
vi /etc/nginx/conf.d/static-file-server.conf
```

> 注意：您可能需要使用sudo运行上述命令。`sudo vi /etc/nginx/conf.d/static-file-server.conf`

然后，将以下配置添加到文件中：

```
server {
    listen       80;
    server_name  static-file-server.tinkink.net; # 更改为您的域名
    root /path/to/your/static/files; # 更改为您的静态文件目录
    autoindex on; # 启用目录列表
    location / {
        try_files $uri $uri/ =404;
    }
}
```

在这里，`listen`指定监听端口，`server_name`指定域名或IP地址，`root`指定静态文件目录，`autoindex`启用目录列表。

`location /`匹配根路径，`try_files`指定要尝试的文件，并在找不到文件时返回404错误。

## 重启Nginx

配置完Nginx后，您需要重启它以使配置生效：

```
sudo systemctl restart nginx
```

或者

```
sudo service nginx restart
```

## 访问网站

现在，您可以通过浏览器访问该网站，例如：`http://static-file-server.tinkink.net`

## 权限

确保目录权限设置正确，以防止安全问题。由于Nginx可能使用唯一的用户`nginx`来运行，因此您应该将目录的所有者和组设置为该用户组。您可以使用以下命令设置权限：

```
chown -R nginx:nginx /path/to/your/static/files
```

此外，如果静态文件目录位于用户的主目录中，则还需要确保主目录和静态文件目录具有正确的访问权限。这有点复杂，因此我建议您将静态文件目录移到主目录之外。

如果您一直使用主目录，则需要将`nginx`用户添加到您的用户组中。您可以使用以下命令：

```
usermod -a -G {username} nginx
```

然后，您需要为组添加权限。您可以使用以下命令：

```
chmod g+rwx /home/{username}
```

> 注意：用您的用户名替换{username}。

如果仍然无法正常工作，您可以尝试关闭SELinux。您可以使用以下命令：

```
sudo setenforce 0
```

如果现在可以正常工作，则可以永久禁用SELinux。打开`/etc/selinux/config`文件，将`SELINUX=enforcing`更改为`SELINUX=disabled`，然后保存并重新启动系统。

## 结论

使用Nginx搭建静态文件服务器很容易，但如果您想将文件放在主目录中，可能会有点复杂。
