# Reenvío de Puertos en VSCode

VSCode proporciona una función de reenvío de puertos que te permite acceder al entorno de desarrollo local o remoto desde el mundo exterior. Esta característica es muy útil para propósitos de prueba y depuración.

## Antecedentes

A menudo desarrollamos en un entorno local o en un entorno de desarrollo remoto, que no puede ser accedido públicamente. Pero bajo algunas circunstancias, necesitamos acceder al entorno de desarrollo local o remoto desde el mundo exterior. Por ejemplo, necesitamos integrarnos con un servicio de terceros, o necesitamos probar la web o el servicio desde un dispositivo que no está en la misma red.

## Cómo Usar

Primero, inicia tu entorno de desarrollo local, asegúrate de que el servicio esté funcionando. Escuchará en un puerto específico, por ejemplo, `localhost:8080`.

Luego, en VSCode, encuentra la función "Ports" en el panel inferior. Verás un botón "Forward a Port". Haz clic en él e ingresa el número de puerto que deseas reenviar. Por ejemplo, `8080`.

![Port Forwarding](/attachments/vscode/port-forwarding/01.panel.png)

![Port Forwarding](/attachments/vscode/port-forwarding/02.input.png)

Si es la primera vez que utilizas esta función, se te pedirá que inicies sesión en tu cuenta de GitHub y autorices el acceso.

![Port Forwarding](/attachments/vscode/port-forwarding/03.sign-in.png)

Si estás usando MacOS, también se te pedirá que autorices el acceso del llavero a VSCode. Solo ingresa tu contraseña y haz clic en "Allow".

![Port Forwarding](/attachments/vscode/port-forwarding/04.keychain.png)

Luego espera unos segundos, y verás que el puerto se ha reenviado con éxito.

![Port Forwarding](/attachments/vscode/port-forwarding/05.success.png)

Ahora puedes acceder al entorno de desarrollo local a través de la URL reenviada. Por ejemplo, si reenviaste el puerto `8080`, puedes acceder a él a través de `https://xxx-1234.asse.devtunnels.ms` (la URL puede ser diferente).

![Port Forwarding](/attachments/vscode/port-forwarding/06.authorize.png)

Como puedes ver, cuando accedes a esta URL reenviada, todavía necesita ser autorizada. Solo haz clic en "Authorize". Esto satisface nuestros requisitos en la mayoría de los casos y garantiza la seguridad de nuestro entorno de desarrollo local.

Pero si quieres que el mundo exterior acceda a tu entorno de desarrollo local sin autorización, por ejemplo, un punto final de API o un webhook, puedes encontrar el registro en el panel "Ports" de VSCode, hacer clic derecho en él y hacerlo público.

> Ten en cuenta: Exponer tu entorno de desarrollo local al mundo exterior puede causar riesgos de seguridad. Asegúrate de entender los riesgos antes de hacer esto.

Por último, recuerda cerrar el reenvío de puertos cuando hayas terminado.

## Conclusión

En este artículo, presentamos la función de reenvío de puertos en VSCode. Esta función te permite acceder a tu entorno de desarrollo local o remoto desde el mundo exterior. Es muy útil para propósitos de prueba y depuración. Pero ten cuidado al exponer tu entorno de desarrollo local al mundo exterior, ya que puede causar riesgos de seguridad.