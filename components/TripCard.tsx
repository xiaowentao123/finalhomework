import React from 'react';
import { Box, Image, Text, Pressable, FlatList } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';

// Get the window width for dynamic sizing
const { width: WINDOW_WIDTH } = Dimensions.get('window');

// Trip 接口定义
export interface Trip {
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
  username: string;
  time: string;
}

// TripCard 组件
export const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
  const router = useRouter();
  // Calculate card width as 80% of screen width, capped at 320px
  const cardWidth = Math.min(WINDOW_WIDTH * 0.8, 320);
  // Calculate image width: subtract border (10pt x 2) and padding (2.5 x 2)
  const imageWidth = cardWidth - 20 - 5;

  return (
    <Pressable
      onPress={() => router.push(`/detail/${trip.id}`)}
      className="bg-white rounded-lg shadow-md mr-4"
      style={{ width: cardWidth }}
    >
      <Box
        className="border-4 border-blue-200 rounded-lg p-2.5"
        style={{ borderWidth: 10, borderColor: '#BFDBFE' }}
      >
        <Box className="relative">
          <Image
            source={{ uri: trip.image }}
            alt={trip.title}
            style={{ width: imageWidth, height: 192 }} // Fixed height for consistency
            resizeMode="cover" // Ensure image covers the area without distortion
            className="rounded-t-lg"
          />
          <Box className="absolute top-2 left-2 bg-pink-400 px-2 py-1 rounded">
            <Text className="text-white text-sm">{trip.tag}</Text>
          </Box>
        </Box>
        <Box className="p-4">
          <Text className="text-lg font-bold text-black" numberOfLines={1}>
            {trip.title}
          </Text>
          <Text className="text-sm text-gray-600 mt-1" numberOfLines={2}>
            {trip.description}
          </Text>
          <Box className="flex-row items-center mt-2">
            <Image
              source={{ uri: 'https://example.com/avatar.jpg' }}
              alt="avatar"
              className="w-6 h-6 rounded-full mr-2"
            />
            <Text className="text-sm text-gray-500">{trip.username}</Text>
            <Text className="text-sm text-gray-500 ml-2">{trip.time}</Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

// TripCardList 组件
const TripCardList: React.FC<{ trips: Trip[] }> = ({ trips }) => {
  return (
    <FlatList
      data={trips}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TripCard trip={item} />}
      className="px-4"
      contentContainerStyle={{ paddingHorizontal: 8 }}
    />
  );
};

export default TripCardList;
