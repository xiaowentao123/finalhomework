import React from 'react';
import { Box, Image, Text, ScrollView } from '@gluestack-ui/themed';
import { useTrip } from '../../hooks/useTrips';
import { useLocalSearchParams } from 'expo-router';

export default function Detail() {
  const { id } = useLocalSearchParams();
  const { data: trip, isLoading, error } = useTrip(id as string);

  if (isLoading) return <Text>Loading...</Text>;
  if (error || !trip) return <Text>Error loading trip</Text>;

  return (
    <ScrollView className="flex-1">
      <Image
        source={{ uri: trip.image }}
        alt={trip.title}
        className="w-full h-60"
      />
      <Box className="p-4">
        <Text className="text-2xl font-bold mb-2">{trip.title}</Text>
        <Text className="text-gray-600 mb-4">{trip.createdAt}</Text>
        <Text className="text-base">{trip.content}</Text>
      </Box>
    </ScrollView>
  );
}
