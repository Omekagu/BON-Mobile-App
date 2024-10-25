import { View, Text } from 'react-native';
import React from 'react';
import TextCaps from './TextComp/TextCaps';
import BoldText13 from './TextComp/BoldText13';

export default function RoomsNGuest({ name, roomNo, peopleNo, childrenNo }) {
  return (
    <View
      style={{
        alignItems: 'center',
        padding: 2,
        gap: 10,
        // backgroundColor: 'red',
      }}
    >
      <BoldText13 text={name} />
      <Text
        style={{ color: '#a63932', fontSize: 17, textTransform: 'capitalize' }}
      >
        {roomNo} Rooms · {peopleNo} adults · {childrenNo} Children
      </Text>
    </View>
  );
}
