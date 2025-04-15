import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ExtComp ({ head, tag, onPress, icon }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 20
      }}
    >
      <View>
        <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 8 }}>
          {head}
        </Text>
        <Text style={[{ fontSize: 15, fontWeight: '700' }]}>{tag}</Text>
      </View>

      {icon}
    </TouchableOpacity>
  )
}
