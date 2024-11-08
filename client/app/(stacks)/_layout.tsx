import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
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
