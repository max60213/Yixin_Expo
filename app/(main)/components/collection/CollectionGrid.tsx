'use client';

import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';

interface Artwork {
  id: string;
  documentId?: string;
  title: string;
  yearFinish?: string | null;
  scannedImage?: { url: string };
}

interface CollectionGridProps {
  data: Artwork[];
  onArtworkPress?: (artwork: Artwork) => void;
}

export function CollectionGrid({ data, onArtworkPress }: CollectionGridProps) {
  const renderItem = ({ item }: { item: Artwork }) => (
    <TouchableOpacity
      style={{ width: '48%', marginBottom: 16, backgroundColor: '#fff' }}
      onPress={() => onArtworkPress?.(item)}
    >
      <View style={{ width: '100%', aspectRatio: 1, backgroundColor: '#f0f0f0' }}>
        {item.scannedImage?.url ? (
          <Image 
            source={{ uri: item.scannedImage.url }} 
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 48 }}>🎨</Text>
          </View>
        )}
      </View>
      
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', numberOfLines: 2 }}>
          {item.title}
        </Text>
        
        {item.yearFinish && (
          <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            {item.yearFinish}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item: Artwork) => item.documentId || item.id;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentContainerStyle={{ padding: 16 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
    />
  );
}
