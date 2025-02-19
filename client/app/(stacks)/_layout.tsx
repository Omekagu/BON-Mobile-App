import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome} from '@expo/vector-icons';
import { Stack } from 'expo-router';
export default function _layout() {
  const [isHeartClicked, setHeartClicked] = useState(false);

  const toggleHeart = () => {
    setHeartClicked(!isHeartClicked);
  };
  return (
    <Stack>
      <Stack.Screen
        name="BookingInfo"
        options={{
          title: 'BookingInfo',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DescriptionPage"
        options={{
          title: 'DescriptionPage',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectDateRange"
        options={{
          title: 'SelectDateRange',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchPage"
        options={{
          title: 'SearchPage',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchPageInfo"
        
        options={{
          title: 'SearchPageInfo',
          headerShown: false,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              {/* Search Icon */}
              <TouchableOpacity onPress={() => console.log('Search clicked')}>
                <Feather name="search" size={24} color="black" style={{ marginRight: 15 }} />
              </TouchableOpacity>

              {/* Heart Icon */}
              <TouchableOpacity onPress={toggleHeart}>
                <FontAwesome
                  name={isHeartClicked ? 'heart' : 'heart-o'}
                  size={24}
                  color={isHeartClicked ? 'red' : 'black'}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
       <Stack.Screen
        name="BookingDetails"
        options={{
          title: 'BookingDetails',
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="BookRide"
        options={{
          title: 'BookRide',
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="BookFlight"
        options={{
          title: 'BookFlight',
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="OrderFood"
        options={{
          title: 'OrderFood',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Deals"
        options={{
          title: 'Deals',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        options={{
          title: 'Profile',
          headerShown: false,
          // statusBarHidden: true,
        }}
      />
      <Stack.Screen
        name="CustomerService"
        options={{
          title: 'CustomerService',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Loyalty"
        options={{
          title: 'Loyalty',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Questions"
        options={{
          title: 'Question',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResourceCentre"
        options={{
          title: 'ResourceCentre',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Reviews"
        options={{
          title: 'Reviews',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Reward"
        options={{
          title: 'Reward',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        options={{
          title: 'Search',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChooseNo"
        options={{
          title: 'ChooseNo',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payments"
        options={{
          title: 'Payments',
          headerShown: false,
        }}
      />
        <Stack.Screen
          name="BookingHistory"
          options={{
            title: 'BookingHistory',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ConnectWallet"
          options={{
            title: 'ConnectWallet',
            headerShown: false,
          }}
        />
      <Stack.Screen
        name="CardPayment"
        options={{
          title: 'CardPayment',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CryptoPayment"
        options={{
          title: 'CryptoPayment',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditName"
        options={{
          title: 'EditName',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditContact"
        options={{
          title: 'EditContact',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditDob"
        options={{
          title: 'EditDob',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditEmail"
        options={{
          title: 'EditEmail',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditNationality"
        options={{
          title: 'EditNationality',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditAddress"
        options={{
          title: 'EditAddress',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditGender"
        options={{
          title: 'EditGender',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditPhone"
        options={{
          title: 'EditPhone',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
