import { View, Text } from 'react-native';
import React from 'react';
import LabelInputComp from '@/component/LabelInputComp';
import CustomBotton from '@/component/CustomBotton';
import { router } from 'expo-router';

export default function EditGender() {
  return (
    <View style={{ margin: 10, flexDirection: 'column' }}>
      <LabelInputComp label={'Edit Gender'} placeholder={'Gender'} />

      <View style={{ top: 600 }}>
        <CustomBotton button={'Save'} onPress={() => router.push('/Profile')} />
      </View>
    </View>
  );
}
