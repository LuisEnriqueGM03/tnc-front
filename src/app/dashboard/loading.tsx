export default function DashboardLoadingPage(): React.ReactElement {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-8 w-64 animate-pulse border border-[var(--color-border-subtle)] bg-[var(--color-surface-abyss)]" />
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse border border-[var(--color-border-subtle)] bg-[var(--color-surface-abyss)]"
          />
        ))}
      </div>
    </div>
  );
}
