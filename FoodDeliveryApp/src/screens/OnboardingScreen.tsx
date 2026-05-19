import { CommonActions, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '../components/PrimaryButton';
import { Colors, FontSizes, Radius, Spacing } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import type { AppStackParamList } from '../types/navigation';

type Nav = StackNavigationProp<AppStackParamList, 'Onboarding'>;

const FEATURES = [
  { icon: '🍽️', text: 'Browse top restaurants' },
  { icon: '📦', text: 'Track every order' },
  { icon: '⚡', text: 'Checkout in seconds' },
];

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
      <View style={styles.hero}>
        <View style={styles.heroCircle}>
          <Text style={styles.heroEmoji}>🍽️</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Khana Khazana</Text>
        <Text style={styles.subtitle}>
          Your favorite meals, delivered warm to your door.
        </Text>

        <View style={styles.features}>
          {FEATURES.map((feature) => (
            <View key={feature.text} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>{feature.icon}</Text>
              </View>
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <PrimaryButton label="Get Started" onPress={handleGetStarted} style={styles.cta} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  hero: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  heroCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 72,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  features: {
    gap: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureText: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text,
    fontWeight: '600',
  },
  cta: {
    marginBottom: Spacing.sm,
  },
});
