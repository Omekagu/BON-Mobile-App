import CustomBotton from '@/component/CustomBotton';
import LabelInputComp from '@/component/LabelInputComp';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function EditDob() {
  return (
    <View style={{ margin: 10, flexDirection: 'column' }}>
      <LabelInputComp label={'Edit Date Of Birth'} placeholder={'dd-mm-yy'} />

      <View style={{ top: 600 }}>
        <CustomBotton button={'Save'} onPress={() => router.push('/Profile')} />
      </View>
    </View>
  );
}
