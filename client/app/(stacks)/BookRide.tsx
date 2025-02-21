import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import io from 'socket.io-client';
import * as Location from 'expo-location';
import { Text } from 'react-native';

// Connect to your Node.js server
const socket = io('http://10.0.1.24:5001');

export default function BookRide() {
  const [userLocation, setUserLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required for tracking.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setUserLocation({ latitude, longitude });
      socket.emit('userLocation', { latitude, longitude });
    })();

    // Listen for delivery person location updates
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
      <MapView
        style={styles.map}
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


      <View>

        <Text>Map</Text>
      </View>
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
});