import { Tabs } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function TabIcon({ name, focused }) {
  return (
     <View style={{ alignItems: 'center' }}>
        <MaterialIcons name={name} size={24} color={focused ? '#007AFF' : '#999'} />
         <Text
         style={{
           fontSize: 12,
           color: focused ? '#007AFF' : '#999',
           marginTop: 2,
           }}
         >
          {name}
         </Text>
        </View>
      );
}

export default function TabLayout() {
  return (
     <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          paddingBottom: 5,
          paddingTop: 5,
          height: 65,
         },
        }}
       >
       <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
         }}
         />
        <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <TabIcon name="explore" focused={focused} />,
         }}
         />
        <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabIcon name="search" focused={focused} />,
         }}
         />
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} />,
         }}
         />
        </Tabs>
      );
}
