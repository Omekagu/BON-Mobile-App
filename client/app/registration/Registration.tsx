import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Button,
  Image,
  TextInput
} from 'react-native'
import { useRouter } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Device from 'expo-device'
import * as Localization from 'expo-localization'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { useAuth } from '../hooks/useAuth'

const Registration: React.FC = () => {
  const [firstname, setFirstname] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [deviceType, setDeviceType] = useState<string>('')
  const [userCountry, setUserCountry] = useState<string>('')
  const [referralCode, setReferralCode] = useState<string>('')
  const [secure, setSecure] = useState<boolean>(true)

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
    if (!firstname || !surname || !email || !password || !phoneNumber) {
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
      firstname,
      surname,
      referralCode,
      email: email.toLowerCase(),
      password,
      phoneNumber,
      profileImage,
      deviceType,
      userCountry
    }

    console.log(firstname, surname, email, password, phoneNumber, referralCode)

    try {
      await axios.post('http:/10.0.1.27:5001/auth/register', userData)
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
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={styles.loginTitle}>Create an account. </Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Firstname</Text>
            <View style={styles.passwordBox}>
              <TextInput
                placeholder='Enter your first name'
                value={firstname}
                onChangeText={setFirstname}
                style={styles.inputField}
              />
            </View>
            <Text style={styles.inputLabel}>Surname</Text>
            <View style={styles.passwordBox}>
              <TextInput
                placeholder='Enter your surname'
                value={surname}
                onChangeText={setSurname}
                style={styles.inputField}
              />
            </View>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.passwordBox}>
              <TextInput
                placeholder='Enter email'
                value={email}
                onChangeText={setEmail}
                style={styles.inputField}
              />
            </View>

            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.passwordBox}>
              <TextInput
                placeholder='Enter phone number'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.inputField}
              />
            </View>
            <Text style={styles.inputLabel}>Referral Code</Text>
            <View style={styles.passwordBox}>
              <TextInput
                placeholder='Enter referral code'
                value={referralCode}
                onChangeText={setReferralCode}
                style={styles.inputField}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordBox}>
                <TextInput
                  placeholder='Enter password'
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
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('registration/Login')}>
              <Text style={styles.forgotLink}>
                Already have an account? Login
              </Text>
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
    backgroundColor: '#000'
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover'
  },
  overlay: {
    paddingHorizontal: 20,
    marginTop: -180
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20
  },
  profileCard: {
    backgroundColor: '#6b6963',
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
    backgroundColor: '#1E1E1E',
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
    color: '#fff',
    fontWeight: '500',
    marginTop: 5
  }
})

export default Registration
