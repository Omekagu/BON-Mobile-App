import React from 'react';
import { Paystack } from 'react-native-paystack-webview';
import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function CardPayment() {
  const { price, hotelId } = useLocalSearchParams(); 

  console.log("Received price:", price); // Debugging line

  if (!price) {
    return <Text>Error: Price not received</Text>; // Handle missing price
  }

  const amount = Number(price.toString().replace(/,/g, '')); // Convert safely
console.log(amount)
  if (isNaN(amount)) {
    return <Text>Error: Invalid price</Text>; // Handle invalid price
  }

  const handlePaymentSuccess = () => {
    router.push({ pathname: "/Bookings", params: { amount, hotelId } });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Payment with Paystack</Text>
      
      <Paystack  
        paystackKey="pk_test_3e98f6bdd30173891907024c91b3b9293b4d0014"
        amount={amount * 1.0} // Ensure amount is converted correctly
        billingEmail="reservation@booking.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
          Toast.show({ type: 'error', text1: 'Payment failed' });
          router.push({ pathname: "/Payments", params: { price, hotelId } });
        }}
        onSuccess={(res) => {
          Toast.show({ type: 'success', text1: 'Payment successful' });
          router.push({ pathname: "/Payments", params: { price, hotelId } });
          handlePaymentSuccess();
        }}
        autoStart={true} 
      />
    </View>
  );
}
