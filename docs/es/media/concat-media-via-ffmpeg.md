# Fusión de archivos de audio y vídeo con ffmpeg

ffmpeg es una herramienta de procesamiento de audio y vídeo de código abierto que se utiliza ampliamente en diversas situaciones de procesamiento de audio y vídeo, como varios sitios web de vídeo, herramientas de reproducción de vídeo, herramientas de conversión de formato, etc. Podemos usarlo para convertir fácilmente archivos de audio y vídeo a varios formatos como mp4, flv, avi, mov, etc. Podemos usarlo para convertir fácilmente archivos de audio y vídeo a varios formatos, como mp4, flv, avi, mov, etc.

## Instalar ffmpeg

Puedes descargar e instalar ffmpeg directamente desde el [sitio web oficial de ffmpeg](https://ffmpeg.org/download.html).

En MacOS, también puedes instalar ffmpeg usando brew:

```sh
brew install ffmpeg
```

## Fusión de archivos de audio y vídeo con ffmpeg

A continuación se muestra un ejemplo de fusión de archivos de vídeo, los archivos de audio son similares.

Primero prepara un archivo de texto que contenga la lista de archivos a fusionar, `list.txt`.

```
file '1.mp4'
file '2.mp4'
```

A continuación, fusiona los archivos de la lista usando ffmpeg.

```sh
ffmpeg -f concat -i list.txt -c copy all.mp4
```

## Resumen

Puedes fusionar archivos de audio y vídeo con el comando `concat` especificando una lista de archivos de entrada y archivos de salida con el parámetro `-i`.