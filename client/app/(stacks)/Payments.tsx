import { router, useLocalSearchParams } from 'expo-router'
import { View, Text, SafeAreaView, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomBotton from '@/component/CustomBotton'
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'

export default function Payments () {
  const params = useLocalSearchParams()
  // cnsole.log(params)
  const price = params.price || ''
  const hotelId = params.hotelId || ''
  const bookingData = params.bookingData
  console.log(price, hotelId)
  // Check if required params are available
  if (!price || !bookingData) {
    return (
      <SafeAreaView
        style={{
          padding: 20,
          backgroundColor: '#f4f4f4',
          flex: 1,
          marginHorizontal: 10
        }}
      >
        <Text style={{ fontSize: 18, color: 'red' }}>
          Error: Missing required payment parameters.
        </Text>
      </SafeAreaView>
    )
  }

  const [modalVisible, setModalVisible] = useState(false)

  const handlePaymentSelection = paymentMethod => {
    setModalVisible(false) // Close the modal
    if (paymentMethod === 'card') {
      router.push({
        pathname: '/PaystackPage',
        params: {
          price: String(price),
          // hotelId,
          bookingData: JSON.stringify(bookingData)
        }
      })
      console.log([price, hotelId])
    } else if (paymentMethod === 'crypto') {
      router.push('/CryptoPayment')
    } else if (paymentMethod === 'wallet') {
      router.push('/ConnectWallet')
    }
  }

  const paymentOptions = [
    { name: 'Paystack', icon: 'credit-card', color: 'black', type: 'card' },
    { name: 'PayPal', icon: 'paypal', color: 'blue', type: 'crypto' },
    { name: 'Mastercard', icon: 'cc-mastercard', color: 'red', type: 'wallet' },
    { name: 'Klarna', icon: 'credit-card-alt', color: 'pink', type: 'wallet' },
    {
      name: 'Samsung Pay',
      icon: 'phone-android',
      color: 'black',
      type: 'wallet',
      isMaterial: true
    },
    {
      name: 'Chipper Cash',
      icon: 'money-bill-wave',
      color: 'green',
      type: 'wallet',
      isFontAwesome5: true
    }
  ]

  return (
    <SafeAreaView
      style={{
        padding: 20,
        backgroundColor: '#f4f4f4',
        flex: 1,
        marginHorizontal: 10
      }}
    >
      <CustomBotton
        button={'Pay with Card'}
        onPress={() => setModalVisible(true)}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType='slide'
        onRequestClose={() => setModalVisible(false)}
      >
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
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 15,
              width: 320,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 5
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 15,
                textAlign: 'center'
              }}
            >
              Choose Payment Method
            </Text>

            {paymentOptions.map(
              (
                { name, icon, color, type, isMaterial, isFontAwesome5 },
                index
              ) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePaymentSelection(type)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f9f9f9',
                    padding: 12,
                    borderRadius: 10,
                    width: '100%',
                    marginBottom: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: 2
                  }}
                >
                  {isMaterial ? (
                    <MaterialIcons name={icon} size={24} color={color} />
                  ) : isFontAwesome5 ? (
                    <FontAwesome5 name={icon} size={24} color={color} />
                  ) : (
                    <FontAwesome name={icon} size={24} color={color} />
                  )}
                  <Text
                    style={{ fontSize: 16, fontWeight: '500', marginLeft: 10 }}
                  >
                    Pay {name}
                  </Text>
                </TouchableOpacity>
              )
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 20,
                padding: 12,
                backgroundColor: '#FF3B30',
                borderRadius: 10,
                width: '100%',
                alignItems: 'center'
              }}
            >
              <Text
                style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CustomBotton
        button={'Pay with Cryptocurrency'}
        onPress={() => router.push('/CryptoPayment')}
      />
      <CustomBotton
        button={'Connect a Cryptocurrency Wallet'}
        onPress={() => router.push('/ConnectWallet')}
      />
    </SafeAreaView>
  )
}
