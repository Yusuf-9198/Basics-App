import { Image } from 'expo-image';
import {Platform, StyleSheet, ScrollView, Text, TextInput} from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText, ThemedView } from '@/components/themed';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView>
      <h2
          style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
          }}
      >Sign In</h2>
      <Text>Email Address: </Text>
      <TextInput
          placeholder='Email Address'
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
