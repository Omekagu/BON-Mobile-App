import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function MoreComp({ name, icon, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
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
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#a63932' }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
