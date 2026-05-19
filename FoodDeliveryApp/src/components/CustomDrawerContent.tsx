import { Ionicons } from '@expo/vector-icons';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontSizes, Spacing } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const DRAWER_ITEMS = [
  { name: 'MyOrders' as const, label: 'My Orders', icon: 'receipt-outline' as const },
  { name: 'Settings' as const, label: 'Settings', icon: 'settings-outline' as const },
  { name: 'Help' as const, label: 'Help', icon: 'help-circle-outline' as const },
];

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const { navigation, state } = props;
  const activeRoute = state.routes[state.index]?.name;
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scroll}
      style={styles.drawer}>
      <View style={styles.profileBanner}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.menuSection}>
        {DRAWER_ITEMS.map((item) => (
          <DrawerItem
            key={item.name}
            label={item.label}
            icon={({ color, size }) => (
              <Ionicons name={item.icon} size={size} color={color} />
            )}
            focused={activeRoute === item.name}
            activeTintColor={Colors.primary}
            inactiveTintColor={Colors.textSecondary}
            onPress={() => navigation.navigate(item.name)}
          />
        ))}
        <View style={styles.logoutWrap}>
          <DrawerItem
            label="Logout"
            icon={({ color, size }) => (
              <Ionicons name="log-out-outline" size={size} color={color} />
            )}
            inactiveTintColor={Colors.badge}
            onPress={() => {
              clearCart();
              void logout();
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: Colors.surface,
  },
  scroll: {
    flex: 1,
    paddingTop: 0,
  },
  profileBanner: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: {
    color: Colors.headerText,
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  userName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.headerText,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.9)',
  },
  menuSection: {
    flex: 1,
    paddingTop: Spacing.xs,
  },
  logoutWrap: {
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
});
