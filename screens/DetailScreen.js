import React from 'react';
import { Box, Image, Text, ScrollView } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';

export default function DetailScreen() {
  const route = useRoute();
  const { travelogue } = route.params;

  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={{ uri: travelogue.image }}
        alt={travelogue.title}
        className="w-full h-64"
      />
      <Box p="$4">
        <Text className="text-2xl font-bold mb-2">{travelogue.title}</Text>
        <Text className="text-gray-600">{travelogue.content}</Text>
      </Box>
    </ScrollView>
  );
}
