import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler
} from 'react-native'
import { useRouter } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LabelInputComp from '@/component/LabelInputComp'
import CustomBotton from '@/component/CustomBotton'
import Toast from 'react-native-toast-message'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    const backAction = () => {
      // Prevent going back to previous screen
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [])

  // ✅ Check if User is Already Logged In
  useEffect(() => {
    const checkAuth = async () => {
      const tokenData = await AsyncStorage.getItem('token')

      if (tokenData) {
        const { token, expiryTime } = JSON.parse(tokenData)

        if (Date.now() < expiryTime) {
          // Token is valid, redirect to Home page
          router.replace('/Home')
          return
        } else {
          // Token expired, remove it
          await AsyncStorage.removeItem('token')
        }
      }
    }

    checkAuth()
  }, [])

  // ✅ Handle Login
  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please fill in all fields',
        visibilityTime: 4000
      })
      return
    }

    const userData = { email: email.trim().toLowerCase(), password }

    try {
      const res = await axios.post('http://10.0.1.14:5001/auth/login', userData)
      if (res.data?.data) {
        const { token, userId } = res.data.data
        console.log('JWT Token:', token)
        console.log('User ID:', userId)
        // ✅ Set Expiry Time (30 minutes from now)
        const expiryTime = Date.now() + 30 * 60 * 1000
        await AsyncStorage.setItem(
          'token',
          JSON.stringify({ token, expiryTime, userId })
        )
        console.log(`User data saved successfully ${userId}`)
        // console.log(token, expiryTime, userId)
        router.replace('/Home') // ✅ Redirect to Home page after login
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Welcome Back!',
          visibilityTime: 4000
        })
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Login failed! Token not received.',
          visibilityTime: 4000
        })
      }
    } catch (error) {
      console.error('Login Error:', error)
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Login failed! Please check your credentials.',
        visibilityTime: 4000
      })
    }
  }

  const FgPassword = () => {
    router.push('registration/ForgotPassword')
  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.formContainer}>
        <View style={styles.loginPrompt}>
          <Text>
            Create an account ?{' '}
            <Text
              style={styles.linkText}
              onPress={() => router.push('/registration/Registration')}
            >
              Register
            </Text>
          </Text>
        </View>

        <LabelInputComp
          label='Email'
          placeholder='Enter your email'
          value={email}
          onChangeText={setEmail}
        />
        <LabelInputComp
          label='Password'
          placeholder='Enter your password'
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={FgPassword}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
        <CustomBotton onPress={handleSubmit} button='Sign In' />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a63932',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007BFF'
  },
  forgot: {
    paddingVertical: 10,
    fontSize: 20,
    textTransform: 'capitalize'
  }
})

export default Login
