import CustomBotton from '@/component/CustomBotton';
import LabelInputComp from '@/component/LabelInputComp';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const router = useRouter();

  const handleSubmit =()=>{
    if (email.trim() === '' || password.trim() === '') {
      alert('Please fill in missing fields'); // Show error if either input is empty
    } else {
      alert('Input is valid'); // Show success message if inputs are filled
      const userData = { email: email.trim().toLowerCase(), password }; // Ensure you have the user data to send
    
      axios.post('http://10.0.1.35:5001/login', userData)
      .then((res) => {
        if (res.data && res.data.data) { // Check if response contains the token
          const token = res.data.data; // Extract the JWT token from the `data` field
          console.log('JWT Token:', token);
    
          // Store only the token string in AsyncStorage
          // AsyncStorage.setItem("token", JSON.stringify(token));
    
          // Redirect user
          router.push('/Home');
          alert('Welcome Back!');
        } else {
          alert('Login failed! Token not received.');
        }
      })
      .catch((e) => {
        console.error('Login Error:', e);
        alert('Login failed! Please check your credentials.');
      });
    
      console.log(email, password); // Debugging: logging the email and password
    }
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
