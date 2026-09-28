"""Planner art for the sales pages (Story 4.1).

Reads each planner's cover PNG and PDF from the working library outside git
(default ../Jaya_Hub_Page, override with PLANNER_SRC) and writes web-sized JPGs
to src/assets/planners/<slug>/, which are versioned. Astro turns them into
AVIF/WebP at build time, like the rest of src/assets.

Only clean pages are listed: several interior pages of the PDFs render with
words glued together, and a sales page must not show that.

Usage:  python scripts/build-planner-art.py [slug ...]
Needs:  pip install pymupdf pillow
"""

import os
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(os.environ.get("PLANNER_SRC", ROOT.parent / "Jaya_Hub_Page"))
OUT = ROOT / "src" / "assets" / "planners"

# slug -> cover file, PDF file, extra photos, {output name: (page number, crop box in 0..1 or None)}
# The "Novo" PDFs (June 2026) are image-only: pages are rendered, never text-extracted.
PLANNERS = {
    "agua": {
        "cover": "capa-planners/agua_novo.png",
        # Final PDF (42 pages, with text layer), confirmed 2026-09-28. Page numbers
        # below were re-derived from it with pymupdf get_text: a "Quando parar" page
        # was inserted after "Como usar" and an "Antes da Semana 1" thermometer page
        # before the week 1 divider, shifting everything from "jornada" on by +1/+2.
        "pdf": "planners/Planner Água Novo.pdf",
        "pages": {
            "como-usar": (3, (0.0, 0.0, 1.0, 0.64)),
            "jornada": (5, None),
            "semana-1": (7, None),
            "dia-1": (8, None),
            "parabens": (40, None),
        },
    },
}

COVER_WIDTH = 1100
PAGE_WIDTH = 1000
PHOTO_WIDTH = 1800


def save_jpg(img: Image.Image, path: Path, width: int) -> None:
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(path, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"  {path.relative_to(ROOT)}  {img.width}x{img.height}")


def share_image(cover: Image.Image, path: Path) -> None:
    """1200x630 for WhatsApp/Instagram previews: the cover, whole, over a
    blurred and darkened copy of itself. No text: the cover already has it."""
    w, h = 1200, 630
    back = cover.convert("RGB").resize((w, round(cover.height * w / cover.width)), Image.LANCZOS)
    top = (back.height - h) // 2
    back = back.crop((0, top, w, top + h)).filter(ImageFilter.GaussianBlur(28))
    back = Image.blend(back, Image.new("RGB", (w, h), (8, 14, 30)), 0.45)
    front = cover.convert("RGB").resize((round(cover.width * (h - 60) / cover.height), h - 60), Image.LANCZOS)
    back.paste(front, ((w - front.width) // 2, 30))
    path.parent.mkdir(parents=True, exist_ok=True)
    back.save(path, "JPEG", quality=86, optimize=True, progressive=True)
    print(f"  {path.relative_to(ROOT)}  {w}x{h}")


def build(slug: str) -> None:
    spec = PLANNERS[slug]
    print(slug)
    cover = Image.open(SRC / spec["cover"])
    save_jpg(cover, OUT / slug / "cover.jpg", COVER_WIDTH)
    # Share images are served as-is (not through astro:assets), so they live in public/.
    share_image(cover, ROOT / "public" / "planners" / f"{slug}-og.jpg")
    for name, file in spec.get("photos", {}).items():
        save_jpg(Image.open(SRC / file), OUT / slug / f"{name}.jpg", PHOTO_WIDTH)

    doc = pymupdf.open(SRC / spec["pdf"])
    for name, (number, crop) in spec["pages"].items():
        pix = doc[number - 1].get_pixmap(dpi=150)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        if crop:
            x0, y0, x1, y1 = crop
            img = img.crop((round(x0 * img.width), round(y0 * img.height),
                            round(x1 * img.width), round(y1 * img.height)))
        save_jpg(img, OUT / slug / f"{name}.jpg", PAGE_WIDTH)


if __name__ == "__main__":
    if not SRC.exists():
        sys.exit(f"Planner library not found at {SRC}. Set PLANNER_SRC.")
    for slug in sys.argv[1:] or PLANNERS:
        build(slug)
