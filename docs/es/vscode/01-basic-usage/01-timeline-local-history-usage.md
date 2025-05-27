# Utilizar la función de Cronología/Historial de Archivos Local de VSCode para prevenir la eliminación accidental de archivos

No hay nada más aterrador en el desarrollo de código que eliminar un archivo por error. A veces puede ser un cuadro emergente, un botón equivocado o un error de git, y los frutos de días de arduo trabajo desaparecen.

Sería bueno tener una función que pudiera registrar cada versión de tu código guardado localmente y recuperarlo en cualquier momento, para que no tengas que preocuparte por perder archivos por error.

En VSCode, esto solía hacerse instalando plugins (como el plugin Local History), pero después de la versión 1.44, VSCode tiene una función de Cronología incorporada. Este artículo verá cómo usar la función de Cronología para prevenir la pérdida de archivos por error.

## Uso

Cuando abres un archivo de código, aparecerá un panel "TIMELINE" en el lado izquierdo, debajo del panel de archivos, que es la cronología.

![Panel TIMELINE](/attachments/vscode/timeline-local-history-usage/01.panel.png)

Después de que el archivo ha sido modificado y guardado, aparece un nuevo nodo en la cronología, que es la versión histórica del archivo de código.

![versiones-históricas](/attachments/vscode/timeline-local-history-usage/02.timeline-versions.png)

> Además de "Guardar", los commits de Git, el cambio de nombre de archivos y otras acciones también se muestran en el panel como una versión.

Al hacer clic en una versión, aparecerá una pantalla de comparación con el archivo actual, para que puedas ver qué ha cambiado desde la versión histórica hasta la última versión.

Al hacer clic derecho en una versión, se revela una serie de menús.

![Historial de Versiones](/attachments/vscode/timeline-local-history-usage/03.context-menu.png)

Estos menús son (para sistemas Mac, por ejemplo)

- Compare with File Comparar con la versión actual del archivo
- Compare with Previous Comparar con la versión anterior
- Select for Compare selecciona la versión actual como versión de comparación (puedes seleccionar otra en el árbol de archivos o en el panel TIMELINE para comparar las dos versiones)
- Show Contents muestra el contenido de la versión seleccionada
- Restore Contents Restaura el contenido de la versión seleccionada
- Reveal in Finder Muestra la versión seleccionada del archivo en el administrador de archivos
- Rename Renombrar la versión seleccionada
- Delete Eliminar la versión seleccionada

Haz clic en el botón Filtro en el lado derecho del panel TIMELINE para seleccionar los tipos de registros que se mostrarán en el panel, que actualmente incluye registros de archivos locales y registros de commits de Git, que pueden mostrarse según sea necesario.

Si solo marcas el registro de commits de Git, podrás ver el historial de commits de Git de tus archivos, lo cual es muy conveniente.

## Recuperación de archivos eliminados por error

Si un archivo se elimina por error, no se mostrará, abrirá ni encontrará en el panel TIMELINE en VSCode. Pero de hecho, aunque el archivo ha sido eliminado por error, su versión histórica todavía está presente localmente.

Para recuperar el archivo eliminado, simplemente puedes crear un nuevo archivo con el mismo nombre en el mismo directorio, y luego abrir el panel TIMELINE. El archivo eliminado aparecerá en el panel TIMELINE, y puedes restaurarlo haciendo clic derecho en él.

¡Eso es todo! El archivo eliminado se restaura. Pero si no recuerdas el nombre del archivo que eliminaste, puede ser un poco complicado encontrarlo.

Primero podemos encontrar un archivo, cualquier versión de cualquier archivo en el mismo proyecto está bien. Y luego abrir el archivo de la versión seleccionada en el Administrador de Archivos haciendo clic derecho en él, para que podamos encontrar la carpeta donde VSCode guarda las versiones históricas. En un sistema Mac, por ejemplo, la ruta es la siguiente.

```
/Users/xxx/Library/Application Support/Code/User/History/61e8902
```

El directorio `History` es el directorio donde se almacenan todas las versiones históricas, así que solo necesitamos buscar por palabras clave para encontrar los archivos correspondientes.

Por ejemplo, si estamos buscando la palabra clave `DbConnection`, el comando de búsqueda puede encontrarse de la siguiente manera

```sh
# Mac / Linux
grep -r DbConnection "/Users/xxx/Library/Application Support/Code/User/History"

# Windows
findstr /s /i DbConnection "C:\Users\xxx\AppData\Roaming\Code\User\History"
```

Una vez que hayas buscado los resultados, puedes abrir los archivos correspondientes, revisarlos uno por uno y encontrar la versión que necesitamos.

## Resumen

Timeline es una característica simple y conveniente, con ella no necesitas otros complementos para guardar todo el historial de archivos, por lo que no tienes que preocuparte por perder código debido a la eliminación accidental de archivos nunca más.