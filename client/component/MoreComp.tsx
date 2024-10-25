import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function MoreComp({ name, icon }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <View style={{ marginRight: 15 }}>{icon}</View>

      <View>
        <Text style={{ fontSize: 17, fontWeight: '500', color: '#a63932' }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
