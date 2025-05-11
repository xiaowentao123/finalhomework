import React, { useState } from "react";
import { FlatList } from "react-native";
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

const MyTripsCard = ({ trip }: { trip: Trip }) => {
  return (
    <Card
      className="flex-row m-4 p-4 rounded-lg shadow-md mb-1"
      style={{ padding: 0 }}
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
              style={{ fontSize: 16, fontWeight: "bold" }}
              numberOfLines={1}
            >
              {trip.title}
            </Text>
            <Box>
              <Text
                className="text-gray-600 bg-red"
                numberOfLines={2}
                style={{ width: 170, fontSize: 13 }}
              >
                {trip.content}内容内容内容内容内容内容内容内容
              </Text>
            </Box>
          </VStack>
        </HStack>
        <HStack space="sm" className="flex">
          <Button variant="solid" bgColor="green" size="sm">
            <ButtonText>已通过</ButtonText>
          </Button>
          <HStack space="sm" className="justify-self-end ml-auto">
            <Button variant="outline" size="sm">
              <ButtonText>删除</ButtonText>
            </Button>
            <Button variant="outline" size="sm">
              <ButtonText>编辑</ButtonText>
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export default function MyTrips() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTrips();
  const { mutate: createTrip } = useCreateTrip();
  const { mutate: updateTrip } = useUpdateTrip();
  const { mutate: deleteTrip } = useDeleteTrip();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  const trips = data?.pages.flatMap((page) => page.trips) || [];

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
    <Box className="flex-1 p-4" style={{ padding: 0 }}>
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
              >
                <ButtonText>Edit</ButtonText>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onPress={() => deleteTrip(item.id)}
              >
                <ButtonText>Delete</ButtonText>
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
            <Spinner size="large" color={colors.gray[500]} />
          ) : null
        }
      />
    </Box>
  );
}
