import {
  View,
  Text,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Alert,
  TextInput
} from 'react-native'
import React, { useState } from 'react'
import LabelInputComp from '../../component/LabelInputComp'
import CustomBotton from '../../component/CustomBotton'
import { useRouter } from 'expo-router'

export default function BONamiwestForm () {
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // Credit Card Fields
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  const router = useRouter()

  const handleSubmit = () => {
    if (!country || !address || !province || !city) {
      Alert.alert('Error', 'Please fill in all fields before proceeding.')
      return
    }
    setShowPaymentModal(true) // Show payment modal
  }

  const handlePaymentComplete = () => {
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

    setLoading(true) // Show loading in button

    setTimeout(() => {
      setLoading(false)
      setShowPaymentModal(false)
      router.push('/BONamiCard') // Navigate to another page after payment
    }, 3000) // Simulate payment processing
  }

  const handleExpiryInput = text => {
    let formatted = text.replace(/[^0-9]/g, '') // Remove non-numeric characters

    if (formatted.length > 2) {
      formatted = formatted.slice(0, 2) + '/' + formatted.slice(2) // Add slash after MM
    }

    setExpiryDate(formatted.slice(0, 5)) // Ensure only MM/YY format
  }

  return (
    <SafeAreaView style={{ flex: 1, margin: 15, alignContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        BONami South Form
      </Text>

      {/* Country */}
      <LabelInputComp
        label='Country'
        placeholder='Enter your country'
        value={country}
        onChangeText={setCountry}
      />

      {/* Address */}
      <LabelInputComp
        label='Address'
        placeholder='Enter your address'
        value={address}
        onChangeText={setAddress}
      />

      {/* Province */}
      <LabelInputComp
        label='Province'
        placeholder='Enter your province'
        value={province}
        onChangeText={setProvince}
      />

      {/* City */}
      <LabelInputComp
        label='City'
        placeholder='Enter your city'
        value={city}
        onChangeText={setCity}
      />

      {/* Submit Button */}
      <CustomBotton button='Submit' onPress={handleSubmit} />

      {/* Payment Modal */}
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

            {/* Card Number */}
            <TextInput
              style={inputStyle}
              placeholder='Card Number'
              keyboardType='numeric'
              maxLength={16}
              value={cardNumber}
              onChangeText={setCardNumber}
            />

            {/* Expiry Date (Auto adds "/") */}
            <TextInput
              style={inputStyle}
              placeholder='Expiry Date (MM/YY)'
              keyboardType='numeric'
              maxLength={5}
              value={expiryDate}
              onChangeText={handleExpiryInput}
            />

            {/* CVV */}
            <TextInput
              style={inputStyle}
              placeholder='CVV'
              keyboardType='numeric'
              maxLength={3}
              value={cvv}
              onChangeText={setCvv}
              secureTextEntry
            />

            {/* Complete Payment Button */}
            <CustomBotton
              button={
                loading ? (
                  <ActivityIndicator color='#fff' />
                ) : (
                  'Complete Payment'
                )
              }
              onPress={handlePaymentComplete}
              disabled={loading} // Disable button when loading
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
