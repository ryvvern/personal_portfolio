"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useRef, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const audioContextRef = useRef<AudioContext | null>(null);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  function playToggleClick() {
    if (typeof window === "undefined") {
      return;
    }

    const AudioContextClass = window.AudioContext;

    if (!AudioContextClass) {
      return;
    }

    const context =
      audioContextRef.current ?? new AudioContextClass();

    audioContextRef.current = context;

    const startAt = context.currentTime;
    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(0.0001, startAt);
    masterGain.gain.exponentialRampToValueAtTime(0.08, startAt + 0.01);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.12);
    masterGain.connect(context.destination);

    const toneA = context.createOscillator();
    toneA.type = "triangle";
    toneA.frequency.setValueAtTime(740, startAt);
    toneA.frequency.exponentialRampToValueAtTime(620, startAt + 0.12);
    toneA.connect(masterGain);
    toneA.start(startAt);
    toneA.stop(startAt + 0.12);

    const toneB = context.createOscillator();
    toneB.type = "sine";
    toneB.frequency.setValueAtTime(1180, startAt + 0.02);
    toneB.frequency.exponentialRampToValueAtTime(960, startAt + 0.12);
    toneB.connect(masterGain);
    toneB.start(startAt + 0.02);
    toneB.stop(startAt + 0.1);
  }

  if (!mounted) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/70 backdrop-blur">
        <div className="h-4 w-4 rounded-full bg-muted" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      aria-label="Toggle theme"
      variant="outline"
      size="icon-lg"
      className="rounded-full border-border/60 bg-card/70 backdrop-blur transition-transform duration-300 hover:scale-[1.04]"
      onClick={() => {
        playToggleClick();
        setTheme(isDark ? "light" : "dark");
      }}
    >
      <motion.span
        key={resolvedTheme}
        initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <SunMedium className="size-4.5" /> : <MoonStar className="size-4.5" />}
      </motion.span>
    </Button>
  );
}
