import { View, Text } from 'react-native';
import React from 'react';

export default function TextGreen({ text }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '300',
          color: 'green',
        }}
      >
        {text}
      </Text>
    </View>
  );
}
