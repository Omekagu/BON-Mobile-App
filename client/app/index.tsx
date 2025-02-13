import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IndexPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const tokenData = await AsyncStorage.getItem("token");

        if (tokenData) {
          const { token, expiryTime } = JSON.parse(tokenData);

          if (Date.now() < expiryTime) {
            // ✅ Redirect to Home if token is valid
            router.replace("/Home");
            return;
          } else {
            // ❌ Token expired, remove it
            await AsyncStorage.removeItem("token");
          }
        }

        // Redirect to Login if not authenticated
        router.replace("/registration/Login");
      } catch (error) {
        console.error("Auth Check Error:", error);
        router.replace("/registration/Login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#a63932" />
      </View>
    );
  }

  return null; // Just redirects, nothing to render
}
