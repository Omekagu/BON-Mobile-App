import { View, Text } from 'react-native';
import React from 'react';
import LabelInputComp from '@/component/LabelInputComp';

export default function ChooseNo() {
  return (
    <View style={{ margin: 10 }}>
      <LabelInputComp
        label={'How many rooms '}
        placeholder={'How many rooms do you want'}
      />
      <LabelInputComp
        label={'How many Adults '}
        placeholder={'How many Adults'}
      />
      <LabelInputComp
        label={'How many Children '}
        placeholder={'How many Children'}
      />
    </View>
  );
}
