import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Logo } from "@/components/shared/Logo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell A101 Studio what you want made.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-svh flex-col bg-background px-6 py-6 md:px-10">
      <Logo withBack />
      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-12">
        <p className="text-[11px] tracking-[0.28em] uppercase text-white/45">
          Contact
        </p>
        <h1 className="font-display mt-3 text-4xl text-white md:text-5xl">
          What do you want made
        </h1>
        <p className="mt-5 mb-10 text-[15px] leading-relaxed text-white/60">
          Pick a way of looking. We will take it from there.
        </p>
        <ContactForm />
      </section>
    </main>
  );
}
