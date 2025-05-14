import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="Login" options={{ title: "" }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="publish"
            options={{
              headerShown: true,
              title: "",
              headerBackButtonDisplayMode: "generic",
            }}
          />
          <Stack.Screen
            name="detail/[id]"
            options={{
              headerShown: true,
              title: "",
              headerBackButtonDisplayMode: "generic",
            }}
          />
        </Stack>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
