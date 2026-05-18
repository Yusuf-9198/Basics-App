import { CommonActions, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontSizes, Spacing } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import type { AppStackParamList } from '../types/navigation';

type Nav = StackNavigationProp<AppStackParamList, 'Onboarding'>;

export function OnboardingScreen() {
  const navigation = useNavigation<Nav>();
  const { completeOnboarding } = useAuth();

  const handleGetStarted = async () => {
    await completeOnboarding();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🍽️</Text>
        <Text style={styles.title}>Khana Khazana</Text>
        <Text style={styles.subtitle}>
          Order from your favorite restaurants. Fast delivery, great food.
        </Text>
        <View style={styles.features}>
          {['Browse restaurants', 'Track your orders', 'Fast checkout'].map((feature) => (
            <Text key={feature} style={styles.feature}>
              ✓ {feature}
            </Text>
          ))}
        </View>
      </View>
      <Pressable style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 72,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  features: {
    alignSelf: 'stretch',
    gap: Spacing.sm,
  },
  feature: {
    fontSize: FontSizes.md,
    color: Colors.text,
    paddingVertical: Spacing.xs,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.headerText,
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
});
