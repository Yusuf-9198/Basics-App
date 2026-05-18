import type { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import type { RootStackParamList } from '../types/navigation';

const prefix = Linking.createURL('/');

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, 'foodapp://'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
        },
      },
      App: {
        screens: {
          Onboarding: 'onboarding',
          MainTabs: {
            screens: {
              HomeTab: {
                screens: {
                  Home: 'home',
                  RestaurantDetail: 'restaurant/:id',
                  Cart: 'cart',
                },
              },
              Search: 'search',
              Orders: 'orders',
              ProfileTab: {
                screens: {
                  Profile: 'profile',
                  MyOrders: 'my-orders',
                  Settings: 'settings',
                  Help: 'help',
                },
              },
            },
          },
        },
      },
    },
  },
};
