export function formatDiscordColor(color: number): string {
  const hex = color.toString(16).padStart(6, '0');
  return `#${hex}`;
}
