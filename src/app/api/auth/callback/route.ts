import { NextResponse, type NextRequest } from 'next/server';
import { getSessionCookieOptions, isValidJwt, SESSION_COOKIE_NAME } from '@/features/auth';

const DEFAULT_REDIRECT = '/dashboard';

function buildLoginRedirect(request: NextRequest, errorCode: string): NextResponse {
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('error', errorCode);
  return NextResponse.redirect(loginUrl);
}

export function GET(request: NextRequest): NextResponse {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const errorCode = searchParams.get('error');
  const nextPath = searchParams.get('next');

  if (errorCode) {
    return buildLoginRedirect(request, errorCode);
  }

  if (!token || !isValidJwt(token)) {
    return buildLoginRedirect(request, 'invalid_token');
  }

  const destinationPath = nextPath && nextPath.startsWith('/') ? nextPath : DEFAULT_REDIRECT;
  const destination = new URL(destinationPath, request.url);

  const response = NextResponse.redirect(destination);
  response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions());

  return response;
}
