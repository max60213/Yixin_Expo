'use client';

import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Artwork {
  id: string;
  documentId?: string;
  title: string;
  yearFinish?: string | null;
  scannedImage?: { url: string };
}

const categoryColors: Record<string, string> = {
  painting: '#007AFF',
  sculpture: '#FF6B35',
  photography: '#4ECDC4',
  digital: '#A8E6CF',
  default: '#333333',
};

export default function CategoryPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const category = (params.category as string) || 'all';

  const [artworksData, setArtworksData] = useState<Artwork[]>([
    { id: 1, documentId: 'artwork-001', title: 'Sunset Over Mountains', yearFinish: '2023', scannedImage: { url: 'https://via.placeholder.com/300x300' } },
    { id: 2, documentId: 'artwork-002', title: 'Urban Dreams', yearFinish: '2024', scannedImage: { url: 'https://via.placeholder.com/300x300' } },
    { id: 3, documentId: 'artwork-003', title: 'Silent Waters', yearFinish: '2023', scannedImage: { url: 'https://via.placeholder.com/300x300' } },
    { id: 4, documentId: 'artwork-004', title: 'Golden Hour', yearFinish: '2024', scannedImage: { url: 'https://via.placeholder.com/300x300' } },
    { id: 5, documentId: 'artwork-005', title: 'Abstract Thoughts', yearFinish: null, scannedImage: { url: 'https://via.placeholder.com/300x300' } },
    { id: 6, documentId: 'artwork-006', title: "Nature's Symphony", yearFinish: '2024', scannedImage: { url: 'https://via.placeholder.com/300x300' } },
  ]);

  const getCategoryColor = () => categoryColors[category.toLowerCase()] || categoryColors.default;
  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const renderItem = ({ item }: { item: Artwork }) => (
    <TouchableOpacity
      style={{ width: '32%', marginBottom: 16, backgroundColor: '#fff' }}
      onPress={() => router.push(`/artworks/${item.documentId}`)}
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
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ 
        height: 200, 
        backgroundColor: getCategoryColor(),
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff' }}>
          {displayCategory}
        </Text>
      </View>

      <FlatList
        data={artworksData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={3}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </ScrollView>
  );
}
