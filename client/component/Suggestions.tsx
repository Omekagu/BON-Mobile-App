import React from 'react';
import { Image, Platform, ScrollView, Text, View } from 'react-native';
import SuggestionBox from './SuggestionBox';

const Suggestions = () => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: '400' }}> Best Suggestions</Text>
      <ScrollView
        horizontal
        style={{ marginHorizontal: -10, paddingVertical: 10, paddingLeft: 10 }}
      >
        <SuggestionBox
          name={'Bon Lekki Residence'}
          price={'100'}
          meter={'309'}
        />
        <SuggestionBox
          name={'Bon Ikeja Residence'}
          price={'67'}
          meter={'200'}
        />
        <SuggestionBox
          name={'Bon Festac Residence'}
          price={'300'}
          meter={'900'}
        />
        <SuggestionBox
          name={'Bon Gbagada Residence'}
          price={'2mil'}
          meter={'1,209'}
        />
      </ScrollView>
    </View>
  );
};

export default Suggestions;
