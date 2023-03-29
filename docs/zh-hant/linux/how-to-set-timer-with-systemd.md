# 如何在Linux中使用systemd設置定時器

<Validator lang="zh-hant" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9']" date="2023-03-29" />

## 背景

定時器在Linux中被廣泛使用。它用於在特定時間或間隔內安排任務運行。例如，您可以使用定時器在每天、每週或每月的特定時間運行備份腳本。

一些用途：

- 安排自動備份：例如，您可以設置一個定時器，在每天的特定時間運行備份數據庫。
- 監控系統性能：安排定期檢查CPU使用率、內存使用率、磁盤空間和其他系統指標。這有助於管理員在問題變得嚴重之前識別和解決性能問題。
- 定期運行腳本：Linux定時器可用於定期運行腳本。這對於清理臨時文件、運行系統維護腳本等任務非常有幫助。

舊版本的Linux使用cron守護程序安排任務。然而，cron守護程序不再推薦用於新安裝。相反，您應該使用systemd定時器。

## 列出現有的定時器

使用以下命令列出所有現有的定時器：

```sh
systemctl list-timers
```

您將看到一個定時器列表，包括定時器的名稱、下一次觸發時間和上一次觸發時間。

```
NEXT                        LEFT          LAST PASSED UNIT                         ACTIVATES
Wed 2023-03-29 10:06:35 CST 4min 49s left n/a  n/a    ua-timer.timer               ua-timer.service
Wed 2023-03-29 10:14:03 CST 12min left    n/a  n/a    systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Wed 2023-03-29 17:35:56 CST 7h left       n/a  n/a    motd-news.timer              motd-news.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a  n/a    dpkg-db-backup.timer         dpkg-db-backup.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a  n/a    logrotate.timer              logrotate.service
Thu 2023-03-30 03:27:59 CST 17h left      n/a  n/a    apt-daily.timer              apt-daily.service
Thu 2023-03-30 06:58:06 CST 20h left      n/a  n/a    apt-daily-upgrade.timer      apt-daily-upgrade.service
Sun 2023-04-02 03:10:16 CST 3 days left   n/a  n/a    e2scrub_all.timer            e2scrub_all.service
```

## 在 Linux systemd 中設置定時器

> 要設置定時器，您需要使用 root 用戶或具有 sudo 權限的用戶。

要在 Linux systemd 中設置定時器並將輸出記錄到文件中，請按照以下步驟操作：

首先，在 `/etc/systemd/system` 目錄中創建一個新的定時器單元文件。您可以將其命名爲任何名稱，但必須具有 `.timer` 擴展名。例如，創建一個名爲 `helloworld.timer` 的文件。

在定時器單元文件中，添加以下行：

```
[Unit]
Description=Hello World Timer

[Timer]
OnCalendar=*:0/10
Unit=helloworld.service

[Install]
WantedBy=timers.target
```

`.timer` 文件是一個 systemd 單元文件，用於定義定時器。它包含一個 `[Unit]` 部分，提供定時器的描述，一個 `[Timer]` 部分，定義定時器何時觸發以及要運行的服務，以及一個 `[Install]` 部分，指定定時器應安裝在何處。

這告訴系統每 10 分鐘運行一次 `helloworld.service` 單元，並使用 `OnCalendar` 將定時器設置爲在任何小時的第 10 分鐘(`*`) 觸發。

> 注意：`OnCalendar` 使用靈活的語法來定義定時器何時觸發。在此示例中，`*:0/10` 表示“每 10 分鐘一次”。您可以使用其他值來指定不同的間隔。
>
> 更多信息請參見附錄。

然後，在同一目錄中創建一個新的服務單元文件。同樣，您可以將其命名爲任何名稱，但必須具有 `.service` 擴展名。例如，創建一個名爲 `helloworld.service` 的文件。

在服務單元文件中添加以下行：

```
[Unit]
Description=Hello World Service

[Service]
Type=oneshot
ExecStart=/bin/echo "Hello World"

[Install]
WantedBy=multi-user.target
```

`.service` 文件是一個 systemd 單元文件，用於定義服務。`[Unit]` 和 `[Install]` 部分與 `.timer` 文件類似。`[Service]` 部分定義了服務的執行方式。

這告訴系統在定時器觸發時運行 `/bin/echo "Hello World"` 命令。

重新加載 systemd 守護程序以加載新的單元文件：

```sh
sudo systemctl daemon-reload
```

啓用並啓動定時器：

```sh
sudo systemctl enable helloworld.timer
sudo systemctl start helloworld.timer
```

現在，系統將每隔 10 分鐘打印 "Hello World" 並將輸出記錄到文件中。我們可以再次檢查定時器列表以查看定時器是否正在運行：

```sh
systemctl list-timers
```

```
NEXT                        LEFT          LAST                        PASSED       UNIT                         ACTIVATES
Wed 2023-03-29 10:10:00 CST 1min 46s left n/a                         n/a          helloworld.timer             helloworld.service
Wed 2023-03-29 10:14:03 CST 5min left     n/a                         n/a          systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Wed 2023-03-29 16:14:38 CST 6h left       Wed 2023-03-29 10:06:43 CST 1min 29s ago ua-timer.timer               ua-timer.service
Wed 2023-03-29 17:18:24 CST 7h left       n/a                         n/a          motd-news.timer              motd-news.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a                         n/a          dpkg-db-backup.timer         dpkg-db-backup.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a                         n/a          logrotate.timer              logrotate.service
Thu 2023-03-30 05:50:50 CST 19h left      n/a                         n/a          apt-daily.timer              apt-daily.service
Thu 2023-03-30 06:41:07 CST 20h left      n/a                         n/a          apt-daily-upgrade.timer      apt-daily-upgrade.service
Sun 2023-04-02 03:10:39 CST 3 days left   n/a                         n/a          e2scrub_all.timer            e2scrub_all.service
```

如您所見，`helloworld.timer` 正在運行，下一次觸發時間爲 1 分鐘 46 秒後。等待幾分鐘並檢查日誌文件：

```sh
journalctl -u helloworld.service
```

您應該會看到 `echo` 命令的輸出：

```
Mar 29 10:10:02 ubuntu systemd[1]: Starting Hello World Service...
Mar 29 10:10:02 ubuntu echo[7942]: Hello World
Mar 29 10:10:02 ubuntu systemd[1]: helloworld.service: Deactivated successfully.
Mar 29 10:10:02 ubuntu systemd[1]: Finished Hello World Service.
```

如果您想將輸出重定向到文件中，可以更改服務單元文件中的 `ExecStart` 行：

```sh
ExecStart=/bin/sh -c '/bin/echo "Hello World" >> /tmp/helloworld.log'
```

## 附錄

### OnCalendar

`OnCalendar`是定時器單元文件中`[Timer]`部分的一個選項，用於指定定時器何時觸發。`OnCalendar`的語法如下：

```
OnCalendar=
```

日曆表達式可以是簡單或複雜的表達式，用於指定任務的計劃。完整的表達式如下：

```
星期幾 年-月-日 時:分:秒
```

- 星期幾：`Mon`，`Tue`，`Wed`，`Thu`，`Fri`，`Sat`，`Sun`
- 年/月/日：使用數字
- 時/分/秒：使用數字

每個部分都可以是範圍、列表或間隔，或者使用`*`匹配任何值。例如：

- `Mon..Fri`：星期一到星期五
- `Mon，Fri`：星期一和星期五
- `8..18/2`：上午8:00到下午6:00，每2小時
- `*-*-1`：每個月的第一天

每個部分都可以省略。例如：

- 要每小時運行一次任務，請使用`OnCalendar=*:0`
- 要每天下午3:30運行一次任務，請使用`OnCalendar=15:30`
- 要每個星期一上午9:00運行一次任務，請使用`OnCalendar=Mon 9:00`
- 要每15分鐘運行一次任務，請使用`OnCalendar=*:0/15`
- 要在工作日的上午8:00運行一次任務，請使用`OnCalendar=Mon..Fri 8:00`

除了這些基本表達式外，您還可以使用包含範圍、列表和間隔的更復雜的表達式。以下是一些示例：
- 要在上午8:00到下午6:00之間每2小時運行一次任務，請使用 `OnCalendar=8..18/2:0`
- 要在每個月的第15天上午10:00運行任務，請使用 `OnCalendar=*-*-15 10:00`

您還可以使用特殊關鍵字 `minutely`、`hourly`、`daily`、`weekly`、`monthly` 和 `yearly` 來指定常見的計劃。

您始終可以使用 `systemd-analyze` 命令驗證您的 `OnCalendar` 表達式：

```sh
systemd-analyze calendar "Mon..Fri 8:00"
```

輸出將顯示錶達式的規範化形式和下一個過期時間：

```
  Original form: Mon..Fri 8:00
Normalized form: Mon..Fri *-*-* 08:00:00
    Next elapse: Thu 2023-03-30 08:00:00 CST
       (in UTC): Thu 2023-03-30 00:00:00 UTC
       From now: 18h left
```

總的來說，`OnCalendar` 選項提供了一種靈活而強大的方式來使用 systemd 定時器在 Linux 中安排任務。通過理解語法並使用適當的日曆表達式，您可以自動化您的系統，節省時間和精力。
