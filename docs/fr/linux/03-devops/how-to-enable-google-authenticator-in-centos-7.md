# Activer Google Authenticator pour l'authentification à deux facteurs (2FA / MFA) dans CentOS 7

## Authentification à deux facteurs

L'authentification à deux facteurs (2FA) est le processus qui consiste à fournir deux ensembles distincts d'identifiants pour authentifier un utilisateur lors de la connexion. Parfois, plus de 2 identifiants sont également utilisés, ce qu'on appelle l'authentification multifactorielle (MFA).

L'authentification à deux facteurs peut efficacement défendre contre les risques de sécurité causés par le craquage de mot de passe, la fuite de mot de passe, etc. Même si un attaquant possède le mot de passe, il n'a qu'un seul ensemble d'identifiants qui ne peut pas passer l'authentification à deux facteurs.

En général, le premier ensemble d'identifiants pour l'authentification à deux facteurs est le mot de passe que nous connaissons, tandis que le second ensemble d'identifiants peut être un code de jeton comme Google Authenticator, ou une authentification par SMS sur téléphone portable.

Le code d'authentification Google Authenticator est essentiellement un ensemble de chiffres calculés sur la base d'un horodatage, qui est mis à jour toutes les 30 secondes. Le terme officiel est "algorithme de mot de passe à usage unique basé sur le temps" (TOTP). Il ne nécessite pas de connexion Internet et peut être utilisé à tout moment pour l'authentification.

## Installer Google Authenticator et l'initialiser

D'abord, ajoutez la source EPEL.

```sh
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```

> Si vous n'utilisez pas l'utilisateur root, vous devrez peut-être utiliser ``sudo`` pour exécuter la commande.

Ensuite, installez Google Authenticator.

```sh
yum install google-authenticator
```

Ensuite, vous devez l'initialiser.

```sh
google-authenticator
```

La page affichera un énorme code QR, à ce moment-là, utilisez Google Authenticator ou une application d'authentification similaire pour scanner le code QR et l'ajouter à votre téléphone.

Ensuite, l'application vous posera quelques questions, tapez simplement `y` tout du long et appuyez sur Entrée.

```sh
# Voulez-vous utiliser des jetons basés sur le temps?
Do you want authentication tokens to be time-based (y/n) y
# Voulez-vous mettre à jour le fichier de configuration?
Do you want me to update your "/root/.google_authenticator" file (y/n) y
# Voulez-vous interdire les utilisations multiples du même jeton?
Do you want to disallow multiple uses of the same authentication
This restricts you to one login about every 30s, but it increases
your chances to notice or even prevent man-in-the-middle attacks (y/n) y
# Autorisez-vous les jetons avec une erreur de temps de 1 minute avant et après?
By default, tokens are good for 30 seconds.
possible time-skew between the client and the server, we allow an extra
token before and after the current time.
poor time synchronization, you can increase the window from its default
If you experience problems with poor time synchronization, you can increase the window from its default size of +1min (window size of 3) to about +-4min (window size of 17 acceptable tokens).
Do you want to do so? (y/n) y
```

À ce stade, Google Authenticator a été installé.

## Authentification PAM

L'authentification PAM (pluggable authentication modules) est une méthode d'authentification enfichable dans le système Linux, lorsque vous avez besoin d'ajouter une nouvelle méthode d'authentification, il suffit d'ajouter le module PAM correspondant.

Le Google Authenticator que nous avons installé ci-dessus est également un module PAM.

Alors, activons d'abord l'authentification Google Authenticator dans la configuration PAM utilisée par sshd. Ajoutez la ligne ci-dessous à la deuxième ligne de `/etc/pam.d/sshd`:

```
auth required pam_google_authenticator.so
```

Remarque: la position de cette ligne est très importante, le fichier modifié devrait ressembler à ceci:

```
#%PAM-1.0
auth       required     pam_sepermit.so
auth       required     pam_google_authenticator.so
auth       substack     password-auth

# other lines
......
```

Ensuite, vous devez activer l'authentification par défi dans la configuration sshd, trouvez la configuration suivante dans `/etc/ssh/sshd_config` et changez-la en `yes`.

```
# Change to no to disable s/key passwords
ChallengeResponseAuthentication yes
#ChallengeResponseAuthentication no
```

Redémarrez le service sshd pour utiliser l'authentification secondaire.

```sh
systemctl restart sshd.service
```

## Fichier de configuration

Le fichier de configuration de Google Authenticator se trouve dans `/root/.google_authenticator`, si vous avez besoin de le voir, vous pouvez utiliser `cat /root/.google_authenticator`.

Le fichier de configuration se compose de 3 parties: clé + configuration + code de récupération.

La clé détermine le résultat du jeton, la même clé produira le même jeton, donc si vous voulez que plusieurs serveurs utilisent le même jeton, vous pouvez définir leurs clés à la même valeur.

Les codes de récupération sont utilisés pour la récupération d'urgence lorsque l'authentificateur est perdu et doivent être conservés dans un endroit sûr.