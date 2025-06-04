import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  Image,
  TextInput,
  Pressable
} from 'react-native'
import { useRouter } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { Ionicons } from '@expo/vector-icons'
import { Button } from 'react-native-paper'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secure, setSecure] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    )
    return () => backHandler.remove()
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      const tokenData = await AsyncStorage.getItem('token')
      if (tokenData) {
        const { token, expiryTime } = JSON.parse(tokenData)
        if (Date.now() < expiryTime) router.replace('/Home')
        else await AsyncStorage.removeItem('token')
      }
    }
    checkAuth()
  }, [])

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields'
      })
      return
    }
    console.log('Submitting login form with:', { email, password })
    try {
      const res = await axios.post('http://10.0.1.27:5001/auth/login', {
        email: email.trim().toLowerCase(),
        password
      })

      if (res.data?.data) {
        const { token, userId } = res.data.data
        const expiryTime = Date.now() + 30 * 60 * 1000
        await AsyncStorage.setItem(
          'token',
          JSON.stringify({ token, expiryTime, userId })
        )
        router.replace('/Home')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: 'Invalid response from server.'
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: 'Please check your credentials.'
      })
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600'
        }} // Replace with the actual image path
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={styles.loginTitle}>WELCOME TO BON</Text>
          <Button
            mode='contained'
            onPress={() => router.push('registration/Registration')}
            style={{
              backgroundColor: '#a63932',
              marginLeft: 'auto',
              borderRadius: 10
            }}
          >
            Register
          </Button>
        </View>

        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600'
            }} // Replace with user avatar if available
            style={styles.avatar}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.passwordBox}>
              <TextInput
                placeholder='Enter Email'
                placeholderTextColor={'#fff'}
                value={email}
                onChangeText={setEmail}
                style={styles.inputField}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordBox}>
                <TextInput
                  placeholder='Enter password'
                  placeholderTextColor={'#fff'}
                  secureTextEntry={secure}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.inputField}
                />
                <Pressable onPress={() => setSecure(!secure)}>
                  <Text style={styles.viewText}>
                    {secure ? 'View' : 'Hide'}
                  </Text>
                </Pressable>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('registration/ForgotPassword')}
            >
              <Text style={styles.forgotLink}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  backgroundImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover'
  },
  overlay: {
    paddingHorizontal: 20,
    marginTop: -80
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20
  },
  profileCard: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 16
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 10
  },
  nameText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center'
  },
  emailText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 15
  },
  inputLabel: {
    color: '#aaa',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 2
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b5b5b3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  inputField: {
    height: 50,
    flex: 1,
    color: '#fff'
  },
  viewText: {
    color: '#a63932',
    fontWeight: '600'
  },
  button: {
    backgroundColor: '#a63932',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  forgotLink: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '500',
    marginTop: 15
  }
})

export default Login
