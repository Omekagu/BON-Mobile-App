import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HotelBookingScreen() {
  const { id } = useLocalSearchParams(); // ✅ Get hotel ID from URL

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotel ID: {id}</Text>
      {/* Fetch and display hotel details here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});






// import React from "react";
// import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { useLocalSearchParams } from "expo-router";

// export default function HotelBookingScreen() {
//     const { id } = useLocalSearchParams(); // Extract passed hotel data

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Navigation Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Feather name="arrow-left" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Hotel Image */}
//       <Image style={styles.image} source={{ uri: hotel.images[0] || "https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg" }} />

//       {/* Hotel Details */}
//       <View style={styles.detailsContainer}>
//         <Text style={styles.hotelName}>{hotel.name}</Text>
//         <Text style={styles.locationText}>{hotel.location || "N/A"}</Text>
//         <Text style={styles.price}>${hotel.pricePerNight} /night</Text>
//       </View>

//       {/* Description */}
//       <Text style={styles.description}>{hotel.description || "No description available."}</Text>

//       {/* Book Now Button */}
//       <TouchableOpacity style={styles.bookButton}>
//         <Text style={styles.bookButtonText}>Book Now - ${hotel.pricePerNight}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   image: { width: "100%", height: 200, borderRadius: 10 },
//   detailsContainer: { marginTop: 10 },
//   hotelName: { fontSize: 22, fontWeight: "bold" },
//   locationText: { fontSize: 16, color: "gray", marginVertical: 5 },
//   price: { fontSize: 18, fontWeight: "bold", color: "#a63932" },
//   description: { fontSize: 16, marginVertical: 10 },
//   bookButton: { backgroundColor: "#a63932", padding: 15, borderRadius: 10, alignItems: "center" },
//   bookButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
// });
