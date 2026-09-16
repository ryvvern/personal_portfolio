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
    const duration = 0.045;

    const bufferSize = Math.ceil(context.sampleRate * duration);
    const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }

    const noiseSource = context.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(2000, startAt);
    bandpass.Q.setValueAtTime(7, startAt);

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.18, startAt + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

    noiseSource.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(context.destination);

    noiseSource.start(startAt);
    noiseSource.stop(startAt + duration);
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
