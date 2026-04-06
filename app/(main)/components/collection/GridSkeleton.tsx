'use client';

import React from 'react';
import { View, Text } from 'react-native';

interface GridSkeletonProps {
  count?: number;
}

export function GridSkeleton({ count = 6 }: GridSkeletonProps) {
  const skeletons = Array.from({ length: count });

  return (
    <View style={{ flex: 1 }}>
      {skeletons.map((_, index) => (
        <View key={index} style={{ width: '48%', marginBottom: 16, backgroundColor: '#fff' }}>
          <View style={{ width: '100%', aspectRatio: 1, backgroundColor: '#f0f0f0' }}>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0' }}>
              <View style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5' }} />
            </View>
          </View>
          
          <View style={{ padding: 12 }}>
            <View style={{ height: 16, width: '80%', backgroundColor: '#e0e0e0', borderRadius: 4, marginBottom: 8 }} />
            <View style={{ height: 12, width: '40%', backgroundColor: '#e0e0e0', borderRadius: 4 }} />
          </View>
        </View>
      ))}
    </View>
  );
}
