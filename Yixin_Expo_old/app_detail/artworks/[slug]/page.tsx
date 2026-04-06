
'use client';

import React, { useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function ArtworkPage() {
  const params = useLocalSearchParams<{ slug?: string }>();
  const [activeTab, setActiveTab] = useState('info');

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
       <View style={{ padding: 16, paddingTop: 60 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>
            Artwork Details
          </Text>
          <Text style={{ color: '#666', marginBottom: 24 }}>
            {params.slug || 'Artwork #123'}
          </Text>
           
          <View style={{ height: 300, backgroundColor: '#f0f0f0', borderRadius: 12, marginBottom: 24, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#999' }}>Artwork Image</Text>
          </View>
           
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
               <Text style={{ color: activeTab === 'info' ? '#fff' : '#666' }}>
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
                 <Text style={{ color: activeTab === 'activities' ? '#fff' : '#666' }}>
                   Activities
                 </Text>
               </TouchableOpacity>
              </ScrollView>
              
              <View style={{ marginTop: 24 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                 Description
                </Text>
                <Text style={{ color: '#666' }}>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </Text>
              </View>
          </View>
         <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
           {activeTab === 'activities' && (
             <View style={{ padding: 16 }}>
               <Text style={{ color: '#999' }}>Activities list placeholder</Text>
             </View>
           )}
           {activeTab === 'info' && (
             <View style={{ padding: 16 }}>
               <Text style={{ color: '#999' }}>Info tab content</Text>
             </View>
           )}
         </ScrollView>
       </SafeAreaView>
    );
}
