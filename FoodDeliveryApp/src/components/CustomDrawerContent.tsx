import { Ionicons } from '@expo/vector-icons';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { Colors, FontSizes, Spacing } from '../constants/theme';

const DRAWER_ITEMS = [
  { name: 'MyOrders' as const, label: 'My Orders', icon: 'receipt-outline' as const },
  { name: 'Settings' as const, label: 'Settings', icon: 'settings-outline' as const },
  { name: 'Help' as const, label: 'Help', icon: 'help-circle-outline' as const },
];

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, logout } = useAuth();
  const { navigation, state } = props;
  const activeRoute = state.routes[state.index]?.name;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </Text>
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
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          )}
          inactiveTintColor={Colors.badge}
          onPress={() => logout()}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingTop: Spacing.xl,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    color: Colors.headerText,
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  userName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  menuSection: {
    flex: 1,
    paddingTop: Spacing.sm,
  },
});
