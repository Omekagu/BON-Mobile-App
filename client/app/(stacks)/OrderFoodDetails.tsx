import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

export default function OrderFoodDetails() {
  return (
   <View style={styles.container}>
       {/* Top Section with Image */}
       <View style={styles.topSection}>
         <TouchableOpacity style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#000" />
         </TouchableOpacity>
   
         <Image
           source={{ uri: "https://images.pexels.com/photos/19345991/pexels-photo-19345991/free-photo-of-delicious-beef-burger.jpeg?auto=compress&cs=tinysrgb&w=600" }} // Replace with real image
           style={styles.burgerImage}
         />
   
         <TouchableOpacity style={styles.heartButton}>
           <Ionicons name="heart-outline" size={24} color="#000" />
         </TouchableOpacity>
       </View>
   
       {/* Bottom Card Section */}
       <View style={styles.bottomCard}>
         <Text style={styles.category}>Bon Hotel Abuja Kitchen</Text>
         <Text style={styles.title}>Mega Stack Burger</Text>
         <Text style={styles.price}>₦30,000</Text>
   
         {/* <Text style={styles.location}>
           <Ionicons name="location-outline" size={16} /> Milan, Italy • Free delivery
         </Text> */}
   
         {/* Info Row */}
         <View style={styles.infoRow}>
           <View style={styles.infoBox}>
             <Ionicons name="time-outline" size={16} />
             <Text style={styles.infoText}>10 min</Text>
           </View>
           <View style={styles.infoBox}>
             <Ionicons name="chatbubbles-outline" size={16} />
             <Text style={styles.infoText}>2k+ Reviews</Text>
           </View>
           <View style={styles.infoBox}>
             <Ionicons name="star-outline" size={16} />
             <Text style={styles.infoText}>4.6 Rating</Text>
           </View>
         </View>
   
         {/* Description */}
         <Text style={styles.description}>
           Behold the Mega Stack Burger, a towering masterpiece of flavour! Layers of succulent beef patties, smoky bacon, gooey cheddar...
         </Text>
   
         {/* Cart Actions */}
         <View style={styles.cartActions}>
           <View style={styles.quantitySelector}>
             <TouchableOpacity style={styles.quantityButton}>
               <Text style={styles.quantityText}>-</Text>
             </TouchableOpacity>
             <Text style={styles.quantityNumber}>1</Text>
             <TouchableOpacity style={styles.quantityButton}>
               <Text style={styles.quantityText}>+</Text>
             </TouchableOpacity>
           </View>
   
           <TouchableOpacity style={styles.addToCartButton}>
             <Text style={styles.addToCartText}>Add to cart</Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5a623",
    },
    topSection: {
      flex: 1.2,
      justifyContent: "center",
      alignItems: "center",
    },
    burgerImage: {
      width: 700,
      height: 700,
      resizeMode: "contain",
      position: "absolute",
      top: 0,
    },
    backButton: {
      position: "absolute",
      top: 50,
      left: 20,
      backgroundColor: "white",
      padding: 10,
      borderRadius: 20,
    },
    heartButton: {
      position: "absolute",
      top: 50,
      right: 20,
      backgroundColor: "white",
      padding: 10,
      borderRadius: 20,
    },
    bottomCard: {
      flex: 1.8,
      backgroundColor: "white",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
      position: "absolute",
      bottom: 0,
      width: "100%",
    },
    category: {
      fontSize: 14,
      color: "gray",
      textTransform: "uppercase",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 5,
    },
    price: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#a63932",
    },
    location: {
      fontSize: 14,
      color: "gray",
      marginVertical: 5,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    infoBox: {
      flexDirection: "row",
      alignItems: "center",
    },
    infoText: {
      marginLeft: 5,
      fontSize: 14,
    },
    description: {
      fontSize: 14,
      color: "gray",
      marginVertical: 10,
    },
    cartActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
    },
    quantitySelector: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f1f1f1",
      borderRadius: 10,
      padding: 5,
    },
    quantityButton: {
      padding: 10,
      backgroundColor: "#e1e1e1",
      borderRadius: 5,
    },
    quantityText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    quantityNumber: {
      fontSize: 18,
      fontWeight: "bold",
      marginHorizontal: 10,
    },
    addToCartButton: {
      backgroundColor: "#a63932",
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
    },
    addToCartText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
  });