import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CancellationBox({ city, date, name, type, datePrice }) {
  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        gap: 5,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '500' }}>{city}</Text>
      <Text style={{ fontWeight: '500', fontSize: 12 }}>{date}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          gap: 5,
        }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            marginRight: 10,
          }}
          source={{
            uri: 'https://transtell.bonhotelsinternational.com/wp-content/uploads/2024/10/bon-hotel-transtell-main-block-img-2.jpg',
          }}
        />
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: '700' }}>{name} Residence</Text>
          <Text>{datePrice}</Text>
          <Text style={{ color: 'red', fontWeight: '500' }}>{type}</Text>
        </View>

        <View style={{ marginLeft: 'auto' }}>
          <MaterialIcons name="arrow-right-alt" size={30} color="black" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
