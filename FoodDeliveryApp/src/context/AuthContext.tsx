import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AUTH_KEY = '@foodapp_auth';
const ONBOARDING_KEY = '@foodapp_onboarding_complete';
const USER_KEY = '@foodapp_user';
const ORDERS_KEY = '@foodapp_orders';

const DEFAULT_USER = { name: 'Ghazi', email: 'ghazi@yusuf.com' };

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  user: { name: string; email: string };
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(DEFAULT_USER);

  useEffect(() => {
    async function loadPersistedState() {
      try {
        const [authValue, onboardingValue, userValue] = await Promise.all([
          AsyncStorage.getItem(AUTH_KEY),
          AsyncStorage.getItem(ONBOARDING_KEY),
          AsyncStorage.getItem(USER_KEY),
        ]);
        setIsAuthenticated(authValue === 'true');
        setHasCompletedOnboarding(onboardingValue === 'true');
        if (userValue) {
          try {
            setUser(JSON.parse(userValue) as { name: string; email: string });
          } catch {
            setUser(DEFAULT_USER);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadPersistedState();
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    const nextUser = { name: DEFAULT_USER.name, email: email.trim() || DEFAULT_USER.email };
    setUser(nextUser);
    await AsyncStorage.multiSet([
      [AUTH_KEY, 'true'],
      [USER_KEY, JSON.stringify(nextUser)],
    ]);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove([AUTH_KEY, ONBOARDING_KEY, USER_KEY, ORDERS_KEY]);
    setUser(DEFAULT_USER);
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setHasCompletedOnboarding(true);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      hasCompletedOnboarding,
      user,
      login,
      logout,
      completeOnboarding,
    }),
    [isAuthenticated, isLoading, hasCompletedOnboarding, user, login, logout, completeOnboarding],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
