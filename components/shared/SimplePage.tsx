import type { ReactNode } from "react";
import { Logo } from "@/components/shared/Logo";

type SimplePageProps = {
  title: string;
  kicker?: string;
  children: ReactNode;
};

export function SimplePage({ title, kicker, children }: SimplePageProps) {
  return (
    <main className="relative flex h-svh flex-col overflow-hidden bg-background px-6 py-6 md:px-10">
      <Logo withBack />
      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">
        {kicker ? (
          <p className="text-[10px] tracking-[0.32em] uppercase text-white/45">
            {kicker}
          </p>
        ) : null}
        <h1 className="font-display mt-3 text-4xl text-white md:text-5xl">{title}</h1>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-white/70">
          {children}
        </div>
      </section>
    </main>
  );
}
