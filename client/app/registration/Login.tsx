import CustomBotton from '@/component/CustomBotton';
import LabelInputComp from '@/component/LabelInputComp';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const router = useRouter();

  const handleSubmit =()=>{
    console.log(email, password)
   router.push('/Home')
  }
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      style={{ height: '100%' }}
    >
      <LinearGradient
        colors={['hsla(14, 65%, 58%, 1)', '#b8b2a2']}
        style={{ height: '100%', paddingHorizontal: 10 }}
      >
        <View style={{ marginTop: 500 }}>
          <LabelInputComp label={'Email'} placeholder={'Email'}  Value={email}
        onchangeText={setEmail}  />
          <LabelInputComp label={'password'} placeholder={'password'}  Value={password}
        onchangeText={setPassword} />
          <CustomBotton button={'login'} onPress={handleSubmit} />
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default Login;
