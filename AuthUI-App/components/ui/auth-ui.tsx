import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
import React, { useState, type PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type ViewProps,
} from 'react-native';

// --- AuthButton ---

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: MaterialIconName;
}

export function AuthButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
}: AuthButtonProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        authButtonStyles.button,
        isPrimary ? authButtonStyles.primaryButton : authButtonStyles.secondaryButton,
        isDisabled && authButtonStyles.disabledButton,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#fff' : colors.primary} size="small" />
      ) : (
        <>
          {icon && (
            <MaterialIcons
              name={icon}
              size={20}
              color={isPrimary ? '#fff' : colors.primary}
              style={authButtonStyles.icon}
            />
          )}
          <Text
            style={[
              authButtonStyles.buttonText,
              { color: isPrimary ? '#fff' : colors.primary },
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const authButtonStyles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: '#7AC934',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#7AC934',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
  },
});

// --- AuthInput ---

interface AuthInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  icon?: MaterialIconName;
  error?: string;
}

export function AuthInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  icon,
  error,
}: AuthInputProps) {
  const [isSecureVisible, setIsSecureVisible] = useState(false);
  const colors = Colors[useColorScheme() ?? 'light'];
  const showPassword = secureTextEntry && isSecureVisible;
  const showError = !!error;

  return (
    <View style={authInputStyles.container}>
      <View
        style={[
          authInputStyles.inputContainer,
          {
            backgroundColor: colors.background,
            borderColor: showError ? colors.error : colors.border,
          },
        ]}
      >
        {icon && (
          <MaterialIcons name={icon} size={20} color={colors.icon} style={authInputStyles.icon} />
        )}
        <TextInput
          style={[authInputStyles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecureVisible(!isSecureVisible)}
            style={authInputStyles.iconButton}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color={colors.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {showError && (
        <View style={authInputStyles.errorContainer}>
          <MaterialIcons name="error" size={14} color={colors.error} />
          <Text style={[authInputStyles.errorText, { color: colors.error }]}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const authInputStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    marginLeft: 8,
  },
  icon: {
    marginRight: 4,
  },
  iconButton: {
    padding: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 12,
    marginLeft: 4,
  },
});

// --- SocialAuthButton ---

interface SocialAuthButtonProps {
  type: 'facebook' | 'google' | 'instagram';
  onPress: () => void;
}

const iconMap = {
  facebook: { component: FontAwesome, name: 'facebook' as const },
  google: { component: FontAwesome, name: 'google' as const },
  instagram: { component: FontAwesome, name: 'instagram' as const },
};

export function SocialAuthButton({ type, onPress }: SocialAuthButtonProps) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const iconConfig = iconMap[type];
  const IconComponent = iconConfig.component;

  const getIconColor = () => {
    switch (type) {
      case 'facebook':
        return '#1877F2';
      case 'google':
        return '#EA4335';
      case 'instagram':
        return '#E1306C';
      default:
        return colors.icon;
    }
  };

  return (
    <TouchableOpacity
      style={[
        socialStyles.button,
        { borderColor: colors.border, backgroundColor: colors.background },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconComponent name={iconConfig.name} size={24} color={getIconColor()} />
    </TouchableOpacity>
  );
}

const socialStyles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});

// --- Box ---

export function Box({ style, children, ...props }: PropsWithChildren<ViewProps>) {
  return (
    <View style={[boxStyles.box, style]} {...props}>
      {children}
    </View>
  );
}

const boxStyles = StyleSheet.create({
  box: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});
