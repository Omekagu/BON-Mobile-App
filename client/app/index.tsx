import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../app/i18n"; // Import i18n configuration

export default function IndexPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [languageSelected, setLanguageSelected] = useState(false);

  useEffect(() => {
    const checkLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("user-language");

        if (savedLang) {
          await i18n.changeLanguage(savedLang);
          setLanguageSelected(true);
        } else {
          setModalVisible(true); // No language selected → show modal
        }
      } catch (error) {
        console.error("Error loading language:", error);
        setModalVisible(true);
      }
    };

    checkLanguage();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (!languageSelected) return; // Wait until language is selected

      try {
        const tokenData = await AsyncStorage.getItem("token");

        if (tokenData) {
          const { token, expiryTime } = JSON.parse(tokenData);

          if (Date.now() < expiryTime) {
            router.replace("/Home"); // ✅ Redirect to Home
            return;
          } else {
            await AsyncStorage.removeItem("token"); // ❌ Token expired
          }
        }

        router.replace("/registration/Registration"); // Redirect to login
      } catch (error) {
        console.error("Auth Check Error:", error);
        router.replace("/registration/Registration");
      } finally {
        setLoading(false);
      }
    };

    if (languageSelected) checkAuth();
  }, [languageSelected]);

  const changeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem("user-language", lang);
    setModalVisible(false);
    setLanguageSelected(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#a63932" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Language Selection Modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Select Your Language</Text>
            <TouchableOpacity onPress={() => changeLanguage("en")} style={styles.button}>
              <Text style={styles.buttonText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage("es")} style={styles.button}>
              <Text style={styles.buttonText}>Español</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage("fr")} style={styles.button}>
              <Text style={styles.buttonText}>Français</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#a63932",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

