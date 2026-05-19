import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontSizes, Radius, Shadows, Spacing } from '../constants/theme';
import type { PlacedOrder } from '../context/OrdersContext';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

type OrderCardProps = {
  order: PlacedOrder;
};

export function OrderCard({ order }: OrderCardProps) {
  const summary = order.items
    .map((item) => `${item.name} × ${item.quantity}`)
    .join(', ');

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.id}>Order #{order.id.slice(-6)}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Confirmed</Text>
        </View>
      </View>
      <Text style={styles.date}>{formatDate(order.placedAt)}</Text>
      <Text style={styles.items} numberOfLines={2}>
        {summary}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total paid</Text>
        <Text style={styles.total}>${order.total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  id: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  statusText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.success,
  },
  date: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  items: {
    fontSize: FontSizes.md,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  total: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    color: Colors.primary,
  },
});
