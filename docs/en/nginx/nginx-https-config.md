# Nginx Configuring HTTPS

## Background Knowledge

HTTPS is an encrypted HTTP connection that uses an encrypted transport layer protocol to protect the security of data. Specifically for the encryption process, HTTPS can be divided into two phases.

1. the handshake negotiation process uses an asymmetric encryption algorithm to generate the key
2. the transport process uses a symmetric encryption algorithm to encrypt the data

In the process of handshake negotiation using asymmetric algorithm, the server needs to issue a public key signed by an authoritative CA, also called a certificate. Corresponding to this, the server side also has a private key.

So to use HTTPS, the server side needs to provide a certificate, generally with a suffix of `.cer` or `.crt`, and a private key corresponding to it, generally followed by `.key`.

The acquisition of HTTPS certificate can be done using various certificate service providers' services, both paid and free, both purely manual and can be done using automated scripts, please refer to other materials.

## Basic Configuration

When configuring HTTPS with nginx, it is very simple if you do not have additional requirements, you only need to configure.

1. listen on port 443 with the SSL protocol
2. use `server_name` to specify the domain name, which needs to match the domain name of the certificate
3. use `ssl_certificate` to specify the certificate path
4. use `ssl_certificate_key` to specify the private key path

```
server {
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;
}
```

This will support HTTPS access.

## HTTP Redirection

The above configuration does not work if the user is accessing using the HTTP protocol. In order to make the HTTP protocol accessible as well, a redirect configuration needs to be added. There are two ideas for the specific configuration.

The first is to set up a separate ``server`` to support HTTP access.

```
server {
    listen 80;
    server_name www.xxx.com;
    return 301 https://$host$request_uri;
}
```

Second, in the same `server`, use `rewrite` to redirect.

```
server {
    listen 80;
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;

    if ($scheme ! = "https") {
        rewrite ^ https://$host$request_uri permanent;
    }
}
```

## Common problems

### The certificate is valid, but the browser says it's not secure

There are several reasons why the browser may indicate insecurity.

1. the root certificate/intermediate certificate of the certificate issuing authority is not trusted
2. The security mechanism of the certificate is outdated and the browser/operating system no longer considers it to be secure
3. The certificate chain is incomplete

If the certificate is applied from a valid authority, usually the problems of 1 and 2 will not occur, and the biggest possibility is that the certificate chain is incomplete.

Generally speaking, a secure certificate will have an associated intermediate certificate and root certificate in addition to the certificate itself. Most operating systems/browsers have a common root certificate built in, but intermediate certificates may not always be built in. When the operating system/browser cannot find the intermediate certificate, it may indicate that it is not secure.

In this case, you need to merge our certificate with the intermediate certificate, and then use the merged certificate to configure the server.

Specific operation method.

- If the applied certificate has a merged certificate (such as `fullchain.crt` or other files), then you can use it directly
- If the applied certificate does not have a merged certificate, you need to merge the applied certificate with the intermediate certificate, open the two files with any text editor, and then paste the contents of the two certificate files together, with the server certificate in front and the intermediate certificate in the back, and then save it as a new file.
