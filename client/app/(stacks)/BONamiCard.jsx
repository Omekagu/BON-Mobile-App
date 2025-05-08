import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function BONamiCard () {
  const [cardDetails, setCardDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)

  //Get User ID from Token
  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('token')
      if (!userData) return null
      const parsedData = JSON.parse(userData)
      const token = parsedData.token.replace(/^"|"$/g, '')

      const response = await axios.get('http://10.0.1.13:5001/auth/usertoken', {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('User ID:', parsedData.userId)
      return parsedData.userId
    } catch (error) {
      console.error('Error retrieving user ID:', error)
      return null
    }
  }

  // When Component Mounts, Get User ID then Fetch Card Details
  useEffect(() => {
    const initialize = async () => {
      try {
        const id = await getUserId()
        if (!id) {
          console.warn('No user ID found.')
          return
        }

        setUserId(id)

        const cardRes = await axios.get(
          `http://10.0.1.13:5001/hotel/userbonami-card/${id}`
        )
        setCardDetails(cardRes.data)
        console.log('Card details:', cardRes.data)
      } catch (error) {
        console.error('Error initializing BONamiCard screen:', error)
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [])

  // Loading State
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#a63932' />
      </View>
    )
  }

  // Card Not Found
  if (!cardDetails) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'gray' }}>BONami card not found.</Text>
      </View>
    )
  }

  // Display Card
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.chip} />

        <Text style={styles.cardNumber}>{cardDetails.cardNumber}</Text>

        <View style={styles.cardDetails}>
          <View style={{ marginRight: 50 }}>
            <Text style={styles.label}>BONami Cardholder</Text>
            <Text style={styles.value}>{cardDetails.name}</Text>
          </View>
          <View>
            <Text style={styles.label}>Expires</Text>
            <Text style={styles.value}>{cardDetails.expires}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%'
  },
  card: {
    width: '90%',
    height: 200,
    backgroundColor: '#a63932', // Dark color for premium look
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: 'gold',
    borderRadius: 5
  },
  cardNumber: {
    fontSize: 22,
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 20
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  label: {
    fontSize: 12,
    color: '#aaa'
  },
  value: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  }
})
