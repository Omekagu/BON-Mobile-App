import { View, Text } from 'react-native';
import React from 'react';
import TextCaps from './TextComp/TextCaps';

export default function CheckInOutComp({ name, date }) {
  return (
    <View
      style={{
        alignItems: 'center',
        padding: 2,
        gap: 10,
      }}
    >
      <TextCaps text={name} />
      <Text style={{ color: '#a63932', fontSize: 17 }}>{date}</Text>
    </View>
  );
}
