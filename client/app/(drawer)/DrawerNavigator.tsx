import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import { useNavigation } from "expo-router";
import TabsNavigator from "../(tabs)/_layout"; // Your existing Tabs navigator

const Drawer = createDrawerNavigator();

const CustomDrawerContent = () => {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#a63932" }}>
      <Text style={{ color: "white", fontSize: 20 }}>Drawer Menu</Text>
      {/* Add your menu links here */}
    </View>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: "#fff", width: 250 },
        headerShown: false, // Hide default header
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Tabs" component={TabsNavigator} />
    </Drawer.Navigator>
  );
}
