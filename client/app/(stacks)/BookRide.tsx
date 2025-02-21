import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import io from 'socket.io-client';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';

// Connect to your Node.js server
const socket = io('http://10.0.1.24:5001');

export default function BookRide() {
  const [userLocation, setUserLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const mapRef = useRef(null); // To control map view

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required for tracking.');
        return;
      }

      // Get real-time location updates
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (currentLocation) => {
          const { latitude, longitude } = currentLocation.coords;
          setUserLocation({ latitude, longitude });
          socket.emit('userLocation', { latitude, longitude });

          // Center the map to the user's location
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        }
      );
    })();

    // Listen for delivery person's location updates
    socket.on('deliveryLocation', (location) => {
      setDeliveryLocation(location);
    });

    // Cleanup on unmount
    return () => {
      socket.off('deliveryLocation');
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 37.78825,
          longitude: userLocation ? userLocation.longitude : -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="Your Location" pinColor="blue" />
        )}
        {deliveryLocation && (
          <Marker coordinate={deliveryLocation} title="Delivery Person" pinColor="red" />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#6A5ACD',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
