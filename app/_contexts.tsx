'use client';

import React from 'react';
import { LocaleProvider } from './locales/LocaleProvider';
import { AuthProvider } from './(main)/contexts/auth/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LocaleProvider>
        {children}
      </LocaleProvider>
    </AuthProvider>
  );
}

export default Providers;
