import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ProfileBox() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          marginRight: 10,
        }}
        source={{
          uri: 'https://media.gettyimages.com/id/2042540731/photo/successful-businesswoman-portrait.jpg?s=612x612&w=0&k=20&c=wGC1ix5qcXdAYdPKNdvhmUWN7NPSJlndh2sV4FK5fls=',
        }}
      />

      <View>
        <Text style={{ fontSize: 19, fontWeight: '500' }}>
          Olivia Freya, zenya
        </Text>
        <Text>Account Details</Text>
      </View>

      <MaterialIcons
        style={{ marginLeft: 'auto' }}
        name="keyboard-arrow-right"
        size={24}
        color="black"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
