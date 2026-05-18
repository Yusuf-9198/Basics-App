import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { CustomHeader } from '../components/CustomHeader';
import { Colors } from '../constants/theme';
import { CartScreen } from '../screens/CartScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { RestaurantDetailScreen } from '../screens/RestaurantDetailScreen';
import type { HomeStackParamList } from '../types/navigation';
import { stackScreenOptions } from './transitions';

const Stack = createStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...stackScreenOptions,
        header: (props) => <CustomHeader {...props} />,
        headerStyle: { backgroundColor: Colors.header },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={({ route }) => ({
          title: route.params.name ?? 'Restaurant',
          headerShown: true,
          header: (props) => <CustomHeader {...props} backLabel="Home" />,
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Your Cart',
          headerShown: true,
          header: (props) => <CustomHeader {...props} backLabel="Back" />,
        }}
      />
    </Stack.Navigator>
  );
}
