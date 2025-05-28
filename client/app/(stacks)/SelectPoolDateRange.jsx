import { useLocalSearchParams, router } from 'expo-router'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  Platform
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

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
      if (!endDate || date > endDate) setEndDate(null)
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
      token = token.replace(/^"|"$/g, '')
      const response = await axios.get('http:/10.0.1.27:5001/auth/usertoken', {
        headers: { Authorization: `Bearer ${token}` }
      })
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
    const HotelDetails = AsyncStorage.getItem('hotelDetails')
    try {
      const userId = await getUserId()
      if (!userId) {
        Toast.show({ type: 'error', text1: 'User not logged in.' })
        return
      }

      const nights = calculateNights()
      const bookingData = {
        userId,
        hotelId,
        pool,
        checkInDate: startDate.toISOString(),
        checkOutDate: endDate.toISOString(),
        checkInTime: selectedTime,
        guests: selectedGuests,
        rooms: selectedRooms,
        nights,
        totalPrice: calculateTotal().replace(/,/g, ''),
        status,
        hotelDetails: JSON.parse(await HotelDetails)
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
        router.replace({
          pathname: '/Bookings',
          params: { bookingData: JSON.stringify(bookingData) }
        })
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
          padding: 0,
          backgroundColor: '#7b7b7b',
          flex: 1
        }}
      >
        <View
          style={{
            alignSelf: 'center',
            margin: 18,
            backgroundColor: 'white',
            borderRadius: 24,
            padding: 18,
            elevation: 4,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 16
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Ionicons name='receipt' size={24} color='black' />
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginBottom: 8,
                color: '#232323',
                textTransform: 'uppercase',
                letterSpacing: 1.5
              }}
            >
              Reservation Details
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: '#a63932',
                fontWeight: 'bold',
                marginBottom: 4
              }}
            >
              ₦{nightlyPrice.toLocaleString()}{' '}
              <Text style={{ color: '#7b7b7b', fontWeight: '600' }}>
                per night
              </Text>
            </Text>
            <Text style={{ color: '#8b96b2', fontWeight: '500', fontSize: 13 }}>
              Flexible cancellation • Instant Confirmation
            </Text>
          </View>

          {/* Date Selection */}
          <View style={{ marginTop: 8, marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 8
              }}
            >
              {['start', 'end'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setShowPicker({ type, visible: true })}
                  style={{
                    flex: 1,
                    backgroundColor: '#f6f7fb',
                    padding: 17,
                    borderRadius: 12,
                    marginRight: type === 'start' ? 8 : 0,
                    elevation: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    borderWidth: 1.5,
                    borderColor:
                      (type === 'start' && startDate) ||
                      (type === 'end' && endDate)
                        ? '#a63932'
                        : '#eee'
                  }}
                >
                  <Ionicons
                    name={type === 'start' ? 'calendar-outline' : 'calendar'}
                    size={20}
                    color={
                      (type === 'start' && startDate) ||
                      (type === 'end' && endDate)
                        ? '#a63932'
                        : '#b0b4c4'
                    }
                    style={{ marginRight: 7 }}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 'bold',
                      color:
                        (type === 'start' && startDate) ||
                        (type === 'end' && endDate)
                          ? '#a63932'
                          : '#7b7b7b'
                    }}
                  >
                    {type === 'start'
                      ? startDate
                        ? startDate.toDateString()
                        : 'Check-in'
                      : endDate
                      ? endDate.toDateString()
                      : 'Check-out'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <DateTimePickerModal
              isVisible={showPicker.visible}
              mode='date'
              minimumDate={
                showPicker.type === 'end' && startDate ? startDate : new Date()
              }
              onConfirm={handleDateConfirm}
              onCancel={handleCancel}
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
            />
          </View>

          {/* Time Slot Selection */}
          <Text
            style={{
              fontSize: 13,
              fontWeight: '700',
              textTransform: 'uppercase',
              marginTop: 10,
              marginBottom: 7,
              color: '#232323',
              letterSpacing: 0.5
            }}
          >
            Check-in Time
          </Text>
          <FlatList
            data={timeSlots}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedTime(item)}
                style={{
                  height: 44,
                  alignSelf: 'center',
                  paddingHorizontal: 18,
                  borderRadius: 18,
                  margin: 5,
                  backgroundColor:
                    selectedTime === item ? '#a63932' : '#f6f7fb',
                  justifyContent: 'center',
                  borderWidth: selectedTime === item ? 1.5 : 0,
                  borderColor: '#a63932',
                  elevation: selectedTime === item ? 3 : 0
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: selectedTime === item ? '#fff' : '#232323',
                    fontWeight: selectedTime === item ? 'bold' : '600'
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
              fontSize: 13,
              fontWeight: '700',
              marginTop: 22,
              marginBottom: 7,
              color: '#232323',
              textTransform: 'uppercase'
            }}
          >
            Guests
          </Text>
          <FlatList
            data={guests}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedGuests(item)}
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: 10,
                  height: 44,
                  width: 44,
                  borderRadius: 22,
                  margin: 5,
                  backgroundColor:
                    selectedGuests === item ? '#a63932' : '#f6f7fb',
                  borderWidth: selectedGuests === item ? 1.5 : 0,
                  borderColor: '#a63932',
                  alignItems: 'center',
                  elevation: selectedGuests === item ? 2 : 0
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: selectedGuests === item ? '#fff' : '#232323',
                    fontWeight: selectedGuests === item ? 'bold' : '600'
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
              fontSize: 13,
              fontWeight: '700',
              marginTop: 22,
              marginBottom: 7,
              color: '#232323',
              textTransform: 'uppercase'
            }}
          >
            Rooms
          </Text>
          <FlatList
            data={rooms}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedRooms(item)}
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: 10,
                  height: 44,
                  width: 44,
                  borderRadius: 22,
                  margin: 5,
                  backgroundColor:
                    selectedRooms === item ? '#a63932' : '#f6f7fb',
                  borderWidth: selectedRooms === item ? 1.5 : 0,
                  borderColor: '#a63932',
                  alignItems: 'center',
                  elevation: selectedRooms === item ? 2 : 0
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: selectedRooms === item ? '#fff' : '#232323',
                    fontWeight: selectedRooms === item ? 'bold' : '600'
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Book Now Button */}
          <View
            style={{
              marginTop: 35,
              alignItems: 'center',
              marginHorizontal: 10
            }}
          >
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={{
                padding: 17,
                backgroundColor: !startDate || !endDate ? '#c6b3b2' : '#a63932',
                borderRadius: 18,
                width: '90%',
                alignItems: 'center',
                elevation: 4,
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 8,
                opacity: !startDate || !endDate ? 0.7 : 1
              }}
              activeOpacity={!startDate || !endDate ? 1 : 0.8}
              disabled={!startDate || !endDate}
            >
              <MaterialCommunityIcons
                name='calendar-check'
                size={20}
                color='#fff'
                style={{ marginRight: 2 }}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  letterSpacing: 0.2
                }}
              >
                Proceed · ₦{calculateTotal()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Sheet */}
        <Modal visible={isModalVisible} transparent animationType='fade'>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)'
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 16,
                width: '80%',
                alignItems: 'center',
                elevation: 7,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 16
              }}
            >
              <MaterialCommunityIcons
                name='wallet'
                size={40}
                color='#a63932'
                style={{ marginBottom: 10 }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginBottom: 12,
                  color: '#232323'
                }}
              >
                Payment Options
              </Text>
              <TouchableOpacity
                onPress={() => handleBooking('Completed')}
                style={{
                  padding: 15,
                  backgroundColor: '#a63932',
                  borderRadius: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                  width: '100%',
                  elevation: 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 7
                }}
              >
                <Ionicons name='card' size={19} color='#fff' />
                <Text style={{ color: '#fff', fontSize: 16 }}>
                  Pay Now · ₦{calculateTotal()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBooking('Pending')}
                style={{
                  padding: 15,
                  backgroundColor: '#f8f9fa',
                  borderRadius: 10,
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderColor: '#a63932',
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 7
                }}
              >
                <MaterialCommunityIcons
                  name='clock-outline'
                  size={19}
                  color='#a63932'
                />
                <Text style={{ color: '#a63932', fontSize: 16 }}>
                  Pay on Arrival
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ marginTop: 18 }}
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
