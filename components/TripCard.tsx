import React from 'react';
import { Box, Image, Text, Pressable } from '@gluestack-ui/themed';
import { Trip } from '@/types';
import { useRouter } from 'expo-router';

interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/detail/${trip.id}`)}
      className="bg-white rounded-lg shadow-md m-2 flex-1"
    >
      <Image
        source={{ uri: trip.image }}
        alt={trip.title}
        className="w-full h-40 rounded-t-lg"
      />
      <Box className="p-4">
        <Text className="text-lg font-bold">{trip.title}</Text>
        <Text className="text-sm text-gray-600 mt-2" numberOfLines={2}>
          {trip.content}
        </Text>
      </Box>
    </Pressable>
  );
};
