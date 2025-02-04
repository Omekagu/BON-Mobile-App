// import React from 'react';
// import { Image, Platform, ScrollView, Text, View } from 'react-native';
// import SuggestionBox from './SuggestionBox';
// import BoldText13 from './TextComp/BoldText13';
// import axios from "axios";

// const Suggestions = () => {

//   const searchHotelsByName = async (hotelName) => {
//     if (!hotelName || hotelName.trim() === "") {
//       console.error("Error: Hotel name cannot be empty.");
//       return; // Stop execution if hotelName is empty
//     }
  
//     // Check for invalid text (e.g., only special characters or numbers)
//     const validNamePattern = /^[A-Za-z\s]+$/; // Allows only letters and spaces
//     if (!validNamePattern.test(hotelName)) {
//       console.error("Error: Invalid hotel name. Please enter a valid name.");
//       return;
//     }
  
//     try {
//       const response = await axios.get(`http://10.0.1.35:5001/hotels/search/${hotelName}`);
      
//       if (response.data.length === 0) {
//         console.log("No hotels found with this name.");
//       } else {
//         console.log("Hotels found:", response.data);
//       }
//     } catch (error) {
//       console.error("Error searching for hotels:", error.message);
//     }
//   };

// // Example search
// searchHotelsByName("ye");
//   return (
//     <View style={{ marginVertical: 10 }}>
//       <BoldText13 text={'suggestion based on location'} />
//       <ScrollView
//         horizontal
//         style={{ marginHorizontal: -10, paddingVertical: 10, paddingLeft: 10 }}
//       >
//         <SuggestionBox
//           image={'https://i.postimg.cc/7L0vZwcC/BON-HOTEL-TRANSTELL-ROOMS1.jpg'}
//           name={'Bon Lekki Residence'}
//           price={'100,000,00'}
//           meter={'309'}
//         />
//         <SuggestionBox
//           image={'https://i.postimg.cc/9MHhdrTt/BON-HOTEL-TRANSTELL-ROOMS7.jpg'}
//           name={'Bon Ikeja Residence'}
//           price={'67'}
//           meter={'200,000,00'}
//         />
//         <SuggestionBox
//           image={
//             'https://i.postimg.cc/BQXVvJPq/BON-HOTEL-TRANSTELL-ROOMS11.jpg'
//           }
//           name={'Bon Festac Residence'}
//           price={'300'}
//           meter={'900,000,00'}
//         />
//         <SuggestionBox
//           image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
//           name={'Bon Gbagada Residence'}
//           price={'2,000,000.00'}
//           meter={'1,209'}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// export default Suggestions;
import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import axios from "axios";
import SuggestionBox from "./SuggestionBox"; // Make sure this is the correct path

const Suggestions = () => {
  const [hotelName, setHotelName] = useState("");
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");

  const searchHotelsByName = async () => {
    setError(""); // Reset error state

    if (!hotelName.trim()) {
      setError("Hotel name cannot be empty.");
      return;
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(hotelName)) {
      setError("Invalid hotel name. Use only letters and numbers.");
      return;
    }

    try {
      const response = await axios.get(`http://10.0.1.35:5001/hotels/search/${encodeURIComponent(hotelName)}`);

      if (response.data.length === 0) {
        setError("No hotels found matching the given name.");
        setHotels([]); // Clear previous results
      } else {
        setHotels(response.data); // Update state with hotel data
      }
    } catch (error) {
      setError("Error searching for hotels.");
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search hotels..."
        value={hotelName}
        onChangeText={setHotelName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Search" onPress={searchHotelsByName} />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <FlatList
        data={hotels}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <SuggestionBox
            image={item.images[0] || "https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg"}
            name={item.name}
            price={item.pricePerNight || "100,000,00"}
            location={item.location || "N/A"} // Replace "distance" with the actual field name
          />
        )}
      />
    </View>
  );
};

export default Suggestions;
