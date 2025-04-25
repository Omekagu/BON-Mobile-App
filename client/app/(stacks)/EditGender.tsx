import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import CustomBotton from '@/component/CustomBotton'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Toast from 'react-native-toast-message'

export default function EditGender () {
  const [open, setOpen] = useState(false)
  const [gender, setGender] = useState(null)
  const [items, setItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'prefer_not_to_say' }
  ])

  const handleSave = async () => {
    if (!gender) {
      alert('Please select a gender.')
      return
    }

    try {
      const tokenData = await AsyncStorage.getItem('token')
      const { userId } = JSON.parse(tokenData)
      console.log('User ID:', userId, gender)

      const response = await axios.post(
        'http://10.0.1.8:5001/auth/edit-gender',
        {
          userId,
          gender
        }
      )

      if (response.status === 200) {
        Toast.show({ type: 'success', text1: 'Gender updated successfully!' })
        router.replace('/Profile')
      } else {
        Toast.show({ type: 'error', text1: 'Failed to update gender.' })
      }
    } catch (err) {
      console.error(err)
      Toast.show({
        type: 'error',
        text1: 'Something went wrong while updating gender.'
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Gender</Text>
      <DropDownPicker
        open={open}
        value={gender}
        items={items}
        setOpen={setOpen}
        setValue={setGender}
        setItems={setItems}
        placeholder='Select gender...'
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
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
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 8
  }
})
