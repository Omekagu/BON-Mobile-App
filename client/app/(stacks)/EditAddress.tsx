import { View } from 'react-native'
import React, { useState } from 'react'
import LabelInputComp from '@/component/LabelInputComp'
import CustomBotton from '@/component/CustomBotton'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Toast from 'react-native-toast-message'

export default function EditAddress () {
  const [address, setAddress] = useState('')

  const handleSubmit = async () => {
    if (!address) {
      Toast.show({ type: 'error', text1: 'Please enter an address.' })
      return
    }

    try {
      const tokenData = await AsyncStorage.getItem('token')
      const { userId } = JSON.parse(tokenData)

      console.log('User ID:', userId, address)
      const response = await axios.post(
        'http:/10.0.1.25:5001/auth/editAddress', // ⚠️ make sure this endpoint is correct
        {
          userId,
          address
        }
      )

      if (response.status === 200) {
        Toast.show({ type: 'success', text1: 'Address updated successfully!' })
        router.replace('/Profile')
      } else {
        Toast.show({ type: 'error', text1: 'Failed to update address.' })
      }
    } catch (error) {
      console.error('Error updating address:', error)
      Toast.show({
        type: 'error',
        text1: 'Failed to update address. Please try again.'
      })
    }
  }

  return (
    <View style={{ margin: 10, flexDirection: 'column' }}>
      <LabelInputComp
        label={'Edit Address'}
        placeholder={'Enter your address'}
        value={address}
        onChangeText={text => setAddress(text)}
      />

      <View style={{ marginTop: 40 }}>
        <CustomBotton button={'Save'} onPress={handleSubmit} />
      </View>
    </View>
  )
}
