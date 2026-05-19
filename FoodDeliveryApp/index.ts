import 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';

import App from './App';

// Reanimated side-effect import breaks some web builds; Babel plugin handles native.
if (Platform.OS !== 'web') {
  require('react-native-reanimated');
}

registerRootComponent(App);
