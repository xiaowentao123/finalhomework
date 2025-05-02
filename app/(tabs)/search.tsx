import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Input, Text } from '@gluestack-ui/themed';
import { useTrips } from '@/hooks/useTrips';
import { TripCard } from '@/components/TripCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTrips(query);

  const trips = data?.pages.flatMap(page => page.trips) || [];

  return (
    <Box className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Search Trips</Text>
      <Input
        variant="outline"
        className="mb-4"
      >
        <Input.Input
          placeholder="Search trips..."
          value={query}
          onChangeText={setQuery}
        />
      </Input>
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
