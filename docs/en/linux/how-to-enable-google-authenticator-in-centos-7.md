## Enable Google Authenticator for two-factor authentication (2FA / MFA) in CentOS 7

## Two-factor authentication

Two-factor authentication (2FA) is the process of providing two separate sets of credentials to authenticate a user during login. Sometimes more than 2 credentials are also used, called Multi-Factor Authentication (MFA).

Two-factor authentication can effectively defend against security risks caused by password cracking, password leakage, etc. Even if an attacker has the password, there is only one set of credentials that cannot pass two-factor authentication.

Generally speaking, the first set of credentials for two-factor authentication is the password we know, while the second set of credentials may be a token code such as Google Authenticator, or cell phone SMS authentication.

Google Authenticator authentication code is essentially a set of numbers calculated based on a timestamp, which is updated every 30s. The official term is "time-based one-time password algorithm" (TOTP). It does not require an Internet connection and can be used at any time for authentication.

## Install Google Authenticator and initialize it

First add the EPEL source.

```sh
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```

> If you are not using the root user, you may need to use ``sudo`` to run the command.

Next, install Google Authenticator.

```sh
yum install google-authenticator
```

Next you need to initialize.

```sh
google-authenticator
```

The page will show a huge QR code, at this point use Google Authenticator or a similar authenticator app to scan the QR code and add it to your phone.

Then the app will ask some questions, just type ``y`` all the way and enter.

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
Do you want to do so?

At this point, Google Authenticator has been installed.

## PAM Authentication

PAM (pluggable authentication modules) authentication is a pluggable authentication method in Linux system, when you need to add a new authentication method, just add the corresponding PAM module.

The Google Authenticator we installed above is also a PAM module.

So let's first enable Google Authenticator authentication in the PAM configuration used by sshd. At the end of `/etc/pam.d/sshd` add the line

```
auth required pam_google_authenticator.so
```

Next, you need to enable challenge authentication in the sshd configuration, find the following configuration in `/etc/ssh/sshd_config` and change it to ``yes``.

```
# Change to no to disable s/key passwords
ChallengeResponseAuthentication yes
#ChallengeResponseAuthentication no
```

Restart the sshd service to use secondary authentication.

```sh
systemctl restart sshd.service
```

## Configuration file

The Google Authenticator configuration file is in ``/root/.google_authenticator``, if you need to see it, you can use ``cat /root/.google_authenticator``.

The configuration file consists of 3 parts: key + configuration + recovery code.

The key determines the result of the token, the same key will produce the same token, so if you want multiple servers to use the same token, you can set their keys to the same value.

Recovery codes are used for emergency recovery when the authenticator is lost and should be kept in a safe place.
