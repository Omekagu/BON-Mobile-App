import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ExtraMoreComp({ icon, name, subname }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginHorizontal: 20,
        paddingRight: 20,
      }}
    >
      <View>{icon}</View>

      <View style={{ marginLeft: 7 }}>
        <Text style={{ fontSize: 17, textTransform: 'capitalize' }}>
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
    </TouchableOpacity>
  );
}
