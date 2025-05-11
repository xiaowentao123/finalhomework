import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import {
  Box,
  Text,
  Button,
  ButtonText,
  Spinner,
  Card,
  HStack,
  VStack,
  Image,
} from "@gluestack-ui/themed";
import {
  useTrips,
  useCreateTrip,
  useUpdateTrip,
  useDeleteTrip,
} from "@/hooks/useTrips";
import { TripCard } from "@/components/TripCard";
import { TripForm } from "@/components/TripForm";
import { Trip } from "@/types";
import colors from "tailwindcss/colors";
import { useTheme } from "./settings"; // 导入 useTheme

const MyTripsCard = ({ trip }: { trip: Trip }) => {
  const { theme } = useTheme(); // 获取当前主题

  // 动态样式
  const styles = StyleSheet.create({
    title: {
      color: theme === "light" ? colors.gray[900] : colors.white, // 标题文字颜色
      fontSize: 16,
      fontWeight: "bold",
    },
    content: {
      color: theme === "light" ? colors.gray[600] : colors.gray[300], // 内容文字颜色
      fontSize: 13,
    },
    buttonSolid: {
      backgroundColor: theme === "light" ? "green" : "#2f855a", // 已通过按钮背景
    },
    buttonOutline: {
      borderColor: theme === "light" ? colors.gray[300] : colors.gray[600], // 边框颜色
    },
    buttonText: {
      color: theme === "light" ? colors.gray[900] : colors.white, // 按钮文字颜色
    },
  });

  return (
    <Card
      className="flex-row m-4 p-4 rounded-lg shadow-md mb-1"
      style={{
        padding: 0,
        backgroundColor: theme === "light" ? colors.white : "#333", // 动态卡片背景
      }}
    >
      <VStack className="flex-1 ml-3 mt-3 mb-3 pr-2" space="xl">
        <HStack space="md">
          <Image
            source={{ uri: trip.images?.[0] }}
            alt="trip image"
            className="w-32 aspect-[3/2]"
            style={{ width: 120 }}
          />
          <VStack space="sm">
            <Text
              className="font-bold text-lg"
              style={styles.title}
              numberOfLines={1}
            >
              {trip.title}
            </Text>
            <Box>
              <Text
                className="text-gray-600"
                numberOfLines={2}
                style={[styles.content, { width: 170 }]}
              >
                {trip.content}
              </Text>
            </Box>
          </VStack>
        </HStack>
        <HStack space="sm" className="flex">
          <Button variant="solid" style={styles.buttonSolid} size="sm">
            <ButtonText style={styles.buttonText}>已通过</ButtonText>
          </Button>
          <HStack space="sm" className="justify-self-end ml-auto">
            <Button variant="outline" style={styles.buttonOutline} size="sm">
              <ButtonText style={styles.buttonText}>删除</ButtonText>
            </Button>
            <Button variant="outline" style={styles.buttonOutline} size="sm">
              <ButtonText style={styles.buttonText}>编辑</ButtonText>
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export default function MyTrips() {
  const { theme } = useTheme(); // 获取当前主题
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTrips();
  const { mutate: createTrip } = useCreateTrip();
  const { mutate: updateTrip } = useUpdateTrip();
  const { mutate: deleteTrip } = useDeleteTrip();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  const trips = data?.pages.flatMap((page) => page.trips) || []; // 修复语法错误

  const handleSubmit = (values: Omit<Trip, "id" | "createdAt">) => {
    if (editingTrip) {
      updateTrip({ id: editingTrip.id, trip: values });
    } else {
      createTrip(values);
    }
    setIsFormOpen(false);
    setEditingTrip(null);
  };

  return (
    <Box
      className="flex-1 p-4"
      style={{
        padding: 0,
        backgroundColor: theme === "light" ? colors.white : "#333", // 动态背景
      }}
    >
      <FlatList
        data={trips}
        renderItem={({ item }) => (
          <Box className="flex-row justify-between items-center">
            <MyTripsCard trip={item} />
            <Box className="flex-row">
              <Button
                size="sm"
                onPress={() => {
                  setEditingTrip(item);
                  setIsFormOpen(true);
                }}
                className="mr-2"
                style={{
                  backgroundColor: theme === "light" ? colors.blue[500] : colors.blue[700], // 编辑按钮背景
                }}
              >
                <ButtonText
                  style={{
                    color: colors.white, // 编辑按钮文字始终白色
                  }}
                >
                  Edit
                </ButtonText>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onPress={() => deleteTrip(item.id)}
                style={{
                  borderColor: theme === "light" ? colors.gray[300] : colors.gray[600], // 删除按钮边框
                }}
              >
                <ButtonText
                  style={{
                    color: theme === "light" ? colors.gray[900] : colors.white, // 删除按钮文字
                  }}
                >
                  Delete
                </ButtonText>
              </Button>
            </Box>
          </Box>
        )}
        keyExtractor={(item) => item.id}
        numColumns={1}
        onEndReached={() =>
          hasNextPage && !isFetchingNextPage && fetchNextPage()
        }
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <Spinner
              size="large"
              color={theme === "light" ? colors.gray[500] : colors.gray[300]} // 动态加载指示器
            />
          ) : null
        }
      />
    </Box>
  );
}
