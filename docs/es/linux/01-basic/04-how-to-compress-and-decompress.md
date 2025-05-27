# Cómo comprimir y descomprimir archivos en un entorno Linux

## La diferencia entre empaquetar y comprimir

Empaquetar y comprimir son conceptos diferentes. Empaquetar es combinar múltiples archivos/carpetas en un solo archivo, mientras que comprimir es reducir el tamaño del archivo mediante algoritmos de compresión. Es importante tener en cuenta que empaquetar no significa reducir el tamaño, y comprimir no significa fusionar archivos. Aunque la mayoría de las veces estamos acostumbrados a "empaquetar y comprimir" y a veces no necesitamos distinguir entre ellos, entender la diferencia puede ayudarte a comprender mejor los comandos en tu sistema Linux.

## Empaquetar y desempaquetar (tar)

### Solo empaquetar

Usa el comando `tar` para empaquetar múltiples archivos/carpetas en un solo archivo.

```sh
tar -cvf archive.tar file1 file2 file3
```

donde `archive.tar` es el archivo empaquetado, `file1`, `file2` y `file3` son los archivos/carpetas a empaquetar.

Para cada archivo empaquetado, la salida será.

```sh
a file1
a file2
a file3
```

### Empaquetar y comprimir

El comando `tar` también integra la compresión, ya sea utilizando los algoritmos de compresión gzip o bzip2, con los siguientes parámetros `-z` y `-j` respectivamente.

```sh
# Usar compresión gzip con .gz después del nombre del archivo
tar -zcvf archive.tar.gz file1 file2 file3

# Usar compresión gzip con .tgz como sufijo del nombre de archivo
tar -zcvf archive.tgz file1 file2 file3

# Comprimir usando bzip2 con .bz2 después del nombre del archivo
tar -jcvf archive.tar.bz2 file1 file2 file3

# Comprimir con bzip2, usando .tbz2 como sufijo del nombre de archivo
tar -jcvf archive.tbz2 file1 file2 file3
```

### Desempaquetar

```sh
tar -xvf archive.tar
```

Si necesitas desempaquetar en un directorio específico, añade el parámetro `-C`.

```sh
tar -xvf archive.tar -C /path/to/destination/directory
```

Si hay compresión, añade los argumentos correspondientes `-z` o `-j`:

```sh
# Descomprimir el archivo gzip
tar -zxvf archive.tar.gz

# Descomprimir el archivo bzip2
tar -jxvf archive.tar.bz2
```

## Comprimir y descomprimir archivos

### Compresión gzip

El comando `gzip` se utiliza para comprimir un archivo. Vale la pena señalar que sobrescribe el archivo original, es decir, el archivo original desaparece después de ser comprimido con el comando `gzip`.

```sh
## el archivo desaparecerá y se creará un nuevo file.gz
gzip file
```

Aplicar `gzip` directamente a un directorio no tiene efecto, porque `gzip` solo puede comprimir archivos, no directorios. Sin embargo, todos los archivos de un directorio pueden comprimirse recursivamente utilizando el argumento `-r`:

```sh
# Todos los archivos en el directorio dirname se comprimen, cada archivo genera un archivo .gz correspondiente, y el archivo original desaparece
gzip dirname
```

### Descompresión gzip

Descomprimir un solo archivo, usando el parámetro `-d`.

```sh
### Descomprime el archivo file.gz, creando un nuevo archivo
gzip -d file.gz
```

Añadir el argumento `-r` permite la descompresión recursiva contra directorios, similar a la recursión en la compresión, que también descomprime todos los archivos en un directorio:

```sh
# Descomprime todos los archivos comprimidos con gzip en dirname y subdirectorios
gzip -dr dirname
```

### Compresión zip

zip puede hacer tanto empaquetado como compresión.

Para empaquetar y comprimir.

```sh
zip archive.zip file1 file2 file3
```

Salida.

```sh
adding: file1 (stored 0%)
adding: file2 (stored 0%)
adding: file3 (stored 0%)
```

Si tienes directorios para comprimir juntos, necesitas añadir el parámetro `-r`, y puedes usar el parámetro `-q` para desactivar la salida:

```sh
zip -qr archive.zip dirname
```

### Descomprimir zip

Para descomprimir directamente desde el directorio actual.

```sh
unzip archive.zip
```

Si quieres descomprimir en un directorio específico, usa el parámetro `-d`, además el parámetro `-o` puede sobrescribir archivos existentes sin preguntar:

```sh
unzip -d /path/to/destination/directory -o archive.zip
```

## Resumen rápido

| sufijo | empaquetar/comprimir | desempaquetar/descomprimir |
| ---- | ------- | --------- |
| .tar | tar -cvf archive.tar file1 file2 | tar -xvf archive.tar -C /dest/path |
| .tar.gz/.tgz | tar -zcvf archive.tar file1 file2 | tar -zxvf archive.tar -C /dest/path |
| .tar.bz2/.tbz2 | tar -jcvf archive.tar file1 file2 | tar -jxvf archive.tar -C /dest/path |
| .gz | gzip file | gzip -d file.gz |
| .zip | zip -r archive.zip file1 file2 | unzip -d /dest/path -o archive.zip |