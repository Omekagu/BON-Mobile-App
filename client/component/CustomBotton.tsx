import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CustomBotton({ button, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
            padding: 20,
            backgroundColor: "#a63932",
            borderRadius: 30,
            width: "100%",
            alignItems: "center",
            elevation: 3,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: '500',
          textTransform: 'capitalize',
        }}
      >
        {button}
      </Text>
    </TouchableOpacity>
  );
}
