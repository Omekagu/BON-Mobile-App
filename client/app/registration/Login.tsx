import CustomBotton from '@/component/CustomBotton';
import LabelInputComp from '@/component/LabelInputComp';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
  const router = useRouter();
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      // contentContainerStyle={styles.container}
      scrollEnabled={false}
      style={{ height: '100%' }}
    >
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
    </KeyboardAwareScrollView>
  );
};

export default Login;
