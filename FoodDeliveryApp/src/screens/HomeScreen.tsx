import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RestaurantListCard } from '../components/RestaurantListCard';
import { RESTAURANTS } from '../constants/restaurants';
import { Colors, FontSizes, Radius, Spacing } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import type { HomeStackParamList } from '../types/navigation';

type Nav = StackNavigationProp<HomeStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();
  const firstName = user.name.split(' ')[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.hero}>
        <Text style={styles.greeting}>Hello, {firstName} 👋</Text>
        <Text style={styles.title}>What are you craving?</Text>
        <Text style={styles.subtitle}>Top picks delivered fast</Text>
      </View>

      <FlatList
        style={styles.listFlex}
        data={RESTAURANTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.sectionLabel}>Popular near you</Text>
        }
        renderItem={({ item }) => (
          <RestaurantListCard
            restaurant={item}
            onPress={() =>
              navigation.navigate('RestaurantDetail', {
                id: item.id,
                name: item.name,
                price: item.price,
              })
            }
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
  },
  hero: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
  },
  greeting: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.headerText,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.85)',
    marginTop: Spacing.xs,
  },
  sectionLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
  },
  listFlex: {
    flex: 1,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
});
