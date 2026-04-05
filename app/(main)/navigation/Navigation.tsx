'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Navigation = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { pathname } = usePathname();
  const [searchHref, setSearchHref] = useState('/search');
  const searchFieldRef = useRef<TextInput>(null);
  const searchLinkRef = useRef<Link>(null);

  useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (isSearchFocused) {
        if (target.closest('.navigation') === null) {
          setIsSearchFocused(false);
          }
         }
       };

      if (isSearchFocused) {
         document.addEventListener("click", handleClickOutside);
         return () => {
           document.removeEventListener("click", handleClickOutside);
           };
         }
      }, [isSearchFocused]);

   const handleSearchClick = () => {
     if (!isSearchFocused) {
       setIsSearchFocused(true);
       searchFieldRef.current?.focus();
        }
     };

     const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isSearchFocused) return;

      const query = searchFieldRef.current?.value?.trim();
      const href = query ? `/search?q=${encodeURIComponent(query)}` : '/search';
      setSearchHref(href);

      setTimeout(() => {
         searchLinkRef.current?.navigate(href);
       }, 0);
     };

  return (
     <View style={{
        position: 'fixed',
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
                    <Link
                  ref={searchLinkRef}
                  href={searchHref}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  aria-hidden="true"
                  />
                   </KeyboardAvoidingView>
                    </View>
                    );
                  };

export default Navigation;
