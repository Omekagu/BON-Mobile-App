import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ExtComp({ head, tag, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
      }}
    >
      <View>
        <Text style={{ fontSize: 15, fontWeight: '500', marginBottom: 8 }}>
          {head}
        </Text>
        <Text style={[{ fontSize: 17, fontWeight: '300' }]}>{tag}</Text>
      </View>

      <AntDesign
        name="right"
        size={18}
        color="black"
        style={{ marginLeft: 'auto' }}
      />
    </TouchableOpacity>
  );
}
