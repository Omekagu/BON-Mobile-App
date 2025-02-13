import React, { useEffect, useRef, useState } from "react";
import { Paystack } from "react-native-paystack-webview";
import { View, Text, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function CardPayment() {
  const { price, hotelId } = useLocalSearchParams<{ price: string; hotelId: string }>();

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  console.log("Received price:", price); // Debugging line

  if (!price) {
    return <Text>Error: Price not received</Text>; // Handle missing price
  }

  const amount = Number(price.toString().replace(/,/g, "")); // Convert safely
  console.log(amount);

  if (isNaN(amount)) {
    return <Text>Error: Invalid price</Text>; // Handle invalid price
  }

  // 🔔 Function to schedule push notification
  async function sendPushNotification(title: string, body: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: "default",
      },
      trigger: null, // Send immediately
    });
  }

  // 🔥 Function to get push notification permissions
  async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
      console.log("Must use physical device for push notifications");
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    setExpoPushToken(token);
    console.log("Expo Push Token:", token);
  }

  // 🛠 Setup notification listeners
  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification Received:", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification Clicked:", response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const handlePaymentSuccess = () => {
    sendPushNotification("Payment Successful", `Your payment of ₦${amount.toLocaleString()} was successful,your room  has been successfully reserved. Thank you Bonamine.`);
    router.replace({ pathname: "/Bookings", params: { amount, hotelId } });
  };

  const handlePaymentFailure = () => {
    sendPushNotification("Payment Failed", "Your payment could not be processed. Please try again.");
    router.replace({ pathname: "/Payments", params: { price, hotelId } });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Payment with Paystack</Text>

      <Paystack
        paystackKey="pk_test_3e98f6bdd30173891907024c91b3b9293b4d0014"
        amount={amount * 1.0} // Ensure amount is converted correctly
        billingEmail="reservation@booking.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
          Toast.show({ type: "error", text1: "Payment failed" });
          handlePaymentFailure();
        }}
        onSuccess={(res) => {
          Toast.show({ type: "success", text1: "Payment successful" });
          handlePaymentSuccess();
        }}
        autoStart={true}
      />
    </View>
  );
}
