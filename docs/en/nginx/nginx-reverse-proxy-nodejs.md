# Nginx configuration with Node.js reverse proxy

We often use various frameworks for Node.js (such as koa / egg / nest, etc.) to implement web backends. When we go live formally, although Node.js can indeed provide services directly to the outside world, we often use nginx as an access layer again in front, taking into account HTTPS, logging, static file services, load balancing, etc., and use nginx to access Node.js services. In this case, you need to configure the nginx reverse proxy.

## Basic configuration

To make the nginx configuration more manageable, we typically use a separate configuration file for each web service. This requires the nginx master configuration file to contain each individual configuration file.

Find the main nginx configuration file (usually located at `/etc/nginx.conf`), and in the `http{}` section, find or add the `include` configuration.

```
http {
    # ...

    include /etc/nginx/conf.d/*.conf;
}
```

At this point it is possible to set up a separate configuration file for the Node.js site, such as `/etc/nginx/conf.d/tinkink.net.conf`, which contains the following.

```
server {
    listen 80;
    server_name tinkinkink.net;

    error_log /var/log/nginx/tinkinkink_error.log;
    access_log /var/log/nginx/tinkink_accss.log;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Native address of Node.js, note the port
        proxy_pass http://localhost:3000;
    }
}
```

Use `nginx -t` to test the configuration file, and if it is correct, use `nginx -s reload` to reload the configuration. After the domain resolution is done, you can access the Node.js service via the domain name in `server_name`.

## Configuring HTTPS

If you need to configure HTTPS access, then you need to listen on port 443 again and configure the certificate.

```
server {
    listen 80 ;
    listen 443 ssl;
    server_name tinkinkink.net;

    https_certificate /etc/nginx/ssl/tinkink.net.crt;
    https_certificate_key /etc/nginx/ssl/tinkink.net.key;

    # ...
}
```

## Configuring load balancing

If the Node.js service is not on the same machine as nginx, you just need to change the address of `proxy_pass` to the LAN address of the Node.js server. However, if there are multiple Node.js servers, you will need to configure load balancing.

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
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        # Native address of Node.js, note the port
        proxy_pass http://nodejs;
    }
}
```

The `upstream` above defines a load balancing group named `nodejs` that contains the addresses of multiple Node.js servers. In `proxy_pass` you only need to specify the load balancing group name.

In addition to specifying multiple server addresses, `upstream` can also specify weights or load balancing algorithms, such as

```
upstream nodejs {
    server 192.168.0.2:3000 weight=1;
    server 192.168.0.2:3001 weight=2;
    server 192.168.0.3:3000 weight=1;
    server 192.168.0.3:3001 weight=2;
}
```

By default, requests are assigned to different Node.js services one by one in order, and are dropped if one of them hangs. This configuration above will instead allow both servers to accept more requests on port `3001`.

Other policies.

- `ip_hash`: each request is assigned by the hash result of the accessed ip, so that if the user's IP remains the same, it will have a fixed access to one backend server
- `fair`: allocate requests according to the response time of the backend server, with priority given to those with short response time
- `url_hash`: allocate requests according to the hash result of the accessed url, so that each url is directed to the same back-end server

Policy Usage.

```
upstream nodejs {
    # Write the policy name
    ip_hash
    server 192.168.0.2:3000;
    server 192.168.0.2:3001;
    server 192.168.0.3:3000;
    server 192.168.0.3:3001;
}
```

## Summary

In general, configuring Node.js reverse proxy with nginx is relatively simple, focusing on the `proxy_pass` configuration item, which specifies the reverse proxy. This method is also applicable to reverse proxying HTTP backend services in other languages and frameworks.
