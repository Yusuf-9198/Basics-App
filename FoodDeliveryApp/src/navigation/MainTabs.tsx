import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';

import { Colors, FontSizes, tabBarStyle } from '../constants/theme';
import { useCart } from '../context/CartContext';
import { OrdersScreen } from '../screens/OrdersScreen';
import { SearchScreen } from '../screens/SearchScreen';
import type { TabParamList } from '../types/navigation';
import { HomeStack } from './HomeStack';
import { ProfileDrawer } from './ProfileDrawer';

const Tab = createBottomTabNavigator<TabParamList>();

const HIDDEN_TAB_ROUTES = ['RestaurantDetail', 'Cart'];

function getTabBarVisibility(route: { name: string; state?: object }) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return !HIDDEN_TAB_ROUTES.includes(routeName);
}

export function MainTabs() {
  const { itemCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: {
          fontSize: FontSizes.xs,
          fontWeight: '600',
          marginBottom: 4,
        },
        tabBarStyle,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
            HomeTab: 'home',
            Search: 'search',
            Orders: 'receipt',
            ProfileTab: 'person',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={({ route }) => ({
          title: 'Home',
          tabBarStyle: getTabBarVisibility(route)
            ? tabBarStyle
            : { display: 'none' },
        })}
      />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Orders',
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarBadgeStyle: { backgroundColor: Colors.badge },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileDrawer}
        options={{ title: 'Profile', headerShown: false }}
      />
    </Tab.Navigator>
  );
}
