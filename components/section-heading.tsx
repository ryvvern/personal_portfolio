type SectionHeadingProps = {
  title: string;
  count?: number;
};

export function SectionHeading({ title, count }: SectionHeadingProps) {
  return (
    <h2 className="mb-5 text-section font-semibold text-foreground">
      {title}
      {count !== undefined && (
        <sup className="text-label text-muted-foreground">{count}</sup>
      )}
    </h2>
  );
}
