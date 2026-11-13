"use client";

import { useState, type FormEvent } from "react";

type State = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-fg placeholder:text-muted/70 focus:border-accent focus:outline-none";

/** Posts to Formspree. Includes a honeypot field for basic spam protection. */
export function ContactForm({ formspreeId, email }: { formspreeId: string; email: string }) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-describedby="form-status">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-muted">Name</span>
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-muted">Email</span>
          <input name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-sm text-muted">Message</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={5} className={field} />
      </label>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition hover:brightness-110 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <p id="form-status" role="status" className="text-sm text-muted">
          {state === "sent" && "Thanks, your message was sent."}
          {state === "error" && (
            <>
              Something went wrong. Please email me at{" "}
              <a href={`mailto:${email}`} className="underline">
                {email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
