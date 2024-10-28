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
    </Stack>
  );
}
