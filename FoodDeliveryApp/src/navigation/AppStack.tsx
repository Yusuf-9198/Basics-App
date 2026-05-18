import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useAuth } from '../context/AuthContext';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import type { AppStackParamList } from '../types/navigation';
import { MainTabs } from './MainTabs';
import { stackScreenOptions } from './transitions';

const Stack = createStackNavigator<AppStackParamList>();

export function AppStack() {
  const { hasCompletedOnboarding } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={stackScreenOptions}
      initialRouteName={hasCompletedOnboarding ? 'MainTabs' : 'Onboarding'}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
