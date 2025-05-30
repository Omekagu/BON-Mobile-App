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
import { useLocalSearchParams } from 'expo-router'

const Bookings = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [activeTab, setActiveTab] = useState('Completed')
  const [bookings, setBookings] = useState([])
  const { bookingData } = useLocalSearchParams()
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

  // Helper to pretty print a booking JSON object (safe for missing fields)
  function printBooking (data: any) {
    if (!data) {
      console.log('No booking data to print.')
      return
    }
    // If received as string, parse it
    let booking = data
    if (typeof data === 'string') {
      try {
        booking = JSON.parse(data)
      } catch (err) {
        console.log('- Unable to parse bookingData string -')
        return
      }
    }
    console.log('\n' + '='.repeat(50))
    console.log('BOOKING DETAILS')
    console.log('-'.repeat(50))
    Object.entries({
      'User ID': booking.userId,
      'Hotel Pool': booking.pool,
      'Hotel Name': booking.hotelDetails?.name,
      'Room Type': booking.hotelDetails?.alias,
      'Check-in': booking.checkInDate,
      'Check-out': booking.checkOutDate,
      id: booking.hotelDetails?.id,
      name: booking.hotelDetails?.name,
      img: booking.hotelDetails?.img,
      idcat: booking.hotelDetails?.idcat,
      idcarat: booking.hotelDetails?.idcarat,
      idopt: booking.hotelDetails?.idopt,
      info: booking.hotelDetails?.info,
      avail: booking.hotelDetails?.avail,
      units: booking.hotelDetails?.units,
      moreimgs: booking.hotelDetails?.moreimgs,
      fromadult: booking.hotelDetails?.fromadult,
      toadult: booking.hotelDetails?.toadults,
      fromchild: booking.hotelDetails?.fromchild,
      tochild: booking.hotelDetails?.tochild,
      totpeople: booking.hotelDetails?.totpeople,
      mintotpeople: booking.hotelDetails?.mintotpeople,
      params: booking.hotelDetails?.params,
      imgcaptions: booking.hotelDetails?.imgcaptions,
      alias: booking.hotelDetails?.alias,
      smalldesc: booking.hotelDetails?.smalldesc,
      Time: booking.checkInTime,
      Guests: booking.guests,
      Rooms: booking.rooms,
      Nights: booking.nights,
      'Total Price': `₦${booking.totalPrice}`,
      Status: booking.status
    }).forEach(([k, v]) => console.log(`${k.padEnd(12)}: ${v}`))
    console.log('-'.repeat(50))
    if (booking.hotelDetails?.images) {
      console.log('Images:')
      booking.hotelDetails.images.forEach((img: any, i: any) => {
        console.log(`  [${i + 1}] ${img}`)
      })
    }

    console.log('='.repeat(50) + '\n')
  }

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      try {
        // const userId = await getUserId()
        // if (!userId) return
        // const response = await axios.get(
        //   `http://10.0.1.27:5001/hotel/bookings/${userId}`
        // )
        // const sortedBookings = Array.isArray(response.data.data)
        //   ? response.data.data.sort(
        //       (a, b) => new Date(b.checkInDate) - new Date(a.checkInDate)
        //     )
        //   : []
        // setBookings(bookingData)
        // if (!sortedBookings.length) {
        //   Toast.show({ type: 'error', text1: 'No bookings found.' })
        // }
        printBooking(bookingData)
        // console.log(bookingData)
        console.log('Successfully Pay on Arrival booking')
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error fetching bookings.' })
        // Clean and pretty print bookingData if present
        printBooking(bookingData)
        console.error('Error fetching bookings:', error)
      }
      setLoading(false)
    }
    fetchBookings()
  }, [])

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
