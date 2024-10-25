import React from 'react';
import { Text, View } from 'react-native';

export default function Heading({ heading, sub }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{ fontSize: 18, fontWeight: '500', textTransform: 'capitalize' }}
      >
        {heading}
      </Text>

      <Text
        style={{
          padding: 10,
          marginLeft: 'auto',
          backgroundColor: '#a63932',
          color: '#FFF',
          //   borderRadius: 10,
        }}
      >
        {sub}
      </Text>
    </View>
  );
}
