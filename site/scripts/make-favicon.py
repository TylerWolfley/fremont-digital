"""Create browser icons from the owner's supplied raster symbol, without redrawing it."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import hashlib
import json

root = Path(__file__).resolve().parents[2]
source = root / 'logos' / 'fremont digital logo 2'
out = root / 'site' / 'dist' / 'assets' / 'favicons'
review = root / 'reviews' / '01-favicon'
out.mkdir(parents=True, exist_ok=True)
review.mkdir(parents=True, exist_ok=True)

original = Image.open(source).convert('RGB')
# Crop only the unused outer background; preserve the original symbol and colors.
crop = (194, 308, 1069, 948)
mark = original.crop(crop)
master = Image.new('RGB', (512, 512), 'white')
mark.thumbnail((480, 480), Image.Resampling.LANCZOS)
master.paste(mark, ((512-mark.width)//2, (512-mark.height)//2))
for size in (16, 32, 48, 64, 180, 192, 512):
    icon = master.resize((size,size), Image.Resampling.LANCZOS)
    name = 'apple-touch-icon.png' if size == 180 else f'favicon-{size}.png'
    icon.save(out/name, optimize=True)
master.save(out/'favicon.ico', format='ICO', sizes=[(16,16),(32,32),(48,48)])

metadata = {
    'source': str(source.relative_to(root)),
    'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
    'source_dimensions': list(original.size),
    'crop': list(crop),
    'treatment': 'Original FD symbol, original colors, white square background. Background margin cropped, then centered and downscaled. No redrawing.',
    'ico_sizes': [[16,16],[32,32],[48,48]],
}
(review/'source-record.json').write_text(json.dumps(metadata, indent=2), encoding='utf-8')

# Review sheet shows browser icons at their native 16 and 32 pixel sizes.
sheet = Image.new('RGB', (1080, 660), '#F5F3ED')
draw = ImageDraw.Draw(sheet)
fontdir = root/'site'/'dist'/'assets'
def font(size, bold=False):
    return ImageFont.truetype(str(fontdir/('manrope-extrabold.ttf' if bold else 'manrope-regular.ttf')), size)
draw.text((48,35),'01 / FAVICON',font=font(15,True),fill='#9B5A34')
draw.text((48,72),'Your symbol. Sized for the browser.',font=font(32,True),fill='#202B34')
draw.text((48,125),'Original FD mark · original charcoal and copper · white background',font=font(16),fill='#59666C')

sheet.paste(master.resize((220,220),Image.Resampling.LANCZOS),(62,235))
draw.text((68,477),'Enlarged for inspection',font=font(14),fill='#59666C')

for y,bg,tabbg,ink,label in [(205,'#DFE3E8','#FFFFFF','#202B34','Light browser'),(365,'#14181D','#30363D','#F5F3ED','Dark browser')]:
    draw.text((365,y-28),label,font=font(14,True),fill='#59666C')
    draw.rounded_rectangle((350,y,1030,y+112),radius=12,fill=bg)
    draw.rounded_rectangle((370,y+14,725,y+60),radius=10,fill=tabbg)
    sheet.paste(master.resize((16,16),Image.Resampling.LANCZOS),(389,y+29))
    draw.text((418,y+25),'Fremont Digital',font=font(14),fill=ink)
    draw.text((696,y+24),'×',font=font(17),fill=ink)
    draw.rounded_rectangle((370,y+70,1008,y+99),radius=14,fill=tabbg)
    draw.text((387,y+75),'Browser tab · favicon at actual 16px size',font=font(12),fill=ink)

sheet.paste(master.resize((32,32),Image.Resampling.LANCZOS),(370,530))
draw.text((418,536),'32px / high-density browser tab',font=font(14),fill='#59666C')
draw.line((48,594,1030,594),fill='#D5D8D2',width=1)
draw.text((48,615),'FREMONT DIGITAL',font=font(13,True),fill='#202B34')
draw.text((750,615),'Component 01 · review before header',font=font(13),fill='#59666C')
sheet.save(review/'favicon-review.png',optimize=True)

# Validate actual container contents, dimensions, and source preservation.
assert Image.open(out/'favicon.ico').ico.sizes() == {(16,16),(32,32),(48,48)}
for size in (16,32,48,64,192,512):
    assert Image.open(out/f'favicon-{size}.png').size == (size,size)
assert hashlib.sha256(source.read_bytes()).hexdigest() == metadata['source_sha256']
print(json.dumps({'output':str(out),'review':str(review/'favicon-review.png'),'validation':'All icon sizes and original-source preservation verified.'},indent=2))
