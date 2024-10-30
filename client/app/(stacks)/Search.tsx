import { View, Text } from 'react-native';
import React from 'react';
import LabelInputComp from '@/component/LabelInputComp';

export default function Search() {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <LabelInputComp placeholder={'search location'} />
    </View>
  );
}
