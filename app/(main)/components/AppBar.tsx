'use client';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const YixinAvatar = () => (
  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20 }}>🎨</Text>
  </View>
);

const AccountMenu = () => (
  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20 }}>👤</Text>
  </View>
);

export default function AppBar() {
  const router = useRouter();
  const mdDown = false;

  return (
     <View style={{ padding: 16, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between' }}>
       <TouchableOpacity onPress={() => router.push('/(main)/(tabs)/index')} style={{ width: mdDown ? 120 : 40, height: 40, justifyContent: 'center' }}>
         {mdDown ? (
           <Text style={{ fontSize: 18 }}>Yixin</Text>
         ) : (
           <YixinAvatar />
         )}
       </TouchableOpacity>
       <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
         <AccountMenu />
       </TouchableOpacity>
       </View>
     );
}
