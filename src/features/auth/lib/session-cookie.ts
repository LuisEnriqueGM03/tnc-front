import { SESSION_MAX_AGE_SECONDS } from '@/shared/config/session';
import { sessionClaimsSchema, type SessionClaims } from '../types/auth.types';

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '@/shared/config/session';

export interface SessionCookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax';
  path: string;
  maxAge: number;
}

export function getSessionCookieOptions(): SessionCookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

export function parseJwtPayload(token: string): SessionClaims | null {
  const parts = token.split('.');
  const payloadPart = parts[1];

  if (parts.length !== 3 || !payloadPart) {
    return null;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf-8'));
  } catch {
    return null;
  }

  const parsed = sessionClaimsSchema.safeParse(payload);
  return parsed.success ? parsed.data : null;
}

export function isValidJwt(token: string): boolean {
  return parseJwtPayload(token) !== null;
}
