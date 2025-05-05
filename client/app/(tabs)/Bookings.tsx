import CancellationBox from '@/component/CancellationBox'
import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
  Modal
} from 'react-native'
import * as Print from 'expo-print'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import * as Sharing from 'expo-sharing'

const Bookings = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [activeTab, setActiveTab] = useState('Completed')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(true) // Show modal on load

  const tabs = ['Completed', 'Pending', 'Cancelled']

  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('token')
      if (!userData) return null

      const parsedData = JSON.parse(userData)
      let token = parsedData.token.replace(/^"|"$/g, '')

      const response = await axios.get(
        'http:///10.0.1.13:5001/auth/usertoken',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log(token)
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
        const userId = await getUserId()
        if (!userId) return

        const response = await axios.get(
          `http:///10.0.1.13:5001/hotel/bookings/${userId}`
        )

        const sortedBookings = Array.isArray(response.data.data)
          ? response.data.data.sort(
              (a, b) => new Date(b.checkInDate) - new Date(a.checkInDate)
            ) // Sorting by date (most recent first)
          : []

        setBookings(sortedBookings)

        if (!sortedBookings.length) {
          Toast.show({ type: 'error', text1: 'No bookings found.' })
        }
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error fetching bookings.' })
        console.error('Error fetching bookings:', error)
      }
      setLoading(false)
    }

    fetchBookings()
  }, [])

  const handlePrintReceipt = async booking => {
    if (!booking) return console.error('No booking data available')
    try {
      const userData = await AsyncStorage.getItem('token')
      const parsedData = userData ? JSON.parse(userData) : {}
      const user = await getUserId()

      const receiptHtml = `
      <html>
      <body>
        <h1>Hotel Receipt</h1>
        <p><strong>Name:</strong> ${user.username || 'N/A'}</p>
        <p><strong>Email:</strong> ${user.email || 'N/A'}</p>
        <p><strong>Hotel:</strong> ${booking.hotelId?.name || 'N/A'}</p>
        <p><strong>Check-in:</strong> ${new Date(
          booking.checkInDate
        ).toDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(
          booking.checkOutDate
        ).toDateString()}</p>
        <p><strong>Total Price:</strong> ₦${booking.totalPrice.toLocaleString()}</p>
      </body>
      </html>`

      const { uri } = await Print.printToFileAsync({ html: receiptHtml })
      await Sharing.shareAsync(uri)
    } catch (error) {
      console.error('Error generating or sharing PDF:', error)
    }
  }

  const handleBookingPress = booking => {
    if (!booking.hotelId?._id) {
      Toast.show({ type: 'error', text1: 'Invalid hotel details.' })
      return
    }
    router.push({
      pathname: '/BookingDetails',
      params: { id: booking.hotelId._id, userId: booking.userId }
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
      {/* Modal for Flight, Ride, and Food Order */}
      <Modal visible={modalVisible} transparent animationType='slide'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Continue Booking?</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false)
                router.push('/BookFlight')
              }}
            >
              <Text style={styles.buttonText}>Book a Flight</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false)
                router.push('/BookRide')
              }}
            >
              <Text style={styles.buttonText}>Book a Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false)
                router.push('/OrderFood')
              }}
            >
              <Text style={styles.buttonText}>Order Food</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
                  onPress={() => handleBookingPress(booking)}
                  onDeletePressed={() =>
                    console.log('Cancel pressed', booking._id)
                  }
                  image={
                    booking.hotelId?.images?.[0] ||
                    'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'
                  }
                  city={booking.hotelId?.location || 'Unknown'}
                  date={`${new Date(
                    booking.checkInDate
                  ).toDateString()} - ${new Date(
                    booking.checkOutDate
                  ).toDateString()}`}
                  name={booking.hotelId?.name || 'No Name'}
                  datePrice={`₦ ${booking.totalPrice.toLocaleString()}`}
                  type={booking.status}
                  color={
                    booking.status === 'Completed'
                      ? 'green'
                      : booking.status.toLowerCase() === 'pending'
                      ? 'orange'
                      : 'red'
                  }
                  onPrintReceipt={() => handlePrintReceipt(booking)} // Pass function here
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
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center'
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalButton: {
    backgroundColor: '#993d3d',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginVertical: 5
  },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 900 },
  cancelButton: { marginTop: 10 },
  cancelButtonText: { color: 'red', fontSize: 16 }
})

export default Bookings
