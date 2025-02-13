import { View, Text } from 'react-native';
import React from 'react';

export default function TextCaps({ text }) {
  return (
    <View>
      <Text
        style={{
          textTransform: 'capitalize',
          fontSize: 13,
          lineHeight:25,
          fontWeight:700,
          color: '#545351',
          textAlign: 'justify',
        }}
      >
        {text}
      </Text>
    </View>
  );
}
