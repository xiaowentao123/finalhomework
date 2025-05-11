import React from "react";
import { Tabs } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

const queryClient = new QueryClient();

export default function Layout() {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#ffd33d",
            tabBarStyle: { backgroundColor: "#fff" },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "",
              headerStyle: { height: 40 },
              tabBarLabel: "主页",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "home-sharp" : "home-outline"}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarLabel: "Search",
              tabBarShowLabel: true,
              href: null,
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "compass" : "compass-outline"}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="publish-placeholder"
            options={{
              title: "发布",
              tabBarLabel: "发布",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "add-circle" : "add-circle-outline"}
                  color={color}
                  size={24}
                />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  delayLongPress={500}
                  {...props}
                  onPress={() => router.push("/publish")}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name={"add-circle-outline"}
                    color={
                      props.accessibilityState?.selected ? "#ffd33d" : "#888"
                    }
                    size={28}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: props.accessibilityState?.selected
                        ? "#ffd33d"
                        : "#888",
                    }}
                  >
                    发布
                  </Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Tabs.Screen
            name="my-trips"
            options={{
              title: "",
              headerStyle: { height: 40 },
              tabBarLabel: "我的发布",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
