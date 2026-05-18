import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontSizes, Spacing } from '../constants/theme';

const SETTINGS = ['Notifications', 'Payment Methods', 'Addresses', 'Language'];

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      {SETTINGS.map((item) => (
        <View key={item} style={styles.row}>
          <Text style={styles.label}>{item}</Text>
          <Text style={styles.chevron}>›</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 10,
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.md,
    color: Colors.text,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 20,
    color: Colors.textSecondary,
  },
});
