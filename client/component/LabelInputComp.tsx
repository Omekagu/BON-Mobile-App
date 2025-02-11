import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function LabelInputComp({ label, placeholder, value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#333",
  },
});
