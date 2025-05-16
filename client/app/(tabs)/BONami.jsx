import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import PressButton from '@/component/PressButton'
import { useRouter } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BONamiCard from '../(stacks)/BONamiCard'

export default function BONami () {
  const route = useRouter()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [hasValidCard, setHasValidCard] = useState(false)

  const checkCardStatus = async () => {
    try {
      const tokenData = await AsyncStorage.getItem('token')
      const parsed = JSON.parse(tokenData)
      const userId = parsed.userId

      const res = await axios.get(
        `http:/10.0.1.12:5001/hotel/bonami/check/${userId}`
      )
      setHasValidCard(res.data.hasValidCard)
    } catch (err) {
      console.error('Error checking BONami card:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    checkCardStatus()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    checkCardStatus()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#a63932' />
      </View>
    )
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between'
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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

      {refreshing && (
        <ActivityIndicator
          size='small'
          color='#a63932'
          style={{ marginBottom: 10 }}
        />
      )}

      {hasValidCard ? (
        <View
          style={{
            width: '100%',
            height: 200,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <BONamiCard />
        </View>
      ) : (
        <>
          <Image
            source={{ uri: 'https://i.postimg.cc/52Ks6ypN/Bonnami-Logo.jpg' }}
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
            Benefits include free night vouchers, discounts on room rates,
            discounts on dining and much more.
          </Text>

          <PressButton
            text='SignUp For South Africa'
            onPress={() => route.push('/BONamiSouth')}
          />
          <PressButton
            text='SignUp For West Africa'
            onPress={() => route.push('/BONamiWst')}
          />
        </>
      )}

      <Text
        style={{
          fontSize: 15,
          textTransform: 'capitalize',
          marginVertical: 20
        }}
      >
        Terms and conditions of your BONami membership
      </Text>
    </ScrollView>
  )
}
