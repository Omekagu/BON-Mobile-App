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

export default function SelectDateRange () {
  const { price, hotelId } = useLocalSearchParams()
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
  const rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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

  const calculateTotal = () => {
    if (!startDate || !endDate) return nightlyPrice.toLocaleString()

    // Ensure dates are valid objects
    const checkIn = new Date(startDate)
    const checkOut = new Date(endDate)

    // Calculate the difference in full days
    const nights = Math.max(
      Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      ),
      1
    )

    return (nights * nightlyPrice * selectedRooms).toLocaleString()
  }

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
      const response = await axios.get('http://10.0.1.14:5001/auth/usertoken', {
        headers: { Authorization: `Bearer ${token}` }
      })

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

  const handleBooking = async status => {
    try {
      const userId = await getUserId()
      if (!userId) {
        Toast.show({ type: 'error', text1: 'User not logged in.' })
        return
      }

      const bookingData = {
        userId,
        hotelId,
        checkInDate: startDate.toISOString(),
        checkOutDate: endDate.toISOString(),
        checkInTime: selectedTime,
        guests: selectedGuests,
        rooms: selectedRooms,
        totalPrice: calculateTotal().replace(/,/g, ''),
        status
      }

      const response = await axios.post(
        'http://10.0.1.14:5001/hotel/bookingCompleted',
        bookingData
      )

      if (response.data.status === 'ok') {
        if (status === 'Completed') {
          setIsModalVisible(false)
          router.push({
            pathname: '/Payments',
            params: {
              price: calculateTotal(),
              hotelId,
              guests: selectedGuests,
              rooms: selectedRooms
            }
          })
        } else if (status === 'Pending') {
          setIsModalVisible(false)
          router.replace({ pathname: '/Bookings', params: { hotelId } })
          Toast.show({
            type: 'success',
            text1: 'Saved for later!',
            position: 'bottom'
          })
        }
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
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
            Choose Your Stay
          </Text>
          <Text style={{ fontSize: 16, color: '#555' }}>
            ₦{nightlyPrice.toLocaleString()} /night
          </Text>
        </View>

        {/* Date Selection */}
        <View style={{ marginTop: 20 }}>
          {['start', 'end'].map(type => (
            <TouchableOpacity
              key={type}
              onPress={() => setShowPicker({ type, visible: true })}
              style={{
                backgroundColor: '#fff',
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                elevation: 3
              }}
            >
              <Text style={{ fontSize: 16, color: '#333' }}>
                {type === 'start'
                  ? startDate
                    ? `Check-in: ${startDate.toDateString()}`
                    : 'Select Check-in Date'
                  : endDate
                  ? `Check-out: ${endDate.toDateString()}`
                  : 'Select Check-out Date'}
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
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
          Select Check-in Time
        </Text>
        <FlatList
          data={timeSlots}
          horizontal
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTime(item)}
              style={{
                padding: 10,
                borderRadius: 10,
                margin: 5,
                backgroundColor: selectedTime === item ? '#a63932' : '#e9ecef'
              }}
            >
              <Text
                style={{
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
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
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
                padding: 10,
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
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
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
                padding: 10,
                borderRadius: 50,
                margin: 5,
                backgroundColor: selectedRooms === item ? '#a63932' : '#e9ecef'
              }}
            >
              <Text
                style={{
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
          {/* Book Now Button */}
          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={{
                padding: 15,
                backgroundColor: '#a63932',
                borderRadius: 10,
                width: '100%',
                alignItems: 'center',
                elevation: 3
              }}
              disabled={!startDate || !endDate}
            >
              <Text
                style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
              >
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
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
