import type { Metadata } from "next";
import { SimplePage } from "@/components/shared/SimplePage";

export const metadata: Metadata = {
  title: "About",
  description: "Who A101 Studio is, and how we look.",
};

export default function AboutPage() {
  return (
    <SimplePage kicker="A101 Studio" title="About us">
      <p>
        We make photographs and films. The work sits in three ways of looking:
        human stories, experiments with light, and images that feel a little
        outside of time.
      </p>
      <p>
        If one of those feels like what you want made, that is usually enough
        to start.
      </p>
    </SimplePage>
  );
}
