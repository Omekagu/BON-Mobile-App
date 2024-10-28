import { View, Image, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import TextGreen from './TextComp/TextGreen';
import TextCaps from './TextComp/TextCaps';
import BoldText13 from './TextComp/BoldText13';
import { useRouter } from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function SearchBox({
  hotelname,
  image,
  rating,
  rate,
  review,
  landmark,
  distantFromLandmark,
  noBed,
  price,
}) {
  const router = useRouter();
  const [iconColor, setIconColor] = useState('black');
  const handlePress = () => {
    // Toggle between black and red color on press
    setIconColor((prevColor) => (prevColor === 'black' ? 'red' : 'black'));
  };
  return (
    <TouchableOpacity
      onPress={() => {
        router.push('/SearchPageInfo');
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          padding: 5,
          borderRadius: 10,
          marginVertical: 5,

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
            width: 120,
            height: 230,
            borderRadius: 10,
            marginRight: 10,
          }}
          source={{
            uri: image,
          }}
        />

        <View
          style={{
            justifyContent: 'space-between',
            width: '65%',
            padding: 5,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <BoldText13 text={hotelname} />
              <TouchableOpacity onPress={handlePress}>
                <Fontisto name="heart" size={24} color={iconColor} />
              </TouchableOpacity>
            </View>
            <TextCaps text={`${rating} ${rate}・${review} reviews`} />
            <TextCaps text={landmark} />
            <TextCaps text={distantFromLandmark} />
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <TextCaps text={`HOTEL ROOM : ${noBed} bed `} />
            <TextGreen text={`$${price}`} />
            <TextCaps text={'includes taxes and charges'} />
            {/* <TextGreen text={'free cancellation'} /> */}
          </View>
        </View>
        {/* <CustomBotton button={'select'} /> */}
      </View>
    </TouchableOpacity>
  );
}
