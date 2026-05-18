import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontSizes, Spacing } from '../constants/theme';

export function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💬</Text>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.subtitle}>
        Contact support@foodapp.example or visit our FAQ.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  emoji: { fontSize: 48, marginBottom: Spacing.md },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
