import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStateFromPath } from '@react-navigation/native';

import { DEEP_LINK_SCHEME, linking } from './linking';
import { navigationRef } from './navigationRef';

const PENDING_KEY = '@khana_pending_deep_link';

export function isAppDeepLink(url: string | null): url is string {
  if (!url) return false;
  return url.startsWith(`${DEEP_LINK_SCHEME}://`);
}

export function getPathFromUrl(url: string): string {
  const stripped = url.replace(/^[\w-]+:\/\//, '');
  return stripped.startsWith('/') ? stripped.slice(1) : stripped;
}

export async function savePendingDeepLink(url: string): Promise<void> {
  await AsyncStorage.setItem(PENDING_KEY, url);
}

export async function consumePendingDeepLink(): Promise<string | null> {
  const url = await AsyncStorage.getItem(PENDING_KEY);
  if (url) {
    await AsyncStorage.removeItem(PENDING_KEY);
  }
  return url;
}

export function navigateToDeepLink(url: string): boolean {
  if (!navigationRef.isReady()) {
    return false;
  }

  const path = getPathFromUrl(url);
  const state = getStateFromPath(path, linking.config);

  if (!state) {
    return false;
  }

  try {
    navigationRef.reset(state as Parameters<typeof navigationRef.reset>[0]);
    return true;
  } catch (error) {
    console.warn('Deep link navigation failed:', error);
    return false;
  }
}
