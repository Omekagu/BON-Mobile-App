import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import ExtComp from '@/component/ExtComp';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  return (
    <SafeAreaView>
    <ScrollView style={{ padding: 10 }}>
      <View
        style={{
          alignSelf: 'center',
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
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="camera-plus-outline"
            size={24}
            color="black"
            style={{
              marginVertical: -20,
              marginHorizontal: 60,
              backgroundColor: '#fff',
              padding: 0.1,
              borderRadius: 100,
            }}
            />
        </TouchableOpacity>
      </View>
      <ExtComp
        head={'Name'}
        tag={'Olivia Freya Zenya'}
        onPress={() => router.push('/EditName')}
        />
      <ExtComp
        head={'Gender'}
        tag={'Select Your Gender'}
        onPress={() => router.push('/EditGender')}
      />
      <ExtComp
        head={'Date of Birth'}
        tag={'Enter date of birth'}
        onPress={() => router.push('/EditDob')}
        />
      <ExtComp
        head={'Email'}
        tag={'Enter Email Address'}
        onPress={() => router.push('/EditAddress')}
        />
      <ExtComp
        head={'Contact Details'}
        tag={'Our company will use'}
        onPress={() => router.push('/EditContact')}
        />
      <ExtComp
        head={'Phone Number'}
        tag={'Add your phone number'}
        onPress={() => router.push('/EditPhone')}
        />
      <ExtComp
        head={'Address'}
        tag={'Add your address'}
        onPress={() => router.push('/EditAddress')}
        />
      <ExtComp
        head={'Nationalty'}
        tag={'Select your nationality'}
        onPress={() => router.push('/EditNationality')}
        />
    </ScrollView>
    </SafeAreaView>
  );
}
