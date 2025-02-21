import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import io from 'socket.io-client';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

// Connect to your Node.js server
const socket = io('http://10.0.1.24:5001');

export default function BookRide() {
  const [userLocation, setUserLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState({ latitude: 6.5244, longitude: 3.3792 }); // Lagos coordinates as example
  const [routeCoords, setRouteCoords] = useState([]);

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
        }
      );
    })();

    // Listen for delivery person's location updates
    socket.on('deliveryLocation', (location) => {
      setDeliveryLocation(location);
    });

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
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 6.5244,
          longitude: userLocation ? userLocation.longitude : 3.3792,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="You" pinColor="blue" />
        )}
        {deliveryLocation && (
          <Marker coordinate={deliveryLocation} title="Destination" pinColor="red" />
        )}

        {/* Route Path */}
        {userLocation && deliveryLocation && (
          <Polyline
            coordinates={[userLocation, deliveryLocation]}
            strokeColor="#1E90FF"
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* Ride Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>48 min (28 km) - Fastest route, despite traffic</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}><Text style={styles.actionText}>Start</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Text style={styles.actionText}>Add Stops</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Text style={styles.actionText}>Steps</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Text style={styles.actionText}>Save</Text></TouchableOpacity>
        </View>
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
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#a63932',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
