import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  RestaurantDetail: { id: string; name?: string; price?: number };
  Cart: undefined;
};

export type DrawerParamList = {
  Profile: undefined;
  MyOrders: undefined;
  Settings: undefined;
  Help: undefined;
};

export type TabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Orders: undefined;
  ProfileTab: NavigatorScreenParams<DrawerParamList>;
};

export type AppStackParamList = {
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<TabParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};
