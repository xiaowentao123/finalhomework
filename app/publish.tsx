import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Input,
  Button,
  ButtonText,
  InputField,
  Text,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  Heading,
  AlertDialogBody,
  AlertDialogFooter,
} from "@gluestack-ui/themed";
import MediaPicker from "@/components/MediaPicker";
import { useRouter, useNavigation } from "expo-router";

export default function Publish() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (!title && !content && images.length === 0) {
        return;
      }
      e.preventDefault();
      setDialogVisible(true);
    });

    return unsubscribe;
  }, [navigation, title, content, images]);

  const handleMediaChange = (
    assets: { uri: string; type: "image" | "video" }[]
  ) => {
    setImages(assets.filter((a) => a.type === "image").map((a) => a.uri));
    const videoAsset = assets.find((a) => a.type === "video");
    setVideo(videoAsset ? videoAsset.uri : null);
  };

  const handleSubmit = () => {
    if (!title || !content || images.length === 0) {
      Alert.alert("提示", "标题、内容、图片均为必填项");
      return;
    }
    Alert.alert("发布成功", "游记已发布！");
  };

  const handleDialogClose = (confirm: boolean) => {
    setDialogVisible(false);
    if (confirm) {
      router.push("/");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <MediaPicker onChange={handleMediaChange} />
        <Input style={[styles.input, { marginBottom: 0 }]} variant="underlined">
          <InputField
            placeholder="请输入标题（必填）"
            value={title}
            onChangeText={setTitle}
            style={styles.inputField}
            maxLength={50}
            multiline={false}
          />
        </Input>
        <View style={styles.divider} />
        <Input
          style={[styles.input, { minHeight: 300, borderBottomWidth: 0 }]}
          variant="underlined"
        >
          <InputField
            placeholder="请输入内容（必填）"
            value={content}
            onChangeText={setContent}
            style={[styles.inputField, styles.textarea]}
            multiline={true}
            numberOfLines={15}
          />
        </Input>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          onPress={handleSubmit}
          style={{ borderRadius: 24, height: 48, backgroundColor: "#3ec6fd" }}
        >
          <ButtonText style={{ fontSize: 18, color: "#fff" }}>发布</ButtonText>
        </Button>
      </View>
      <AlertDialog
        isOpen={isDialogVisible}
        onClose={() => handleDialogClose(false)}
      >
        {/* <AlertDialog.Content>
          <AlertDialog.Header>确认退出</AlertDialog.Header>
          <AlertDialog.Body>您还没有提交，确定要退出发布吗？</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button onPress={() => handleDialogClose(false)}>
              <ButtonText>取消</ButtonText>
            </Button>
            <Button onPress={() => handleDialogClose(true)}>
              <ButtonText>确定</ButtonText>
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content> */}
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              您还没有提交，确定要退出发布吗？
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">未发布的内容将不会被保存，您是否选择继续退出</Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={() => handleDialogClose(false)}
              size="sm"
              className="mr-2"
            >
              <ButtonText>取消</ButtonText>
            </Button>
            <Button size="sm" onPress={() => handleDialogClose(true)}>
              <ButtonText>确定</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    marginBottom: 16,
    paddingHorizontal: 0,
    paddingVertical: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  inputField: {
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: 16,
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: 36,
  },
  textarea: {
    textAlignVertical: "top",
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
});
