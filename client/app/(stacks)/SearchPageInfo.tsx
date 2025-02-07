import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { AntDesign } from "@expo/vector-icons";

export default function HotelBookingScreen() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        {/* Navigation & Header */}
        {/* <View> */}

        <View style={styles.header}>
          <Feather name="arrow-left" size={24} color="black" />

          <View  style={styles.right}>
          <AntDesign style={{marginRight:20}} name="sharealt" size={30} color="black" />
          <Feather name="heart" size={30} color="black" />
          </View>
        </View>

        {/* Hotel Image */}
        <Image
          style={styles.image}
          source={{
            uri: "https://transtell.bonhotelsinternational.com/wp-content/uploads/2024/10/bon-hotel-transtell-main-block-img-2.jpg",
          }}
          />

        {/* Hotel Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.hotelName}>Starlight Haven Lodge</Text>
          <View style={styles.location}>
            <Feather name="map-pin" size={16} color="gray" />
            <Text style={styles.locationText}>Greenwood Heights, New York</Text>
          </View>
          <View style={styles.rating}>
            <Text style={styles.star}>⭐ 4.9</Text>
            <Text style={styles.reviews}>(2.8k)</Text>
          </View>
          <Text style={styles.price}>$325/night</Text>
        </View>

        {/* Amenities */}
        <ScrollView horizontal style={styles.amenities}>
          <View style={styles.amenityBox}>
            <FontAwesome5 name="bed" size={20} color="black" />
            <Text style={styles.amenityText}>2 Bed</Text>
          </View>
          <View style={styles.amenityBox}>
            <MaterialIcons name="ac-unit" size={24} color="black" />
            <Text style={styles.amenityText}>AC</Text>
          </View>
          <View style={styles.amenityBox}>
            <Entypo name="aircraft-take-off" size={20} color="black" />
            <Text style={styles.amenityText}>Airport Shuttle</Text>
          </View>
          <View style={styles.amenityBox}>
            <MaterialCommunityIcons name="broom" size={24} color="black" />
            <Text style={styles.amenityText}>Room Service</Text>
          </View>
        </ScrollView>

        {/* Owner Info */}
        <View style={styles.ownerSection}>
          <Image
            style={styles.ownerImage}
            source={{
              uri: "https://randomuser.me/api/portraits/men/32.jpg",
            }}
            />
          <View>
            <Text style={styles.ownerName}>Matthew Miller</Text>
            <Text style={styles.ownerRole}>Owner</Text>
          </View>
          <View style={styles.contactIcons}>
            <TouchableOpacity>
              <Feather name="message-circle" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="phone-call" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Starlight Haven Lodge offers curated hotel stays with unmatched comfort
          and thoughtful amenities. Book your perfect escape today!...
        </Text>

        {/* Book Now Button */}
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Next - $325</Text>
        </TouchableOpacity>
        {/* </View> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding:10,
  },
  right:{
    flexDirection: 'row',

  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    padding:10,
  },
  detailsContainer: {
    marginTop: 15,
    padding:10,
  },
  hotelName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  locationText: {
    color: "gray",
    marginLeft: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    fontSize: 16,
    color: "#FFA500",
  },
  reviews: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a63932",
    marginTop: 10,
  },
  amenities: {
    flexDirection: "row",
    marginVertical: 15,
    flex:1,
    padding:10
  },
  amenityBox: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  amenityText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  ownerSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin:10,
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ownerRole: {
    fontSize: 14,
    color: "gray",
  },
  contactIcons: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 15,
  },
  description: {
    marginTop: 15,
    fontSize: 14,
    color: "gray",
    lineHeight: 20,
    padding:10,
  },
  bookButton: {
    backgroundColor: "#a63932",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  bookButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});






// import React, { useRef, useState } from "react";
// import {
//   View,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   Linking,
//   StyleSheet,
// } from "react-native";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { router } from "expo-router";

// // Icons
// import Feather from "@expo/vector-icons/Feather";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import Entypo from "@expo/vector-icons/Entypo";

// // Components
// import Heading from "@/component/TextComp/Heading";
// import CheckInOutComp from "@/component/CheckInOutComp";
// import RoomsNGuest from "@/component/RoomsNGuest";
// import PricePerNight from "@/component/PricePerNight";
// import BoldText13 from "@/component/TextComp/BoldText13";
// import TextCaps from "@/component/TextComp/TextCaps";
// import MoreComp from "@/component/MoreComp";
// import Utility from "@/component/Utiliity";
// import CustomBotton from "@/component/CustomBotton";

// export default function SearchPageInfo() {
//   const sheetRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const snapPoints = ["20%"];

//   return (
//     <GestureHandlerRootView>
//       <SafeAreaView style={styles.container}>
//         {/* Image Section */}
//         <View style={styles.imageWrapper}>
//           <Image
//             style={styles.image}
//             source={{
//               uri: "https://transtell.bonhotelsinternational.com/wp-content/uploads/2024/10/bon-hotel-transtell-main-block-img-2.jpg",
//             }}
//           />
//         </View>

//         {/* Hotel Details */}
//         <View>
//           <Heading heading={"Bon Lekki Residence"} sub={"8.1"} />
//         </View>

//         {/* Features / Amenities */}
//         <ScrollView horizontal style={styles.amenitiesScroll}>
//           <Utility icon={<MaterialCommunityIcons name="parking" size={24} />} name={"Free Parking"} />
//           <Utility icon={<MaterialIcons name="pool" size={24} />} name={"Outdoor Pool"} />
//           <Utility icon={<MaterialIcons name="restaurant" size={24} />} name={"Restaurant"} />
//           <Utility icon={<MaterialCommunityIcons name="air-filter" size={24} />} name={"Air Conditioning"} />
//           <Utility icon={<MaterialIcons name="bathroom" size={24} />} name={"Private Bathroom"} />
//           <Utility icon={<FontAwesome5 name="shower" size={24} />} name={"Shower"} />
//           <Utility icon={<MaterialIcons name="tv" size={24} />} name={"Flat Screen TV"} />
//           <Utility icon={<Entypo name="aircraft-take-off" size={24} />} name={"Airport Shuttle"} />
//           <Utility icon={<MaterialCommunityIcons name="broom" size={24} />} name={"Room Service"} />
//           <Utility icon={<Feather name="more-horizontal" size={24} color="blue" />} name={"More"} />
//         </ScrollView>

//         {/* Booking Details */}
//         <ScrollView>
//           <View style={styles.bookingContainer}>
//             {/* Check-in & Check-out */}
//             <View style={styles.checkInOutWrapper}>
//               <CheckInOutComp name={"CHECK - IN"} date={"Fri, 25 Oct"} />
//               <CheckInOutComp name={"CHECK - OUT"} date={"Sat, 26 Oct"} />
//             </View>

//             {/* Rooms & Guests */}
//             <RoomsNGuest name={"Rooms and Guests"} roomNo={"1"} childrenNo={"0"} peopleNo={"1"} />
//           </View>

//           {/* Pricing Section */}
//           <View style={styles.priceSection}>
//             <PricePerNight number={1} start={"25 Oct"} end={"26 Oct"} price={"₦100,000.00"} />
//           </View>

//           {/* Contact Section */}
//           <View>
//             <BoldText13 text={"Need more info to decide?"} />
//             <TextCaps text={"Feel free to reach out for any inquiries about your stay."} />
//             <MoreComp
//               onPress={() => Linking.openURL("tel:08120190530")}
//               icon={<Feather name="phone-call" size={24} />}
//               name={"Contact Customer Care"}
//             />
//           </View>

//           {/* Description */}
//           <View>
//             <BoldText13 text={"Description"} />
//             <TextCaps text={"Experience premium hospitality with top-notch amenities and excellent service at Bon Lekki Residence."} />
//           </View>
//         </ScrollView>

//         {/* Book Button */}
//         <View style={styles.bookButtonWrapper}>
//           <CustomBotton button={"Book Room - ₦100,000.00"} onPress={() => router.push("/Payments")} />
//         </View>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     margin: 20,
//   },
//   imageWrapper: {
//     borderBottomWidth: 0.5,
//     borderColor: "#000",
//     paddingBottom: 10,
//   },
//   image: {
//     width: "100%",
//     height: 250,
//     marginTop: 10,
//     borderRadius: 10,
//   },
//   amenitiesScroll: {
//     marginHorizontal: -20,
//     paddingBottom: 10,
//     height: 120,
//     borderBottomColor: "#000",
//     borderBottomWidth: 1,
//   },
//   bookingContainer: {
//     borderWidth: 0.5,
//     padding: 10,
//     borderRadius: 10,
//     borderColor: "#a63932",
//     marginVertical: 10,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   checkInOutWrapper: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   priceSection: {
//     paddingVertical: 10,
//   },
//   bookButtonWrapper: {
//     position: "absolute",
//     bottom: 20,
//     width: "100%",
//   },
// });
