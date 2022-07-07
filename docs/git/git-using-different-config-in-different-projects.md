# GIT：在不同的项目中使用不同的配置项（git用户名/email和ssh公钥）

## 背景

在使用 Git 时，我们常常会配置一些基本的配置项，例如用户名（`user.name`）和邮箱（`user.email`）等。如果没有配置的话，初次使用 Git 提交代码会报错：

```
Make sure you configure your 'user.email' and 'user.name' in git
```

通常我们会使用下面的命令来配置：

```sh
git config --global user.name "Tinymemo"
git config --global user.email "tinymemo@tinkink.net"
```

这段命令实际上是在全局配置文件中写入了两个配置项，一个是 `user.name`，一个是 `user.email`。我们可以尝试打开配置文件（一般位于`~/.gitconfig`或者`C:\Users\<username>\.gitconfig`）：

```
[user]
        name = Tinymemo
        email = tinymemo
```

如果上面的配置命令不加`--global`，则会写入当前项目目录的配置文件，而不是全局配置文件，一般位于`.git/config`。

## 不同项目使用不同的配置项

当我们需要以不同的身份参与到不同的项目中时，就需要在各个项目中使用不同的配置项。按上方描述，我们可以在项目配置中写入单独的配置，但是因为需要针对每个项目进行配置，而且一旦项目没有配置时就会使用全局配置，这可能不是我们期望的结果。因此我们需要有一种更好的机制。

Git 为我们提供了`includeIf`指令，可以很方便地实现针对不同路径的项目采用不同配置的功能。

假设我们有如下两个路径：

- `~/work`对应的用户名和邮箱是`Tinymemo` / `tinymemo@somework.com`
- `~/hobby`对应的用户名和邮箱是`Tinymemo` / `tinymemo@somehobby.com`

首先建立 2 个单独的配置文件，分别写好对应的配置：

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

然后在全局配置文件`~/.gitconfig`中引入它们，尤其注意路径最后的斜杠不能省略：

```
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
[includeIf "gitdir:~/hobby/"]
    path = ~/.gitconfig-hobby
```

接下来在对应目录的项目中就可以验证了：

```sh
# ~/work/project1
git config user.name // Tinymemo
git config user.email // tinymemo@somework.com

# ~/hobby/project2
git config user.name // Tinymemo
git config user.email // tinymemo@somehobby.com
```

这样就能很方便地实现在不同的项目中使用不同的 Git 配置项。

## 区分公钥/私钥

上面的配置实现了不同项目的 Git 使用不同的用户名和邮箱，在某些场景下，我们还希望不同的项目能使用不同的 SSH 公钥/私钥对。要达到这个目的也很简单。

首先，我们需要建立一个新的公钥，如果已经有现成的，则可以跳过。

```sh
cd ~/.ssh
ssh-keygen -t rsa
```

注意文件名不要使用默认的`id_rsa`，否则会和已有的公钥冲突。

```
Enter file in which to save the key (/Users/toobug/.ssh/id_rsa): id_rsa_hobby
```

剩下的一路回车即可。

接下来只需要在对应的配置文件中添加一个新的配置项，指定`ssh`命令使用新生成的公钥：

```
[core]
    sshCommand = "ssh -i ~/.ssh/id_rsa_hobby -F /dev/null"
```

这样就能实现不同项目使用不同公钥/私钥。

## 总结

在 Git 的全局配置中使用`[includeIf]`指令，可以很方便地实现针对不同路径的项目采用不同配置的功能，这样就可以在不同的项目中使用不同的用户名、邮箱和公钥/私钥。
