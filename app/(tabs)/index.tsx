import React from 'react';
import { View, Text } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import HomeScreen from '../../screens/HomeScreen';

export default function Home() {
  return (
    <GluestackUIProvider config={config}>
      <HomeScreen />
    </GluestackUIProvider>
  );
}
