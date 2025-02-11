import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import LabelInputComp from '@/component/LabelInputComp';
import TextGreen from '@/component/TextComp/TextGreen';
import CustomBotton from '@/component/CustomBotton';
import Toast from 'react-native-toast-message';

const Index = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referal, setReferal] = useState('');
  const router = useRouter();

  const validatePassword = (password) => {
    return /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{11}$/.test(phoneNumber);
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please fill in all fields' });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter a valid email address' });
      return;
    }
    if (!validatePassword(password)) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Password must contain an uppercase letter, a number, and a special character' });
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Phone number must be exactly 11 digits' });
      return;
    }
  
    const userData = { firstName, lastName, email: email.toLowerCase(), password, phoneNumber };
  
    axios.post('http://10.0.1.35:5001/register', userData)
      .then(() => {
        Toast.show({ type: 'success', text1: 'Success', text2: 'Registration successful' });
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setReferal('');
        router.push('/registration/Login');
      })
      .catch(() => {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Registration failed! Please try again.' });
      });
  };
  

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={() => router.back()} />
        <Button title="Login instead" onPress={() => router.push('/registration/Login')} />
      </View>

      <Text style={styles.infoText}>
        We just need a bit of information. Please enter your details to get started.
      </Text>

      <View style={styles.formContainer}>
        <LabelInputComp label="First Name" placeholder="First name" value={firstName} onChangeText={setFirstName} />
        <LabelInputComp label="Last Name" placeholder="Surname" value={lastName} onChangeText={setLastName} />
        <LabelInputComp label="Email" placeholder="Email" value={email} onChangeText={setEmail} />
        <LabelInputComp label="Phone Number" placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
        <LabelInputComp label="Password" placeholder="Password" value={password} onChangeText={setPassword} />
        <LabelInputComp label="Referral Code" placeholder="Enter referral code" value={referal} onChangeText={setReferal} />

        <Text style={styles.termsText}>
          By signing up, you agree to BON'S <TextGreen text="Terms of Use" /> and <TextGreen text="Privacy Policy" />.
        </Text>

        <CustomBotton onPress={handleSubmit} button="Sign Up" />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a63932',
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginTop:25,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '500',
    lineHeight: 25,
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
  termsText: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
  },
});

export default Index;
