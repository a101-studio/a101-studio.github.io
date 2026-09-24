#!/usr/bin/env python3
"""Generate drop-in placeholder loops and 4:5 stills for A101 Studio."""

from __future__ import annotations

import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"

PILLARS = {
    "storytelling": {
        "c0": "0x1c120c",
        "c1": "0xc4a06a",
        "type": "radial",
        "speed": "0.035",
        "eq": "contrast=1.06:saturation=0.88:gamma=1.04",
        "palette": [
            (28, 18, 12),
            (92, 52, 28),
            (196, 160, 106),
            (232, 210, 176),
            (64, 38, 28),
        ],
    },
    "light": {
        "c0": "0x0a0614",
        "c1": "0x2ef0c0",
        "type": "linear",
        "speed": "0.06",
        "eq": "contrast=1.28:saturation=1.55:gamma=0.95",
        "palette": [
            (8, 6, 22),
            (255, 46, 180),
            (46, 240, 192),
            (140, 60, 255),
            (255, 220, 40),
        ],
    },
    "dreamlike": {
        "c0": "0x14161c",
        "c1": "0x9ad0d8",
        "type": "radial",
        "speed": "0.028",
        "eq": "contrast=1.08:saturation=0.72:gamma=1.08",
        "palette": [
            (20, 22, 28),
            (154, 208, 216),
            (232, 176, 196),
            (72, 88, 120),
            (240, 120, 168),
        ],
    },
}


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def generate_hero(pillar: str, spec: dict[str, str]) -> None:
    dest = ASSETS / pillar
    dest.mkdir(parents=True, exist_ok=True)
    mp4 = dest / "hero.mp4"
    webm = dest / "hero.webm"
    poster = dest / "poster.webp"

    lavfi = (
        f"gradients=s=720x1280:d=6:r=24:c0={spec['c0']}:c1={spec['c1']}"
        f":speed={spec['speed']}:type={spec['type']}:nb_colors=2"
    )
    vf = (
        f"hue=h='t*10':s=1.05,noise=alls=12:allf=t+u,eq={spec['eq']},format=yuv420p"
    )

    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            lavfi,
            "-vf",
            vf,
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "28",
            "-movflags",
            "+faststart",
            "-an",
            str(mp4),
        ]
    )
    run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(mp4),
            "-c:v",
            "libvpx-vp9",
            "-b:v",
            "0",
            "-crf",
            "38",
            "-deadline",
            "realtime",
            "-cpu-used",
            "8",
            "-an",
            str(webm),
        ]
    )
    png = dest / "poster.png"
    run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(mp4),
            "-frames:v",
            "1",
            str(png),
        ]
    )
    Image.open(png).save(poster, "WEBP", quality=80, method=4)
    png.unlink()


def lerp(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))  # type: ignore[return-value]


def render_still(width: int, height: int, palette: list[tuple[int, int, int]], seed: int) -> Image.Image:
    rng = np.random.default_rng(seed)
    y = np.linspace(0, 1, height, dtype=np.float32)[:, None]
    x = np.linspace(0, 1, width, dtype=np.float32)[None, :]

    cx, cy = float(rng.uniform(0.25, 0.75)), float(rng.uniform(0.2, 0.8))
    angle = float(rng.uniform(0, np.pi))
    xr = (x - cx) * np.cos(angle) + (y - cy) * np.sin(angle)
    yr = -(x - cx) * np.sin(angle) + (y - cy) * np.cos(angle)
    radial = np.sqrt((x - cx) ** 2 + (y - cy) ** 2)
    field = 0.55 * (xr * 0.6 + 0.5) + 0.45 * np.clip(1.2 - radial * 1.6, 0, 1)
    field = np.clip(field + 0.12 * np.sin((x * 7 + y * 3) * np.pi + seed), 0, 1)

    c0, c1, c2 = palette[0], palette[1], palette[2]
    rgb = np.zeros((height, width, 3), dtype=np.float32)
    for i in range(3):
        mid = c0[i] + (c1[i] - c0[i]) * field
        rgb[:, :, i] = mid + (c2[i] - mid) * (field**1.6)

    img = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB")
    draw = ImageDraw.Draw(img, "RGBA")

    for _ in range(int(rng.integers(8, 16))):
        color = palette[int(rng.integers(1, len(palette)))]
        bx = float(rng.uniform(-0.1, 1.1)) * width
        by = float(rng.uniform(-0.1, 1.1)) * height
        r = float(rng.uniform(0.04, 0.22)) * width
        alpha = int(rng.integers(40, 140))
        draw.ellipse((bx - r, by - r, bx + r, by + r), fill=(*color, alpha))

    if rng.random() > 0.35:
        color = palette[int(rng.integers(1, len(palette)))]
        x0 = float(rng.uniform(0, width))
        draw.line(
            [(x0, 0), (x0 + float(rng.uniform(-80, 80)), height)],
            fill=(*color, int(rng.integers(30, 90))),
            width=int(rng.integers(8, 40)),
        )

    img = img.filter(ImageFilter.GaussianBlur(radius=float(rng.uniform(1.2, 4.5))))
    grain = rng.integers(-18, 19, (height, width, 1), dtype=np.int16)
    arr = np.clip(np.asarray(img, dtype=np.int16) + grain, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr, "RGB")
    img = ImageEnhance.Contrast(img).enhance(1.08)
    return img


def save_still(img: Image.Image, dest: Path, name: str) -> None:
    dest.mkdir(parents=True, exist_ok=True)
    master = img.resize((1200, 1500), Image.Resampling.LANCZOS)
    mid = img.resize((800, 1000), Image.Resampling.LANCZOS)
    small = img.resize((400, 500), Image.Resampling.LANCZOS)
    blur = img.resize((32, 40), Image.Resampling.BILINEAR).filter(ImageFilter.GaussianBlur(2))

    master.save(dest / f"{name}-1200.webp", "WEBP", quality=78, method=4)
    mid.save(dest / f"{name}.webp", "WEBP", quality=78, method=4)
    small.save(dest / f"{name}-400.webp", "WEBP", quality=76, method=4)
    mid.save(dest / f"{name}.jpg", "JPEG", quality=82, optimize=True)
    blur.save(dest / f"{name}-blur.jpg", "JPEG", quality=40, optimize=True)


def generate_gallery(pillar: str, palette: list[tuple[int, int, int]]) -> None:
    dest = ASSETS / pillar / "gallery"
    for i in range(1, 10):
        seed = abs(hash(f"{pillar}-{i}")) % (2**32)
        still = render_still(960, 1200, palette, seed)
        save_still(still, dest, f"{i:02d}")


def main() -> None:
    for pillar, spec in PILLARS.items():
        print(f"→ {pillar} hero")
        generate_hero(pillar, spec)
        print(f"→ {pillar} gallery")
        generate_gallery(pillar, spec["palette"])
    print("done")


if __name__ == "__main__":
    main()
