import { NextResponse, type NextRequest } from 'next/server';
import { apiFetch } from '@/shared/lib/api';
import {
  apiUserSchema,
  parseJwtPayload,
  SESSION_COOKIE_NAME,
  type MeResponse,
} from '@/features/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json<MeResponse>({ authenticated: false });
  }

  if (!parseJwtPayload(token)) {
    return NextResponse.json<MeResponse>({ authenticated: false });
  }

  try {
    const rawUser = await apiFetch<unknown>('/auth/me', { token });
    const parsed = apiUserSchema.safeParse(rawUser);

    if (!parsed.success) {
      return NextResponse.json<MeResponse>({ authenticated: false });
    }

    return NextResponse.json<MeResponse>({
      authenticated: true,
      user: parsed.data,
    });
  } catch {
    return NextResponse.json<MeResponse>({ authenticated: false });
  }
}
