import React from 'react';
import { Box, Image, Text, Pressable } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

export default function TravelCard({ item }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Detail', { travelogue: item })}
      className="m-2 rounded-lg bg-white"
      boxShadow="$md" // 使用 gluestack-ui 的 boxShadow 属性
    >
      <Image
        source={{ uri: item.image }}
        alt={item.title}
        className="w-full h-40 rounded-t-lg"
      />
      <Box p="$3">
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="text-sm text-gray-600" numberOfLines={2}>
          {item.description}
        </Text>
      </Box>
    </Pressable>
  );
}
