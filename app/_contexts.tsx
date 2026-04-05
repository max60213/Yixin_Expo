'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './(auth)/contexts/AuthContext';
import { LocaleProvider } from './locales/LocaleProvider';

export function Providers() {
  const [queryClient] = React.useState(
     () =>
         new QueryClient({
          defaultOptions: {
            queries: {
             staleTime: 60 * 1000,
             },
             },
           }),
      );

  return (
     <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocaleProvider>
            <Outlet />
           </LocaleProvider>
         </AuthProvider>
       </QueryClientProvider>
     );
}

export default Providers;

export { Outlet } from 'expo-router';
