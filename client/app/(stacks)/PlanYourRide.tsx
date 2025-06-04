// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import * as Location from 'expo-location';
// import { router } from 'expo-router';
// import axios from 'axios';

// export default function PlanYourRide() {
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const [pickupTime, setPickupTime] = useState('Pick-up later');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [userLocation, setUserLocation] = useState(null);

//     // const GOOGLE_PLACES_API_KEY = 'AIzaSyA1W2eEkotPgnYpBFujl5A9iB2AsrmI134';

//     useEffect(() => {
//       (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           Alert.alert('Permission Denied', 'Location access is required.');
//           return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         setUserLocation({
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         });
//       })();
//     }, []);

//     // const fetchLocationSuggestions = async (input) => {
//     //   if (!input) {
//     //     setSuggestions([]);
//     //     return;
//     //   }
//     //   try {
//     //     const response = await axios.get(
//     //       `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_PLACES_API_KEY}&location=${userLocation.latitude},${userLocation.longitude}&radius=50000`
//     //     );
//     //     setSuggestions(response.data.predictions);
//     //   } catch (error) {
//     //     console.error('Error fetching suggestions:', error);
//     //   }
//     // };

//     const fetchLocationSuggestions = async (input) => {
//       if (!input) {
//         setSuggestions([]);
//         return;
//       }

//       // Mock response for testing
//       const mockSuggestions = [
//         {
//           place_id: '1',
//           structured_formatting: {
//             main_text: 'Mock Place 1',
//             secondary_text: 'Mock City, Country',
//           },
//         },
//         {
//           place_id: '2',
//           structured_formatting: {
//             main_text: 'Mock Place 2',
//             secondary_text: 'Another City, Country',
//           },
//         },
//       ];
//       setSuggestions(mockSuggestions);
//     };

//     const showDatePicker = () => setDatePickerVisibility(true);
//     const hideDatePicker = () => setDatePickerVisibility(false);
//     const handleConfirm = (date) => {
//       setPickupTime(date.toLocaleString());
//       hideDatePicker();
//     };

//     const handleLocationSelect = (destination) => {
//       router.push({ pathname: '/BookRide', params: { destination: JSON.stringify(destination), userLocation: JSON.stringify(userLocation) } });
//     };

//     return (
//       <View style={styles.container}>
//          {userLocation && (
//           <MapView
//             style={styles.map}
//             initialRegion={{
//               latitude: userLocation.latitude,
//               longitude: userLocation.longitude,
//               latitudeDelta: 0.1,
//               longitudeDelta: 0.1,
//             }}
//           >
//             <Marker coordinate={userLocation} title="You are here" />
//           </MapView>
//         )}
//         <View style={styles.panel}>
//           <TouchableOpacity style={styles.pickupButton} onPress={showDatePicker}>
//             <Icon name="calendar-outline" size={20} color="#fff" />
//             <Text style={styles.pickupText}>{pickupTime}</Text>
//           </TouchableOpacity>

//           <View style={styles.searchBox}>
//             <View style={styles.search}>
//               <Icon name="locate" size={20} color="#000" />
//               <Text style={{ marginLeft: 10, alignSelf: 'center' }}>Current Location</Text>
//             </View>
//             <View style={styles.search}>
//               <MaterialIcons name="find-replace" size={24} color="black" />
//               <TextInput
//                 placeholder="Where to?"
//                 value={searchQuery}
//                 onChangeText={(text) => {
//                   setSearchQuery(text);
//                   fetchLocationSuggestions(text);
//                 }}
//                 style={styles.input}
//               />
//             </View>
//           </View>

//           <FlatList
//             data={suggestions}
//             keyExtractor={(item) => item.place_id}
//             renderItem={({ item }) => (
//               <TouchableOpacity style={styles.locationItem} onPress={() => handleLocationSelect(item)}>
//                 <Icon name="location-outline" size={20} color="#000" />
//                 <View style={styles.locationText}>
//                   <Text style={styles.locationName}>{item.structured_formatting.main_text}</Text>
//                   <Text style={styles.locationAddress}>{item.structured_formatting.secondary_text}</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />

//           <View style={styles.extraOptions}>
//             <TouchableOpacity style={styles.option}><MaterialIcons name="location-city" size={20} /><Text> Search in a different city</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.option}><Icon name="map-outline" size={20} /><Text> Set location on map</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.option}><Icon name="star-outline" size={20} /><Text> Saved places</Text></TouchableOpacity>
//           </View>
//         </View>

//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="datetime"
//           onConfirm={handleConfirm}
//           onCancel={hideDatePicker}
//         />
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
//   panel: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     height: '80%',
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: -2 },
//   },
//   pickupButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#000',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   pickupText: {
//     color: '#fff',
//     marginLeft: 10,
//   },
//   searchBox: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     paddingVertical: 10,
//     marginBottom: 10,
//   },
//   search: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   input: {
//     marginLeft: 10,
//     flex: 1,
//   },
//   locationItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   locationText: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   locationName: {
//     fontWeight: 'bold',
//   },
//   locationAddress: {
//     color: 'gray',
//   },
//   extraOptions: {
//     marginTop: 20,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
// });

import React from 'react'

function PlanYourRide () {
  return <div>PlanYourRide</div>
}

export default PlanYourRide
