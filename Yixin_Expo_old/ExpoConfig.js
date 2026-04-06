const fs = require('fs');

console.log('Building Expo Router configuration...');

// Root layout
const rootLayout = `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
     <Stack screenOptions={{ headerShown: false }}>
         {/* Auth routes will be nested here */}
        </Stack>
       );
}
`;

const rootLayoutPath = '_layout.tsx';
if (!fs.existsSync(rootLayoutPath)) {
  fs.writeFileSync(rootLayoutPath, rootLayout);
  console.log('Created:', rootLayoutPath);
} else {
  console.log('Already exists:', rootLayoutPath);
}

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
          {/* Auth success redirect route */}
           <Stack.Screen name="success" />
        </Stack>
       );
}
`;

const authLayoutPath = '_layout_auth.tsx';
if (fs.existsSync('_layout_auth.tsx')) {
  fs.writeFileSync(authLayoutPath, authLayout);
  console.log('Updated:', authLayoutPath);
} else {
  fs.writeFileSync(authLayoutPath, authLayout);
  console.log('Created:', authLayoutPath);
}

// Main layout with Tabs
const mainLayout = `
import { Tabs } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
     <MaterialIcons
      name={name}
      size={24}
      color={focused ? '#007AFF' : '#999'}
      style={{ marginTop: -6 }}
      />
    );
}

export default function MainLayout() {
  return (
     <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="index" options={{
            title: 'Yixin',
            tabBarIcon: ({ focused }) => <TabIcon name={focused ? "home" : "home"} focused={focused} />,
           }} />
           <Tabs.Screen name="explore" options={{
            title: 'Explore',
            tabBarIcon: ({ focused }) => <TabIcon name={focused ? "explore" : "explore"} focused={focused} />,
           }} />
           <Tabs.Screen name="search" options={{
            title: 'Search',
            tabBarIcon: ({ focused }) => <TabIcon name={focused ? "search" : "search"} focused={focused} />,
           }} />
           <Tabs.Screen name="profile" options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => <TabIcon name={focused ? "person" : "person"} focused={focused} />,
           }} />
           {/* Profile sub-routes */}
            <Tabs.Screen name="profile/[type]" options={{
            href: null,
            tabBarIcon: () => null,
           }} />
       </Tabs>
      );
}
`;

const mainLayoutPath = '_layout_main.tsx';
if (fs.existsSync('_layout_main.tsx')) {
  fs.writeFileSync(mainLayoutPath, mainLayout);
  console.log('Updated:', mainLayoutPath);
} else {
  fs.writeFileSync(mainLayoutPath, mainLayout);
  console.log('Created:', mainLayoutPath);
}

// Locale layout
const localeLayout = `
export default function LocaleLayout() {
  return null;
}
`;

const localeLayoutPath = '_layout_locale.tsx';
fs.writeFileSync(localeLayoutPath, localeLayout);
console.log('Created:', localeLayoutPath);

// Auth index page (redirects to home if logged in)
const authIndexPage = `
import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthIndexPage() {
  const router = useRouter();

  React.useEffect(() => {
     // Default redirect to auth page
     router.replace('/auth/login');
      }, []);

  return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <StatusBar style="auto" />
         <Text>Loading...</Text>
        </View>
      );
}
`;

const authIndexPath = 'app_auth/(auth)/page.tsx';
fs.mkdirSync('app_auth/(auth)', { recursive: true });
fs.writeFileSync(authIndexPath, authIndexPage);
console.log('Created:', authIndexPath);

console.log('\nExpo Router configuration complete!');
