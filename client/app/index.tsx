import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import Header from '@/component/Header';
import SearchSection from '@/component/SearchSection';
import PressButton from '@/component/PressButton';
import Suggestions from '@/component/Suggestions';

const index = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#a63932" />
      <Header />
      <ScrollView style={{ paddingHorizontal: 10, height: '100%' }}>
        <SearchSection />
        <PressButton text={'search'} />

        <Suggestions />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
