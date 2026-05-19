import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RestaurantListCard } from '../components/RestaurantListCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { RESTAURANTS } from '../constants/restaurants';
import { Colors, FontSizes, Radius, Spacing } from '../constants/theme';
import type { HomeStackParamList, TabParamList } from '../types/navigation';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Search'>,
  StackNavigationProp<HomeStackParamList>
>;

export function SearchScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');
  const results = RESTAURANTS.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase()),
  );

  const openRestaurant = (id: string, name: string, price: number) => {
    navigation.navigate('HomeTab', {
      screen: 'RestaurantDetail',
      params: { id, name, price },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Search" subtitle="Find food by name or cuisine" />

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Restaurants, cuisines..."
          placeholderTextColor={Colors.textSecondary}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        style={styles.list}
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No matches</Text>
            <Text style={styles.emptySubtitle}>Try a different search term</Text>
          </View>
        }
        renderItem={({ item }) => (
          <RestaurantListCard
            restaurant={item}
            onPress={() => openRestaurant(item.id, item.name, item.price)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xl,
    flexGrow: 1,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  emptyEmoji: {
    fontSize: 48,
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
    textAlign: 'center',
  },
});
