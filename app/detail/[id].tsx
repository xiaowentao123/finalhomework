import React, { useState } from "react";
import { Box, HStack, Text } from "@gluestack-ui/themed";
import { useTrip } from "@/hooks/useTrips";
import { useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  View,
  Image as RNImage,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView as RNScrollView,
  ActivityIndicator,
} from "react-native";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const pad = (n: number) => (n < 10 ? "0" + n : n);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function Detail() {
  const { id } = useLocalSearchParams();
  const { data: trip, isLoading, error } = useTrip(id as string);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !trip) return <Text>Error loading trip</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <RNScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* 图片轮播区域 */}
        <RNScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.5 }}
        >
          {(trip.images || []).map((img, idx) => (
            <TouchableOpacity
              key={img}
              activeOpacity={0.9}
              onPress={() => setPreviewIndex(idx)}
            >
              <RNImage
                source={{ uri: img }}
                style={{
                  width: SCREEN_WIDTH,
                  height: SCREEN_HEIGHT * 0.5,
                  resizeMode: "cover",
                }}
              />
            </TouchableOpacity>
          ))}
        </RNScrollView>
        {/* 内容区域 */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
            {trip.title}
          </Text>
          <Text style={{ color: "#888", marginBottom: 16 }}>
            {formatDate(trip.createdAt)}
          </Text>
          <Text style={{ fontSize: 16, color: "#222" }}>{trip.content}</Text>
        </View>
      </RNScrollView>
      {/* 全屏图片预览 */}
      <Modal
        visible={previewIndex !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewIndex(null)}
      >
        <View style={styles.modalBg}>
          <RNScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: (previewIndex ?? 0) * SCREEN_WIDTH, y: 0 }}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
          >
            {(trip.images || []).map((img, idx) => (
              <TouchableOpacity
                key={img}
                style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
                activeOpacity={1}
                onPress={() => setPreviewIndex(null)}
              >
                <RNImage
                  source={{ uri: img }}
                  style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    resizeMode: "contain",
                    backgroundColor: "#000",
                  }}
                />
              </TouchableOpacity>
            ))}
          </RNScrollView>
        </View>
      </Modal>
      {/* 页脚 */}
      <View style={styles.footer}>
        <Text style={{ color: "#888", fontSize: 14 }}>© 2025 旅行日记</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
