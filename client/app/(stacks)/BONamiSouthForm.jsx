import {
  View,
  Text,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'
import React, { useState } from 'react'
import LabelInputComp from '../../component/LabelInputComp'
import CustomBotton from '../../component/CustomBotton'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function BONamiSouthForm () {
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [upLoading, setUploading] = useState(false)
  const [imageUri, setImageUri] = useState(null)

  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  const router = useRouter()

  const CLOUDINARY_UPLOAD_URL =
    'https://api.cloudinary.com/v1_1/da26wgev2/image/upload'
  const UPLOAD_PRESET = 'chataap'

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Please allow access to the media library.'
        )
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5
      })

      if (!result.canceled) {
        setUploading(true)
        const uri = result.assets[0].uri

        const fileName = uri.split('/').pop()
        const match = /\.(\w+)$/.exec(fileName)
        const fileType = match ? `image/${match[1]}` : `image`

        const formData = new FormData()
        formData.append('file', {
          uri,
          name: fileName,
          type: fileType
        })
        formData.append('upload_preset', UPLOAD_PRESET)

        const uploadResponse = await axios.post(
          CLOUDINARY_UPLOAD_URL,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        const cloudUrl = uploadResponse.data.secure_url
        setImageUri(cloudUrl) // <-- This is the one that must be used in the payload
        console.log('Image uploaded successfully:', cloudUrl)
      }
    } catch (error) {
      console.error('Image picking error:', error)
      Alert.alert('Error', 'An error occurred while picking the image.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = () => {
    if (!country || !address || !province || !city || !imageUri) {
      Alert.alert('Error', 'Please fill in all fields before proceeding.')

      if (!imageUri.startsWith('https://')) {
        Alert.alert('Error', 'Image not uploaded. Please try again.')
        return
      }
      if (!imageUri) {
        Alert.alert('Error', 'Please upload your ID.')
        return
      }
      if (imageUri.length < 10) {
        Alert.alert('Error', 'Image not uploaded. Please try again.')
        return
      }
      return
    }
    setShowPaymentModal(true)
  }

  const handlePaymentComplete = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please enter all card details.')
      return
    }

    if (cardNumber.length < 16) {
      Alert.alert('Error', 'Card number must be 16 digits.')
      return
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      Alert.alert('Error', 'Expiry date format should be MM/YY.')
      return
    }

    if (cvv.length < 3) {
      Alert.alert('Error', 'CVV must be 3 digits.')
      return
    }

    try {
      setLoading(true)

      const tokenData = await AsyncStorage.getItem('token')
      const { userId, fullName } = JSON.parse(tokenData)

      const payload = {
        userId,
        country,
        address,
        province,
        city,
        Id: imageUri
      }
      console.log('Payload:', payload)

      const response = await axios.post(
        'http://10.0.1.26:5001/hotel/bonami-card',
        payload
      )

      if (response.data.success) {
        setLoading(false)
        setShowPaymentModal(false)

        const { cardNumber, expires } = response.data.card

        router.push({
          pathname: '/BONamiCard',
          params: {
            cardNumber,
            name: fullName || 'BONami User',
            expires
          }
        })
      } else {
        throw new Error('Failed to create BONami card')
      }
    } catch (err) {
      console.error(err)
      Alert.alert(
        'Error',
        'Failed to complete payment or generate BONami card.'
      )
      setLoading(false)
    }
  }

  const handleExpiryInput = text => {
    let formatted = text.replace(/[^0-9]/g, '')
    if (formatted.length > 2) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`
    }
    setExpiryDate(formatted)
  }

  return (
    <SafeAreaView style={{ flex: 1, margin: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        BONami South Form
      </Text>

      <LabelInputComp
        label='Country'
        placeholder='Enter your country'
        value={country}
        onChangeText={setCountry}
      />
      <LabelInputComp
        label='Address'
        placeholder='Enter your address'
        value={address}
        onChangeText={setAddress}
      />
      <LabelInputComp
        label='Province'
        placeholder='Enter your province'
        value={province}
        onChangeText={setProvince}
      />
      <LabelInputComp
        label='City'
        placeholder='Enter your city'
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity
        onPress={pickImage}
        style={{ alignSelf: 'center', marginVertical: 15 }}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : (
          <Text style={{ fontSize: 16, color: '#a63932' }}>Upload ID</Text>
        )}
        {upLoading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center'
            }}
          >
            <ActivityIndicator size='large' color='#a63932' />
          </View>
        )}
      </TouchableOpacity>

      <CustomBotton button='Submit' onPress={handleSubmit} />

      <Modal visible={showPaymentModal} transparent animationType='slide'>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: '85%',
              alignItems: 'center'
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}
            >
              Enter Card Details
            </Text>

            <TextInput
              style={inputStyle}
              placeholder='Card Number'
              keyboardType='numeric'
              maxLength={16}
              value={cardNumber}
              onChangeText={setCardNumber}
            />
            <TextInput
              style={inputStyle}
              placeholder='Expiry Date (MM/YY)'
              keyboardType='numeric'
              maxLength={5}
              value={expiryDate}
              onChangeText={handleExpiryInput}
            />
            <TextInput
              style={inputStyle}
              placeholder='CVV'
              keyboardType='numeric'
              maxLength={3}
              value={cvv}
              onChangeText={setCvv}
              secureTextEntry
            />

            <CustomBotton
              button={
                loading ? (
                  <ActivityIndicator color='#fff' />
                ) : (
                  'Complete Payment'
                )
              }
              onPress={handlePaymentComplete}
              disabled={loading}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const inputStyle = {
  width: '100%',
  height: 45,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingHorizontal: 10,
  marginVertical: 5,
  fontSize: 16
}
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  button: {
    backgroundColor: '#a63932',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
}
