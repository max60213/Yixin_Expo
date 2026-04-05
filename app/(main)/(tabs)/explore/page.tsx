
'use client';

import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

interface Section {
  key: string;
  title: string;
}

const Explore = () => {
  const sections: Section[] = [
    { key: 'materials', title: 'Materials' },
    { key: 'artists', title: 'Artists' },
    { key: 'galleries', title: 'Galleries' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16, paddingTop: 60, paddingBottom: 24 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 24,
            lineHeight: 36,
          }}
        >
          Explore
        </Text>

        <View style={{ height: 120, backgroundColor: '#f9f9f9', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#999' }}>Explore List Content</Text>
        </View>
      </View>

      <FlatList
        data={sections}
        scrollEnabled={true}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 16, paddingHorizontal: 16 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 16,
                lineHeight: 28,
              }}
            >
              {item.title}
            </Text>
            <View style={{ height: 100, backgroundColor: '#f9f9f9', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#999' }}> {item.title} Placeholder </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default Explore;
