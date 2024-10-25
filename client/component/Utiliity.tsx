import React from 'react';
import { Text, View } from 'react-native';

export default function Utility({ icon, name }) {
  return (
    <View style={{ alignItems: 'center', margin: 10, gap: 5 }}>
      <View
        style={{ backgroundColor: '#b9bdba', padding: 10, borderRadius: 50 }}
      >
        {icon}
      </View>
      <Text style={{ textTransform: 'capitalize' }}>{name}</Text>
    </View>
  );
}
