# Usuarios y Permisos Maestros de Linux

<Validator lang="es" :platform-list="['Ubuntu 22.04']" date="2023-08-02" />

En Linux, los usuarios son individuos que pueden acceder al sistema y sus recursos. Cada usuario tiene un nombre de usuario único y un ID de usuario (`UID`) que lo identifica en el sistema. Los grupos son colecciones de usuarios que comparten permisos comunes para acceder a archivos y directorios. Los permisos son reglas que determinan quién puede acceder a un archivo o directorio, y qué acciones pueden realizar en él.

Linux utiliza un sistema de permisos que consta de tres tipos: lectura, escritura y ejecución. Estos permisos pueden establecerse para tres tipos de usuarios: el propietario del archivo o directorio, los miembros del grupo que posee el archivo o directorio, y todos los demás usuarios del sistema.

Entender cómo funcionan los usuarios, grupos y permisos en Linux es esencial para gestionar el acceso a los recursos del sistema y garantizar la seguridad de tu sistema.

## Usuarios

### Identificar Usuario Actual

Para identific