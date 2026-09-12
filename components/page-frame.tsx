export function PageFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 inset-x-0 -z-10 hidden md:block"
    >
      <div
        className="absolute inset-y-0 w-px bg-border"
        style={{ left: "calc(50% - var(--container-content) / 2)" }}
      />
      <div
        className="absolute inset-y-0 w-px bg-border"
        style={{ right: "calc(50% - var(--container-content) / 2)" }}
      />
    </div>
  );
}
