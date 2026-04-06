'use client';

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '@/(main)/contexts/auth/AuthContext';
import { useRouter } from 'expo-router';

interface Stat {
  number: string | number;
  label: string;
}

interface ProfileData {
  documentId?: string;
  coverImage?: string;
  name: string;
  country?: string;
  region?: string;
  avatar?: string;
  about: any;
  stats: Stat[];
}

const ProfileHeader = ({ profile, isMe }: { profile?: ProfileData; isMe: boolean }) => {
  const { user } = useAuth();

  const displayAvatar = isMe ? (user?.email || user?.name || 'User') : profile?.avatar;
  const fallbackName = isMe ? (user?.name || user?.email || profile?.name || 'User') : (profile?.name || 'User');

  return (
    <View style={{ marginBottom: 24 }}>
      {profile?.coverImage && (
        <View style={{ height: 200, backgroundColor: '#f0f0f0', marginBottom: -60 }}>
          <Image source={{ uri: profile.coverImage }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        </View>
      )}

      <View style={{ paddingHorizontal: 16, paddingTop: 70 }}>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          {isMe ? (
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>
                {fallbackName.slice(0, 1).toUpperCase()}
              </Text>
            </View>
          ) : (
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 32 }}>👤</Text>
            </View>
          )}
        </View>

        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
            {isMe ? (fallbackName.slice(0, 1).toUpperCase() + fallbackName.slice(1)) : profile?.name}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
            {profile?.country}
            {profile?.region && ` · ${profile?.region}`}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 }}>
          {profile?.stats?.map((stat, index) => (
            <View key={index} style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{stat.number}</Text>
              <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {profile?.about && (
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 16, color: '#333', lineHeight: 24 }}>
              {typeof profile.about === 'string' ? profile.about : JSON.stringify(profile.about)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const ProfileTabs = ({ tabs }: { tabs: Array<{ key: string; label: string }> }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '');

  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' }}>
      <View style={{ flex: 1, paddingVertical: 16, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#eee' }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: activeTab === tabs[0]?.key ? '#007AFF' : '#666' }}>
          {tabs[0]?.label}
        </Text>
      </View>
    </View>
  );
};

const ProfileContent = ({ tabs }: { tabs: Array<{ key: string; label: string }> }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '');

  return (
    <View style={{ flex: 1 }}>
      {tabs.map((tab) => (
        <View key={tab.key} id={tab.anchorId}>
          {activeTab === tab.key && (
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 16, color: '#666' }}>
                {tab.label} content placeholder. This would display user's collection or other profile-related data.
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/auth/login');
    }
  }, [isAuthenticated, router]);

  const [profile, setProfile] = useState<ProfileData | undefined>({
    documentId: user?.id || 'user-123',
    name: user?.name || 'User Name',
    country: 'Taiwan',
    region: 'Taipei',
    stats: [
      { number: 12, label: '收藏作品' },
    ],
    about: "This is the user's bio or about section. In production, this would be fetched from Strapi CMS.",
  });

  const tabs = [
    { key: 'artworks', label: '收藏', anchorId: 'artworks' },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ProfileHeader profile={profile} isMe={true} />
      <ProfileTabs tabs={tabs} />
      <ProfileContent tabs={tabs} />
    </ScrollView>
  );
}

