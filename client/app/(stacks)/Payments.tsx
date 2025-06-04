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
      console.log([price, bookingData])
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
            backgroundColor: 'rgba(52, 52, 77, 0.7)'
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              paddingVertical: 30,
              paddingHorizontal: 25,
              borderRadius: 24,
              width: 340,
              alignItems: 'center',
              shadowColor: '#3e1f47',
              shadowOpacity: 0.22,
              shadowOffset: { width: 0, height: 8 },
              shadowRadius: 15,
              elevation: 8,
              borderWidth: 2,
              borderColor: '#d0c4e7'
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 18,
                color: '#7b2ff2',
                textAlign: 'center',
                letterSpacing: 0.5
              }}
            >
              ✨ Payment Methods ✨
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
                    backgroundColor: '#f6edfa',
                    padding: 15,
                    borderRadius: 14,
                    width: '100%',
                    marginBottom: 12,
                    shadowColor: '#7b2ff2',
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 1,
                    borderWidth: 1.5,
                    borderColor: '#e5d5fa',
                    transition: 'background 0.2s'
                  }}
                  activeOpacity={0.9}
                >
                  {isMaterial ? (
                    <MaterialIcons
                      name={icon}
                      size={26}
                      color={color || '#7b2ff2'}
                    />
                  ) : isFontAwesome5 ? (
                    <FontAwesome5
                      name={icon}
                      size={26}
                      color={color || '#7b2ff2'}
                    />
                  ) : (
                    <FontAwesome
                      name={icon}
                      size={26}
                      color={color || '#7b2ff2'}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '600',
                      marginLeft: 16,
                      color: '#4e2785',
                      letterSpacing: 0.2
                    }}
                  >
                    Pay {name}
                  </Text>
                </TouchableOpacity>
              )
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 24,
                paddingVertical: 13,
                borderRadius: 14,
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#ffb8b8'
              }}
              activeOpacity={0.85}
            >
              <Text
                style={{
                  color: '#ff3b30',
                  fontWeight: 'bold',
                  fontSize: 17,
                  letterSpacing: 0.2
                }}
              >
                ❌ Cancel
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
