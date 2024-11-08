import { View, Text } from 'react-native';
import React from 'react';
import LabelInputComp from '@/component/LabelInputComp';
import CustomBotton from '@/component/CustomBotton';
import { router } from 'expo-router';

export default function EditPhone() {
  return (
    <View style={{ margin: 10, flexDirection: 'column' }}>
      <LabelInputComp
        label={'Edit Phone Number'}
        placeholder={'080**********'}
      />

      <View style={{ top: 600 }}>
        <CustomBotton button={'Save'} onPress={() => router.push('/Profile')} />
      </View>
    </View>
  );
}
