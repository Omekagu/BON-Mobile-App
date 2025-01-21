import { View, Text } from 'react-native'
import React from 'react'
import CustomBotton from '@/component/CustomBotton'
import { router } from 'expo-router'

export default function Payments() {
  return (
    <View>
        <Text style={{margin: 10}}>
        <CustomBotton button={'pay with card '} onPress={() => router.push('/CardPayment')}/>
</Text>
      
      <Text style={{margin: 10}}>

      <CustomBotton button={'pay with crypto currency '} onPress={() => router.push('/CryptoPayment')}/>
      </Text>
      <Text style={{margin: 10}}>

      <CustomBotton button={'connect a cryptocurrency wallet '} onPress={() => router.push('/ConnectWallet')}/>
      </Text>
    </View>
  )
}