import React, { useEffect, useRef, useState } from 'react'
import { Paystack } from 'react-native-paystack-webview'
import { View, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import axios from 'axios'

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

export default function CardPayment () {
  // Now we expect a bookingData parameter in addition to price and hotelId.
  const { price, hotelId, bookingData } = useLocalSearchParams<{
    price: string
    hotelId: string
    bookingData?: string
  }>()

  console.log(bookingData, hotelId, price)

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
  const notificationListener = useRef<Notifications.Subscription | null>(null)
  const responseListener = useRef<Notifications.Subscription | null>(null)

  console.log('Received price:', price)
  console.log('Received bookingData:', bookingData)

  if (!price) {
    return <Text>Error: Price not received</Text>
  }

  const amount = Number(price.toString().replace(/,/g, ''))
  console.log(amount)

  if (isNaN(amount)) {
    return <Text>Error: Invalid price</Text>
  }

  // Function to schedule push notification
  async function sendPushNotification (title: string, body: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default'
      },
      trigger: null // Send immediately
    })
  }

  //  Function to get push notification permissions
  async function registerForPushNotificationsAsync () {
    if (!Device.isDevice) {
      console.log('Must use physical device for push notifications')
      return
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!')
      return
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data
    setExpoPushToken(token)
    console.log('Expo Push Token:', token)
  }

  // 🛠 Setup notification listeners
  useEffect(() => {
    registerForPushNotificationsAsync()

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification Received:', notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Notification Clicked:', response)
      })

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  // Handle payment success: send bookingData to backend if available, then navigate.
  const handlePaymentSuccess = async () => {
    try {
      // If bookingData was passed from the previous page, parse it and post to DB.
      if (bookingData) {
        let parsedBookingData = JSON.parse(bookingData)
        // If the result is still a string, parse it again.
        if (typeof parsedBookingData === 'string') {
          parsedBookingData = JSON.parse(parsedBookingData)
        }
        // Now convert totalPrice to a number
        parsedBookingData.totalPrice = Number(parsedBookingData.totalPrice)
        console.log('Parsed Booking Data:', parsedBookingData)

        const response = await axios.post(
          'http://10.0.1.8:5001/hotel/bookingCompleted',
          parsedBookingData
        )
      }

      await sendPushNotification(
        'Payment Successful',
        `Your payment of ₦${amount.toLocaleString()} was successful, your room has been reserved. Thank you.`
      )
      router.replace({ pathname: '/Bookings', params: { amount, hotelId } })
    } catch (error) {
      console.error('Error completing booking after payment:', error)
      Toast.show({ type: 'error', text1: 'Error saving booking after payment' })
    }
  }

  const handlePaymentFailure = () => {
    sendPushNotification(
      'Payment Failed',
      'Your payment could not be processed. Please try again.'
    )
    router.replace({ pathname: '/Payments', params: { price, hotelId } })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Payment with Paystack</Text>
      <Paystack
        paystackKey='pk_test_3e98f6bdd30173891907024c91b3b9293b4d0014'
        amount={amount * 1.0} // Ensure amount is converted correctly
        billingEmail='reservation@booking.com'
        activityIndicatorColor='green'
        onCancel={e => {
          Toast.show({ type: 'error', text1: 'Payment failed' })
          handlePaymentFailure()
        }}
        onSuccess={res => {
          handlePaymentSuccess()
        }}
        autoStart={true}
      />
    </View>
  )
}
