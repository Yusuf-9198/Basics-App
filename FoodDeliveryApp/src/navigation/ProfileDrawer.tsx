import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { Colors } from '../constants/theme';
import { HelpScreen } from '../screens/HelpScreen';
import { MyOrdersScreen } from '../screens/MyOrdersScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { DrawerParamList } from '../types/navigation';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function ProfileDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.header },
        headerTintColor: Colors.headerText,
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: Colors.textSecondary,
      }}>
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile', drawerLabel: 'Profile' }}
      />
      <Drawer.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{ title: 'My Orders' }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{ title: 'Help' }}
      />
    </Drawer.Navigator>
  );
}
