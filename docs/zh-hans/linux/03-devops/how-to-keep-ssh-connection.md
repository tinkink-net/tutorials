# 如何保持 ssh 连接不断开（Broken pipe）

在使用 ssh 的时候，经常会碰到连接断开的情况，有时候只是切出窗口做了一些其它的工作，回到终端窗口就会发现 ssh 连接已经断开。此时还不能直接进行操作，在几秒钟的等待之后，才会出现提示：

```sh
Write failed: Broken pipe
```

这种情况非常影响工作效率。

## 原因

ssh 使用的是长连接，当有数据通讯的时候，连接会一直保持不断开，但是在不修改配置的情况下，ssh 会在一段时间没有数据通讯后断开连接，从而导致上述现象的发生。

## 解决方案

既然是因为没有数据通讯导致的连接断开，那在空闲的时候能否让 ssh 也定时产生一些通讯呢？答案是肯定的。并且这个问题 ssh 的服务端和客户端都提供了解决方案，使用时只需要二选一即可（两者都设置也没有问题）。

### 服务端设置

服务端提供 ssh 服务的叫作 sshd ，因此它的配置文件是`/etc/ssh/sshd_config`，只需要修改这个文件即可：

```
ClientAliveInterval 60
ClientAliveCountMax 5
```

其中`ClientAliveInterval`表示每隔多长时间向客户端发送一次“心跳”，`ClientAliveCountMax`表示多少次未收到回复时断开连接。因此上述配置的含义是：每隔 60s 向客户端发送一个“心跳”，当 5 次没有收到回复时断开连接。

设置完成后重启 sshd 服务即可：`systemctl restart sshd.service`或者`service sshd restart`。

### 客户端设置

客户端的配置位于`/etc/ssh/ssh_config`，这是一个全局配置文件。如果只为当前用户设置，也可以修改`~/.ssh/ssh_config`：

```
TCPKeepAlive yes
ServerAliveInterval 60
ServerAliveCountMax 5
```

参数含义与服务端设置的含义几乎一样。

### 客户端临时方案

除了修改配置之外，客户端在发起连接时也可以使用参数来指定定时发送“心跳”：

```sh
ssh -o ServerAliveInterval=60 root@xx.xx.xx.xx
```

## 小结

只要设置好“心跳”，就再也不怕 ssh 无故断开影响工作效率了。
