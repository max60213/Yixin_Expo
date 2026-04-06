
'use client';

import React, { useState } from 'react';
import {
  View, Text, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Section {
  key: string;
  title: string;
}

export default function ExplorePage() {
  const sections: Section[] = [
    { key: 'materials', title: 'Materials' },
    { key: 'artists', title: 'Artists' },
    { key: 'galleries', title: 'Galleries' },
   ];

  const renderItem = (item: any) => (
     <View
      style={{
        height: 80,
        marginVertical: 4,
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}
     >
      <Text style={{ fontSize: 16 }}>Artist Name</Text>
     </View>
   );

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
       <View style={{ padding: 16, paddingTop: 60, paddingBottom: 24 }}>
         <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24 }}>
          Explore
         </Text>
       </View>
       
       <FlatList
        data={sections}
        scrollEnabled={true}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 16, paddingHorizontal: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
              {item.title}
            </Text>
            <View style={{ height: 120, backgroundColor: '#f9f9f9', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#999' }}>{item.title} List View</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
       />
     </SafeAreaView>
   );
}
