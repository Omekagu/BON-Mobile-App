import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import SelectRoom from '@/component/SelectRoom';
import SearchBox from '@/component/SearchBox';
import { SafeAreaView } from 'react-native';

export default function BookingInfo() {
  return (
    <SafeAreaView>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <SelectRoom />
        <SearchBox />
        <SearchBox />
        <SearchBox />
        <SearchBox />
        <SearchBox />
        <SearchBox />
        <SearchBox />
      </ScrollView>
    </SafeAreaView>
  );
}
