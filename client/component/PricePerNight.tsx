import { View, Text } from 'react-native';
import React from 'react';
import TextGreen from './TextComp/TextGreen';

export default function PricePerNight({ number, start, end, price }) {
  return (
    <View style={{ gap: 10 }}>
      <Text>
        Price for {number} night ({start} - {end})
      </Text>
      <TextGreen text={price} />
    </View>
  );
}
