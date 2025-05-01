import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import HomeScreen from '../../screens/HomeScreen';
import DetailScreen from '../../screens/DetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: '游记' }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: '游记详情' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
