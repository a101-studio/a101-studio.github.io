import type { Metadata } from "next";
import { PeopleTriptych } from "@/components/about/PeopleTriptych";

export const metadata: Metadata = {
  title: "About",
  description: "The three people behind A101 Studio.",
};

export default function AboutPage() {
  return <PeopleTriptych />;
}
