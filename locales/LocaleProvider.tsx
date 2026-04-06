'use client';

import React, { createContext, useContext } from 'react';

type Locale = 'en' | 'zh-TW';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

const translations: Record<Locale, Record<string, string>> = {
  en: {
    'Auth.loginTitle': 'Welcome Back',
    'Auth.loginSubtitle': 'Sign in to your account',
    'Auth.emailPlaceholder': 'Email',
    'Auth.passwordPlaceholder': 'Password',
    'Auth.signIn': 'Sign In',
    'Auth.continueWith': 'Continue with Google',
    'Auth.noAccount': "Don't have an account? Sign up",
    'Auth.signupTitle': 'Create Account',
    'Auth.signupSubtitle': 'Sign up to get started',
    'Auth.namePlaceholder': 'Name',
    'Auth.signUp': 'Sign Up',
    'Auth.haveAccount': 'Already have an account? Sign in',
  },
  'zh-TW': {
    'Auth.loginTitle': '歡迎回來',
    'Auth.loginSubtitle': '登入您的帳戶',
    'Auth.emailPlaceholder': '電子郵件',
    'Auth.passwordPlaceholder': '密碼',
    'Auth.signIn': '登入',
    'Auth.continueWith': '使用 Google 登入',
    'Auth.noAccount': '沒有帳戶？註冊',
    'Auth.signupTitle': '建立帳戶',
    'Auth.signupSubtitle': '註冊開始使用',
    'Auth.namePlaceholder': '姓名',
    'Auth.signUp': '註冊',
    'Auth.haveAccount': '已經有帳戶了？登入',
  },
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>('en');
  const t = (key: string): string => translations[locale]?.[key] || key;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}

export default LocaleContext;
