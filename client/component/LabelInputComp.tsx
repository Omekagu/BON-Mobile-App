import { View, Text, TextInput } from 'react-native';
import React from 'react';

export default function LabelInputComp({ placeholder, label }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 15,
          textTransform: 'capitalize',
          fontWeight: '600',
          marginLeft: 15,
          marginBottom: 5, 
        }}
      >
        {label}
      </Text>
      <TextInput
        style={{
          backgroundColor: '#fff',
          height: 60,
          borderRadius: 20,
          paddingLeft: 10,
          marginBottom: 10,
        }}
        placeholder={placeholder}
      />
    </View>
  );
}
