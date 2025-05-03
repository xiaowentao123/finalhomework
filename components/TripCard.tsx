import React from 'react';
import { Box, Image, Text, Pressable, FlatList } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

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

  return (
    <Pressable
      onPress={() => router.push(`/detail/${trip.id}`)}
      className="bg-white rounded-lg shadow-md w-80 mr-4"
    >
      <Box
        className="border-4 border-blue-200 rounded-lg p-2.5" // 浅蓝色圆角方框
        style={{ borderWidth: 10, borderColor: '#BFDBFE' }} // 精确 10pt 和浅蓝色 (#BFDBFE 对应 blue-200)
      >
        <Box className="relative">
          <Image
            source={{ uri: trip.image }}
            alt={trip.title}
            className="w-full h-48 rounded-t-lg"
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
              source={{ uri: 'https://example.com/avatar.jpg' }} // 替换为实际头像 URL
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
      className="px-2"
    />
  );
};

export default TripCardList;
