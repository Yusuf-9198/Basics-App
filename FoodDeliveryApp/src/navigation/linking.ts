import type { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import type { RootStackParamList } from '../types/navigation';

const prefix = Linking.createURL('/');

/** Custom scheme URLs, e.g. khana-khazana://restaurant/123 */
export const DEEP_LINK_SCHEME = 'khana-khazana';

export const authLinking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, `${DEEP_LINK_SCHEME}://`],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
        },
      },
    },
  },
};

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, `${DEEP_LINK_SCHEME}://`],
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
                  RestaurantDetail: {
                    path: 'restaurant/:id',
                    parse: {
                      id: (id: string) => id,
                    },
                  },
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
