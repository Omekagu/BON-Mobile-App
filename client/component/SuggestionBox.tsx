import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';

const SuggestionBox = ({ name, price, meter, image }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push('/BookingInfo');
      }}
      style={{
        width: 250,
        marginRight: 10,
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
          width: 250,
          height: 200,
          marginTop: 10,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
        source={{
          uri: image,
        }}
      />
      <View
        style={{
          backgroundColor: '#fff',
          gap: 5,
          padding: 5,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <Text style={{ fontWeight: '700' }}>{name}</Text>
        <Text>{meter}m</Text>
        <Text
          style={{
            fontWeight: '700',
            color: '#3ac93f',
            alignSelf: 'flex-end',
            fontSize: 18,
          }}
        >
          ${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestionBox;
