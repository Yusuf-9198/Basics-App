import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '../components/EmptyState';
import { OrderCard } from '../components/OrderCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors, FontSizes, Radius, Spacing } from '../constants/theme';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';

export function OrdersScreen() {
  const { itemCount } = useCart();
  const { orders, isLoading } = useOrders();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Orders"
        subtitle={orders.length > 0 ? `${orders.length} order${orders.length > 1 ? 's' : ''}` : undefined}
      />

      {itemCount > 0 ? (
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>🛒</Text>
          <Text style={styles.bannerText}>
            {itemCount} in cart — finish checkout to place your order
          </Text>
        </View>
      ) : null}

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color={Colors.primary} size="large" />
      ) : orders.length === 0 ? (
        <EmptyState
          emoji="📦"
          title="No orders yet"
          subtitle="Add items from a restaurant, then place your order from the cart"
        />
      ) : (
        <View style={styles.listWrap}>
          <FlatList
            style={styles.listFlex}
            data={orders}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <OrderCard order={item} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warningBg,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  bannerEmoji: {
    fontSize: 22,
  },
  bannerText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.warningText,
    fontWeight: '500',
    lineHeight: 20,
  },
  listWrap: {
    flex: 1,
  },
  listFlex: {
    flex: 1,
  },
  list: {
    paddingBottom: Spacing.xl,
  },
  loader: {
    marginTop: Spacing.xxl,
  },
});
