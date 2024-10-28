import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BoldText13 from '@/component/TextComp/BoldText13';
import TextCaps from '@/component/TextComp/TextCaps';

export default function DescriptionPage() {
  return (
    <SafeAreaView style={{ margin: 20 }}>
      <View style={{ marginBottom: 10 }}>
        <BoldText13 text={'Description'} />
      </View>
      <TextCaps
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium ante ipsum, sed scelerisque enim pretium quis. Ut tempus augue sodales dolor maximus consequat a in mi. Quisque ullamcorper aliquam commodo. In tristique sapien lorem, nec imperdiet ligula imperdiet at. Duis ut pharetra est, at finibus turpis.'
        }
      />
    </SafeAreaView>
  );
}
