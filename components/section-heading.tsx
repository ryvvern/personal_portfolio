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
      <p className="font-mono text-label uppercase tracking-[0.28em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-heading font-semibold tracking-[-0.045em] text-balance">
        {title}
      </h2>
      <p className="text-secondary leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
