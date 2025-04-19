import React, { useEffect } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  ImageBackground,
  StyleSheet
} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import Suggestions from '@/component/Suggestions'
import FilterSuggestion from '../../component/FilterSuggestion'
import FetchHotelsPool from '@/component/FetchHotelsPool'

export default function Home () {
  const getUserId = async () => {
    try {
      // Retrieve the stored token object
      const userData = await AsyncStorage.getItem('token')

      if (!userData) {
        console.log('No user data found in storage.')
        return null
      }

      // Parse the JSON string
      const parsedData = JSON.parse(userData)
      let token = parsedData.token // Extract token
      console.log('Retrieved Token:', token)

      // Remove extra quotes if present
      token = token.replace(/^"|"$/g, '')
      console.log('Cleaned JWT Token:', token)

      // Fetch user data from backend
      const response = await axios.get(
        'http://172.20.10.3:5001/auth/usertoken',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      console.log('User Data:', response.data)
      return parsedData.userId // Return userId after fetching data
    } catch (error) {
      console.error(
        'Error retrieving user ID or fetching data:',
        error.response?.data || error
      )
      return null
    }
  }

  // Usage
  getUserId().then(id => console.log('Logged-in User ID:', id))

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground
        source={{
          uri: 'https://i.postimg.cc/7L0vZwcC/BON-HOTEL-TRANSTELL-ROOMS1.jpg'
        }}
        style={styles.background}
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Luxury and Comfort.</Text>
          <Text style={styles.subtitle}>
            Good people. Good thinking. Good feeling.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.suggestionsContainer}>
        {/* <Suggestions /> */}
        {/* <FilterSuggestion /> */}
        <FetchHotelsPool />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  background: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: '100px'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 5,
    textAlign: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10
  },
  searchButton: {
    backgroundColor: '#2D9CDB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  suggestionsContainer: {
    flex: 1,
    marginTop: -20,
    paddingHorizontal: 15
  }
})
