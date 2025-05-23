# Linux 网络基础

<Validator lang="zh-hans" :platform-list="['Ubuntu 24.10']" date="2025-05-23" />

作为 Linux 系统管理员或开发人员，你经常需要处理网络配置。让我们探索一下你在日常工作中需要的基本概念和工具。

## 网络接口入门

当你首次查看 Linux 中的网络配置时，你会遇到网络接口。可以将这些接口视为计算机与网络之间的连接点 - 类似于交换机上的端口如何连接不同设备。你通常会看到类似 `eth0`（第一个以太网卡）、`wlan0`（无线连接）和 `lo`（系统用于自我通信的回环接口）这样命名的接口。

在处理网络接口时，你会经常使用命令。

## ip link 命令

`ip link show` 命令是检查系统上所有网络接口状态的首选工具。它不仅显示接口，还显示它们的操作状态和物理/MAC 地址。在以下情况下，你会发现它特别有用：

- 排查网络连接问题
- 设置新的网络接口
- 验证网卡是否被正确识别
- 检查接口是否处于 UP 或 DOWN 状态

```bash
ip link show
```

运行此命令时，你会看到类似这样的输出：

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
```

**这个输出是什么意思？** 让我们来分析一下：

需要注意的重要部分是接口名称（`lo` 和 `eth0`）及其状态（`UP` 或 `DOWN`）。如果你需要有关分配给这些接口的 IP 地址的更详细信息，可以使用：

### 检查 IP 地址

`ip addr show` 命令比 `ip link` 更全面，因为它同时显示接口及其分配的 IP 地址。当你需要以下操作时，此命令至关重要：

- 验证 IP 地址分配
- 检查重复的 IP 地址
- 调试 DHCP 相关问题
- 确认子网掩码配置

一旦你确定了接口，你可能想知道它们有什么 IP 地址。`ip addr show` 命令提供了这些信息：

```bash
ip addr show
```

运行此命令时，你会看到类似这样的内容：
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0
    inet6 fe80::215:5dff:fe01:ca05/64 scope link
```

让我们解读这个输出：
- `inet 127.0.0.1/8`：回环地址及其子网掩码
- `inet 192.168.1.100/24`：你的实际 IP 地址和子网
- `scope global`：表示此地址可用于与外部世界通信
- `dynamic`：表明此地址是由 DHCP 分配的

你也可以使用 `ifconfig` 获取类似信息，但它已被弃用，推荐使用 `ip`：

> 由于 `ifconfig` 已被弃用，在现代系统上可能默认没有安装。如果需要，你可以安装 `net-tools` 包。

```bash
ifconfig
```

运行此命令时，你会看到类似这样的输出：

```
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet

```

你还可以看到接口的 MAC 地址、IP 和其他详细信息。

## 管理网络连接

### 静态与动态 IP 配置

在设置服务器或工作站时，你面临的首要决策之一是使用静态还是动态 IP 寻址。

如果你正在设置服务器，你可能想要一个静态 IP。以下是如何做到这一点：

设置静态 IP 地址时，`ip addr add` 命令可以让你立即控制。语法遵循 `ip addr add IP_ADDRESS/SUBNET_MASK dev INTERFACE` 模式。例如：

```bash
sudo ip addr add 192.168.1.100/24 dev eth0
```

这个命令非常适合：
- 快速测试网络配置
- 紧急网络修复
- 故障排除期间的临时 IP 分配
- 向接口添加辅助 IP 地址

> 提示，要删除 IP 地址，使用：`sudo ip addr del IP_ADDRESS dev INTERFACE`，你可以使用 `ip --help` 查看所有可用选项。

但请记住，这种配置在重启后不会保留。对于现代 Ubuntu 或 Debian 系统上的永久设置，你需要编辑 netplan 配置，它通常位于 `/etc/netplan/01-netcfg.yaml` 或类似位置。以下是静态配置的示例：

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
```

或使用 dhcp：

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: true
```

编辑文件后，使用以下命令应用更改：

```bash
sudo netplan apply
```

## 基本网络故障排除工具

当出现问题时（这是不可避免的），你需要对这些诊断工具有扎实的了解：

### 网络连接测试

让我们从基础开始 - `ping` 命令。你可能认为它很简单，但它非常强大：

`ping` 命令看似基础，但实际上非常多功能。`-c` 标志限制发送的数据包数量，这对脚本编写和快速测试很有用：

```bash
ping -c 4 google.com  # 精确发送 4 个数据包后停止
```

运行 ping 命令时，你会看到类似这样的输出：
```
PING google.com (142.250.189.78) 56(84) bytes of data.
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=1 ttl=116 time=14.3 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=2 ttl=116 time=13.9 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=3 ttl=116 time=14.1 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=4 ttl=116 time=14.0 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 13.915/14.075/14.284/0.151 ms
```

这个输出告诉你：
- 远程 IP 地址 (142.250.189.78)
- 每个数据包的往返时间（例如，14.3 ms）
- 数据包丢失百分比（本例中为 0%）
- 关于时间变化的统计信息

使用 ping 可以：
- 基本连接测试
- 网络延迟测量
- DNS 解析验证
- 主机可用性监控

想知道为什么连接缓慢或失败？这就是 `traceroute` 的用处：

当你需要了解流量路径时，`traceroute` 变得非常有价值：

```bash
traceroute google.com
```

使用 traceroute 时，你可能会看到：
```
traceroute to google.com (142.250.189.78), 30 hops max, 60 byte packets
 1  _gateway (192.168.1.1)  0.344 ms  0.313 ms  0.307 ms
 2  isp-router.net (10.0.0.1)  12.132 ms  12.125 ms  12.119 ms
 3  core-router.isp.net (172.16.0.1)  13.225 ms  13.219 ms  13.213 ms
 4  google-peer.isp.net (192.0.2.1)  13.376 ms  13.370 ms  13.364 ms
 5  lhr25s35-in-f14.1e100.net (142.250.189.78)  14.090 ms  14.084 ms  14.078 ms
```

每行代表连接中的一个"跳点"：
- 开头的数字是跳点计数
- 每个路由器的主机名和 IP 地址
- 三个时间测量值显示到该跳点的延迟

这个工具帮助你：
- 识别网络瓶颈
- 排查路由问题
- 验证网络路径
- 检测网络拥塞点

### DNS 解析

当你需要检查域名是否正确解析时，`dig` 是你最好的朋友。它比 `nslookup` 更强大，并提供有关 DNS 查询的详细信息：

```bash
dig google.com
```

运行此命令时，你会看到类似这样的输出：
```
; <<>> DiG 9.16.1-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
;; QUESTION SECTION:
;google.com.			IN	A
;; ANSWER SECTION:
google.com.		299	IN		142.250.189.78
;; Query time: 14 msec
;; SERVER:  8.8.8.8#53
;; WHEN: Wed Oct 25 12:34:56 UTC 2023
;; MSG SIZE  rcvd: 55
```

这个输出提供：
- 用于查询的 DNS 服务器 (8.8.8.8)
- 获取响应所需的时间 (14 msec)
- 响应消息的大小 (55 bytes)

### 连接分析

对于更复杂的问题，你需要使用 `ss` 和 `netstat` 等工具深入研究：

`ss` 命令是 netstat 的现代替代品，提供详细的套接字统计信息：

```bash
ss -tuln  # 显示 TCP(-t) 和 UDP(-u) 监听(-l) 数字(-n) 端口
```

运行 ss 命令时：
```
Netid  State    Recv-Q  Send-Q   Local Address:Port    Peer Address:Port
tcp    LISTEN   0       128      0.0.0.0:22            0.0.0.0:*
tcp    LISTEN   0       128      0.0.0.0:80            0.0.0.0:*
tcp    ESTAB    0       0        192.168.1.100:22      192.168.1.10:52414
```

这个输出显示：
- `LISTEN`：等待连接的服务
- `ESTAB`：已建立的连接
- 本地和远程地址:端口对
- 传入/传出数据的队列长度

这个命令对以下方面至关重要：
- 安全审计
- 服务调试
- 端口冲突解决
- 连接状态分析

## 结论

Linux 网络中还有许多更多的主题和工具需要探索，如防火墙（iptables/nftables）、VPN、数据包过滤和网络性能调优。然而，掌握基础知识将为你提供坚实的基础，以便进一步发展。

请记住，掌握 Linux 网络是一个过程，而不是目的地。从基础开始，定期练习，并随着需求的增长逐渐探索更高级的主题。
