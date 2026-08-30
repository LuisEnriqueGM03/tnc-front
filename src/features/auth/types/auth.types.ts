import { z } from 'zod';

export const sessionClaimsSchema = z.object({
  sub: z.string().min(1),
  discordId: z.string().min(1),
});

export type SessionClaims = z.infer<typeof sessionClaimsSchema>;

export const apiUserSchema = z.object({
  id: z.string().min(1),
  discordId: z.string().min(1),
  username: z.string().min(1),
  globalName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
});

export type ApiUser = z.infer<typeof apiUserSchema>;

export type SessionUser = ApiUser;

export type AuthState =
  | { status: 'loading' }
  | { status: 'authenticated'; user: SessionUser }
  | { status: 'unauthenticated' };

export type MeResponse = { authenticated: true; user: SessionUser } | { authenticated: false };
