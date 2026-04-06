'use client';

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://studio.yixin.art/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
          });
      if (response.ok) {
        router.push('/(main)/(tabs)/index');
        } else {
        throw new Error('Invalid credentials');
        }
        } catch (error) {
      console.error('Login error:', error);
      } finally {
      setLoading(false);
      }
         };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In');
        };

  return (
     <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 60 }}>
      <View style={{ paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 8 }}>
          Welcome Back
          </Text>
         <Text style={{ fontSize: 16, color: '#666', marginBottom: 32 }}>Sign in to your account</Text>

         <View style={{ marginBottom: 20 }}>
           <TextInput
              style={{
                height: 50,
                backgroundColor: '#f5f5f5',
                borderRadius: 12,
                paddingHorizontal: 16,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#ddd',
                 }}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
               />
            </View>

           <View style={{ marginBottom: 32 }}>
             <TextInput
              style={{
                height: 50,
                backgroundColor: '#f5f5f5',
                borderRadius: 12,
                paddingHorizontal: 16,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#ddd',
                }}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
                />
           </View>

            <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: '#007AFF',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
                  }}
            onPress={handleSubmit}
                disabled={loading}
                >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 32 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
                  <Text style={{ paddingHorizontal: 16, fontSize: 14, color: '#999' }}>or</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
            </View>

            <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#ddd',
                  }}
            onPress={handleGoogleSignIn}
                >
              <Text style={{ fontSize: 16, fontWeight: '600' }}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={{ marginTop: 24, alignItems: 'center' }}
            onPress={() => router.push('/(auth)/auth/signup')}
                >
              <Text style={{ color: '#007AFF', fontSize: 16 }}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
            </View>
            </View>
            );
}
