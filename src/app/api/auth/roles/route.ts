import { NextResponse, type NextRequest } from 'next/server';
import { ApiError } from '@/shared/lib/errors';
import { parseJwtPayload, SESSION_COOKIE_NAME } from '@/features/auth';
import { getDiscordRoles } from '@/features/roles';
import type { DiscordRolesResponse } from '@/features/roles';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token || !parseJwtPayload(token)) {
    return NextResponse.json<DiscordRolesResponse>({ authenticated: false });
  }

  try {
    const roles = await getDiscordRoles(token);
    return NextResponse.json<DiscordRolesResponse>({ authenticated: true, roles });
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 401) {
      return NextResponse.json<DiscordRolesResponse>({ authenticated: false });
    }

    return NextResponse.json<DiscordRolesResponse>({ authenticated: true, roles: [] });
  }
}
