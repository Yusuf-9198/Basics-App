import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontSizes, Spacing } from '../constants/theme';
import { useCart } from '../context/CartContext';

export function OrdersScreen() {
  const { itemCount } = useCart();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Orders</Text>
      {itemCount > 0 ? (
        <View style={styles.badgeCard}>
          <Text style={styles.badgeEmoji}>🔔</Text>
          <Text style={styles.badgeText}>
            Tab badge shows {itemCount} item{itemCount > 1 ? 's' : ''} in cart
          </Text>
        </View>
      ) : null}
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>📦</Text>
        <Text style={styles.emptyTitle}>No orders yet</Text>
        <Text style={styles.emptySubtitle}>
          Your past orders will appear here
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: Spacing.md,
    borderRadius: 10,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  badgeEmoji: {
    fontSize: 24,
  },
  badgeText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: '#92400E',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
});
