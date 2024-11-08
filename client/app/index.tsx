import CustomBotton from '@/component/CustomBotton';
import LabelInputComp from '@/component/LabelInputComp';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const index = () => {
  const router = useRouter();
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <LinearGradient
        colors={['hsla(14, 65%, 58%, 1)', '#b8b2a2']}
        style={{
          paddingHorizontal: 20,
          height: '100%',
        }}
      >
        <View style={{ marginTop: 150 }}>
          <Button
            title="Login"
            onPress={() => router.push('/registration/Login')}
          />
          <LabelInputComp label={'first name'} placeholder={'first name'} />
          <LabelInputComp label={'middle name'} placeholder={'middlename'} />
          <LabelInputComp label={'surname'} placeholder={'surname'} />
          <LabelInputComp label={'Email'} placeholder={'Email'} />
          <LabelInputComp label={'password'} placeholder={'password'} />
          <LabelInputComp
            label={'confirm password'}
            placeholder={'confirm password'}
          />
          <CustomBotton
            onPress={() => router.push('/Home')}
            button={'sign up'}
          />
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default index;
