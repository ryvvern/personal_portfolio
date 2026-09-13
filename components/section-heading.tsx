type SectionHeadingProps = {
  title: string;
  count?: number;
};

export function SectionHeading({ title, count }: SectionHeadingProps) {
  return (
    <div className="pt-4 pb-3">
      <h2 className="text-section font-semibold text-foreground">
        {title}
        {count !== undefined && (
          <sup className="text-label text-muted-foreground">{count}</sup>
        )}
      </h2>
    </div>
  );
}
