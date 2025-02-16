import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CustomBotton({ button, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#a63932',
        width: '100%',
        borderRadius: 10,
        marginVertical:5
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
