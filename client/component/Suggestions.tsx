import React from 'react';
import { Image, Platform, ScrollView, Text, View } from 'react-native';
import SuggestionBox from './SuggestionBox';
import BoldText13 from './TextComp/BoldText13';

const Suggestions = () => {
  return (
    <View style={{ marginVertical: 10 }}>
      <BoldText13 text={'suggestion based on location'} />
      <ScrollView
        horizontal
        style={{ marginHorizontal: -10, paddingVertical: 10, paddingLeft: 10 }}
      >
        <SuggestionBox
          image={'https://i.postimg.cc/7L0vZwcC/BON-HOTEL-TRANSTELL-ROOMS1.jpg'}
          name={'Bon Lekki Residence'}
          price={'100,000,00'}
          meter={'309'}
        />
        <SuggestionBox
          image={'https://i.postimg.cc/9MHhdrTt/BON-HOTEL-TRANSTELL-ROOMS7.jpg'}
          name={'Bon Ikeja Residence'}
          price={'67'}
          meter={'200,000,00'}
        />
        <SuggestionBox
          image={
            'https://i.postimg.cc/BQXVvJPq/BON-HOTEL-TRANSTELL-ROOMS11.jpg'
          }
          name={'Bon Festac Residence'}
          price={'300'}
          meter={'900,000,00'}
        />
        <SuggestionBox
          image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
          name={'Bon Gbagada Residence'}
          price={'2,000,000.00'}
          meter={'1,209'}
        />
      </ScrollView>
    </View>
  );
};

export default Suggestions;
