import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontSizes, Radius, Shadows, Spacing } from '../constants/theme';

const SETTINGS: { label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Notifications', icon: 'notifications-outline' },
  { label: 'Payment Methods', icon: 'card-outline' },
  { label: 'Addresses', icon: 'location-outline' },
  { label: 'Language', icon: 'language-outline' },
];

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      {SETTINGS.map((item) => (
        <View key={item.label} style={styles.row}>
          <View style={styles.iconWrap}>
            <Ionicons name={item.icon} size={20} color={Colors.primary} />
          </View>
          <Text style={styles.label}>{item.label}</Text>
          <Ionicons name="chevron-forward" size={18} color={Colors.tabInactive} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  label: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text,
    fontWeight: '600',
  },
});
