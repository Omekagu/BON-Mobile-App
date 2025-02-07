import React from 'react';
import { View } from 'react-native';
import Search from './Search';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import { router } from 'expo-router';

const SearchSection = () => {
  return (
    <View
      style={{
        // borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        marginVertical: 10,
      }}
    >
      <Search
        onPress={() => router.push('/Search')}
        icon={
          <MaterialIcons name="location-searching" size={24} color="black" />
        }
        text={'Lagos, Nigeria'}
      />
      <Search
        onPress={() => router.push('/')}
        icon={<FontAwesome6 name="calendar-alt" size={24} color="black" />}
        text={'Sat, 26 Oct - Sun, 27 Oct'}
      />
      <Search
        onPress={() => router.push('/')}
        icon={<Octicons name="person" size={24} color="black" />}
        text={'1 room · 2 adults · No children'}
      />
    </View>
  );
};

export default SearchSection;
