import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function CustomBotton({ button }) {
  //   const router = useRouter();
  return (
    <TouchableOpacity
      //   onPress={() => {
      //     router.push('/SearchPage');
      //   }}
      style={{
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#a63932',
        width: '100%',
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: '500',
          textTransform: 'capitalize',
        }}
      >
        {button}
      </Text>
    </TouchableOpacity>
  );
}
