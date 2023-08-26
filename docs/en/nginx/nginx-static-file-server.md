# How to Use Nginx to Host a Static File Server

Nginx is a web server that can be used to host static files. This tutorial describes how to use Nginx to host a static file server.

After completing this tutorial, you will be able to:

- Browse directories
- Navigate to subdirectories and files
- Download files through the browser

## Configure Nginx

First, you need to have Nginx installed. If you have not installed Nginx, you can refer to other tutorials.

After installing Nginx, you can configure it to host a static file server. Check `/etc/nginx/nginx.conf` to see if the configuration file is divided into multiple files. You can use the following command to open it:

```
vi /etc/nginx/nginx.conf
```

If you can see `include /etc/nginx/conf.d/*.conf;` in the `http` section, it means that the configuration file is divided into multiple files.

You can use the following command to create a new configuration file:

```
vi /etc/nginx/conf.d/static-file-server.conf
```

> Note: You may need to use `sudo` to run the above command. `sudo vi /etc/nginx/conf.d/static-file-server.conf`

Then, add the following configuration to the file:

```
server {
    listen       80;
    server_name  static-file-server.tinkink.net; # Change to your domain name

    root /path/to/your/static/files; # Change to your static file directory

    autoindex on; # Enable directory listing

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Here, `listen` specifies the listening port, `server_name` specifies the domain name or IP address, `root` specifies the static file directory, and `autoindex` enables directory listing.

`location /` matches the root path, `try_files` specifies the files to try, and returns a 404 error if the file is not found.

## Restart Nginx

After configuring Nginx, you need to restart it to make the configuration take effect:

```
sudo systemctl restart nginx
```

or

```
sudo service nginx restart
```

## Access the Site

Now you can access the site through the browser, for example: `http://static-file-server.tinkink.net`

## Permissions

Ensure that the directory permissions are set correctly to prevent security issues. Since nginx may use a unique user `nginx` to run. You should set the owner and group of the directory to this user group. You can use the following command to set the permissions:

```
chown -R nginx:nginx /path/to/your/static/files
```

Additionally, if the static file directory is located in the user's home directory, you also need to ensure that the home directory and static file directory have the correct access permissions. It's a little complicated, so I will recommend that you move the static file directory out of the home directory.

If you consistently use home directories, you will need add the `nginx` user to your user group. You can use the following command:

```
usermod -a -G {username} nginx
```

Then, you need to add permissions to the group. You can use the following command:

```
chmod g+rwx /home/{username}
```

> Note: Replace `{username}` with your username.

If it still doesn't work, you can try to turn off SELinux. You can use the following command:

```
sudo setenforce 0
```

If now it works, you can permanently disable SELinux. Open the `/etc/selinux/config` file and change the `SELINUX=enforcing` to `SELINUX=disabled`, then save and restart the system.

## Conclusion

Setting up a static file server with Nginx is easy, but if you want to put the files in home directory, it may be a little complicated.
