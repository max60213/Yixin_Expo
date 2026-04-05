'use client';

import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
     const timer = setTimeout(() => {
       router.replace('/(main)');
        }, 3000);

     return () => clearTimeout(timer);
     }, []);

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
       <View style={{ alignItems: 'center' }}>
         <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 16 }}>
           Success!
         </Text>
         <Text style={{ fontSize: 16, color: '#666', marginBottom: 32 }}>
           You have successfully signed up
         </Text>
         <TouchableOpacity
           onPress={() => router.replace('/(main)')}
           style={{
             backgroundColor: '#007AFF',
             paddingHorizontal: 32,
             paddingVertical: 12,
             borderRadius: 8,
           }}
         >
           <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
             Continue
           </Text>
         </TouchableOpacity>
       </View>
     </SafeAreaView>
   );
};

export default SuccessPage;
