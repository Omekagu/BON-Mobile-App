import { View, Text } from 'react-native';
import React from 'react';

export default function BoldText13({ text }) {
  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{text}</Text>
    </View>
  );
}
