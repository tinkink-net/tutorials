# 使用 ffmpeg 合併音視頻文件

ffmpeg 是一個開源的音視頻處理工具，被廣泛應用於各種音視頻處理場合，如各種視頻網站、視頻播放工具、格式轉換工具等。我們可以使用它很方便地將音頻和視頻文件轉換爲各種格式，比如 mp4、flv、avi、mov 等。

## 安裝 ffmpeg

在 [ffmpeg官網](https://ffmpeg.org/download.html) 可以直接下載安裝。

MacOS 上還可以使用 brew 安裝 ffmpeg：

```sh
brew install ffmpeg
```

## 使用 ffmpeg 合併音視頻文件

以下以合併視頻文件爲例，音頻文件的操作類似。

首先準備一個文本文件，包含要合併的文件列表`list.txt`：

```
file '1.mp4'
file '2.mp4'
```

接下來使用 ffmpeg 對列表中的文件進行合併：

```sh
ffmpeg -f concat -i list.txt -c copy all.mp4
```

## 小結

使用`concat`命令即可合併音視頻文件，通過`-i`參數指定一個輸入文件的列表，並指定輸出文件即可。
