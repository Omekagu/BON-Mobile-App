import { View, Text } from 'react-native';
import React from 'react';

export default function SubMoreComp({ label, name, subname, icon }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginHorizontal: 20,
        paddingRight: 20,
        marginVertical: 10,
      }}
    >
      <View>{icon}</View>

      <View style={{ marginLeft: 7 }}>
        <Text
          style={{
            fontSize: 15,
            // textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 5,
            textTransform: 'capitalize',
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: '#a63932',
            fontSize: 17,
            fontWeight: '500',
            marginTop: 5,
            textTransform: 'capitalize',
          }}
        >
          {subname}
        </Text>
      </View>
    </View>
  );
}
