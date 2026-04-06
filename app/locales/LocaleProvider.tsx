'use client';

import React, { createContext, useContext } from 'react';

const LocaleContext = createContext<{
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState('en');

  const t = (key: string) => {
    // Simple fallback - return key if no translation found
    const translations: Record<string, string> = {
      'Auth.signupTitle': 'Create Account',
      'Auth.signupSubtitle': 'Sign up to get started',
      'Auth.namePlaceholder': 'Name',
      'Auth.emailPlaceholder': 'Email',
      'Auth.passwordPlaceholder': 'Password',
      'Auth.signUp': 'Sign Up',
      'Auth.haveAccount': 'Already have an account? Sign in',
    };
    return translations[key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

export default LocaleProvider;
