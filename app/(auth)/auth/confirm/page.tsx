'use client';

import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const APP_URL = 'yixin-expo://';

const ConfirmPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const checkInterval = setInterval(() => {
      if (!loading) {
         setLoading(true);
        }
         }, 1000);

     return () => clearInterval(checkInterval);
     }, []);

  useEffect(() => {
     const checkAuth = async () => {
       // Check redirect status
         setLoading(false);
        };

     checkAuth();
      }, []);

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
       <ActivityIndicator size="large" color="#007AFF" />
       <Text style={{ marginTop: 20, fontSize: 16, color: '#666' }}>
          Checking confirmation status...
         </Text>
        </SafeAreaView>
       );
};

export default ConfirmPage;
