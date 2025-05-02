import React from 'react';
import { Tabs } from 'expo-router';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: '#ffd33d',
              tabBarStyle: { backgroundColor: '#fff' },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name="search"
              options={{
                title: 'Search',
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'compass' : 'compass-outline'} color={color} size={24} />
                  ),
              }}
            />
            <Tabs.Screen
              name="my-trips"
              options={{
                title: 'My Trips',
                tabBarLabel: 'My Trips',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
                  ),
              }}
            />
          </Tabs>
        </SafeAreaView>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
