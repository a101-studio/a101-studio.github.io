# A101 Studio

Photography and videography portfolio site.

## Local

```bash
npm install
npm run dev
```

## Build

Static export for GitHub Pages:

```bash
npm run build
```

Output lands in `out/`. GitHub Actions deploys that folder on every push to `main`. In the repo settings, set Pages source to **GitHub Actions**.

## Replacing media

Drop web-ready files into `public/assets/<pillar>/` using the existing names, or point the paths in `lib/pillars.ts` at a CDN. UI code does not hardcode asset filenames.

```
public/assets/<pillar>/
  hero.webm
  hero.mp4
  poster.webp
  gallery/01.webp  01.jpg  01-400.webp  01-1200.webp  01-blur.jpg
  ...
```

Regenerate placeholders with `python3 scripts/generate-placeholders.py`.
