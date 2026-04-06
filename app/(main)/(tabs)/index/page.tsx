'use client';

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLocale } from '@/locales';

const Home = () => {
  const { t } = useLocale();
  const [refreshing, setRefreshing] = useState(false);

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
         <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8, lineHeight: 36 }}>
          Yixin
          </Text>
         <Text style={{ fontSize: 16, color: '#666', marginBottom: 24, lineHeight: 24 }}>
          Art Platform
          </Text>

         <View style={{ height: 200, backgroundColor: '#f0f0f0', borderRadius: 12, marginBottom: 24, justifyContent: 'center', alignItems: 'center' }}>
           <Text style={{ color: '#999' }}>Carousel Content</Text>
          </View>

         <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16 }}>More Content Coming Soon</Text>
        </View>
       </ScrollView>
      );
};

export default Home;
