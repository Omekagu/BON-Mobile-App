import CustomBotton from '@/component/CustomBotton';
import LabelInputComp from '@/component/LabelInputComp';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';


const index = () => {
const [firstName, setFirstName]= useState("")
const [lastName, setLastName]= useState("")
const [email, setEmail]= useState("")
const [password, setPassword]= useState("")
const [phoneNumber, setPhoneNumber]= useState("")



const handleSubmit =()=>{
  const userData = {
    firstName,
    lastName,
    email, 
    password,
    phoneNumber,
  }
  console.log(firstName,lastName,email,password);
  axios.post("http://10.0.1.21:5001/register", userData)
        .then((res)=>console.log(res.data))
        .catch(e => console.log(e))

  alert('Registration Successful')
router.push('/Home')
}
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
          <LabelInputComp label={'First Name'} placeholder={'first name'} Value={firstName}
        onchangeText={setFirstName} />
          <LabelInputComp label={'Last Name'} placeholder={'surname'} Value={lastName}
        onchangeText={setLastName}/>
          <LabelInputComp label={'Email'} placeholder={'Email'} Value={email}
        onchangeText={setEmail} />
          <LabelInputComp label={'Phone Number'} placeholder={'Phone Number'} Value={phoneNumber}
        onchangeText={setPhoneNumber} />
          <LabelInputComp label={'password'} placeholder={'password'} Value={password}
        onchangeText={setPassword} />
          {/* <LabelInputComp
            label={'confirm password'}
            placeholder={'confirm password'} value={text}
            onChangeText={setText}
          /> */}
          <CustomBotton
            onPress={handleSubmit}
            button={'sign up'}
          />
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default index;
