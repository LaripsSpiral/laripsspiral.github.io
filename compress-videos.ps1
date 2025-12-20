# PowerShell script to compress MP4 videos to under 100MB
# Requires ffmpeg to be installed

# Find all MP4 files in public/projects directory recursively
$projectPath = "public/projects"
if (-not (Test-Path $projectPath)) {
    Write-Host "Directory not found: $projectPath" -ForegroundColor Red
    exit 1
}

# Get all MP4 files and convert to relative paths (using forward slashes)
$currentDir = (Get-Location).Path
$videos = Get-ChildItem -Path $projectPath -Filter "*.mp4" -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Replace($currentDir, "").TrimStart("\", "/")
    $relativePath -replace "\\", "/"
}

if ($videos.Count -eq 0) {
    Write-Host "No MP4 files found in $projectPath" -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $($videos.Count) MP4 file(s) in $projectPath" -ForegroundColor Cyan
Write-Host ""

foreach ($video in $videos) {
    if (Test-Path $video) {
        $fileInfo = Get-Item $video
        $sizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
        Write-Host "Processing: $($fileInfo.Name) ($sizeMB MB)" -ForegroundColor Yellow
        
        if ($sizeMB -gt 100) {
            $output = $video -replace '\.mp4$', '_compressed.mp4'
            $tempOutput = $output -replace '\.mp4$', '_temp.mp4'
            
            Write-Host "Compressing to target: < 100MB..." -ForegroundColor Cyan
            
            # Try different CRF values to get under 100MB
            # CRF 28 is a good balance (lower = higher quality, larger file)
            # We'll start with CRF 28 and adjust if needed
            $crf = 28
            $targetSize = 95 * 1024 * 1024  # 95MB target (safety margin)
            
            # Compress with H.264 codec, CRF 28, preset medium
            $ffmpegCmd = "ffmpeg -i `"$video`" -c:v libx264 -crf $crf -preset medium -c:a aac -b:a 128k -movflags +faststart `"$tempOutput`" -y"
            
            Write-Host "Running: $ffmpegCmd" -ForegroundColor Gray
            Invoke-Expression $ffmpegCmd
            
            if (Test-Path $tempOutput) {
                $newSizeMB = [math]::Round((Get-Item $tempOutput).Length / 1MB, 2)
                Write-Host "Compressed size: $newSizeMB MB" -ForegroundColor Green
                
                if ($newSizeMB -lt 100) {
                    # Backup original
                    $backup = $video -replace '\.mp4$', '_original.mp4'
                    Copy-Item $video $backup
                    Write-Host "Original backed up to: $backup" -ForegroundColor Gray
                    
                    # Replace original with compressed
                    Move-Item $tempOutput $video -Force
                    Write-Host "✓ Successfully compressed to $newSizeMB MB" -ForegroundColor Green
                } else {
                    Write-Host "Still too large ($newSizeMB MB). Trying higher compression (CRF 30)..." -ForegroundColor Yellow
                    Remove-Item $tempOutput -Force
                    
                    $crf = 30
                    $ffmpegCmd = "ffmpeg -i `"$video`" -c:v libx264 -crf $crf -preset medium -c:a aac -b:a 96k -movflags +faststart `"$tempOutput`" -y"
                    Invoke-Expression $ffmpegCmd
                    
                    if (Test-Path $tempOutput) {
                        $newSizeMB = [math]::Round((Get-Item $tempOutput).Length / 1MB, 2)
                        if ($newSizeMB -lt 100) {
                            $backup = $video -replace '\.mp4$', '_original.mp4'
                            Copy-Item $video $backup
                            Move-Item $tempOutput $video -Force
                            Write-Host "✓ Successfully compressed to $newSizeMB MB" -ForegroundColor Green
                        } else {
                            Write-Host "⚠ Still too large. Manual compression may be needed." -ForegroundColor Red
                            Remove-Item $tempOutput -Force
                        }
                    }
                }
            } else {
                Write-Host "✗ Compression failed. Check if ffmpeg is installed." -ForegroundColor Red
            }
        } else {
            Write-Host "✓ File is already under 100MB, skipping." -ForegroundColor Green
        }
        Write-Host ""
    } else {
        Write-Host "File not found: $video" -ForegroundColor Red
    }
}

Write-Host "Compression complete!" -ForegroundColor Cyan
