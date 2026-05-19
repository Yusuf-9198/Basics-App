import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { getRestaurantById } from '../constants/restaurants';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../constants/theme';
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
  const rating = restaurant?.rating ?? 4.5;
  const deliveryTime = restaurant?.deliveryTime ?? '25–35 min';

  const handleAddToCart = () => {
    addItem({ id: params.id, name, price });
    navigation.navigate('Cart');
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.heroCard}>
        <View style={styles.hero}>
          <Text style={styles.emoji}>{image}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.cuisine}>{cuisine}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>★ {rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{deliveryTime}</Text>
            <Text style={styles.statLabel}>Delivery</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>${price.toFixed(2)}</Text>
            <Text style={styles.statLabel}>From</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Add to Cart" onPress={handleAddToCart} />
        <PrimaryButton
          label="Back"
          variant="outline"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  hero: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  emoji: {
    fontSize: 52,
  },
  name: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  cuisine: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
  actions: {
    gap: Spacing.md,
  },
});
