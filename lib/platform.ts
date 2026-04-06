import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

export function getPlatformInfo() {
  return {
    os: Platform.OS,
    version: Platform.Version,
    isIOS,
    isAndroid,
    isWeb,
  };
}

export function getPlatformSpecific<T>(ios: T, android: T, web?: T): T {
  if (isIOS) return ios;
  if (isAndroid) return android;
  return web ?? android;
}

export default { isIOS, isAndroid, isWeb, getPlatformInfo };
