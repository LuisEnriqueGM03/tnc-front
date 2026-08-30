'use client';

import * as React from 'react';
import { getMe } from '../api/get-me';
import type { AuthState } from '../types/auth.types';

export function useSession(): AuthState {
  const [state, setState] = React.useState<AuthState>({ status: 'loading' });

  React.useEffect(() => {
    let isCancelled = false;

    getMe()
      .then((result) => {
        if (isCancelled) {
          return;
        }
        setState(
          result.authenticated
            ? { status: 'authenticated', user: result.user }
            : { status: 'unauthenticated' }
        );
      })
      .catch(() => {
        if (!isCancelled) {
          setState({ status: 'unauthenticated' });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return state;
}
