# How to Configure NGINX as a TCP Proxy

You may have known that NGINX is a powerful web server and reverse proxy server, we use it to serve HTTP requests, including static files, dynamic content, and reverse proxying to backend services. It can also proxy WebSocket connections.

> In case you are not familiar with NGINX proxy, please refer to [Nginx configuration with Node.js reverse proxy](/en/nginx/nginx-reverse-proxy-nodejs.html).

However, NGINX can also be used as a TCP proxy server, which is useful for proxying non-HTTP protocols such as MySQL, Redis, and other TCP-based services. This article will guide you through the process of configuring NGINX as a TCP proxy.

## Prerequisites

Before we start, make sure you have the following prerequisites:

- A server with NGINX installed. You can install NGINX using your package manager or download it from the [official website](https://nginx.org/en/download.html).
- Basic knowledge of NGINX configuration files and how to edit them.
- Access to the NGINX configuration file, usually located at `/etc/nginx/nginx.conf` or `/etc/nginx/conf.d/default.conf`.
- The TCP service you want to proxy (e.g., MySQL, Redis) should be running and accessible on the server.

## Step 1: Install NGINX with TCP Module

Ensure that your NGINX installation includes the `ngx_stream_core_module`, which is required for TCP proxying. You can check if this module is included by running:

```bash
nginx -V 2>&1 | grep --color=auto stream
```

If the output includes `--with-stream`, then your NGINX installation supports TCP proxying. If not, you may need to install a version of NGINX that includes this module.
If you are using a package manager, you can install NGINX with the stream module by running:

```bash
# For Debian/Ubuntu
sudo apt-get install nginx-extras
```

or

```bash
# For CentOS/RHEL
sudo yum install nginx-mod-stream
```

If you are compiling NGINX from source, make sure to include the `--with-stream` option during the configuration step.

If you are using a Docker image, you can use the official NGINX image with the stream module included.

For example, you can use the following Dockerfile:

```dockerfile
FROM nginx:latest
RUN apt-get update && apt-get install -y nginx-extras
```

## Step 2: Configure NGINX for TCP Proxying

Open your NGINX configuration file, usually located at `/etc/nginx/nginx.conf` or `/etc/nginx/conf.d/default.conf`, and add the following configuration block. Note that the `stream` block should be at the same level as the `http` block (not inside it):

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

In this example, we are configuring NGINX to listen on port `3306` (the default MySQL port) and proxy the traffic to a backend MySQL server running on `127.0.0.1:3306`.

You can replace `127.0.0.1:3306` with the address and port of your actual MySQL server.

After adding the configuration, save the file and test the NGINX configuration for syntax errors:

```bash
sudo nginx -t
```

If the configuration test is successful, reload NGINX to apply the changes:

```bash
sudo systemctl reload nginx
```

## Timeout and Balancing Configuration

You can also configure timeouts and load balancing for your TCP proxy. For example, to set a timeout of 30 seconds and enable load balancing with two backend servers, you can modify the configuration as follows:

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

        # Configure access logging for TCP proxy
        access_log /var/log/nginx/tcp-access.log;
    }
}
```

> **Important**: The `stream` block should be placed outside of the `http` block and at the same level as the `http` block in your NGINX configuration. Placing it inside the `http` block will result in configuration errors.

This configuration sets a connection timeout of 30 seconds, a proxy timeout of 15 seconds (this is the time after which a connection will be closed if there's no activity), and allows for two retries with a 1-second timeout when trying to connect to the next upstream server if the first one fails.

For load balancing, you can add multiple backend servers in the `upstream` block:

```nginx
stream {
    upstream backend {
        server 127.0.0.1:3306;  # MySQL
        server 127.0.0.1:3307;  # MySQL replica
    }
    server {
        listen 3306;
        proxy_pass backend;
    }
}
```

This configuration will distribute incoming connections to both MySQL servers in the `upstream` block.

You can refer to [Nginx configuration with Node.js reverse proxy](/en/nginx/nginx-reverse-proxy-nodejs.html) for more details on balancing.

## The Proxy Protocol

If you need to pass the original client IP address to the backend server, you can enable the Proxy Protocol. This is useful for applications that need to know the original client's IP address.

To enable the Proxy Protocol, you can modify the `server` block as follows:

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

This configuration enables the Proxy Protocol for the TCP proxy, allowing the backend server to receive the original client IP address.

What's going on here is that NGINX will prepend the Proxy Protocol header to the TCP connection, which contains the original client IP address and port. Here is an example of what the Proxy Protocol header looks like:

```
PROXY TCP4 192.168.1.100 192.168.1.200 56324 3306
```

This header indicates that the connection is using TCP over IPv4, with the original client IP address `192.168.1.100` and the original client port `56324`. (The backend server IP address is `192.168.1.200` and the backend server port is `3306`.)

The backend server must be configured to understand and parse this header. MySQL itself doesn't natively support the Proxy Protocol, but you can use proxies like ProxySQL or tools like HAProxy that do support it.

For most backend services, you will need to check their documentation to see how to enable Proxy Protocol support. Some common services that support Proxy Protocol include:

- HAProxy
- Traefik
- Redis (with the right configuration)
- PostgreSQL (with certain extensions)
- Some custom builds of MySQL/MariaDB

Make sure to test the configuration after enabling the Proxy Protocol to ensure that the backend server is receiving the correct client IP address.

## SSL/TLS Support for TCP Proxying

NGINX can also proxy encrypted TCP connections using SSL/TLS. This is useful when you need to secure the connection between clients and your proxy server. Here's how to configure SSL/TLS for your TCP proxy:

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

This configuration creates an SSL/TLS-enabled proxy that listens on port 3307 and forwards the decrypted traffic to the backend MySQL server running on port 3306. Clients connect to the proxy using SSL/TLS, while the connection between the proxy and backend server may be unencrypted (typically for local connections) or encrypted depending on your needs.

> Note: You can also choose to let the backend server handle SSL/TLS termination if it supports it, in which case you would not need to configure SSL/TLS in the NGINX proxy.

## Conclusion

In this guide, we covered how to set up a TCP proxy with NGINX, including load balancing and the Proxy Protocol. By following these steps, you can effectively manage TCP traffic and ensure that your backend services receive the necessary client information.
You can use NGINX as a powerful TCP proxy server to handle various protocols and services, providing flexibility and scalability for your applications.

## Additional Resources

- [NGINX Documentation](https://nginx.org/en/docs/)
- [NGINX Stream Module](https://nginx.org/en/docs/stream/ngx_stream_core_module.html)
- [NGINX Load Balancing](https://nginx.org/en/docs/http/load_balancing.html)
