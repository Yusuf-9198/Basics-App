import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, FontSizes, Radius, Shadows, Spacing } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import type { DrawerParamList } from '../types/navigation';

type Nav = DrawerNavigationProp<DrawerParamList, 'Profile'>;

export function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.menuRow, pressed && styles.menuRowPressed]}
        onPress={() => navigation.openDrawer()}>
        <View style={styles.menuIcon}>
          <Ionicons name="menu" size={22} color={Colors.primary} />
        </View>
        <View style={styles.menuText}>
          <Text style={styles.menuTitle}>Account menu</Text>
          <Text style={styles.menuSubtitle}>Orders, settings, help & logout</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.tabInactive} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  avatarRing: {
    padding: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.headerText,
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  name: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  email: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  menuRowPressed: {
    opacity: 0.9,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
});
