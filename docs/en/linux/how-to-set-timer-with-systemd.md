# How to set timer with systemd in Linux

<Validator lang="en" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9']" date="2023-03-29" />

## Background

Timer is widely used in Linux. It is used to schedule tasks to run at a specific time or interval. For example, you can use a timer to schedule a backup script to run at a specific time every day, week, or month.

Some usage:

- Scheduling automated backups: For instance, you can set a timer to run a backup database at a specific time every day.
- Monitoring system performance: Scheduling periodic checks of CPU usage, memory usage, disk space, and other system metrics. This helps administrators to identify and resolve performance issues before they become critical.
- Running scripts at regular intervals: Linux timers can be used to run scripts at regular intervals. This is helpful for tasks such as cleaning up temporary files, running system maintenance scripts.

Older versions of Linux use the cron daemon to schedule tasks. However, the cron daemon is nolonger recommended for new installations. Instead, you should use the systemd timer.

## List existing timers

To list all existing timers, use the following command:

```sh
systemctl list-timers
```

You will see a list of timers, including the name of the timer, the next time it will trigger, and the last time it triggered.

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

## Set a timer using Linux systemd

> To set a timer, you need to use the root user or a user with sudo privileges.

To set a timer using Linux systemd and log the output to a file, follow these steps:

First, create a new timer unit file in the `/etc/systemd/system` directory. You can name it anything you want, but it must have a `.timer` extension. For example, create a file named `helloworld.timer`.

In the timer unit file, add the following lines:

```
[Unit]
Description=Hello World Timer

[Timer]
OnCalendar=*:0/10
Unit=helloworld.service

[Install]
WantedBy=timers.target
```

The `.timer` file is a systemd unit file that defines a timer. It contains a `[Unit]` section, which provides a description of the timer, a `[Timer]` section, which defines when the timer should trigger and which service to run, and an `[Install]` section, which specifies where the timer should be installed.

This tells the system to run the `helloworld.service` unit every 10 minutes, and sets the timer to trigger at every 10th minute of any hour(`*`) using `OnCalendar`.

> Note: `OnCalendar` uses a flexible syntax to define when the timer should trigger. In this example, `*:0/10` means "every 10 minutes." You can use other values to specify different intervals.
>
> For more infomation, see the Appendix.

Then, create a new service unit file in the same directory. Again, you can name it anything you want, but it must have a `.service` extension. For example, create a file named `helloworld.service`.

In the service unit file, add the following lines:

```
[Unit]
Description=Hello World Service

[Service]
Type=oneshot
ExecStart=/bin/echo "Hello World"

[Install]
WantedBy=multi-user.target
```

The `.service` file is a systemd unit file that defines a service. `[Unit]` and `[Install]` sections are similar to the `.timer` file. The `[Service]` section defines how the service should be executed.

This tells the system to run the `/bin/echo "Hello World"` command when the timer triggers.

Reload the systemd daemon to load the new unit files:

```sh
sudo systemctl daemon-reload
```

Enable and start the timer:

```sh
sudo systemctl enable helloworld.timer
sudo systemctl start helloworld.timer
```

Now, the system will print "Hello World" every 10 minutes and log the output to a file. We can check the timer list again to see the timer is running:

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

As you can see, the `helloworld.timer` is running and the next trigger time is in 1 minute and 46 seconds. Wait for a few minutes and check the log file:

```sh
journalctl -u helloworld.service
```

You should see the output of the `echo` command:

```
Mar 29 10:10:02 ubuntu systemd[1]: Starting Hello World Service...
Mar 29 10:10:02 ubuntu echo[7942]: Hello World
Mar 29 10:10:02 ubuntu systemd[1]: helloworld.service: Deactivated successfully.
Mar 29 10:10:02 ubuntu systemd[1]: Finished Hello World Service.
```

If you want to redirect the output to a file, you can change the `ExecStart` line in the service unit file to:

```sh
ExecStart=/bin/sh -c '/bin/echo "Hello World" >> /tmp/helloworld.log'
```

## Appendix

### OnCalendar

`OnCalendar` is an option in the `[Timer]` section of a timer unit file that specifies when the timer should trigger. The syntax for `OnCalendar` is as follows:

```
OnCalendar=
```

The calendar expression can be a simple or complex expression that specifies the schedule for the task. The full expression is like this:

```
dayOfWeek year-month-day hour:minute:second
```

- Day Of Week: `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`
- Year/Month/Day: Use numbers
- Hour/Minute/Second: Use numbers

Each part can be a range, a list, or an interval, or `*` to match any value. For example:

- `Mon..Fri`: Monday to Friday
- `Mon,Fri`: Monday and Friday
- `8..18/2`: 8:00 AM to 6:00 PM, every 2 hours
- `*-*-1`: The first day of every month

Each part can be omitted. For example:

- To run a task every hour, use `OnCalendar=*:0`
- To run a task at 3:30 PM every day, use `OnCalendar=15:30`
- To run a task every Monday at 9:00 AM, use `OnCalendar=Mon 9:00`
- To run a task every 15 minutes, use `OnCalendar=*:0/15`
- To run a task every weekday at 8:00 AM, use `OnCalendar=Mon..Fri 8:00`

In addition to these basic expressions, you can use more complex expressions that include ranges, lists, and intervals. Here are some examples:

- To run a task every 2 hours between 8:00 AM and 6:00 PM, use `OnCalendar=8..18/2:0`
- To run a task on the 15th day of every month at 10:00 AM, use `OnCalendar=*-*-15 10:00`

You can also use the special keywords `minutely`, `hourly`, `daily`, `weekly`, `monthly`, and `yearly` to specify common schedules.

You can always validate your `OnCalendar` expression using the `systemd-analyze` command:

```sh
systemd-analyze calendar "Mon..Fri 8:00"
```

The output will show the normalized form of the expression and the next elapse time:

```
  Original form: Mon..Fri 8:00
Normalized form: Mon..Fri *-*-* 08:00:00
    Next elapse: Thu 2023-03-30 08:00:00 CST
       (in UTC): Thu 2023-03-30 00:00:00 UTC
       From now: 18h left
```

Overall, the `OnCalendar` option provides a flexible and powerful way to schedule tasks in Linux using systemd timers. By understanding the syntax and using the appropriate calendar expressions, you can automate your system and save time and effort.
