import { View, Text, StatusBar, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import Header from '@/component/Header';
import SearchSection from '@/component/SearchSection';
import PressButton from '@/component/PressButton';
import Suggestions from '@/component/Suggestions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {

  async function getData() {
    try {
      // Retrieve the token from AsyncStorage
      let token = await AsyncStorage.getItem("token");
  
      if (!token) {
        console.error("Token not found");
        return;
      }
  
      // Parse the token if it has extra quotes
      token = token.replace(/^"|"$/g, ''); // Remove leading and trailing quotes
      console.log("JWT Token:", token);
  
      // Send the token in the POST request
      const response = await axios.post("http://10.0.1.35:5001/userData", { token });
      console.log("User Data:", response.data);
    } catch (error) {
      console.error("Error in getData:", error);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      {/* <StatusBar barStyle="light-content" backgroundColor="#a63932" /> */}
      {/* <Header /> */}
      <ScrollView style={{ paddingHorizontal: 10, height: '100%', backgroundColor:"#e8e8e8" }}>
        <SearchSection />
        <PressButton text={'search'} />

        <Suggestions />
      </ScrollView>
    </View>
  );
}
