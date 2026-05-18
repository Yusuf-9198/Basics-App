import { CommonActions, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, FontSizes, Spacing } from '../constants/theme';
import { useCart } from '../context/CartContext';
import type { HomeStackParamList } from '../types/navigation';

type Nav = StackNavigationProp<HomeStackParamList, 'Cart'>;

export function CartScreen() {
  const navigation = useNavigation<Nav>();
  const { items, total, clearCart } = useCart();

  const handleCheckout = () => {
    clearCart();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  };

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Pressable
          style={styles.linkButton}
          onPress={() => navigation.replace('Home')}>
          <Text style={styles.linkText}>replace() → Home</Text>
        </Pressable>
        <Pressable style={styles.linkButton} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>goBack()</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.itemName}>
              {item.name} × {item.quantity}
            </Text>
            <Text style={styles.itemPrice}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <Pressable style={styles.button} onPress={handleCheckout}>
          <Text style={styles.buttonText}>Checkout — reset() to Home</Text>
        </Pressable>
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 10,
    marginBottom: Spacing.sm,
  },
  itemName: {
    fontSize: FontSizes.md,
    color: Colors.text,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  total: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.headerText,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  linkButton: {
    padding: Spacing.md,
  },
  linkText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
});
