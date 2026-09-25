import type { Metadata } from "next";
import { SimplePage } from "@/components/shared/SimplePage";
import { studio } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Book",
  description: "Book a session with A101 Studio.",
};

export default function BookPage() {
  return (
    <SimplePage kicker="A session" title="Book">
      <p>
        Tell us what you want to make — a story, a way of seeing, or something
        that does not exist yet.
      </p>
      <p>
        <a
          href={`mailto:${studio.email}`}
          className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
        >
          {studio.email}
        </a>
      </p>
    </SimplePage>
  );
}
