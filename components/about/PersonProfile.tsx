import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/shared/Logo";
import type { Person, PersonLink } from "@/lib/people";

type PersonProfileProps = {
  person: Person;
};

export function PersonProfile({ person }: PersonProfileProps) {
  return (
    <main className="min-h-svh bg-background px-5 py-6 md:px-10 md:py-8">
      <header className="mb-10 flex items-center justify-between">
        <Logo withBack href="/about/" />
        <p className="text-xs tracking-[0.22em] uppercase text-white/70">
          {person.role}
        </p>
      </header>

      <section className="grid items-end gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14">
        <figure className="relative aspect-[4/5] overflow-hidden bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={person.portrait.src}
            alt={person.portrait.alt}
            className={`h-full w-full object-cover ${person.grade}`}
          />
          <span className="glass-sheen pointer-events-none absolute inset-0" />
        </figure>
        <div>
          <h1 className="font-display text-5xl text-white md:text-6xl">
            {person.name}
          </h1>
          <p className="font-display mt-6 max-w-md text-2xl leading-snug text-white/85 md:text-3xl">
            “{person.quote}”
          </p>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-white/65">
            {person.brief}
          </p>
        </div>
      </section>

      <Section title="Cherished works">
        <ul className="grid grid-cols-3 gap-px bg-white/80">
          {person.works.map((work) => (
            <li key={work.src} className="min-h-0 bg-background">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={work.src}
                alt={work.alt}
                className={`aspect-[4/5] h-full w-full object-cover ${person.grade}`}
              />
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <Section title="Beliefs">
          <ul className="space-y-3 text-[15px] leading-relaxed text-white/65">
            {person.beliefs.map((belief) => (
              <li key={belief}>{belief}</li>
            ))}
          </ul>
        </Section>
        <Section title="When shooting">
          <ul className="space-y-3 text-[15px] leading-relaxed text-white/65">
            {person.interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="mt-14 grid gap-10 pb-16 md:grid-cols-3">
        <LinkList title="Follows" links={person.follows} />
        <LinkList title="Art" links={person.art} />
        <LinkList title="Music" links={person.music} />
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="mb-5 text-[11px] tracking-[0.28em] uppercase text-white/45">
        {title}
      </h2>
      {children}
    </section>
  );
}

function LinkList({ title, links }: { title: string; links: PersonLink[] }) {
  return (
    <section>
      <h2 className="mb-4 text-[11px] tracking-[0.28em] uppercase text-white/45">
        {title}
      </h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-[15px] text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
