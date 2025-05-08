import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Device from 'expo-device'
import * as Localization from 'expo-localization'
import axios from 'axios'
import LabelInputComp from '@/component/LabelInputComp'
import CustomBotton from '@/component/CustomBotton'
import Toast from 'react-native-toast-message'
import { useAuth } from '../hooks/useAuth'

const Registration: React.FC = () => {
  const [firstName, setFirstname] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [deviceType, setDeviceType] = useState<string>('')
  const [userCountry, setUserCountry] = useState<string>('')
  const [referralCode, setReferralCode] = useState<string>('')

  const router = useRouter()

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      setDeviceType(Device.modelName || 'Unknown Device')

      try {
        const { data } = await axios.get('https://ipapi.co/json/')
        setUserCountry(
          data.country_name || Localization.region || 'Unknown Country'
        )
      } catch (error) {
        console.log('Could not fetch country via IP, using device setting.')
        setUserCountry(Localization.region || 'Unknown Country')
      }
    }

    fetchDeviceInfo()
  }, [])

  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/Home') // Redirect logged-in users
    }
  }, [isAuthenticated, loading])

  if (loading) return <Text>Loading...</Text>

  const validateEmail = (email: string): boolean =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

  const validatePhoneNumber = (phoneNumber: string): boolean =>
    /^\d{11}$/.test(phoneNumber)

  const handleSubmit = async () => {
    if (!firstName || !surname || !email || !password || !phoneNumber) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required'
      })
      return
    }
    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid email format'
      })
      return
    }
    if (!validatePhoneNumber(phoneNumber)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Phone number must be exactly 11 digits'
      })
      return
    }

    const userData = {
      firstName,
      surname,
      referralCode,
      email: email.toLowerCase(),
      password,
      phoneNumber,
      profileImage,
      deviceType,
      userCountry
    }

    console.log(firstName, surname, email, password, phoneNumber, referralCode)

    try {
      await axios.post('http://10.0.1.13:5001/auth/register', userData)
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Registration complete'
      })
      // setUsername('')
      setFirstname('')
      setSurname('')
      setProfileImage(null)
      setEmail('')
      setPassword('')
      setPhoneNumber('')
      setReferralCode('')
      router.push('/registration/Login')
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Registration failed, try again.'
      })
    }
  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      // scrollEnabled={false}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView>
        <Text style={styles.infoText}>Create your account</Text>

        <View style={styles.formContainer}>
          <LabelInputComp
            label='Firstname'
            placeholder='Enter Firstname'
            value={firstName}
            onChangeText={setFirstname}
          />
          <LabelInputComp
            label='Surname'
            placeholder='Enter Surname'
            value={surname}
            onChangeText={setSurname}
          />
          <LabelInputComp
            label='Email'
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
          <LabelInputComp
            label='Phone Number'
            placeholder='Phone Number'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <LabelInputComp
            label='Password'
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
          />
          <LabelInputComp
            label='Referral Code'
            placeholder='Referral Code'
            value={referralCode}
            onChangeText={setReferralCode}
          />

          <Text style={styles.deviceInfo}>
            📱 Device: {deviceType || 'Detecting...'}
          </Text>

          <Text style={styles.termsText}>
            By signing up, you agree to BON'S{' '}
            <Text
              style={styles.linkText}
              onPress={() => router.push('/registration/Login')}
            >
              Terms of Use
            </Text>{' '}
            and{' '}
            <Text
              style={styles.linkText}
              onPress={() => router.push('/registration/Login')}
            >
              Privacy Policy
            </Text>
            .
          </Text>

          <View style={styles.loginPrompt}>
            <Text>
              Already have an account?{' '}
              <Text
                style={styles.linkText}
                onPress={() => router.push('/registration/Login')}
              >
                Login
              </Text>
            </Text>
          </View>

          <CustomBotton onPress={handleSubmit} button='Sign Up' />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a63932',
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingTop: 30
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3
  },
  imagePicker: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  imageText: {
    color: '#666'
  },
  deviceInfo: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333'
  },
  termsText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10
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
  }
})

export default Registration
