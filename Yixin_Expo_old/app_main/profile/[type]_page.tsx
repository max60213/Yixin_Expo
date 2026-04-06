
'use client';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ProfileTypePage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(params?.type || 'artworks');

  const goBack = () => { router.back(); };

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 60 }}>
       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
         <TouchableOpacity onPress={goBack} style={{ padding: 8 }}>
           <Text style={{ fontSize: 20 }}>←</Text>
         </TouchableOpacity>
       </View>
       
       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
         Profile
         {params.type ? ' - ' + params.type : ''}
       </Text>
       
       <View style={{ backgroundColor: '#f9f9f9', borderRadius: 8, padding: 16, flex: 1 }}>
         <Text style={{ color: '#999' }}>
           Profile
           {params.type ? ' - ' + params.type : ''}
           {' '}Content Placeholder
         </Text>
       </View>
     </SafeAreaView>
   );
}
