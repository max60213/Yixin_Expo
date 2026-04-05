
'use client';

import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('artworks');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16, paddingTop: 60, paddingBottom: 24 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 32,
                textAlign: 'center',
                lineHeight: 32,
              }}
            >
              👤
            </Text>
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginTop: 16,
              lineHeight: 32,
            }}
            accessible={true}
          >
            Guest User
          </Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['artworks']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                marginRight: 8,
                backgroundColor: activeTab === item ? '#007AFF' : '#f5f5f5',
                borderRadius: 20,
              }}
              onPress={() => setActiveTab(item)}
            >
              <Text
                style={{
                  color: activeTab === item ? '#fff' : '#666',
                  fontWeight: '600',
                  fontSize: 16,
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          )}
          style={{ marginBottom: 24 }}
        />
      </View>

      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <View style={{ height: 120, backgroundColor: '#f9f9f9', marginHorizontal: 16, marginVertical: 4, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#999' }}>Artworks list placeholder</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default Profile;
