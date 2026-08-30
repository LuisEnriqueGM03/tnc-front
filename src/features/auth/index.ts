export { getMe } from './api/get-me';
export { logout } from './api/logout';
export { LoginCard, type LoginCardProps } from './components/login-card';
export { UserAvatar, type UserAvatarProps } from './components/user-avatar';
export { useSession } from './hooks/use-session';
export {
  getSessionCookieOptions,
  isValidJwt,
  parseJwtPayload,
  SESSION_COOKIE_NAME,
} from './lib/session-cookie';

export type {
  ApiUser,
  AuthState,
  MeResponse,
  SessionClaims,
  SessionUser,
} from './types/auth.types';
export { apiUserSchema } from './types/auth.types';
