
'use client';

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) {
      console.log('Enter a search term');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResults([{ title: 'Sample Result', category: 'Artwork' }]);
      setLoading(false);
    }, 500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16, paddingTop: 60, paddingBottom: 16 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 24,
            lineHeight: 36,
          }}
        >
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
            }}
            placeholder="Search artworks, artists, galleries"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="twitter"
          />
        </View>
      </View>

      {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {results.length > 0 && !loading && (
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
      )}

      {!loading && results.length === 0 && query.trim() === '' && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#999' }}>
            Enter a search term to find artworks
          </Text>
        </View>
      )}
    </View>
  );
};

export default Search;
