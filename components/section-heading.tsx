import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4",
        align === "center" && "mx-auto text-center"
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-[-0.045em] text-balance md:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-muted-foreground md:text-[1.02rem]">
        {description}
      </p>
    </div>
  );
}
