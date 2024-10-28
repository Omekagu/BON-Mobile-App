import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import SelectRoom from '@/component/SelectRoom';
import { SafeAreaView } from 'react-native';

export default function BookingInfo() {
  return (
    <SafeAreaView>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <SelectRoom
          suite={'Deluxe room'}
          number={2}
          noOfNights={2}
          size={45}
          units={9}
          price={90}
          image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
        />
        <SelectRoom
          suite={'classic room'}
          number={3}
          noOfNights={1}
          size={50}
          units={2}
          price={190}
          image={
            'https://i.postimg.cc/BQXVvJPq/BON-HOTEL-TRANSTELL-ROOMS11.jpg'
          }
        />
        <SelectRoom
          suite={'standard room'}
          number={1}
          noOfNights={4}
          size={40}
          units={0}
          price={50}
          image={'https://i.postimg.cc/9MHhdrTt/BON-HOTEL-TRANSTELL-ROOMS7.jpg'}
        />
        <SelectRoom
          suite={'mini flat'}
          number={1}
          noOfNights={10}
          size={105}
          units={20}
          price={300}
          image={'https://i.postimg.cc/7L0vZwcC/BON-HOTEL-TRANSTELL-ROOMS1.jpg'}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
