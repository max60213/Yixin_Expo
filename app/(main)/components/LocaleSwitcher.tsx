'use client';

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useLocale } from '@/locales';

interface LocaleSwitcherProps {
  onLocaleChange?: (locale: string) => void;
}

export default function LocaleSwitcher({ onLocaleChange }: LocaleSwitcherProps) {
  const { locale, setLocale, t } = useLocale();

  const locales = [
    { code: 'en', label: 'English' },
    { code: 'zh-TW', label: '繁體中文' },
    { code: 'zh-CN', label: '简体中文' },
  ];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 16 }}>
      {locales.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            backgroundColor: locale === lang.code ? '#007AFF' : '#f0f0f0',
          }}
          onPress={() => {
            setLocale(lang.code);
            onLocaleChange?.(lang.code);
          }}
        >
          <Text style={{ color: locale === lang.code ? '#fff' : '#333', fontSize: 14 }}>
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
