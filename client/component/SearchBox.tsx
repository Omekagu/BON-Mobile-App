import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import TextGreen from './TextComp/TextGreen';
import TextCaps from './TextComp/TextCaps';
import BoldText13 from './TextComp/BoldText13';

export default function SearchBox() {
  return (
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
          uri: 'https://transtell.bonhotelsinternational.com/wp-content/uploads/2024/10/bon-hotel-transtell-main-block-img-2.jpg',
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
            <BoldText13 text={'BON LEKKI RESIDENCE'} />
            <TouchableOpacity>
              <AntDesign
                style={{ marginLeft: 'auto' }}
                name="hearto"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <TextCaps text={'8.1 Very good・80 reviews'} />
          <TextCaps text={'Lekki 1・13km from centre'} />
          <TextCaps text={'2.9km from beach'} />
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <TextCaps text={'HOTEL ROOM : 1 bed '} />
          <TextGreen text={'US$20'} />
          <TextCaps text={'includes taxes and charges'} />
          <TextGreen text={'free cancellation'} />
        </View>
      </View>
    </View>
  );
}
