import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function SelectDateRange() {
  const { price, hotelId } = useLocalSearchParams();
  const nightlyPrice = parseFloat(price) || 0;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState({ type: null, visible: false });
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState(1);

  const timeSlots = ["08:00 AM", "11:00 AM", "12:00 PM", "02:00 PM"];
  const guests = [1, 2, 3];
  const rooms = [1, 2, 3, 4, 5,6,7,8,9,10];

  const handleDateChange = (event, date, type) => {
    setShowPicker({ type: null, visible: false });
    if (date) {
      type === "start" ? setStartDate(date) : setEndDate(date);
    }
  };

  const calculateTotal = () => {
    if (!startDate || !endDate) return nightlyPrice.toLocaleString();
    const nights = Math.max((endDate - startDate) / (1000 * 60 * 60 * 24), 1);
    return (nights * nightlyPrice * selectedRooms).toLocaleString();
  };


  const getUserId = async () => {
    try {
      // Retrieve the stored token object
      const userData = await AsyncStorage.getItem("token");
  
      if (!userData) {
        console.log("No user data found in storage.");
        return null;
      }
  
      // Parse the JSON string
      const parsedData = JSON.parse(userData);
      let token = parsedData.token; // Extract token
      console.log("Retrieved Token:", token);
  
      // Remove extra quotes if present
      token = token.replace(/^"|"$/g, "");
      console.log("Cleaned JWT Token:", token);
  
      // Fetch user data from backend
      const response = await axios.get("http://10.0.1.24:5001/userData", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("User Data:", response.data);
      return parsedData.userId; // Return userId after fetching data
    } catch (error) {
      console.error("Error retrieving user ID or fetching data:", error.response?.data || error);
      return null;
    }
  };

  

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      Toast.show({type:'error', text1:"Please select check-in and check-out dates"});
      return;
    }
    try {
      const userId = await getUserId(); // Await the user ID retrieval
  
      if (!userId) {
        Toast.show({type:'error', text1:"User not logged in. Please log in first."});
        return;
      }
  
      const bookingData = {
        userId, // Now correctly passing the retrieved userId
        hotelId,
        checkInDate: startDate.toISOString(),
        checkOutDate: endDate.toISOString(),
        checkInTime: selectedTime,
        guests: selectedGuests,
        rooms: selectedRooms,
        totalPrice: calculateTotal(),
      };
  
      const response = await axios.post("http://10.0.1.24:5001/book", bookingData);
  
      if (response.data.status === "ok") {
        Toast.show({ type:'success', text1:"Booking successful!", position:'bottom'});
        router.push({
          pathname: "/Payments",
          params: {
            price: calculateTotal(),
            hotelId,
            guests: selectedGuests,
            rooms: selectedRooms,
          },
        });
      } else {
        Toast.show({type:'error', text1:"Booking failed. Please try again."});
      }
    } catch (error) {
      console.error("Booking Error:", error);
      Toast.show({type:'error', text1:"Booking failed. Please try again."});
    }
  };
  
  

  return (
    <SafeAreaView style={{ padding: 20, backgroundColor: "#f8f9fa", flex: 1,marginHorizontal:10  }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          Choose Your Stay
        </Text>
        <Text style={{ fontSize: 16, color: "#555" }}>
          ₦{nightlyPrice.toLocaleString()} /night
        </Text>
      </View>

      {/* Date Selection */}
      <View style={{ marginTop: 20 }}>
        {["start", "end"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setShowPicker({ type, visible: true })}
            style={{
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 16, color: "#333" }}>
              {type === "start"
                ? startDate
                  ? `Check-in: ${startDate.toDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                  : "Select Check-in Date"
                : endDate
                ? `Check-out: ${endDate.toDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                : "Select Check-out Date"}
            </Text>
          </TouchableOpacity>
        ))}

        {showPicker.visible && (
          <DateTimePicker
            value={showPicker.type === "start" ? startDate || new Date() : endDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, showPicker.type)}
          />
        )}
      </View>

      {/* Time Slot Selection */}
      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>Select Check-in Time</Text>
      <FlatList
        data={timeSlots}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedTime(item)}
            style={{
              padding: 10,
              borderRadius: 10,
              margin: 5,
              backgroundColor: selectedTime === item ? "#a63932" : "#e9ecef",
            }}
          >
            <Text style={{ fontSize: 14, color: selectedTime === item ? "#fff" : "#333" }}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Guest Selection */}
      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>Number of Guests</Text>
      <FlatList
        data={guests}
        horizontal
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedGuests(item)}
            style={{
              padding: 10,
              borderRadius: 50,
              margin: 5,
              backgroundColor: selectedGuests === item ? "#a63932" : "#e9ecef",
            }}
          >
            <Text style={{ fontSize: 16, color: selectedGuests === item ? "#fff" : "#333" }}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Room Selection */}
      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>Number of Rooms</Text>
      <FlatList
        data={rooms}
        horizontal
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedRooms(item)}
            style={{
              padding: 10,
              borderRadius: 50,
              margin: 5,
              backgroundColor: selectedRooms === item ? "#a63932" : "#e9ecef",
            }}
          >
            <Text style={{ fontSize: 16, color: selectedRooms === item ? "#fff" : "#333" }}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Book Now Button */}
      <View style={{ marginTop: 30, alignItems: "center", marginHorizontal:10 }}>
        <TouchableOpacity
          onPress={handleBooking}
          style={{
            padding: 15,
            backgroundColor: "#a63932",
            borderRadius: 10,
            width: "100%",
            alignItems: "center",
            elevation: 3,
          }}
          disabled={!startDate || !endDate}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Book Now · ₦{calculateTotal()}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

