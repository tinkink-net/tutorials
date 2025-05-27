# Cómo usar Github Copilot y sus atajos

## Qué es Copilot

Copilot (<https://github.com/features/copilot/>) es una ayuda de codificación con IA proporcionada por Github que ofrece sugerencias de código basadas en aprendizaje de IA durante el proceso de codificación. En muchos casos, todo lo que se necesita son comentarios o nombres de funciones, y Copilot puede generar el código completo.

Copilot ya no es gratuito, el precio es de 10 dólares/mes o 100 dólares/año. Pero puedes probarlo gratis durante 2 meses. Visita la página de configuración de Github (<https://github.com/settings/copilot>) y haz clic en los botones para obtener acceso. Una vez que tengas acceso, puedes usar Copilot en Github.

![Captura de pantalla](/attachments/vscode/copilot-usage-and-shortcut/01.website.png)

## Instalación del plugin

Para usar Copilot, necesitas instalar un plugin, busca `Copilot` en el menú de plugins de VSCode para encontrar el plugin, el nombre es `Github Copilot`, la dirección correspondiente en el marketplace de plugins es <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot>, instálalo.

![Captura de pantalla de instalación](/attachments/vscode/copilot-usage-and-shortcut/02.install.png)

Después de la instalación, el plugin solicitará iniciar sesión en Github, simplemente sigue las instrucciones para iniciar sesión.

Sigue las instrucciones para iniciar sesión.

![Captura de pantalla de inicio de sesión](/attachments/vscode/copilot-usage-and-shortcut/03.login.png)

## Uso

En el uso normal, cuando Copilot da una sugerencia, el código sugerido aparece detrás de la posición del cursor y se muestra en texto gris. Si no quieres usar la sugerencia, simplemente continúa ingresando el código, si quieres usar el código sugerido, solo presiona la tecla Tab.

![Captura de pantalla de uso](/attachments/vscode/copilot-usage-and-shortcut/04.completion.png)

En VSCode, Copilot tiene un icono que necesita ser confirmado que el estado está activado. Cuando se ve similar a otros iconos y no tiene color de fondo, significa que está activado, en este momento cuando editas el archivo de código, Copilot automáticamente mostrará sugerencias de código. Cuando tiene un color de fondo (rojo, amarillo oscuro, etc.), significa que está desactivado. Si quieres cambiar el estado, simplemente haz clic en él y selecciona Globally.

![icono-de-estado](/attachments/vscode/copilot-usage-and-shortcut/05.icon.png)

## Teclas de atajo

Copilot también proporciona algunas teclas de atajo que se pueden usar fácilmente.

- Aceptar sugerencias: `Tab`
- Rechazar sugerencia: `Esc`
- Abrir Copilot: `Ctrl + Enter` (abrirá un panel separado mostrando 10 sugerencias)
- Siguiente sugerencia: `Alt/Option + ]`
- Sugerencia anterior: `Alt/Option + [`
- Activar Copilot en línea: `Alt/Option + \` (Copilot no ha dado una sugerencia o la sugerencia ha sido rechazada y quieres activarlo manualmente para que proporcione una sugerencia)

![Captura de pantalla de atajos](/attachments/vscode/copilot-usage-and-shortcut/06.shortcut.jpg)

## Proxy Http

Algunos usuarios (por ejemplo, los usuarios en China continental) pueden encontrar el problema de que Copilot no funciona, y la razón es que Copilot no puede acceder a Internet o a la API de Github. Puedes ver el siguiente mensaje de error en el panel de salida: `GitHub Copilot could not connect to server. Extension activation failed: "connect ETIMEDOUT xxx.xxx.xxx.xxx:443"`.

En este caso, necesitas configurar el proxy http.

Primero, obtén tu información de proxy http. Puedes preguntar a tu administrador de red por la dirección y el puerto del proxy, o si usas un software de proxy, puedes encontrar la dirección y el puerto del proxy en la configuración del software de proxy.

A continuación se muestra un ejemplo de uso del software de proxy `ClashX`, puedes encontrar la dirección y el puerto del proxy en la pestaña `Settings`, la dirección del proxy es `127.0.0.1:1080`.

![Captura de pantalla de proxy](/attachments/vscode/copilot-usage-and-shortcut/07.proxy.png)

Luego, abre la configuración de VSCode, busca `http.proxy`, y establece la dirección y el puerto del proxy.

![Captura de pantalla de configuración de proxy](/attachments/vscode/copilot-usage-and-shortcut/08.proxy-settings.png)

Después de configurar, reinicia VSCode, y Copilot debería funcionar normalmente.