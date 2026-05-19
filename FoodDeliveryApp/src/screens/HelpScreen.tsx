import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontSizes, Radius, Spacing } from '../constants/theme';

export function HelpScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="chatbubbles-outline" size={40} color={Colors.primary} />
      </View>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.subtitle}>
        Email us at support@khana-khazana.com — we typically reply within 24 hours.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick tips</Text>
        <Text style={styles.cardItem}>• Track orders in the Orders tab</Text>
        <Text style={styles.cardItem}>• Use Search to find cuisines</Text>
        <Text style={styles.cardItem}>• Swipe open Profile for account menu</Text>
      </View>
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
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  cardItem: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
});
