import { SafeAreaView } from 'react-native'
import React from 'react'
import FoodList from '@/component/FoodList'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

export default function OrderFood() {
  return (
    <SafeAreaView>
      {/* <GestureHandlerRootView> */}

      {/* <ScrollView> */}
      <FoodList hotelname='Bon Abuja Kitchen' landmark='Burger Periza quila' image='https://images.pexels.com/photos/19345991/pexels-photo-19345991/free-photo-of-delicious-beef-burger.jpeg?auto=compress&cs=tinysrgb&w=600' review={12} price={30000} foodname='Burger french fries and chicken peas'  />
            {/* </ScrollView> */}
      {/* </GestureHandlerRootView> */}
    </SafeAreaView>
  )
}
