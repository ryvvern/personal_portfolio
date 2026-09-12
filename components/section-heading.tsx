type SectionHeadingProps = {
  eyebrow: string;
};

export function SectionHeading({ eyebrow }: SectionHeadingProps) {
  return (
    <p className="text-label uppercase tracking-wide text-muted-foreground">
      {eyebrow}
    </p>
  );
}
