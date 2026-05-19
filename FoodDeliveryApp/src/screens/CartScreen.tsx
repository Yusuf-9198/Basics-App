import { CommonActions, useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { getRestaurantById } from '../constants/restaurants';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../constants/theme';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import type { HomeStackParamList, TabParamList } from '../types/navigation';

type Nav = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Cart'>,
  BottomTabNavigationProp<TabParamList>
>;

export function CartScreen() {
  const navigation = useNavigation<Nav>();
  const { items, total, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [placing, setPlacing] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0 || placing) return;

    setPlacing(true);
    try {
      await placeOrder(items, total);
      clearCart();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }),
      );
      navigation.getParent()?.navigate('Orders');
      setTimeout(
        () => Alert.alert('Order placed! 🎉', 'Your food is on the way.'),
        300,
      );
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <EmptyState
          emoji="🛒"
          title="Your cart is empty"
          subtitle="Pick a restaurant and add something delicious"
        />
        <View style={styles.emptyActions}>
          <PrimaryButton
            label="Browse restaurants"
            onPress={() => navigation.replace('Home')}
          />
          <PrimaryButton label="Go back" variant="outline" onPress={() => navigation.goBack()} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const restaurant = getRestaurantById(item.id);
          return (
            <View style={styles.row}>
              <Text style={styles.rowEmoji}>{restaurant?.image ?? '🍽️'}</Text>
              <View style={styles.rowBody}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>${total.toFixed(2)}</Text>
        </View>
        <PrimaryButton label="Place order" onPress={handleCheckout} loading={placing} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
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
  rowEmoji: {
    fontSize: 36,
    marginRight: Spacing.md,
  },
  rowBody: {
    flex: 1,
  },
  itemName: {
    fontSize: FontSizes.md,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemQty: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  itemPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  footer: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
    ...Shadows.tabBar,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  totalLabel: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  total: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.text,
  },
  emptyWrap: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyActions: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
});
