# Master Users and Permissions of Linux

<Validator lang="en" :platform-list="['Ubuntu 22.04']" date="2023-08-02" />

In Linux, users are individuals who can access the system and its resources. Each user has a unique username and user ID (`UID`) that identifies them to the system. Groups are collections of users who share common permissions to access files and directories. Permissions are rules that determine who can access a file or directory, and what actions they can perform on it.

Linux uses a permission system that consists of three types of permissions: read, write, and execute. These permissions can be set for three types of users: the owner of the file or directory, members of the group that owns the file or directory, and all other users on the system.

Understanding how users, groups, and permissions work in Linux is essential for managing access to system resources and ensuring the security of your system.

## Users

### Identify Current User

To identify the current user in Linux, you can use the `whoami` command. This command will display the username of the current user in the terminal.

```sh
> whoami
tinymemo
```

Additionally, you can check the contents of the `$USER` environment variable, which will also display the username of the current user.

```sh
> echo $USER
tinymemo
```

### User ID

Each user in Linux has a unique user ID (`UID`) that identifies them to the system. You can use the `id` command to display the `UID` of the current user.

```sh
> id
uid=1000(tinymemo) gid=1000(tinymemo) groups=1000(tinymemo),4(adm),27(sudo),44(video),50(staff)
```

As you can see, the `UID` of the current user is 1000. You can also use the `-u` option to display only the `UID`, or you can use the `id -u` command to display only the `UID`.

```sh
> id -u
1000

> echo $UID
1000
```

The `UID` of a user is generated automatically when the user is created. The `UID` of the root user is always 0.

All the users on a Linux system are stored in the `/etc/passwd` file. You can use the `cat` command to display the contents of this file.

```sh
> cat /etc/passwd

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
...
tinymemo:x:1000:1000::/home/tinymemo:/bin/bash
```

The second and third fields of each line in the `/etc/passwd` file are the `UID` and GID of the user, respectively. It's important to note that the `UID` of a user is not the same as the GID of the user. The GID of a user is the ID of the group that the user belongs to. We will discuss groups in the next section.

### Create a New User

To create a new user in Linux, you can use the `adduser` command. This command will create a new user with the specified username and `UID`. If you don't specify a `UID`, the `adduser` command will automatically generate a `UID` for the new user.

```sh
> sudo adduser newusername

Adding user `newusername' ...
Adding new group `newusername' (1000) ...
Adding new user `newusername' (1000) with group `newusername' ...
Creating home directory `/home/newusername' ...
Copying files from `/etc/skel' ...
New password:
Retype new password:
passwd: password updated successfully
Changing the user information for newusername
Enter the new value, or press ENTER for the default
	Full Name []:
	Room Number []:
	Work Phone []:
	Home Phone []:
	Other []:
Is the information correct? [Y/n] y
```

Once you run the `adduser` command, you will be prompted to enter a password for the new user. You can also use the `passwd` command to set a password for the new user.

```sh
> sudo passwd newuser
New password:
Retype new password:
passwd: password updated successfully
```

If you omit the username when running the `passwd` command, it will set a password for the current user.

### Delete a User

To delete a user in Linux, you can use the `deluser` command. This command will delete the specified user from the system.

```sh
> sudo deluser newusername

Removing crontab ...
Removing user `newuser' ...
Done.
```

## Groups

Groups are collections of users who share common permissions to access files and directories. Each group has a unique group ID (`GID`) that identifies it to the system. You can use the `id` command to display the `GID` of the current user.

```sh
> id
uid=1000(tinymemo) gid=1000(tinymemo) groups=1000(tinymemo),4(adm),27(sudo),44(video),50(staff)
```

As you can see, the `GID` of the current user is `1000`. You can also use the `-g` option to display only the `GID`, or you can use the `id -g` command to display only the `GID`.

### Add a User to a Group

A user can be a member of multiple groups. To add a user to a group, you can use the `usermod` command. This command will add the specified user to the specified group.

```sh
> sudo usermod -a -G groupname username
```

The `-a` option tells the `usermod` command to append the user to the group instead of replacing the user's current groups. The `-G` option tells the `usermod` command to add the user to the specified group.

### Remove a User from a Group

To remove a user from a group, you can use the `gpasswd` command. This command will remove the specified user from the specified group.

```sh
> sudo gpasswd -d username groupname

Removing user newuser from group tinkink
```

### Inspect User Groups

To inspect the groups that a user belongs to, you can use the `groups` command. This command will display the groups that the specified user belongs to.

```sh
> groups newuser

newuser : newuser tinkink
```

### Create and Delete a Group

To create a new group in Linux, you can use the `addgroup` command. This command will create a new group with the specified group name and `GID`. If you don't specify a `GID`, the `addgroup` command will automatically generate a `GID` for the new group.

```sh
> sudo addgroup testgroup

sudo addgroup testgroup
Adding group `testgroup' (GID 1001) ...
Done.
```

To delete a group in Linux, you can use the `delgroup` command. This command will delete the specified group from the system.

```sh
> sudo delgroup testgroup

Removing group `testgroup' ...
Done.
```

## Permissions

After the long journey of understanding users and groups, we are finally ready to talk about permissions. Permissions are the rules that determine:

- who can access a file or directory and
- what they can do with it

These permissions can be set for three types of users (who):

- the owner of the file or directory
- members of the group that owns the file or directory
- and all other users on the system.

There are three types of permissions (what type can do): `read`, `write`, and `execute`.

So the permissions for a file or directory can be set for three types of users (who) and three types of permissions (what type can do).

### Inspect Permissions

To view the permissions of a file or directory, you can use the `ls -l` command. This command will display the permissions of the specified file or directory.

```sh
> ls -l

-rw-r--r-- 1 tinymemo tinymemo  0 Aug  1 16:00 file.txt
drwxr-xr-x 2 tinymemo tinymemo 40 Aug  1 16:00 directory
-rwxr-xr-x 1 tinymemo tinymemo  0 Aug  1 16:00 script.sh
```

The first character of each line in the output of the `ls -l` command is the file type. The most common types are:

- `-` for a regular file
- `d` for a directory

The next nine characters are the permissions for the file or directory. The first three characters are the permissions for the owner of the file or directory. The next three characters are the permissions for the group that owns the file or directory. The last three characters are the permissions for all other users on the system.

The first character of each group of three characters is the `read` permission. The second character of each group of three characters is the `write` permission. The third character of each group of three characters is the `execute` permission.

Take `file.txt` as example:

- First three characters are `rw-`, which means the owner of the file has `read` and `write` permissions, but not `execute` permissions.
- Next three characters are `r--`, which means the group that owns the file (`tinymemo` group) has `read` permissions, but not `write` or `execute` permissions.
- Last three characters are `r--`, which means all other users on the system have `read` permissions, but not `write` or `execute` permissions.

### Change Permissions

To change the permissions of a file or directory, you can use the `chmod` command. This command will change the permissions of the specified file or directory. Following are some examples of how to use the `chmod` command:

```sh
> chmod +x file.txt
> chmod -x file.txt
> chmod u+x file.txt
> chmod g+x file.txt
> chmod o+x file.txt
> chmod 755 file.txt
> chmod 644 file.txt
> chmod 777 file.txt
> chmod 400 file.txt
```

The first syntax of permissions are `[role][operator][permission]`.

- The `role` can be `u` for the owner of the file or directory, `g` for the group that owns the file or directory, or `o` for all other users on the system (all users except the owner and the group that owns the file or directory). If you omit the `role`, it will apply to all three roles.
- The `operator` can be `+` to add a permission, `-` to remove a permission, or `=` to set a permission.
- The `permission` can be `r` for `read`, `w` for `write`, or `x` for `execute`.

The second syntax of permissions are three numbers, each number represents the permissions for the owner, the group, and all other users on the system. For example, the first number represents the permissions for the owner, the second number represents the permissions for the group, and the third number represents the permissions for all other users on the system.

The range of each number is from `0` to `7`. In fact, it's a three-digit binary number. The first digit represents the `read` permission, the second digit represents the `write` permission, and the third digit represents the `execute` permission. If the digit is `1`, it means the permission is set. If the digit is `0`, it means the permission is not set. For example, `7` is `111` in binary, which means all three permissions are set. `6` is `110` in binary, which means the `read` and `write` permissions are set, but the `execute` permission is not set.

So, if we want to set the permissions of a file to `rw-r--r--`, we can calculate the binary number of each digit:

- `rw-` is `110` in binary, which is `6` in decimal.
- `r--` is `100` in binary, which is `4` in decimal.
- `r--` is `100` in binary, which is `4` in decimal.

We can use the following command:

```sh
> chmod 644 file.txt
```

### Change Ownership

To change the ownership of a file or directory, you can use the `chown` command. This command will change the ownership of the specified file or directory. Following are some examples of how to use the `chown` command:

```sh
> chown tinymemo:tinymemo file.txt
> chown tinymemo: file.txt
> chown :tinymemo file.txt
> chown tinymemo file.txt
```

The first syntax of ownership are `[user]:[group]`. You can omit `[user]` or `[group]`, it will just change what you specified.

You can user `-R` to change the ownership of a directory recursively.

### Common Permissions

Following are some common permissions:

- `644` for files, it's also the default permission for files
- `755` for directories, it's also the default permission for directories
- `600` or `400` for sensitive files, such as SSH private key
- `777` for temporary files, such as cache files, or if you are developing, debugging or testing something, it's strongly not recommended to use this permission in production environment

You may noticed the difference between `644` and `755` is the `execute` permission for the owner of the file or directory. Why a directory needs the `execute` permission for the owner? That's because accessing a directory is actually "executing" the directory, which means you can list the files and directories in the directory.

## Final Tips

Here are some final tips:

First, the permissions of a file or directory also depends on the permissions of its parent directory.

For example, if you don't have the `execute` permission for a directory, you can't access the files and directories in the directory, even if you have the `read` permission for the files and directories. The most common example is the `home` directory, you can't access other users' home directories, even if you have the `read` permission for the files and directories in the home directories.

So if you want to share a file or directory with other users, you should better put it in a directory that all users have the `execute` permission (outside `home` directory), otherwise you may encounter some permission issues.

Second, the `SELinux` may also affect the permissions of a file or directory. If you encounter some permission issues, and you are absolutely sure that the permissions are correct, you can try to disable `SELinux` to see if it works.

Last but not least, you should always use the least privilege principle when setting permissions. For example, if you want to share a file with other users, you should only give them the `read` permission, not the `write` permission. If you are running a web server, you should only give the web server the `read` and `execute` permissions, not the `write` permission.

## Summary

In this article, we learned about users, groups, and permissions. We learned how to create users and groups, how to add users to groups, how to change the ownership of a file or directory, and how to change the permissions of a file or directory. Hope you enjoy it, see you next time!
