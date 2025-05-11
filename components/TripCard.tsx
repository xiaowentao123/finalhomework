import React from "react";
import {
  Box,
  Image,
  Text,
  Pressable,
  FlatList,
  Card,
  HStack,
  VStack,
  AvatarFallbackText,
  Avatar,
  AvatarImage,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";
import { Trip } from "@/types";

// Get the window width for dynamic sizing
const { width: WINDOW_WIDTH } = Dimensions.get("window");
function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const pad = (n: number) => (n < 10 ? "0" + n : n);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
// TripCard 组件
export const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
  const router = useRouter();
  // Calculate card width as 80% of screen width, capped at 320px
  const cardWidth = Math.min(WINDOW_WIDTH * 0.45, 320);
  // Calculate image width: subtract border (10pt x 2) and padding (2.5 x 2)
  const imageWidth = cardWidth - 20 - 5;

  return (
    <Pressable onPress={() => router.push(`/detail/${trip.id}`)}>
      <Card
        className="p-5 rounded-lg max-w-[360px] m-0 mb-3"
        style={{ padding: 0, width: cardWidth }}
      >
        <Box style={{ height: 90 }}>
          <Image
            source={{ uri: trip.images?.[0] || "" }}
            alt="trip image"
            className="mb-6  w-full rounded-t-lg"
            style={{ width: "100%" }}
          />
        </Box>
        <Box className="p-2 pt-0 mt-0">
          <Text className="mb-2" numberOfLines={2}>
            {trip.title || "（未命名行程）"} fdfsfdsfdsfsfdsfsdfdsfdsfdfsdf
          </Text>

          <HStack space="sm">
            <Box>
              <Avatar size="sm">
                <AvatarFallbackText>JD</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://gluestack.github.io/public-blog-video-assets/camera.png",
                  }}
                  alt="avatar"
                />
              </Avatar>
            </Box>
            <VStack>
              <Text style={{ fontSize: 13, color: "black" }}>uesrname</Text>
              <Text
                style={{ fontSize: 10, color: "#9CA3AF" }}
                className="flex-1"
              >
                {formatDate(trip.createdAt)}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Card>
      {/* <Box
        className="border-4 border-blue-200 rounded-lg p-2.5"
        style={{ borderWidth: 10, borderColor: '#BFDBFE' }}
      >
        <Box className="relative">
          <Image
            source={{ uri: trip.images?.[0] || '' }}
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
      </Box> */}
    </Pressable>
  );
};
