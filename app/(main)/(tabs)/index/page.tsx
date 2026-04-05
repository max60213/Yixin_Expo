
'use client';

import { Suspense } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/locales';
import Link from '@/i18n/navigation/Link';

const Home = () => {
  const { t } = useLocale();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => {}} />
      }
    >
      <View style={{ padding: 16, paddingTop: 60 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 8,
            lineHeight: 36,
          }}
        >
          Yixin
        </Text>
        <Text style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
          Art Platform
        </Text>

        <View
          style={{
            height: 200,
            backgroundColor: '#f0f0f0',
            borderRadius: 12,
            marginBottom: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#999' }}>Carousel Content</Text>
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 24,
            color: '#000',
          }}
        >
          {t('Explore')}
        </Text>

        <View
          style={{
            height: 120,
            backgroundColor: '#f5f5f5',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#999' }}>Artworks Masonry Section</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const LoadingFallback = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Home />
    </Suspense>
  );
}
