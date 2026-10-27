"""Create a lightweight web copy of the supplied wordmark; keep its shape and colors."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
source = root / 'logos' / 'Fremont Digital Logo 1'
out = root / 'site' / 'dist' / 'assets' / 'brand'
out.mkdir(parents=True, exist_ok=True)
im = Image.open(source).convert('RGB')
# Remove empty outer white space only. No reconstruction or recoloring.
im = im.crop((190, 205, 1822, 588))
im.thumbnail((600, 600), Image.Resampling.LANCZOS)
im.save(out / 'fremont-digital-wordmark.webp', quality=94, method=6)
print(f'Web wordmark: {im.width} x {im.height}')
