import { View } from 'react-native';
import React from 'react';
import LabelInputComp from '@/component/LabelInputComp';
import CustomBotton from '@/component/CustomBotton';
import { router } from 'expo-router';

export default function EditContact() {
  return (
    <View style={{ margin: 10, flexDirection: 'column' }}>
      <LabelInputComp label={'Edit Contact'} placeholder={' '} />

      <View style={{ top: 600 }}>
        <CustomBotton button={'Save'} onPress={() => router.push('/Profile')} />
      </View>
    </View>
  );
}
