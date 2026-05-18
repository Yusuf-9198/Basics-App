import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getRestaurantById } from '../constants/restaurants';
import { Colors, FontSizes, Spacing } from '../constants/theme';
import { useCart } from '../context/CartContext';
import type { HomeStackParamList } from '../types/navigation';

type Route = RouteProp<HomeStackParamList, 'RestaurantDetail'>;
type Nav = StackNavigationProp<HomeStackParamList, 'RestaurantDetail'>;

export function RestaurantDetailScreen() {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const { addItem } = useCart();

  const restaurant = getRestaurantById(params.id);
  const name = params.name ?? restaurant?.name ?? 'Restaurant';
  const price = params.price ?? restaurant?.price ?? 0;
  const cuisine = restaurant?.cuisine ?? 'Various';
  const image = restaurant?.image ?? '🍽️';

  const handleAddToCart = () => {
    addItem({ id: params.id, name, price });
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{image}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.cuisine}>{cuisine}</Text>
      <Text style={styles.price}>Starting at ${price.toFixed(2)}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Restaurant ID (deep link param)</Text>
        <Text style={styles.infoValue}>{params.id}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryText}>goBack()</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={handleAddToCart}>
          <Text style={styles.primaryText}>Add to Cart → navigate()</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  cuisine: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  price: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xl,
  },
  infoBox: {
    alignSelf: 'stretch',
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  actions: {
    alignSelf: 'stretch',
    gap: Spacing.md,
    marginTop: 'auto',
    marginBottom: Spacing.lg,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryText: {
    color: Colors.headerText,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
});
