import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, FontSizes, Spacing } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import type { DrawerParamList } from '../types/navigation';

type Nav = DrawerNavigationProp<DrawerParamList, 'Profile'>;

export function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <Pressable style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Text style={styles.menuButtonText}>Open Drawer →</Text>
      </Pressable>

      <Text style={styles.hint}>
        Swipe from the left edge or tap above to open the drawer with My Orders,
        Settings, Help, and Logout.
      </Text>
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
    borderRadius: 14,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
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
  name: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  email: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  menuButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  menuButtonText: {
    color: Colors.headerText,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  hint: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
