"use client";

import { startTransition, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site-config";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "opening">("idle");

  function updateField(field: keyof typeof initialState, value: string) {
    startTransition(() => {
      setForm((current) => ({
        ...current,
        [field]: value,
      }));
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = `Portfolio inquiry from ${form.name || "a visitor"}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n");

    const href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus("opening");
    window.location.href = href;
    setForm(initialState);

    window.setTimeout(() => {
      setStatus("idle");
    }, 1400);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        aria-label="Your name"
        placeholder="Your name"
        value={form.name}
        onChange={(event) => updateField("name", event.target.value)}
        className="h-12 rounded-2xl border-border/60 bg-background/80 px-4"
        required
      />
      <Input
        aria-label="Your email"
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={(event) => updateField("email", event.target.value)}
        className="h-12 rounded-2xl border-border/60 bg-background/80 px-4"
        required
      />
      <Textarea
        aria-label="Project details"
        placeholder="Tell me a little about the product, timeline, or role..."
        value={form.message}
        onChange={(event) => updateField("message", event.target.value)}
        className="min-h-36 rounded-2xl border-border/60 bg-background/80 px-4 py-3"
        required
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted-foreground">
          The form opens your default mail client to send directly to{" "}
          <span className="text-foreground">{siteConfig.email}</span>.
        </p>
        <Button
          type="submit"
          className="h-12 rounded-full px-5 text-sm font-semibold"
        >
          {status === "opening" ? "Opening mail app" : "Send message"}
          <ArrowUpRight className="size-4.5" />
        </Button>
      </div>
    </form>
  );
}
