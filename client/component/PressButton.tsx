import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const PressButton = ({ text, onPress }) => {
  const router = useRouter()
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#a63932',
        alignSelf: 'center',
        borderRadius: 5,
        margin: 10
      }}
    >
      <Text
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 17,
          color: '#FFF',
          textTransform: 'capitalize',
          fontWeight: '700'
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default PressButton
