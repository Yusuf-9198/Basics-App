import { CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import type { StackNavigationOptions } from '@react-navigation/stack';

export const stackScreenOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const fadeScreenOptions: StackNavigationOptions = {
  ...stackScreenOptions,
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  transitionSpec: {
    open: TransitionSpecs.FadeInFromBottomAndroidSpec,
    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
  },
};
