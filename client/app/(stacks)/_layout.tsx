import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Stack } from 'expo-router'

// List of screens with their options
const screens = [
  { name: 'BookingInfo', headerShown: false },
  { name: 'BONamiSouth', headerShown: false },
  { name: 'BONamiWst', headerShown: false },
  { name: 'DescriptionPage', headerShown: false },
  { name: 'SelectDateRange', headerShown: false },
  { name: 'SearchPage', headerShown: false },
  { name: 'PlanYourRide', headerShown: false },
  { name: 'SearchPageInfo', headerShown: false, hasHeartIcon: true },
  { name: 'BookingDetails', headerShown: false },
  { name: 'BookRide', headerShown: false },
  { name: 'BONamiSouthForm', headerShown: false },
  { name: 'SearchedPoolDetailsPage', headerShown: false },
  { name: 'SelectPoolDateRange', headerShown: false },
  { name: 'BONamiCard', headerShown: false },
  { name: 'BookFlight', headerShown: false },
  { name: 'OrderFood', headerShown: false },
  { name: 'OrderFoodDetails', headerShown: false },
  { name: 'SearchFlightScreen', headerShown: false },
  { name: 'Deals', headerShown: false },
  { name: 'Profile', headerShown: false },
  { name: 'CustomerService', headerShown: false },
  { name: 'Loyalty', headerShown: false },
  {
    name: 'Wallet',
    headerShown: true,
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#a63932' }
  },
  { name: 'Questions', headerShown: false },
  { name: 'ResourceCentre', headerShown: false },
  { name: 'Reviews', headerShown: false },
  { name: 'Reward', headerShown: false },
  { name: 'Settings', headerShown: false },
  { name: 'ChooseNo', headerShown: false },
  { name: 'Payments', headerShown: false },
  { name: 'BookingHistory', headerShown: false },
  { name: 'ConnectWallet', headerShown: false },
  { name: 'CardPayment', headerShown: false },
  { name: 'PaystackPage', headerShown: false },
  { name: 'CryptoPayment', headerShown: false },
  { name: 'EditName', headerShown: false },
  { name: 'EditContact', headerShown: false },
  { name: 'EditDob', headerShown: false },
  { name: 'EditEmail', headerShown: false },
  { name: 'EditNationality', headerShown: false },
  { name: 'EditAddress', headerShown: false },
  { name: 'EditGender', headerShown: false },
  { name: 'EditPhone', headerShown: false }
]

export default function _layout () {
  const [isHeartClicked, setHeartClicked] = useState(false)

  const toggleHeart = () => {
    setHeartClicked(!isHeartClicked)
  }

  return (
    <Stack>
      {screens.map(({ name, headerShown, hasHeartIcon, ...options }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            title: name,
            headerShown,
            ...(hasHeartIcon && {
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 10
                  }}
                >
                  <TouchableOpacity onPress={toggleHeart}>
                    <FontAwesome
                      name={isHeartClicked ? 'heart' : 'heart-o'}
                      size={24}
                      color={isHeartClicked ? 'red' : 'black'}
                    />
                  </TouchableOpacity>
                </View>
              )
            }),
            ...options
          }}
        />
      ))}
    </Stack>
  )
}
