import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginScreen } from '../screens/LoginScreen';
import type { AuthStackParamList } from '../types/navigation';
import { fadeScreenOptions } from './transitions';

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={fadeScreenOptions}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
