import { Tabs } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
     <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 24, color: focused ? '#007AFF' : '#999', marginBottom: 4 }}>
          {name}
        </Text>
        <Text style={{ fontSize: 10, color: focused ? '#007AFF' : '#999' }}>
          {name}
        </Text>
      </View>
    );
}

export default function TabLayout() {
  return (
      <Tabs screenOptions={{ headerShown: false }}>
         <Tabs.Screen name="index" options={{ title: 'Home' }} />
         <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
         <Tabs.Screen name="search" options={{ title: 'Search' }} />
         <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
      );
}
