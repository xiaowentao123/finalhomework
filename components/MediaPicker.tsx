import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ToastAndroid,
  Platform,
  Alert,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";

interface MediaAsset {
  uri: string;
  type: "image" | "video";
}

interface MediaPickerProps {
  onChange: (assets: MediaAsset[]) => void;
}

const MediaPicker: React.FC<MediaPickerProps> = ({ onChange }) => {
  const [selectedAssets, setSelectedAssets] = useState<MediaAsset[]>([]);
  const [preview, setPreview] = useState<{
    uri: string;
    type: "image" | "video";
  } | null>(null);

  const showToast = (msg: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      const assets = result.assets.map((a: ImagePicker.ImagePickerAsset) => ({
        uri: a.uri,
        type:
          a.type && a.type.startsWith("video")
            ? ("video" as const)
            : ("image" as const),
      }));
      // 统计视频数量
      const videoCount =
        assets.filter((a) => a.type === "video").length +
        selectedAssets.filter((a) => a.type === "video").length;
      if (videoCount > 1) {
        showToast("只能上传一个视频");
        return;
      }
      // 合并新旧，去重
      const allAssets = [...selectedAssets, ...assets].reduce<MediaAsset[]>(
        (acc, cur) => {
          if (!acc.find((a) => a.uri === cur.uri)) acc.push(cur);
          return acc;
        },
        []
      );
      setSelectedAssets(allAssets);
      onChange(allAssets);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        <TouchableOpacity style={styles.uploadBox} onPress={pickMedia}>
          <Ionicons
            name={"image-outline"}
            size={24}
            color="#3ec6fd"
            style={styles.icon}
          />
          <Text style={styles.text}>上传图片/视频</Text>
        </TouchableOpacity>
        {selectedAssets.map((asset, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.previewWrapper}
            onPress={() => setPreview(asset)}
          >
            {asset.type === "image" ? (
              <Image
                source={{ uri: asset.uri }}
                alt="image"
                style={styles.previewImg}
              />
            ) : (
              <View style={styles.videoBox}>
                <Ionicons
                  name="play-circle"
                  size={24}
                  color="#fff"
                  style={styles.playIcon}
                />
                <Image
                  source={{ uri: asset.uri }}
                  alt="image"
                  style={styles.previewImg}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* 预览弹窗 */}
      <Modal
        visible={!!preview}
        transparent
        animationType="fade"
        onRequestClose={() => setPreview(null)}
      >
        <View style={styles.modalBg}>
          <Pressable
            style={styles.closeArea}
            onPress={() => setPreview(null)}
          />
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setPreview(null)}
            >
              <Ionicons name="close-circle" size={32} color="#fff" />
            </TouchableOpacity>
            {preview?.type === "image" ? (
              <Image
                source={{ uri: preview.uri }}
                style={styles.fullImg}
                resizeMode="contain"
                alt="image"
              />
            ) : preview?.type === "video" ? (
              <Video
                source={{ uri: preview.uri }}
                style={styles.fullImg}
                useNativeControls
                resizeMode="contain"
                shouldPlay
                isLooping={false}
              />
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const BOX_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  uploadBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 1,
    borderColor: "#e5e6eb",
    borderRadius: 14,
    backgroundColor: "#fafbfc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 6,
  },
  icon: {
    marginBottom: 2,
  },
  text: {
    marginTop: 2,
    color: "#3ec6fd",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
  previewWrapper: {
    position: "relative",
    marginRight: 10,
  },
  previewImg: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  videoBox: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    position: "absolute",
    left: BOX_SIZE / 2 - 12,
    top: BOX_SIZE / 2 - 12,
    zIndex: 1,
  },
  // 预览弹窗样式
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: "90%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  fullImg: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#222",
  },
});

export default MediaPicker;
