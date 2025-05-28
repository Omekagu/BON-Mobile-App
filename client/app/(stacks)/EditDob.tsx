import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { router } from 'expo-router'
import CustomBotton from '@/component/CustomBotton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Toast from 'react-native-toast-message'

export default function EditDob () {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [dob, setDob] = useState('')

  const showDatePicker = () => setDatePickerVisibility(true)
  const hideDatePicker = () => setDatePickerVisibility(false)

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0] // Format as YYYY-MM-DD
    setDob(formattedDate)
    hideDatePicker()
  }

  const handleSave = async () => {
    if (!dob) {
      alert('Please select a date of birth.')
      return
    }

    try {
      const tokenData = await AsyncStorage.getItem('token')
      const { userId } = JSON.parse(tokenData)

      const response = await axios.post('http:/10.0.1.27:5001/auth/editDob', {
        userId,
        dob
      })

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Date of Birth updated successfully!'
        })
        router.replace('/Profile')
      } else {
        Toast.show({ type: 'error', text1: 'Failed to update date of birth.' })
      }
    } catch (error) {
      console.error(error)
      Toast.show({
        type: 'error',
        text1: 'Something went wrong while updating date of birth.'
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date of Birth</Text>

      <TouchableOpacity style={styles.dobBox} onPress={showDatePicker}>
        <Text style={{ color: dob ? '#000' : '#888' }}>
          {dob || 'Tap to select date'}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()} // Prevent selecting future date
      />

      <View style={{ marginTop: 40 }}>
        <CustomBotton button={'Save'} onPress={handleSave} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    justifyContent: 'flex-start'
  },
  label: {
    marginTop: 50,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  dobBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8
  }
})
