export default function LoadingPage(): React.ReactElement {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <span className="status-pulse-online" aria-hidden="true" />
      <p className="font-mono-data text-xs tracking-widest text-[var(--color-muted)] uppercase">
        Inicializando...
      </p>
    </div>
  );
}
