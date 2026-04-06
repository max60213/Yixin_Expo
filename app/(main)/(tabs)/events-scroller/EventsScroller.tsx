'use client';

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import type { EventListItem } from './types';

interface EventsScrollerProps {
  data?: EventListItem[];
  title: string;
}

function getEventCardData(item: EventListItem) {
  return {
    id: item.documentId,
    title: item.title,
    publishDate: item.publishDate,
    cover: item.cover,
    tags: item.tags,
  };
}

const EventsScroller = ({ data, title }: EventsScrollerProps) => {
  const router = useRouter();

  if (!data || data.length === 0) return null;

  const cards = data.map(getEventCardData);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cards.map((card) => (
          <View key={card.id} style={styles.card}>
            <View style={styles.cardImagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Event</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {card.title}
              </Text>
              <Text style={styles.cardDate}>{card.publishDate}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 0,
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default EventsScroller;
