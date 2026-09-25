"use client";

import { useMemo, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { contactSubjects, studio, type ContactSubject } from "@/lib/studio";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<ContactSubject>("storytelling");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const needsNote = subject === "other";
  const canSend = email.trim().length > 3 && (!needsNote || message.trim().length > 2);

  const mailBody = useMemo(() => {
    const chosen =
      contactSubjects.find((item) => item.id === subject)?.label ?? subject;
    return [
      `Name: ${name || "—"}`,
      `Email: ${email}`,
      `Looking for: ${chosen}`,
      "",
      message || "—",
    ].join("\n");
  }, [email, message, name, subject]);

  const send = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSend || status === "sending") return;
    setStatus("sending");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(studio.email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name || "A101 inquiry",
            email,
            _subject: `A101 Studio — ${contactSubjects.find((item) => item.id === subject)?.label}`,
            looking_for: subject,
            message: mailBody,
          }),
        },
      );
      if (!response.ok) throw new Error("send failed");
      setStatus("sent");
    } catch {
      window.location.href = `mailto:${studio.email}?subject=${encodeURIComponent(
        `A101 Studio — ${contactSubjects.find((item) => item.id === subject)?.label}`,
      )}&body=${encodeURIComponent(mailBody)}`;
      setStatus("sent");
    }
  };

  if (status === "sent") {
    return (
      <p className="font-display text-3xl text-white">
        Sent. We will write back.
      </p>
    );
  }

  return (
    <form onSubmit={send} className="space-y-8">
      <fieldset>
        <legend className="mb-4 text-[11px] tracking-[0.28em] uppercase text-white/45">
          What do you want made
        </legend>
        <div className="grid gap-px bg-white/70 sm:grid-cols-3">
          {contactSubjects.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSubject(item.id)}
              className={cn(
                "bg-background px-4 py-5 text-left text-sm tracking-[0.12em] uppercase transition-colors",
                subject === item.id
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2 block text-[11px] tracking-[0.28em] uppercase text-white/45">
          Name
        </span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full border-b border-white/25 bg-transparent py-3 text-white outline-none placeholder:text-white/25 focus:border-white"
          autoComplete="name"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] tracking-[0.28em] uppercase text-white/45">
          Email
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full border-b border-white/25 bg-transparent py-3 text-white outline-none placeholder:text-white/25 focus:border-white"
          autoComplete="email"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] tracking-[0.28em] uppercase text-white/45">
          {needsNote ? "What do you actually want" : "A note, if you have one"}
        </span>
        <textarea
          required={needsNote}
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full resize-none border-b border-white/25 bg-transparent py-3 text-white outline-none placeholder:text-white/25 focus:border-white"
        />
      </label>

      <button
        type="submit"
        disabled={!canSend || status === "sending"}
        className="text-xs tracking-[0.28em] uppercase text-white disabled:text-white/30"
      >
        {status === "sending" ? "Sending" : "Send"}
      </button>
    </form>
  );
}
