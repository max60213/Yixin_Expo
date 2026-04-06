'use client';

import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useLocale } from '@/locales';
import Carousel from './carousel/Carousel';
import EventsScroller from './events-scroller/EventsScroller';
import InsightsScroller from './insights-scroller/InsightsScroller';
import ArtworksMasonry from './artworks-masonry/ArtworksMasonry';
import type { FeaturedListItem, EventListItem, InsightListItem, ArtworkListItem } from './carousel/types';

const Home = () => {
  const { t } = useLocale();
  const [refreshing, setRefreshing] = useState(false);

  const [featuredData, setFeaturedData] = useState<FeaturedListItem[]>([
    {
      id: 1,
      documentId: 'event-001',
      title: 'Contemporary Art Exhibition 2024',
      type: 'event' as const,
      event: {
        id: 1,
        documentId: 'event-001',
        title: 'Contemporary Art Exhibition 2024',
        publishDate: '2024-12-01',
        cover: { url: 'https://via.placeholder.com/800x400' },
        tags: ['exhibition', 'contemporary'],
        gallery: [],
      },
      insight: null,
      startDate: '2024-12-01',
      endDate: '2024-12-31',
    },
    {
      id: 2,
      documentId: 'insight-001',
      title: 'The Evolution of Modern Art',
      type: 'insight' as const,
      event: null,
      insight: {
        id: 1,
        documentId: 'insight-001',
        title: 'The Evolution of Modern Art',
        publishDate: '2024-11-15',
        cover: { url: 'https://via.placeholder.com/800x400' },
        galleries: [],
      },
      startDate: null,
      endDate: null,
    },
  ]);

  const [eventsData, setEventsData] = useState<EventListItem[]>([
    {
      id: 1,
      documentId: 'event-002',
      title: 'Art & Technology Symposium',
      publishDate: '2024-11-20',
      cover: { url: 'https://via.placeholder.com/400x200' },
      tags: ['symposium', 'technology'],
      gallery: [],
    },
    {
      id: 2,
      documentId: 'event-003',
      title: 'Local Artists Showcase',
      publishDate: '2024-11-25',
      cover: { url: 'https://via.placeholder.com/400x200' },
      tags: ['showcase', 'local'],
      gallery: [],
    },
  ]);

  const [insightsData, setInsightsData] = useState<InsightListItem[]>([
    {
      id: 1,
      documentId: 'insight-002',
      title: 'Understanding Abstract Expressionism',
      publishDate: '2024-10-30',
      cover: { url: 'https://via.placeholder.com/400x200' },
      galleries: [],
    },
  ]);

  const [artworksData, setArtworksData] = useState<ArtworkListItem[]>([
    { id: 1, documentId: 'artwork-001', title: 'Sunset Over Mountains', yearFinish: '2023', scannedImage: { url: 'https://via.placeholder.com/300x300' } },
    { id: 2, documentId: 'artwork-002', title: 'Urban Dreams', yearFinish: '2024', scannedImage: { url: 'https://via.placeholder.com/300x300' } },
    { id: 3, documentId: 'artwork-003', title: 'Silent Waters', yearFinish: '2023', scannedImage: { url: 'https://via.placeholder.com/300x300' } },
    { id: 4, documentId: 'artwork-004', title: 'Golden Hour', yearFinish: '2024', scannedImage: { url: 'https://via.placeholder.com/300x300' } },
    { id: 5, documentId: 'artwork-005', title: 'Abstract Thoughts', yearFinish: null, scannedImage: { url: 'https://via.placeholder.com/300x300' } },
    { id: 6, documentId: 'artwork-006', title: "Nature's Symphony", yearFinish: '2024', scannedImage: { url: 'https://via.placeholder.com/300x300' } },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
      }
    >
      <View style={{ padding: 16, paddingTop: 60 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
          Yixin
        </Text>
        <Text style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
          Art Platform
        </Text>

        <Carousel data={featuredData} />

        <EventsScroller data={eventsData} title="近期活動" />

        <InsightsScroller data={insightsData} title="專欄" />

        <ArtworksMasonry data={artworksData} />
      </View>
    </ScrollView>
  );
};

export default Home;


