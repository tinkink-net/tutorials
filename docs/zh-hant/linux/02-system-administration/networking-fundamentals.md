# Linux 網路基礎

<Validator lang="zh-hant" :platform-list="['Ubuntu 24.10']" date="2025-05-23" />

作為 Linux 系統管理員或開發人員，你經常需要處理網路配置。讓我們探索一下你在日常工作中需要的基本概念和工具。

## 網路介面入門

當你首次查看 Linux 中的網路配置時，你會遇到網路介面。可以將這些介面視為電腦與網路之間的連接點 - 類似於交換機上的連接埠如何連接不同裝置。你通常會看到類似 `eth0`（第一個乙太網卡）、`wlan0`（無線連接）和 `lo`（系統用於自我通信的迴路介面）這樣命名的介面。

在處理網路介面時，你會經常使用命令。

## ip link 命令

`ip link show` 命令是檢查系統上所有網路介面狀態的首選工具。它不僅顯示介面，還顯示它們的操作狀態和實體/MAC 位址。在以下情況下，你會發現它特別有用：

- 排查網路連接問題
- 設置新的網路介面
- 驗證網卡是否被正確識別
- 檢查介面是否處於 UP 或 DOWN 狀態

```bash
ip link show
```

運行此命令時，你會看到類似這樣的輸出：

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
```

**這個輸出是什麼意思？** 讓我們來分析一下：

需要注意的重要部分是介面名稱（`lo` 和 `eth0`）及其狀態（`UP` 或 `DOWN`）。如果你需要有關分配給這些介面的 IP 位址的更詳細資訊，可以使用：

### 檢查 IP 位址

`ip addr show` 命令比 `ip link` 更全面，因為它同時顯示介面及其分配的 IP 位址。當你需要以下操作時，此命令至關重要：

- 驗證 IP 位址分配
- 檢查重複的 IP 位址
- 除錯 DHCP 相關問題
- 確認子網路遮罩配置

一旦你確定了介面，你可能想知道它們有什麼 IP 位址。`ip addr show` 命令提供了這些資訊：

```bash
ip addr show
```

運行此命令時，你會看到類似這樣的內容：
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

讓我們解讀這個輸出：
- `inet 127.0.0.1/8`：迴路位址及其子網路遮罩
- `inet 192.168.1.100/24`：你的實際 IP 位址和子網路
- `scope global`：表示此位址可用於與外部世界通信
- `dynamic`：表明此位址是由 DHCP 分配的

你也可以使用 `ifconfig` 獲取類似資訊，但它已被棄用，推薦使用 `ip`：

> 由於 `ifconfig` 已被棄用，在現代系統上可能預設沒有安裝。如果需要，你可以安裝 `net-tools` 套件。

```bash
ifconfig
```

運行此命令時，你會看到類似這樣的輸出：

```
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet

```

你還可以看到介面的 MAC 位址、IP 和其他詳細資訊。

## 管理網路連接

### 靜態與動態 IP 配置

在設置伺服器或工作站時，你面臨的首要決策之一是使用靜態還是動態 IP 尋址。

如果你正在設置伺服器，你可能想要一個靜態 IP。以下是如何做到這一點：

設置靜態 IP 位址時，`ip addr add` 命令可以讓你立即控制。語法遵循 `ip addr add IP_ADDRESS/SUBNET_MASK dev INTERFACE` 模式。例如：

```bash
sudo ip addr add 192.168.1.100/24 dev eth0
```

這個命令非常適合：
- 快速測試網路配置
- 緊急網路修復
- 故障排除期間的臨時 IP 分配
- 向介面添加輔助 IP 位址

> 提示，要刪除 IP 位址，使用：`sudo ip addr del IP_ADDRESS dev INTERFACE`，你可以使用 `ip --help` 查看所有可用選項。

但請記住，這種配置在重啟後不會保留。對於現代 Ubuntu 或 Debian 系統上的永久設置，你需要編輯 netplan 配置，它通常位於 `/etc/netplan/01-netcfg.yaml` 或類似位置。以下是靜態配置的示例：

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

編輯檔案後，使用以下命令應用更改：

```bash
sudo netplan apply
```

## 基本網路故障排除工具

當出現問題時（這是不可避免的），你需要對這些診斷工具有紮實的了解：

### 網路連接測試

讓我們從基礎開始 - `ping` 命令。你可能認為它很簡單，但它非常強大：

`ping` 命令看似基礎，但實際上非常多功能。`-c` 標誌限制發送的資料包數量，這對腳本編寫和快速測試很有用：

```bash
ping -c 4 google.com  # 精確發送 4 個資料包後停止
```

運行 ping 命令時，你會看到類似這樣的輸出：
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

這個輸出告訴你：
- 遠程 IP 位址 (142.250.189.78)
- 每個資料包的往返時間（例如，14.3 ms）
- 資料包丟失百分比（本例中為 0%）
- 關於時間變化的統計資訊

使用 ping 可以：
- 基本連接測試
- 網路延遲測量
- DNS 解析驗證
- 主機可用性監控

想知道為什麼連接緩慢或失敗？這就是 `traceroute` 的用處：

當你需要了解流量路徑時，`traceroute` 變得非常有價值：

```bash
traceroute google.com
```

使用 traceroute 時，你可能會看到：
```
traceroute to google.com (142.250.189.78), 30 hops max, 60 byte packets
 1  _gateway (192.168.1.1)  0.344 ms  0.313 ms  0.307 ms
 2  isp-router.net (10.0.0.1)  12.132 ms  12.125 ms  12.119 ms
 3  core-router.isp.net (172.16.0.1)  13.225 ms  13.219 ms  13.213 ms
 4  google-peer.isp.net (192.0.2.1)  13.376 ms  13.370 ms  13.364 ms
 5  lhr25s35-in-f14.1e100.net (142.250.189.78)  14.090 ms  14.084 ms  14.078 ms
```

每行代表連接中的一個"跳點"：
- 開頭的數字是跳點計數
- 每個路由器的主機名和 IP 位址
- 三個時間測量值顯示到該跳點的延遲

這個工具幫助你：
- 識別網路瓶頸
- 排查路由問題
- 驗證網路路徑
- 檢測網路擁塞點

### DNS 解析

當你需要檢查域名是否正確解析時，`dig` 是你最好的朋友。它比 `nslookup` 更強大，並提供有關 DNS 查詢的詳細資訊：

```bash
dig google.com
```

運行此命令時，你會看到類似這樣的輸出：
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

這個輸出提供：
- 用於查詢的 DNS 伺服器 (8.8.8.8)
- 獲取響應所需的時間 (14 msec)
- 響應訊息的大小 (55 bytes)

### 連接分析

對於更複雜的問題，你需要使用 `ss` 和 `netstat` 等工具深入研究：

`ss` 命令是 netstat 的現代替代品，提供詳細的套接字統計資訊：

```bash
ss -tuln  # 顯示 TCP(-t) 和 UDP(-u) 監聽(-l) 數字(-n) 連接埠
```

運行 ss 命令時：
```
Netid  State    Recv-Q  Send-Q   Local Address:Port    Peer Address:Port
tcp    LISTEN   0       128      0.0.0.0:22            0.0.0.0:*
tcp    LISTEN   0       128      0.0.0.0:80            0.0.0.0:*
tcp    ESTAB    0       0        192.168.1.100:22      192.168.1.10:52414
```

這個輸出顯示：
- `LISTEN`：等待連接的服務
- `ESTAB`：已建立的連接
- 本地和遠程位址:連接埠對
- 傳入/傳出數據的隊列長度

這個命令對以下方面至關重要：
- 安全審計
- 服務除錯
- 連接埠衝突解決
- 連接狀態分析

## 結論

Linux 網路中還有許多更多的主題和工具需要探索，如防火牆（iptables/nftables）、VPN、資料包過濾和網路效能調優。然而，掌握基礎知識將為你提供堅實的基礎，以便進一步發展。

請記住，掌握 Linux 網路是一個過程，而不是目的地。從基礎開始，定期練習，並隨著需求的增長逐漸探索更高級的主題。