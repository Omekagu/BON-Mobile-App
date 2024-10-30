import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';

export default function CancellationBox({
  city,
  date,
  name,
  type,
  datePrice,
  image,
  color,
  onDeletePressed,
}) {
  const router = useRouter();
  const renderRightAction = () => {
    <TouchableOpacity onPress={onDeletePressed}></TouchableOpacity>;
  };
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightAction}>
        <TouchableOpacity
          onPress={() => {
            router.push('/SearchPageInfo');
          }}
        >
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
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                textTransform: 'capitalize',
              }}
            >
              {city}
            </Text>
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
                  uri: image,
                }}
              />
              <View style={{ gap: 5 }}>
                <Text style={{ fontWeight: '700' }}>{name} Residence</Text>
                <Text>{datePrice}</Text>
                <Text style={[{ color: color, fontWeight: '500' }]}>
                  {type}
                </Text>
              </View>

              <View style={{ marginLeft: 'auto' }}>
                <MaterialIcons name="arrow-right-alt" size={30} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
