# CentOS 7 中启用 Google Authenticator 进行双因素验证（2FA / MFA）

## 双因素验证

双因素验证（2FA）是指在登录时，需要提供两组互相独立的凭证，用于验证使用者的身份。有时候也会使用多于 2 个的凭证，叫作多因素验证（MFA）。

双因素验证可以有效防御密码破解、密码泄露等情况下带来的安全风险，即使攻击者掌握了密码，也只有一组凭证，无法通过双因素验证。

一般来说双因素验证的第一组凭证就是我们所熟知的密码，而第二组凭证可能是 Google Authenticator 之类的 token 码，也可能是手机短信验证等。

Google Authenticator 验证码本质是基于时间戳计算出来的一组数字，每 30s 会更新一次。正式的术语叫“基于时间的一次性密码算法”（TOTP）。它不需要联网，可以在任何时候进行验证。

## 安装 Google Authenticator 并初始化

首先添加 EPEL 源：

```sh
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```

> 如果使用的不是 root 用户，则可能需要使用`sudo`来运行命令。

接下来安装 Google Authenticator：

```sh
yum install google-authenticator
```

接下来需要初始化：

```sh
google-authenticator
```

页面上会显示一个巨大的二维码，此时使用 Google Authenticator 或者类似的验证器应用扫描二维码即可将它添加到手机中。

接着应用会询问一些问题，一路输入`y`并回车即可。

```sh
# 是否使用基于时间的token？
Do you want authentication tokens to be time-based (y/n) y
# 是否更新配置文件？
Do you want me to update your "/root/.google_authenticator" file (y/n) y
# 是否设置不允许重复使用同一token？
Do you want to disallow multiple uses of the same authentication
token? This restricts you to one login about every 30s, but it increases
your chances to notice or even prevent man-in-the-middle attacks (y/n) y
# 是否允许前后1分钟时间误差范围内的token？
By default, tokens are good for 30 seconds. In order to compensate for
possible time-skew between the client and the server, we allow an extra
token before and after the current time. If you experience problems with
poor time synchronization, you can increase the window from its default
size of +-1min (window size of 3) to about +-4min (window size of 17 acceptable tokens).
Do you want to do so? (y/n) y
```

至此，Google Authenticator 已经安装完成。

## PAM 认证

PAM（pluggable authentication modules） 认证是 Linux 系统中一种插件化的认证方式，当你需要增加一种新的认证方式时，只需要增加对应的 PAM 模块即可。PAM 可以被各种程序调用，ssh 远程登录用的 sshd 就用到了 PAM。

上面我们安装的 Google Authenticator 也是一个 PAM 模块。

因此我们首先在 sshd 用到的 PAM 配置中启用 Google Authenticator 认证。在`/etc/pam.d/sshd`第2行后添加一行：

```
auth required pam_google_authenticator.so
```

注意位置，添加完成后如下：

```
#%PAM-1.0
auth       required     pam_sepermit.so
auth       required     pam_google_authenticator.so
auth       substack     password-auth

# 省略其他行
......
```

接下来还需要在 sshd 的配置中启用挑战应答认证，在`/etc/ssh/sshd_config`中找到下述配置，并修改为`yes`：

```
# Change to no to disable s/key passwords
ChallengeResponseAuthentication yes
#ChallengeResponseAuthentication no
```

重启 sshd 服务，即可使用二次认证了：

```sh
systemctl restart sshd.service
```

## 配置文件

Google Authenticator 配置文件在 `/root/.google_authenticator` 中，如果需要查看，可以使用`cat /root/.google_authenticator`。

该配置文件由3部分组成：密钥 + 配置 + 恢复码。

密钥决定 token 的结果，相同密钥会产生相同的 token，因此如果希望多台服务器使用同一个 token，可以将它们的密钥设置为相同的值。

恢复码用于当验证器丢失时的紧急恢复，应当将它们保存在安全的地方。
