export { ErrorBoundary } from 'expo-router';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
     <Stack screenOptions={{ headerShown: false }}>
     </Stack>
   );
}
