import { describe, expect, it } from 'vitest';
import { isValidJwt, parseJwtPayload } from './session-cookie';

function encodeBase64Url(input: string): string {
  return Buffer.from(input).toString('base64url');
}

function buildJwt(payload: object): string {
  const header = encodeBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = encodeBase64Url(JSON.stringify(payload));
  return `${header}.${body}.firma-ficticia`;
}

describe('parseJwtPayload', () => {
  it('decodifica las claims de un JWT válido', () => {
    const token = buildJwt({ sub: 'uuid-usuario', discordId: '123456789' });

    expect(parseJwtPayload(token)).toEqual({
      sub: 'uuid-usuario',
      discordId: '123456789',
    });
  });

  it('devuelve null si el token no tiene tres segmentos', () => {
    expect(parseJwtPayload('solo-un-segmento')).toBeNull();
  });

  it('devuelve null si el payload no es JSON válido', () => {
    const token = `a.${encodeBase64Url('no-es-json')}.c`;
    expect(parseJwtPayload(token)).toBeNull();
  });

  it('devuelve null si el payload no contiene las claims esperadas', () => {
    const token = buildJwt({ sub: 'solo-sub' });
    expect(parseJwtPayload(token)).toBeNull();
  });
});

describe('isValidJwt', () => {
  it('reconoce un JWT con estructura válida', () => {
    const token = buildJwt({ sub: 'a', discordId: 'b' });
    expect(isValidJwt(token)).toBe(true);
  });

  it('rechaza tokens corruptos', () => {
    expect(isValidJwt('')).toBe(false);
    expect(isValidJwt('a.b')).toBe(false);
  });
});
