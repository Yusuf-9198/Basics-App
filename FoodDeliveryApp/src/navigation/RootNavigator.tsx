import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Colors } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import type { RootStackParamList } from '../types/navigation';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import {
  consumePendingDeepLink,
  isAppDeepLink,
  navigateToDeepLink,
  savePendingDeepLink,
} from './deepLink';
import { authLinking, linking } from './linking';
import { navigationRef } from './navigationRef';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isAuthenticated, isLoading, hasCompletedOnboarding } = useAuth();

  useEffect(() => {
    if (isAuthenticated) return;

    const captureIfNeeded = (url: string | null) => {
      if (isAppDeepLink(url)) {
        void savePendingDeepLink(url);
      }
    };

    void Linking.getInitialURL().then(captureIfNeeded);

    const subscription = Linking.addEventListener('url', ({ url }) => {
      captureIfNeeded(url);
    });

    return () => subscription.remove();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || isLoading || !hasCompletedOnboarding) {
      return;
    }

    const resumePendingLink = async () => {
      const pending = await consumePendingDeepLink();
      if (!pending) return;

      const tryNavigate = () => {
        if (navigateToDeepLink(pending)) return true;
        return false;
      };

      if (!tryNavigate()) {
        requestAnimationFrame(() => {
          if (!tryNavigate()) {
            setTimeout(tryNavigate, 100);
          }
        });
      }
    };

    void resumePendingLink();
  }, [isAuthenticated, isLoading, hasCompletedOnboarding]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer
      key={isAuthenticated ? 'app-user' : 'app-guest'}
      ref={navigationRef}
      linking={isAuthenticated ? linking : authLinking}
      documentTitle={{
        formatter: (options, route) =>
          options?.title ?? route?.name ?? 'Khana Khazana',
      }}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        UNSTABLE_routeNamesChangeBehavior="lastUnhandled">
        {isAuthenticated ? (
          <Stack.Screen name="App" component={AppStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});
