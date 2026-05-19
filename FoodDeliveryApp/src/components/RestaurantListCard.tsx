import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Restaurant } from '../constants/restaurants';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../constants/theme';

type RestaurantListCardProps = {
  restaurant: Restaurant;
  onPress: () => void;
};

export function RestaurantListCard({ restaurant, onPress }: RestaurantListCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}>
      <View style={styles.iconWrap}>
        <Text style={styles.emoji}>{restaurant.image}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.rating}>★ {restaurant.rating}</Text>
          </View>
        </View>
        <Text style={styles.meta}>
          {restaurant.cuisine} · {restaurant.deliveryTime}
        </Text>
        <Text style={styles.price}>From ${restaurant.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  emoji: {
    fontSize: 30,
  },
  body: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  name: {
    flex: 1,
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  ratingBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  rating: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  meta: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  price: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  chevron: {
    fontSize: 22,
    color: Colors.tabInactive,
    marginLeft: Spacing.xs,
  },
});
