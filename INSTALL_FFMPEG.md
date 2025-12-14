# How to Install FFmpeg for Video Compression

## Option 1: Using Chocolatey (Recommended for Windows)

1. Install Chocolatey (if not already installed):
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

2. Install FFmpeg:
   ```powershell
   choco install ffmpeg
   ```

3. Restart your terminal/PowerShell

## Option 2: Using Winget (Windows 10/11)

```powershell
winget install ffmpeg
```

## Option 3: Manual Installation

1. Download FFmpeg from: https://www.gyan.dev/ffmpeg/builds/
2. Extract to a folder (e.g., `C:\ffmpeg`)
3. Add to PATH:
   - Open System Properties → Environment Variables
   - Add `C:\ffmpeg\bin` to your PATH
   - Restart terminal

## Verify Installation

```powershell
ffmpeg -version
```

## Compress Videos

After installing FFmpeg, run:

```powershell
.\compress-videos.ps1
```

This will:
- Compress videos to under 100MB
- Create backups of originals (with `_original.mp4` suffix)
- Replace the originals with compressed versions
