"""Crop outer whitespace from the supplied FD logo for a faithful web asset."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
source = root / 'logos' / 'fremont digital logo 2'
out = root / 'site' / 'dist' / 'assets' / 'brand'
out.mkdir(parents=True, exist_ok=True)
# Preserve the mark's existing shape, texture, colors, and white background.
image = Image.open(source).convert('RGB').crop((191, 302, 1071, 955))
image = image.resize((680, 505), Image.Resampling.LANCZOS)
image.save(out / 'fremont-digital-monogram.webp', quality=94, method=6)
print(f'Web monogram: {image.width} x {image.height}')
