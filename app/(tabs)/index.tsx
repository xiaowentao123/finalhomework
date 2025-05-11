import "@/global.css";
import React, { useEffect } from "react";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import { Box, Spinner, Text } from "@gluestack-ui/themed";
import { useTrips } from "@/hooks/useTrips";
import { TripCard } from "@/components/TripCard";
import colors from "tailwindcss/colors";
import { router, useNavigation } from "expo-router";
const { width: WINDOW_WIDTH } = Dimensions.get("window");

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTrips();
  const numColumns = 2;
  const trips = data?.pages.flatMap((page) => page.trips) || [];
  const filledTrips = [...trips];
  const remainder = trips.length % numColumns;
  const cardWidth = Math.min(WINDOW_WIDTH * 0.45, 320);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Fetch or refresh data here
    });

    return unsubscribe;
  }, [router]);
  if (remainder !== 0) {
    const placeholders = Array.from({ length: numColumns - remainder }).map(
      (_, i) => ({ id: `placeholder-${i}`, isPlaceholder: true })
    );
    filledTrips.push(...(placeholders as any));
  }
  // console.log(data);
  return (
    <Box
      className="flex-1 p-4 bg-blue"
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 10,
        paddingBottom: 0,
      }}
    >
      <FlatList
        initialNumToRender={10}
        data={filledTrips}
        renderItem={({ item }) => {
          // console.log("Render Trip:", item.id, item.title);
          // console.log("Trip title debug", item.id, JSON.stringify(item.title));
          // return <TripCard trip={item} />;
          if ((item as any).isPlaceholder) {
            return <View style={{ width: cardWidth, height: 0 }} />;
          }
          return <TripCard trip={item} />;
        }}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={numColumns}
        onEndReached={() =>
          hasNextPage && !isFetchingNextPage && fetchNextPage()
        }
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <Spinner size="large" color={colors.gray[500]} />
          ) : null
        }
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: 0,
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 10,
          // maxWidth: "50%",
        }}
      />
    </Box>
  );
}
