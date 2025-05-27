# Convertir des formats audio et vidéo avec ffmpeg

ffmpeg est un outil de traitement audio et vidéo open source qui est largement utilisé dans diverses situations de traitement audio et vidéo, comme divers sites web vidéo, outils de lecture vidéo, outils de conversion de format, etc. Nous pouvons l'utiliser pour convertir facilement des fichiers audio et vidéo vers différents formats, tels que mp4, flv, avi, mov, etc.

## Installer ffmpeg

Vous pouvez télécharger et installer ffmpeg directement depuis le [site officiel de ffmpeg](https://ffmpeg.org/download.html).

Sur MacOS, vous pouvez également installer ffmpeg en utilisant brew.

```sh
brew install ffmpeg
```

## Utiliser ffmpeg pour convertir des formats et compresser des vidéos

```
ffmpeg -y -i input.mp4 -s 640x360 -r 20 -ac 1 -ar 24000 compress.mp4
```

Le sens de cette commande est de compresser `input.mp4` en `compress.mp4`, où les paramètres signifient ce qui suit.

- `-i` le fichier d'entrée, c'est-à-dire le fichier vidéo à convertir/compresser
- `-y` écraser le fichier de sortie s'il existe
- `-s` taille, la résolution, définie ici à 640x360
- `-r` fréquence d'images, définie ici à 20 fps
- `-ac` nombre de canaux, défini ici pour une sortie mono, c'est-à-dire combiner les canaux gauche et droit du son
- `-ar` taux d'échantillonnage, défini ici à 24000Hz, c'est-à-dire 24KHz

À partir des paramètres ci-dessus, le fichier vidéo de sortie aura une résolution de 640x360, un taux d'échantillonnage de 24KHz, mono, 20 images/s, ce qui est relativement un petit fichier vidéo. Si les paramètres ci-dessus ne répondent pas à vos besoins, vous pouvez les ajuster de manière appropriée.

Autres paramètres disponibles.

- `-f` format, vous pouvez spécifier le format de sortie, la valeur par défaut dans l'exemple est `mp4`, c'est-à-dire h264 + aac
- `-af` filtre sonore, qui peut être utilisé pour modifier le volume de la vidéo `-af 'volume=1'`
- `-an` pour supprimer les données sonores (muet) de la vidéo de sortie