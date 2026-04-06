const fs = require('fs');
const { execSync } = require('child_process');

// Root layout
const rootLayout = `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
     <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    );
}
`;

fs.writeFileSync('_layout.tsx', rootLayout);
console.log('Created: _layout.tsx');

// Auth layout
const authLayout = `
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
     <Stack screenOptions={{ headerShown: false }}>
       <Stack.Screen name="auth/login" />
       <Stack.Screen name="auth/signup" />
       <Stack.Screen name="auth/confirm" />
       <Stack.Screen name="auth/success" />
     </Stack>
   );
}
`;

fs.writeFileSync('_layout_auth.tsx', authLayout);
console.log('Created: _layout_auth.tsx');

// Main layout
const mainLayout = `
import { Tabs } from 'expo-router';

function TabIcon({ name, focused }) {
  return (
     {name}
      <Text
       style={{
         fontSize: 12,
         color: focused ? '#007AFF' : '#999',
         marginTop: 4,
        }}
      >
        {name}
      </Text>
      </>
  );
}

export default function MainLayout() {
  return (
     <Tabs screenOptions={{ headerShown: false }}>
       <Tabs.Screen name="index" options={{ title: 'Home' }} />
       <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
       <Tabs.Screen name="search" options={{ title: 'Search' }} />
       <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
     );
}
`;

fs.writeFileSync('_layout_main.tsx', mainLayout);
console.log('Created: _layout_main.tsx');

// Locale layout
const localeLayout = 'export default function LocaleLayout() { return null; }';
fs.writeFileSync('_layout_locale.tsx', localeLayout);
console.log('Created: _layout_locale.tsx');

console.log('Expo Router config complete!');
