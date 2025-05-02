import React from 'react';
import { FlatList, View } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useTrips } from '@/hooks/useTrips';
import { TripCard } from '@/components/TripCard';

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTrips();

  const trips = data?.pages.flatMap(page => page.trips) || [];

  return (
    <Box className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Travel Logs</Text>
      <FlatList
        data={trips}
        renderItem={({ item }) => <TripCard trip={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <Text>Loading...</Text> : null}
      />
    </Box>
  );
}
