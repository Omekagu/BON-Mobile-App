import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#a63932',
        },
        headerTintColor: '#a63932',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen
        name="registration/Registration"
        options={{ title: 'Registration' }}
      />
      <Stack.Screen
        name="registration/Login"
        options={{
          title: 'Login',

          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen name="[missing]" options={{ title: '404' }} />
    </Stack>
  );
}
