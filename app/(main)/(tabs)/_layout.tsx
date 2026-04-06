import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View } from 'react-native';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
    'Home': 'home',
    'Explore': 'explore',
    'Search': 'search',
    'Profile': 'person',
  };

  return (
     <View style={{ alignItems: 'center' }}>
        <MaterialIcons 
          name={iconMap[name] || 'home'} 
          size={24} 
          color={focused ? '#007AFF' : '#999'} 
        />
      </View>
    );
}

export default function TabLayout() {
  return (
      <Tabs screenOptions={{ headerShown: false }}>
         <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} /> }} />
         <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ focused }) => <TabIcon name="Explore" focused={focused} /> }} />
         <Tabs.Screen name="search" options={{ title: 'Search', tabBarIcon: ({ focused }) => <TabIcon name="Search" focused={focused} /> }} />
         <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} /> }} />
        </Tabs>
      );
}
