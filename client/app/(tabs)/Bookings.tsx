import CancellationBox from '@/component/CancellationBox'
import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated
} from 'react-native'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, useLocalSearchParams } from 'expo-router'

const Bookings = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [activeTab, setActiveTab] = useState('Completed')
  const [bookings, setBookings] = useState([])
  const [userId, setUserId] = useState(null)
  // const { sortedBookings } = useLocalSearchParams()
  const [loading, setLoading] = useState(false)

  const tabs = ['Completed', 'Pending', 'Cancelled']

  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('token')
      if (!userData) return null
      const parsedData = JSON.parse(userData)
      let token = parsedData.token.replace(/^"|"$/g, '')
      await axios.get('http://10.0.1.27:5001/auth/usertoken', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return parsedData.userId
    } catch (error) {
      console.error('Error retrieving user ID:', error)
      return null
    }
  }

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      try {
        const user = await getUserId()
        setUserId(user)
        console.log(user)
        if (!userId) return
        const response = await axios.get(
          `http://10.0.1.27:5001/hotel/history/booking/${userId}`
        )
        const sortedBookings = Array.isArray(response.data.data)
          ? response.data.data.sort(
              (a, b) => new Date(b.checkInDate) - new Date(a.checkInDate)
            )
          : []
        setBookings(sortedBookings)
        if (!sortedBookings.length) {
          Toast.show({ type: 'error', text1: 'No bookings found.' })
        }
        console.log(sortedBookings)
        console.log('\n' + '=='.replace)
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error fetching bookings.' })

        console.error('Error fetching bookings:', error)
      }
      setLoading(false)
    }
    fetchBookings()
  }, [userId])

  const handleBookingPress = bookingId => {
    router.push({
      pathname: '/BookingDetails',
      params: { userId, id: bookingId }
    })
  }

  const animateTabChange = () => {
    fadeAnim.setValue(0)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    animateTabChange()
  }, [activeTab])

  const filteredBookings = bookings.filter(
    booking => booking.status.toLowerCase() === activeTab.toLowerCase()
  )

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          <ScrollView style={styles.scrollContent}>
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <CancellationBox
                  key={booking._id}
                  onPress={() => handleBookingPress(booking._id)}
                  onDeletePressed={() =>
                    console.log('Cancel pressed', booking._id)
                  }
                  image={
                    booking.hotelDetails?.images?.[0] ||
                    'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'
                  }
                  city={booking.hotelId?.location || 'Unknown'}
                  date={`${new Date(
                    booking.checkInDate
                  ).toDateString()} - ${new Date(
                    booking.checkOutDate
                  ).toDateString()}`}
                  name={booking.hotelDetails?.name || 'No Name'}
                  datePrice={`₦ ${booking.totalPrice.toLocaleString()}`}
                  type={booking.status}
                  color={
                    booking.status === 'Completed'
                      ? 'green'
                      : booking.status.toLowerCase() === 'pending'
                      ? 'orange'
                      : 'red'
                  }
                  onPrintReceipt={() => handlePrintReceipt(booking)}
                />
              ))
            ) : (
              <Text style={styles.noBookings}>No bookings found</Text>
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#ebebeb', paddingTop: 10, paddingBottom: 60 },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    justifyContent: 'space-between'
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#6a5c5c',
    marginRight: 10
  },
  activeTab: { backgroundColor: '#993d3d' },
  tabText: { fontSize: 16, color: '#ccc' },
  activeTabText: { color: '#000', fontWeight: 'bold' },
  contentContainer: { padding: 1, backgroundColor: '#ebebeb' },
  scrollContent: { marginVertical: 10, height: '90%' },
  noBookings: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555'
  }
})

export default Bookings
