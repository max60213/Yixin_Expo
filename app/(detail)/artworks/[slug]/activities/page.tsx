'use client';

import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

const ArtworksActivities = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return (
     <View style={{ flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 60 }}>
       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
          Artwork Activities
       </Text>
         <Text style={{ color: '#666', marginBottom: 24 }}>
           Artwork: {slug}
         </Text>
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <Text style={{ color: '#999' }}>
             Activities list loading...
           </Text>
         </View>
       </View>
      );
};

export default ArtworksActivities;
