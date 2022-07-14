# Merging audio and video files with ffmpeg

ffmpeg is an open source audio and video processing tool that is widely used in various audio and video processing situations, such as various video websites, video playback tools, format conversion tools, etc. We can use it to easily convert audio and video files to various formats such as mp4, flv, avi, mov, etc. We can use it to easily convert audio and video files to various formats, such as mp4, flv, avi, mov, etc.

## Install ffmpeg

You can download and install ffmpeg directly from the [ffmpeg official website](https://ffmpeg.org/download.html).

On MacOS, you can also install ffmpeg using brew: ``sh

```sh
brew install ffmpeg
```

## Merging audio and video files with ffmpeg

The following is an example of merging video files, the audio files are similar.

First prepare a text file containing the list of files to be merged, ``list.txt``.

```
file '1.mp4'
file '2.mp4'
```

Next, merge the files in the list using ffmpeg.

```sh
ffmpeg -f concat -i list.txt -c copy all.mp4
```

## Summary

You can merge audio and video files with the ``concat`` command by specifying a list of input files and output files with the ``-i`` parameter.
