'use client';

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useLocalSearchParams,
} from 'expo-router';

const ArtworkProfile = () => {
  const params = useLocalSearchParams<{ type?: string }>();
  const [activeTab, setActiveTab] = React.useState('artworks');

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
          {params.type || 'Profile'}
          </Text>

          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 20 }}>↩️</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24 }}>
            <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 32 }}>👤</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>ProfileName</Text>
              <Text style={{ color: '#666' }}>Based in Taiwan</Text>
            </View>
          </View>

         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
           <TouchableOpacity
            onPress={() => setActiveTab('artworks')}
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              marginRight: 8,
              backgroundColor: activeTab === 'artworks' ? '#007AFF' : '#f5f5f5',
              borderRadius: 20,
              }}
            >
               <Text style={{ color: activeTab === 'artworks' ? '#fff' : '#666', fontWeight: '600' }}>Artist Profile</Text>
             </TouchableOpacity>
         </ScrollView>

         <View style={{ padding: 16 }}>
           <Text style={{ color: '#999' }}>Profile</Text>
           <Text style={{ color: '#999' }}>{params.type} Content Placeholder</Text>
         </View>
        </View>
       </View>
     );
};

export default ArtworkProfile;
