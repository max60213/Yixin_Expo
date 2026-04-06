'use client';

import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

interface FormInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoFocus?: boolean;
  labelColor?: string;
  inputStyle?: object;
}

export default function FormInput({
  label,
  placeholder = '',
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoFocus = false,
  labelColor = '#333',
  inputStyle,
}: FormInputProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '600', color: labelColor, marginBottom: 8 }}>
          {label}
        </Text>
      )}
      
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: error ? '#ff4444' : '#ddd',
          borderRadius: 12,
          padding: 16,
          fontSize: 16,
          backgroundColor: '#fff',
          ...inputStyle,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
      />

      {error && (
        <Text style={{ fontSize: 12, color: '#ff4444', marginTop: 6 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
