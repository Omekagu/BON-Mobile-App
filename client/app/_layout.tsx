import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/component/TabBar';

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="Bookings" options={{ title: 'Bookings' }} />
      <Tabs.Screen name="Saved" options={{ title: 'Saved' }} />
      <Tabs.Screen name="More" options={{ title: 'More' }} />
    </Tabs>
  );
};

export default _layout;
