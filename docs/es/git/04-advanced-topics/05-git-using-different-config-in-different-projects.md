# GIT: Usar diferentes configuraciones (nombre de usuario / gmail o claves SSH) en diferentes proyectos

<Validator lang="es" :platform-list="['Git 2.37']" date="2023-03-06" />

## Antecedentes

Cuando usamos Git, a menudo configuramos algunos elementos básicos de configuración, como el nombre de usuario (`user.name`) y el correo electrónico (`user.email`). Si no están configurados, la primera vez que uses Git para confirmar código reportará un error:

```
Make sure you configure your 'user.email' and 'user.name' in git
```

Podemos solucionar esto usando el comando `git config` para establecer los valores.

```sh
git config --global user.name "Tinymemo"
git config --global user.email "tinymemo@tinkink.net"
```

Este comando en realidad escribe dos elementos de configuración en el archivo de configuración global: `user.name` y `user.email`. Podemos intentar abrir el archivo de configuración (generalmente ubicado en `~/.gitconfig` o `C:\Users\<username>\.gitconfig`):

```
[user]
        name = Tinymemo
        email = tinymemo
```

Si no ejecutamos el comando con la opción `--global`, el archivo de configuración se escribirá en el directorio actual, generalmente ubicado en `.git/config`.

## Usar diferentes configuraciones en diferentes proyectos

Cuando queremos participar en proyectos con diferentes identidades, necesitamos usar diferentes configuraciones en cada proyecto. Pero no queremos escribir configuraciones separadas en cada proyecto, porque tendríamos que usar la configuración global si el proyecto no tiene una configuración. Así que necesitamos una mejor manera.

Afortunadamente, Git proporciona la directiva `includeIf`, que puede usarse para especificar diferentes configuraciones para diferentes rutas.

Supongamos que tenemos las siguientes dos rutas:

- `~/work` el nombre de usuario y correo electrónico correspondiente es `Tinymemo` / `tinymemo@somework.com`
- `~/hobby` el nombre de usuario y correo electrónico correspondiente es `Tinymemo` / `tinymemo@somehobby.com`

Primero, creamos dos archivos de configuración separados:

`~/.gitconfig-work`：

```
[user]
        name = Tinymemo
        email = tinymemo@somework.com
```

`~/.gitconfig-hobby`：

```
[user]
        name = Tinymemo
        email = tinymemo@somehobby.com
```

Luego agregamos las siguientes líneas al archivo de configuración global `~/.gitconfig`, por favor note la última barra en la ruta:

```
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
[includeIf "gitdir:~/hobby/"]
    path = ~/.gitconfig-hobby
```

Entonces podemos verificar en el directorio correspondiente del proyecto:

```sh
# ~/work/project1
git config user.name // Tinymemo
git config user.email // tinymemo@somework.com

# ~/hobby/project2
git config user.name // Tinymemo
git config user.email // tinymemo@somehobby.com
```

> Nota: debes ejecutar el comando `git config` en el directorio del proyecto, de lo contrario usará la configuración global.

Así podemos facilitar el uso de diferentes configuraciones en diferentes proyectos.

## Usar diferentes configuraciones para clave pública/privada

La configuración anterior facilita el uso de diferentes nombres de usuario y correo electrónico para diferentes proyectos, pero también queremos usar diferentes claves SSH públicas/privadas para diferentes proyectos en algunos casos.

Primero, necesitamos crear una nueva clave pública. Si ya tenemos una clave pública, podemos omitir este paso.

```sh
cd ~/.ssh
ssh-keygen -t rsa
```

Por favor, tenga en cuenta el nombre del archivo, no puede ser el nombre predeterminado `id_rsa`, de lo contrario entrará en conflicto con la clave pública existente.

```
Enter file in which to save the key (/Users/tinymemo/.ssh/id_rsa): id_rsa_hobby
```

Simplemente presiona enter todo el tiempo.

Luego podemos agregar un nuevo elemento de configuración al archivo de configuración, para especificar la nueva clave pública para el comando `ssh`:

```
[core]
    sshCommand = "ssh -i ~/.ssh/id_rsa_hobby -F /dev/null"
```

Después de esto, podemos usar diferentes claves públicas/privadas para diferentes proyectos:

## Resumen

Mediante el uso de la directiva `[includeIf]` en la configuración global, podemos usar fácilmente diferentes nombres de usuario, correo electrónico y clave pública/privada para diferentes proyectos en diferentes directorios.