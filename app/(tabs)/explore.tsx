import React from 'react';
import { View, Text } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

export default function Explore() {
  return (
    <GluestackUIProvider config={config}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold">探索页面</Text>
      </View>
    </GluestackUIProvider>
  );
} 