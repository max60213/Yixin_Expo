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

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://studio.yixin.art/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
         });
      if (response.ok) {
        router.push('/(main)/(tabs)/index');
         } else {
        throw new Error('Signup failed');
         }
         } catch (error) {
      console.error('Signup error:', error);
        } finally {
      setLoading(false);
       }
           };

  return (
     <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 60 }}>
      <View style={{ paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 8 }}>
            Create Account
        </Text>
             <Text style={{ fontSize: 16, color: '#666', marginBottom: 32 }}>
              Sign up to get started
             </Text>

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
               placeholder="Name"
               value={name}
               onChangeText={setName}
                 />
              </View>

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
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
                      Sign Up
                    </Text>
                  )}
             </TouchableOpacity>

             <TouchableOpacity
             style={{ marginTop: 24, alignItems: 'center' }}
             onPress={() => router.push('/(auth)/auth/login')}
                  >
                <Text style={{ color: '#007AFF', fontSize: 16 }}>
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>
            </View>
           </View>
           );
}
