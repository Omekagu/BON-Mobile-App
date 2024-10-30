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
    </Stack>
  );
}
