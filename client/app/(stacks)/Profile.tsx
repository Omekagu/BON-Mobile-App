import {
  View,
  Image,
  TouchableOpacity,
  // ScrollView,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import React, { useEffect, useState } from 'react'
import ExtComp from '@/component/ExtComp'
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Profile () {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('token')
      if (!userData) return null
      const parsedData = JSON.parse(userData)
      let token = parsedData.token.replace(/^"|"$/g, '')
      const response = await axios.get('http://10.0.1.26:5001/auth/usertoken', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return parsedData.userId
    } catch (error) {
      console.error('Error retrieving user ID:', error)
      return null
    }
  }

  const goToEditPage = (field, path) => {
    if (
      !field ||
      field === '' ||
      field.startsWith('Enter') ||
      field.startsWith('Select')
    ) {
      router.push(path)
    }
  }

  useEffect(() => {
    // Fetch user data from backend
    const fetchUser = async () => {
      try {
        const userId = await getUserId()
        const response = await axios.get(
          `http://10.0.1.26:5001/user/user/${userId}`
        )
        setUser(response.data.user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='#a63932' />
      </View>
    )
  }
  return (
    <SafeAreaView>
      {/* <ScrollView style={{ padding: 10 }}> */}
      <View
        style={{
          alignSelf: 'center'
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        {/* 
          <TouchableOpacity>
            <MaterialCommunityIcons
              name='camera-plus-outline'
              size={24}
              color='black'
              style={{
                marginVertical: -20,
                marginHorizontal: 60,
                backgroundColor: '#fff',
                padding: 0.1,
                borderRadius: 100
              }}
            />
          </TouchableOpacity> */}
      </View>

      <ExtComp
        head={'Name'}
        tag={`${user.firstName} ${user.surname}`}
        onPress={() => {
          if (!user.firstName) router.push('/EditName')
        }}
      />

      <ExtComp
        head={'Gender'}
        tag={user.gender || 'Select Your Gender'}
        onPress={() => {
          if (!user.gender) router.push('/EditGender')
        }}
      />

      <ExtComp
        head={'Date of Birth'}
        tag={user.dob || 'Enter date of birth'}
        onPress={() => {
          if (!user.dob) router.push('/EditDob')
        }}
      />

      <ExtComp
        head={'Email'}
        tag={user.email || 'Enter Email Address'}
        onPress={() => {
          if (!user.email) router.push('/EditAddress')
        }}
      />

      <ExtComp
        head={'Phone Number'}
        tag={user.phoneNumber || 'Enter Phone Number'}
        onPress={() => {
          if (!user.phoneNumber) router.push('/EditPhone')
        }}
      />

      <ExtComp
        head={'Address'}
        tag={user.address || 'Enter Address'}
        onPress={() => {
          if (!user.address) router.push('/EditAddress')
        }}
      />

      <ExtComp
        head={'Nationality'}
        tag={user.userCountry || 'Enter Nationality'}
        onPress={() => {
          if (!user.userCountry) router.push('/EditNationality')
        }}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
})
