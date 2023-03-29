# 如何在Linux中使用systemd设置定时器

<Validator lang="zh-hans" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9']" date="2023-03-29" />

## 背景

定时器在Linux中被广泛使用。它用于在特定时间或间隔内安排任务运行。例如，您可以使用定时器在每天、每周或每月的特定时间运行备份脚本。

一些用途：

- 安排自动备份：例如，您可以设置一个定时器，在每天的特定时间运行备份数据库。
- 监控系统性能：安排定期检查CPU使用率、内存使用率、磁盘空间和其他系统指标。这有助于管理员在问题变得严重之前识别和解决性能问题。
- 定期运行脚本：Linux定时器可用于定期运行脚本。这对于清理临时文件、运行系统维护脚本等任务非常有帮助。

旧版本的Linux使用cron守护程序安排任务。然而，cron守护程序不再推荐用于新安装。相反，您应该使用systemd定时器。

## 列出现有的定时器

使用以下命令列出所有现有的定时器：

```sh
systemctl list-timers
```

您将看到一个定时器列表，包括定时器的名称、下一次触发时间和上一次触发时间。

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

## 在 Linux systemd 中设置定时器

> 要设置定时器，您需要使用 root 用户或具有 sudo 权限的用户。

要在 Linux systemd 中设置定时器并将输出记录到文件中，请按照以下步骤操作：

首先，在 `/etc/systemd/system` 目录中创建一个新的定时器单元文件。您可以将其命名为任何名称，但必须具有 `.timer` 扩展名。例如，创建一个名为 `helloworld.timer` 的文件。

在定时器单元文件中，添加以下行：

```
[Unit]
Description=Hello World Timer

[Timer]
OnCalendar=*:0/10
Unit=helloworld.service

[Install]
WantedBy=timers.target
```

`.timer` 文件是一个 systemd 单元文件，用于定义定时器。它包含一个 `[Unit]` 部分，提供定时器的描述，一个 `[Timer]` 部分，定义定时器何时触发以及要运行的服务，以及一个 `[Install]` 部分，指定定时器应安装在何处。

这告诉系统每 10 分钟运行一次 `helloworld.service` 单元，并使用 `OnCalendar` 将定时器设置为在任何小时的第 10 分钟(`*`) 触发。

> 注意：`OnCalendar` 使用灵活的语法来定义定时器何时触发。在此示例中，`*:0/10` 表示“每 10 分钟一次”。您可以使用其他值来指定不同的间隔。
>
> 更多信息请参见附录。

然后，在同一目录中创建一个新的服务单元文件。同样，您可以将其命名为任何名称，但必须具有 `.service` 扩展名。例如，创建一个名为 `helloworld.service` 的文件。

在服务单元文件中添加以下行：

```
[Unit]
Description=Hello World Service

[Service]
Type=oneshot
ExecStart=/bin/echo "Hello World"

[Install]
WantedBy=multi-user.target
```

`.service` 文件是一个 systemd 单元文件，用于定义服务。`[Unit]` 和 `[Install]` 部分与 `.timer` 文件类似。`[Service]` 部分定义了服务的执行方式。

这告诉系统在定时器触发时运行 `/bin/echo "Hello World"` 命令。

重新加载 systemd 守护程序以加载新的单元文件：

```sh
sudo systemctl daemon-reload
```

启用并启动定时器：

```sh
sudo systemctl enable helloworld.timer
sudo systemctl start helloworld.timer
```

现在，系统将每隔 10 分钟打印 "Hello World" 并将输出记录到文件中。我们可以再次检查定时器列表以查看定时器是否正在运行：

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

如您所见，`helloworld.timer` 正在运行，下一次触发时间为 1 分钟 46 秒后。等待几分钟并检查日志文件：

```sh
journalctl -u helloworld.service
```

您应该会看到 `echo` 命令的输出：

```
Mar 29 10:10:02 ubuntu systemd[1]: Starting Hello World Service...
Mar 29 10:10:02 ubuntu echo[7942]: Hello World
Mar 29 10:10:02 ubuntu systemd[1]: helloworld.service: Deactivated successfully.
Mar 29 10:10:02 ubuntu systemd[1]: Finished Hello World Service.
```

如果您想将输出重定向到文件中，可以更改服务单元文件中的 `ExecStart` 行：

```sh
ExecStart=/bin/sh -c '/bin/echo "Hello World" >> /tmp/helloworld.log'
```

## 附录

### OnCalendar

`OnCalendar`是定时器单元文件中`[Timer]`部分的一个选项，用于指定定时器何时触发。`OnCalendar`的语法如下：

```
OnCalendar=
```

日历表达式可以是简单或复杂的表达式，用于指定任务的计划。完整的表达式如下：

```
星期几 年-月-日 时:分:秒
```

- 星期几：`Mon`，`Tue`，`Wed`，`Thu`，`Fri`，`Sat`，`Sun`
- 年/月/日：使用数字
- 时/分/秒：使用数字

每个部分都可以是范围、列表或间隔，或者使用`*`匹配任何值。例如：

- `Mon..Fri`：星期一到星期五
- `Mon，Fri`：星期一和星期五
- `8..18/2`：上午8:00到下午6:00，每2小时
- `*-*-1`：每个月的第一天

每个部分都可以省略。例如：

- 要每小时运行一次任务，请使用`OnCalendar=*:0`
- 要每天下午3:30运行一次任务，请使用`OnCalendar=15:30`
- 要每个星期一上午9:00运行一次任务，请使用`OnCalendar=Mon 9:00`
- 要每15分钟运行一次任务，请使用`OnCalendar=*:0/15`
- 要在工作日的上午8:00运行一次任务，请使用`OnCalendar=Mon..Fri 8:00`

除了这些基本表达式外，您还可以使用包含范围、列表和间隔的更复杂的表达式。以下是一些示例：
- 要在上午8:00到下午6:00之间每2小时运行一次任务，请使用 `OnCalendar=8..18/2:0`
- 要在每个月的第15天上午10:00运行任务，请使用 `OnCalendar=*-*-15 10:00`

您还可以使用特殊关键字 `minutely`、`hourly`、`daily`、`weekly`、`monthly` 和 `yearly` 来指定常见的计划。

您始终可以使用 `systemd-analyze` 命令验证您的 `OnCalendar` 表达式：

```sh
systemd-analyze calendar "Mon..Fri 8:00"
```

输出将显示表达式的规范化形式和下一个过期时间：

```
  Original form: Mon..Fri 8:00
Normalized form: Mon..Fri *-*-* 08:00:00
    Next elapse: Thu 2023-03-30 08:00:00 CST
       (in UTC): Thu 2023-03-30 00:00:00 UTC
       From now: 18h left
```

总的来说，`OnCalendar` 选项提供了一种灵活而强大的方式来使用 systemd 定时器在 Linux 中安排任务。通过理解语法并使用适当的日历表达式，您可以自动化您的系统，节省时间和精力。
