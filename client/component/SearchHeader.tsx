import { View, Text } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SearchHeader({ location, date }) {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: '#a63932',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      <Text
        style={{ fontSize: 15, fontWeight: '500', textTransform: 'capitalize' }}
      >
        {location} : {date}
      </Text>
    </View>
  );
}
