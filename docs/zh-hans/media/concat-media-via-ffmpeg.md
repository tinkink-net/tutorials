# 使用 ffmpeg 合并音视频文件

ffmpeg 是一个开源的音视频处理工具，被广泛应用于各种音视频处理场合，如各种视频网站、视频播放工具、格式转换工具等。我们可以使用它很方便地将音频和视频文件转换为各种格式，比如 mp4、flv、avi、mov 等。

## 安装 ffmpeg

在 [ffmpeg官网](https://ffmpeg.org/download.html) 可以直接下载安装。

MacOS 上还可以使用 brew 安装 ffmpeg：

```sh
brew install ffmpeg
```

## 使用 ffmpeg 合并音视频文件

以下以合并视频文件为例，音频文件的操作类似。

首先准备一个文本文件，包含要合并的文件列表`list.txt`：

```
file '1.mp4'
file '2.mp4'
```

接下来使用 ffmpeg 对列表中的文件进行合并：

```sh
ffmpeg -f concat -i list.txt -c copy all.mp4
```

## 小结

使用`concat`命令即可合并音视频文件，通过`-i`参数指定一个输入文件的列表，并指定输出文件即可。
