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
          borderRadius: 10,
          borderCurve: 'circular',
          borderWidth: 2,
          marginBottom: 5,
          paddingVertical: 5,
          paddingHorizontal: 10,
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
