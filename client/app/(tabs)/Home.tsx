import React, { useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Suggestions from "@/component/Suggestions"; // Ensure Suggestions uses FlatList inside

export default function Home() {
  useEffect(() => {
    const getData = async () => {
      try {
        let token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        token = token.replace(/^"|"$/g, ""); // Remove quotes if present
        console.log("JWT Token:", token);

        const response = await axios.post(
          "http://10.0.1.35:5001/userData",
          { token }
        );
        console.log("User Data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getData();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
         source={{
          uri: "https://i.postimg.cc/7L0vZwcC/BON-HOTEL-TRANSTELL-ROOMS1.jpg",
        }}
        style={styles.background}
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Home Luxury & Comfort.</Text>
          <Text style={styles.subtitle}>
          Good people. Good thinking. Good feeling.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.suggestionsContainer}>
        <Suggestions />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  background: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius:"100px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    marginTop: 5,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: "#2D9CDB",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  suggestionsContainer: {
    flex: 1,
    marginTop: -20,
    paddingHorizontal: 15,
  },
});
