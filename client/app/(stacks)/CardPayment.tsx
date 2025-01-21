import React from 'react';
import { Paystack } from 'react-native-paystack-webview';
import { View, Text } from 'react-native';
import { router } from 'expo-router';

export default function CardPayment(){

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Payment with Paystack</Text>
    
    <Paystack  
        paystackKey="pk_test_3e98f6bdd30173891907024c91b3b9293b4d0014" // Replace with your test public key
        amount={'100000.00'} // The amount for the test transaction
        billingEmail="reservationtion@booking.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
          console.log('Payment canceled', e);
          // Handle payment cancellation (e.g., show a cancellation message)
        }}
        onSuccess={(res) => {
          console.log('Payment successful', res),
          router.push('/Home')
          // Handle payment success (e.g., validate the transaction on your backend)
        }}
        autoStart={true} // Automatically start the payment flow
      />
    </View>

  );
}