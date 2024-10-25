import { View, Text } from 'react-native';
import React from 'react';

export default function BoldText13({ text }) {
  return (
    <View>
      <Text
        style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' }}
      >
        ・{text}
      </Text>
    </View>
  );
}
