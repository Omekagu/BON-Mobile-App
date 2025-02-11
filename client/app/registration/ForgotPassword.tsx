import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import LabelInputComp from '@/component/LabelInputComp';
import CustomBotton from '@/component/CustomBotton';
import Toast from 'react-native-toast-message';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleSendOTP = () => {
    if (!email.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Enter a valid email!' });
      return;
    }

    axios.post('http://10.0.1.35:5001/send-otp', { email: email.trim().toLowerCase() })
      .then(() => {
        setStep(2);
        Toast.show({ type: 'success', text1: 'OTP Sent', text2: 'Check your email!' });
      })
      .catch(() => {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to send OTP' });
      });
  };

  const handleVerifyOTP = () => {
    if (!otp.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Enter OTP!' });
      return;
    }

    axios.post('http://10.0.1.35:5001/verify-otp', { email, otp })
      .then(() => {
        setStep(3);
        Toast.show({ type: 'success', text1: 'OTP Verified', text2: 'Set your new password' });
      })
      .catch(() => {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Invalid OTP' });
      });
  };

  const handleResetPassword = () => {
    if (!newPassword.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Enter a new password!' });
      return;
    }

    axios.post('http://10.0.1.35:5001/reset-password', { email, newPassword })
      .then(() => {
        Toast.show({ type: 'success', text1: 'Success', text2: 'Password updated!' });
        router.push('/Login');
      })
      .catch(() => {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to reset password' });
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        {step === 1 && (
          <>
            <LabelInputComp label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} />
            <CustomBotton onPress={handleSendOTP} button="Send OTP" />
          </>
        )}

        {step === 2 && (
          <>
            <LabelInputComp label="OTP" placeholder="Enter OTP" value={otp} onChangeText={setOtp} />
            <CustomBotton onPress={handleVerifyOTP} button="Verify OTP" />
          </>
        )}

        {step === 3 && (
          <>
            <LabelInputComp label="New Password" placeholder="Enter new password" value={newPassword} onChangeText={setNewPassword} />
            <CustomBotton onPress={handleResetPassword} button="Reset Password" />
          </>
        )}

        <TouchableOpacity onPress={() => router.push('/registration/Login')}>
          <Text style={styles.back}>Back to Login</Text>
        </TouchableOpacity>
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
  back: {
    paddingVertical: 10,
    fontSize: 18,
    color: '#a63932',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;
