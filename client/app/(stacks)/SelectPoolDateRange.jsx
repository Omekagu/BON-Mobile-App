import { useLocalSearchParams, router } from 'expo-router'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function SelectPoolDateRange () {
  const { price, hotelId, pool } = useLocalSearchParams()
  const nightlyPrice = parseFloat(price) || 0

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [showPicker, setShowPicker] = useState({ type: null, visible: false })
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedGuests, setSelectedGuests] = useState(1)
  const [selectedRooms, setSelectedRooms] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const timeSlots = ['08:00 AM', '11:00 AM', '12:00 PM', '02:00 PM']
  const guests = [1, 2, 3]
  const rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const handleDateConfirm = date => {
    if (showPicker.type === 'start') {
      setStartDate(date)
    } else {
      setEndDate(date)
    }
    setShowPicker({ type: null, visible: false })
  }

  const handleCancel = () => {
    setShowPicker({ type: null, visible: false })
  }

  // Helper function to calculate the number of nights
  const calculateNights = () => {
    if (!startDate || !endDate) return 0
    const checkIn = new Date(startDate)
    const checkOut = new Date(endDate)
    return Math.max(
      Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      ),
      1
    )
  }

  // Calculate total price based on nights, nightlyPrice, and number of rooms
  const calculateTotal = () => {
    const nights = calculateNights()
    return (nights * nightlyPrice * selectedRooms).toLocaleString()
  }

  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('token')
      if (!userData) {
        console.log('No user data found in storage.')
        return null
      }
      const parsedData = JSON.parse(userData)
      let token = parsedData.token
      console.log('Retrieved Token:', token)
      token = token.replace(/^"|"$/g, '')
      console.log('Cleaned JWT Token:', token)
      const response = await axios.get('http:/10.0.1.27:5001/auth/usertoken', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // console.log('User Data:', response.data)
      return parsedData.userId
    } catch (error) {
      console.error(
        'Error retrieving user ID or fetching data:',
        error.response?.data || error
      )
      return null
    }
  }

  const handleBooking = async status => {
    try {
      const userId = await getUserId()
      if (!userId) {
        Toast.show({ type: 'error', text1: 'User not logged in.' })
        return
      }

      const nights = calculateNights()
      console.log(nights)

      const bookingData = {
        userId,
        hotelId,
        pool,
        checkInDate: startDate.toISOString(),
        checkOutDate: endDate.toISOString(),
        checkInTime: selectedTime,
        guests: selectedGuests,
        rooms: selectedRooms,
        nights, // Include the calculated nights
        totalPrice: calculateTotal().replace(/,/g, ''), // Remove commas
        status
      }

      if (status === 'Completed') {
        setIsModalVisible(false)
        router.push({
          pathname: '/Payments',
          params: {
            price: String(calculateTotal()),
            hotelId,
            pool,
            bookingData: JSON.stringify(bookingData)
          }
        })
      } else if (status === 'Pending') {
        setIsModalVisible(false)
        // const response = await axios.post(
        //   'http:/10.0.1.27:5001/hotel/bookingCompleted',
        //   bookingData
        // )
        // console.log('Booking Response:', response.data)
        router.push({ pathname: '/Bookings', params: { hotelId, pool } })

        console.log('Booking saved for later:', hotelId, pool)
        Toast.show({
          type: 'success',
          text1: 'payment on arrival',
          position: 'bottom'
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Booking failed. Please try again.'
        })
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Booking failed. Please try again.' })
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          padding: 20,
          backgroundColor: '#f8f9fa',
          flex: 1,
          marginHorizontal: 10
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 10,
              textTransform: 'uppercase'
            }}
          >
            Choose Preferences
          </Text>
          <Text style={{ fontSize: 16, color: '#555', fontWeight: 'bold' }}>
            ₦{nightlyPrice.toLocaleString()} - A night
          </Text>
        </View>

        {/* Date Selection */}
        <View style={{ marginTop: 20 }}>
          {['start', 'end'].map(type => (
            <TouchableOpacity
              key={type}
              onPress={() => setShowPicker({ type, visible: true })}
              style={{
                backgroundColor: '#e9ecef',
                padding: 15,
                borderRadius: 3,
                marginBottom: 10,
                elevation: 3
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  textTransform: 'capitalize',
                  color: '#333',
                  fontWeight: 'bold'
                }}
              >
                {type === 'start'
                  ? startDate
                    ? `Check - in  :${startDate.toDateString()}`
                    : 'Select Check - in Date'
                  : endDate
                  ? `Check - out  :${endDate.toDateString()}`
                  : 'Select Check - out Date'}
              </Text>
            </TouchableOpacity>
          ))}
          <DateTimePickerModal
            isVisible={showPicker.visible}
            mode='date'
            onConfirm={handleDateConfirm}
            onCancel={handleCancel}
          />
        </View>

        {/* Time Slot Selection */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginTop: 20,
            textAlign: 'center'
          }}
        >
          Select Check - in Time
        </Text>
        <FlatList
          data={timeSlots}
          horizontal
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTime(item)}
              style={{
                height: 60,
                alignSelf: 'center',
                padding: 10,
                borderRadius: 10,
                margin: 5,
                backgroundColor: selectedTime === item ? '#a63932' : '#e9ecef'
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: selectedTime === item ? '#fff' : '#333'
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Guest Selection */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center',
            textTransform: 'uppercase'
          }}
        >
          Number of Guests
        </Text>
        <FlatList
          data={guests}
          horizontal
          keyExtractor={item => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedGuests(item)}
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignSelf: 'center',
                padding: 10,
                height: 60,
                borderRadius: 50,
                margin: 5,
                backgroundColor: selectedGuests === item ? '#a63932' : '#e9ecef'
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: selectedGuests === item ? '#fff' : '#333'
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Room Selection */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center',
            textTransform: 'uppercase'
          }}
        >
          Number of Rooms
        </Text>
        <FlatList
          data={rooms}
          horizontal
          keyExtractor={item => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedRooms(item)}
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignSelf: 'center',
                padding: 10,
                height: 60,
                borderRadius: 50,
                margin: 5,
                backgroundColor: selectedRooms === item ? '#a63932' : '#e9ecef'
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: selectedRooms === item ? '#fff' : '#333'
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Book Now Button */}
        <View
          style={{ marginTop: 30, alignItems: 'center', marginHorizontal: 10 }}
        >
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={{
              padding: 15,
              backgroundColor: '#a63932',
              borderRadius: 10,
              width: '80%',
              alignItems: 'center',
              elevation: 3
            }}
            disabled={!startDate || !endDate}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Proceed · ₦{calculateTotal()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet */}
        <Modal visible={isModalVisible} transparent animationType='slide'>
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
                width: '80%',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => handleBooking('Completed')}
                style={{
                  padding: 15,
                  backgroundColor: '#a63932',
                  borderRadius: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>
                  Book Now · ₦{calculateTotal()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBooking('Pending')}
                style={{
                  padding: 15,
                  backgroundColor: '#f8f9fa',
                  borderRadius: 10,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#a63932',
                  width: '100%'
                }}
              >
                <Text style={{ color: '#a63932', fontSize: 16 }}>
                  Save for Later
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ marginTop: 10 }}
              >
                <Text style={{ color: '#555', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
