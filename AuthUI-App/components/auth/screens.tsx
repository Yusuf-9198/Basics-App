import { AuthButton, AuthInput } from '@/components/ui/auth-ui';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  headerScroll: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 0,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  labelCompact: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
  },
  linkAction: {
    fontSize: 14,
    fontWeight: '600',
  },
  forgotPassword: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  backButton: {
    marginBottom: 16,
    padding: 8,
    marginLeft: -8,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
});

export function SignInScreen() {
  const router = useRouter();
  const colors = Colors[useColorScheme() ?? 'light'];

  const [email, setEmail] = useState('elementary2315@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push('/(tabs)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[sharedStyles.container, { backgroundColor: colors.background }]}>
      <View style={sharedStyles.content}>
        <View style={sharedStyles.header}>
          <Text style={[sharedStyles.titleCompact, { color: colors.text }]}>Sign In</Text>
          <Text style={[sharedStyles.subtitle, { color: colors.placeholder }]}>
            Let's experience the joy of telecare AI.
          </Text>
        </View>

        <View style={sharedStyles.form}>
          <Text style={[sharedStyles.label, { color: colors.text }]}>Email Address</Text>
          <AuthInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon="email"
          />

          <Text style={[sharedStyles.label, { color: colors.text }]}>Password</Text>
          <AuthInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock"
          />

          <AuthButton title="Sign In" onPress={handleSignIn} loading={loading} />

          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={[sharedStyles.forgotPassword, { color: colors.primary }]}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={sharedStyles.linkRow}>
          <Text style={[sharedStyles.linkText, { color: colors.placeholder }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/sign-up')}>
            <Text style={[sharedStyles.linkAction, { color: colors.primary }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function SignUpScreen() {
  const router = useRouter();
  const colors = Colors[useColorScheme() ?? 'light'];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword)
      newErrors.confirmPassword = 'ERROR: Password do not match!';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push('/(tabs)');
    } catch {
      setErrors({ email: 'Email already registered' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={sharedStyles.headerScroll}>
          <MaterialIcons name="person-add" size={48} color={colors.primary} />
          <Text style={[sharedStyles.title, { color: colors.text }]}>Sign Up For Free</Text>
          <Text style={[sharedStyles.subtitle, { color: colors.placeholder }]}>
            Sign up in 1 minute for free!
          </Text>
        </View>

        <View style={sharedStyles.form}>
          <Text style={[sharedStyles.labelCompact, { color: colors.text }]}>Email Address</Text>
          <AuthInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon="email"
            error={errors.email}
          />

          <Text style={[sharedStyles.labelCompact, { color: colors.text }]}>Password</Text>
          <AuthInput
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock"
            error={errors.password}
          />

          <Text style={[sharedStyles.labelCompact, { color: colors.text }]}>
            Password Confirmation
          </Text>
          <AuthInput
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            icon="lock"
            error={errors.confirmPassword}
          />

          <AuthButton title="Sign Up" onPress={handleSignUp} loading={loading} />
        </View>

        <View style={[sharedStyles.linkRow, { marginTop: 0 }]}>
          <Text style={[sharedStyles.linkText, { color: colors.placeholder }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/sign-in')}>
            <Text style={[sharedStyles.linkAction, { color: colors.primary }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface TwoFAOption {
  id: string;
  title: string;
  description: string;
  icon: MaterialIconName;
  selected: boolean;
}

const forgotStyles = StyleSheet.create({
  optionsContainer: {
    marginBottom: 32,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export function ForgotPasswordScreen() {
  const router = useRouter();
  const colors = Colors[useColorScheme() ?? 'light'];

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [twoFAOptions, setTwoFAOptions] = useState<TwoFAOption[]>([
    {
      id: 'email',
      title: '2 Factor Authentication',
      description: 'Send via Email address securely',
      icon: 'email',
      selected: true,
    },
    {
      id: 'google',
      title: 'Google Authenticator',
      description: 'Send via authenticator security',
      icon: 'security',
      selected: false,
    },
  ]);

  const validateForm = () => {
    const newErrors: { email?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push('/sign-in');
    } catch {
      setErrors({ email: 'Failed to send reset email' });
    } finally {
      setLoading(false);
    }
  };

  const toggleTwoFA = (id: string) => {
    setTwoFAOptions(
      twoFAOptions.map((option) =>
        option.id === id ? { ...option, selected: true } : { ...option, selected: false }
      )
    );
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={sharedStyles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={sharedStyles.headerScroll}>
          <MaterialIcons name="lock-reset" size={48} color={colors.primary} />
          <Text style={[sharedStyles.title, { color: colors.text }]}>Forgot Password</Text>
          <Text style={[sharedStyles.subtitle, { color: colors.placeholder }]}>
            Select which methods you'd like to reset
          </Text>
        </View>

        <View style={sharedStyles.form}>
          <Text style={[sharedStyles.labelCompact, { color: colors.text }]}>Email Address</Text>
          <AuthInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon="email"
            error={errors.email}
          />
        </View>

        <View style={forgotStyles.optionsContainer}>
          <Text style={[forgotStyles.optionsTitle, { color: colors.text }]}>Recovery Methods</Text>
          {twoFAOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                forgotStyles.optionCard,
                {
                  borderColor: option.selected ? colors.primary : colors.border,
                  backgroundColor: colors.background,
                  borderWidth: option.selected ? 2 : 1,
                },
              ]}
              onPress={() => toggleTwoFA(option.id)}
            >
              <View style={forgotStyles.optionContent}>
                <MaterialIcons
                  name={option.icon}
                  size={24}
                  color={option.selected ? colors.primary : colors.icon}
                  style={forgotStyles.optionIcon}
                />
                <View style={forgotStyles.optionText}>
                  <Text style={[forgotStyles.optionTitle, { color: colors.text }]}>
                    {option.title}
                  </Text>
                  <Text style={[forgotStyles.optionDescription, { color: colors.placeholder }]}>
                    {option.description}
                  </Text>
                </View>
              </View>
              {option.selected && (
                <MaterialIcons name="check-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={forgotStyles.buttonContainer}>
          <AuthButton title="Reset Password" onPress={handleResetPassword} loading={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
