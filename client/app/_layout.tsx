import React from 'react';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function _layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#a63932',
          },
          headerTintColor: '#fff',
          animation: 'slide_from_right', // Default transition
          animationTypeForReplace: 'push', // Ensures proper animation when replacing screens
          gestureEnabled: true, // Enable swipe back
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="registration/Registration" options={{ title: 'Registration',animation: 'fade' }} />
        <Stack.Screen name="registration/Login" options={{ title: 'Login', headerShown: false,animation: 'fade' }} />
        <Stack.Screen name="(stacks)" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="[missing]" options={{ title: '404' }} />
      </Stack>
      <Toast />
    </>
  );
}
