import CancellationBox from '@/component/CancellationBox';
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Animated } from "react-native";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("Completed");
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value

  const tabs = ["Completed", "Pending", "Cancelled"];

  // Animation function
  const animateTabChange = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300, // Animation duration
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateTabChange();
  }, [activeTab]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          {activeTab === "Completed" && (
            <ScrollView style={styles.scrollContent}>
              {[...Array(6)].map((_, index) => (
                <CancellationBox
                  key={index}
                  image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
                  city={'Bayelsa'}
                  date={'16 - 20 Oct 2024'}
                  name={'Bon Lekki'}
                  datePrice={'16 - 20 Oct ₦55,00.00'}
                  type={'completed'}
                  color={'green'}
                />
              ))}
            </ScrollView>
          )}
          {activeTab === "Pending" && (
            <ScrollView style={styles.scrollContent}>
              <CancellationBox
                image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
                city={'Bayelsa'}
                date={'16 - 20 Oct 2024'}
                name={'Bon Lekki'}
                datePrice={'16 - 20 Oct ₦55,00.00'}
                type={'Pending'}
                color={'orange'}
              />
            </ScrollView>
          )}
          {activeTab === "Cancelled" && (
            <ScrollView style={styles.scrollContent}>
              <CancellationBox
                image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
                city={'Bayelsa'}
                date={'16 - 20 Oct 2024'}
                name={'Bon Lekki'}
                datePrice={'16 - 20 Oct ₦55,00.00'}
                type={'cancelled'}
                color={'red'}
              />
            </ScrollView>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#ebebeb", paddingTop: 10 },
  tabContainer: { flexDirection: "row", paddingHorizontal: 10, paddingVertical: 10, width: '100%', justifyContent: 'space-between' },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#6a5c5c",
    marginRight: 10,
  },
  activeTab: { backgroundColor: "#993d3d" },
  tabText: { fontSize: 16, color: "#ccc" },
  activeTabText: { color: "#000", fontWeight: "bold" },
  contentContainer: { padding: 1, backgroundColor: '#ebebeb' },
  scrollContent: { marginVertical: 10, height: '90%' },
});

export default Bookings;
