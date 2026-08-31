import { NextResponse, type NextRequest } from 'next/server';
import { getSessionCookieOptions, isValidJwt, SESSION_COOKIE_NAME } from '@/features/auth';

const DEFAULT_REDIRECT = '/dashboard';

function getBaseUrl(request: NextRequest): string {
  const forwardedHost =
    request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  const forwardedProto =
    request.headers.get('x-forwarded-proto') ?? 'https';

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return request.nextUrl.origin;
}

function buildLoginRedirect(request: NextRequest, errorCode: string): NextResponse {
  const baseUrl = getBaseUrl(request);
  const loginUrl = new URL('/login', baseUrl);
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

  const baseUrl = getBaseUrl(request);
  const destinationPath =
    nextPath && nextPath.startsWith('/') ? nextPath : DEFAULT_REDIRECT;
  const destination = new URL(destinationPath, baseUrl);

  const response = NextResponse.redirect(destination);
  response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions());

  return response;
}
