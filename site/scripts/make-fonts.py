"""Losslessly package the existing Manrope fonts as WOFF2.

Optional tooling: pip install fonttools brotli
Normal builds use the checked-in WOFF2 files and need no Python dependencies.
"""
from pathlib import Path
from fontTools.ttLib import TTFont

assets = Path(__file__).resolve().parent.parent / "dist" / "assets"
for weight in ("regular", "semibold", "extrabold"):
    source = assets / f"manrope-{weight}.ttf"
    target = source.with_suffix(".woff2")
    font = TTFont(source)
    font.flavor = "woff2"
    font.save(target)
    assert TTFont(target).getBestCmap() == TTFont(source).getBestCmap()
    print(f"{source.name}: {source.stat().st_size} -> {target.stat().st_size} bytes")
