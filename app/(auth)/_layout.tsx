import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="confirm" options={{ title: 'Confirm Email' }} />
      <Stack.Screen name="success" options={{ title: 'Account Created' }} />
    </Stack>
  );
}
