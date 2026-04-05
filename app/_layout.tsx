import { DarkMode, StyledComponentsRegistry } from '@/lib/registry';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  return (
     <StyledComponentsRegistry>
       <DarkMode />
        <main className="antialiased">
          <Outlet />
        </main>
        <StyledComponentsRegistry />
      </StyledComponentsRegistry>
    );
}
