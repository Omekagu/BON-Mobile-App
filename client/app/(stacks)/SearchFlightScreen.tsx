import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const flights = [
  {
    id: "1",
    departure: "Lagos",
    destination: "London",
    departureTime: "3:00 PM",
    arrivalTime: "9:00 PM",
    duration: "6h",
    airline: "British Airways",
    price: "$520",
  },
  {
    id: "2",
    departure: "Paris",
    destination: "Tokyo",
    departureTime: "8:00 AM",
    arrivalTime: "4:00 AM",
    duration: "12h",
    airline: "Japan Airlines",
    price: "$850",
  },
  {
    id: "3",
    departure: "Dubai",
    destination: "New York",
    departureTime: "10:00 PM",
    arrivalTime: "6:00 AM",
    duration: "14h",
    airline: "Emirates",
    price: "$920",
  },
  {
    id: "4",
    departure: "Berlin",
    destination: "Sydney",
    departureTime: "5:00 AM",
    arrivalTime: "11:00 PM",
    duration: "22h",
    airline: "Qantas",
    price: "$1150",
  },
  {
    id: "5",
    departure: "Toronto",
    destination: "Los Angeles",
    departureTime: "7:00 AM",
    arrivalTime: "10:00 AM",
    duration: "5h",
    airline: "Air Canada",
    price: "$400",
  },
  {
    id: "6",
    departure: "Mumbai",
    destination: "Singapore",
    departureTime: "1:00 PM",
    arrivalTime: "7:00 PM",
    duration: "6h",
    airline: "Singapore Airlines",
    price: "$650",
  },
  {
    id: "7",
    departure: "Cape Town",
    destination: "Johannesburg",
    departureTime: "9:00 AM",
    arrivalTime: "11:00 AM",
    duration: "2h",
    airline: "South African Airways",
    price: "$200",
  },
  {
    id: "8",
    departure: "Rome",
    destination: "Cairo",
    departureTime: "4:00 PM",
    arrivalTime: "8:00 PM",
    duration: "4h",
    airline: "EgyptAir",
    price: "$370",
  },
  {
    id: "9",
    departure: "Bangkok",
    destination: "Seoul",
    departureTime: "2:00 AM",
    arrivalTime: "10:00 AM",
    duration: "8h",
    airline: "Korean Air",
    price: "$700",
  },
];

const FlightCard = ({ flight }) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.flightInfo}>
      <Text style={styles.city}>{flight.departure}</Text>
      <Icon name="airplane" size={20} color="#6A5ACD" style={styles.icon} />
      <Text style={styles.city}>{flight.destination}</Text>
    </View>
    <View style={styles.timeInfo}>
      <Text style={styles.time}>{flight.departureTime}</Text>
      <Icon name="ellipsis-horizontal" size={16} color="gray" />
      <Text style={styles.time}>{flight.arrivalTime}</Text>
    </View>
    <View style={styles.footer}>
      <View style={styles.airlineInfo}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3063/3063824.png" }}
          style={styles.airlineLogo}
        />
        <Text style={styles.airline}>{flight.airline}</Text>
      </View>
      <Text style={styles.price}>{flight.price}</Text>
    </View>
  </TouchableOpacity>
);

export default function SearchFlightScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Flight</Text>
        <View style={styles.flightPath}>
          <Text style={styles.route}>NYC</Text>
          <Icon name="airplane" size={24} color="white" style={styles.planeIcon} />
          <Text style={styles.route}>VN</Text>
        </View>
        <Text style={styles.date}>28, August 2023</Text>
        <Text style={styles.durationText}>1h45m</Text>
      </View>

      {/* Flight List */}
      <FlatList
        data={flights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FlightCard flight={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#a63932",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  flightPath: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  route: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  planeIcon: {
    marginHorizontal: 10,
  },
  date: {
    color: "white",
    marginTop: 5,
    fontSize: 16,
  },
  durationText: {
    color: "white",
    fontSize: 14,
  },
  list: {
    padding: 15,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  flightInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  city: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginHorizontal: 5,
  },
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  airlineInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  airlineLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  airline: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A5ACD",
  },
});
