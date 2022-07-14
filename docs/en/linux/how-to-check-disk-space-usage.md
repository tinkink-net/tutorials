## How to view Linux disk space usage

## Viewing the space occupation of a disk partition

To use a partition on Linux, you need to mount it under a certain directory, so it can be uncritically understood that a partition must correspond to a directory whose contents are the contents of that partition.

To see the space occupation of a partition, you can use the ``df`` command.

```sh
df -h
```

The return content is similar to the following.

```
File system capacity used available used % mount point
devtmpfs 3.9G 0 3.9G 0% /dev
tmpfs 3.9G 0 3.9G 0% /dev/shm
/dev/sda2 496G 2.6G 484G 1% /
/dev/sda1 969M 112M 792M 13% /boot
```

As you can see, the main partitions are `/dev/sda1` and `/dev/sda2`, where `/dev/sda2` has a lot of space and is the partition mainly used for data storage, and the mount point is `/`, the root directory. From the above return, you can see the space occupation of each disk partition.

## Checking the space occupation of a directory

To see the space occupation of a directory, you can use the `du` command. By default, the `du` command lists the space occupied by directories and files at all levels in the specified directory. You can specify that only the space occupied by directories and files at the specified level is listed with the parameter `-max-depth`.

```sh
du -h --max-depth=1
```

The return is similar to the following.

```
68K . /nginx
12K . /scripts
44M . /log
20K . /bakup
1.9M . /letsencrypt
20M . /storage
22M . /tmp
88M .
```

From the above return, you can see the total space occupied by each directory.

It is worth noting that the `-du` command is slightly slower to execute because it needs to iterate through all files and directories in the specified directory, so you need to be patient and it will take longer if there are more directories and files.

It is also possible to specify a larger value for the `-max-depth` parameter while ensuring that readability is not affected, e.g.

```sh
du -h --max-depth=2
```

This way you can see more information at once and more quickly understand which directories are taking up a lot of space.

## Summary

The above is the way to check disk space usage on Linux systems. The combination of both can be used to complete the daily task of checking disk space usage.
