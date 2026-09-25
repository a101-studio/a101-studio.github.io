export type PillarId = "storytelling" | "light" | "dreamlike";

export type GalleryImage = {
  id: string;
  src: string;
  fallback: string;
  srcset: string;
  sizes: string;
  alt: string;
  blurSrc: string;
  width: number;
  height: number;
};

export type Pillar = {
  id: PillarId;
  href: string;
  title: string;
  shortTitle: string;
  tagline: string;
  grade: string;
  hero: {
    webm: string;
    mp4: string;
    poster: string;
  };
  images: GalleryImage[];
};

const GALLERY_SIZES = "33vw";

function galleryImages(id: PillarId, title: string): GalleryImage[] {
  return Array.from({ length: 9 }, (_, index) => {
    const n = String(index + 1).padStart(2, "0");
    const base = `/assets/${id}/gallery/${n}`;
    return {
      id: `${id}-${n}`,
      src: `${base}.webp`,
      fallback: `${base}.jpg`,
      srcset: `${base}-400.webp 400w, ${base}.webp 800w, ${base}-1200.webp 1200w`,
      sizes: GALLERY_SIZES,
      alt: `Placeholder still — ${title} ${n}`,
      blurSrc: `${base}-blur.jpg`,
      width: 800,
      height: 1000,
    };
  });
}

export const pillars: Pillar[] = [
  {
    id: "light",
    href: "/light/",
    title: "Playing with Light",
    shortTitle: "Light",
    tagline: "Ways of seeing",
    grade: "grade-light",
    hero: {
      webm: "/assets/light/hero.webm",
      mp4: "/assets/light/hero.mp4",
      poster: "/assets/light/poster.webp",
    },
    images: galleryImages("light", "Playing with Light"),
  },
  {
    id: "storytelling",
    href: "/storytelling/",
    title: "Unique Storytelling",
    shortTitle: "Storytelling",
    tagline: "Moments caught mid-motion",
    grade: "grade-storytelling",
    hero: {
      webm: "/assets/storytelling/hero.webm",
      mp4: "/assets/storytelling/hero.mp4",
      poster: "/assets/storytelling/poster.webp",
    },
    images: galleryImages("storytelling", "Unique Storytelling"),
  },
  {
    id: "dreamlike",
    href: "/dreamlike/",
    title: "Dreamlike",
    shortTitle: "Dreamlike",
    tagline: "Between memory and afterimage",
    grade: "grade-dreamlike",
    hero: {
      webm: "/assets/dreamlike/hero.webm",
      mp4: "/assets/dreamlike/hero.mp4",
      poster: "/assets/dreamlike/poster.webp",
    },
    images: galleryImages("dreamlike", "Dreamlike"),
  },
];

export function getPillar(id: PillarId): Pillar {
  const pillar = pillars.find((item) => item.id === id);
  if (!pillar) {
    throw new Error(`Unknown pillar: ${id}`);
  }
  return pillar;
}
