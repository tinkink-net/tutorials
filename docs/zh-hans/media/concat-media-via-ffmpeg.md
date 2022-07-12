# 使用 ffmpeg 合并音视频文件



合并视频文件：

1. 准备一个文本文件，包含要合并的文件列表`list.txt`
```
file '1.mp4'
file '2.mp4'
```
2. 合并
```sh
ffmpeg -f concat -i list.txt -c copy all.mp4
```
