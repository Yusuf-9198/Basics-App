import { Ionicons } from '@expo/vector-icons';
import type { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontSizes, Spacing } from '../constants/theme';

type CustomHeaderProps = StackHeaderProps & {
  backLabel?: string;
};

export function CustomHeader({
  navigation,
  options,
  back,
  backLabel = 'Back',
}: CustomHeaderProps) {
  const insets = useSafeAreaInsets();
  const title = options.title ?? options.headerTitle;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        {back ? (
          <Pressable
            onPress={navigation.goBack}
            style={styles.backButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={backLabel}>
            <Ionicons name="chevron-back" size={24} color={Colors.headerText} />
            <Text style={styles.backLabel}>{backLabel}</Text>
          </Pressable>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {typeof title === 'string' ? title : ''}
        </Text>
        <View style={styles.backPlaceholder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.header,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.md,
    minHeight: 48,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  backLabel: {
    color: Colors.headerText,
    fontSize: FontSizes.md,
    marginLeft: -4,
  },
  backPlaceholder: {
    minWidth: 80,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.headerText,
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
});
