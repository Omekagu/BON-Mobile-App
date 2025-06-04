import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
  FlatList
} from 'react-native'
import { useRouter } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Device from 'expo-device'
import * as Localization from 'expo-localization'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { useAuth } from '../hooks/useAuth'
import BottomSheet from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// Sample country data
const COUNTRY_CODES = [
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' }
  // ...add more as needed
]

const Registration: React.FC = () => {
  // All hooks must be at the top, before any conditional returns!
  const [firstname, setFirstname] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [countryCode, setCountryCode] = useState<string>('+234')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [deviceType, setDeviceType] = useState<string>('')
  const [userCountry, setUserCountry] = useState<string>('')
  const [referralCode, setReferralCode] = useState<string>('')
  const [secure, setSecure] = useState<boolean>(true)
  const [isSheetOpen, setSheetOpen] = useState<boolean>(false)

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['50%'], [])

  const router = useRouter()

  const { isAuthenticated, loading } = useAuth()

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

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/Home') // Redirect logged-in users
    }
  }, [isAuthenticated, loading, router])

  const validateEmail = (email: string): boolean =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

  const validatePhoneNumber = (phoneNumber: string): boolean =>
    /^\d{7,15}$/.test(phoneNumber) // international phone

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
        text2: 'Phone number is invalid'
      })
      return
    }

    // Nigeria phone fix: strip leading zero for +234
    let normalizedPhone = phoneNumber
    if (countryCode === '+234' && phoneNumber.startsWith('0')) {
      normalizedPhone = phoneNumber.substring(1)
    }

    const userData = {
      firstname,
      surname,
      referralCode,
      email: email.toLowerCase(),
      password,
      phoneNumber: countryCode + normalizedPhone,
      profileImage,
      deviceType,
      userCountry
    }

    try {
      await axios.post('http://10.0.1.27:5001/auth/register', userData)
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Registration complete'
      })
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

  const openSheet = useCallback(() => {
    setSheetOpen(true)
    bottomSheetRef.current?.expand()
  }, [])

  const closeSheet = useCallback(() => {
    setSheetOpen(false)
    bottomSheetRef.current?.close()
  }, [])

  const handleCountrySelect = (code: string) => {
    setCountryCode(code)
    closeSheet()
  }

  // Move all hooks above this line!

  if (loading) return <Text>Loading...</Text>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.bgContainer}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600'
            }}
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
                    placeholderTextColor={'#fff'}
                    placeholder='Enter your first name'
                    value={firstname}
                    onChangeText={setFirstname}
                    style={styles.inputField}
                  />
                </View>
                <Text style={styles.inputLabel}>Surname</Text>
                <View style={styles.passwordBox}>
                  <TextInput
                    placeholderTextColor={'#fff'}
                    placeholder='Enter your surname'
                    value={surname}
                    onChangeText={setSurname}
                    style={styles.inputField}
                  />
                </View>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.passwordBox}>
                  <TextInput
                    placeholderTextColor={'#fff'}
                    placeholder='Enter email'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.inputField}
                    autoCapitalize='none'
                    keyboardType='email-address'
                  />
                </View>

                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.phoneBox}>
                  <Pressable style={styles.countryCode} onPress={openSheet}>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>
                      {countryCode}
                    </Text>
                  </Pressable>
                  <TextInput
                    placeholderTextColor={'#fff'}
                    placeholder='Enter phone number'
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={[styles.inputField, { marginLeft: 8 }]}
                    keyboardType='phone-pad'
                  />
                </View>

                <Text style={styles.inputLabel}>Referral Code</Text>
                <View style={styles.passwordBox}>
                  <TextInput
                    placeholderTextColor={'#fff'}
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
                      placeholderTextColor={'#fff'}
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
                <TouchableOpacity
                  onPress={() => router.push('/registration/Login')}
                >
                  <Text style={styles.forgotLink}>
                    Already have an account? <Text>Login</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* BottomSheet is outside ScrollView! */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={closeSheet}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
            Select your country
          </Text>
          <FlatList
            data={COUNTRY_CODES}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => handleCountrySelect(item.code)}
              >
                <Text style={{ fontSize: 22, marginRight: 10 }}>
                  {item.flag}
                </Text>
                <Text style={{ fontWeight: 'bold', marginRight: 8 }}>
                  {item.code}
                </Text>
                <Text>{item.name}</Text>
              </Pressable>
            )}
          />
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  bgContainer: {
    flex: 1,
    minHeight: 700
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 220,
    zIndex: -1
    // resizeMode: 'cover'
  },
  overlay: {
    paddingHorizontal: 20,
    marginTop: 60
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
    borderRadius: 16,
    marginTop: 15
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
  phoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b5b5b3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  countryCode: {
    // backgroundColor: '#a63932',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8
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
    marginTop: 5
  }
})

export default Registration
