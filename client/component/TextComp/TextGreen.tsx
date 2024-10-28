import { View, Text } from 'react-native';
import React from 'react';

export default function TextGreen({ text }) {
  return (
    <View>
      <Text
        style={{
          marginBottom: 5,
          fontSize: 15,
          fontWeight: '700',
          color: 'green',
          textTransform: 'capitalize',
        }}
      >
        {text}
      </Text>
    </View>
  );
}
