import { useRouter } from 'expo-router';
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';

const SuggestionBox = ({ name, price, location, image }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push('/BookingInfo');
      }}
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
          // borderTopRightRadius: 20,
          // borderTopLeftRadius: 20,
        }}
        source={{
          uri: image,
        }}
      />
      <View
        style={{
          backgroundColor: '#fff',
          gap: 5,
          padding:5,
          // borderBottomRightRadius: 10,
          borderRadius: 10,
          marginTop: -90,
          marginHorizontal:5,
          paddingLeft:10
        }}
      >
        
        <Text style={{ fontWeight: '700' }}>{name}</Text>

        <View style={{flexDirection:'row', alignItems:'center'}}>
        <Text><EvilIcons name="location" size={24} color="black" />{location}</Text>
        </View>
        <Text
          style={{
            fontWeight: '700',
            // color: '#3ac93f',
            // alignSelf: 'flex-end',
            fontSize: 14,
          }}
        >
          ${price}/night
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestionBox;
