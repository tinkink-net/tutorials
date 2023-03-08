# CentOS 7でGoogle Authenticatorを有効にして2要素認証（2FA / MFA）を設定する

## 2要素認証

2要素認証（2FA）は、ログイン時にユーザーの認証に2つの別々の資格情報を提供するプロセスです。時には2つ以上の資格情報が使用され、マルチファクタ認証（MFA）と呼ばれます。

2要素認証は、パスワードクラッキング、パスワード漏洩などによるセキュリティリスクに対して効果的に防御することができます。攻撃者がパスワードを持っていても、2要素認証を通過することができない1つの資格情報しかありません。

一般的に、2要素認証の最初の資格情報は私たちが知っているパスワードであり、2番目の資格情報はGoogle Authenticatorのようなトークンコード、または携帯電話のSMS認証などである場合があります。

Google Authenticatorの認証コードは、タイムスタンプに基づいて計算された一連の数字であり、30秒ごとに更新されます。公式の用語は「タイムベースのワンタイムパスワードアルゴリズム」（TOTP）です。インターネット接続は必要なく、いつでも認証に使用できます。

## Google Authenticatorのインストールと初期化

まず、EPELソースを追加します。

```sh
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```

> rootユーザーを使用していない場合は、コマンドを実行するために ``sudo`` を使用する必要がある場合があります。

次に、Google Authenticatorをインストールします。

```sh
yum install google-authenticator
```

次に初期化する必要があります。

```sh
google-authenticator
```

ページには巨大なQRコードが表示されます。この時点で、Google Authenticatorまたは同様の認証アプリを使用してQRコードをスキャンし、電話に追加します。

その後、アプリはいくつかの質問をします。すべて `y` と入力してEnterを押してください。

```sh
# Do you want to use time-based tokens?
Do you want authentication tokens to be time-based (y/n) y
# Do you want to update the configuration file?
Do you want me to update your "/root/.google_authenticator" file (y/n) y
# Do you want to set disallow multiple uses of the same token?
Do you want to disallow multiple uses of the same authentication
This restricts you to one login about every 30s, but it increases
your chances to notice or even prevent man-in-the-middle attacks (y/n) y
# Do you allow tokens within a 1-minute time error before and after?
By default, tokens are good for 30 seconds.
possible time-skew between the client and the server, we allow an extra
token before and after the current time.
poor time synchronization, you can increase the window from its default
If you experience problems with poor time synchronization, you can increase the window from its default size of +1min (window size of 3) to about +-4min (window size of 17 acceptable tokens).
Do you want to do so? (y/n) y
```

この時点で、Google Authenticatorがインストールされました。

## PAM認証

PAM（プラグ可能認証モジュール）認証は、Linuxシステムのプラグ可能認証方法であり、新しい認証方法を追加する必要がある場合は、対応するPAMモジュールを追加するだけです。

上記でインストールしたGoogle AuthenticatorもPAMモジュールです。

したがって、まずsshdで使用されるPAM構成でGoogle Authenticator認証を有効にします。 `/etc/pam.d/sshd`の2番目の行の下に以下の行を追加します。

```
auth required pam_google_authenticator.so
```

注：この行の位置は非常に重要であり、変更されたファイルは次のようになる必要があります。

```
#%PAM-1.0
auth       required     pam_sepermit.so
auth       required     pam_google_authenticator.so
auth       substack     password-auth

# other lines
......
```

次に、sshdの設定でチャレンジ認証を有効にする必要があります。 `/etc/ssh/sshd_config`で次の設定を見つけ、 `yes`に変更してください。

```
# Change to no to disable s/key passwords
ChallengeResponseAuthentication yes
#ChallengeResponseAuthentication no
```

2次認証を使用するには、sshdサービスを再起動してください。

```sh
systemctl restart sshd.service
```

## 設定ファイル

Google Authenticatorの設定ファイルは `/root/.google_authenticator`にあります。必要に応じて、 `cat /root/.google_authenticator`を使用して表示できます。

設定ファイルには、キー+構成+回復コードの3つのパートがあります。

キーはトークンの結果を決定し、同じキーは同じトークンを生成します。したがって、複数のサーバーで同じトークンを使用する場合は、それらのキーを同じ値に設定できます。

回復コードは、認証アプリが紛失した場合の緊急回復に使用され、安全な場所に保管する必要があります。
