import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/component/TabBar';

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', headerShown: false }}
      />
      <Tabs.Screen
        name="Bookings"
        options={{ title: 'Bookings', headerShown: false }}
      />
      <Tabs.Screen
        name="Saved"
        options={{ title: 'Saved', headerShown: false }}
      />
      <Tabs.Screen
        name="SearchPageInfo"
        options={{ title: 'More', headerShown: false }}
      />
    </Tabs>
  );
};

export default _layout;
