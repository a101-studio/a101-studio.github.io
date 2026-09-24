import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery/GalleryPage";
import { getPillar } from "@/lib/pillars";

const pillar = getPillar("storytelling");

export const metadata: Metadata = {
  title: pillar.title,
  description: pillar.tagline,
};

export default function StorytellingPage() {
  return <GalleryPage pillarId="storytelling" />;
}
