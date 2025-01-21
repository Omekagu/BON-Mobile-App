import { View, Text, Image, Platform, Button } from 'react-native';
import React from 'react';
import TextGreen from './TextComp/TextGreen';
import BoldText13 from './TextComp/BoldText13';
import TextCaps from './TextComp/TextCaps';
import CustomBotton from './CustomBotton';

export default function SelectRoom({
  image,
  suite,
  number,
  noOfNights,
  size,
  price,
  units,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: 10,
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 10,
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
      <View style={{ gap: 5 }}>
        <BoldText13 text={suite} />
        <TextCaps text={`Prices for ${number} adults`} />
        <TextCaps text={`Roomsize: ${size}m`} />
        <TextCaps text={'Air conditioning '} />
        <TextCaps text={'Ensuite Bathroom'} />
        <TextCaps text={'Flat tv screen'} />
        <TextCaps text={'Includes parking+ high-speed internet'} />
        <TextCaps text={'Flat tv screen'} />
        <TextCaps text={`Price for ${noOfNights} night`} />
        <TextCaps text={`Includes tax and charges`} />
        <TextGreen text={`Only ${units} units left`} />
        <TextGreen text={`₦${price}`} />

        <CustomBotton button={'select room'} />
      </View>

      <Image
        style={{
          width: 70,
          height: 70,
          borderRadius: 10,
          marginRight: 10,
        }}
        source={{ uri: image }}
        // source={{
        //   uri: 'https://transtell.bonhotelsinternational.com/wp-content/uploads/2024/10/bon-hotel-transtell-main-block-img-2.jpg',
        // }}
      />
    </View>
  );
}
