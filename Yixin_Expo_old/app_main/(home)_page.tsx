
'use client';

import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, ActivityIndicator, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FeaturedItem {
  id: number;
  title: string;
  image: string;
}

export default function HomePage() {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
     fetchFeatured();
     }, []);

  const fetchFeatured = async () => {
    try {
      const response = await fetch('https://studio.yixin.art/api/featureds');
      if (response.ok) {
        const data = await response.json();
        setFeaturedItems(data.data || []);
        }
      } catch (error) {
      console.error('Failed to fetch featured items:', error);
     } finally {
      setLoading(false);
      setRefreshing(false);
      }
    };

  const onRefresh = () => {
     setRefreshing(true);
     fetchFeatured();
      };

  if (loading && !refreshing) {
    return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

  return (
     <ScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
         }
       >
        <View style={{ padding: 16, paddingTop: 60 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
          Yixin
         </Text>
          <Text style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
          Art Platform
         </Text>
          {featuredItems.length === 0 ? (
            <View
            style={{
              height: 300,
              backgroundColor: '#f5f5f5',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 24,
             }}
            >
              <Text
              style={{
                color: '#999',
                fontSize: 16,
                textAlign: 'center',
                paddingHorizontal: 32,
               }}>
                Featured content will appear here
              </Text>
            </View>
           ) : (
             featuredItems.map((item) => (
               <View
               key={item.id}
               style={{
                 height: 200,
                 backgroundColor: '#f0f0f0',
                 borderRadius: 12,
                 marginBottom: 16,
                 justifyContent: 'center',
                 alignItems: 'center',
                 }}
               >
                 <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {item.title}
                 </Text>
               </View>
             ))
           )}
          <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 24,
            color: '#000',
            }}
          >
          Explore More
         </Text>
          <View
          style={{
            height: 300,
            backgroundColor: '#f5f5f5',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            }}
          >
            <Text style={{ color: '#999' }}>Artwork Masonry Section</Text>
          </View>
        </View>
      </ScrollView>
    );
}
