import { View } from 'react-native';
import React, { useState } from 'react';
import LabelInputComp from '@/component/LabelInputComp';
import CustomBotton from '@/component/CustomBotton';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditName() {
  const [name, setName] = useState()
  return (
    <SafeAreaView style={{ margin: 10, flexDirection: 'column' }}>
      <LabelInputComp Value={name} onchangeText={setName} label={'Edit name'} placeholder={'Olivia Freya Zenya'} />

      <View style={{ top: 600 }}>
        <CustomBotton button={'Save'} onPress={() => router.push('/Profile')} />
      </View>
    </SafeAreaView>
  );
}
