import { Logo } from "@/components/shared/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <Logo />
      <p className="font-display text-3xl">This frame is empty.</p>
      <p className="text-sm tracking-[0.18em] uppercase text-white/45">
        Return to the studio
      </p>
    </main>
  );
}
