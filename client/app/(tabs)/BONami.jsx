import { View, Text, Image } from 'react-native'
import React from 'react'
import PressButton from '@/component/PressButton'
import { useRouter } from 'expo-router'

export default function BONami () {
  const route = useRouter()
  return (
    <View
      style={{
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between'
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 10,
          paddingTop: 50
        }}
      >
        BONami Rewards
      </Text>
      <Image
        source={{
          uri: 'https://i.postimg.cc/52Ks6ypN/Bonnami-Logo.jpg'
        }}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'contain',
          borderRadius: 10
        }}
      />
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          width: '90%',
          marginBottom: 20
        }}
      >
        Benefits include free night vouchers, discounts on room rates, discounts
        on dining and much more.
      </Text>
      <PressButton
        text='SignUp For South Africa'
        onPress={() => {
          route.push('/BONamiSouth')
        }}
        // route={route.push('/BONamiWst')}
      />
      <PressButton
        text='SignUp For West Africa'
        onPress={() => {
          route.push('/BONamiWst')
        }}
        // route={route.push('/BONamiSouth')}
      />
      <Text
        style={{
          fontSize: 15,
          textTransform: 'capitalize',
          marginVertical: 20
        }}
      >
        Terms and conditions of your BONami membership
      </Text>
    </View>
  )
}
