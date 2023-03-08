# Linux 使用 logratate 進行日誌滾動切割

## 日誌滾動介紹

日誌是線上服務非常重要的一部分，各種服務會在運行過程中不斷記錄自身的運行日誌，如 nginx 訪問日誌、業務系統流水日誌、各種錯誤日誌等。這些日誌一般會被存放到不同的日誌文件中，隨着運行時間的增加，日誌文件的體積也會不斷增長。

但是線上服務器的磁盤空間是有限的，如果日誌文件的體積持續增長，最終將會導致磁盤空間不足。爲了解決這個問題，我們就需要對日誌進行滾動切割。

具體而言，滾動切割會做這樣幾件事情：

1. 設定一定的滾動規則（例如按時間或者體積）
2. 當滿足規則的時候，將當前日誌變更爲歷史日誌，同時產生一個新日誌文件作爲當前日誌文件
3. 當歷史日誌文件過多時自動清理一些舊的日誌文件

這樣原來的一個大日誌文件就會變成一堆小日誌文件，並且每隔一段時間就會切割滾動一次，總的日誌歷史記錄也基本是穩定不變的，這樣就不用擔心日誌會不斷增大佔用磁盤空間。

## logrotate使用

絕大部分 Linux 發行版都有內置日誌滾動切割工具`logrotate`，使用它可以方便地設置日誌滾動切割規則，並且可以自動清理過期的日誌文件。

`logrotate`的配置文件：

- `/etc/logrotate.conf` 主配置文件
- `/etc/logrotate.d` 目錄下可以存放很多具體的日誌滾動切割規則配置文件

當我們需要設置日誌滾動切割規則的時候，可以在`/etc/logrotate.d`下新建一個配置文件。例如`/etc/logrotate.d/nginx`，這個文件的內容如下：

```
/var/log/nginx/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 640 root root
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 \`cat /var/run/nginx.pid\`
    endscript
}
```

這個配置文件的含義是：

- `daily` 每天滾動一次
- `missingok` 如果文件不存在，則不滾動
- `rotate 7` 保留最近7個日誌文件
- `compress` 壓縮日誌文件
- `delaycompress` 延遲壓縮
- `notifempty` 如果文件爲空，則不滾動
- `create 640 root root` 新建日誌文件的屬主及權限，如果 nginx 不是`root`用戶運行的要特別注意
- `sharedscripts` 共享腳本，即日誌滾動完成後再運行腳本，否則每滾動一個日誌文件都要運行一次腳本
- `postrotate` 日誌滾動完成後運行的腳本，有些業務日誌可以不需要這個腳本

當設置好日誌滾動切割規則配置後，可以使用`logrotate -d`來驗證規則，例如：

```sh
logrotate -d /etc/logrotate.d/nginx
```

返回類似以下內容：

```
reading config file /etc/logrotate.d/nginx
Allocating hash table for state file, size: 15360 B

Handling 1 logs

rotating pattern: /var/log/nginx/*.log  after 1 days (7 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/nginx/*.log /access.log
  log does not need rotating (log has been already rotated)
considering log /var/log/nginx/*.log /error.log
  log does not need rotating (log has been already rotated)

running postrotate script
......
```

沒有報錯即表示配置文件正確。

如果希望馬上看到效果，可以使用`logrotate -f`來強制進行滾動切割，例如：

```sh
logrotate -f /etc/logrotate.d/nginx
```

## 其它參數

- `compress` 壓縮滾動之後的歷史日誌
- `nocompress` 不壓縮滾動之後的歷史日誌
- `copytruncate` 用於還在打開中的日誌文件，把當前日誌備份並截斷；是先拷貝再清空的方式，拷貝和清空之間有一個時間差，可能會丟失部分日誌數據。
- `nocopytruncate` 備份日誌文件不過不截斷
- `create mode owner group` 指定創建新文件的屬主和權限
- `nocreate` 不建立新的日誌文件
- `delaycompress` 和 `compress` 一起使用時，歷史日誌文件到下一次滾動時才壓縮
- `nodelaycompress` 覆蓋 `delaycompress` 選項，滾動同時壓縮
- `missingok` 如果日誌缺失，不報錯繼續滾動下一個日誌
- `errors address` 滾動時的錯誤信息發送到指定的 Email 地址
- `ifempty` 即使日誌文件爲空文件也做滾動
- `notifempty` 當日志文件爲空時，不進行滾動
- `mail address` 把滾動的日誌文件發送到指定的 Email 地址
- `nomail` 滾動時不發送日誌文件
- `olddir directory` 滾動後的日誌文件放入指定的目錄，必須和當前日誌文件在同一個文件系統
- `noolddir` 滾動後的日誌文件和當前日誌文件放在同一個目錄下
- `sharedscripts` 共享腳本，即日誌滾動完成後再運行腳本，否則每滾動一個日誌文件都要運行一次腳本
- `prerotate` 在滾動之前需要執行的指令，例如修改文件的屬性等動作；必須獨立成行
- `postrotate` 在滾動之後需要執行的指令，例如重新啓動 (`kill -HUP`) 某個服務；必須獨立成行
- `daily` 指定滾動週期爲每天
- `weekly` 指定滾動週期爲每週
- `monthly` 指定滾動週期爲每月
- `rotate count` 指定日誌文件刪除之前滾動的次數，`0`指不保留備份，`5`指保留 5 個備份
- `dateext` 使用當期日期作爲命名格式
- `dateformat .%s` 配合dateext使用，緊跟在下一行出現，定義文件切割後的文件名，必須配合`dateext`使用，只支持`%Y`/`%m`/`%d`/`%s`四個參數
- `size log-size`(或`minsize log-size`) 當日志文件到達指定的大小時才滾動，以下爲合法格式：
    - `size = 5`或`size 5` （>= 5 個字節就滾動）
    - `size = 100k`或`size 100k`
    - `size = 100M`或`size 100M`
