import React from 'react';
import { Tabs } from 'expo-router';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: '#1E90FF',
              tabBarStyle: { backgroundColor: '#fff' },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarLabel: 'Home',
              }}
            />
            <Tabs.Screen
              name="search"
              options={{
                title: 'Search',
                tabBarLabel: 'Search',
              }}
            />
            <Tabs.Screen
              name="my-trips"
              options={{
                title: 'My Trips',
                tabBarLabel: 'My Trips',
              }}
            />
          </Tabs>
        </SafeAreaView>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
