import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontSizes, Spacing } from '../constants/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  large?: boolean;
};

export function ScreenHeader({ title, subtitle, large }: ScreenHeaderProps) {
  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, large && styles.titleLarge]}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  titleLarge: {
    fontSize: FontSizes.xxl,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    lineHeight: 22,
  },
});
