# Convert audio and video formats with ffmpeg

ffmpeg is an open source audio and video processing tool that is widely used in various audio and video processing situations, such as various video websites, video playback tools, format conversion tools and so on. We can use it to easily convert audio and video files to various formats, such as mp4, flv, avi, mov, etc.

## Install ffmpeg

You can download and install ffmpeg directly from the [ffmpeg official website](https://ffmpeg.org/download.html).

On MacOS, you can also install ffmpeg using brew.

```sh
brew install ffmpeg
```

## Use ffmpeg to convert formats and compress videos

```
ffmpeg -y -i input.mp4 -s 640x360 -r 20 -ac 1 -ar 24000 compress.mp4
```

The meaning of this command is to compress `input.mp4` to `compress.mp4`, where the parameters mean the following.

- `-i` the input file, i.e. the video file to be converted/compressed
- `-y` overwrite the output file if it exists
- `-s` size, the resolution, set here to 640x360
- `-r` frame rate, set here to 20 fps
- `-ac` number of channels, set here to mono output, i.e. combine the left and right channels of sound
- `-ar` sample rate, set here to 24000Hz, i.e. 24KHz

From the above parameters, the output video file will be 640x360 resolution, 24KHz sample rate, mono, 20 frames/s, which is relatively a small video file. If the above parameters do not meet your needs, you can adjust them as appropriate.

Other available parameters.

- `-f` format, you can specify the output format, the default in the example is `mp4`, i.e. h264 + aac
- `-af` sound filter, which can be used to modify the volume of the video `-af 'volume=1'`
- `-an` to remove sound data (mute) from the output video
