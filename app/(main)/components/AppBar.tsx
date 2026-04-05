'use client';

import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from '@/i18n/navigation';

const Yixin_avatar = () => (
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
  const mdDown = window.innerWidth < 768;

  return (
     <SafeAreaView style={{ paddingTop: 60, backgroundColor: '#fff' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
          <Link href="/">
             {mdDown ? (
                <View style={{ width: 120, height: 30, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18 }}>Yixin</Text>
                 </View>
              ) : (
                <View style={{ width: 40, height: 40 }}>
                  <Yixin_avatar />
                 </View>
               )}
              </Link>
              <TouchableOpacity style={{ width: 40, height: 40 }}>
                <AccountMenu />
              </TouchableOpacity>
            </View>
           </SafeAreaView>
         );
}
