# Linux 使用 logratate 进行日志滚动切割

## 日志滚动介绍

日志是线上服务非常重要的一部分，各种服务会在运行过程中不断记录自身的运行日志，如 nginx 访问日志、业务系统流水日志、各种错误日志等。这些日志一般会被存放到不同的日志文件中，随着运行时间的增加，日志文件的体积也会不断增长。

但是线上服务器的磁盘空间是有限的，如果日志文件的体积持续增长，最终将会导致磁盘空间不足。为了解决这个问题，我们就需要对日志进行滚动切割。

具体而言，滚动切割会做这样几件事情：

1. 设定一定的滚动规则（例如按时间或者体积）
2. 当满足规则的时候，将当前日志变更为历史日志，同时产生一个新日志文件作为当前日志文件
3. 当历史日志文件过多时自动清理一些旧的日志文件

这样原来的一个大日志文件就会变成一堆小日志文件，并且每隔一段时间就会切割滚动一次，总的日志历史记录也基本是稳定不变的，这样就不用担心日志会不断增大占用磁盘空间。

## logrotate使用

绝大部分 Linux 发行版都有内置日志滚动切割工具`logrotate`，使用它可以方便地设置日志滚动切割规则，并且可以自动清理过期的日志文件。

`logrotate`的配置文件：

- `/etc/logrotate.conf` 主配置文件
- `/etc/logrotate.d` 目录下可以存放很多具体的日志滚动切割规则配置文件

当我们需要设置日志滚动切割规则的时候，可以在`/etc/logrotate.d`下新建一个配置文件。例如`/etc/logrotate.d/nginx`，这个文件的内容如下：

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

这个配置文件的含义是：

- `daily` 每天滚动一次
- `missingok` 如果文件不存在，则不滚动
- `rotate 7` 保留最近7个日志文件
- `compress` 压缩日志文件
- `delaycompress` 延迟压缩
- `notifempty` 如果文件为空，则不滚动
- `create 640 root root` 新建日志文件的属主及权限，如果 nginx 不是`root`用户运行的要特别注意
- `sharedscripts` 共享脚本，即日志滚动完成后再运行脚本，否则每滚动一个日志文件都要运行一次脚本
- `postrotate` 日志滚动完成后运行的脚本，有些业务日志可以不需要这个脚本

当设置好日志滚动切割规则配置后，可以使用`logrotate -d`来验证规则，例如：

```sh
logrotate -d /etc/logrotate.d/nginx
```

返回类似以下内容：

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

没有报错即表示配置文件正确。

如果希望马上看到效果，可以使用`logrotate -f`来强制进行滚动切割，例如：

```sh
logrotate -f /etc/logrotate.d/nginx
```

## 其它参数

- `compress` 压缩滚动之后的历史日志
- `nocompress` 不压缩滚动之后的历史日志
- `copytruncate` 用于还在打开中的日志文件，把当前日志备份并截断；是先拷贝再清空的方式，拷贝和清空之间有一个时间差，可能会丢失部分日志数据。
- `nocopytruncate` 备份日志文件不过不截断
- `create mode owner group` 指定创建新文件的属主和权限
- `nocreate` 不建立新的日志文件
- `delaycompress` 和 `compress` 一起使用时，历史日志文件到下一次滚动时才压缩
- `nodelaycompress` 覆盖 `delaycompress` 选项，滚动同时压缩
- `missingok` 如果日志缺失，不报错继续滚动下一个日志
- `errors address` 滚动时的错误信息发送到指定的 Email 地址
- `ifempty` 即使日志文件为空文件也做滚动
- `notifempty` 当日志文件为空时，不进行滚动
- `mail address` 把滚动的日志文件发送到指定的 Email 地址
- `nomail` 滚动时不发送日志文件
- `olddir directory` 滚动后的日志文件放入指定的目录，必须和当前日志文件在同一个文件系统
- `noolddir` 滚动后的日志文件和当前日志文件放在同一个目录下
- `sharedscripts` 共享脚本，即日志滚动完成后再运行脚本，否则每滚动一个日志文件都要运行一次脚本
- `prerotate` 在滚动之前需要执行的指令，例如修改文件的属性等动作；必须独立成行
- `postrotate` 在滚动之后需要执行的指令，例如重新启动 (`kill -HUP`) 某个服务；必须独立成行
- `daily` 指定滚动周期为每天
- `weekly` 指定滚动周期为每周
- `monthly` 指定滚动周期为每月
- `rotate count` 指定日志文件删除之前滚动的次数，`0`指不保留备份，`5`指保留 5 个备份
- `dateext` 使用当期日期作为命名格式
- `dateformat .%s` 配合dateext使用，紧跟在下一行出现，定义文件切割后的文件名，必须配合`dateext`使用，只支持`%Y`/`%m`/`%d`/`%s`四个参数
- `size log-size`(或`minsize log-size`) 当日志文件到达指定的大小时才滚动，以下为合法格式：
    - `size = 5`或`size 5` （>= 5 个字节就滚动）
    - `size = 100k`或`size 100k`
    - `size = 100M`或`size 100M`
