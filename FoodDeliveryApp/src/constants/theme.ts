export const Colors = {
  primary: '#FF6B35',
  primaryDark: '#E85A24',
  primaryLight: '#FFF4EF',
  background: '#F4F5F7',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#E8EAED',
  header: '#FF6B35',
  headerText: '#FFFFFF',
  tabInactive: '#9CA3AF',
  badge: '#EF4444',
  success: '#10B981',
  warningBg: '#FEF3C7',
  warningText: '#92400E',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const Radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  full: 999,
};

export const Shadows = {
  card: {
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  button: {
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  tabBar: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const tabBarStyle = {
  backgroundColor: Colors.surface,
  borderTopColor: Colors.border,
  borderTopWidth: 1,
  paddingTop: 6,
  height: 62,
  ...Shadows.tabBar,
};
