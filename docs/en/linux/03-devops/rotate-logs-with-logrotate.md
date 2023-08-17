# Linux log rolling cut with logratate

## Introduction to Log Rollup

Logging is a very important part of online services. Various services constantly record their own operational logs as they run, such as nginx access logs, business system flow logs, various error logs, and so on. These logs are usually stored in different log files, and the size of the log files grows as the runtime increases.

But the disk space of online server is limited, and if the size of log files keeps growing, it will eventually lead to insufficient disk space. To solve this problem, we need to perform rolling cuts on the logs.

Specifically, rolling cut will do several things.

1. set certain scrolling rules (e.g. by time or volume)
2. change the current log to history log when the rule is satisfied, and generate a new log file as the current log file
3. automatically clean up some old log files when there are too many history log files

This way the original large log file will become a bunch of small log files, and will be cut and rolled every once in a while, and the total log history is basically stable and unchanged, so you don't have to worry about the logs will keep growing and taking up disk space.

## logrotate usage

Most Linux distributions have a built-in logrotate tool, which makes it easy to set logrotate rules and automatically clean up outdated log files.

The configuration file for `logrotate` is

- `/etc/logrotate.conf` main configuration file
- The `/etc/logrotate.d` directory can hold many specific logrotate configuration files

When we need to set up a log-rolling cut rule, we can create a new configuration file under `/etc/logrotate.d`. For example `/etc/logrotate.d/nginx`, the contents of this file are as follows

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
        [ -f /var/run/nginx.pid ] && kill -USR1 \`cat /var/run/nginx.pid`
    endscript
}
```

The meaning of this configuration file is.

- `daily` rolls over once a day
- `missingok` does not roll if the file does not exist
- `rotate 7` keep the last 7 log files
- `compress` Compress log files
- `delaycompress` Delay compression
- `notifempty` Do not roll if file is empty
- `create 640 root root` The owner and permissions of the new log file, especially if nginx is not run by the `root` user
- `sharedscripts` share scripts, i.e. run scripts after the logs have finished scrolling, otherwise you will have to run scripts once for each log file scrolled
- `postrotate` script that runs after the logs have finished rolling, some business logs may not need this script

Once the log rolling cut rule configuration is set, you can use ``logrotate -d`` to verify the rule, for example

```sh
logrotate -d /etc/logrotate.d/nginx
```

returns something like the following.

```
reading config file /etc/logrotate.d/nginx
Allocating hash table for state file, size: 15360 B

Handling 1 logs

rotating pattern: /var/log/nginx/*.log after 1 days (7 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/nginx/*.log /access.log
  log does not need rotating (log has been already rotated)
considering log /var/log/nginx/*.log /error.log
  log does not need rotating (log has been already rotated)

running postrotate script
......
```

No errors means the configuration file is correct.

If you want to see results immediately, you can use `logrotate -f` to force a scroll cut, e.g.

```sh
logrotate -f /etc/logrotate.d/nginx
```

## Other parameters

- `compress` compress history logs after rolling
- ``nocompress`` do not compress the history log after rolling
- `copytruncate` is used to backup and truncate the current log file while it is still open; it is a way to copy and then empty, there is a time gap between copying and emptying, and some log data may be lost.
- `nocopytruncate` backs up the log file but does not truncate it
- `create mode owner group` Specify the owner and permissions for creating new files
- `nocreate` do not create new log files
- `delaycompress` and `compress` together compress the history log file until the next rollover
- `nodelaycompress` overrides the `delaycompress` option and compresses on a rolling basis
- `missingok` If a log is missing, continue to scroll to the next log without reporting an error
- `errors address` Send error messages to the specified Email address when scrolling
- `ifempty` Scroll even if the log file is empty
- `notifempty` Do not scroll when the log file is empty
- `mail address` Send the scrolling log file to the specified Email address
- `nomail` Do not send log files when scrolling
- `olddir directory` Put the scrolled log file into the specified directory, it must be on the same file system as the current log file
- `noolddir` The scrolled log file is placed in the same directory as the current log file
- `sharedscripts` share scripts, i.e. run the scripts after the logs are scrolled, otherwise run the scripts once for each log file scrolled
- `prerotate` the command to be executed before scrolling, such as modifying the file's properties; must be a separate line
- `postrotate` A command to be executed after the rollover, such as restarting (`kill -HUP`) a service; must be a separate line
- `daily` specifies that the rolling period is daily
- `weekly` specifies that the rolling period is weekly
- `monthly` specifies a monthly rolling cycle
- `rotate count` specifies the number of times the log file is rolled over before it is deleted, `0` means no backups are kept, `5` means 5 backups are kept
- `dateext` uses the current date as the naming format
- `dateformat . %s` used with dateext, appears immediately after the next line, defines the name of the file after it is cut, must be used with `dateext`, only supports `%Y`/`%m`/`%d`/`%s` four parameters
- `size log-size` (or `minsize log-size`) Scrolls the log file when it reaches the specified size, the following is the legal format.
    - `size = 5` or `size 5` (scrolls when >= 5 bytes)
    - `size = 100k` or `size 100k`
    - `size = 100M` or `size 100M`
