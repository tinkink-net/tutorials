# 如何保持 ssh 連接不斷開（Broken pipe）

在使用 ssh 的時候，經常會碰到連接斷開的情況，有時候只是切出窗口做了一些其它的工作，回到終端窗口就會發現 ssh 連接已經斷開。此時還不能直接進行操作，在幾秒鐘的等待之後，纔會出現提示：

```sh
Write failed: Broken pipe
```

這種情況非常影響工作效率。

## 原因

ssh 使用的是長連接，當有數據通訊的時候，連接會一直保持不斷開，但是在不修改配置的情況下，ssh 會在一段時間沒有數據通訊後斷開連接，從而導致上述現象的發生。

## 解決方案

既然是因爲沒有數據通訊導致的連接斷開，那在空閒的時候能否讓 ssh 也定時產生一些通訊呢？答案是肯定的。並且這個問題 ssh 的服務端和客戶端都提供瞭解決方案，使用時只需要二選一即可（兩者都設置也沒有問題）。

### 服務端設置

服務端提供 ssh 服務的叫作 sshd ，因此它的配置文件是`/etc/ssh/sshd_config`，只需要修改這個文件即可：

```
ClientAliveInterval 60
ClientAliveCountMax 5
```

其中`ClientAliveInterval`表示每隔多長時間向客戶端發送一次“心跳”，`ClientAliveCountMax`表示多少次未收到回覆時斷開連接。因此上述配置的含義是：每隔 60s 向客戶端發送一個“心跳”，當 5 次沒有收到回覆時斷開連接。

設置完成後重啓 sshd 服務即可：`systemctl restart sshd.service`或者`service sshd restart`。

### 客戶端設置

客戶端的配置位於`/etc/ssh/ssh_config`，這是一個全局配置文件。如果只爲當前用戶設置，也可以修改`~/.ssh/ssh_config`：

```
TCPKeepAlive yes
ServerAliveInterval 60
ServerAliveCountMax 5
```

參數含義與服務端設置的含義幾乎一樣。

### 客戶端臨時方案

除了修改配置之外，客戶端在發起連接時也可以使用參數來指定定時發送“心跳”：

```sh
ssh -o ServerAliveInterval=60 root@xx.xx.xx.xx
```

## 小結

只要設置好“心跳”，就再也不怕 ssh 無故斷開影響工作效率了。
