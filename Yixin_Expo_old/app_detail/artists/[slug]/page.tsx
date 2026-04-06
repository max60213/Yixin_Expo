
'use client';

import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function ArtistsPage() {
  const params = useLocalSearchParams<{ slug?: string }>();

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 60 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Artist Profile
        </Text>
        <Text style={{ color: '#666', marginBottom: 24 }}>
          {params.slug || 'Artist #123'}
        </Text>
        <View style={{ height: 200, backgroundColor: '#f0f0f0', borderRadius: 12, marginBottom: 24, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#999' }}>Profile Image</Text>
        </View>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>About the artist</Text>
        <Text style={{ color: '#666' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </Text>
      </SafeAreaView>
   );
}
