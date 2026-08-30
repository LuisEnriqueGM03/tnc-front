import { NextResponse, type NextRequest } from 'next/server';
import { getSessionCookieOptions, SESSION_COOKIE_NAME } from '@/features/auth';

function buildLoggedOutResponse(): NextResponse {
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}

export function POST(): NextResponse {
  return buildLoggedOutResponse();
}

export function GET(request: NextRequest): NextResponse {
  const loginUrl = new URL('/login', request.url);
  const response = NextResponse.redirect(loginUrl);
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}
