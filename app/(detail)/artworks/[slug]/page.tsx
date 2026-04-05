'use client';

import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

const ArtworkDetail = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState('info');

  return (
     <View style={{ flex: 1, backgroundColor: '#fff' }}>
       <View style={{ padding: 16, paddingTop: 60 }}>
         <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 8,
            lineHeight: 32,
            }}
         >
          Artwork Details
         </Text>
         <Text style={{ color: '#666', marginBottom: 24 }}>
           {slug || 'Artwork #123'}
         </Text>

         <View
          style={{
            height: 300,
            backgroundColor: '#f0f0f0',
            borderRadius: 12,
            marginBottom: 24,
            justifyContent: 'center',
            alignItems: 'center',
            }}
         >
           <Text style={{ color: '#999' }}>Artwork Image</Text>
         </View>

         <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
         >
           <TouchableOpacity
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              marginRight: 8,
              backgroundColor: activeTab === 'info' ? '#007AFF' : '#f5f5f5',
              borderRadius: 20,
              }}
            onPress={() => setActiveTab('info')}
           >
             <Text
              style={{
                color: activeTab === 'info' ? '#fff' : '#666',
                fontWeight: '600',
                fontSize: 16,
                }}
             >
               Info
             </Text>
           </TouchableOpacity>
           <TouchableOpacity
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              marginRight: 8,
              backgroundColor: activeTab === 'activities' ? '#007AFF' : '#f5f5f5',
              borderRadius: 20,
              }}
            onPress={() => setActiveTab('activities')}
           >
             <Text
              style={{
                color: activeTab === 'activities' ? '#fff' : '#666',
                fontWeight: '600',
                fontSize: 16,
                }}
             >
               Activities
             </Text>
           </TouchableOpacity>
         </ScrollView>

         <View style={{ marginTop: 8 }}>
           {activeTab === 'info' && (
             <View style={{ padding: 16 }}>
               <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                 Description
               </Text>
               <Text style={{ color: '#666' }}>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit...
               </Text>
             </View>
           )}
           {activeTab === 'activities' && (
             <View style={{ padding: 16 }}>
               <Text style={{ color: '#999' }}>Activities loading...</Text>
             </View>
           )}
         </View>
       </View>
     </View>
   );
};

export default ArtworkDetail;
