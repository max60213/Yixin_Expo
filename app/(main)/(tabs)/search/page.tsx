'use client';

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ title: string; category: string }>>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResults([{ title: 'Sample Result', category: 'Artwork' }]);
      setLoading(false);
    }, 500);
  };

  return (
     <View style={{ flex: 1, backgroundColor: '#fff' }}>
       <View style={{ padding: 16, paddingTop: 60, paddingBottom: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24 }}>
              Search
           </Text>
           <View style={{ flexDirection: 'row', gap: 8 }}>
             <TextInput
               style={{
                 flex: 1,
                 height: 50,
                 backgroundColor: '#f5f5f5',
                 borderRadius: 12,
                 paddingHorizontal: 16,
                 fontSize: 16,
                 borderWidth: 1,
                 borderColor: '#ddd',
                  }}
               placeholder="Search artworks..."
               value={query}
               onChangeText={setQuery}
               onSubmitEditing={handleSearch}
               returnKeyType="search"
                />
             </View>
             </View>
           <FlatList
             data={results}
             keyExtractor={(item, index) => index.toString()}
             renderItem={({ item }) => (
               <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                 <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
               </View>
             )}
             contentContainerStyle={{ paddingBottom: 80 }}
              />
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, color: '#999' }}>
                 Enter a search term to find artworks
              </Text>
             </View>
           </View>
           );
}
