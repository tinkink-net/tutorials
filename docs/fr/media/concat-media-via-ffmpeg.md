# Fusion de fichiers audio et vidéo avec ffmpeg

ffmpeg est un outil de traitement audio et vidéo open source qui est largement utilisé dans diverses situations de traitement audio et vidéo, tels que divers sites web vidéo, outils de lecture vidéo, outils de conversion de format, etc. Nous pouvons l'utiliser pour convertir facilement des fichiers audio et vidéo dans divers formats tels que mp4, flv, avi, mov, etc. Nous pouvons l'utiliser pour convertir facilement des fichiers audio et vidéo dans divers formats, tels que mp4, flv, avi, mov, etc.

## Installer ffmpeg

Vous pouvez télécharger et installer ffmpeg directement depuis le [site officiel de ffmpeg](https://ffmpeg.org/download.html).

Sur MacOS, vous pouvez également installer ffmpeg en utilisant brew: ``sh

```sh
brew install ffmpeg
```

## Fusion de fichiers audio et vidéo avec ffmpeg

Voici un exemple de fusion de fichiers vidéo, les fichiers audio sont similaires.

Préparez d'abord un fichier texte contenant la liste des fichiers à fusionner, ``list.txt``.

```
file '1.mp4'
file '2.mp4'
```

Ensuite, fusionnez les fichiers de la liste en utilisant ffmpeg.

```sh
ffmpeg -f concat -i list.txt -c copy all.mp4
```

## Résumé

Vous pouvez fusionner des fichiers audio et vidéo avec la commande ``concat`` en spécifiant une liste de fichiers d'entrée et de fichiers de sortie avec le paramètre ``-i``.