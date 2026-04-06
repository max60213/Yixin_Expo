/**
 * Platform Detection Utility
 * Detects current platform (iOS, Android, Web) and provides platform-specific utilities
 */

import { Platform } from 'react-native';
import * as DeviceInfo from 'expo-device';

export type PlatformType = 'ios' | 'android' | 'web';

/**
 * Get current platform
 */
export const getPlatform = (): PlatformType => {
  if (Platform.OS === 'ios') return 'ios';
  if (Platform.OS === 'android') return 'android';
  if (typeof window !== 'undefined' && window.navigator?.userAgent) {
    return 'web';
  }
  return 'web'; // Default to web for SSR/unknown environments
};

/**
 * Check if current platform is iOS
 */
export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

/**
 * Check if current platform is Android
 */
export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

/**
 * Check if current platform is Web
 */
export const isWeb = (): boolean => {
  return Platform.OS === 'web' || (typeof window !== 'undefined' && window.navigator?.userAgent);
};

/**
 * Get platform-specific safe area insets
 * iOS 26+ uses different safe area handling
 */
export const getSafeAreaInsets = () => {
  if (isIOS()) {
    // iOS 26+ uses dynamic safe areas
    return {
      top: 47, // iOS status bar + notch area
      bottom: 34, // Home indicator area on iPhone
      left: 0,
      right: 0,
    };
  }
  
  if (isAndroid()) {
    // Android 16 uses system bars
    return {
      top: 24, // Status bar
      bottom: 48, // Navigation bar
      left: 0,
      right: 0,
    };
  }
  
  return { top: 0, bottom: 0, left: 0, right: 0 };
};

/**
 * Get device type (phone, tablet, desktop)
 */
export const getDeviceType = (): 'phone' | 'tablet' | 'desktop' => {
  if (isWeb()) {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    if (width >= 1024) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'phone';
  }
  
  if (DeviceInfo.deviceType === DeviceInfo.DeviceType.TABLET) {
    return 'tablet';
  }
  
  return 'phone';
};

/**
 * Get platform-specific font family
 */
export const getFontFamily = (font: 'default' | 'bold' = 'default'): string => {
  if (isIOS()) {
    return font === 'bold' ? '-apple-system, BlinkMacSystemFont, SF Pro Display Bold' : '-apple-system, BlinkMacSystemFont, SF Pro Text';
  }
  
  if (isAndroid()) {
    return font === 'bold' ? 'Roboto Bold, sans-serif' : 'Roboto, sans-serif';
  }
  
  return font === 'bold' ? 'Segoe UI Bold, sans-serif' : 'Segoe UI, sans-serif';
};

/**
 * Platform-specific color scheme detection
 */
export const getColorScheme = (): 'light' | 'dark' => {
  if (isWeb()) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // For mobile, you can use expo-localization or similar
  return 'light';
};

/**
 * Get platform-specific navigation patterns
 */
export const getNavigationPattern = () => {
  if (isIOS()) {
    return {
      gestureDirection: 'inverted', // iOS uses back swipe from left edge
      animationType: 'slide_from_right',
    };
  }
  
  if (isAndroid()) {
    return {
      gestureDirection: 'default', // Android uses back swipe from left edge
      animationType: 'slide_from_right',
    };
  }
  
  return {
    gestureDirection: 'default',
    animationType: 'fade',
  };
};

// Export constants for platform-specific values
export const PlatformConstants = {
  iOS: {
    statusBarHeight: 47,
    homeIndicatorHeight: 34,
    defaultFontFamily: '-apple-system, BlinkMacSystemFont',
  },
  Android: {
    statusBarHeight: 24,
    navigationBarHeight: 48,
    defaultFontFamily: 'Roboto, sans-serif',
  },
  Web: {
    statusBarHeight: 0,
    defaultFontFamily: 'Segoe UI, sans-serif',
  },
};

export { getPlatform, isIOS, isAndroid, isWeb, getDeviceType };
