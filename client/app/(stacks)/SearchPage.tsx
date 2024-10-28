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
        <SearchBox
          hotelname={'Bon Lekki residence'}
          image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
          rate={'good'}
          rating={5}
          review={2}
          landmark={'beach sideasate'}
          distantFromLandmark={'230km away'}
          noBed={1}
          price={100}
        />
        <SearchBox
          hotelname={'Bon Ikeja residence'}
          image={'https://i.postimg.cc/9MHhdrTt/BON-HOTEL-TRANSTELL-ROOMS7.jpg'}
          rate={'very good'}
          rating={8}
          review={5}
          landmark={'maleek estate'}
          distantFromLandmark={'1,030km away'}
          noBed={2}
          price={300}
        />
        <SearchBox
          hotelname={'Bon Asokoro residence'}
          image={'https://i.postimg.cc/7L0vZwcC/BON-HOTEL-TRANSTELL-ROOMS1.jpg'}
          rate={'Excellent'}
          rating={10}
          review={10}
          landmark={'aso villa manor'}
          distantFromLandmark={'230km away'}
          noBed={1}
          price={900}
        />
        <SearchBox
          hotelname={'Bon kubwa residence'}
          image={
            'https://i.postimg.cc/BQXVvJPq/BON-HOTEL-TRANSTELL-ROOMS11.jpg'
          }
          rate={'good'}
          rating={5}
          review={2}
          landmark={'sinete roundabout'}
          distantFromLandmark={'30km away'}
          noBed={1}
          price={90}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
