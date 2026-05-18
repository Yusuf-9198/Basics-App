import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RESTAURANTS } from '../constants/restaurants';
import { Colors, FontSizes, Spacing } from '../constants/theme';
import type { HomeStackParamList } from '../types/navigation';

type Nav = StackNavigationProp<HomeStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Hungry Bird 👋</Text>
        <Text style={styles.title}>Hungry? Let&apos;s eat!</Text>
      </View>

      <FlatList
        data={RESTAURANTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate('RestaurantDetail', {
                id: item.id,
                name: item.name,
                price: item.price,
              })
            }>
            <Text style={styles.cardEmoji}>{item.image}</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardMeta}>
                {item.cuisine} · ★ {item.rating} · {item.deliveryTime}
              </Text>
              <Text style={styles.cardPrice}>From ${item.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.text,
  },
  list: {
    padding: Spacing.lg,
    paddingTop: 0,
    gap: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardEmoji: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  cardBody: {
    flex: 1,
  },
  cardName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.primary,
  },
  chevron: {
    fontSize: 24,
    color: Colors.textSecondary,
  },
});
