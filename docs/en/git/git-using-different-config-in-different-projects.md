# GIT: Use different config (git username / gmail or ssh keys) in different projects

<Validator lang="zh-hans" :platform-list="['Git 2.37']" date="2023-03-06" />

## Background

When using Git, we often configure some basic configuration items, such as the user name (`user.name`) and the email (`user.email`). If they are not configured, the first time you use Git to commit code will report an error:

```
Make sure you configure your 'user.email' and 'user.name' in git
```

We can fix this by using the `git config` command to set the values.

```sh
git config --global user.name "Tinymemo"
git config --global user.email "tinymemo@tinkink.net"
```

This command actually writes two configuration items to the global configuration file: `user.name` and `user.email`. We can try opening the configuration file (usually located at `~/.gitconfig` or `C:\Users\<username>\.gitconfig`):

```
[user]
        name = Tinymemo
        email = tinymemo
```

If we don't run the command with `--global` option, the configuration file will be written to the current directory, usually located at `.git/config`.

## Use different config in different projects

When we want to participate in projects with different identities, we need to use different configuration in each project. But we don't want to write separate configuration in each project, because we had to use the global configuration if the project doesn't have a configuration. So we need a better way.

Fortunately, Git provides the `includeIf` directive, which can be used to specify different configuration for different paths.

Assume we have the following two paths:

- `~/work` the corresponding user name and email is `Tinymemo` / `tinymemo@somework.com`
- `~/hobby` the corresponding user name and email is `Tinymemo` / `tinymemo@somehobby.com`

First, we create two separate configuration files:

`~/.gitconfig-work`：

```
[user]
        name = Tinymemo
        email = tinymemo@somework.com
```

`~/.gitconfig-hobby`：

```
[user]
        name = Tinymemo
        email = tinymemo@somehobby.com
```

Then we add the following lines to the global configuration file `~/.gitconfig`, please notice the last slash in the path:

```
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
[includeIf "gitdir:~/hobby/"]
    path = ~/.gitconfig-hobby
```

Then we can verify in the corresponding directory of the project:

```sh
# ~/work/project1
git config user.name // Tinymemo
git config user.email // tinymemo@somework.com

# ~/hobby/project2
git config user.name // Tinymemo
git config user.email // tinymemo@somehobby.com
```

> Note: you must run `git config` command in the project directory, otherwise it will use the global configuration.

So we can make it easy to use different configuration in different projects.

## Use different config for public/private key

Then configuration above makes it easy to use different username and email for different projects, but we also want to use different SSH public/private key for different projects in some cases.

First, we need to create a new public key. If we have a public key already, we can skip this step.

```sh
cd ~/.ssh
ssh-keygen -t rsa
```

Please note the file name, can not be the default `id_rsa` name, otherwise it will conflict with the existing public key.

```
Enter file in which to save the key (/Users/toobug/.ssh/id_rsa): id_rsa_hobby
```

Just press enter all the way.

Then we can add a new configuration item to the configuration file, to specify the new public key for the `ssh` command:

```
[core]
    sshCommand = "ssh -i ~/.ssh/id_rsa_hobby -F /dev/null"
```

After this, we can use different public/private keys for different projects:

## Summary

By using `[includeIf]` directive in global configuration, we can easily use different username, email and public/private key for different projects in different directories.
