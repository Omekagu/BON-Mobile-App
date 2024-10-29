import CustomBotton from '@/component/CustomBotton';
import LabelInputComp from '@/component/LabelInputComp';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, SafeAreaView, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <LinearGradient
        colors={['hsla(14, 65%, 58%, 1)', '#b8b2a2']}
        style={{ height: '100%', paddingHorizontal: 10 }}
      >
        <View style={{ marginTop: 500 }}>
          <LabelInputComp label={'Email'} placeholder={'Email'} />
          <LabelInputComp label={'password'} placeholder={'password'} />
          <CustomBotton button={'login'} onPress={() => router.push('/Home')} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Login;
