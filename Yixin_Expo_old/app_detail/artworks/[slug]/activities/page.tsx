
'use client';

import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function ArtworksActivitiesPage() {
  const params = useLocalSearchParams<{ slug?: string }>();

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ padding: 16, paddingTop: 60 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
            Activities
          </Text>
          <Text style={{ color: '#999' }}>
            Activities for artwork: {params.slug}
          </Text>
        </View>
      </SafeAreaView>
  );
}
