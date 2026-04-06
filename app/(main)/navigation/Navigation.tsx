'use client';

import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Navigation = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHref, setSearchHref] = useState('/search');
  const searchFieldRef = useRef<TextInput>(null);
  const router = useRouter();

  const handleSearchClick = () => {
    if (!isSearchFocused) {
      setIsSearchFocused(true);
      searchFieldRef.current?.focus();
    }
  };

  const handleSearchSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    e.preventDefault();

    if (!isSearchFocused) return;

    const query = searchFieldRef.current?.props.value?.trim() ?? '';
    const href = query ? `/search?q=${encodeURIComponent(query)}` : '/search';
    setSearchHref(href);

    router.push(href);
  };

  return (
     <View style={{
        position: 'absolute' as const,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
         }}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              ref={searchFieldRef}
              value={''}
              placeholder="Search..."
              onChangeText={(text) => {}}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
              autoFocus={isSearchFocused}
              style={{
                flex: 1,
                fontSize: 16,
                padding: 12,
                 }}
                 />
                   <TouchableOpacity
                  style={{ padding: 8 }}
                  onPress={handleSearchClick}
                   >
                    <MaterialIcons
                      name={isSearchFocused ? 'close' : 'search'}
                      size={24}
                      color={isSearchFocused ? '#007AFF' : '#999'}
                       />
                    </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                     </View>
                     );
                   };

export default Navigation;
