import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CustomBotton({ button }) {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 300,
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
