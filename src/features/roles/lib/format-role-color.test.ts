import { describe, expect, it } from 'vitest';
import { formatDiscordColor } from './format-role-color';

describe('formatDiscordColor', () => {
  it('convierte el valor decimal 0 en negro hexadecimal', () => {
    expect(formatDiscordColor(0)).toBe('#000000');
  });

  it('convierte un color Discord a hexadecimal sin padding extra', () => {
    expect(formatDiscordColor(0xff007f)).toBe('#ff007f');
  });

  it('rellena con ceros los canales cortos', () => {
    expect(formatDiscordColor(0xf)).toBe('#00000f');
  });

  it('convierte el máximo valor de 24 bits', () => {
    expect(formatDiscordColor(0xffffff)).toBe('#ffffff');
  });
});
