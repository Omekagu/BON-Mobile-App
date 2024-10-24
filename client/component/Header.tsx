import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#a63932',
        borderColor: '#a63932',
        borderBottomWidth: 1,
      }}
    >
      <Text
        style={{
          marginRight: 'auto',
          fontSize: 15,
          fontWeight: '900',
          color: '#fff',
        }}
      >
        BON HOSPITALITY
      </Text>
      <TouchableOpacity>
        <Entypo name="menu" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
