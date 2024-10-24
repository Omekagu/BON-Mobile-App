import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Search = ({ icon, text }) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          borderColor: '#a63932',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 25,
          borderCurve: 'circular',
          borderWidth: 3,
          marginBottom: 2,
          padding: 15,
          marginLeft: 10,
        }}
      >
        {icon}
        <Text style={{ marginLeft: 20, fontSize: 19 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Search;
