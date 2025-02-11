import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LabelInputComp from '@/component/LabelInputComp';
import CustomBotton from '@/component/CustomBotton';
import Toast from 'react-native-toast-message'; // Import Toast

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please fill in all fields',
        visibilityTime: 4000,
      });
      return;
    }

    const userData = { email: email.trim().toLowerCase(), password };

    axios.post('http://10.0.1.35:5001/login', userData)
      .then(async (res) => {
        if (res.data?.data) {
          const token = res.data.data;
          console.log('JWT Token:', token);

          await AsyncStorage.setItem("token", JSON.stringify(token));
          router.push('/Home');
          
          // Show success toast
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Welcome Back!',
            visibilityTime: 4000,
          });
        } else {
          // Show error toast for failed login
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'Login failed! Token not received.',
            visibilityTime: 4000,
          });
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
        // Show error toast for any other errors
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Login failed! Please check your credentials.',
          visibilityTime: 4000,
        });
      });
  };

  const FgPassword = ()=>{
    router.push("registration/ForgotPassword")
  }

  return (
    <KeyboardAwareScrollView 
      resetScrollToCoords={{ x: 0, y: 0 }} 
      scrollEnabled={false} 
      contentContainerStyle={styles.container}
    >
      <View style={styles.formContainer}>
        <LabelInputComp label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} />
        <LabelInputComp label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword} />

        <TouchableOpacity onPress={FgPassword}>
        <Text style={styles.forgot}>forgot password?</Text>
        </TouchableOpacity>
        <CustomBotton onPress={handleSubmit} button="Sign In" />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a63932',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  forgot:{
    paddingVertical:10,
    fontSize:20,
    textTransform:'capitalize',
  }
});

export default Login;
