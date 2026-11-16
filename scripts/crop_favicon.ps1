Add-Type -AssemblyName System.Drawing

$inputPath = Join-Path (Get-Location) "public\favicon\icon.png"
$outputPath = Join-Path (Get-Location) "public\favicon\icon_cropped.png"

$bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
$width = $bmp.Width
$height = $bmp.Height

Write-Host "Original dimensions: $width x $height"

# Find bounding box of non-white pixels
# White or near white: R > 245, G > 245, B > 245
$minX = $width
$maxX = 0
$minY = $height
$maxY = 0

for ($y = 0; $y -lt $height; $y += 2) {
    for ($x = 0; $x -lt $width; $x += 2) {
        $pixel = $bmp.GetPixel($x, $y)
        # Check if pixel is NOT background (not pure white)
        if ($pixel.A -gt 30 -and ($pixel.R -lt 245 -or $pixel.G -lt 245 -or $pixel.B -lt 245)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Found bounding box: ($minX, $minY) to ($maxX, $maxY)"

$boxWidth = $maxX - $minX
$boxHeight = $maxY - $minY
$maxDim = [Math]::Max($boxWidth, $boxHeight)

# Add minimal padding (e.g. 5% around the mark)
$padding = [int]($maxDim * 0.06)
$squareSize = $maxDim + ($padding * 2)

# Calculate centered source rectangle
$centerX = [int](($minX + $maxX) / 2)
$centerY = [int](($minY + $maxY) / 2)
$srcX = [int]($centerX - ($squareSize / 2))
$srcY = [int]($centerY - ($squareSize / 2))

# Target high-res square bitmap
$targetSize = 512
$croppedBmp = New-Object System.Drawing.Bitmap $targetSize, $targetSize
$graphics = [System.Drawing.Graphics]::FromImage($croppedBmp)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Clear with white (or transparent if preferred, let's keep transparent/clean white background)
$graphics.Clear([System.Drawing.Color]::White)

$destRect = New-Object System.Drawing.Rectangle 0, 0, $targetSize, $targetSize
$srcRect = New-Object System.Drawing.Rectangle $srcX, $srcY, $squareSize, $squareSize

$graphics.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$graphics.Dispose()
$bmp.Dispose()

$croppedBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$croppedBmp.Dispose()

Write-Host "Successfully cropped icon to $outputPath ($targetSize x $targetSize)"
