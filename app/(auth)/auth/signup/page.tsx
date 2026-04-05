
'use client';

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '@/locales';
import { requireAuth } from '@/lib/auth';

export default function SignupPage() {
  const navigation = useNavigation();
  const { t } = useLocale();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://studio.yixin.art/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        });
      if (response.ok) {
        navigation.navigate('(main)');
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
            {t('Auth.signupTitle')}
           </Text>
           Text style={{ fontSize: 16, color: '#666', marginBottom: 32 }}>
            {t('Auth.signupSubtitle')}
           </Text>
           
           <View style={{ marginBottom: 20 }}>
             <TextInput
             style={{
               height: 50,
               backgroundColor: '#f5f5f5',
               borderRadius: 12,
               paddingHorizontal: 16,
               fontSize: 16,
                }}
             placeholder={t('Auth.namePlaceholder')}
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
                }}
             placeholder={t('Auth.emailPlaceholder')}
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
                }}
             placeholder={t('Auth.passwordPlaceholder')}
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
                 <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#fff',
                    }}
                   >
                   {t('Auth.signUp')}
                  </Text>
                )}
               </TouchableOpacity>

           <TouchableOpacity
            style={{ marginTop: 24, alignItems: 'center' }}
            onPress={() => navigation.navigate('auth/login')}
             >
                 <Text style={{ color: '#007AFF', fontSize: 16 }}>
                   {t('Auth.haveAccount')}
                 </Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
       </View>
     );
}
