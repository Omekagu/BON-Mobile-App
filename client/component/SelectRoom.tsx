import { View, Text, Image, Platform } from 'react-native';
import React from 'react';
import TextGreen from './TextComp/TextGreen';
import BoldText13 from './TextComp/BoldText13';
import TextCaps from './TextComp/TextCaps';

export default function SelectRoom() {
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
      <View>
        <BoldText13 text={'SUITES'} />
        <TextCaps text={'Prices for 2 adults'} />
        <TextCaps text={'Roomsize: 45m'} />
        <TextCaps text={'Air conditioning '} />
        <TextCaps text={'Ensuite Bathroom'} />
        <TextCaps text={'Flat tv screen'} />
        <TextCaps text={'Includes parking+ high-speed internet'} />
        <TextCaps text={'Flat tv screen'} />
        <TextCaps text={'Price for 1 night(numberof nights)'} />
        <TextCaps text={'Includes tax and charges'} />
        <TextGreen text={'Only 3 units left'} />
        <TextGreen text={'US$119'} />
      </View>

      <Image
        style={{
          width: 70,
          height: 70,
          borderRadius: 10,
          marginRight: 10,
        }}
        source={{
          uri: 'https://transtell.bonhotelsinternational.com/wp-content/uploads/2024/10/bon-hotel-transtell-main-block-img-2.jpg',
        }}
      />
    </View>
  );
}
