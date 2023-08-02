# GIT：在不同的項目中使用不同的配置項（git用戶名/email和ssh公鑰）

<Validator lang="zh-hant" :platform-list="['Git 2.37']" date="2023-03-06" />

## 背景

在使用 Git 時，我們常常會配置一些基本的配置項，例如用戶名（`user.name`）和郵箱（`user.email`）等。如果沒有配置的話，初次使用 Git 提交代碼會報錯：

```
Make sure you configure your 'user.email' and 'user.name' in git
```

通常我們會使用下面的命令來配置：

```sh
git config --global user.name "Tinymemo"
git config --global user.email "tinymemo@tinkink.net"
```

這段命令實際上是在全局配置文件中寫入了兩個配置項，一個是 `user.name`，一個是 `user.email`。我們可以嘗試打開配置文件（一般位於`~/.gitconfig`或者`C:\Users\<username>\.gitconfig`）：

```
[user]
        name = Tinymemo
        email = tinymemo
```

如果上面的配置命令不加`--global`，則會寫入當前項目目錄的配置文件，而不是全局配置文件，一般位於`.git/config`。

## 不同項目使用不同的配置項

當我們需要以不同的身份參與到不同的項目中時，就需要在各個項目中使用不同的配置項。按上方描述，我們可以在項目配置中寫入單獨的配置，但是因爲需要針對每個項目進行配置，而且一旦項目沒有配置時就會使用全局配置，這可能不是我們期望的結果。因此我們需要有一種更好的機制。

Git 爲我們提供了`includeIf`指令，可以很方便地實現針對不同路徑的項目採用不同配置的功能。

假設我們有如下兩個路徑：

- `~/work`對應的用戶名和郵箱是`Tinymemo` / `tinymemo@somework.com`
- `~/hobby`對應的用戶名和郵箱是`Tinymemo` / `tinymemo@somehobby.com`

首先建立 2 個單獨的配置文件，分別寫好對應的配置：

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

然後在全局配置文件`~/.gitconfig`中引入它們，尤其注意路徑最後的斜槓不能省略：

```
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
[includeIf "gitdir:~/hobby/"]
    path = ~/.gitconfig-hobby
```

接下來在對應目錄的項目中就可以驗證了：

```sh
# ~/work/project1
git config user.name // Tinymemo
git config user.email // tinymemo@somework.com

# ~/hobby/project2
git config user.name // Tinymemo
git config user.email // tinymemo@somehobby.com
```

> 注意：必須在項目目錄下執行`git config`命令，否則會使用全局配置。

這樣就能很方便地實現在不同的項目中使用不同的 Git 配置項。

## 區分公鑰/私鑰

上面的配置實現了不同項目的 Git 使用不同的用戶名和郵箱，在某些場景下，我們還希望不同的項目能使用不同的 SSH 公鑰/私鑰對。要達到這個目的也很簡單。

首先，我們需要建立一個新的公鑰，如果已經有現成的，則可以跳過。

```sh
cd ~/.ssh
ssh-keygen -t rsa
```

注意文件名不要使用默認的`id_rsa`，否則會和已有的公鑰衝突。

```
Enter file in which to save the key (/Users/tinymemo/.ssh/id_rsa): id_rsa_hobby
```

剩下的一路回車即可。

接下來只需要在對應的配置文件中添加一個新的配置項，指定`ssh`命令使用新生成的公鑰：

```
[core]
    sshCommand = "ssh -i ~/.ssh/id_rsa_hobby -F /dev/null"
```

這樣就能實現不同項目使用不同公鑰/私鑰。

## 總結

在 Git 的全局配置中使用`[includeIf]`指令，可以很方便地實現針對不同路徑的項目採用不同配置的功能，這樣就可以在不同的項目中使用不同的用戶名、郵箱和公鑰/私鑰。
