import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RESTAURANTS } from '../constants/restaurants';
import { Colors, FontSizes, Spacing } from '../constants/theme';

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const results = RESTAURANTS.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search restaurants or cuisine..."
        placeholderTextColor={Colors.textSecondary}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No restaurants found</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.emoji}>{item.image}</Text>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.cuisine}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    marginBottom: Spacing.md,
    color: Colors.text,
  },
  list: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 10,
    marginBottom: Spacing.sm,
  },
  emoji: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  name: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  meta: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  empty: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: Spacing.xl,
  },
});
