// hooks/useAuth.js
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const tokenData = await AsyncStorage.getItem("token");
        if (tokenData) {
          const { token, expiryTime } = JSON.parse(tokenData);
          if (Date.now() < expiryTime) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error checking authentication", error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  return { isAuthenticated, loading };
};
