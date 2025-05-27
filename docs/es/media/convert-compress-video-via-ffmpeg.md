# Convertir formatos de audio y video con ffmpeg

ffmpeg es una herramienta de procesamiento de audio y video de código abierto que se utiliza ampliamente en diversas situaciones de procesamiento de audio y video, como varios sitios web de video, herramientas de reproducción de video, herramientas de conversión de formato, entre otros. Podemos usarlo para convertir fácilmente archivos de audio y video a varios formatos, como mp4, flv, avi, mov, etc.

## Instalar ffmpeg

Puedes descargar e instalar ffmpeg directamente desde el [sitio web oficial de ffmpeg](https://ffmpeg.org/download.html).

En MacOS, también puedes instalar ffmpeg usando brew.

```sh
brew install ffmpeg
```

## Usar ffmpeg para convertir formatos y comprimir videos

```
ffmpeg -y -i input.mp4 -s 640x360 -r 20 -ac 1 -ar 24000 compress.mp4
```

El significado de este comando es comprimir `input.mp4` a `compress.mp4`, donde los parámetros significan lo siguiente.

- `-i` el archivo de entrada, es decir, el archivo de video que se va a convertir/comprimir
- `-y` sobrescribir el archivo de salida si existe
- `-s` tamaño, la resolución, establecida aquí en 640x360
- `-r` velocidad de fotogramas, establecida aquí en 20 fps
- `-ac` número de canales, establecido aquí para salida mono, es decir, combinar los canales izquierdo y derecho de sonido
- `-ar` frecuencia de muestreo, establecida aquí en 24000Hz, es decir, 24KHz

A partir de los parámetros anteriores, el archivo de video de salida tendrá una resolución de 640x360, frecuencia de muestreo de 24KHz, mono, 20 fotogramas/s, lo que es relativamente un archivo de video pequeño. Si los parámetros anteriores no satisfacen tus necesidades, puedes ajustarlos según corresponda.

Otros parámetros disponibles.

- `-f` formato, puedes especificar el formato de salida, el predeterminado en el ejemplo es `mp4`, es decir, h264 + aac
- `-af` filtro de sonido, que se puede usar para modificar el volumen del video `-af 'volume=1'`
- `-an` para eliminar datos de sonido (silenciar) del video de salida