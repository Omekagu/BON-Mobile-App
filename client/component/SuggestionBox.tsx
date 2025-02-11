import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';

const SuggestionBox = ({ name, price, location, image, onPress }) => {
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width:'100%',
        marginRight: 10,
        marginBottom:30,
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
          android: {
            elevation: 5,
          },
        }),
      }}
    >
      <Image
        style={{
          width: '100%',
          height: 300,
          marginTop: 10,
          borderRadius:20
        }}
        source={{
          uri: image,
        }}
      />
      <View
        style={{
          backgroundColor: '#fff',
          gap: 5,
          padding:15,
          // borderBottomRightRadius: 10,
          borderRadius: 10,
          marginTop: -90,
          marginHorizontal:5,
          paddingLeft:10
        }}
      >
        
        <Text style={{ fontWeight: '700' }}>{name}</Text>
      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <EvilIcons name="location" size={24} color="black" /><Text  style={{fontWeight: '300'}}>{location}</Text>
        </View>
        <Text
          style={{
            fontWeight: '900',
            fontSize: 17,
          }}
          >
          ${price}
        </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestionBox;
