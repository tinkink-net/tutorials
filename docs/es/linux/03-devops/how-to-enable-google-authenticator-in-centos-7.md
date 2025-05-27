# Habilitar Google Authenticator para autenticación de dos factores (2FA / MFA) en CentOS 7

## Autenticación de dos factores

La autenticación de dos factores (2FA) es el proceso de proporcionar dos conjuntos separados de credenciales para autenticar a un usuario durante el inicio de sesión. A veces también se utilizan más de 2 credenciales, lo que se denomina Autenticación Multifactor (MFA).

La autenticación de dos factores puede defender eficazmente contra los riesgos de seguridad causados por el descifrado de contraseñas, la filtración de contraseñas, etc. Incluso si un atacante tiene la contraseña, solo hay un conjunto de credenciales que no puede pasar la autenticación de dos factores.

En general, el primer conjunto de credenciales para la autenticación de dos factores es la contraseña que conocemos, mientras que el segundo conjunto de credenciales puede ser un código de token como Google Authenticator, o la autenticación por SMS del teléfono móvil.

El código de autenticación de Google Authenticator es esencialmente un conjunto de números calculados en base a una marca de tiempo, que se actualiza cada 30 segundos. El término oficial es "algoritmo de contraseña de un solo uso basado en tiempo" (TOTP). No requiere conexión a Internet y se puede utilizar en cualquier momento para la autenticación.

## Instalar Google Authenticator e inicializarlo

Primero añade la fuente EPEL.

```sh
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```

> Si no estás utilizando el usuario root, es posible que necesites usar ``sudo`` para ejecutar el comando.

A continuación, instala Google Authenticator.

```sh
yum install google-authenticator
```

Luego necesitas inicializarlo.

```sh
google-authenticator
```

La página mostrará un enorme código QR, en este momento usa Google Authenticator o una aplicación de autenticación similar para escanear el código QR y añadirlo a tu teléfono.

Luego la aplicación te hará algunas preguntas, simplemente escribe `y` todo el tiempo y presiona enter.

```sh
# ¿Quieres usar tokens basados en tiempo?
Do you want authentication tokens to be time-based (y/n) y
# ¿Quieres actualizar el archivo de configuración?
Do you want me to update your "/root/.google_authenticator" file (y/n) y
# ¿Quieres establecer la prohibición de múltiples usos del mismo token?
Do you want to disallow multiple uses of the same authentication
This restricts you to one login about every 30s, but it increases
your chances to notice or even prevent man-in-the-middle attacks (y/n) y
# ¿Permites tokens con un error de tiempo de 1 minuto antes y después?
By default, tokens are good for 30 seconds.
possible time-skew between the client and the server, we allow an extra
token before and after the current time.
poor time synchronization, you can increase the window from its default
If you experience problems with poor time synchronization, you can increase the window from its default size of +1min (window size of 3) to about +-4min (window size of 17 acceptable tokens).
Do you want to do so? (y/n) y
```

En este punto, Google Authenticator ha sido instalado.

## Autenticación PAM

La autenticación PAM (módulos de autenticación conectables) es un método de autenticación conectable en el sistema Linux, cuando necesitas añadir un nuevo método de autenticación, solo tienes que añadir el módulo PAM correspondiente.

El Google Authenticator que instalamos anteriormente también es un módulo PAM.

Así que primero habilitemos la autenticación de Google Authenticator en la configuración PAM utilizada por sshd. Añade la línea debajo de la segunda línea de `/etc/pam.d/sshd`:

```
auth required pam_google_authenticator.so
```

Nota: la posición de esta línea es muy importante, el archivo modificado debería ser así:

```
#%PAM-1.0
auth       required     pam_sepermit.so
auth       required     pam_google_authenticator.so
auth       substack     password-auth

# otras líneas
......
```

A continuación, necesitas habilitar la autenticación por desafío en la configuración de sshd, encuentra la siguiente configuración en `/etc/ssh/sshd_config` y cámbiala a `yes`.

```
# Cambiar a no para deshabilitar contraseñas s/key
ChallengeResponseAuthentication yes
#ChallengeResponseAuthentication no
```

Reinicia el servicio sshd para usar la autenticación secundaria.

```sh
systemctl restart sshd.service
```

## Archivo de configuración

El archivo de configuración de Google Authenticator está en `/root/.google_authenticator`, si necesitas verlo, puedes usar `cat /root/.google_authenticator`.

El archivo de configuración consta de 3 partes: clave + configuración + código de recuperación.

La clave determina el resultado del token, la misma clave producirá el mismo token, por lo que si quieres que varios servidores utilicen el mismo token, puedes establecer sus claves con el mismo valor.

Los códigos de recuperación se utilizan para la recuperación de emergencia cuando se pierde el autenticador y deben guardarse en un lugar seguro.