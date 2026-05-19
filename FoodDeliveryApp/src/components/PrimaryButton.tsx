import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { Colors, FontSizes, Radius, Shadows, Spacing } from '../constants/theme';

type PrimaryButtonProps = PressableProps & {
  label: string;
  loading?: boolean;
  variant?: 'primary' | 'outline';
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  loading,
  variant = 'primary',
  style,
  disabled,
  ...rest
}: PrimaryButtonProps) {
  const isOutline = variant === 'outline';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : styles.primary,
        !isOutline && Shadows.button,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={isOutline ? Colors.primary : Colors.headerText} />
      ) : (
        <Text style={[styles.label, isOutline && styles.outlineLabel]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  outline: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  label: {
    color: Colors.headerText,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  outlineLabel: {
    color: Colors.primary,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.65,
  },
});
