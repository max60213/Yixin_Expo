import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Providers } from './_contexts';

export { ErrorBoundary } from 'expo-router';

function AuthRedirect() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const path = segments.join('/');
    
    if (!path.startsWith('auth') && path !== '') {
      // Auth state will be checked in Providers/AuthContext
    }
    
    if (path.startsWith('auth') && path !== 'auth') {
      // Will be handled by AuthContext auth state
    }
  }, [segments]);

  return null;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <AuthRedirect />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />
          <Stack.Screen name="(main)" />
        </Stack>
      </Providers>
    </GestureHandlerRootView>
  );
}

export { ErrorBoundary } from 'expo-router';


