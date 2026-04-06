'use client';

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import type { ArtworkListItem } from './types';

interface ArtworksMasonryProps {
  data?: ArtworkListItem[];
  skeletonCount?: number;
}

function getArtworkCardData(item: ArtworkListItem) {
  return {
    id: item.documentId,
    title: item.title,
    yearFinish: item.yearFinish,
    scannedImage: item.scannedImage,
  };
}

const ArtworksMasonry = ({ data, skeletonCount = 12 }: ArtworksMasonryProps) => {
  const router = useRouter();

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>探索更多</Text>
        <View style={styles.skeletonGrid}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <View key={index} style={styles.skeletonCard}>
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (data.length === 0) return null;

  const cards = data.map(getArtworkCardData);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>探索更多</Text>
      <View style={styles.gridContainer}>
        {cards.map((card) => (
          <View key={card.id} style={styles.card}>
            <View style={styles.cardImagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Artwork</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {card.title}
              </Text>
              <Text style={styles.cardYear}>
                {card.yearFinish || 'N/A'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 8,
  },
  skeletonCard: {
    width: '48%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 8,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 0,
  },
  cardImagePlaceholder: {
    height: 160,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#999',
    fontSize: 14,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  cardYear: {
    fontSize: 12,
    color: '#666',
  },
});

export default ArtworksMasonry;
