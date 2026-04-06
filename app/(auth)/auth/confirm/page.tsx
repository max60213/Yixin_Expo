'use client';

import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ConfirmPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if we received verification token from deep link
    const token = params.token as string;
    
    if (token) {
      // Simulate verification API call
      handleVerification(token);
    } else {
      // No token yet, show waiting state
      setStatus('checking');
      setMessage('等待確認郵件...');
    }
  }, [params]);

  const handleVerification = async (token: string) => {
    try {
      // TODO: Replace with actual verification API call
      // const response = await fetch(`${API_URL}/auth/confirm-email`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token }),
      // });
      
      // Simulate successful verification for now
      setStatus('success');
      setMessage('Email 驗證成功！即將跳轉至主頁...');
      
      // Auto-redirect after success
      setTimeout(() => {
        router.replace('/(main)/(tabs)/index');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('驗證失敗，請稍後再試。');
    }
  };

  const handleResendEmail = () => {
    // TODO: Implement resend email functionality
    console.log('Resend email requested');
    router.push('/(auth)/auth/signup');
  };

  const handleGoToLogin = () => {
    router.push('/(auth)/auth/login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView 
        contentContainerStyle={{ 
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: 24,
        }}
      >
        {status === 'checking' && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 16 }}>
              ✉️
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
              確認您的 Email
            </Text>
            
            <View style={{ 
              backgroundColor: '#e3f2fd', 
              borderColor: '#90caf9',
              borderWidth: 1,
              borderRadius: 12, 
              padding: 16, 
              marginBottom: 32,
              maxWidth: '100%',
            }}>
              <Text style={{ 
                fontSize: 15, 
                color: '#1976d2', 
                lineHeight: 24,
                textAlign: 'center',
              }}>
                {message}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-start', marginBottom: 32 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>
                💡 小提示：
              </Text>
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
                  • 請檢查垃圾郵件資料夾
                </Text>
                <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
                  • 確認信可能需要幾分鐘才會送達
                </Text>
                <Text style={{ fontSize: 14, color: '#666' }}>
                  • 驗證連結將在 24 小時後過期
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleResendEmail}
              style={{ 
                backgroundColor: '#007AFF', 
                paddingHorizontal: 32, 
                paddingVertical: 12, 
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                重新發送確認信
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGoToLogin}
              style={{ 
                backgroundColor: 'transparent', 
                paddingHorizontal: 32, 
                paddingVertical: 12, 
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '600' }}>
                返回登入頁面
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {status === 'success' && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>✓</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>
              成功！
            </Text>
            
            <View style={{ 
              backgroundColor: '#e8f5e9', 
              borderColor: '#4caf50',
              borderWidth: 1,
              borderRadius: 12, 
              padding: 16, 
              marginBottom: 32,
              maxWidth: '100%',
            }}>
              <Text style={{ 
                fontSize: 16, 
                color: '#2e7d32', 
                lineHeight: 24,
                textAlign: 'center',
              }}>
                {message}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.replace('/(main)/(tabs)/index')}
              style={{ 
                backgroundColor: '#007AFF', 
                paddingHorizontal: 32, 
                paddingVertical: 12, 
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                繼續
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {status === 'error' && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>⚠️</Text>
            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
              驗證失敗
            </Text>
            
            <View style={{ 
              backgroundColor: '#ffebee', 
              borderColor: '#ef5350',
              borderWidth: 1,
              borderRadius: 12, 
              padding: 16, 
              marginBottom: 32,
              maxWidth: '100%',
            }}>
              <Text style={{ 
                fontSize: 15, 
                color: '#c62828', 
                lineHeight: 24,
                textAlign: 'center',
              }}>
                {message}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleResendEmail}
              style={{ 
                backgroundColor: '#007AFF', 
                paddingHorizontal: 32, 
                paddingVertical: 12, 
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                重新發送確認信
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGoToLogin}
              style={{ 
                backgroundColor: 'transparent', 
                paddingHorizontal: 32, 
                paddingVertical: 12, 
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '600' }}>
                返回登入頁面
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmPage;
