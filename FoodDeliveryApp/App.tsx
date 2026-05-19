import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ErrorBoundary } from './src/components/ErrorBoundary';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { OrdersProvider } from './src/context/OrdersContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { setupWebLayout } from './src/utils/setupWeb';

if (Platform.OS === 'web') {
  setupWebLayout();
}

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.root}>
          <View style={styles.app}>
            <AuthProvider>
              <CartProvider>
                <OrdersProvider>
                  <RootNavigator />
                  <StatusBar style="light" />
                </OrdersProvider>
              </CartProvider>
            </AuthProvider>
          </View>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const webFill = Platform.OS === 'web' ? ({ height: '100%', width: '100%' } as const) : {};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    ...webFill,
  },
  app: {
    flex: 1,
    ...webFill,
  },
});
