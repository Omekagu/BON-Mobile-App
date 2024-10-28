import { View, Text, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import Header from '@/component/Header';
import SearchSection from '@/component/SearchSection';
import PressButton from '@/component/PressButton';
import Suggestions from '@/component/Suggestions';

export default function Home() {
  return (
    <View>
      {/* <StatusBar barStyle="light-content" backgroundColor="#a63932" /> */}
      {/* <Header /> */}
      <ScrollView style={{ paddingHorizontal: 10, height: '100%' }}>
        <SearchSection />
        <PressButton text={'search'} />

        <Suggestions />
      </ScrollView>
    </View>
  );
}
