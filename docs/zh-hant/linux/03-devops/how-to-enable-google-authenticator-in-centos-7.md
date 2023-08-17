# CentOS 7 中啓用 Google Authenticator 進行雙因素驗證（2FA / MFA）

## 雙因素驗證

雙因素驗證（2FA）是指在登錄時，需要提供兩組互相獨立的憑證，用於驗證使用者的身份。有時候也會使用多於 2 個的憑證，叫作多因素驗證（MFA）。

雙因素驗證可以有效防禦密碼破解、密碼泄露等情況下帶來的安全風險，即使攻擊者掌握了密碼，也只有一組憑證，無法通過雙因素驗證。

一般來說雙因素驗證的第一組憑證就是我們所熟知的密碼，而第二組憑證可能是 Google Authenticator 之類的 token 碼，也可能是手機短信驗證等。

Google Authenticator 驗證碼本質是基於時間戳計算出來的一組數字，每 30s 會更新一次。正式的術語叫“基於時間的一次性密碼算法”（TOTP）。它不需要聯網，可以在任何時候進行驗證。

## 安裝 Google Authenticator 並初始化

首先添加 EPEL 源：

```sh
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```

> 如果使用的不是 root 用戶，則可能需要使用`sudo`來運行命令。

接下來安裝 Google Authenticator：

```sh
yum install google-authenticator
```

接下來需要初始化：

```sh
google-authenticator
```

頁面上會顯示一個巨大的二維碼，此時使用 Google Authenticator 或者類似的驗證器應用掃描二維碼即可將它添加到手機中。

接着應用會詢問一些問題，一路輸入`y`並回車即可。

```sh
# 是否使用基於時間的token？
Do you want authentication tokens to be time-based (y/n) y
# 是否更新配置文件？
Do you want me to update your "/root/.google_authenticator" file (y/n) y
# 是否設置不允許重複使用同一token？
Do you want to disallow multiple uses of the same authentication
token? This restricts you to one login about every 30s, but it increases
your chances to notice or even prevent man-in-the-middle attacks (y/n) y
# 是否允許前後1分鐘時間誤差範圍內的token？
By default, tokens are good for 30 seconds. In order to compensate for
possible time-skew between the client and the server, we allow an extra
token before and after the current time. If you experience problems with
poor time synchronization, you can increase the window from its default
size of +-1min (window size of 3) to about +-4min (window size of 17 acceptable tokens).
Do you want to do so? (y/n) y
```

至此，Google Authenticator 已經安裝完成。

## PAM 認證

PAM（pluggable authentication modules） 認證是 Linux 系統中一種插件化的認證方式，當你需要增加一種新的認證方式時，只需要增加對應的 PAM 模塊即可。PAM 可以被各種程序調用，ssh 遠程登錄用的 sshd 就用到了 PAM。

上面我們安裝的 Google Authenticator 也是一個 PAM 模塊。

因此我們首先在 sshd 用到的 PAM 配置中啓用 Google Authenticator 認證。在`/etc/pam.d/sshd`第2行後添加一行：

```
auth required pam_google_authenticator.so
```

注意位置，添加完成後如下：

```
#%PAM-1.0
auth       required     pam_sepermit.so
auth       required     pam_google_authenticator.so
auth       substack     password-auth

# 省略其他行
......
```

接下來還需要在 sshd 的配置中啓用挑戰應答認證，在`/etc/ssh/sshd_config`中找到下述配置，並修改爲`yes`：

```
# Change to no to disable s/key passwords
ChallengeResponseAuthentication yes
#ChallengeResponseAuthentication no
```

重啓 sshd 服務，即可使用二次認證了：

```sh
systemctl restart sshd.service
```

## 配置文件

Google Authenticator 配置文件在 `/root/.google_authenticator` 中，如果需要查看，可以使用`cat /root/.google_authenticator`。

該配置文件由3部分組成：密鑰 + 配置 + 恢復碼。

密鑰決定 token 的結果，相同密鑰會產生相同的 token，因此如果希望多臺服務器使用同一個 token，可以將它們的密鑰設置爲相同的值。

恢復碼用於當驗證器丟失時的緊急恢復，應當將它們保存在安全的地方。
