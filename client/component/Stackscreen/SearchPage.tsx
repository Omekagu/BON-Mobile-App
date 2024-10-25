import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import SearchBox from '@/component/SearchBox';
import SearchHeader from '@/component/SearchHeader';

export default function SearchPage() {
  return (
    <SafeAreaView>
      <View>
        <SearchHeader
          location={'lagos, Nigeria'}
          date={'Sat, 26 Oct - Sun, 27 Oct'}
        />
      </View>
      <ScrollView style={{ margin: 10 }}>
        <SearchBox />
        <SearchBox />
        <SearchBox />
        <SearchBox />
        <SearchBox />
      </ScrollView>
    </SafeAreaView>
  );
}
