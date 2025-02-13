import { View, Text, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CustomBotton from '@/component/CustomBotton';
import { router, useLocalSearchParams } from 'expo-router';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function Payments() {
  const { price, hotelId } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePaymentSelection = (paymentMethod) => {
    setModalVisible(false); // Close the modal
    if (paymentMethod === 'card') {
      router.push({ pathname: "/CardPayment", params: { price: String(price), hotelId } });
    } else if (paymentMethod === 'crypto') {
      router.push('/CryptoPayment');
    } else if (paymentMethod === 'wallet') {
      router.push('/ConnectWallet');
    }
  };
  return (
    <SafeAreaView>
        <Text style={{margin: 10}}>
        <CustomBotton button={'pay with card '} onPress={() => setModalVisible(true)}/>
        </Text>

        <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Choose Payment Method</Text>
            
            <TouchableOpacity onPress={() => handlePaymentSelection('card')} style={{ padding: 10, flexDirection:"row", alignItems:'center', justifyContent:"space-between" }}>
        <FontAwesome name="credit-card" size={24} color="black" />
        <Text> Pay Paystack</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePaymentSelection('crypto')} style={{ padding: 10, flexDirection:"row", alignItems:'center', justifyContent:'space-between' }}>
        <FontAwesome name="paypal" size={24} color="blue" />
        <Text> Pay PayPal</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePaymentSelection('wallet')} style={{ padding: 10, flexDirection:"row", alignItems:'center', justifyContent:'space-between' }}>
        <FontAwesome name="cc-mastercard" size={24} color="red" />
        <Text> Pay Mastercard</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePaymentSelection('wallet')} style={{ padding: 10, flexDirection:"row", alignItems:'center', justifyContent:'space-between' }}>
        <FontAwesome name="credit-card-alt" size={24} color="pink" />
        <Text> Pay Klarna</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePaymentSelection('wallet')} style={{ padding: 10, flexDirection:"row", alignItems:'center', justifyContent:'space-between' }}>
        <MaterialIcons name="phone-android" size={24} color="black" />
        <Text> Pay Samsung Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePaymentSelection('wallet')} style={{ padding: 10, flexDirection:"row", alignItems:'center', justifyContent:'space-between' }}>
        <FontAwesome5 name="money-bill-wave" size={24} color="green" />
        <Text> Pay Chipper Cash</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
              <Text style={{ color: 'red', textAlign: 'center' }}>Cancel</Text>
            </TouchableOpacity>
          </View>

          
        </View>
      </Modal>
      
        <Text style={{margin: 10}}>
          <CustomBotton button={'pay with crypto currency '} onPress={() => router.push('/CryptoPayment')}/>
          </Text>
      <Text style={{margin: 10}}>
      <CustomBotton button={'connect a cryptocurrency wallet '} onPress={() => router.push('/ConnectWallet')}/>
      </Text>
    </SafeAreaView>
  )
}