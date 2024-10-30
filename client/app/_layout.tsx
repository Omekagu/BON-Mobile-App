import { View, Text, Button } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';

export default function _layout() {
  // const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#a63932',
        },
        headerTintColor: '#a63932',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name="registration/Registration"
        options={{
          title: 'Registration',
        }}
      />
      <Stack.Screen
        name="registration/Login"
        options={{
          title: 'Login',
          // presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen name="(stacks)" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="[missing]" options={{ title: '404' }} />
    </Stack>
  );
}
