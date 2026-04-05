
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
import { Link } from '@/i18n/navigation';
import { useLocale } from '@/locales';
import { requireAuth } from '@/lib/auth';

export default function LoginPage() {
  const navigation = useNavigation();
  const { t } = useLocale();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://studio.yixin.art/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });
      if (response.ok) {
        navigation.navigate('success');
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
          <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 8,
             }}>
            {t('Auth.loginTitle')}
           </Text>
           Text
           style={{
             fontSize: 16,
             color: '#666',
             marginBottom: 32,
              }}>
            {t('Auth.loginSubtitle')}
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
                   {t('Auth.signIn')}
                  </Text>
                )}
               </TouchableOpacity>
            
             <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 32 }}>
               <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
                 <Text
                  style={{
                    paddingHorizontal: 16,
                    fontSize: 14,
                    color: '#999',
                   }}
                  >
                   {"or"}
                  </Text>
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
                 <Text style={{ fontSize: 16, fontWeight: '600' }}>
                   {t('Auth.continueWith')}
                 </Text>
               </TouchableOpacity>

             <TouchableOpacity
              style={{ marginTop: 24, alignItems: 'center' }}
              onPress={() => { navigation.navigate('signup'); }}
               >
                 <Text style={{ color: '#007AFF', fontSize: 16 }}>
                   {t('Auth.noAccount')}
                 </Text>
               </TouchableOpacity>
           </View>
         </View>
       </View>
     );
}
