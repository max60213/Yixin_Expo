
'use client';

import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function GalleriesPage() {
  const params = useLocalSearchParams<{ slug?: string }>();

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 60 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
          Gallery Profile
        </Text>
        <Text style={{ color: '#666' }}>
          {params.slug || 'Gallery #123'}
        </Text>
      </SafeAreaView>
   );
}
