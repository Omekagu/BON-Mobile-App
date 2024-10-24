import { View, Text, Image } from 'react-native';
import React from 'react';
import TextGreen from './TextGreen';

export default function SelectRoom() {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: 10,
        justifyContent: 'space-between',
        padding: 20,
      }}
    >
      <View>
        <Text style={{ fontSize: 24, fontWeight: 200 }}>Suite</Text>
        <Text>Prices for 2 adults</Text>
        <Text>Roomsize: 45m</Text>
        <Text>Air conditioning </Text>
        <Text>Ensuite Bathroom</Text>
        <Text>Flat tv screen </Text>
        <Text>Includes parking+ high-speed internet</Text>
        <Text>Price for 1 night(numberof nights)</Text>
        <TextGreen text={'Only 3 units left'} />
        <TextGreen text={'US$119'} />
        <Text>Includes tax and charges</Text>
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
