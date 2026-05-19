import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { OrderCard } from '../components/OrderCard';
import { Colors, FontSizes, Spacing } from '../constants/theme';
import { useOrders } from '../context/OrdersContext';

export function MyOrdersScreen() {
  const { orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        emoji="📋"
        title="No orders yet"
        subtitle="Orders you place from the cart will appear here"
      />
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Text style={styles.header}>Order history</Text>
      }
      renderItem={({ item }) => <OrderCard order={item} />}
    />
  );
}

const styles = StyleSheet.create({
  loaderWrap: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  header: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
