'use client';

import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

const InsightsDetail = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 60 }}>
       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
          Insight Article
        </Text>
        <Text style={{ color: '#666' }}>
          {slug || 'Insight #123'}
        </Text>
       </SafeAreaView>
      );
};

export default InsightsDetail;
