# Quick Video Compression Guide

## Current File Sizes
- `tinytuna_feature_ai.mp4`: 121.65 MB ❌
- `FishGameplay.mp4`: 126.2 MB ❌

Both need to be under 100MB for GitHub Pages.

## Quick Compression Commands

After installing FFmpeg, you can compress manually:

### Compress tinytuna_feature_ai.mp4:
```powershell
ffmpeg -i "public/projects/tinytuna/features/tinytuna_feature_ai.mp4" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k -movflags +faststart "public/projects/tinytuna/features/tinytuna_feature_ai_compressed.mp4"
```

### Compress FishGameplay.mp4:
```powershell
ffmpeg -i "public/projects/tinytuna/gamepreviews/FishGameplay.mp4" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k -movflags +faststart "public/projects/tinytuna/gamepreviews/FishGameplay_compressed.mp4"
```

### After compression:
1. Check the file sizes
2. If under 100MB, replace the originals:
   ```powershell
   Move-Item "public/projects/tinytuna/features/tinytuna_feature_ai_compressed.mp4" "public/projects/tinytuna/features/tinytuna_feature_ai.mp4" -Force
   Move-Item "public/projects/tinytuna/gamepreviews/FishGameplay_compressed.mp4" "public/projects/tinytuna/gamepreviews/FishGameplay.mp4" -Force
   ```

## Compression Settings Explained

- **CRF 28**: Quality setting (18-28 is good, lower = better quality but larger file)
- **preset medium**: Encoding speed (slower = better compression)
- **-c:a aac -b:a 128k**: Audio codec and bitrate
- **-movflags +faststart**: Enables web streaming (videos start playing before fully downloaded)

## Alternative: Use Online Tools

If you don't want to install FFmpeg:
- https://www.freeconvert.com/video-compressor
- https://www.clipchamp.com/
- https://www.youcompress.com/

Upload, compress to under 100MB, then download and replace the files.
