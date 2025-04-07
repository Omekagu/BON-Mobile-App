import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomBotton ({ button, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        backgroundColor: '#a63932',
        borderRadius: 10,
        width: '80%',
        alignSelf: 'center',
        elevation: 3
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        {button}
      </Text>
    </TouchableOpacity>
  )
}
